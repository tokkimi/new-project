import { CONCERNS } from "@/lib/validation";
import type { Product } from "@/generated/prisma/client";

export type FaceZoneId = "forehead" | "nose" | "cheeks" | "underEye" | "chin";
export type ZoneSeverity = "low" | "medium" | "attention";

type ZoneDef = {
  id: FaceZoneId;
  concern: (typeof CONCERNS)[number];
  ingredientId: string;
  category: string;
};

// Deliberately simple, deterministic-per-run mapping: one plausible concern
// per face region, tied to a real active/category from the ingredient rule
// engine and product catalog so the "suggested routine" below is built from
// real data, not invented claims. This is a simulated visual read, not a
// real computer-vision model — the UI is explicit about that.
const ZONES: ZoneDef[] = [
  { id: "forehead", concern: "pores", ingredientId: "niacinamide", category: "toner" },
  { id: "nose", concern: "acne", ingredientId: "bha", category: "toner" },
  { id: "cheeks", concern: "hydration", ingredientId: "hyaluronic_acid", category: "essence" },
  { id: "underEye", concern: "aging", ingredientId: "peptides", category: "eye" },
  { id: "chin", concern: "redness", ingredientId: "centella", category: "serum" },
];

export type ZoneFinding = {
  id: FaceZoneId;
  flagged: boolean;
  severity: ZoneSeverity;
  concern: (typeof CONCERNS)[number];
  ingredientId: string;
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

const CARE_TIPS: { id: CareTipId; concerns: (typeof CONCERNS)[number][] }[] = [
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
  flaggedConcerns: (typeof CONCERNS)[number][];
  suggestedIngredientIds: string[];
  careTipIds: CareTipId[];
};

function rollSeverity(): ZoneSeverity {
  return Math.random() < 0.3 ? "attention" : "medium";
}

export function analyzeFaceScan(): FaceScanAnalysis {
  const zones: ZoneFinding[] = ZONES.map((z) => {
    const flagged = Math.random() < 0.6;
    return {
      id: z.id,
      flagged,
      severity: flagged ? rollSeverity() : "low",
      concern: z.concern,
      ingredientId: z.ingredientId,
      category: z.category,
    };
  });

  if (zones.every((z) => !z.flagged)) {
    const idx = Math.floor(Math.random() * zones.length);
    zones[idx] = { ...zones[idx], flagged: true, severity: "medium" };
  }

  const flaggedConcerns = Array.from(
    new Set(zones.filter((z) => z.flagged).map((z) => z.concern))
  );
  const suggestedIngredientIds = Array.from(
    new Set(zones.filter((z) => z.flagged).map((z) => z.ingredientId))
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
 * zone's category, preferring a match on the zone's suggested active.
 */
export function buildSuggestedRoutine(catalog: Product[], analysis: FaceScanAnalysis): Product[] {
  const flaggedCategories = analysis.zones.filter((z) => z.flagged).map((z) => z.category);
  const desiredCategories = Array.from(
    new Set(["cleanser", ...flaggedCategories, "moisturizer", "sunscreen"])
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
