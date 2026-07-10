export const PRODUCT_CATEGORIES = [
  "cleanser",
  "toner",
  "essence",
  "serum",
  "spot",
  "eye",
  "moisturizer",
  "oil",
  "sunscreen",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/** Lower = earlier step in a routine. Unknown categories sort last but don't break. */
const CATEGORY_ORDER: Record<string, number> = {
  cleanser: 0,
  toner: 10,
  essence: 15,
  serum: 20,
  spot: 50,
  eye: 60,
  moisturizer: 70,
  oil: 80,
  sunscreen: 90,
};

export function categoryOrder(category: string): number {
  return CATEGORY_ORDER[category] ?? 40;
}

export function isKnownCategory(category: string): category is ProductCategory {
  return (PRODUCT_CATEGORIES as readonly string[]).includes(category);
}
