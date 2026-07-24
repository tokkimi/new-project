"use client";

import { useTranslations } from "next-intl";
import { FlaskConical, Info, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { analyzeExposure, type ExposureSlot } from "@/lib/ingredient-exposure";

export function IngredientExposurePanel({
  items,
}: {
  items: { ingredientIds: string[]; slot: ExposureSlot }[];
}) {
  const t = useTranslations("exposure");
  const tIng = useTranslations("ingredients");
  const report = analyzeExposure(items);

  if (report.trackedProductCount === 0 || report.actives.length === 0) return null;

  const nameOf = (id: string) => {
    try {
      return tIng(`${id}.name`);
    } catch {
      return id;
    }
  };

  return (
    <Card className="gap-4">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FlaskConical className="size-5" />
        </span>
        <div>
          <h2 className="font-serif text-xl">{t("title")}</h2>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {report.actives.map((active) => (
          <span
            key={active.ingredientId}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm",
              active.productCount >= 3
                ? "bg-am/15 text-am-foreground"
                : "bg-secondary text-muted-foreground"
            )}
          >
            {nameOf(active.ingredientId)}
            <span className="font-medium">×{active.productCount}</span>
          </span>
        ))}
      </div>

      {report.findings.length > 0 && (
        <ul className="grid gap-2.5">
          {report.findings.map((finding, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 rounded-2xl bg-am/10 px-4 py-3 text-sm text-muted-foreground"
            >
              <Layers className="mt-0.5 size-4 shrink-0 text-am-foreground" />
              <span>
                {finding.kind === "redundant"
                  ? t("redundant", {
                      ingredient: nameOf(finding.ingredientId),
                      count: finding.count,
                    })
                  : t(finding.slot === "evening" ? "irritantStackEvening" : "irritantStackMorning", {
                      ingredients: finding.ingredientIds.map(nameOf).join(", "),
                    })}
              </span>
            </li>
          ))}
        </ul>
      )}

      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0" />
        {t("concentrationNote")}
      </p>
    </Card>
  );
}
