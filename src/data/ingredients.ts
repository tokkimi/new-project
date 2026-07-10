export type TimeSlot = "am" | "pm" | "both";

export type Ingredient = {
  id: string;
  aliases: string[];
  timePref: TimeSlot;
  /** Lower = applied earlier in a routine step (thin/reactive actives first). */
  layerWeight: number;
};

export type ConflictSeverity = "avoid" | "space_out" | "sequence" | "note";

export type ConflictRule = {
  id: string;
  a: string;
  b: string;
  severity: ConflictSeverity;
};

// Display text (name, summary, headline, reason, recommendation, category labels)
// lives in messages/{locale}.json under ingredients.*, conflictRules.*, categories.* —
// keep this file to structural/rule data only so it stays locale-independent.

export const INGREDIENTS: Ingredient[] = [
  { id: "retinol", aliases: ["retinol", "retinal", "tretinoin", "adapalene"], timePref: "pm", layerWeight: 40 },
  { id: "vitamin_c", aliases: ["ascorbic acid", "vitamin c", "l-ascorbic acid"], timePref: "am", layerWeight: 20 },
  { id: "niacinamide", aliases: ["vitamin b3", "nicotinamide"], timePref: "both", layerWeight: 25 },
  { id: "aha", aliases: ["glycolic acid", "lactic acid", "mandelic acid"], timePref: "pm", layerWeight: 30 },
  { id: "bha", aliases: ["salicylic acid"], timePref: "pm", layerWeight: 30 },
  { id: "benzoyl_peroxide", aliases: ["benzoyl peroxide", "bpo"], timePref: "both", layerWeight: 35 },
  { id: "vitamin_e", aliases: ["tocopherol"], timePref: "both", layerWeight: 22 },
  { id: "peptides", aliases: ["copper peptides", "ghk-cu", "peptides"], timePref: "both", layerWeight: 45 },
  { id: "hyaluronic_acid", aliases: ["hyaluronic acid", "sodium hyaluronate"], timePref: "both", layerWeight: 15 },
  { id: "centella", aliases: ["cica", "centella", "madecassoside"], timePref: "both", layerWeight: 18 },
  { id: "spf", aliases: ["spf", "sunscreen", "avobenzone", "zinc oxide"], timePref: "am", layerWeight: 90 },
  { id: "ceramides", aliases: ["ceramide", "ceramides"], timePref: "both", layerWeight: 55 },
];

export const CONFLICT_RULES: ConflictRule[] = [
  { id: "retinol_aha_bha", a: "retinol", b: "aha", severity: "avoid" },
  { id: "retinol_bha", a: "retinol", b: "bha", severity: "avoid" },
  { id: "retinol_benzoyl", a: "retinol", b: "benzoyl_peroxide", severity: "avoid" },
  { id: "vitc_retinol_timing", a: "vitamin_c", b: "retinol", severity: "sequence" },
  { id: "aha_bha_together", a: "aha", b: "bha", severity: "space_out" },
  { id: "niacinamide_vitc_myth", a: "niacinamide", b: "vitamin_c", severity: "note" },
  { id: "peptides_aha", a: "peptides", b: "aha", severity: "space_out" },
  { id: "spf_am_only", a: "spf", b: "retinol", severity: "note" },
];

export type ProductCategory =
  | "cleanser"
  | "toner"
  | "essence"
  | "serum"
  | "spot"
  | "eye"
  | "moisturizer"
  | "oil"
  | "sunscreen";

export const CATEGORY_ORDER: Record<ProductCategory, number> = {
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

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  ingredientIds: string[];
  image?: string;
};

export const DEMO_SHELF: Product[] = [
  { id: "p1", name: "Advanced Snail Mucin Essence", brand: "COSRX", category: "essence", ingredientIds: ["niacinamide", "hyaluronic_acid", "centella"] },
  { id: "p2", name: "Vitamin C 23 Serum", brand: "Round Lab", category: "serum", ingredientIds: ["vitamin_c", "vitamin_e"] },
  { id: "p3", name: "Retinol 0.3% Night Treatment", brand: "Some By Mi", category: "serum", ingredientIds: ["retinol", "peptides"] },
  { id: "p4", name: "BHA Blackhead Power Liquid", brand: "COSRX", category: "toner", ingredientIds: ["bha"] },
  { id: "p5", name: "Glycolic Acid 7% Toning Solution", brand: "Beauty of Joseon", category: "toner", ingredientIds: ["aha"] },
  { id: "p6", name: "Rice + Probiotic Barrier Cream", brand: "Beauty of Joseon", category: "moisturizer", ingredientIds: ["ceramides", "centella"] },
  { id: "p7", name: "Relief Sun Rice + Probiotics SPF50+", brand: "Beauty of Joseon", category: "sunscreen", ingredientIds: ["spf"] },
  { id: "p8", name: "Acne Spot Gel 5%", brand: "La Roche-Posay", category: "spot", ingredientIds: ["benzoyl_peroxide"] },
];

export function findIngredient(id: string): Ingredient | undefined {
  return INGREDIENTS.find((i) => i.id === id);
}
