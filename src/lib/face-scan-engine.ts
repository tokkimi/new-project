import { CONCERNS } from "@/lib/validation";
import type { Product } from "@/generated/prisma/client";

export type FaceZoneId = "forehead" | "nose" | "cheeks" | "underEye" | "chin";
export type ZoneSeverity = "low" | "medium" | "attention";
export type Concern = (typeof CONCERNS)[number];

export const FACE_ZONES: FaceZoneId[] = ["forehead", "nose", "cheeks", "underEye", "chin"];

// Anatomical mapping — which product category applies to a given face zone.
// This is fixed (a fact about skincare routines), unlike the concern found
// there, which comes from the actual photo analysis.
const ZONE_CATEGORY: Record<FaceZoneId, string> = {
  forehead: "toner",
  nose: "toner",
  cheeks: "essence",
  underEye: "eye",
  chin: "serum",
};

// Which active ingredient (from our tracked taxonomy) best addresses each
// concern, used to prefer a matching product when building a routine.
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

export type RawZoneResult = {
  id: FaceZoneId;
  flagged: boolean;
  severity: ZoneSeverity;
  concern: Concern | null;
};

export type ZoneFinding = {
  id: FaceZoneId;
  flagged: boolean;
  severity: ZoneSeverity;
  concern: Concern | null;
  ingredientId: string | null;
  category: string;
};

export type CareTipId =
  | "doubleCleanse"
  | "spfReapply"
  | "gentleExfoliation"
  | "barrierSupport"
  | "handsOff"
  | "sleepHydration"
  | "pillowcase"
  | "patchTestActives";

const CARE_TIPS: { id: CareTipId; concerns: Concern[] }[] = [
  { id: "doubleCleanse", concerns: [] },
  { id: "spfReapply", concerns: [] },
  { id: "gentleExfoliation", concerns: ["pores", "acne", "dullness"] },
  { id: "barrierSupport", concerns: ["barrier", "redness", "aging"] },
  { id: "handsOff", concerns: ["acne", "pores"] },
  { id: "sleepHydration", concerns: ["hydration", "aging"] },
  { id: "pillowcase", concerns: ["acne", "pores"] },
  { id: "patchTestActives", concerns: ["redness", "barrier"] },
];

export type FaceScanAnalysis = {
  zones: ZoneFinding[];
  flaggedConcerns: Concern[];
  suggestedIngredientIds: string[];
  careTipIds: CareTipId[];
};

/** Turns the model's raw per-zone read into the full analysis the UI/routine builder consume. */
export function buildFaceScanAnalysis(rawZones: RawZoneResult[]): FaceScanAnalysis {
  const zones: ZoneFinding[] = FACE_ZONES.map((id) => {
    const raw = rawZones.find((z) => z.id === id);
    const flagged = raw?.flagged ?? false;
    const concern = flagged ? raw?.concern ?? null : null;
    return {
      id,
      flagged,
      severity: flagged ? raw?.severity ?? "medium" : "low",
      concern,
      ingredientId: concern ? CONCERN_INGREDIENT[concern] : null,
      category: ZONE_CATEGORY[id],
    };
  });

  const flaggedConcerns = Array.from(
    new Set(zones.filter((z) => z.flagged && z.concern).map((z) => z.concern as Concern))
  );
  const suggestedIngredientIds = Array.from(
    new Set(zones.filter((z) => z.ingredientId).map((z) => z.ingredientId as string))
  );

  const universal = CARE_TIPS.filter((t) => t.concerns.length === 0).map((t) => t.id);
  const matched = CARE_TIPS.filter(
    (t) => t.concerns.length > 0 && t.concerns.some((c) => flaggedConcerns.includes(c))
  ).map((t) => t.id);
  const careTipIds = Array.from(new Set([...universal, ...matched])).slice(0, 5);

  return { zones, flaggedConcerns, suggestedIngredientIds, careTipIds };
}

/**
 * Turns the analysis into a real product routine from the actual catalog:
 * always covers cleanse/moisturize/protect, plus one product per flagged
 * zone's category, preferring a match on that zone's concern-derived active.
 */
export function buildSuggestedRoutine(catalog: Product[], analysis: FaceScanAnalysis): Product[] {
  const flaggedZones = analysis.zones.filter((z) => z.flagged);
  const desiredCategories = Array.from(
    new Set(["cleanser", ...flaggedZones.map((z) => z.category), "moisturizer", "sunscreen"])
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
