import { db } from "@/lib/db";
import type { Product, Prisma } from "@/generated/prisma/client";
import { PRODUCTS } from "@/lib/seed-data/products";
import { categoryDescendants } from "@/lib/categories";
import { cleanCatalogProduct, shouldExcludeProduct } from "@/lib/catalog-cleanup";

export type { Product };

const FALLBACK_DATE = new Date("2027-01-01T00:00:00.000Z");

function toFallbackProduct(product: (typeof PRODUCTS)[number]): Product {
  return {
    id: product.slug,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: product.category,
    ingredientIds: product.ingredientIds,
    fullIngredients: product.fullIngredients,
    barcode: null,
    origin: product.origin,
    description: product.description,
    usageSteps: product.usageSteps,
    imageUrl: product.imageUrl ?? null,
    officialUrl: product.officialUrl ?? null,
    price: product.price,
    currency: product.currency,
    skinTypes: product.skinTypes,
    concerns: product.concerns,
    featured: product.featured ?? false,
    createdAt: FALLBACK_DATE,
    updatedAt: FALLBACK_DATE,
    brandId: null,
  };
}

const FALLBACK_PRODUCTS = PRODUCTS.filter((product) => !shouldExcludeProduct(product))
  .map((product) => toFallbackProduct(cleanCatalogProduct(product)))
  .sort((a, b) => a.name.localeCompare(b.name));

function cleanDbProduct(product: Product): Product {
  return cleanCatalogProduct(product);
}

export function getFallbackProducts() {
  return FALLBACK_PRODUCTS;
}

export function listProducts() {
  return db.product
    .findMany({ orderBy: { name: "asc" } })
    .then((products) => products.filter((product) => !shouldExcludeProduct(product)).map(cleanDbProduct))
    .catch(() => FALLBACK_PRODUCTS);
}

export const PRODUCTS_BATCH_SIZE = 20;

export type ProductSearchFilters = {
  q?: string;
  category?: string;
  skinType?: string;
  concern?: string;
  brand?: string;
};

/**
 * Filtered product search for the /app/products browser — the catalog is
 * now in the thousands, so this page must never load every row at once
 * (that's what was crashing/hanging the page). Always fetches from the
 * start up to `limit`; the "See more" button just re-requests with a
 * bigger limit (simpler than page/skip since a "load more" UI never jumps
 * to a middle page).
 */
export async function searchProducts(filters: ProductSearchFilters, limit: number) {
  const where: Prisma.ProductWhereInput = {};
  if (filters.q) {
    where.OR = [
      { name: { contains: filters.q, mode: "insensitive" } },
      { brand: { contains: filters.q, mode: "insensitive" } },
    ];
  }
  if (filters.category) {
    where.category = { in: categoryDescendants(filters.category) };
  }
  if (filters.skinType) {
    where.skinTypes = { has: filters.skinType };
  }
  if (filters.concern) {
    where.concerns = { has: filters.concern };
  }
  if (filters.brand) {
    where.brand = filters.brand;
  }

  const safeLimit = Math.max(PRODUCTS_BATCH_SIZE, limit);

  try {
    const [products, total] = await Promise.all([
      db.product.findMany({ where, orderBy: { name: "asc" }, take: safeLimit }),
      db.product.count({ where }),
    ]);
    return { products, total };
  } catch {
    return {
      products: FALLBACK_PRODUCTS.slice(0, safeLimit),
      total: FALLBACK_PRODUCTS.length,
    };
  }
}

/** Distinct brand names for the products browser's brand filter — cheap, doesn't load full rows. */
export function listBrandNames() {
  return db.brand
    .findMany({ select: { name: true }, orderBy: { name: "asc" } })
    .then((rows) => rows.map((r) => r.name))
    .catch(() => Array.from(new Set(FALLBACK_PRODUCTS.map((p) => p.brand))).sort());
}

export function findProductById(id: string) {
  return db.product
    .findUnique({ where: { id } })
    .then((product) => (product && !shouldExcludeProduct(product) ? cleanDbProduct(product) : null))
    .catch(() => FALLBACK_PRODUCTS.find((product) => product.id === id) ?? null);
}

export function findProductBySlug(slug: string) {
  return db.product
    .findUnique({ where: { slug } })
    .then((product) => (product && !shouldExcludeProduct(product) ? cleanDbProduct(product) : null))
    .catch(() => FALLBACK_PRODUCTS.find((product) => product.slug === slug) ?? null);
}

/** Exact lookup by EAN/UPC barcode. Returns null when unknown or DB unavailable. */
export function findProductByBarcode(barcode: string) {
  return db.product
    .findFirst({ where: { barcode } })
    .then((product) => (product && !shouldExcludeProduct(product) ? cleanDbProduct(product) : null))
    .catch(() => null);
}

export function findProductsByIds(ids: string[]) {
  return db.product
    .findMany({ where: { id: { in: ids } } })
    .then((products) => products.filter((product) => !shouldExcludeProduct(product)).map(cleanDbProduct))
    .catch(() => FALLBACK_PRODUCTS.filter((product) => ids.includes(product.id)));
}
