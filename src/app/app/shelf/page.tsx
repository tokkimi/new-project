"use client";

import Link from "next/link";
import { ArrowRight, Trash2, Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddProductDialog } from "@/components/add-product-dialog";
import { useShelf } from "@/lib/shelf-store";
import { CATEGORY_LABELS, findIngredient } from "@/data/ingredients";

export default function ShelfPage() {
  const { shelf, removeProduct } = useShelf();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl">Mon étagère</h1>
          <p className="mt-1 text-muted-foreground">
            {shelf.length} produit{shelf.length > 1 ? "s" : ""} suivi{shelf.length > 1 ? "s" : ""} par Haru.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/app/scan">
              <Camera className="size-4" />
              Scanner
            </Link>
          </Button>
          <AddProductDialog />
        </div>
      </div>

      {shelf.length === 0 ? (
        <Card className="items-center gap-3 py-16 text-center">
          <p className="font-serif text-xl">Ton étagère est vide</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Ajoute quelques produits pour que Haru puisse construire ta
            routine et détecter d&apos;éventuels conflits.
          </p>
          <AddProductDialog />
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shelf.map((p) => (
            <Card key={p.id} className="gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium leading-snug">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.brand}</p>
                </div>
                <button
                  onClick={() => removeProduct(p.id)}
                  className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  aria-label={`Retirer ${p.name}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <Badge variant="secondary" className="w-fit">
                {CATEGORY_LABELS[p.category]}
              </Badge>
              {p.ingredientIds.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {p.ingredientIds.map((id) => (
                    <Badge key={id} variant="outline" className="text-[11px]">
                      {findIngredient(id)?.name}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {shelf.length > 0 && (
        <Card className="flex-row flex-wrap items-center justify-between gap-4 bg-primary/5">
          <div>
            <p className="font-medium">Prêt(e) à voir ta routine ?</p>
            <p className="text-sm text-muted-foreground">
              Haru ordonne tes produits et signale les conflits éventuels.
            </p>
          </div>
          <Button asChild>
            <Link href="/app/routine">
              Voir ma routine
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
