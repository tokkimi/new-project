import type { Product } from "@/generated/prisma/client";
import { buildRoutine, type RoutineResult } from "@/lib/routine-engine";
import { findIngredient } from "@/data/ingredients";

export type SkinProfileInput = {
  skinType: string;
  concerns: string[];
  sensitivities: string[];
};

export type MissingStepIssue = {
  type: "missing_step";
  step: "cleanser" | "moisturizer" | "sunscreen";
};

export type ProfileMismatchIssue = {
  type: "profile_mismatch";
  product: Product;
  alternatives: Product[];
};

export type AuditIssue = MissingStepIssue | ProfileMismatchIssue;

export type AuditResult = {
  routine: RoutineResult;
  issues: AuditIssue[];
  score: number;
};

/** Ingredients at/above this layer weight are considered "strong" actives worth a skin-fit check. */
const STRONG_ACTIVE_THRESHOLD = 30;

function hasCategory(steps: RoutineResult["am"], category: string) {
  return steps.some((s) => s.product.category === category);
}

export function auditRoutine(
  shelf: Product[],
  catalog: Product[],
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

  return { routine, issues, score };
}
