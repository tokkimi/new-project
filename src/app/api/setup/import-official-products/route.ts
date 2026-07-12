import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cleanCatalogProduct, shouldExcludeProduct } from "@/lib/catalog-cleanup";
import { fetchOfficialProducts, OFFICIAL_PRODUCT_SOURCES } from "@/lib/official-product-import";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export async function GET(request: Request) {
  const { ok } = rateLimit(clientKey(request, "setup-import-official-products"), {
    limit: 120,
    windowMs: 60 * 1000,
  });
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

  const sourceIndex = Math.max(0, Number(url.searchParams.get("source") ?? 0));
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const limit = Math.min(250, Math.max(25, Number(url.searchParams.get("limit") ?? 100)));
  const source = OFFICIAL_PRODUCT_SOURCES[sourceIndex];
  if (!source) {
    return NextResponse.json({ ok: true, done: true, sources: OFFICIAL_PRODUCT_SOURCES.length });
  }

  const validIngredients = new Set(
    (await db.ingredient.findMany({ select: { id: true } })).map((ingredient) => ingredient.id)
  );
  const { products: rawProducts, rawCount } = await fetchOfficialProducts(source, page, limit);

  let products = 0;
  let skipped = 0;
  let sources = 0;
  let ingredientLinks = 0;

  for (const rawProduct of rawProducts) {
    if (shouldExcludeProduct(rawProduct)) {
      skipped++;
      continue;
    }

    const product = cleanCatalogProduct(rawProduct);
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
    sourceIndex,
    source: source.brand,
    page,
    fetched: rawProducts.length,
    rawFetched: rawCount,
    processed: products,
    skipped,
    sources,
    ingredientLinks,
    next:
      rawCount === limit
        ? { source: sourceIndex, page: page + 1 }
        : { source: sourceIndex + 1, page: 1 },
    sourceCount: OFFICIAL_PRODUCT_SOURCES.length,
  });
}
