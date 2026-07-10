"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AlertTriangle, Sun, Moon, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DEMO_SHELF } from "@/data/ingredients";
import { buildRoutine } from "@/lib/routine-engine";

export function FeatureShowcase() {
  const t = useTranslations("featureShowcase");
  const tCategories = useTranslations("categories");
  const tSeverity = useTranslations("severity");
  const tConflicts = useTranslations("conflictRules");

  const routine = buildRoutine(DEMO_SHELF);
  const headlineWarning = routine.warnings.find((w) => w.rule.severity === "avoid");

  return (
    <section id="features" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p className="text-sm font-medium text-primary">{t("eyebrow")}</p>
          <h2 className="mt-2 text-balance font-serif text-3xl md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="h-full gap-5">
              <div className="flex items-center gap-2">
                <Moon className="size-4 text-pm" />
                <h3 className="font-serif text-lg">{t("eveningRoutine")}</h3>
              </div>
              <ol className="flex flex-col gap-3">
                {routine.pm.map((step, i) => {
                  const flagged = routine.warnings.some(
                    (w) =>
                      w.productA.id === step.product.id ||
                      w.productB.id === step.product.id
                  );
                  return (
                    <li
                      key={step.product.id}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {step.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {tCategories(step.product.category)}
                        </p>
                      </div>
                      {flagged && (
                        <AlertTriangle className="size-4 shrink-0 text-destructive" />
                      )}
                    </li>
                  );
                })}
              </ol>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="h-full justify-between gap-6 border-destructive/25 bg-destructive/5">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Badge variant="destructive">
                    <AlertTriangle className="size-3" />
                    {headlineWarning ? tSeverity(headlineWarning.rule.severity) : null}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {t("alertsDetected", { count: routine.warnings.length })}
                  </span>
                </div>

                {headlineWarning && (
                  <>
                    <h3 className="font-serif text-xl leading-snug">
                      {tConflicts(`${headlineWarning.rule.id}.headline`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {tConflicts(`${headlineWarning.rule.id}.reason`)}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <Badge variant="outline">{headlineWarning.productA.name}</Badge>
                      <span className="text-muted-foreground">+</span>
                      <Badge variant="outline">{headlineWarning.productB.name}</Badge>
                    </div>
                    <div className="rounded-xl bg-card p-4 text-sm">
                      <p className="mb-1 flex items-center gap-1.5 font-medium">
                        <Layers className="size-3.5 text-primary" />
                        {t("whatHaruSuggests")}
                      </p>
                      <p className="text-muted-foreground">
                        {tConflicts(`${headlineWarning.rule.id}.recommendation`)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6"
        >
          <Card className="flex-row flex-wrap items-center justify-between gap-4 py-5">
            <div className="flex items-center gap-2">
              <Sun className="size-4 text-am-foreground" />
              <p className="text-sm">
                <span className="font-medium">{t("amCount", { count: routine.am.length })}</span>{" "}
                <span className="text-muted-foreground">{t("amLabel")}</span>
              </p>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Moon className="size-4 text-pm" />
              <p className="text-sm">
                <span className="font-medium">{t("pmCount", { count: routine.pm.length })}</span>{" "}
                <span className="text-muted-foreground">{t("pmLabel")}</span>
              </p>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-destructive" />
              <p className="text-sm">
                <span className="font-medium">{t("conflictCount", { count: routine.warnings.length })}</span>{" "}
                <span className="text-muted-foreground">{t("conflictLabel")}</span>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
