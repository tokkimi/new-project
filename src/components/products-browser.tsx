"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { FlaskConical, ListChecks, MapPin, Repeat, Search, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ProductImage } from "@/components/product-image";
import { cn } from "@/lib/utils";
import { TOP_LEVEL_CATEGORIES, categoryParent } from "@/lib/categories";
import { SKIN_TYPES, CONCERNS } from "@/lib/validation";
import { findIngredient } from "@/data/ingredients";
import type { Product } from "@/generated/prisma/client";

const SELECT_CLASS =
  "h-10 rounded-xl border border-input bg-card px-3 text-sm text-foreground";

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

export function ProductsBrowser({ products }: { products: Product[] }) {
  const t = useTranslations("productsPage");
  const tCategories = useTranslations("categories");
  const tSkinTypes = useTranslations("skinTypes");
  const tConcerns = useTranslations("concerns");
  const tIngredients = useTranslations("ingredients");
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string | "all">("all");
  const [skinType, setSkinType] = React.useState<string | "all">("all");
  const [concern, setConcern] = React.useState<string | "all">("all");
  const [brand, setBrand] = React.useState<string | "all">("all");

  const brands = React.useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort((a, b) => a.localeCompare(b)),
    [products]
  );

  const filtered = products.filter((p) => {
    const matchesQuery = `${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || categoryParent(p.category) === category;
    const matchesSkinType = skinType === "all" || p.skinTypes.includes(skinType);
    const matchesConcern = concern === "all" || p.concerns.includes(concern);
    const matchesBrand = brand === "all" || p.brand === brand;
    return matchesQuery && matchesCategory && matchesSkinType && matchesConcern && matchesBrand;
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

      <div className="flex flex-wrap gap-2">
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className={SELECT_CLASS}>
          <option value="all">{t("allBrands")}</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select value={skinType} onChange={(e) => setSkinType(e.target.value)} className={SELECT_CLASS}>
          <option value="all">{t("allSkinTypes")}</option>
          {SKIN_TYPES.map((s) => (
            <option key={s} value={s}>
              {tSkinTypes(s)}
            </option>
          ))}
        </select>
        <select value={concern} onChange={(e) => setConcern(e.target.value)} className={SELECT_CLASS}>
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
        {TOP_LEVEL_CATEGORIES.map((c) => (
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
          {filtered.map((p) => {
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
      )}
    </div>
  );
}
