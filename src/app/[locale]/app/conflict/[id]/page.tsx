"use client";

import * as React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft, Layers, BadgeCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONFLICT_RULES, findIngredient } from "@/data/ingredients";
import { useCatalog } from "@/lib/shelf-store";
import { severityTone } from "@/lib/routine-engine";
import type { VariantProps } from "class-variance-authority";

export default function ConflictDetailPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const t = useTranslations("conflictDetail");
  const tSeverity = useTranslations("severity");
  const tConflicts = useTranslations("conflictRules");
  const tRoutine = useTranslations("routinePage");
  const tIng = useTranslations("ingredients");
  const { catalog } = useCatalog();

  const rule = CONFLICT_RULES.find((r) => r.id === params.id);
  const productA = catalog.find((p) => p.id === searchParams.get("a"));
  const productB = catalog.find((p) => p.id === searchParams.get("b"));

  if (!rule) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <p className="text-muted-foreground">{t("notFound")}</p>
        <Button asChild variant="link">
          <Link href="/app/profile">{tRoutine("backToRoutine")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Button asChild variant="ghost" size="sm" className="w-fit -ml-2">
        <Link href="/app/profile">
          <ArrowLeft className="size-4" />
          {tRoutine("backToRoutine")}
        </Link>
      </Button>

      <div>
        <Badge
          variant={severityTone(rule.severity) as VariantProps<typeof badgeVariants>["variant"]}
          className="mb-3"
        >
          {tSeverity(rule.severity)}
        </Badge>
        <h1 className="text-balance font-serif text-3xl">
          {tConflicts(`${rule.id}.headline`)}
        </h1>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[rule.a, rule.b].map((ingId) =>
            findIngredient(ingId) ? (
              <Link key={ingId} href={`/app/ingredient/${ingId}`}>
                <Badge variant="secondary" className="cursor-pointer transition-opacity hover:opacity-80">
                  {tIng(`${ingId}.name`)}
                </Badge>
              </Link>
            ) : null
          )}
        </div>
      </div>

      {(productA || productB) && (
        <div className="flex flex-wrap items-center gap-2">
          {productA && <Badge variant="outline">{productA.name}</Badge>}
          {productA && productB && <span className="text-muted-foreground">+</span>}
          {productB && <Badge variant="outline">{productB.name}</Badge>}
        </div>
      )}

      <Card className="gap-3">
        <h2 className="font-serif text-lg">{t("why")}</h2>
        <p className="leading-relaxed text-muted-foreground">
          {tConflicts(`${rule.id}.reason`)}
        </p>
      </Card>

      <Card className="gap-3 border-primary/25 bg-primary/5">
        <h2 className="flex items-center gap-2 font-serif text-lg">
          <Layers className="size-4 text-primary" />
          {t("suggestion")}
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          {tConflicts(`${rule.id}.recommendation`)}
        </p>
      </Card>

      <Card className="gap-2">
        <h2 className="flex items-center gap-2 font-serif text-lg">
          <BadgeCheck className="size-4 text-muted-foreground" />
          {t("evidenceTitle")}
        </h2>
        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium ${
            rule.evidenceLevel === "established"
              ? "bg-success/12 text-success"
              : rule.evidenceLevel === "myth"
                ? "bg-am/15 text-am-foreground"
                : "bg-secondary text-muted-foreground"
          }`}
        >
          {t(`evidence.${rule.evidenceLevel}.label`)}
        </span>
        <p className="leading-relaxed text-muted-foreground">
          {t(`evidence.${rule.evidenceLevel}.text`)}
        </p>
        <p className="text-xs text-muted-foreground">{t("evidenceCaveat")}</p>
      </Card>

      <p className="text-xs text-muted-foreground">{t("disclaimer")}</p>
    </div>
  );
}
