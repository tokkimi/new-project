// Strong / potentially-irritating actives that should NOT be layered on the
// same evening — the whole point of a weekly rhythm is to space these out.
const STRONG = ["retinol", "aha", "bha", "benzoyl_peroxide"];

// Day indices spread so the first placements land on non-adjacent evenings
// (Mon, Wed, Fri, Sun, Tue, Thu, Sat) before filling the gaps.
const SPREAD_ORDER = [0, 2, 4, 6, 1, 3, 5];

export type EveningKind = "active" | "recovery";

export type EveningPlan = {
  /** 0 = Monday … 6 = Sunday */
  day: number;
  activeId: string | null;
  kind: EveningKind;
};

/**
 * Builds a 7-evening rhythm that spaces the user's strongest actives across
 * the week — never two on the same night, with the untouched evenings left as
 * barrier "recovery" nights. Deterministic and rule-based: it's a suggested
 * cadence, not a prescription.
 */
export function buildWeeklyRhythm(shelfActiveIds: string[]): EveningPlan[] {
  const present = STRONG.filter((id) => shelfActiveIds.includes(id));
  const evenings: (string | null)[] = Array(7).fill(null);

  if (present.length > 0) {
    // With many strong actives, one night each keeps the week from being all
    // actives; with one or two, give each a couple of spaced nights.
    const nightsPerActive = present.length >= 3 ? 1 : 2;
    for (let round = 0; round < nightsPerActive; round++) {
      for (const activeId of present) {
        const freeDay = SPREAD_ORDER.find((d) => evenings[d] === null);
        if (freeDay === undefined) break;
        evenings[freeDay] = activeId;
      }
    }
  }

  return evenings.map((activeId, day) => ({
    day,
    activeId,
    kind: activeId ? "active" : "recovery",
  }));
}

export function hasStrongActives(shelfActiveIds: string[]): boolean {
  return STRONG.some((id) => shelfActiveIds.includes(id));
}
