// Stable reaction codes stored in the DB. Display text is localized in the UI
// (messages/*.json → reactions.types.*); the database only ever holds the code.
export const REACTION_TYPES = [
  "none",
  "tingling",
  "burning",
  "tightness",
  "breakout",
  "redness",
  "dryness",
  "greasy",
  "pilling",
  "improvement",
] as const;

export type ReactionType = (typeof REACTION_TYPES)[number];

// Reactions that are adverse (worth flagging when they recur). "none" and
// "improvement" are positive/neutral and never surfaced as a concern.
const ADVERSE = new Set<string>([
  "tingling",
  "burning",
  "tightness",
  "breakout",
  "redness",
  "dryness",
  "greasy",
  "pilling",
]);

export function isReactionType(value: unknown): value is ReactionType {
  return typeof value === "string" && (REACTION_TYPES as readonly string[]).includes(value);
}

export type ReactionRecord = { type: string; productId: string | null };

export type RecurrenceFinding = { productId: string; type: string; count: number };

/**
 * Finds adverse reactions that recur for the same product. Purely a personal
 * pattern signal — never presented as medical proof that the product caused it.
 */
export function findRecurrences(records: ReactionRecord[], min = 3): RecurrenceFinding[] {
  const counts = new Map<string, number>();
  for (const r of records) {
    if (!r.productId || !ADVERSE.has(r.type)) continue;
    const key = `${r.productId}::${r.type}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const out: RecurrenceFinding[] = [];
  for (const [key, count] of counts) {
    if (count >= min) {
      const [productId, type] = key.split("::");
      out.push({ productId, type, count });
    }
  }
  return out.sort((a, b) => b.count - a.count);
}
