"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Moon, Sparkles } from "lucide-react";
import { ProductVisual } from "@/components/product-visual";

const ROWS: { category: string }[] = [
  { category: "cleanser" },
  { category: "serum" },
  { category: "moisturizer" },
];

export function HeroIllustration() {
  const t = useTranslations("featureShowcase");
  const tHero = useTranslations("hero");
  const tCategories = useTranslations("categories");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative mx-auto w-full max-w-sm"
    >
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/15 via-am/10 to-pm/10 blur-2xl" />

      <div className="rounded-[1.75rem] bg-card p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-20px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <Moon className="size-3.5 text-pm" />
            {t("eveningRoutine")}
          </span>
          <span className="flex size-6 items-center justify-center rounded-full bg-success/15 text-success">
            <Check className="size-3.5" />
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          {ROWS.map((row, i) => (
            <motion.div
              key={row.category}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.12 }}
              className="flex items-center gap-3 rounded-xl bg-secondary/50 px-2.5 py-2"
            >
              <ProductVisual category={row.category} size="sm" className="size-9 rounded-lg" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{tCategories(row.category)}</p>
              </div>
              <span className="text-xs text-muted-foreground">0{i + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 4 }}
        transition={{ duration: 0.6, delay: 0.75 }}
        className="absolute -bottom-6 -right-4 flex items-center gap-2 rounded-2xl bg-card px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_40px_-18px_rgba(0,0,0,0.3)]"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="size-4" />
        </span>
        <div>
          <p className="text-xs font-medium leading-none">{tHero("matchBadgeTitle")}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">{tHero("matchBadgeSubtitle")}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
