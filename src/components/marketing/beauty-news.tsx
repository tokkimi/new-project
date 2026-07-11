"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Newspaper,
  Sparkles,
  Rocket,
  TrendingUp,
  Building2,
  Trophy,
  LayoutGrid,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/generated/prisma/client";

const CATEGORIES = ["innovation", "launch", "ingredient-trend", "brand-news", "award"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_ICON: Record<Category, React.ComponentType<{ className?: string }>> = {
  innovation: Sparkles,
  launch: Rocket,
  "ingredient-trend": TrendingUp,
  "brand-news": Building2,
  award: Trophy,
};

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const t = useTranslations("beautyNews");
  const tCategories = useTranslations("beautyNews.categories");
  const Icon = CATEGORY_ICON[item.category as Category] ?? Sparkles;

  const content = (
    <Card className="h-full gap-3 transition-transform hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-2">
        <Badge variant="secondary" className="gap-1">
          <Icon className="size-3" />
          {tCategories(item.category)}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {new Intl.DateTimeFormat(undefined, { month: "short", year: "numeric" }).format(
            item.publishedAt
          )}
        </span>
      </div>
      <h3 className="font-serif text-lg leading-snug">{item.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
      <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
        <span>{item.sourceName}</span>
        {item.sourceUrl && (
          <span className="flex items-center gap-1 text-primary">
            {t("readMore")}
            <ArrowUpRight className="size-3.5" />
          </span>
        )}
      </div>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      className="h-full"
    >
      {item.sourceUrl ? (
        <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" className="block h-full">
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
}

export function BeautyNews({ items }: { items: NewsItem[] }) {
  const t = useTranslations("beautyNews");
  const tCategories = useTranslations("beautyNews.categories");
  const [active, setActive] = React.useState<"all" | Category>("all");

  if (items.length === 0) return null;

  const filtered = active === "all" ? items : items.filter((item) => item.category === active);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto mb-10 max-w-xl text-center">
        <p className="text-sm font-medium text-primary">{t("eyebrow")}</p>
        <h2 className="mt-2 text-balance font-serif text-3xl md:text-4xl">{t("title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Newspaper className="size-3.5" />
          {t("updatedLabel")}
        </p>
      </div>

      <div className="relative mb-8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto scroll-px-6 px-6 sm:justify-center sm:px-0">
          <button
            type="button"
            onClick={() => setActive("all")}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="size-3.5" />
            {t("all")}
          </button>
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICON[c];
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active === c
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-3.5" />
                {tCategories(c)}
              </button>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent sm:hidden" />
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((item, i) => (
          <NewsCard key={item.id} item={item} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
