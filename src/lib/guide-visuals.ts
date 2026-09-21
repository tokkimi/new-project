/** Distinct illustrative portraits for the public routine guides. */
const VISUALS: Record<string, string> = {
  "glass-skin": "glow", "sensitive-barrier": "sensitive-barrier", "brightening": "brightening",
  "minimalist": "minimalist", "men": "minimal", "winter": "winter", "summer": "summer",
  "acne-prone": "acne-prone", "anti-aging": "anti-aging", "pregnancy-safe": "pregnancy-safe", "teen": "teen",
};
export function guideVisual(slug: string) { return `/images/routine-${VISUALS[slug] ?? "glow"}.webp`; }
