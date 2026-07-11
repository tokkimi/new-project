"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ProductVisual } from "@/components/product-visual";
import { cn } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/lib/categories";
import type { Product } from "@/generated/prisma/client";

export function ProductsBrowser({ products }: { products: Product[] }) {
  const t = useTranslations("productsPage");
  const tCategories = useTranslations("categories");
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string | "all">("all");

  const filtered = products.filter((p) => {
    const matchesQuery = `${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="pl-9"
        />
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            category === "all"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          {t("allCategories")}
        </button>
        {PRODUCT_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              category === c
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {tCategories(c)}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">{t("resultsCount", { count: filtered.length })}</p>

      {filtered.length === 0 ? (
        <Card className="items-center gap-2 py-16 text-center">
          <p className="font-medium">{t("noResultsTitle")}</p>
          <p className="text-sm text-muted-foreground">{t("noResultsText")}</p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link key={p.id} href={`/app/product/${p.slug}`}>
              <Card className="h-full gap-0 overflow-hidden p-0 transition-transform hover:-translate-y-0.5">
                <div className="relative">
                  <ProductVisual category={p.category} size="lg" className="rounded-none" />
                  <Badge variant="secondary" className="absolute left-2 top-2">
                    {tCategories(p.category)}
                  </Badge>
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <p className="truncate font-medium leading-snug">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.brand} · {p.origin}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
