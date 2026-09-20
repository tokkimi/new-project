"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Sun, Moon, AlertTriangle, ChevronRight, Heart, Layers, Plus, Sparkles, Trash2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductImage } from "@/components/product-image";
import { AddProductDialog } from "@/components/add-product-dialog";
import { useShelf } from "@/lib/shelf-store";
import { buildRoutine, severityTone, type RoutineStep } from "@/lib/routine-engine";
import type { VariantProps } from "class-variance-authority";
import type { Product } from "@/generated/prisma/client";

type Preference = {
  productId: string;
  favorite: boolean;
  routineSlot: "morning" | "evening" | "both" | "pause";
  customCategory: string | null;
  note: string | null;
  purchasedAt: string | null;
  expiresAt: string | null;
  openedAt: string | null;
  paoMonths: number | null;
};

const PAO_OPTIONS = [3, 6, 9, 12, 18, 24];
const FIELD_CLASS =
  "h-11 w-full min-w-0 rounded-xl border border-border bg-white/[0.035] px-3 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30";

function dateInputValue(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function dateInputPatch(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(value).toISOString() : null;
}

function ProductRoutineDialog({
  product,
  pref,
  open,
  onOpenChange,
  onPref,
  onRemove,
}: {
  product: Product | null;
  pref?: Preference;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPref?: (productId: string, patch: Partial<Preference>) => void;
  onRemove: (productId: string) => void;
}) {
  const t = useTranslations("routineWorkspace");
  const tShelf = useTranslations("shelfCare");

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[86vh] max-w-2xl overflow-y-auto border-border bg-[#111]/78 text-foreground shadow-[0_22px_90px_-40px_rgba(255,255,255,0.28)] backdrop-blur-2xl">
        <DialogHeader>
          <div className="flex items-start gap-3 pr-8">
            <ProductImage imageUrl={product.imageUrl} category={product.category} name={product.name} size="sm" />
            <div className="min-w-0">
              <DialogTitle className="truncate font-sans text-xl font-semibold text-foreground">{product.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge variant="outline">{t(`routineSlot.${pref?.routineSlot ?? "both"}`)}</Badge>
                {pref?.customCategory && <Badge variant="secondary">{pref.customCategory}</Badge>}
                {pref?.favorite && <Badge>{t("favorite")}</Badge>}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/app/product/${product.slug}`}>{t("viewSheet")}</Link>
          </Button>
          <Button
            variant={pref?.favorite ? "default" : "outline"}
            size="sm"
            onClick={() => onPref?.(product.id, { favorite: !pref?.favorite })}
          >
            <Heart className="size-4" /> {t("favorite")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onRemove(product.id);
              onOpenChange(false);
            }}
          >
            <Trash2 className="size-4" /> {t("remove")}
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t("momentLabel")}
            <select
              className={FIELD_CLASS}
              value={pref?.routineSlot ?? "both"}
              onChange={(e) => onPref?.(product.id, { routineSlot: e.target.value as Preference["routineSlot"] })}
            >
              <option value="both">{t("routineSlot.both")}</option>
              <option value="morning">{t("routineSlot.morning")}</option>
              <option value="evening">{t("routineSlot.evening")}</option>
              <option value="pause">{t("routineSlot.pause")}</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t("categoryLabel")}
            <input
              className={FIELD_CLASS}
              placeholder={t("categoryPlaceholder")}
              defaultValue={pref?.customCategory ?? ""}
              onBlur={(e) => onPref?.(product.id, { customCategory: e.target.value || null })}
            />
          </label>
        </div>

        <div className="grid gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("productDatesTitle")}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="grid gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {t("purchaseDate")}
              <input
                type="text"
                inputMode="numeric"
                className={FIELD_CLASS}
                placeholder={t("datePlaceholder")}
                defaultValue={dateInputValue(pref?.purchasedAt)}
                onBlur={(e) =>
                  onPref?.(product.id, {
                    purchasedAt: dateInputPatch(e.target.value.trim()),
                  })
                }
              />
            </label>
            <label className="grid gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {t("expiryDate")}
              <input
                type="text"
                inputMode="numeric"
                className={FIELD_CLASS}
                placeholder={t("datePlaceholder")}
                defaultValue={dateInputValue(pref?.expiresAt)}
                onBlur={(e) =>
                  onPref?.(product.id, {
                    expiresAt: dateInputPatch(e.target.value.trim()),
                  })
                }
              />
            </label>
            <label className="grid gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {tShelf("openedOn")}
            <input
              type="text"
              inputMode="numeric"
              className={FIELD_CLASS}
              placeholder={t("datePlaceholder")}
              defaultValue={dateInputValue(pref?.openedAt)}
              onBlur={(e) =>
                onPref?.(product.id, {
                  openedAt: dateInputPatch(e.target.value.trim()),
                })
              }
              aria-label={tShelf("openedOn")}
            />
            </label>
          </div>
          <label className="grid gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {t("periodAfterOpening")}
            <select
              className={FIELD_CLASS}
              value={pref?.paoMonths ?? ""}
              onChange={(e) => onPref?.(product.id, { paoMonths: e.target.value ? Number(e.target.value) : null })}
              aria-label={tShelf("pao")}
            >
              <option value="">{tShelf("paoPlaceholder")}</option>
              {PAO_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {tShelf("months", { count: m })}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="grid gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {t("noteLabel")}
          <textarea
            className="min-h-28 w-full rounded-xl border border-border bg-white/[0.035] px-3 py-2 text-sm text-foreground backdrop-blur-xl placeholder:text-muted-foreground"
            placeholder={t("productNotePlaceholder")}
            defaultValue={pref?.note ?? ""}
            onBlur={(e) => onPref?.(product.id, { note: e.target.value || null })}
          />
        </label>
      </DialogContent>
    </Dialog>
  );
}

function RoutineColumn({
  title,
  icon,
  steps,
  accent,
  stepsLabel,
  emptyLabel,
  categoryLabel,
  removeLabel,
  onRemove,
  onEdit,
  addControl,
}: {
  title: string;
  icon: React.ReactNode;
  steps: RoutineStep[];
  accent: "am" | "pm";
  stepsLabel: string;
  emptyLabel: string;
  categoryLabel: (category: RoutineStep["product"]["category"]) => string;
  removeLabel: string;
  onRemove: (productId: string) => void;
  onEdit: (product: Product) => void;
  addControl?: React.ReactNode;
}) {
  return (
    <Card className="min-w-0 gap-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="font-serif text-xl">{title}</h2>
        {addControl}
        <Badge variant={accent} className="ml-auto">
          {stepsLabel}
        </Badge>
      </div>
      {steps.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">{emptyLabel}</p>
      ) : (
        <ol className="flex min-w-0 flex-col gap-2.5">
          {steps.map((step, i) => (
            <li
              key={step.product.id}
              className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-white/[0.025] px-3 py-2.5 text-foreground backdrop-blur-xl transition-colors hover:border-border hover:bg-white/[0.045]"
            >
              <button
                type="button"
                onClick={() => onEdit(step.product)}
                className="flex min-w-0 flex-1 items-center gap-3"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-transparent text-xs font-medium text-muted-foreground">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{step.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {step.product.brand} · {categoryLabel(step.product.category)}
                  </p>
                </div>
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onRemove(step.product.id);
                }}
                aria-label={removeLabel}
                className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-white/8 hover:text-foreground"
              >
                <Trash2 className="size-4" />
              </button>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}

function productSearchText(product: Product) {
  return `${product.name} ${product.brand} ${product.category} ${product.concerns.join(" ")} ${product.ingredientIds.join(" ")}`.toLowerCase();
}

function hasAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function buildCompletenessAdvice(shelf: Product[], preferences: Record<string, Preference | undefined>) {
  const productTexts = shelf.map(productSearchText);
  const hasCleanser = productTexts.some((text) =>
    hasAny(text, ["cleanser", "cleansing", "foam", "gel wash", "oil cleanser", "nettoyant", "nettoyage", "클렌"])
  );
  const hasMoisturizer = productTexts.some((text) =>
    hasAny(text, ["moistur", "cream", "barrier", "ceramide", "hydrating", "hydration", "gel cream", "lotion", "creme", "hydrat"])
  );
  const hasSpf = productTexts.some((text) =>
    hasAny(text, ["spf", "sunscreen", "sun cream", "sun protection", "uv", "protection solaire", "선크림"])
  );
  const hasMorning = shelf.some((product) => {
    const slot = preferences[product.id]?.routineSlot ?? "both";
    return slot === "morning" || slot === "both";
  });
  const hasEvening = shelf.some((product) => {
    const slot = preferences[product.id]?.routineSlot ?? "both";
    return slot === "evening" || slot === "both";
  });

  const advice: Array<"cleanser" | "moisturizer" | "spf" | "morning" | "evening"> = [];
  if (!hasCleanser) advice.push("cleanser");
  if (!hasMoisturizer) advice.push("moisturizer");
  if (!hasSpf) advice.push("spf");
  if (shelf.length > 0 && !hasMorning) advice.push("morning");
  if (shelf.length > 0 && !hasEvening) advice.push("evening");
  return advice;
}

export function RoutineDiagnostics({ preferences = {} }: { preferences?: Record<string, Preference | undefined> }) {
  const t = useTranslations("routinePage");
  const tAdvice = useTranslations("routineWorkspace.analysisAdvice");
  const tSeverity = useTranslations("severity");
  const tConflicts = useTranslations("conflictRules");
  const { shelf } = useShelf();
  const routine = buildRoutine(shelf);
  const advice = buildCompletenessAdvice(shelf, preferences);

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-foreground" />
          <h2 className="font-serif text-xl">{tAdvice("title")}</h2>
        </div>
        {advice.length === 0 ? (
          <Card className="gap-2">
            <p className="font-medium text-foreground">{tAdvice("completeTitle")}</p>
            <p className="text-sm leading-6 text-muted-foreground">{tAdvice("completeText")}</p>
          </Card>
        ) : (
          <Card className="gap-3">
            <p className="text-sm leading-6 text-muted-foreground">{tAdvice("subtitle")}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {advice.map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-white/[0.025] p-3">
                  <p className="text-sm font-medium text-foreground">{tAdvice(`${item}.title`)}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{tAdvice(`${item}.text`)}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-5 text-destructive" />
          <h2 className="font-serif text-xl">
            {t("conflictsDetected")}
            {routine.warnings.length > 0 && (
              <span className="ml-2 text-base text-muted-foreground">
                ({routine.warnings.length})
              </span>
            )}
          </h2>
        </div>

        {routine.warnings.length === 0 ? (
          <Card className="items-center gap-2 py-10 text-center">
            <p className="font-medium">{t("noConflictsTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("noConflictsText")}</p>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {routine.warnings.map((w) => (
              <Link
                key={`${w.rule.id}-${w.productA.id}-${w.productB.id}`}
                href={`/app/conflict/${w.rule.id}?a=${w.productA.id}&b=${w.productB.id}`}
              >
                <Card className="flex-row items-center gap-4 border-border bg-white/[0.03] text-foreground backdrop-blur-xl transition-colors hover:border-border">
                  <Badge
                    variant={severityTone(w.rule.severity) as VariantProps<typeof badgeVariants>["variant"]}
                    className="shrink-0"
                  >
                    {tSeverity(w.rule.severity)}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {tConflicts(`${w.rule.id}.headline`)}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {w.productA.name} + {w.productB.name}
                    </p>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {routine.duplicateActives.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Layers className="size-5 text-foreground" />
            <h2 className="font-serif text-xl">{t("duplicateActives")}</h2>
          </div>
          <div className="flex flex-col gap-3">
            {routine.duplicateActives.map((dup) => (
              <Card key={dup.ingredientId} className="gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-foreground" />
                  <p className="font-medium">
                    {t("duplicateTitle", { count: dup.products.length })}
                  </p>
                </div>
                <p className="flex flex-wrap gap-1.5 text-sm text-muted-foreground">
                  {dup.products.map((p) => (
                    <Badge key={p.id} variant="outline" className="max-w-full truncate whitespace-normal">
                      {p.name}
                    </Badge>
                  ))}
                </p>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export function RoutineContent({
  compact = false,
  showDiagnostics = true,
  preferences = {},
  onPref,
}: {
  compact?: boolean;
  showDiagnostics?: boolean;
  preferences?: Record<string, Preference | undefined>;
  onPref?: (productId: string, patch: Partial<Preference>) => void;
}) {
  const t = useTranslations("routinePage");
  const tCategories = useTranslations("categories");
  const { shelf, addProduct, removeProduct } = useShelf();
  const routine = buildRoutine(shelf);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const handleProductAdded = React.useCallback(
    (product: Product, preference: Pick<Preference, "routineSlot" | "customCategory" | "note">) => {
      addProduct(product);
      onPref?.(product.id, preference);
    },
    [addProduct, onPref]
  );
  const addButton = (slot: "morning" | "evening") => (
    <AddProductDialog
      existingProducts={shelf}
      initialRoutineSlot={slot}
      onProductAdded={handleProductAdded}
      trigger={
        <button
          type="button"
          aria-label="Add product"
          className="ml-1 inline-flex size-8 items-center justify-center rounded-full border border-border bg-transparent text-foreground transition hover:bg-white/8"
        >
          <Plus className="size-4" />
        </button>
      }
    />
  );

  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div>
        <h1 className={compact ? "font-serif text-2xl" : "font-serif text-3xl"}>{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle", { count: shelf.length })}</p>
      </div>

      <div className="grid min-w-0 gap-5 md:grid-cols-2">
        <RoutineColumn
          title={t("morning")}
          icon={<Sun className="size-5 text-foreground" />}
          steps={routine.am}
          accent="am"
          stepsLabel={t("steps", { count: routine.am.length })}
          emptyLabel={t("noProducts")}
          categoryLabel={(c) => tCategories(c)}
          removeLabel={t("remove")}
          onRemove={removeProduct}
          onEdit={setSelectedProduct}
          addControl={addButton("morning")}
        />
        <RoutineColumn
          title={t("evening")}
          icon={<Moon className="size-5 text-foreground" />}
          steps={routine.pm}
          accent="pm"
          stepsLabel={t("steps", { count: routine.pm.length })}
          emptyLabel={t("noProducts")}
          categoryLabel={(c) => tCategories(c)}
          removeLabel={t("remove")}
          onRemove={removeProduct}
          onEdit={setSelectedProduct}
          addControl={addButton("evening")}
        />
      </div>

      {showDiagnostics && <RoutineDiagnostics />}

      <ProductRoutineDialog
        product={selectedProduct}
        pref={selectedProduct ? preferences[selectedProduct.id] : undefined}
        open={Boolean(selectedProduct)}
        onOpenChange={(open) => {
          if (!open) setSelectedProduct(null);
        }}
        onPref={onPref}
        onRemove={removeProduct}
      />
    </div>
  );
}
