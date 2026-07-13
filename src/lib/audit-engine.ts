import type { Product } from "@/generated/prisma/client";
import { buildRoutine, type RoutineResult } from "@/lib/routine-engine";
import { findIngredient } from "@/data/ingredients";

export type SkinProfileInput = {
  skinType: string;
  concerns: string[];
  sensitivities: string[];
};

/** Alternatives only need enough fields to display and link to a product — never the full row. */
export type CatalogProduct = Pick<
  Product,
  "id" | "slug" | "name" | "brand" | "category" | "skinTypes" | "concerns"
>;

export type MissingStepIssue = {
  type: "missing_step";
  step: "cleanser" | "moisturizer" | "sunscreen";
};

export type ProfileMismatchIssue = {
  type: "profile_mismatch";
  product: Product;
  alternatives: CatalogProduct[];
};

export type AuditIssue = MissingStepIssue | ProfileMismatchIssue;

export type EvidenceSource = "self_report" | "product_analysis" | "image_analysis" | "historical_tracking";

export type AuditConclusion = {
  id: string;
  label: string;
  severity: "low" | "moderate" | "high";
  confidence: number;
  evidenceSources: EvidenceSource[];
  supportingEvidence: string[];
  contradictoryEvidence: string[];
  interpretation: string;
  recommendedAction: string;
  medicalDiagnosis: false;
};

export type ProductDecision = {
  product: Product;
  decision: "keep" | "adjust" | "pause" | "replace";
  reason: string;
  frequency: string;
  timing: "morning" | "evening" | "both" | "pause";
  caution?: string;
};

export type AuditPriority = {
  id: string;
  level: "immediate" | "short_term" | "later";
  title: string;
  text: string;
};

export type AuditResult = {
  routine: RoutineResult;
  issues: AuditIssue[];
  score: number;
  profile: {
    baselineSkinType: string;
    currentState: string[];
    sensitivity: string;
    concerns: string[];
    aggravatingFactors: string[];
    confidence: "limited" | "medium" | "high";
    summary: string;
  };
  scores: Record<
    | "oiliness_tendency"
    | "dryness_tendency"
    | "combination_pattern"
    | "dehydration_risk"
    | "barrier_impairment_risk"
    | "sensitivity_score"
    | "redness_score"
    | "congestion_score"
    | "pigmentation_score"
    | "routine_irritation_risk"
    | "routine_consistency_score",
    number
  >;
  conclusions: AuditConclusion[];
  priorities: AuditPriority[];
  productDecisions: ProductDecision[];
  recommendedRoutine: {
    morning: string[];
    evening: string[];
    introductionCalendar: string[];
    expectedProgress: string[];
  };
  consultSignals: string[];
};

/** Ingredients at/above this layer weight are considered "strong" actives worth a skin-fit check. */
const STRONG_ACTIVE_THRESHOLD = 30;

