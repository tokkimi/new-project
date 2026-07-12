import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { PRODUCTS } from "@/lib/seed-data/products";

export async function GET(request: Request) {
  const { ok } = rateLimit(clientKey(request, "setup-seed-products"), { limit: 20, windowMs: 60 * 1000 });
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

  const offset = Math.max(0, Number(url.searchParams.get("offset") ?? 0));
  const limit = Math.min(500, Math.max(1, Number(url.searchParams.get("limit") ?? 250)));
  const slice = PRODUCTS.slice(offset, offset + limit);
  const validIngredients = new Set(
    (await db.ingredient.findMany({ select: { id: true } })).map((ingredient) => ingredient.id)
  );

  let products = 0;
  let sources = 0;
  let ingredientLinks = 0;

  for (const product of slice) {
    const saved = await db.product.upsert({
      where: { slug: product.slug },
      create: { ...product },
      update: { ...product },
    });
    products++;

    if (product.officialUrl) {
      const existing = await db.productSource.findFirst({
        where: { productId: saved.id, sourceUrl: product.officialUrl },
        select: { id: true },
      });
      if (!existing) {
        await db.productSource.create({
          data: {
            productId: saved.id,
            sourceName: `${product.brand} (official site)`,
            sourceUrl: product.officialUrl,
          },
        });
        sources++;
      }
    }

    for (const ingredientId of product.ingredientIds) {
      if (!validIngredients.has(ingredientId)) continue;
      await db.productIngredient.upsert({
        where: { productId_ingredientId: { productId: saved.id, ingredientId } },
        create: { productId: saved.id, ingredientId },
        update: {},
      });
      ingredientLinks++;
    }
  }

  return NextResponse.json({
    ok: true,
    offset,
    limit,
    processed: products,
    sources,
    ingredientLinks,
    total: PRODUCTS.length,
    nextOffset: offset + products < PRODUCTS.length ? offset + products : null,
  });
}
