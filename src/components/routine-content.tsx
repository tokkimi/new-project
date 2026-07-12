"use client";

import { useTranslations } from "next-intl";
import { Sun, Moon, AlertTriangle, ChevronRight, Layers, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { useShelf } from "@/lib/shelf-store";
import { buildRoutine, severityTone, type RoutineStep } from "@/lib/routine-engine";
import type { VariantProps } from "class-variance-authority";

function RoutineColumn({
  title,
  icon,
  steps,
  accent,
  stepsLabel,
  emptyLabel,
  categoryLabel,
}: {
  title: string;
  icon: React.ReactNode;
  steps: RoutineStep[];
  accent: "am" | "pm";
  stepsLabel: string;
  emptyLabel: string;
  categoryLabel: (category: RoutineStep["product"]["category"]) => string;
}) {
  return (
    <Card className="gap-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="font-serif text-xl">{title}</h2>
        <Badge variant={accent} className="ml-auto">
          {stepsLabel}
        </Badge>
      </div>
      {steps.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">{emptyLabel}</p>
      ) : (
        <ol className="flex flex-col gap-2.5">
          {steps.map((step, i) => (
            <li key={step.product.id}>
              <Link
                href={`/app/product/${step.product.slug}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5 transition-colors hover:border-primary/40"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{step.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {step.product.brand} · {categoryLabel(step.product.category)}
                  </p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}

export function RoutineContent({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("routinePage");
  const tCategories = useTranslations("categories");
  const tSeverity = useTranslations("severity");
  const tConflicts = useTranslations("conflictRules");
  const { shelf } = useShelf();
  const routine = buildRoutine(shelf);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className={compact ? "font-serif text-2xl" : "font-serif text-3xl"}>{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle", { count: shelf.length })}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <RoutineColumn
          title={t("morning")}
          icon={<Sun className="size-5 text-am-foreground" />}
          steps={routine.am}
          accent="am"
          stepsLabel={t("steps", { count: routine.am.length })}
          emptyLabel={t("noProducts")}
          categoryLabel={(c) => tCategories(c)}
        />
        <RoutineColumn
          title={t("evening")}
          icon={<Moon className="size-5 text-pm" />}
          steps={routine.pm}
          accent="pm"
          stepsLabel={t("steps", { count: routine.pm.length })}
          emptyLabel={t("noProducts")}
          categoryLabel={(c) => tCategories(c)}
        />
      </div>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-5 text-destructive" />
          <h2 className="font-serif text-xl">
            {t("conflictsDetected")}
            {routine.warnings.length > 0 && (
              <span className="ml-2 text-base text-muted-foreground">
                ({routine.warnings.length})
              </span>
            )}
          </h2>
        </div>

        {routine.warnings.length === 0 ? (
          <Card className="items-center gap-2 py-10 text-center">
            <p className="font-medium">{t("noConflictsTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("noConflictsText")}</p>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {routine.warnings.map((w) => (
              <Link
                key={`${w.rule.id}-${w.productA.id}-${w.productB.id}`}
                href={`/app/conflict/${w.rule.id}?a=${w.productA.id}&b=${w.productB.id}`}
              >
                <Card className="flex-row items-center gap-4 transition-colors hover:border-primary/40">
                  <Badge
                    variant={severityTone(w.rule.severity) as VariantProps<typeof badgeVariants>["variant"]}
                    className="shrink-0"
                  >
                    {tSeverity(w.rule.severity)}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {tConflicts(`${w.rule.id}.headline`)}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {w.productA.name} + {w.productB.name}
                    </p>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {routine.duplicateActives.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Layers className="size-5 text-primary" />
            <h2 className="font-serif text-xl">{t("duplicateActives")}</h2>
          </div>
          <div className="flex flex-col gap-3">
            {routine.duplicateActives.map((dup) => (
              <Card key={dup.ingredientId} className="gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  <p className="font-medium">
                    {t("duplicateTitle", { count: dup.products.length })}
                  </p>
                </div>
                <p className="flex flex-wrap gap-1.5 text-sm text-muted-foreground">
                  {dup.products.map((p) => (
                    <Badge key={p.id} variant="outline">
                      {p.name}
                    </Badge>
                  ))}
                </p>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
