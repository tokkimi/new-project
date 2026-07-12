import { CATEGORY_TREE } from "@/lib/seed-data/categories";

export const PRODUCT_CATEGORIES = CATEGORY_TREE.map((c) => c.slug);

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/** Top-level categories only — used for compact pill filters (products browser, admin dropdown groups). */
export const TOP_LEVEL_CATEGORIES = CATEGORY_TREE.filter((c) => c.parentSlug === null).map(
  (c) => c.slug
);

const CATEGORY_ORDER: Record<string, number> = Object.fromEntries(
  CATEGORY_TREE.map((c) => [c.slug, c.order])
);

/** Lower = earlier step in a routine. Unknown categories sort in the middle but don't break. */
export function categoryOrder(category: string): number {
  return CATEGORY_ORDER[category] ?? 40;
}

export function isKnownCategory(category: string): category is ProductCategory {
  return category in CATEGORY_ORDER;
}

/** Top-level slug a (sub)category belongs to, or the slug itself if it has no parent. */
export function categoryParent(category: string): string {
  return CATEGORY_TREE.find((c) => c.slug === category)?.parentSlug ?? category;
}
