"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Check, Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { findIngredient } from "@/data/ingredients";
import { useShelf, useCatalog } from "@/lib/shelf-store";
import { ProductImage } from "@/components/product-image";
import type { Product } from "@/generated/prisma/client";

type InitialPreference = {
  routineSlot: "morning" | "evening" | "both" | "pause";
  customCategory: string | null;
  note: string | null;
};

export function AddProductDialog({
  onProductAdded,
  existingProducts,
}: {
  onProductAdded?: (product: Product, preference: InitialPreference) => void;
  existingProducts?: Product[];
}) {
  const t = useTranslations("addProductDialog");
  const tShelf = useTranslations("shelf");
  const tCategories = useTranslations("categories");
  const tIngredients = useTranslations("ingredients");
  const tWorkspace = useTranslations("routineWorkspace");
  const { shelf, addProduct } = useShelf();
  const { catalog } = useCatalog();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<Product | null>(null);
  const [preference, setPreference] = React.useState<InitialPreference>({
    routineSlot: "both",
    customCategory: null,
    note: null,
  });

  const productsAlreadyAdded = existingProducts ?? shelf;
  const available = catalog.filter((p) => !productsAlreadyAdded.some((s) => s.id === p.id));
  const filtered = available.filter((p) => `${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase()));

  const reset = () => {
    setQuery("");
    setSelected(null);
    setPreference({ routineSlot: "both", customCategory: null, note: null });
  };

  const confirm = () => {
    if (!selected) return;
    if (onProductAdded) {
      onProductAdded(selected, preference);
    } else {
      addProduct(selected);
    }
    setOpen(false);
    reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          {tShelf("addProduct")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[84vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("searchPlaceholder")} className="pl-9" />
        </div>

        {selected && (
          <div className="grid gap-3 rounded-md border border-border p-3">
            <div className="flex items-center gap-3">
              <ProductImage imageUrl={selected.imageUrl} category={selected.category} name={selected.name} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{selected.name}</p>
                <p className="text-xs text-muted-foreground">{selected.brand}</p>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <select
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={preference.routineSlot}
                onChange={(e) => setPreference({ ...preference, routineSlot: e.target.value as InitialPreference["routineSlot"] })}
              >
                <option value="both">{tWorkspace("routineSlot.both")}</option>
                <option value="morning">{tWorkspace("routineSlot.morning")}</option>
                <option value="evening">{tWorkspace("routineSlot.evening")}</option>
                <option value="pause">{tWorkspace("routineSlot.pause")}</option>
              </select>
              <input
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                placeholder={tWorkspace("categoryPlaceholder")}
                value={preference.customCategory ?? ""}
                onChange={(e) => setPreference({ ...preference, customCategory: e.target.value || null })}
              />
            </div>
            <textarea
              className="min-h-20 rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder={tWorkspace("productNotePlaceholder")}
              value={preference.note ?? ""}
              onChange={(e) => setPreference({ ...preference, note: e.target.value || null })}
            />
            <Button onClick={confirm}>
              <Check className="size-4" /> {t("confirm")}
            </Button>
          </div>
        )}

        <div className="flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
          {filtered.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">{t("noResults")}</p>}
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="flex items-center gap-3 rounded-md bg-card px-3 py-2.5 text-left shadow-sm transition-colors hover:bg-primary/5"
            >
              <ProductImage imageUrl={p.imageUrl} category={p.category} name={p.name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.brand} · {tCategories(p.category)}
                </p>
                {p.ingredientIds.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {p.ingredientIds.slice(0, 2).map((id) =>
                      findIngredient(id) ? (
                        <Badge key={id} variant="secondary" className="text-[10px]">
                          {tIngredients(`${id}.name`).split(" ")[0]}
                        </Badge>
                      ) : null
                    )}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
