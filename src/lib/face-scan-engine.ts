import { CONCERNS } from "@/lib/validation";
import type { Product } from "@/generated/prisma/client";

export type Concern = (typeof CONCERNS)[number];
export type ZoneSeverity = "low" | "medium" | "attention";

export type ModuleId =
  | "pores"
  | "blackheads"
  | "wrinkles"
  | "redness"
  | "spots"
  | "acne"
  | "acneScars"
  | "darkCircles"
  | "texture"
  | "oiliness"
  | "dryness"
  | "sensitivity"
  | "radiance";

export const MODULES: ModuleId[] = [
  "pores",
  "blackheads",
  "texture",
  "oiliness",
  "dryness",
  "redness",
  "sensitivity",
  "spots",
  "acne",
  "acneScars",
  "wrinkles",
  "darkCircles",
  "radiance",
];

// Which concern (from our tracked taxonomy) and which routine category best
// addresses each module when it's flagged. Fixed facts about skincare, not
// something the model needs to infer per photo.
const MODULE_CONCERN: Record<ModuleId, Concern> = {
  pores: "pores",
  blackheads: "pores",
  wrinkles: "aging",
  redness: "redness",
  spots: "pigmentation",
  acne: "acne",
  acneScars: "pigmentation",
  darkCircles: "aging",
  texture: "dullness",
  oiliness: "pores",
  dryness: "hydration",
  sensitivity: "barrier",
  radiance: "dullness",
};

const CONCERN_INGREDIENT: Record<Concern, string> = {
  acne: "bha",
  aging: "peptides",
  hydration: "hyaluronic_acid",
  redness: "centella",
  pigmentation: "vitamin_c",
  pores: "niacinamide",
  dullness: "vitamin_c",
  barrier: "ceramides",
};

const MODULE_CATEGORY: Record<ModuleId, string> = {
  pores: "toner",
  blackheads: "toner",
  wrinkles: "serum",
  redness: "serum",
  spots: "serum",
  acne: "spot",
  acneScars: "serum",
  darkCircles: "eye",
  texture: "toner",
  oiliness: "toner",
  dryness: "essence",
  sensitivity: "moisturizer",
  radiance: "serum",
};

export type RawModuleResult = {
  id: ModuleId;
  /** 0 (clear) to 9 (severe), a direct visual read of this specific photo. */
  score: number;
};

export type ModuleFinding = {
  id: ModuleId;
  score: number;
  severity: ZoneSeverity;
  flagged: boolean;
  concern: Concern;
  ingredientId: string;
  category: string;
};

export type FaceScanAnalysis = {
  modules: ModuleFinding[];
  overallScore: number;
  flaggedConcerns: Concern[];
  suggestedIngredientIds: string[];
};

function severityFromScore(score: number): ZoneSeverity {
  if (score >= 7) return "attention";
  if (score >= 3) return "medium";
  return "low";
}

/** Turns the model's raw 0-9 per-module scores into the full analysis the UI/routine builder consume. */
export function buildFaceScanAnalysis(rawModules: RawModuleResult[]): FaceScanAnalysis {
  const modules: ModuleFinding[] = MODULES.map((id) => {
    const raw = rawModules.find((m) => m.id === id);
    const score = Math.max(0, Math.min(9, Math.round(raw?.score ?? 0)));
    const concern = MODULE_CONCERN[id];
    return {
      id,
      score,
      severity: severityFromScore(score),
      flagged: score >= 3,
      concern,
      ingredientId: CONCERN_INGREDIENT[concern],
      category: MODULE_CATEGORY[id],
    };
  });

  const overallScore = Math.round(
    100 - (modules.reduce((sum, m) => sum + m.score, 0) / (modules.length * 9)) * 100
  );

  const flaggedConcerns = Array.from(
    new Set(modules.filter((m) => m.flagged).map((m) => m.concern))
  );
  const suggestedIngredientIds = Array.from(
    new Set(modules.filter((m) => m.flagged).map((m) => m.ingredientId))
  );

  return { modules, overallScore, flaggedConcerns, suggestedIngredientIds };
}

/**
 * Turns the analysis into a real product routine from the actual catalog:
 * always covers cleanse/moisturize/protect, plus one product per flagged
 * module's category, preferring a match on that module's concern-derived active.
 */
export function buildSuggestedRoutine(catalog: Product[], analysis: FaceScanAnalysis): Product[] {
  const flaggedModules = analysis.modules.filter((m) => m.flagged);
  const desiredCategories = Array.from(
    new Set(["cleanser", ...flaggedModules.map((m) => m.category), "moisturizer", "sunscreen"])
  );

  const picked: Product[] = [];
  for (const category of desiredCategories) {
    const inCategory = catalog.filter((p) => p.category === category);
    if (inCategory.length === 0) continue;
    const preferred = inCategory.find((p) =>
      p.ingredientIds.some((id) => analysis.suggestedIngredientIds.includes(id))
    );
    picked.push(preferred ?? inCategory[0]);
  }
  return picked;
}
