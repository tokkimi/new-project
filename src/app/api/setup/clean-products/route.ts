import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { cleanCatalogProduct, shouldExcludeProduct } from "@/lib/catalog-cleanup";

export async function GET(request: Request) {
  const { ok } = rateLimit(clientKey(request, "setup-clean-products"), { limit: 10, windowMs: 60 * 1000 });
  if (!ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const expected = process.env.SEED_SECRET;
  if (!expected) {
    return NextResponse.json({ error: "SEED_SECRET is not configured" }, { status: 500 });
  }

  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token || token !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const take = Math.min(1000, Math.max(1, Number(url.searchParams.get("limit") ?? 500)));
  const cursor = url.searchParams.get("cursor");
  const products = await db.product.findMany({
    orderBy: { id: "asc" },
    take,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  let updated = 0;
  let deleted = 0;
  for (const product of products) {
    if (shouldExcludeProduct(product)) {
      await db.product.delete({ where: { id: product.id } }).catch(() => null);
      deleted++;
      continue;
    }

    const clean = cleanCatalogProduct(product);
    if (clean.name !== product.name || clean.brand !== product.brand) {
      await db.product.update({
        where: { id: product.id },
        data: { name: clean.name, brand: clean.brand },
      });
      updated++;
    }
  }

  return NextResponse.json({
    ok: true,
    processed: products.length,
    updated,
    deleted,
    nextCursor: products.length === take ? products[products.length - 1]?.id : null,
  });
}
