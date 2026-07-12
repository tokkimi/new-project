"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Plus, Check, AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useShelf } from "@/lib/shelf-store";
import { previewAddConflicts } from "@/lib/routine-engine";
import type { Product } from "@/generated/prisma/client";

export function ProductActions({ product }: { product: Product }) {
  const t = useTranslations("productDetail");
  const tConflicts = useTranslations("conflictRules");
  const { shelf, addProduct } = useShelf();
  const { status } = useSession();

  if (status !== "authenticated") {
    return (
      <div className="flex flex-col gap-2">
        <Button asChild size="lg">
          <Link href="/sign-in">
            <Plus className="size-4" />
            {t("signInToAdd")}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/sign-up">{t("createAccountToSave")}</Link>
        </Button>
      </div>
    );
  }

  const onShelf = shelf.some((p) => p.id === product.id);
  const previewWarnings = onShelf ? [] : previewAddConflicts(product, shelf);

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={() => addProduct(product)} disabled={onShelf} size="lg">
        {onShelf ? <Check className="size-4" /> : <Plus className="size-4" />}
        {onShelf ? t("alreadyOnShelf") : t("addToShelf")}
      </Button>

      {!onShelf && shelf.length > 0 && (
        <div className="rounded-xl border border-border bg-muted/50 p-3 text-sm">
          {previewWarnings.length === 0 ? (
            <p className="text-success">{t("noConflict")}</p>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-1.5 font-medium text-destructive">
                <AlertTriangle className="size-4" />
                {t("conflictWarning", { count: previewWarnings.length })}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {previewWarnings.map((w) => (
                  <Badge key={w.rule.id} variant="outline">
                    {tConflicts(`${w.rule.id}.headline`)}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