function hasCategory(steps: RoutineResult["am"], category: string) {
  return steps.some((s) => s.product.category === category);
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function includesAny(values: string[], needles: string[]) {
  return needles.some((needle) => values.includes(needle));
}

function strongActiveCount(product: Product) {
  return product.ingredientIds.filter(
    (id) => (findIngredient(id)?.layerWeight ?? 0) >= STRONG_ACTIVE_THRESHOLD
  ).length;
}

function hasActive(product: Product, ids: string[]) {
  return product.ingredientIds.some((id) => ids.includes(id));
}

function inferTiming(product: Product): ProductDecision["timing"] {
  if (product.category === "sunscreen") return "morning";
  if (hasActive(product, ["retinol", "aha", "bha"])) return "evening";
  return "both";
}

export function auditRoutine(
  shelf: Product[],
  catalog: CatalogProduct[],
  profile: SkinProfileInput | null
): AuditResult {
  const routine = buildRoutine(shelf);
  const issues: AuditIssue[] = [];

  if (!hasCategory(routine.am, "cleanser") && !hasCategory(routine.pm, "cleanser")) {
    issues.push({ type: "missing_step", step: "cleanser" });
  }
  if (!hasCategory(routine.am, "moisturizer") && !hasCategory(routine.pm, "moisturizer")) {
    issues.push({ type: "missing_step", step: "moisturizer" });
  }
  if (!hasCategory(routine.am, "sunscreen")) {
    issues.push({ type: "missing_step", step: "sunscreen" });
  }

  if (profile) {
    for (const product of shelf) {
      const actives = product.ingredientIds.filter((id) => findIngredient(id));
      const hasStrongActive = actives.some(
        (id) => (findIngredient(id)?.layerWeight ?? 0) >= STRONG_ACTIVE_THRESHOLD
      );
      if (!hasStrongActive) continue;

      const declaredSkinTypes = product.skinTypes;
      const mismatchesSkinType =
        declaredSkinTypes.length > 0 && !declaredSkinTypes.includes(profile.skinType);
      const riskyForSensitive = profile.skinType === "sensitive";

      if (!mismatchesSkinType && !riskyForSensitive) continue;

      const alternatives = catalog
        .filter(
          (p) =>
            p.id !== product.id &&
            p.category === product.category &&
            (p.skinTypes.length === 0 || p.skinTypes.includes(profile.skinType)) &&
            (profile.concerns.length === 0 ||
              p.concerns.some((c) => profile.concerns.includes(c)))
        )
        .slice(0, 3);

      issues.push({ type: "profile_mismatch", product, alternatives });
    }
  }

  const penalties = issues.reduce(
    (sum, issue) => sum + (issue.type === "missing_step" ? 15 : 10),
    0
  );
  const conflictPenalty = routine.warnings.reduce((sum, w) => {
    if (w.rule.severity === "avoid") return sum + 12;
    if (w.rule.severity === "space_out" || w.rule.severity === "sequence") return sum + 6;
    return sum;
  }, 0);
  const score = Math.max(0, 100 - penalties - conflictPenalty);

  const hasSunscreen = hasCategory(routine.am, "sunscreen");
  const hasCleanser = hasCategory(routine.am, "cleanser") || hasCategory(routine.pm, "cleanser");
  const hasMoisturizer =
    hasCategory(routine.am, "moisturizer") || hasCategory(routine.pm, "moisturizer");
  const strongProducts = shelf.filter((product) => strongActiveCount(product) > 0);
  const exfoliantProducts = shelf.filter((product) => hasActive(product, ["aha", "bha"]));
  const retinoidProducts = shelf.filter((product) => hasActive(product, ["retinol"]));
  const soothingProducts = shelf.filter((product) => hasActive(product, ["centella", "ceramides", "hyaluronic_acid"]));
  const concernList = profile?.concerns ?? [];
  const skinType = profile?.skinType ?? "unknown";
  const isSensitive =
    skinType === "sensitive" ||
    (profile?.sensitivities.length ?? 0) > 0 ||
    includesAny(concernList, ["redness", "barrier"]);

  const routineIrritationRisk = clampScore(
    conflictPenalty * 4 +
      routine.duplicateActives.length * 16 +
      exfoliantProducts.length * 12 +
      retinoidProducts.length * 12 +
      (isSensitive ? 18 : 0)
  );
  const barrierRisk = clampScore(
    (isSensitive ? 30 : 0) +
      (hasMoisturizer ? -12 : 22) +
      soothingProducts.length * -4 +
      exfoliantProducts.length * 10 +
      retinoidProducts.length * 8 +
      conflictPenalty * 2
  );
  const dehydrationRisk = clampScore(
    (skinType === "oily" || skinType === "combination" ? 24 : 10) +
      (hasMoisturizer ? -12 : 18) +
      (hasCleanser ? 0 : 8) +
      (isSensitive ? 12 : 0)
  );
  const scores: AuditResult["scores"] = {
    oiliness_tendency: clampScore(skinType === "oily" ? 78 : skinType === "combination" ? 58 : 35),
    dryness_tendency: clampScore(skinType === "dry" ? 78 : skinType === "combination" ? 42 : 28),
    combination_pattern: clampScore(skinType === "combination" ? 82 : 30),
    dehydration_risk: dehydrationRisk,
    barrier_impairment_risk: barrierRisk,
    sensitivity_score: clampScore(isSensitive ? 72 : 28),
    redness_score: clampScore(concernList.includes("redness") ? 72 : isSensitive ? 48 : 24),
    congestion_score: clampScore(
      includesAny(concernList, ["acne", "pores"]) ? 70 : exfoliantProducts.length > 0 ? 42 : 24
    ),
    pigmentation_score: clampScore(concernList.includes("pigmentation") ? 68 : 24),
    routine_irritation_risk: routineIrritationRisk,
    routine_consistency_score: clampScore(
      100 - issues.length * 12 - routine.warnings.length * 8 - routine.duplicateActives.length * 10
    ),
  };

  const currentState = [
    scores.dehydration_risk >= 55 ? "dehydration risk" : null,
    scores.barrier_impairment_risk >= 55 ? "possible barrier stress" : null,
    scores.routine_irritation_risk >= 55 ? "routine may be too active" : null,
    !hasSunscreen ? "daily UV protection missing" : null,
  ].filter((value): value is string => Boolean(value));

  const conclusions: AuditConclusion[] = [];
  if (routineIrritationRisk >= 55) {
    conclusions.push({
      id: "active-load",
      label: "Active load is too high for a stable routine",
      severity: routineIrritationRisk >= 75 ? "high" : "moderate",
      confidence: routine.warnings.length > 0 || routine.duplicateActives.length > 0 ? 0.82 : 0.68,
      evidenceSources: ["product_analysis"],
      supportingEvidence: [
        `${strongProducts.length} products contain strong tracked actives.`,
        `${routine.warnings.length} contextual conflict or sequencing warnings were found.`,
        `${routine.duplicateActives.length} duplicate active groups were found.`,
      ],
      contradictoryEvidence: soothingProducts.length > 0 ? ["Barrier-supporting products are also present."] : [],
      interpretation:
        "This pattern is compatible with a routine that may irritate before it improves visible texture or congestion.",
      recommendedAction:
        "Simplify the routine first, separate strong actives, and keep recovery nights before adding anything new.",
      medicalDiagnosis: false,
    });
  }
  if (!hasSunscreen) {
    conclusions.push({
      id: "spf-gap",
      label: "Morning protection is incomplete",
      severity: "high",
      confidence: 0.9,
      evidenceSources: ["product_analysis"],
      supportingEvidence: ["No sunscreen step was detected in the morning routine."],
      contradictoryEvidence: [],
      interpretation:
        "Without daily broad-spectrum SPF, brightening, retinoids and exfoliation are harder to manage safely.",
      recommendedAction: "Add SPF as the final morning step before increasing active treatments.",
      medicalDiagnosis: false,
    });
  }
  if (barrierRisk >= 55) {
    conclusions.push({
      id: "barrier-risk",
      label: "Barrier support should come before optimization",
      severity: barrierRisk >= 75 ? "high" : "moderate",
      confidence: isSensitive ? 0.78 : 0.62,
      evidenceSources: ["self_report", "product_analysis"],
      supportingEvidence: [
        isSensitive ? "Profile or sensitivities suggest reactive skin." : "Routine structure suggests possible stress.",
        hasMoisturizer ? "A moisturizer is present." : "No clear moisturizer step was detected.",
      ],
      contradictoryEvidence: soothingProducts.length > 0 ? ["Some soothing or barrier-supporting ingredients are present."] : [],
      interpretation:
        "These elements can fit a temporary state of irritation or reduced tolerance. A selfie cannot measure barrier function directly.",
      recommendedAction:
        "Keep cleanser, moisturizer and SPF steady, then reintroduce strong actives one by one only if comfort improves.",
      medicalDiagnosis: false,
    });
  }

  const productDecisions: ProductDecision[] = shelf.map((product) => {
    const conflict = routine.warnings.find(
      (warning) => warning.productA.id === product.id || warning.productB.id === product.id
    );
    const duplicated = routine.duplicateActives.some((group) =>
      group.products.some((p) => p.id === product.id)
    );
    const mismatch = issues.some(
      (issue) => issue.type === "profile_mismatch" && issue.product.id === product.id
    );
    const isStrong = strongActiveCount(product) > 0;
    const timing = inferTiming(product);

    if (conflict?.rule.severity === "avoid") {
      return {
        product,
        decision: "pause",
        reason: "This product is part of a high-risk active combination in the current routine.",
        frequency: "Pause while the routine is being stabilized.",
        timing: "pause",
        caution: "Reintroduce only after the conflicting active has been separated or removed.",
      };
    }
    if (conflict || duplicated || mismatch) {
      return {
        product,
        decision: "adjust",
        reason: duplicated
          ? "The same strong active appears in several products, which can make tolerance harder to read."
          : mismatch
            ? "This active product may not be the best fit for the declared profile."
            : "This product needs better timing or spacing with another active.",
        frequency: isStrong ? "Start 1-3 times per week, then increase only if comfortable." : "Use as tolerated.",
        timing,
        caution: conflict ? "Do not layer it with the conflicting active at the beginning." : undefined,
      };
    }
    return {
      product,
      decision: "keep",
      reason: isStrong
        ? "This product can stay if introduced progressively and tolerated."
        : "This product does not create a major routine issue in the current audit.",
      frequency: isStrong ? "Use on planned active nights or mornings." : "Use daily if comfortable.",
      timing,
    };
  });

  const priorities: AuditPriority[] = [
    routineIrritationRisk >= 55
      ? {
          id: "simplify",
          level: "immediate",
          title: "Reduce irritation risk first",
          text: "Separate strong actives and keep recovery nights before targeting glow, pores or fine lines.",
        }
      : null,
    !hasSunscreen
      ? {
          id: "spf",
          level: "immediate",
          title: "Add daily SPF",
          text: "SPF is the base step before pigmentation, retinoid or exfoliation work.",
        }
      : null,
    !hasMoisturizer
      ? {
          id: "moisturizer",
          level: "short_term",
          title: "Restore a moisturizer step",
          text: "A stable moisturizer makes actives easier to tolerate and helps reduce dehydration signs.",
        }
      : null,
    {
      id: "optimize",
      level: "later",
      title: "Optimize texture, marks and radiance later",
      text: "Once comfort and consistency are stable, target secondary goals one active at a time.",
    },
  ].filter((priority): priority is AuditPriority => Boolean(priority));

  const baselineLabel =
    skinType === "oily"
      ? "oily tendency"
      : skinType === "dry"
        ? "dry tendency"
        : skinType === "combination"
          ? "combination tendency"
          : skinType === "sensitive"
            ? "reactive tendency"
            : skinType === "normal"
              ? "balanced tendency"
              : "not confirmed yet";

  const profileSummary = `Your skin profile reads as ${baselineLabel}${
    currentState.length ? `, currently with ${currentState.join(", ")}` : ""
  }.`;

  return {
    routine,
    issues,
    score,
    profile: {
      baselineSkinType: baselineLabel,
      currentState,
      sensitivity: isSensitive ? "reactive or sensitivity-prone" : "no strong sensitivity signal from current profile",
      concerns: concernList,
      aggravatingFactors: [
        routineIrritationRisk >= 55 ? "strong active stacking" : null,
        !hasSunscreen ? "missing SPF" : null,
        routine.duplicateActives.length > 0 ? "duplicate actives" : null,
      ].filter((value): value is string => Boolean(value)),
      confidence: profile ? (latestDataIsThin(shelf, profile) ? "medium" : "high") : "limited",
      summary: profileSummary,
    },
    scores,
    conclusions,
    priorities,
    productDecisions,
    recommendedRoutine: {
      morning: [
        hasCleanser ? "Cleanse only if needed or after sweat." : "Add a gentle cleanser if the morning skin feels oily or coated.",
        "Use one priority treatment only if the skin is comfortable.",
        hasMoisturizer ? "Moisturizer if the skin feels tight or dehydrated." : "Add a simple moisturizer.",
        hasSunscreen ? "Keep SPF as the final step." : "Introduce broad-spectrum SPF as the final morning step.",
      ],
      evening: [
        "Remove sunscreen and makeup fully.",
        hasCleanser ? "Cleanse gently without scrubbing." : "Use a gentle cleanser at night.",
        routineIrritationRisk >= 55
          ? "Pause extra actives on recovery nights."
          : "Use the active that matches the top priority, not several at once.",
        hasMoisturizer ? "Finish with moisturizer." : "Finish with a basic moisturizer.",
      ],
      introductionCalendar: [
        "Weeks 1-2: stabilize cleanser, moisturizer and SPF. No new strong active if irritation is present.",
        "Week 3: introduce only one active, two nights per week.",
        "Weeks 4-6: increase only if there is no burning, peeling or persistent redness.",
      ],
      expectedProgress: [
        "Comfort and stinging can change first.",
        "Congestion and post-blemish marks usually need a longer, consistent period.",
        "Pigmentation, texture and visible lines should be reassessed after several stable weeks.",
      ],
    },
    consultSignals: [
      "Deep, painful or rapidly worsening lesions.",
      "Swelling, blistering, oozing, severe burning or reaction near the eyes.",
      "A mole or spot changing quickly.",
      "Persistent problems despite a simplified routine.",
    ],
  };
}

function latestDataIsThin(shelf: Product[], profile: SkinProfileInput) {
  return shelf.length < 3 || profile.concerns.length === 0;
}
