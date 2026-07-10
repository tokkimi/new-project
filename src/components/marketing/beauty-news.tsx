"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { NewsItem } from "@/generated/prisma/client";

const CATEGORIES = ["innovation", "launch", "ingredient-trend", "brand-news", "award"] as const;

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const t = useTranslations("beautyNews");
  const tCategories = useTranslations("beautyNews.categories");

  const content = (
    <Card className="h-full gap-3 transition-colors hover:border-primary/40">
      <div className="flex items-center justify-between gap-2">
        <Badge variant="secondary">{tCategories(item.category)}</Badge>
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
    >
      {item.sourceUrl ? (
        <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer nofollow">
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

  if (items.length === 0) return null;

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

      <Tabs defaultValue="all">
        <div className="mb-8 flex justify-center">
          <TabsList className="flex-wrap">
            <TabsTrigger value="all">{t("all")}</TabsTrigger>
            {CATEGORIES.map((c) => (
              <TabsTrigger key={c} value={c}>
                {t(`categories.${c}`)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="all">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </TabsContent>
        {CATEGORIES.map((c) => (
          <TabsContent key={c} value={c}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items
                .filter((item) => item.category === c)
                .map((item, i) => (
                  <NewsCard key={item.id} item={item} index={i} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
