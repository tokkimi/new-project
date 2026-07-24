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

export type SkinType = "oily" | "dry" | "combination" | "normal" | "sensitive";

/** Capture-quality problems that make a photo less reliable to read. */
export type CaptureIssue =
  | "lighting"
  | "blur"
  | "angle"
  | "makeupOrFilter"
  | "occlusion"
  | "resolution";

export const CAPTURE_ISSUES: CaptureIssue[] = [
  "lighting",
  "blur",
  "angle",
  "makeupOrFilter",
  "occlusion",
  "resolution",
];

export type CaptureQuality = {
  /** false when the photo is too poor to produce a trustworthy read at all. */
  usable: boolean;
  issues: CaptureIssue[];
};

export type MedicalReferral = {
  advised: boolean;
  reason?: string;
};

/** Below this the module is treated as "not reliably assessable": no product recs, no flag. */
export const MIN_CONFIDENCE = 0.4;

export type RawModuleResult = {
  id: ModuleId;
  /** 0 (clear) to 9 (severe), a direct visual read of this specific photo. */
  score: number;
  /** Short model-written observation specific to this photo, e.g. "T-zone shows visible shine, cheeks are matte." */
  note?: string;
  /** 0-1: how reliably this module could be judged from THIS photo. */
  confidence?: number;
  /** false when this zone wasn't visible/clear enough to assess. */
  observable?: boolean;
};

export type ModuleFinding = {
  id: ModuleId;
  score: number;
  severity: ZoneSeverity;
  flagged: boolean;
  concern: Concern;
  ingredientId: string;
  category: string;
  note?: string;
  /** 0-1 reliability of this module's read. Defaults to 1 for older saved scans. */
  confidence: number;
  /** Whether the zone was actually assessable. Defaults to true for older saved scans. */
  observable: boolean;
};

export type FaceScanAnalysis = {
  modules: ModuleFinding[];
  overallScore: number;
  flaggedConcerns: Concern[];
  suggestedIngredientIds: string[];
  skinType?: SkinType;
  summary?: string;
  /** Overall confidence 0-1, averaged over the modules that were observable. */
  confidence?: number;
  captureQuality?: CaptureQuality;
  medicalReferral?: MedicalReferral;
};

function severityFromScore(score: number): ZoneSeverity {
  if (score >= 7) return "attention";
  if (score >= 3) return "medium";
  return "low";
}

function clampConfidence(value: number | undefined): number {
  if (typeof value !== "number" || Number.isNaN(value)) return 1;
  return Math.max(0, Math.min(1, value));
}

/** Turns the model's raw 0-9 per-module scores into the full analysis the UI/routine builder consume. */
export function buildFaceScanAnalysis(
  rawModules: RawModuleResult[],
  extra?: {
    skinType?: SkinType;
    summary?: string;
    captureQuality?: CaptureQuality;
    medicalReferral?: MedicalReferral;
  }
): FaceScanAnalysis {
  const modules: ModuleFinding[] = MODULES.map((id) => {
    const raw = rawModules.find((m) => m.id === id);
    const score = Math.max(0, Math.min(9, Math.round(raw?.score ?? 0)));
    const confidence = clampConfidence(raw?.confidence);
    const observable = raw?.observable ?? true;
    const concern = MODULE_CONCERN[id];
    // Only flag a concern (and recommend products for it) when we could actually
    // see the zone AND we're confident enough — a low-confidence read must never
    // drive a product recommendation.
    const reliable = observable && confidence >= MIN_CONFIDENCE;
    return {
      id,
      score,
      severity: severityFromScore(score),
      flagged: reliable && score >= 3,
      concern,
      ingredientId: CONCERN_INGREDIENT[concern],
      category: MODULE_CATEGORY[id],
      note: raw?.note,
      confidence,
      observable,
    };
  });

  // Overall score is computed only over the modules we could actually assess,
  // so an unreadable zone neither inflates ("looks perfect") nor deflates it.
  const scored = modules.filter((m) => m.observable);
  const scoredForAverage = scored.length > 0 ? scored : modules;
  const overallScore = Math.round(
    100 - (scoredForAverage.reduce((sum, m) => sum + m.score, 0) / (scoredForAverage.length * 9)) * 100
  );

  const confidence =
    scored.length > 0
      ? scored.reduce((sum, m) => sum + m.confidence, 0) / scored.length
      : 0;

  const flaggedConcerns = Array.from(
    new Set(modules.filter((m) => m.flagged).map((m) => m.concern))
  );
  const suggestedIngredientIds = Array.from(
    new Set(modules.filter((m) => m.flagged).map((m) => m.ingredientId))
  );

  return {
    modules,
    overallScore,
    flaggedConcerns,
    suggestedIngredientIds,
    skinType: extra?.skinType,
    summary: extra?.summary,
    confidence,
    captureQuality: extra?.captureQuality,
    medicalReferral: extra?.medicalReferral,
  };
}

/** One zone, compared against the same zone in an earlier scan. */
export type ModuleComparison = {
  id: ModuleId;
  /** current.score - previous.score. Negative = clearer now (improved). */
  delta: number;
  direction: "improved" | "stable" | "watch" | "unknown";
  /** True only when both scans could actually see & confidently read this zone. */
  comparable: boolean;
};

export type ScanComparison = {
  overallDelta: number;
  daysBetween: number;
  /** How many zones were reliably comparable between the two scans. */
  comparableCount: number;
  modules: ModuleComparison[];
};

/** A minimal shape of an earlier scan needed for comparison (from stored analysis JSON). */
export type PreviousScan = {
  createdAt: string;
  overallScore: number;
  modules: Array<{ id: ModuleId; score: number; observable?: boolean; confidence?: number }>;
};

// Below this absolute change we treat a zone as "stable" rather than claiming a
// direction — small frame/lighting differences shouldn't read as real change.
const MEANINGFUL_DELTA = 2;

/**
 * Compares a fresh analysis to an earlier scan, zone by zone. Deliberately
 * conservative: a zone is only given a direction when BOTH scans could see and
 * confidently read it, and only when the change clears a meaningful threshold —
 * everything else is "stable" or "unknown", never a false "improved/worse".
 */
export function compareScans(current: FaceScanAnalysis, previous: PreviousScan): ScanComparison {
  const prevById = new Map(previous.modules.map((m) => [m.id, m]));

  const modules: ModuleComparison[] = current.modules.map((cur) => {
    const prev = prevById.get(cur.id);
    const prevObservable = prev?.observable ?? true;
    const prevConfident = (prev?.confidence ?? 1) >= MIN_CONFIDENCE;
    const comparable =
      !!prev && cur.observable && cur.confidence >= MIN_CONFIDENCE && prevObservable && prevConfident;

    if (!comparable || !prev) {
      return { id: cur.id, delta: 0, direction: "unknown", comparable: false };
    }
    const delta = cur.score - prev.score;
    const direction: ModuleComparison["direction"] =
      delta <= -MEANINGFUL_DELTA ? "improved" : delta >= MEANINGFUL_DELTA ? "watch" : "stable";
    return { id: cur.id, delta, direction, comparable: true };
  });

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysBetween = Math.max(
    0,
    Math.round((Date.now() - new Date(previous.createdAt).getTime()) / msPerDay)
  );

  return {
    overallDelta: current.overallScore - previous.overallScore,
    daysBetween,
    comparableCount: modules.filter((m) => m.comparable).length,
    modules,
  };
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
