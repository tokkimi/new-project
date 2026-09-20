import type { Product } from "@/generated/prisma/client";
import { findIngredient } from "@/data/ingredients";
import { buildRoutine, type RoutineResult } from "@/lib/routine-engine";

export type SkinProfileInput = {
  skinType: string;
  concerns: string[];
  sensitivities: string[];
};

export type AuditLocale = "en" | "fr" | "ko" | "ja";

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

function latestDataIsThin(shelf: Product[], profile: SkinProfileInput) {
  return shelf.length < 3 || profile.concerns.length === 0;
}

export function auditRoutine(
  shelf: Product[],
  catalog: CatalogProduct[],
  profile: SkinProfileInput | null,
  locale: AuditLocale = "en"
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
            (profile.concerns.length === 0 || p.concerns.some((c) => profile.concerns.includes(c)))
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
  const soothingProducts = shelf.filter((product) =>
    hasActive(product, ["centella", "ceramides", "hyaluronic_acid"])
  );
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
    scores.dehydration_risk >= 55 ? "dehydration_risk" : null,
    scores.barrier_impairment_risk >= 55 ? "barrier_stress" : null,
    scores.routine_irritation_risk >= 55 ? "active_routine" : null,
    !hasSunscreen ? "missing_spf" : null,
  ].filter((value): value is string => Boolean(value));

  const conclusions: AuditConclusion[] = [];
  if (routineIrritationRisk >= 55) {
    conclusions.push({
      id: "active-load",
      label: "active_load_high",
      severity: routineIrritationRisk >= 75 ? "high" : "moderate",
      confidence: routine.warnings.length > 0 || routine.duplicateActives.length > 0 ? 0.82 : 0.68,
      evidenceSources: ["product_analysis"],
      supportingEvidence: [
        `strong_products:${strongProducts.length}`,
        `warnings:${routine.warnings.length}`,
        `duplicates:${routine.duplicateActives.length}`,
      ],
      contradictoryEvidence: soothingProducts.length > 0 ? ["barrier_support_present"] : [],
      interpretation: "active_load_interpretation",
      recommendedAction: "active_load_action",
      medicalDiagnosis: false,
    });
  }
  if (!hasSunscreen) {
    conclusions.push({
      id: "spf-gap",
      label: "morning_protection_incomplete",
      severity: "high",
      confidence: 0.9,
      evidenceSources: ["product_analysis"],
      supportingEvidence: ["no_sunscreen_detected"],
      contradictoryEvidence: [],
      interpretation: "spf_gap_interpretation",
      recommendedAction: "spf_gap_action",
      medicalDiagnosis: false,
    });
  }
  if (barrierRisk >= 55) {
    conclusions.push({
      id: "barrier-risk",
      label: "barrier_before_optimization",
      severity: barrierRisk >= 75 ? "high" : "moderate",
      confidence: isSensitive ? 0.78 : 0.62,
      evidenceSources: ["self_report", "product_analysis"],
      supportingEvidence: [
        isSensitive ? "reactive_profile_signal" : "routine_stress_signal",
        hasMoisturizer ? "moisturizer_present" : "no_moisturizer_detected",
      ],
      contradictoryEvidence: soothingProducts.length > 0 ? ["soothing_present"] : [],
      interpretation: "barrier_interpretation",
      recommendedAction: "barrier_action",
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
        reason: "product_pause_reason",
        frequency: "product_pause_frequency",
        timing: "pause",
        caution: "product_pause_caution",
      };
    }
    if (conflict || duplicated || mismatch) {
      return {
        product,
        decision: "adjust",
        reason: duplicated
          ? "product_duplicate_reason"
          : mismatch
            ? "product_mismatch_reason"
            : "product_spacing_reason",
        frequency: isStrong ? "product_strong_frequency" : "product_tolerated_frequency",
        timing,
        caution: conflict ? "product_conflict_caution" : undefined,
      };
    }
    return {
      product,
      decision: "keep",
      reason: isStrong ? "product_keep_strong_reason" : "product_keep_reason",
      frequency: isStrong ? "product_active_frequency" : "product_daily_frequency",
      timing,
    };
  });

  const priorities: AuditPriority[] = [
    routineIrritationRisk >= 55
      ? { id: "simplify", level: "immediate", title: "priority_irritation_title", text: "priority_irritation_text" }
      : null,
    !hasSunscreen
      ? { id: "spf", level: "immediate", title: "priority_spf_title", text: "priority_spf_text" }
      : null,
    !hasMoisturizer
      ? { id: "moisturizer", level: "short_term", title: "priority_moisturizer_title", text: "priority_moisturizer_text" }
      : null,
    { id: "optimize", level: "later", title: "priority_optimize_title", text: "priority_optimize_text" },
  ].filter((priority): priority is AuditPriority => Boolean(priority));

  const baselineLabel = baselineKey(skinType);
  const result: AuditResult = {
    routine,
    issues,
    score,
    profile: {
      baselineSkinType: baselineLabel,
      currentState,
      sensitivity: isSensitive ? "sensitivity_reactive" : "sensitivity_none",
      concerns: concernList,
      aggravatingFactors: [
        routineIrritationRisk >= 55 ? "strong_active_stacking" : null,
        !hasSunscreen ? "missing_spf" : null,
        routine.duplicateActives.length > 0 ? "duplicate_actives" : null,
      ].filter((value): value is string => Boolean(value)),
      confidence: profile ? (latestDataIsThin(shelf, profile) ? "medium" : "high") : "limited",
      summary: "profile_summary",
    },
    scores,
    conclusions,
    priorities,
    productDecisions,
    recommendedRoutine: {
      morning: [
        hasCleanser ? "morning_cleanse_optional" : "morning_add_cleanser",
        "morning_one_treatment",
        hasMoisturizer ? "morning_moisturize_if_needed" : "morning_add_moisturizer",
        hasSunscreen ? "morning_keep_spf" : "morning_add_spf",
      ],
      evening: [
        "evening_remove_spf_makeup",
        hasCleanser ? "evening_cleanse_gently" : "evening_add_cleanser",
        routineIrritationRisk >= 55 ? "evening_pause_actives" : "evening_one_active",
        hasMoisturizer ? "evening_finish_moisturizer" : "evening_add_moisturizer",
      ],
      introductionCalendar: ["calendar_weeks_1_2", "calendar_week_3", "calendar_weeks_4_6"],
      expectedProgress: ["progress_comfort", "progress_congestion", "progress_texture"],
    },
    consultSignals: ["consult_deep_pain", "consult_reaction", "consult_spot", "consult_persistent"],
  };

  return localizeAuditResult(result, locale);
}

