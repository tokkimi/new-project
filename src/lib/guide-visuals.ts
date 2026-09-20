/** Portraits explicitly approved for the public routine guides. */
const VISUALS: Record<string, string> = {
  "glass-skin": "glow", "sensitive-barrier": "hydration", "brightening": "brightening",
  "minimalist": "minimal", "men": "minimal", "winter": "hydration", "summer": "glow",
};
export function guideVisual(slug: string) { return `/images/routine-${VISUALS[slug] ?? "glow"}.webp`; }
