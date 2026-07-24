import { INGREDIENTS, findIngredient } from "@/data/ingredients";

export type ExposureSlot = "morning" | "evening" | "both" | "pause";

const TRACKED = new Set(INGREDIENTS.map((i) => i.id));

// Potentially-irritating actives — stacking several of these on the same part
// of the day is the pattern worth surfacing.
const IRRITANTS = new Set(["retinol", "aha", "bha", "benzoyl_peroxide"]);

// At/above this many products sharing one active, the repetition is worth noting.
const REDUNDANT_THRESHOLD = 3;

export type ActiveExposure = {
  ingredientId: string;
  productCount: number;
  amCount: number;
  pmCount: number;
  isIrritant: boolean;
};

export type ExposureFinding =
  | { kind: "redundant"; ingredientId: string; count: number }
  | { kind: "irritantStack"; slot: "morning" | "evening"; ingredientIds: string[] };

export type ExposureReport = {
  /** Tracked actives on the shelf, sorted by how many products carry each. */
  actives: ActiveExposure[];
  findings: ExposureFinding[];
  /** Number of shelf products (not paused) carrying at least one tracked active. */
  trackedProductCount: number;
};

/**
 * Cumulative ingredient-exposure read over the whole shelf: how often each
 * tracked active is repeated across products, and whether several irritating
 * actives land on the same part of the day. Reasons only about presence and
 * frequency — never about dose, since real concentrations aren't known and
 * must not be inferred from INCI position.
 */
export function analyzeExposure(
  items: { ingredientIds: string[]; slot: ExposureSlot }[]
): ExposureReport {
  const map = new Map<string, ActiveExposure>();
  let trackedProductCount = 0;

  for (const item of items) {
    if (item.slot === "pause") continue;
    const tracked = item.ingredientIds.filter((id) => TRACKED.has(id));
    if (tracked.length > 0) trackedProductCount += 1;
    const slotAm = item.slot === "morning" || item.slot === "both";
    const slotPm = item.slot === "evening" || item.slot === "both";
    for (const id of tracked) {
      // Intersect the product's assigned slot with the active's own time
      // preference, so a PM-only active (retinol, AHA, BHA) never counts as a
      // morning exposure just because the product's slot was left as "both".
      const pref = findIngredient(id)?.timePref ?? "both";
      const ingAm = pref === "am" || pref === "both";
      const ingPm = pref === "pm" || pref === "both";
      const cur =
        map.get(id) ??
        { ingredientId: id, productCount: 0, amCount: 0, pmCount: 0, isIrritant: IRRITANTS.has(id) };
      cur.productCount += 1;
      if (slotAm && ingAm) cur.amCount += 1;
      if (slotPm && ingPm) cur.pmCount += 1;
      map.set(id, cur);
    }
  }

  const actives = Array.from(map.values()).sort(
    (a, b) => b.productCount - a.productCount || a.ingredientId.localeCompare(b.ingredientId)
  );

  const findings: ExposureFinding[] = [];
  for (const a of actives) {
    if (a.productCount >= REDUNDANT_THRESHOLD) {
      findings.push({ kind: "redundant", ingredientId: a.ingredientId, count: a.productCount });
    }
  }
  for (const slot of ["morning", "evening"] as const) {
    const present = actives
      .filter((a) => a.isIrritant && (slot === "morning" ? a.amCount > 0 : a.pmCount > 0))
      .map((a) => a.ingredientId);
    if (present.length >= 2) {
      findings.push({ kind: "irritantStack", slot, ingredientIds: present });
    }
  }

  return { actives, findings, trackedProductCount };
}
