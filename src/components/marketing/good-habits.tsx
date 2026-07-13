"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Droplet,
  Layers,
  Moon,
  ShieldAlert,
  Sparkles,
  Sun,
  Wand2,
} from "lucide-react";
import { INGREDIENTS } from "@/data/ingredients";

type DailyItem = { title: string; text: string };
type RoutineItem = { type: string; am: string; pm: string; avoid: string };
type IngredientCopy = { name: string; summary: string };

const DAILY_ICON = [Sun, Moon, Sparkles, ShieldAlert];
const ROUTINE_ICON = [Droplet, Sparkles, ShieldAlert, Layers, Sun, Wand2];
const ACCENTS = [
  "border-l-[#78917f]",
  "border-l-[#c07363]",
  "border-l-[#8b7d66]",
  "border-l-[#5f8077]",
];

export function GoodHabits() {
  const t = useTranslations("goodHabits");
  const daily = t.raw("daily") as DailyItem[];
  const routines = t.raw("routines") as RoutineItem[];
  const rules = t.raw("rules") as string[];
  const ingredientCopy = t.raw("ingredients") as Record<string, IngredientCopy>;

  return (
    <section id="good-habits" className="border-y border-[#ded7ca] bg-[#f7f4ed] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#9a5d4f]">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-balance font-serif text-4xl leading-tight text-[#24211d] md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[#6f675c] lg:justify-self-end">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[18px] border border-[#ddd5c8] bg-[#ddd5c8] md:grid-cols-4">
          {daily.map((item, i) => {
            const Icon = DAILY_ICON[i % DAILY_ICON.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className={`border-l-4 bg-[#fffdf8] p-5 ${ACCENTS[i % ACCENTS.length]}`}
              >
                <span className="mb-5 flex size-9 items-center justify-center rounded-full bg-[#f1ebe0] text-[#3e554b]">
                  <Icon className="size-4" />
                </span>
                <p className="mb-2 font-serif text-xl leading-tight text-[#24211d]">{item.title}</p>
                <p className="text-sm leading-6 text-[#6f675c]">{item.text}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h3 className="font-serif text-2xl text-[#24211d]">{t("guide")}</h3>
            <div className="hidden h-px flex-1 bg-[#ddd5c8] sm:block" />
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {routines.map((routine, i) => {
              const Icon = ROUTINE_ICON[i % ROUTINE_ICON.length];
              return (
                <motion.div
                  key={routine.type}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: (i % 3) * 0.05 }}
                  className="min-h-[260px] rounded-[18px] border border-[#ddd5c8] bg-[#fffdf8] p-5 shadow-[0_18px_44px_-40px_rgba(45,35,25,0.55)]"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f1ebe0] text-[#3e554b]">
                        <Icon className="size-4" />
                      </span>
                      <h4 className="font-serif text-xl leading-tight text-[#24211d]">
                        {routine.type}
                      </h4>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-[#9a5d4f]" />
                  </div>
                  <div className="grid gap-3 text-sm leading-6">
                    <RoutineLine label={t("amLabel")} text={routine.am} />
                    <RoutineLine label={t("pmLabel")} text={routine.pm} />
                    <div className="mt-1 border-t border-[#e6dfd2] pt-3">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9a5d4f]">
                        {t("watchOutLabel")}
                      </p>
                      <p className="mt-1 text-[#6f675c]">{routine.avoid}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="rounded-[18px] border border-[#ddd5c8] bg-[#fffdf8] p-6">
            <h3 className="font-serif text-2xl text-[#24211d]">{t("rulesTitle")}</h3>
            <ul className="mt-5 divide-y divide-[#e8e1d5]">
              {rules.map((rule) => (
                <li key={rule} className="flex gap-3 py-3 text-sm leading-6 text-[#6f675c]">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#9a5d4f]" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[18px] border border-[#ddd5c8] bg-[#fffdf8] p-6">
            <h3 className="font-serif text-2xl text-[#24211d]">{t("ingredientsTitle")}</h3>
            <div className="mt-5 grid gap-px overflow-hidden rounded-[14px] border border-[#e3dbce] bg-[#e3dbce] sm:grid-cols-2 lg:grid-cols-3">
              {INGREDIENTS.map((ing) => (
                <div key={ing.id} className="bg-[#fffdf8] p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-tight text-[#24211d]">
                      {ingredientCopy[ing.id]?.name ?? ing.id}
                    </p>
                    <span className="shrink-0 rounded-full border border-[#d8cfc0] px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-[#6f675c]">
                      {ing.timePref === "am"
                        ? t("amLabel")
                        : ing.timePref === "pm"
                          ? t("pmLabel")
                          : t("bothLabel")}
                    </span>
                  </div>
                  <p className="line-clamp-4 text-xs leading-5 text-[#6f675c]">
                    {ingredientCopy[ing.id]?.summary ?? t("trackedFallback")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-[#7c7468]">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}

function RoutineLine({ label, text }: { label: string; text: string }) {
  return (
    <p className="grid grid-cols-[4.5rem_1fr] gap-3">
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#8a7c64]">
        {label}
      </span>
      <span className="text-[#5f584f]">{text}</span>
    </p>
  );
}
