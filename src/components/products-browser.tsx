"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { FlaskConical, ListChecks, MapPin, Repeat, Search, Sparkles, Plus } from "lucide-react";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductImage } from "@/components/product-image";
import { cn } from "@/lib/utils";
import { TOP_LEVEL_CATEGORIES } from "@/lib/categories";
import { SKIN_TYPES, CONCERNS } from "@/lib/validation";
import { findIngredient } from "@/data/ingredients";
import type { Product } from "@/generated/prisma/client";
import type { ProductSearchFilters } from "@/lib/products";

const SELECT_CLASS =
  "h-10 min-w-0 max-w-full flex-1 basis-[140px] truncate rounded-xl border border-input bg-card px-3 text-sm text-foreground";

function compactIngredients(value: string | null): string {
  if (!value) return "Unknown";
  const parts = value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.slice(0, 5).join(", ") + (parts.length > 5 ? "..." : "");
}

function frequencyFromUsage(product: Product): string {
  const text = product.usageSteps.join(" ").toLowerCase();
  if (text.includes("2-3x") || text.includes("2-3")) return "2-3x/week";
  if (text.includes("1-2x") || text.includes("1-2")) return "1-2x/week";
  if (text.includes("weekly") || text.includes("week")) return "Weekly";
  if (text.includes("pm only") || text.includes("evening") || text.includes("night")) return "PM";
  if (text.includes("am") || text.includes("morning")) return "AM";
  if (product.category === "sunscreen") return "AM, daily";
  return "Daily or as directed";
}

export function ProductsBrowser({
  products,
  total,
  limit,
  batchSize,
  brands,
  filters,
}: {
  products: Product[];
  total: number;
  limit: number;
  batchSize: number;
  brands: string[];
  filters: ProductSearchFilters;
}) {
  const t = useTranslations("productsPage");
  const tCategories = useTranslations("categories");
  const tSkinTypes = useTranslations("skinTypes");
  const tConcerns = useTranslations("concerns");
  const tIngredients = useTranslations("ingredients");
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = React.useState(filters.q ?? "");
  const [syncedQ, setSyncedQ] = React.useState(filters.q ?? "");
  if ((filters.q ?? "") !== syncedQ) {
    setSyncedQ(filters.q ?? "");
    setQuery(filters.q ?? "");
  }

  const pushFilters = React.useCallback(
    (next: Partial<ProductSearchFilters> & { limit?: number }, opts?: { scroll?: boolean }) => {
      const merged = { ...filters, ...next };
      const params = new URLSearchParams();
      if (merged.q) params.set("q", merged.q);
      if (merged.category) params.set("category", merged.category);
      if (merged.skinType) params.set("skinType", merged.skinType);
      if (merged.concern) params.set("concern", merged.concern);
      if (merged.brand) params.set("brand", merged.brand);
      if (next.limit && next.limit > batchSize) params.set("limit", String(next.limit));
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: opts?.scroll ?? true });
    },
    [filters, pathname, router, batchSize]
  );

  // Debounced text search — everything else re-navigates immediately.
  React.useEffect(() => {
    if (query === (filters.q ?? "")) return;
    const id = setTimeout(() => pushFilters({ q: query || undefined }), 350);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const hasMore = products.length < total;

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

      <div className="flex flex-wrap gap-2">
        <select
          value={filters.brand ?? "all"}
          onChange={(e) => pushFilters({ brand: e.target.value === "all" ? undefined : e.target.value })}
          className={SELECT_CLASS}
        >
          <option value="all">{t("allBrands")}</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select
          value={filters.skinType ?? "all"}
          onChange={(e) => pushFilters({ skinType: e.target.value === "all" ? undefined : e.target.value })}
          className={SELECT_CLASS}
        >
          <option value="all">{t("allSkinTypes")}</option>
          {SKIN_TYPES.map((s) => (
            <option key={s} value={s}>
              {tSkinTypes(s)}
            </option>
          ))}
        </select>
        <select
          value={filters.concern ?? "all"}
          onChange={(e) => pushFilters({ concern: e.target.value === "all" ? undefined : e.target.value })}
          className={SELECT_CLASS}
        >
          <option value="all">{t("allConcerns")}</option>
          {CONCERNS.map((c) => (
            <option key={c} value={c}>
              {tConcerns(c)}
            </option>
          ))}
        </select>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => pushFilters({ category: undefined })}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            !filters.category
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          {t("allCategories")}
        </button>
        {TOP_LEVEL_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => pushFilters({ category: c })}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              filters.category === c
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {tCategories(c)}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">{t("resultsCount", { count: total })}</p>

      {products.length === 0 ? (
        <Card className="items-center gap-2 py-16 text-center">
          <p className="font-medium">{t("noResultsTitle")}</p>
          <p className="text-sm text-muted-foreground">{t("noResultsText")}</p>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => {
              const trackedActives = p.ingredientIds.filter((id) => findIngredient(id));
              return (
                <Link key={p.id} href={`/app/product/${p.slug}`} className="block">
                  <Card className="h-full gap-0 overflow-hidden p-0 transition-transform hover:-translate-y-0.5">
                    <div className="relative bg-white">
                      <ProductImage imageUrl={p.imageUrl} category={p.category} name={p.name} size="lg" />
                      <Badge variant="secondary" className="absolute left-2 top-2">
                        {tCategories(p.category)}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-3 p-4">
                      <div>
                        <p className="line-clamp-2 font-medium leading-snug">{p.name}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{p.brand}</p>
                      </div>

                      <div className="grid gap-2 text-xs">
                        <div className="flex items-start gap-2">
                          <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                          <span>
                            <span className="font-medium text-foreground">{t("country")}:</span>{" "}
                            <span className="text-muted-foreground">{p.origin || "Unknown"}</span>
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Sparkles className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                          <span>
                            <span className="font-medium text-foreground">{t("skinTypesLabel")}:</span>{" "}
                            <span className="text-muted-foreground">
                              {p.skinTypes.length
                                ? p.skinTypes.slice(0, 3).map((st) => tSkinTypes(st)).join(", ")
                                : "Unknown"}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Repeat className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                          <span>
                            <span className="font-medium text-foreground">{t("frequency")}:</span>{" "}
                            <span className="text-muted-foreground">{frequencyFromUsage(p)}</span>
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <FlaskConical className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                          <span>
                            <span className="font-medium text-foreground">{t("keyActives")}:</span>{" "}
                            <span className="text-muted-foreground">
                              {trackedActives.length
                                ? trackedActives.slice(0, 3).map((id) => tIngredients(`${id}.name`)).join(", ")
                                : t("noTrackedActives")}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ListChecks className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                          <span>
                            <span className="font-medium text-foreground">{t("composition")}:</span>{" "}
                            <span className="text-muted-foreground">{compactIngredients(p.fullIngredients)}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {p.concerns.slice(0, 3).map((c) => (
                          <Badge key={c} variant="outline" className="text-[10px]">
                            {tConcerns(c)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                onClick={() => pushFilters({ limit: limit + batchSize }, { scroll: false })}
              >
                <Plus className="size-4" />
                {t("seeMore")}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
