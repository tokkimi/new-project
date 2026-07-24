"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { AlertTriangle, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { REACTION_TYPES, findRecurrences } from "@/lib/reactions";
import type { Product } from "@/generated/prisma/client";

type Reaction = {
  id: string;
  type: string;
  productId: string | null;
  note: string | null;
  createdAt: string;
  product: { name: string } | null;
};

const SELECT_CLASS =
  "h-10 w-full min-w-0 rounded-xl border border-input bg-card px-3 text-sm text-foreground";

export function ReactionJournal({ products }: { products: Product[] }) {
  const t = useTranslations("reactions");
  const locale = useLocale();
  const [reactions, setReactions] = React.useState<Reaction[]>([]);
  const [type, setType] = React.useState<string>("");
  const [productId, setProductId] = React.useState<string>("");
  const [note, setNote] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/workspace/reactions")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.reactions) setReactions(d.reactions);
      })
      .catch(() => {});
  }, []);

  const save = async () => {
    if (!type || saving) return;
    setSaving(true);
    try {
      const res = await fetch("/api/workspace/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, productId: productId || null, note: note || undefined }),
      });
      if (res.ok) {
        const d = await res.json();
        setReactions((prev) => [d.reaction, ...prev]);
        setType("");
        setProductId("");
        setNote("");
      }
    } finally {
      setSaving(false);
    }
  };

  const recurrences = findRecurrences(reactions.map((r) => ({ type: r.type, productId: r.productId })));
  const nameById = new Map(products.map((p) => [p.id, p.name]));
  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" });

  return (
    <div className="grid gap-5">
      <Card className="gap-4">
        <div>
          <h2 className="font-serif text-xl">{t("title")}</h2>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {REACTION_TYPES.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setType(code)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                type === code
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {t(`types.${code}`)}
            </button>
          ))}
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <select
            className={SELECT_CLASS}
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">{t("noProduct")}</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <input
            className={SELECT_CLASS}
            placeholder={t("notePlaceholder")}
            value={note}
            maxLength={300}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={save} disabled={!type || saving}>
            <Check className="size-4" />
            {t("save")}
          </Button>
        </div>
      </Card>

      {recurrences.length > 0 && (
        <Card className="gap-3">
          <h3 className="font-serif text-lg">{t("recurrenceTitle")}</h3>
          <ul className="grid gap-2.5">
            {recurrences.map((r) => (
              <li
                key={`${r.productId}-${r.type}`}
                className="flex items-start gap-2.5 rounded-2xl bg-am/10 px-4 py-3 text-sm text-muted-foreground"
              >
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-am-foreground" />
                <span>
                  {t("recurrence", {
                    type: t(`types.${r.type}`),
                    product: nameById.get(r.productId) ?? t("aProduct"),
                    count: r.count,
                  })}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">{t("recurrenceNote")}</p>
        </Card>
      )}

      <div className="grid gap-3">
        <h3 className="font-serif text-lg">{t("recentTitle")}</h3>
        {reactions.length === 0 ? (
          <Card className="py-10 text-center text-sm text-muted-foreground">{t("empty")}</Card>
        ) : (
          reactions.slice(0, 30).map((r) => (
            <Card key={r.id} className="flex-row items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium">{t(`types.${r.type}`)}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {r.product?.name ?? t("noProduct")}
                  {r.note ? ` · ${r.note}` : ""}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {dateFmt.format(new Date(r.createdAt))}
              </span>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
