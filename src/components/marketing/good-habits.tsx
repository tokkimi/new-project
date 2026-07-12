"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { INGREDIENTS } from "@/data/ingredients";
import { Badge } from "@/components/ui/badge";

type DailyItem = { title: string; text: string };
type RoutineItem = { type: string; am: string; pm: string; avoid: string };
type IngredientCopy = { name: string; summary: string };

export function GoodHabits() {
  const t = useTranslations("goodHabits");
  const daily = t.raw("daily") as DailyItem[];
  const routines = t.raw("routines") as RoutineItem[];
  const rules = t.raw("rules") as string[];
  const ingredientCopy = t.raw("ingredients") as Record<string, IngredientCopy>;

  return (
    <section id="good-habits" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">{t("eyebrow")}</p>
          <h2 className="mt-2 text-balance font-serif text-3xl md:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {daily.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-3xl border border-white/50 bg-white/45 p-5 shadow-[0_18px_50px_-34px_rgba(64,45,31,0.45)] backdrop-blur-xl"
            >
              <p className="mb-3 font-serif text-lg">{item.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-8 lg:grid-cols-3">
          {routines.map((routine, i) => (
            <motion.div
              key={routine.type}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: (i % 3) * 0.05 }}
              className="rounded-3xl border border-white/50 bg-white/45 p-5 shadow-[0_18px_50px_-34px_rgba(64,45,31,0.45)] backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-serif text-lg">{routine.type}</h3>
                <Badge variant="secondary">{t("guide")}</Badge>
              </div>
              <div className="grid gap-3 text-sm">
                <p>
                  <span className="font-medium text-foreground">{t("amLabel")}: </span>
                  <span className="text-muted-foreground">{routine.am}</span>
                </p>
                <p>
                  <span className="font-medium text-foreground">{t("pmLabel")}: </span>
                  <span className="text-muted-foreground">{routine.pm}</span>
                </p>
                <p className="rounded-2xl border border-warning/25 bg-warning/10 px-3 py-2 text-muted-foreground">
                  <span className="font-medium text-foreground">{t("watchOutLabel")}: </span>
                  {routine.avoid}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/50 bg-white/45 p-6 shadow-[0_18px_50px_-34px_rgba(64,45,31,0.45)] backdrop-blur-xl">
            <h3 className="font-serif text-xl">{t("rulesTitle")}</h3>
            <ul className="grid gap-2.5">
              {rules.map((rule) => (
                <li key={rule} className="rounded-2xl bg-background/55 px-4 py-3 text-sm text-muted-foreground">
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/50 bg-white/45 p-6 shadow-[0_18px_50px_-34px_rgba(64,45,31,0.45)] backdrop-blur-xl">
            <h3 className="font-serif text-xl">{t("ingredientsTitle")}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {INGREDIENTS.map((ing) => (
                <div key={ing.id} className="rounded-2xl bg-background/55 p-3">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{ingredientCopy[ing.id]?.name ?? ing.id}</p>
                    <Badge variant={ing.timePref === "am" ? "am" : ing.timePref === "pm" ? "pm" : "secondary"}>
                      {ing.timePref === "am" ? t("amLabel") : ing.timePref === "pm" ? t("pmLabel") : t("bothLabel")}
                    </Badge>
                  </div>
                  <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                    {ingredientCopy[ing.id]?.summary ?? t("trackedFallback")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}
