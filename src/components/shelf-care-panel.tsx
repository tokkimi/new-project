"use client";

import { useTranslations, useLocale } from "next-intl";
import { PackageOpen, Recycle, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  expiryDate,
  expiryStatus,
  findNearDuplicates,
  shelfValueByCurrency,
  type ExpiryStatus,
  type ShelfCareItem,
} from "@/lib/shelf-care";
import type { Product } from "@/generated/prisma/client";

const PAO_OPTIONS = [3, 6, 9, 12, 18, 24];

const INPUT_CLASS =
  "h-9 min-w-0 rounded-xl border border-input bg-card px-2.5 text-sm text-foreground";

type PrefLite = { openedAt: string | null; paoMonths: number | null };

export function ShelfCarePanel({
  products,
  prefs,
  onPref,
}: {
  products: Product[];
  prefs: Record<string, PrefLite | undefined>;
  onPref: (productId: string, patch: { openedAt?: string | null; paoMonths?: number | null }) => void;
}) {
  const t = useTranslations("shelfCare");
  const tCat = useTranslations("categories");
  const tConcern = useTranslations("concerns");
  const locale = useLocale();

  const items: ShelfCareItem[] = products.map((p) => ({
    productId: p.id,
    name: p.name,
    category: p.category,
    concerns: p.concerns,
    price: p.price ?? null,
    currency: p.currency ?? null,
    openedAt: prefs[p.id]?.openedAt ?? null,
    paoMonths: prefs[p.id]?.paoMonths ?? null,
  }));

  if (items.length === 0) return null;

  const duplicates = findNearDuplicates(items);
  const value = shelfValueByCurrency(items);
  const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  const money = (amount: number, currency: string) => {
    try {
      return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
    } catch {
      return `${Math.round(amount)} ${currency}`;
    }
  };

  const safeCat = (c: string) => {
    try {
      return tCat(c);
    } catch {
      return c;
    }
  };
  const safeConcern = (c: string) => {
    try {
      return tConcern(c);
    } catch {
      return c;
    }
  };

  const statusClass = (s: ExpiryStatus) =>
    cn(
      "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
      s === "expired" && "bg-destructive/12 text-destructive",
      s === "soon" && "bg-am/15 text-am-foreground",
      s === "ok" && "bg-success/12 text-success",
      s === "none" && "bg-secondary text-muted-foreground"
    );

  return (
    <Card className="gap-4">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PackageOpen className="size-5" />
        </span>
        <div>
          <h2 className="font-serif text-xl">{t("title")}</h2>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>

      {Object.keys(value).length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Wallet className="size-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{t("shelfValue")}</span>
          {Object.entries(value).map(([currency, total]) => (
            <span key={currency} className="rounded-full bg-secondary px-3 py-1 text-sm font-medium">
              {money(total, currency)}
            </span>
          ))}
        </div>
      )}

      {duplicates.length > 0 && (
        <ul className="grid gap-2.5">
          {duplicates.map((cluster) => (
            <li
              key={`${cluster.category}-${cluster.concern}`}
              className="flex items-start gap-2.5 rounded-2xl bg-am/10 px-4 py-3 text-sm text-muted-foreground"
            >
              <Recycle className="mt-0.5 size-4 shrink-0 text-am-foreground" />
              <span>
                {t("duplicate", {
                  count: cluster.productIds.length,
                  category: safeCat(cluster.category),
                  concern: safeConcern(cluster.concern),
                })}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {t("expiryLabel")}
        </p>
        <ul className="grid gap-2.5">
          {items.map((item) => {
            const status = expiryStatus(item.openedAt, item.paoMonths);
            const end = expiryDate(item.openedAt, item.paoMonths);
            return (
              <li key={item.productId} className="grid gap-2 rounded-2xl bg-secondary/40 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="min-w-0 truncate text-sm font-medium">{item.name}</span>
                  {status !== "none" && (
                    <span className={statusClass(status)}>
                      {status === "expired"
                        ? t("expired")
                        : status === "soon"
                          ? t("soon")
                          : end
                            ? t("until", { date: dateFmt.format(end) })
                            : ""}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="date"
                    className={INPUT_CLASS}
                    value={item.openedAt ? new Date(item.openedAt).toISOString().slice(0, 10) : ""}
                    onChange={(e) =>
                      onPref(item.productId, {
                        openedAt: e.target.value ? new Date(e.target.value).toISOString() : null,
                      })
                    }
                    aria-label={t("openedOn")}
                  />
                  <select
                    className={INPUT_CLASS}
                    value={item.paoMonths ?? ""}
                    onChange={(e) =>
                      onPref(item.productId, { paoMonths: e.target.value ? Number(e.target.value) : null })
                    }
                    aria-label={t("pao")}
                  >
                    <option value="">{t("paoPlaceholder")}</option>
                    {PAO_OPTIONS.map((m) => (
                      <option key={m} value={m}>
                        {t("months", { count: m })}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="text-xs text-muted-foreground">{t("disclaimer")}</p>
    </Card>
  );
}
