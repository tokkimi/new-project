"use client";

import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Newspaper, Sparkles, Rocket, TrendingUp, Building2, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NewsItem } from "@/generated/prisma/client";

const CATEGORY_ICON: Record<string, ComponentType<{ className?: string }>> = {
  innovation: Sparkles,
  launch: Rocket,
  "ingredient-trend": TrendingUp,
  "brand-news": Building2,
  award: Trophy,
};

function NewsSlide({ item, index }: { item: NewsItem; index: number }) {
  const t = useTranslations("beautyNews");
  const tCategories = useTranslations("beautyNews.categories");
  const Icon = CATEGORY_ICON[item.category] ?? Sparkles;

  return (
    <motion.a
      href={item.sourceUrl ?? undefined}
      target="_blank"
      rel="noopener noreferrer nofollow"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, delay: (index % 8) * 0.04 }}
      className="w-64 shrink-0 sm:w-72"
    >
      <Card className="h-full gap-0 overflow-hidden p-0 transition-transform hover:-translate-y-0.5">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-secondary">
              <Icon className="size-8 text-primary/50" />
            </div>
          )}
          <Badge variant="secondary" className="absolute left-2 top-2 gap-1 shadow-sm">
            <Icon className="size-3" />
            {tCategories(item.category)}
          </Badge>
        </div>
        <div className="flex flex-col gap-1 p-3">
          <p className="line-clamp-2 text-sm font-medium leading-snug">{item.title}</p>
          <p className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="truncate">{item.sourceName}</span>
            {item.sourceUrl && <span className="shrink-0 text-primary">{t("readMore")}</span>}
          </p>
        </div>
      </Card>
    </motion.a>
  );
}

export function BeautyNews({ items }: { items: NewsItem[] }) {
  const t = useTranslations("beautyNews");

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto mb-8 max-w-xl text-center">
        <p className="text-sm font-medium text-primary">{t("eyebrow")}</p>
        <h2 className="mt-2 text-balance font-serif text-3xl md:text-4xl">{t("title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Newspaper className="size-3.5" />
          {t("updatedLabel")}
        </p>
      </div>

      <div className="no-scrollbar flex gap-4 overflow-x-auto px-6 pb-2 sm:justify-center sm:px-0">
        {items.map((item, i) => (
          <NewsSlide key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
