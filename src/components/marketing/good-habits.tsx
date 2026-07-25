"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Droplet, Moon, ShieldAlert, Sparkles, Sun } from "lucide-react";

type DailyItem = { title: string; text: string };
type RoutineItem = { type: string; am: string; pm: string; avoid: string };

const DAILY_ICON = [Sun, Moon, Sparkles, ShieldAlert];
const ROUTINE_TONE = [
  "from-[#f7e6df]/80 via-white/70 to-[#e9edf6]/80",
  "from-[#e8f1ec]/80 via-white/70 to-[#f7eadf]/80",
  "from-[#f5e5ea]/80 via-white/70 to-[#e7eff0]/80",
  "from-[#edf0e5]/80 via-white/70 to-[#efe7f4]/80",
  "from-[#f2e4d8]/80 via-white/70 to-[#e8eef7]/80",
  "from-[#e9f0f0]/80 via-white/70 to-[#f6e5df]/80",
];

export function GoodHabits() {
  const t = useTranslations("goodHabits");
  const daily = (t.raw("daily") as DailyItem[]).slice(0, 4);
  const routines = t.raw("routines") as RoutineItem[];

  return (
    <section
      id="good-habits"
      // This is a light "cream band" by design. The page theme is class-based,
      // so in dark mode text-foreground/muted flip to light and vanish on the
      // cream. Pin the light palette here so the band reads identically (and
      // legibly) in both light and dark mode.
      style={
        {
          "--background": "#f8f5f1",
          "--foreground": "#2a201a",
          "--muted-foreground": "#8a7868",
          "--border": "#e6ddd2",
          "--primary": "#6a4a35",
        } as React.CSSProperties
      }
      className="overflow-hidden border-y border-border/60 bg-[#f4efe8] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <h2 className="text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {daily.map((item, index) => {
            const Icon = DAILY_ICON[index % DAILY_ICON.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="min-w-0 rounded-full border border-white/70 bg-white/45 px-4 py-3 shadow-[0_18px_50px_-42px_rgba(35,28,20,0.55)] backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background/80 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="font-serif text-2xl text-foreground">{t("guide")}</h3>
            <span className="hidden rounded-full border border-white/70 bg-white/45 px-3 py-1 text-xs text-muted-foreground backdrop-blur-xl sm:inline-flex">
              {t("amLabel")} / {t("pmLabel")}
            </span>
          </div>

          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
            {routines.map((routine, index) => (
              <motion.article
                key={routine.type}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.32, delay: (index % 4) * 0.04 }}
                className={`min-h-[330px] w-[82%] max-w-[360px] shrink-0 snap-center rounded-[28px] border border-white/70 bg-gradient-to-br ${ROUTINE_TONE[index % ROUTINE_TONE.length]} p-5 shadow-[0_28px_80px_-58px_rgba(36,30,24,0.7)] backdrop-blur-xl sm:w-[360px] lg:w-auto lg:max-w-none`}
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h4 className="mt-2 font-serif text-3xl leading-tight text-foreground">
                        {routine.type}
                      </h4>
                    </div>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/55 text-primary backdrop-blur-xl">
                      <Droplet className="size-5" />
                    </span>
                  </div>

                  <div className="mt-7 grid gap-3 text-sm leading-6">
                    <RoutineLine label={t("amLabel")} text={routine.am} />
                    <RoutineLine label={t("pmLabel")} text={routine.pm} />
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="rounded-[22px] border border-white/70 bg-white/45 p-4 backdrop-blur-xl">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                        {t("watchOutLabel")}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{routine.avoid}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}

function RoutineLine({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[22px] border border-white/70 bg-white/45 p-4 backdrop-blur-xl">
      <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="text-foreground">{text}</p>
    </div>
  );
}
