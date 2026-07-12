import { db } from "@/lib/db";
import type { Product } from "@/generated/prisma/client";
import { PRODUCTS } from "@/lib/seed-data/products";

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

const FALLBACK_PRODUCTS = PRODUCTS.map(toFallbackProduct).sort((a, b) =>
  a.name.localeCompare(b.name)
);

export function getFallbackProducts() {
  return FALLBACK_PRODUCTS;
}

export function listProducts() {
  return db.product.findMany({ orderBy: { name: "asc" } }).catch(() => FALLBACK_PRODUCTS);
}

export function findProductById(id: string) {
  return db.product
    .findUnique({ where: { id } })
    .catch(() => FALLBACK_PRODUCTS.find((product) => product.id === id) ?? null);
}

export function findProductBySlug(slug: string) {
  return db.product
    .findUnique({ where: { slug } })
    .catch(() => FALLBACK_PRODUCTS.find((product) => product.slug === slug) ?? null);
}

export function findProductsByIds(ids: string[]) {
  return db.product
    .findMany({ where: { id: { in: ids } } })
    .catch(() => FALLBACK_PRODUCTS.filter((product) => ids.includes(product.id)));
}
