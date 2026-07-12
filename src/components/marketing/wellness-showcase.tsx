"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Brain, CloudRain, Sparkles, Wind } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CHECK_ICONS = [Brain, Wind, CloudRain, Sparkles];

export function WellnessShowcase() {
  const t = useTranslations("wellnessShowcase");
  const checks = t.raw("checks") as { title: string; text: string }[];

  return (
    <section className="border-y border-border bg-secondary/25 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="order-2 max-w-xl lg:order-1"
        >
          <Badge variant="secondary" className="mb-4">
            {t("eyebrow")}
          </Badge>
          <h2 className="text-balance font-serif text-3xl md:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t("subtitle")}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/app/wellness">
                {t("ctaPrimary")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{t("note")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="order-1 overflow-hidden rounded-[1.75rem] border border-border bg-background/70 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-20px_rgba(0,0,0,0.2)] lg:order-2"
        >
          <div className="relative flex aspect-[16/9] w-full items-end overflow-hidden bg-gradient-to-br from-pm/20 via-primary/10 to-am/20 p-5">
            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-pm/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-6 -bottom-6 h-40 w-40 rounded-full bg-am/30 blur-3xl" />
            <p className="relative text-xs font-medium uppercase tracking-[0.18em] text-foreground/80">
              {t("panelEyebrow")}
            </p>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {checks.map((check, index) => {
                const Icon = CHECK_ICONS[index] ?? Sparkles;
                return (
                  <div key={check.title} className="flex gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">{check.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{check.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
