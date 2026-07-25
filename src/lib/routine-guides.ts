import { categoryOrder } from "@/lib/categories";

export type GuideSlot = "am" | "pm" | "both";
export type GuideFreq = "daily" | "everyOther" | "twiceWeek" | "asNeeded";

export type GuideStep = {
  slot: GuideSlot;
  category: string; // PRODUCT_CATEGORIES slug
  activeId?: string; // tracked active id (links to the encyclopedia)
  freq: GuideFreq;
};

export type RoutineGuide = {
  slug: string;
  /** Tracked actives featured in the guide — shown as chips on the index card. */
  actives: string[];
  steps: GuideStep[];
};

/**
 * Curated editorial routines — general starting points, deliberately kept
 * separate from buildRoutine() (which sequences the user's actual shelf).
 * Steps are expressed as ordinary category + optional tracked active, never a
 * specific product, so nothing is fabricated and every active links to its
 * encyclopedia page.
 */
export const ROUTINE_GUIDES: RoutineGuide[] = [
  {
    slug: "glass-skin",
    actives: ["hyaluronic_acid", "niacinamide", "ceramides"],
    steps: [
      { slot: "both", category: "cleanser", freq: "daily" },
      { slot: "both", category: "toner", freq: "daily" },
      { slot: "both", category: "essence", activeId: "hyaluronic_acid", freq: "daily" },
      { slot: "both", category: "serum", activeId: "niacinamide", freq: "daily" },
      { slot: "both", category: "moisturizer", activeId: "ceramides", freq: "daily" },
      { slot: "am", category: "sunscreen", activeId: "spf", freq: "daily" },
    ],
  },
  {
    slug: "acne-prone",
    actives: ["bha", "niacinamide", "benzoyl_peroxide"],
    steps: [
      { slot: "both", category: "cleanser", freq: "daily" },
      { slot: "pm", category: "serum", activeId: "bha", freq: "twiceWeek" },
      { slot: "both", category: "serum", activeId: "niacinamide", freq: "daily" },
      { slot: "pm", category: "spot", activeId: "benzoyl_peroxide", freq: "asNeeded" },
      { slot: "both", category: "moisturizer", freq: "daily" },
      { slot: "am", category: "sunscreen", activeId: "spf", freq: "daily" },
    ],
  },
  {
    slug: "anti-aging",
    actives: ["vitamin_c", "retinol", "peptides"],
    steps: [
      { slot: "both", category: "cleanser", freq: "daily" },
      { slot: "am", category: "serum", activeId: "vitamin_c", freq: "daily" },
      { slot: "pm", category: "serum", activeId: "retinol", freq: "twiceWeek" },
      { slot: "both", category: "serum", activeId: "peptides", freq: "daily" },
      { slot: "both", category: "eye", freq: "daily" },
      { slot: "both", category: "moisturizer", activeId: "ceramides", freq: "daily" },
      { slot: "am", category: "sunscreen", activeId: "spf", freq: "daily" },
    ],
  },
  {
    slug: "brightening",
    actives: ["vitamin_c", "niacinamide", "aha"],
    steps: [
      { slot: "both", category: "cleanser", freq: "daily" },
      { slot: "am", category: "serum", activeId: "vitamin_c", freq: "daily" },
      { slot: "both", category: "serum", activeId: "niacinamide", freq: "daily" },
      { slot: "pm", category: "serum", activeId: "aha", freq: "twiceWeek" },
      { slot: "both", category: "moisturizer", freq: "daily" },
      { slot: "am", category: "sunscreen", activeId: "spf", freq: "daily" },
    ],
  },
  {
    slug: "sensitive-barrier",
    actives: ["centella", "hyaluronic_acid", "ceramides"],
    steps: [
      { slot: "both", category: "cleanser", freq: "daily" },
      { slot: "both", category: "essence", activeId: "centella", freq: "daily" },
      { slot: "both", category: "serum", activeId: "hyaluronic_acid", freq: "daily" },
      { slot: "both", category: "moisturizer", activeId: "ceramides", freq: "daily" },
      { slot: "am", category: "sunscreen", activeId: "spf", freq: "daily" },
    ],
  },
  {
    slug: "minimalist",
    actives: ["hyaluronic_acid", "spf"],
    steps: [
      { slot: "both", category: "cleanser", freq: "daily" },
      { slot: "both", category: "moisturizer", activeId: "hyaluronic_acid", freq: "daily" },
      { slot: "am", category: "sunscreen", activeId: "spf", freq: "daily" },
    ],
  },
  {
    slug: "pregnancy-safe",
    actives: ["vitamin_c", "niacinamide", "centella"],
    steps: [
      { slot: "both", category: "cleanser", freq: "daily" },
      { slot: "am", category: "serum", activeId: "vitamin_c", freq: "daily" },
      { slot: "both", category: "serum", activeId: "niacinamide", freq: "daily" },
      { slot: "both", category: "essence", activeId: "centella", freq: "daily" },
      { slot: "both", category: "moisturizer", activeId: "hyaluronic_acid", freq: "daily" },
      { slot: "am", category: "sunscreen", activeId: "spf", freq: "daily" },
    ],
  },
];

export function findGuide(slug: string): RoutineGuide | undefined {
  return ROUTINE_GUIDES.find((g) => g.slug === slug);
}

/** Steps for one part of the day, ordered like a real routine (thin → occlusive). */
export function stepsForSlot(guide: RoutineGuide, slot: "am" | "pm"): GuideStep[] {
  return guide.steps
    .filter((s) => s.slot === slot || s.slot === "both")
    .sort((a, b) => categoryOrder(a.category) - categoryOrder(b.category));
}