function baselineKey(skinType: string) {
  if (skinType === "oily") return "baseline_oily";
  if (skinType === "dry") return "baseline_dry";
  if (skinType === "combination") return "baseline_combination";
  if (skinType === "sensitive") return "baseline_sensitive";
  if (skinType === "normal") return "baseline_normal";
  return "baseline_unknown";
}

const TEXT: Record<AuditLocale, Record<string, string>> = {
  "en": {
    "baseline_oily": "oily tendency",
    "baseline_dry": "dry tendency",
    "baseline_combination": "combination tendency",
    "baseline_sensitive": "reactive tendency",
    "baseline_normal": "balanced tendency",
    "baseline_unknown": "not confirmed yet",
    "dehydration_risk": "dehydration risk",
    "barrier_stress": "possible barrier stress",
    "active_routine": "routine may be too active",
    "missing_spf": "missing SPF",
    "active_load_high": "Active load is too high for a stable routine",
    "barrier_support_present": "Barrier-supporting products are also present.",
    "active_load_interpretation": "This pattern is compatible with a routine that may irritate before it improves visible texture or congestion.",
    "active_load_action": "Simplify the routine first, separate strong actives, and keep recovery nights before adding anything new.",
    "morning_protection_incomplete": "Morning protection is incomplete",
    "no_sunscreen_detected": "No sunscreen step was detected in the morning routine.",
    "spf_gap_interpretation": "Without daily broad-spectrum SPF, brightening, retinoids and exfoliation are harder to manage safely.",
    "spf_gap_action": "Add SPF as the final morning step before increasing active treatments.",
    "barrier_before_optimization": "Barrier support should come before optimization",
    "reactive_profile_signal": "Profile or sensitivities suggest reactive skin.",
    "routine_stress_signal": "Routine structure suggests possible stress.",
    "moisturizer_present": "A moisturizer is present.",
    "no_moisturizer_detected": "No clear moisturizer step was detected.",
    "soothing_present": "Some soothing or barrier-supporting ingredients are present.",
    "barrier_interpretation": "These elements can fit a temporary state of irritation or reduced tolerance. A selfie cannot measure barrier function directly.",
    "barrier_action": "Keep cleanser, moisturizer and SPF steady, then reintroduce strong actives one by one only if comfort improves.",
    "product_pause_reason": "This product is part of a high-risk active combination in the current routine.",
    "product_pause_frequency": "Pause while the routine is being stabilized.",
    "product_pause_caution": "Reintroduce only after the conflicting active has been separated or removed.",
    "product_duplicate_reason": "The same strong active appears in several products, which can make tolerance harder to read.",
    "product_mismatch_reason": "This active product may not be the best fit for the declared profile.",
    "product_spacing_reason": "This product needs better timing or spacing with another active.",
    "product_strong_frequency": "Start 1-3 times per week, then increase only if comfortable.",
    "product_tolerated_frequency": "Use as tolerated.",
    "product_conflict_caution": "Do not layer it with the conflicting active at the beginning.",
    "product_keep_strong_reason": "This product can stay if introduced progressively and tolerated.",
    "product_keep_reason": "This product does not create a major routine issue in the current audit.",
    "product_active_frequency": "Use on planned active nights or mornings.",
    "product_daily_frequency": "Use daily if comfortable.",
    "priority_irritation_title": "Reduce irritation risk first",
    "priority_irritation_text": "Separate strong actives and keep recovery nights before targeting glow, pores or fine lines.",
    "priority_spf_title": "Add daily SPF",
    "priority_spf_text": "SPF is the base step before pigmentation, retinoid or exfoliation work.",
    "priority_moisturizer_title": "Restore a moisturizer step",
    "priority_moisturizer_text": "A stable moisturizer makes actives easier to tolerate and helps reduce dehydration signs.",
    "priority_optimize_title": "Optimize texture, marks and radiance later",
    "priority_optimize_text": "Once comfort and consistency are stable, target secondary goals one active at a time.",
    "sensitivity_reactive": "reactive or sensitivity-prone",
    "sensitivity_none": "no strong sensitivity signal from current profile",
    "strong_active_stacking": "strong active stacking",
    "duplicate_actives": "duplicate actives",
    "profile_summary": "Your skin profile has been read from your answers, saved routine and current audit signals.",
    "morning_cleanse_optional": "Cleanse only if needed or after sweat.",
    "morning_add_cleanser": "Add a gentle cleanser if the morning skin feels oily or coated.",
    "morning_one_treatment": "Use one priority treatment only if the skin is comfortable.",
    "morning_moisturize_if_needed": "Moisturizer if the skin feels tight or dehydrated.",
    "morning_add_moisturizer": "Add a simple moisturizer.",
    "morning_keep_spf": "Keep SPF as the final step.",
    "morning_add_spf": "Introduce broad-spectrum SPF as the final morning step.",
    "evening_remove_spf_makeup": "Remove sunscreen and makeup fully.",
    "evening_cleanse_gently": "Cleanse gently without scrubbing.",
    "evening_add_cleanser": "Use a gentle cleanser at night.",
    "evening_pause_actives": "Pause extra actives on recovery nights.",
    "evening_one_active": "Use the active that matches the top priority, not several at once.",
    "evening_finish_moisturizer": "Finish with moisturizer.",
    "evening_add_moisturizer": "Finish with a basic moisturizer.",
    "calendar_weeks_1_2": "Weeks 1-2: stabilize cleanser, moisturizer and SPF. No new strong active if irritation is present.",
    "calendar_week_3": "Week 3: introduce only one active, two nights per week.",
    "calendar_weeks_4_6": "Weeks 4-6: increase only if there is no burning, peeling or persistent redness.",
    "progress_comfort": "Comfort and stinging can change first.",
    "progress_congestion": "Congestion and post-blemish marks usually need a longer, consistent period.",
    "progress_texture": "Pigmentation, texture and visible lines should be reassessed after several stable weeks.",
    "consult_deep_pain": "Deep, painful or rapidly worsening lesions.",
    "consult_reaction": "Swelling, blistering, oozing, severe burning or reaction near the eyes.",
    "consult_spot": "A mole or spot changing quickly.",
    "consult_persistent": "Persistent problems despite a simplified routine."
  },
  "fr": {
    "baseline_oily": "tendance grasse",
    "baseline_dry": "tendance sèche",
    "baseline_combination": "tendance mixte",
    "baseline_sensitive": "tendance réactive",
    "baseline_normal": "tendance équilibrée",
    "baseline_unknown": "pas encore confirmé",
    "dehydration_risk": "risque de déshydratation",
    "barrier_stress": "barrière cutanée possiblement fragilisée",
    "active_routine": "routine possiblement trop active",
    "missing_spf": "SPF manquant",
    "active_load_high": "La charge en actifs est trop élevée pour une routine stable",
    "barrier_support_present": "Des produits de soutien de la barrière sont aussi présents.",
    "active_load_interpretation": "Ce schéma peut irriter avant d’améliorer le grain de peau ou les imperfections.",
    "active_load_action": "Simplifiez d’abord la routine, séparez les actifs forts et gardez des soirs de récupération avant tout ajout.",
    "morning_protection_incomplete": "La protection du matin est incomplète",
    "no_sunscreen_detected": "Aucune étape SPF n’a été détectée le matin.",
    "spf_gap_interpretation": "Sans SPF large spectre quotidien, les soins éclat, rétinoïdes et exfoliants sont plus difficiles à utiliser correctement.",
    "spf_gap_action": "Ajoutez le SPF en dernière étape du matin avant d’augmenter les actifs.",
    "barrier_before_optimization": "La barrière doit être stabilisée avant l’optimisation",
    "reactive_profile_signal": "Le profil ou les sensibilités indiquent une peau réactive.",
    "routine_stress_signal": "La structure de la routine suggère une possible surcharge.",
    "moisturizer_present": "Un hydratant est présent.",
    "no_moisturizer_detected": "Aucune étape hydratante claire n’a été détectée.",
    "soothing_present": "Certains ingrédients apaisants ou barrière sont présents.",
    "barrier_interpretation": "Ces éléments peuvent correspondre à une irritation temporaire ou à une tolérance réduite. Un selfie ne mesure pas directement la fonction barrière.",
    "barrier_action": "Gardez nettoyant, hydratant et SPF constants, puis réintroduisez les actifs forts un par un seulement si le confort revient.",
    "product_pause_reason": "Ce produit fait partie d’une association d’actifs à risque dans la routine actuelle.",
    "product_pause_frequency": "Mettez-le en pause pendant la stabilisation de la routine.",
    "product_pause_caution": "Réintroduisez-le seulement après avoir séparé ou retiré l’actif en conflit.",
    "product_duplicate_reason": "Le même actif fort apparaît dans plusieurs produits, ce qui rend la tolérance plus difficile à lire.",
    "product_mismatch_reason": "Ce produit actif n’est peut-être pas le plus adapté au profil déclaré.",
    "product_spacing_reason": "Ce produit a besoin d’un meilleur moment ou d’un espacement avec un autre actif.",
    "product_strong_frequency": "Commencez 1 à 3 fois par semaine, puis augmentez uniquement si la peau le tolère.",
    "product_tolerated_frequency": "Utilisez selon la tolérance.",
    "product_conflict_caution": "Ne le superposez pas avec l’actif en conflit au début.",
    "product_keep_strong_reason": "Ce produit peut rester s’il est introduit progressivement et bien toléré.",
    "product_keep_reason": "Ce produit ne crée pas de problème majeur dans l’audit actuel.",
    "product_active_frequency": "Utilisez-le aux moments prévus pour les actifs.",
    "product_daily_frequency": "Utilisez quotidiennement si la peau le tolère.",
    "priority_irritation_title": "Réduire le risque d’irritation d’abord",
    "priority_irritation_text": "Séparez les actifs forts et gardez des soirs de récupération avant de viser l’éclat, les pores ou les ridules.",
    "priority_spf_title": "Ajouter un SPF quotidien",
    "priority_spf_text": "Le SPF est la base avant de travailler les taches, les rétinoïdes ou l’exfoliation.",
    "priority_moisturizer_title": "Restaurer l’étape hydratante",
    "priority_moisturizer_text": "Un hydratant stable aide à mieux tolérer les actifs et à réduire les signes de déshydratation.",
    "priority_optimize_title": "Optimiser texture, marques et éclat ensuite",
    "priority_optimize_text": "Une fois le confort et la régularité installés, ciblez les objectifs secondaires un actif à la fois.",
    "sensitivity_reactive": "réactive ou sujette aux sensibilités",
    "sensitivity_none": "aucun signal fort de sensibilité dans le profil actuel",
    "strong_active_stacking": "superposition d’actifs forts",
    "duplicate_actives": "actifs en double",
    "profile_summary": "Votre profil est interprété à partir de vos réponses, de la routine enregistrée et des signaux d’audit.",
    "morning_cleanse_optional": "Nettoyez seulement si nécessaire ou après transpiration.",
    "morning_add_cleanser": "Ajoutez un nettoyant doux si la peau du matin paraît grasse ou chargée.",
    "morning_one_treatment": "Utilisez un seul soin prioritaire si la peau est confortable.",
    "morning_moisturize_if_needed": "Hydratez si la peau tiraille ou semble déshydratée.",
    "morning_add_moisturizer": "Ajoutez un hydratant simple.",
    "morning_keep_spf": "Gardez le SPF en dernière étape.",
    "morning_add_spf": "Ajoutez un SPF large spectre en dernière étape du matin.",
    "evening_remove_spf_makeup": "Retirez complètement le SPF et le maquillage.",
    "evening_cleanse_gently": "Nettoyez doucement, sans frotter.",
    "evening_add_cleanser": "Utilisez un nettoyant doux le soir.",
    "evening_pause_actives": "Mettez les actifs supplémentaires en pause les soirs de récupération.",
    "evening_one_active": "Utilisez l’actif lié à la priorité principale, pas plusieurs à la fois.",
    "evening_finish_moisturizer": "Terminez avec un hydratant.",
    "evening_add_moisturizer": "Terminez avec un hydratant basique.",
    "calendar_weeks_1_2": "Semaines 1-2 : stabiliser nettoyant, hydratant et SPF. Aucun nouvel actif fort si la peau est irritée.",
    "calendar_week_3": "Semaine 3 : introduire un seul actif, deux soirs par semaine.",
    "calendar_weeks_4_6": "Semaines 4-6 : augmenter seulement s’il n’y a pas de brûlure, desquamation ou rougeur persistante.",
    "progress_comfort": "Le confort et les picotements peuvent évoluer en premier.",
    "progress_congestion": "Les imperfections et marques post-boutons demandent généralement plus de régularité.",
    "progress_texture": "Taches, texture et ridules visibles doivent être réévaluées après plusieurs semaines stables.",
    "consult_deep_pain": "Boutons profonds, douloureux ou qui s’aggravent rapidement.",
    "consult_reaction": "Gonflement, cloques, suintement, brûlure forte ou réaction près des yeux.",
    "consult_spot": "Grain de beauté ou tache qui change rapidement.",
    "consult_persistent": "Problèmes persistants malgré une routine simplifiée."
  },
  "ko": {
    "baseline_oily": "지성 경향",
    "baseline_dry": "건성 경향",
    "baseline_combination": "복합성 경향",
    "baseline_sensitive": "민감성 경향",
    "baseline_normal": "균형 잡힌 경향",
    "baseline_unknown": "아직 확인되지 않음",
    "dehydration_risk": "수분 부족 위험",
    "barrier_stress": "피부 장벽 부담 가능성",
    "active_routine": "활성 성분이 많은 루틴일 수 있음",
    "missing_spf": "자외선 차단제 부족",
    "active_load_high": "안정적인 루틴에 비해 활성 성분 부담이 높습니다",
    "barrier_support_present": "장벽을 돕는 제품도 포함되어 있습니다.",
    "active_load_interpretation": "이 조합은 결이나 트러블 개선 전에 자극을 만들 수 있습니다.",
    "active_load_action": "먼저 루틴을 단순화하고 강한 활성 성분을 분리한 뒤 회복 밤을 확보하세요.",
    "morning_protection_incomplete": "아침 보호 단계가 부족합니다",
    "no_sunscreen_detected": "아침 루틴에서 자외선 차단 단계가 보이지 않습니다.",
    "spf_gap_interpretation": "매일 광범위 SPF가 없으면 미백, 레티노이드, 각질 케어를 안전하게 관리하기 어렵습니다.",
    "spf_gap_action": "활성 제품을 늘리기 전에 아침 마지막 단계로 SPF를 추가하세요.",
    "barrier_before_optimization": "개선보다 장벽 안정이 먼저입니다",
    "reactive_profile_signal": "프로필 또는 민감도 답변에서 반응성 피부 신호가 보입니다.",
    "routine_stress_signal": "루틴 구조에서 부담 가능성이 보입니다.",
    "moisturizer_present": "보습제가 포함되어 있습니다.",
    "no_moisturizer_detected": "명확한 보습 단계가 보이지 않습니다.",
    "soothing_present": "진정 또는 장벽 보조 성분이 일부 포함되어 있습니다.",
    "barrier_interpretation": "이 신호는 일시적 자극이나 낮아진 내성과 맞을 수 있습니다. 셀피만으로 장벽 기능을 직접 측정할 수는 없습니다.",
    "barrier_action": "클렌저, 보습제, SPF를 일정하게 유지하고 편안함이 돌아온 뒤 강한 활성 성분을 하나씩 다시 도입하세요.",
    "product_pause_reason": "현재 루틴에서 이 제품은 위험도가 높은 활성 성분 조합에 포함됩니다.",
    "product_pause_frequency": "루틴을 안정화하는 동안 잠시 중단하세요.",
    "product_pause_caution": "충돌하는 활성 성분을 분리하거나 제거한 뒤에만 다시 사용하세요.",
    "product_duplicate_reason": "같은 강한 활성 성분이 여러 제품에 반복되어 피부 반응을 읽기 어렵게 만듭니다.",
    "product_mismatch_reason": "이 활성 제품은 입력한 피부 프로필과 완전히 맞지 않을 수 있습니다.",
    "product_spacing_reason": "이 제품은 다른 활성 성분과 시간대 또는 간격 조정이 필요합니다.",
    "product_strong_frequency": "주 1-3회부터 시작하고 편안할 때만 늘리세요.",
    "product_tolerated_frequency": "피부가 견디는 범위에서 사용하세요.",
    "product_conflict_caution": "초기에는 충돌하는 활성 성분과 겹쳐 바르지 마세요.",
    "product_keep_strong_reason": "천천히 도입하고 잘 맞는다면 유지할 수 있습니다.",
    "product_keep_reason": "현재 감사에서 큰 루틴 문제를 만들지 않습니다.",
    "product_active_frequency": "계획한 활성 성분 사용 시간에 맞춰 사용하세요.",
    "product_daily_frequency": "편안하다면 매일 사용하세요.",
    "priority_irritation_title": "먼저 자극 위험을 낮추세요",
    "priority_irritation_text": "광채, 모공, 잔주름을 목표로 하기 전에 강한 활성 성분을 분리하고 회복 밤을 확보하세요.",
    "priority_spf_title": "매일 SPF를 추가하세요",
    "priority_spf_text": "색소, 레티노이드, 각질 케어보다 SPF가 기본입니다.",
    "priority_moisturizer_title": "보습 단계를 회복하세요",
    "priority_moisturizer_text": "안정적인 보습제는 활성 성분을 더 잘 견디게 하고 수분 부족 신호를 줄이는 데 도움을 줍니다.",
    "priority_optimize_title": "이후 결, 자국, 광채를 조정하세요",
    "priority_optimize_text": "편안함과 규칙성이 안정된 뒤 보조 목표를 한 번에 하나의 활성 성분으로 다루세요.",
    "sensitivity_reactive": "반응성 또는 민감성 경향",
    "sensitivity_none": "현재 프로필에서 강한 민감 신호 없음",
    "strong_active_stacking": "강한 활성 성분 중복 사용",
    "duplicate_actives": "중복 활성 성분",
    "profile_summary": "답변, 저장된 루틴, 현재 감사 신호를 바탕으로 피부 프로필을 해석했습니다.",
    "morning_cleanse_optional": "필요하거나 땀을 흘린 뒤에만 세안하세요.",
    "morning_add_cleanser": "아침 피부가 번들거리거나 답답하면 순한 클렌저를 추가하세요.",
    "morning_one_treatment": "피부가 편안할 때 우선순위 제품 하나만 사용하세요.",
    "morning_moisturize_if_needed": "당기거나 수분 부족이 느껴지면 보습하세요.",
    "morning_add_moisturizer": "단순한 보습제를 추가하세요.",
    "morning_keep_spf": "SPF를 마지막 단계로 유지하세요.",
    "morning_add_spf": "아침 마지막 단계로 광범위 SPF를 추가하세요.",
    "evening_remove_spf_makeup": "SPF와 메이크업을 완전히 지우세요.",
    "evening_cleanse_gently": "문지르지 말고 부드럽게 세안하세요.",
    "evening_add_cleanser": "저녁에는 순한 클렌저를 사용하세요.",
    "evening_pause_actives": "회복 밤에는 추가 활성 성분을 쉬세요.",
    "evening_one_active": "가장 중요한 목표와 맞는 활성 성분 하나만 사용하세요.",
    "evening_finish_moisturizer": "보습제로 마무리하세요.",
    "evening_add_moisturizer": "기본 보습제로 마무리하세요.",
    "calendar_weeks_1_2": "1-2주차: 클렌저, 보습제, SPF를 안정화하세요. 자극이 있으면 새 강한 활성 성분은 추가하지 마세요.",
    "calendar_week_3": "3주차: 활성 성분 하나만 주 2회 도입하세요.",
    "calendar_weeks_4_6": "4-6주차: 따가움, 벗겨짐, 지속 홍조가 없을 때만 늘리세요.",
    "progress_comfort": "편안함과 따가움이 먼저 변할 수 있습니다.",
    "progress_congestion": "막힘과 트러블 자국은 더 긴 기간의 꾸준함이 필요합니다.",
    "progress_texture": "색소, 결, 잔주름은 안정적인 몇 주 뒤 다시 확인하세요.",
    "consult_deep_pain": "깊고 아프거나 빠르게 악화되는 병변.",
    "consult_reaction": "붓기, 물집, 진물, 심한 화끈거림 또는 눈 주변 반응.",
    "consult_spot": "빠르게 변하는 점이나 반점.",
    "consult_persistent": "루틴을 단순화해도 지속되는 문제."
  },
  "ja": {
    "baseline_oily": "脂性傾向",
    "baseline_dry": "乾燥傾向",
    "baseline_combination": "混合肌傾向",
    "baseline_sensitive": "敏感肌傾向",
    "baseline_normal": "バランス傾向",
    "baseline_unknown": "まだ未確認",
    "dehydration_risk": "水分不足のリスク",
    "barrier_stress": "バリア機能への負担の可能性",
    "active_routine": "アクティブ成分が多すぎる可能性",
    "missing_spf": "SPF不足",
    "active_load_high": "安定したルーティンにはアクティブ成分の負担が高すぎます",
    "barrier_support_present": "バリアを支える製品も含まれています。",
    "active_load_interpretation": "この組み合わせは、肌の質感や詰まりを整える前に刺激を起こす可能性があります。",
    "active_load_action": "まずルーティンを簡潔にし、強いアクティブ成分を分け、回復の夜を入れてから新しい製品を追加しましょう。",
    "morning_protection_incomplete": "朝の保護ステップが不足しています",
    "no_sunscreen_detected": "朝のルーティンに日焼け止めが見つかりません。",
    "spf_gap_interpretation": "毎日の広範囲SPFがないと、ブライトニング、レチノイド、角質ケアを安全に管理しにくくなります。",
    "spf_gap_action": "アクティブケアを増やす前に、朝の最後のステップとしてSPFを追加しましょう。",
    "barrier_before_optimization": "改善より先にバリアを安定させましょう",
    "reactive_profile_signal": "プロフィールまたは敏感さの回答から反応しやすい肌のサインがあります。",
    "routine_stress_signal": "ルーティン構成に負担の可能性があります。",
    "moisturizer_present": "保湿剤が含まれています。",
    "no_moisturizer_detected": "明確な保湿ステップが見つかりません。",
    "soothing_present": "鎮静またはバリアサポート成分が一部含まれています。",
    "barrier_interpretation": "これらは一時的な刺激や耐性低下と合う可能性があります。セルフィーだけでバリア機能を直接測定することはできません。",
    "barrier_action": "洗顔、保湿、SPFを安定させ、快適さが戻ったら強いアクティブ成分を一つずつ再導入しましょう。",
    "product_pause_reason": "この製品は現在のルーティンでリスクの高いアクティブ成分の組み合わせに含まれています。",
    "product_pause_frequency": "ルーティンを安定させる間は一時停止しましょう。",
    "product_pause_caution": "競合するアクティブ成分を分けるか外してから再導入してください。",
    "product_duplicate_reason": "同じ強いアクティブ成分が複数の製品にあり、肌の反応を読み取りにくくしています。",
    "product_mismatch_reason": "このアクティブ製品は申告されたプロフィールに完全には合わない可能性があります。",
    "product_spacing_reason": "この製品は別のアクティブ成分との時間帯や間隔調整が必要です。",
    "product_strong_frequency": "週1〜3回から始め、快適な場合のみ増やしましょう。",
    "product_tolerated_frequency": "肌が耐えられる範囲で使用してください。",
    "product_conflict_caution": "最初は競合するアクティブ成分と重ねないでください。",
    "product_keep_strong_reason": "段階的に導入して問題なければ継続できます。",
    "product_keep_reason": "現在の監査では大きなルーティン問題を作っていません。",
    "product_active_frequency": "予定したアクティブケアの夜または朝に使用してください。",
    "product_daily_frequency": "快適であれば毎日使用できます。",
    "priority_irritation_title": "まず刺激リスクを下げる",
    "priority_irritation_text": "ツヤ、毛穴、小じわを狙う前に強いアクティブ成分を分け、回復の夜を確保しましょう。",
    "priority_spf_title": "毎日のSPFを追加",
    "priority_spf_text": "色素、レチノイド、角質ケアの前にSPFが基本です。",
    "priority_moisturizer_title": "保湿ステップを戻す",
    "priority_moisturizer_text": "安定した保湿剤はアクティブ成分の許容を助け、水分不足サインを減らします。",
    "priority_optimize_title": "その後に質感、跡、ツヤを整える",
    "priority_optimize_text": "快適さと継続性が安定してから、二次目標を一つのアクティブ成分ずつ扱いましょう。",
    "sensitivity_reactive": "反応しやすい、または敏感傾向",
    "sensitivity_none": "現在のプロフィールに強い敏感サインはありません",
    "strong_active_stacking": "強いアクティブ成分の重ね使い",
    "duplicate_actives": "重複アクティブ成分",
    "profile_summary": "回答、保存済みルーティン、現在の監査サインから肌プロフィールを読み取りました。",
    "morning_cleanse_optional": "必要な時、または汗をかいた後だけ洗顔しましょう。",
    "morning_add_cleanser": "朝の肌が油っぽい、または重く感じる場合はやさしい洗顔料を追加しましょう。",
    "morning_one_treatment": "肌が快適な時だけ優先ケアを一つ使いましょう。",
    "morning_moisturize_if_needed": "つっぱりや水分不足を感じる場合は保湿しましょう。",
    "morning_add_moisturizer": "シンプルな保湿剤を追加しましょう。",
    "morning_keep_spf": "SPFを最後のステップにしてください。",
    "morning_add_spf": "朝の最後のステップとして広範囲SPFを追加しましょう。",
    "evening_remove_spf_makeup": "SPFとメイクをしっかり落としましょう。",
    "evening_cleanse_gently": "こすらずやさしく洗顔しましょう。",
    "evening_add_cleanser": "夜はやさしい洗顔料を使用しましょう。",
    "evening_pause_actives": "回復の夜は追加のアクティブ成分を休みましょう。",
    "evening_one_active": "最優先の目的に合うアクティブ成分を一つだけ使いましょう。",
    "evening_finish_moisturizer": "保湿剤で仕上げましょう。",
    "evening_add_moisturizer": "基本の保湿剤で仕上げましょう。",
    "calendar_weeks_1_2": "1〜2週目：洗顔、保湿、SPFを安定させます。刺激がある場合は新しい強いアクティブ成分を追加しないでください。",
    "calendar_week_3": "3週目：アクティブ成分は一つだけ、週2夜から導入します。",
    "calendar_weeks_4_6": "4〜6週目：ひりつき、皮むけ、持続する赤みがない場合のみ増やします。",
    "progress_comfort": "快適さやひりつきが最初に変化することがあります。",
    "progress_congestion": "詰まりやニキビ跡は、より長く安定した継続が必要です。",
    "progress_texture": "色素、質感、目立つラインは数週間安定してから再評価しましょう。",
    "consult_deep_pain": "深く痛い、または急速に悪化するできもの。",
    "consult_reaction": "腫れ、水ぶくれ、滲出、強い灼熱感、目の周りの反応。",
    "consult_spot": "急に変化するほくろやシミ。",
    "consult_persistent": "ルーティンを簡単にしても続く問題。"
  }
};

