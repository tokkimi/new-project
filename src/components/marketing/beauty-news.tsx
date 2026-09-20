"use client";

import * as React from "react";
import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles, Rocket, TrendingUp, Building2, Trophy } from "lucide-react";
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
      className="block h-full w-[78vw] shrink-0 sm:w-[310px] lg:w-[calc((100vw_-_8rem)/5)]"
    >
      <Card className="h-[360px] gap-0 overflow-hidden p-0 transition-transform hover:-translate-y-0.5 lg:h-[380px]">
        <div className="relative h-[210px] w-full overflow-hidden bg-muted lg:h-[230px]">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" 
              src={item.imageUrl}
              alt=""
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
        <div className="flex min-h-0 flex-1 flex-col gap-2 p-4">
          <p className="line-clamp-3 text-base font-medium leading-snug">{item.title}</p>
          <p className="mt-auto flex items-center justify-between gap-3 text-xs text-muted-foreground">
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
  const railRef = React.useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  const scrollNews = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    const card = rail.querySelector<HTMLElement>("[data-news-card]");
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
    <section className="overflow-hidden py-24">
      <div className="mx-auto mb-8 max-w-xl px-6 text-center">
        <h2 className="text-balance text-3xl font-semibold md:text-4xl">{t("title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="relative mx-[calc(50%-50vw)]">
        <button
          type="button"
          aria-label="Previous news"
          onClick={() => scrollNews(-1)}
          className="absolute left-1 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-transparent shadow-none backdrop-blur-2xl transition hover:bg-white/8"
        >
          <span className="size-2.5 rounded-full bg-[#7f878d]/70 dark:bg-white/85" />
        </button>
        <button
          type="button"
          aria-label="Next news"
          onClick={() => scrollNews(1)}
          className="absolute right-1 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-transparent shadow-none backdrop-blur-2xl transition hover:bg-white/8"
        >
          <span className="size-2.5 rounded-full bg-[#7f878d]/70 dark:bg-white/85" />
        </button>

        <div
          ref={railRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-3 sm:px-8 lg:px-16"
        >
          {items.map((item, i) => (
            <div key={item.id} data-news-card className="snap-start">
              <NewsSlide item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
