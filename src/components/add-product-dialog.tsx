"use client";

import * as React from "react";
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
import { PRODUCT_CATALOG } from "@/data/catalog";
import { CATEGORY_LABELS, findIngredient } from "@/data/ingredients";
import { useShelf } from "@/lib/shelf-store";

export function AddProductDialog() {
  const { shelf, addProduct } = useShelf();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const available = PRODUCT_CATALOG.filter(
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
          Ajouter un produit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Ajouter à ton étagère</DialogTitle>
          <DialogDescription>
            Choisis un produit de notre base — en v1 réelle, cette étape se
            fait en scannant l&apos;emballage.
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une marque ou un produit..."
            className="pl-9"
          />
        </div>
        <div className="flex max-h-80 flex-col gap-2 overflow-y-auto pr-1">
          {filtered.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Aucun produit ne correspond.
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
                  {p.brand} · {CATEGORY_LABELS[p.category]}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                {p.ingredientIds.slice(0, 2).map((id) => (
                  <Badge key={id} variant="secondary" className="text-[10px]">
                    {findIngredient(id)?.name.split(" ")[0]}
                  </Badge>
                ))}
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