function text(key: string, locale: AuditLocale) {
  return TEXT[locale][key] ?? TEXT.en[key] ?? key;
}

function translateDynamic(value: string, locale: AuditLocale) {
  const [key, rawCount] = value.split(":");
  const count = Number(rawCount);
  if (!Number.isFinite(count)) return text(value, locale);

  if (key === "strong_products") {
    if (locale === "fr") return count + " produits contiennent des actifs forts suivis.";
    if (locale === "ko") return count + "개 제품에 추적 중인 강한 활성 성분이 포함되어 있습니다.";
    if (locale === "ja") return count + "個の製品に追跡対象の強いアクティブ成分が含まれています。";
    return count + " products contain strong tracked actives.";
  }
  if (key === "warnings") {
    if (locale === "fr") return count + " alertes de conflit ou d'ordre ont été trouvées.";
    if (locale === "ko") return count + "개의 충돌 또는 순서 경고가 발견되었습니다.";
    if (locale === "ja") return count + "件の競合または順序の警告が見つかりました。";
    return count + " conflict or sequencing warnings were found.";
  }
  if (key === "duplicates") {
    if (locale === "fr") return count + " groupes d'actifs en double ont été trouvés.";
    if (locale === "ko") return count + "개의 중복 활성 성분 그룹이 발견되었습니다.";
    if (locale === "ja") return count + "件の重複アクティブ成分グループが見つかりました。";
    return count + " duplicate active groups were found.";
  }
  return text(value, locale);
}

