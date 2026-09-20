"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Droplet, Moon, ShieldAlert, Sparkles, Sun } from "lucide-react";

type DailyItem = { title: string; text: string };
type RoutineItem = { type: string; am: string; pm: string; avoid: string };

const DAILY_ICON = [Sun, Moon, Sparkles, ShieldAlert];
export function GoodHabits() {
  const t = useTranslations("goodHabits");
  const daily = (t.raw("daily") as DailyItem[]).slice(0, 4);
  const routines = t.raw("routines") as RoutineItem[];
  const guideRef = React.useRef<HTMLDivElement>(null);

  const scrollGuide = (direction: -1 | 1) => {
    const rail = guideRef.current;
    if (!rail) return;

    const card = rail.querySelector<HTMLElement>("[data-guide-card]");
    const step = card ? card.offsetWidth + 16 : Math.round(rail.clientWidth * 0.8);
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    const atStart = rail.scrollLeft <= 8;
    const atEnd = rail.scrollLeft >= maxScroll - 8;

    if (direction < 0 && atStart) {
      rail.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }

    if (direction > 0 && atEnd) {
      rail.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    rail.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section
      id="good-habits"
      className="relative overflow-hidden py-14 sm:py-18"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <h2 className="text-balance text-3xl font-semibold leading-tight text-foreground md:text-4xl">
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
                className="haru-glow-card min-w-0 rounded-full px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="haru-icon-halo flex size-10 shrink-0 items-center justify-center rounded-full text-primary dark:text-foreground">
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
            <h3 className="text-xl font-semibold text-foreground md:text-2xl">{t("guide")}</h3>
            <span className="haru-glow-card hidden rounded-full px-3 py-1 text-xs text-muted-foreground sm:inline-flex">
              {t("amLabel")} / {t("pmLabel")}
            </span>
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Previous guide"
              onClick={() => scrollGuide(-1)}
              className="absolute left-1 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-transparent shadow-none backdrop-blur-2xl transition hover:bg-white/8"
            >
              <span className="size-2.5 rounded-full bg-[#7f878d]/70 dark:bg-white/85" />
            </button>
            <button
              type="button"
              aria-label="Next guide"
              onClick={() => scrollGuide(1)}
              className="absolute right-1 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-transparent shadow-none backdrop-blur-2xl transition hover:bg-white/8"
            >
              <span className="size-2.5 rounded-full bg-[#7f878d]/70 dark:bg-white/85" />
            </button>

            <div
              ref={guideRef}
              className="no-scrollbar mx-auto flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[calc((100%_-_84vw)/2)] pb-3 sm:px-[calc((100%_-_340px)/2)] lg:px-0"
            >
              {routines.map((routine, index) => (
                <motion.article
                  key={routine.type}
                  data-guide-card
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.32, delay: (index % 4) * 0.04 }}
                  className="haru-glow-card min-h-[315px] w-[84vw] max-w-[360px] shrink-0 snap-center rounded-[1.25rem] p-5 sm:w-[340px] lg:w-[calc((100%_-_3rem)/4)] lg:max-w-none"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-2xl font-semibold leading-tight text-foreground">
                          {routine.type}
                        </h4>
                      </div>
                      <span className="haru-icon-halo flex size-12 shrink-0 items-center justify-center rounded-full text-primary dark:text-foreground">
                        <Droplet className="size-5" />
                      </span>
                    </div>

                    <div className="mt-7 grid gap-3 text-sm leading-6">
                      <RoutineLine label={t("amLabel")} text={routine.am} />
                      <RoutineLine label={t("pmLabel")} text={routine.pm} />
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="haru-glow-card rounded-[1.1rem] p-4">
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary dark:text-foreground">
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
    <div className="haru-glow-card rounded-[1.1rem] p-4">
      <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="text-foreground">{text}</p>
    </div>
  );
}
