"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Plus, Search } from "lucide-react";
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

export function AddProductDialog() {
  const t = useTranslations("addProductDialog");
  const tShelf = useTranslations("shelf");
  const tCategories = useTranslations("categories");
  const tIngredients = useTranslations("ingredients");
  const { shelf, addProduct } = useShelf();
  const { catalog } = useCatalog();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const available = catalog.filter(
    (p) => !shelf.some((s) => s.id === p.id)
  );
  const filtered = available.filter((p) =>
    `${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          {tShelf("addProduct")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="pl-9"
          />
        </div>
        <div className="flex max-h-80 flex-col gap-2 overflow-y-auto pr-1">
          {filtered.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              {t("noResults")}
            </p>
          )}
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                addProduct(p);
                setOpen(false);
                setQuery("");
              }}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.brand} · {tCategories(p.category)}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                {p.ingredientIds.slice(0, 2).map((id) =>
                  findIngredient(id) ? (
                    <Badge key={id} variant="secondary" className="text-[10px]">
                      {tIngredients(`${id}.name`).split(" ")[0]}
                    </Badge>
                  ) : null
                )}
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
