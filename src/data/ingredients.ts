export type TimeSlot = "am" | "pm" | "both";

export type Ingredient = {
  id: string;
  aliases: string[];
  timePref: TimeSlot;
  /** Lower = applied earlier in a routine step (thin/reactive actives first). */
  layerWeight: number;
  /** Increases the skin's sensitivity to UV — always pair with daytime SPF. */
  photosensitizing?: boolean;
  /** Commonly advised to avoid or discuss with a professional in pregnancy. */
  pregnancyCaution?: boolean;
  /** Typical leave-on concentration range as seen on labels; locale-independent. */
  typicalConcentration?: string;
};

export type ConflictSeverity = "avoid" | "space_out" | "sequence" | "note";

/**
 * How settled the guidance behind a rule is — an honest classification of
 * cosmetic consensus, NOT a specific citation. "established" = widely agreed in
 * cosmetic science, "advised" = commonly recommended but not a hard rule,
 * "myth" = a popular belief that's actually unfounded.
 */
export type EvidenceLevel = "established" | "advised" | "myth";

export type ConflictRule = {
  id: string;
  a: string;
  b: string;
  severity: ConflictSeverity;
  evidenceLevel: EvidenceLevel;
};

// Display text (name, summary, headline, reason, recommendation, category labels)
// lives in messages/{locale}.json under ingredients.*, conflictRules.*, categories.* —
// keep this file to structural/rule data only so it stays locale-independent.
// Product data lives in the database (see src/lib/products.ts) so it can be
// managed from the admin backend.

// Aliases include the standardized Korean ingredient names (성분명) commonly
// printed on Korean cosmetic labels, so OCR of a hangul INCI list detects the
// same tracked actives. Matching lowercases the text, which leaves hangul
// unchanged. Only well-established Korean names are added here — nothing guessed.
export const INGREDIENTS: Ingredient[] = [
  { id: "retinol", aliases: ["retinol", "retinal", "tretinoin", "adapalene", "레티놀", "레티날", "아다팔렌"], timePref: "pm", layerWeight: 40, photosensitizing: true, pregnancyCaution: true, typicalConcentration: "0.1–1%" },
  { id: "vitamin_c", aliases: ["ascorbic acid", "vitamin c", "l-ascorbic acid", "아스코빅애씨드", "아스코르브산", "아스코르빈산", "비타민c"], timePref: "am", layerWeight: 20, typicalConcentration: "10–20%" },
  { id: "niacinamide", aliases: ["vitamin b3", "nicotinamide", "niacinamide", "나이아신아마이드", "니아신아마이드"], timePref: "both", layerWeight: 25, typicalConcentration: "2–10%" },
  { id: "aha", aliases: ["glycolic acid", "lactic acid", "mandelic acid", "글라이콜릭애씨드", "글리콜산", "락틱애씨드", "젖산", "만델릭애씨드"], timePref: "pm", layerWeight: 30, photosensitizing: true, typicalConcentration: "5–10%" },
  { id: "bha", aliases: ["salicylic acid", "살리실릭애씨드", "살리실산"], timePref: "pm", layerWeight: 30, pregnancyCaution: true, typicalConcentration: "0.5–2%" },
  { id: "benzoyl_peroxide", aliases: ["benzoyl peroxide", "bpo", "벤조일퍼옥사이드", "과산화벤조일"], timePref: "both", layerWeight: 35, typicalConcentration: "2.5–10%" },
  { id: "vitamin_e", aliases: ["tocopherol", "토코페롤"], timePref: "both", layerWeight: 22, typicalConcentration: "0.5–1%" },
  { id: "peptides", aliases: ["copper peptides", "ghk-cu", "peptides", "펩타이드", "카퍼펩타이드"], timePref: "both", layerWeight: 45 },
  { id: "hyaluronic_acid", aliases: ["hyaluronic acid", "sodium hyaluronate", "하이알루로닉애씨드", "소듐하이알루로네이트", "히알루론산"], timePref: "both", layerWeight: 15, typicalConcentration: "0.1–2%" },
  { id: "centella", aliases: ["cica", "centella", "madecassoside", "센텔라아시아티카", "마데카소사이드", "병풀", "시카"], timePref: "both", layerWeight: 18 },
  { id: "spf", aliases: ["spf", "sunscreen", "avobenzone", "zinc oxide", "titanium dioxide", "자외선차단", "아보벤존", "징크옥사이드", "티타늄디옥사이드"], timePref: "am", layerWeight: 90 },
  { id: "ceramides", aliases: ["ceramide", "ceramides", "세라마이드"], timePref: "both", layerWeight: 55 },
];

export const CONFLICT_RULES: ConflictRule[] = [
  { id: "retinol_aha_bha", a: "retinol", b: "aha", severity: "avoid", evidenceLevel: "established" },
  { id: "retinol_bha", a: "retinol", b: "bha", severity: "avoid", evidenceLevel: "established" },
  { id: "retinol_benzoyl", a: "retinol", b: "benzoyl_peroxide", severity: "avoid", evidenceLevel: "established" },
  { id: "vitc_retinol_timing", a: "vitamin_c", b: "retinol", severity: "sequence", evidenceLevel: "advised" },
  { id: "aha_bha_together", a: "aha", b: "bha", severity: "space_out", evidenceLevel: "advised" },
  { id: "niacinamide_vitc_myth", a: "niacinamide", b: "vitamin_c", severity: "note", evidenceLevel: "myth" },
  { id: "peptides_aha", a: "peptides", b: "aha", severity: "space_out", evidenceLevel: "advised" },
  { id: "spf_am_only", a: "spf", b: "retinol", severity: "note", evidenceLevel: "advised" },
];

export function findIngredient(id: string): Ingredient | undefined {
  return INGREDIENTS.find((i) => i.id === id);
}
