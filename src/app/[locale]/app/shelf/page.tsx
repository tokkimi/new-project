"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { ArrowRight, Trash2, Camera } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddProductDialog } from "@/components/add-product-dialog";
import { ProductImage } from "@/components/product-image";
import { useShelf } from "@/lib/shelf-store";
import { findIngredient } from "@/data/ingredients";

export default function ShelfPage() {
  const t = useTranslations("shelf");
  const tCategories = useTranslations("categories");
  const tIngredients = useTranslations("ingredients");
  const { shelf, removeProduct } = useShelf();
  const { status } = useSession();

  if (status !== "authenticated") {
    return (
      <Card className="mx-auto max-w-md items-center gap-4 py-14 text-center">
        <h1 className="font-serif text-2xl">{t("title")}</h1>
        <p className="max-w-sm text-muted-foreground">{t("signInRequired")}</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link href="/sign-in">{t("signInCta")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-up">{t("signUpCta")}</Link>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl">{t("title")}</h1>
          <p className="mt-1 text-muted-foreground">
            {t("subtitle", { count: shelf.length })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/app/scan">
              <Camera className="size-4" />
              {t("scan")}
            </Link>
          </Button>
          <AddProductDialog />
        </div>
      </div>

      {shelf.length === 0 ? (
        <Card className="items-center gap-3 py-16 text-center">
          <p className="font-serif text-xl">{t("emptyTitle")}</p>
          <p className="max-w-sm text-sm text-muted-foreground">{t("emptyText")}</p>
          <AddProductDialog />
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shelf.map((p) => (
            <Card key={p.id} className="gap-0 overflow-hidden p-0">
              <div className="relative bg-white">
                <ProductImage imageUrl={p.imageUrl} category={p.category} name={p.name} size="lg" />
                <button
                  onClick={() => removeProduct(p.id)}
                  className="absolute right-2 top-2 rounded-full bg-background/90 p-1.5 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:bg-destructive/10 hover:text-destructive"
                  aria-label={t("remove", { name: p.name })}
                >
                  <Trash2 className="size-4" />
                </button>
                <Badge variant="secondary" className="absolute left-2 top-2">
                  {tCategories(p.category)}
                </Badge>
              </div>
              <div className="flex flex-col gap-3 p-4">
                <Link href={`/app/product/${p.slug}`} className="min-w-0">
                  <p className="truncate font-medium leading-snug hover:underline">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.brand}</p>
                </Link>
                {p.ingredientIds.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {p.ingredientIds.map((id) => (
                      <Badge key={id} variant="outline" className="text-[11px]">
                        {findIngredient(id) ? tIngredients(`${id}.name`) : id}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {status === "authenticated" && shelf.length > 0 && (
        <Card className="flex-row flex-wrap items-center justify-between gap-4 bg-primary/5">
          <div>
            <p className="font-medium">{t("readyTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("readyText")}</p>
          </div>
          <Button asChild>
            <Link href="/app/profile">
              {t("viewRoutine")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
