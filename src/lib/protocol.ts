// The single deliberate change under test. The whole discipline of the Routine
// Lab is changing ONE thing at a time so cause and effect stay legible.
export const CHANGE_KINDS = ["pause", "reduce", "add"] as const;
export type ChangeKind = (typeof CHANGE_KINDS)[number];

export const PROTOCOL_GOALS = ["barrier", "irritation", "congestion", "marks", "hydration"] as const;
export type ProtocolGoal = (typeof PROTOCOL_GOALS)[number];

export const PROTOCOL_OUTCOMES = ["keep", "remove", "adjust"] as const;
export type ProtocolOutcome = (typeof PROTOCOL_OUTCOMES)[number];

export const PROTOCOL_DURATIONS = [7, 14, 28] as const;

export function daysElapsed(startedAt: string | Date): number {
  const start = new Date(startedAt).getTime();
  return Math.max(0, Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24)));
}

/** Scan check-in days within a protocol window (day 1, mid-point, and the end). */
export function checkpointDays(durationDays: number): number[] {
  const mid = Math.round(durationDays / 2);
  return Array.from(new Set([1, mid, durationDays])).sort((a, b) => a - b);
}