function localizeAuditResult(result: AuditResult, locale: AuditLocale): AuditResult {
  const translate = (value: string) => translateDynamic(value, locale);
  const currentState = result.profile.currentState.map(translate);
  const baselineSkinType = translate(result.profile.baselineSkinType);
  let summary: string;
  if (locale === "fr") {
    summary = "Votre profil indique une " + baselineSkinType + (currentState.length ? ", avec actuellement : " + currentState.join(", ") : "") + ".";
  } else if (locale === "ko") {
    summary = "피부 프로필은 " + baselineSkinType + (currentState.length ? "이며 현재 " + currentState.join(", ") + " 신호가 보입니다" : "로 보입니다") + ".";
  } else if (locale === "ja") {
    summary = "肌プロフィールは" + baselineSkinType + (currentState.length ? "で、現在 " + currentState.join("、") + " のサインがあります" : "と読み取れます") + "。";
  } else {
    summary = "Your skin profile reads as " + baselineSkinType + (currentState.length ? ", currently with " + currentState.join(", ") : "") + ".";
  }

  return {
    ...result,
    profile: {
      ...result.profile,
      baselineSkinType,
      currentState,
      sensitivity: translate(result.profile.sensitivity),
      aggravatingFactors: result.profile.aggravatingFactors.map(translate),
      summary,
    },
    conclusions: result.conclusions.map((conclusion) => ({
      ...conclusion,
      label: translate(conclusion.label),
      supportingEvidence: conclusion.supportingEvidence.map(translate),
      contradictoryEvidence: conclusion.contradictoryEvidence.map(translate),
      interpretation: translate(conclusion.interpretation),
      recommendedAction: translate(conclusion.recommendedAction),
    })),
    priorities: result.priorities.map((priority) => ({
      ...priority,
      title: translate(priority.title),
      text: translate(priority.text),
    })),
    productDecisions: result.productDecisions.map((decision) => ({
      ...decision,
      reason: translate(decision.reason),
      frequency: translate(decision.frequency),
      caution: decision.caution ? translate(decision.caution) : undefined,
    })),
    recommendedRoutine: {
      morning: result.recommendedRoutine.morning.map(translate),
      evening: result.recommendedRoutine.evening.map(translate),
      introductionCalendar: result.recommendedRoutine.introductionCalendar.map(translate),
      expectedProgress: result.recommendedRoutine.expectedProgress.map(translate),
    },
    consultSignals: result.consultSignals.map(translate),
  };
}
