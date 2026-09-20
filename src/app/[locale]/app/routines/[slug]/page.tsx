import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Sun, Moon, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/product-image";
import { findGuide, stepsForSlot, type GuideStep } from "@/lib/routine-guides";
import { findIngredient } from "@/data/ingredients";
import { db } from "@/lib/db";

type SuggestedProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string | null;
};

async function productsForGuide(steps: GuideStep[]) {
  const used = new Set<string>();
  const out: Array<{ step: GuideStep; products: SuggestedProduct[] }> = [];

  for (const step of steps) {
    const exactWhere = step.activeId
      ? { category: step.category, ingredientIds: { has: step.activeId } }
      : { category: step.category };
    let products = await db.product.findMany({
      where: exactWhere,
      orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
      take: 6,
      select: { id: true, slug: true, name: true, brand: true, category: true, imageUrl: true },
    });

    if (products.length === 0 && step.activeId) {
      products = await db.product.findMany({
        where: { ingredientIds: { has: step.activeId } },
        orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
        take: 6,
        select: { id: true, slug: true, name: true, brand: true, category: true, imageUrl: true },
      });
    }

    if (products.length === 0) {
      products = await db.product.findMany({
        where: { category: step.category },
        orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
        take: 6,
        select: { id: true, slug: true, name: true, brand: true, category: true, imageUrl: true },
      });
    }

    const unique = products.filter((product) => !used.has(product.id)).slice(0, 3);
    unique.forEach((product) => used.add(product.id));
    out.push({ step, products: unique });
  }

  return out;
}

export default async function RoutineGuideDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const guide = findGuide(slug);

  const [t, tCategories, tIng] = await Promise.all([
    getTranslations("routineGuides"),
    getTranslations("categories"),
    getTranslations("ingredients"),
  ]);

  if (!guide) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <p className="text-white/64">{t("notFound")}</p>
        <Button asChild variant="link">
          <Link href="/app/routines">{t("backTo")}</Link>
        </Button>
      </div>
    );
  }

  const renderStep = (step: GuideStep, i: number) => (
    <li key={`${step.category}-${step.activeId ?? ""}-${i}`} className="flex items-start gap-3">
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-white/25 bg-transparent text-xs font-medium text-white">
        {i + 1}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium">{tCategories(step.category)}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {step.activeId && findIngredient(step.activeId) && (
            <Link href={`/app/ingredient/${step.activeId}`}>
              <Badge className="cursor-pointer transition-opacity hover:opacity-80">
                {tIng(`${step.activeId}.name`)}
              </Badge>
            </Link>
          )}
          <span className="text-xs text-white/58">{t(`freq.${step.freq}`)}</span>
        </div>
      </div>
    </li>
  );

  const am = stepsForSlot(guide, "am");
  const pm = stepsForSlot(guide, "pm");
  const productRoutine = await productsForGuide([...am, ...pm]);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 text-white">
      <Button asChild variant="ghost" size="sm" className="w-fit -ml-2">
        <Link href="/app/routines">
          <ArrowLeft className="size-4" />
          {t("backTo")}
        </Link>
      </Button>

      <div>
        <h1 className="text-balance font-serif text-3xl">{t(`guides.${slug}.title`)}</h1>
        <p className="mt-1 text-white/70">
          <span className="font-medium text-white">{t("goalLabel")}:</span>{" "}
          {t(`guides.${slug}.goal`)}
        </p>
      </div>

      <Card className="gap-2 border-white/35 bg-white/[0.025] text-white backdrop-blur-xl">
        <h2 className="flex items-center gap-2 font-serif text-lg">
          <Sparkles className="size-4 text-white" />
          {t("introLabel")}
        </h2>
        <p className="leading-relaxed text-white/68">{t(`guides.${slug}.intro`)}</p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="gap-3 border-white/35 bg-white/[0.025] text-white backdrop-blur-xl">
          <h2 className="flex items-center gap-2 font-serif text-lg">
            <Sun className="size-4 text-white" />
            {t("slotAm")}
          </h2>
          <ol className="flex flex-col gap-3">{am.map(renderStep)}</ol>
        </Card>
        <Card className="gap-3 border-white/35 bg-white/[0.025] text-white backdrop-blur-xl">
          <h2 className="flex items-center gap-2 font-serif text-lg">
            <Moon className="size-4 text-white" />
            {t("slotPm")}
          </h2>
          <ol className="flex flex-col gap-3">{pm.map(renderStep)}</ol>
        </Card>
      </div>

      <Card className="gap-2 border-white/35 bg-white/[0.025] text-white backdrop-blur-xl">
        <h2 className="font-serif text-lg">{t("keepInMind")}</h2>
        <p className="leading-relaxed text-white/68">{t(`guides.${slug}.keepInMind`)}</p>
      </Card>

      <section className="grid gap-4">
        <div>
          <h2 className="font-serif text-2xl">{t("productRoutineTitle")}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-white/68">{t("productRoutineText")}</p>
        </div>
        <div className="grid gap-3">
          {productRoutine.map(({ step, products }, index) => (
            <Card key={`${step.slot}-${step.category}-${step.activeId ?? "base"}-${index}`} className="gap-3 border-white/35 bg-white/[0.025] text-white backdrop-blur-xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-white/35 text-white">
                  {step.slot === "am" ? t("slotAm") : step.slot === "pm" ? t("slotPm") : `${t("slotAm")} / ${t("slotPm")}`}
                </Badge>
                <p className="font-medium">{tCategories(step.category)}</p>
                {step.activeId && findIngredient(step.activeId) && (
                  <Badge className="bg-white/10 text-white">{tIng(`${step.activeId}.name`)}</Badge>
                )}
                <span className="text-xs text-white/58">{t(`freq.${step.freq}`)}</span>
              </div>
              {products.length === 0 ? (
                <p className="text-sm text-white/62">{t("noProductSuggestion")}</p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-3">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/app/product/${product.slug}`}
                      className="group flex min-w-0 gap-3 rounded-2xl border border-white/24 bg-white/[0.035] p-3 transition hover:border-white/50 hover:bg-white/[0.06]"
                    >
                      <ProductImage imageUrl={product.imageUrl} category={product.category} name={product.name} size="sm" />
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-medium text-white">{product.name}</p>
                        <p className="truncate text-xs text-white/62">{product.brand}</p>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/48">{t("openProduct")}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      <Card className="flex-row items-center justify-between gap-3 border-white/35 bg-white/[0.025] text-white backdrop-blur-xl">
        <div className="min-w-0">
          <p className="font-medium">{t("buildCta")}</p>
          <p className="text-sm text-white/64">{t("buildCtaSub")}</p>
        </div>
        <Button asChild size="icon" className="shrink-0" aria-label={t("buildCta")}>
          <Link href="/app/routine">
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Card>

      <p className="text-xs leading-relaxed text-white/58">{t("disclaimer")}</p>
    </div>
  );
}
