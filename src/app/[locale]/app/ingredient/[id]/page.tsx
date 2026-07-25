import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Sparkles, Clock, FlaskConical, Sun, Baby, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { findIngredient, CONFLICT_RULES } from "@/data/ingredients";
import { listProductsByIngredient } from "@/lib/products";

export default async function IngredientDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const ingredient = findIngredient(id);

  const [t, tIng, tCategories, tConflicts] = await Promise.all([
    getTranslations("ingredientDetail"),
    getTranslations("ingredients"),
    getTranslations("categories"),
    getTranslations("conflictRules"),
  ]);

  if (!ingredient) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <p className="text-muted-foreground">{t("notFound")}</p>
        <Button asChild variant="link">
          <Link href="/app/products">{t("backTo")}</Link>
        </Button>
      </div>
    );
  }

  const benefits = tIng.raw(`${id}.benefits`) as string[] | undefined;
  const timeKey =
    ingredient.timePref === "am" ? "timeAm" : ingredient.timePref === "pm" ? "timePm" : "timeBoth";
  const productsRaw = await listProductsByIngredient(id, 16);
  // The catalog has some duplicate-named entries — show each name once.
  const seenNames = new Set<string>();
  const products = productsRaw
    .filter((p) => {
      const key = p.name.toLowerCase().trim();
      if (seenNames.has(key)) return false;
      seenNames.add(key);
      return true;
    })
    .slice(0, 8);

  // Several rules can share one headline (e.g. retinoid + AHA and + BHA) — dedupe.
  const seenHeadlines = new Set<string>();
  const pairingRules = CONFLICT_RULES.filter((r) => r.a === id || r.b === id).filter((r) => {
    const headline = tConflicts(`${r.id}.headline`);
    if (seenHeadlines.has(headline)) return false;
    seenHeadlines.add(headline);
    return true;
  });

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Button asChild variant="ghost" size="sm" className="w-fit -ml-2">
        <Link href="/app/products">
          <ArrowLeft className="size-4" />
          {t("backTo")}
        </Link>
      </Button>

      <div>
        <h1 className="text-balance font-serif text-3xl">{tIng(`${id}.name`)}</h1>
        <p className="mt-2 leading-relaxed text-muted-foreground">{tIng(`${id}.summary`)}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
            <Clock className="size-3.5" /> {t(timeKey)}
          </span>
          {ingredient.typicalConcentration && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
              <FlaskConical className="size-3.5" /> {t("typicalStrength")}: {ingredient.typicalConcentration}
            </span>
          )}
        </div>
      </div>

      {Array.isArray(benefits) && benefits.length > 0 && (
        <Card className="gap-3">
          <h2 className="flex items-center gap-2 font-serif text-lg">
            <Sparkles className="size-4 text-primary" />
            {t("benefits")}
          </h2>
          <ul className="grid gap-2">
            {benefits.map((b, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" />
                {b}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="gap-3">
        <h2 className="font-serif text-lg">{t("howToUse")}</h2>
        <p className="leading-relaxed text-muted-foreground">{tIng(`${id}.howToUse`)}</p>
      </Card>

      <Card className="gap-3 border-am/30 bg-am/10">
        <h2 className="font-serif text-lg">{t("goodToKnow")}</h2>
        <p className="leading-relaxed text-muted-foreground">{tIng(`${id}.caution`)}</p>
        {(ingredient.photosensitizing || ingredient.pregnancyCaution) && (
          <ul className="grid gap-2.5 border-t border-am/20 pt-3">
            {ingredient.photosensitizing && (
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Sun className="mt-0.5 size-4 shrink-0 text-am-foreground" />
                {t("photosensitizing")}
              </li>
            )}
            {ingredient.pregnancyCaution && (
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Baby className="mt-0.5 size-4 shrink-0 text-am-foreground" />
                {t("pregnancyCaution")}
              </li>
            )}
          </ul>
        )}
      </Card>

      {pairingRules.length > 0 && (
        <Card className="gap-3">
          <h2 className="font-serif text-lg">{t("pairingNotes")}</h2>
          <div className="flex flex-col gap-2">
            {pairingRules.map((rule) => (
              <Link
                key={rule.id}
                href={`/app/conflict/${rule.id}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 px-3 py-2 text-sm transition-colors hover:bg-muted/60"
              >
                <span>{tConflicts(`${rule.id}.headline`)}</span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </Card>
      )}

      <Card className="gap-3">
        <h2 className="font-serif text-lg">{t("foundIn")}</h2>
        {products.length > 0 ? (
          <div className="flex flex-col gap-2">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/app/product/${p.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 px-3 py-2 transition-colors hover:bg-muted/60"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{p.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {p.brand} · {tCategories(p.category)}
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t("noProducts")}</p>
        )}
      </Card>

      <p className="text-xs leading-relaxed text-muted-foreground">{t("disclaimer")}</p>
    </div>
  );
}
