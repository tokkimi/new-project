import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ExternalLink, MapPin, Tag } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductActions } from "@/components/product-actions";
import { ProductImage } from "@/components/product-image";
import { findProductBySlug } from "@/lib/products";
import { findMarketFormulas } from "@/lib/product-formulas";
import { findIngredient } from "@/data/ingredients";
import {
  localizedFullIngredients,
  localizedProductDescription,
  localizedUsageSteps,
} from "@/lib/product-localization";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await findProductBySlug(slug);
  if (!product) notFound();

  const [t, tCategories, tIngredients, tSkinTypes, tConcerns] = await Promise.all([
    getTranslations("productDetail"),
    getTranslations("categories"),
    getTranslations("ingredients"),
    getTranslations("skinTypes"),
    getTranslations("concerns"),
  ]);

  const trackedActives = product.ingredientIds.filter((id) => findIngredient(id));
  const description = localizedProductDescription(product, locale);
  const usageSteps = localizedUsageSteps(product, locale);
  const fullIngredients = localizedFullIngredients(product, locale);
  const marketFormulas = await findMarketFormulas(product.id);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Button asChild variant="ghost" size="sm" className="w-fit -ml-2">
        <Link href="/app/shelf">
          <ArrowLeft className="size-4" />
          {t("back")}
        </Link>
      </Button>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge variant="secondary" className="mb-2">
            {tCategories(product.category)}
          </Badge>
          <h1 className="text-balance font-serif text-3xl">{product.name}</h1>
          <p className="mt-1 text-muted-foreground">{product.brand}</p>
        </div>
        <ProductImage
          imageUrl={product.imageUrl}
          category={product.category}
          name={product.name}
          size="md"
        />
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        {product.origin && (
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4" />
            {t("origin")}: {product.origin}
          </span>
        )}
        {product.price != null && (
          <span className="flex items-center gap-1.5">
            <Tag className="size-4" />
            {t("price")}: {product.price} {product.currency}
          </span>
        )}
        {product.officialUrl && (
          <a
            href={product.officialUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex items-center gap-1.5 text-primary hover:underline"
          >
            <ExternalLink className="size-4" />
            {t("officialSite")}
          </a>
        )}
      </div>

      {description && (
        <p className="leading-relaxed text-muted-foreground">{description}</p>
      )}

      <ProductActions product={product} />

      {trackedActives.length > 0 && (
        <Card className="gap-3">
          <h2 className="font-serif text-lg">{t("trackedActives")}</h2>
          <div className="flex flex-wrap gap-1.5">
            {trackedActives.map((id) => (
              <Badge key={id}>{tIngredients(`${id}.name`)}</Badge>
            ))}
          </div>
        </Card>
      )}

      {usageSteps.length > 0 && (
        <Card className="gap-3">
          <h2 className="font-serif text-lg">{t("howToUse")}</h2>
          <ol className="flex flex-col gap-2">
            {usageSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Card>
      )}

      {(product.skinTypes.length > 0 || product.concerns.length > 0) && (
        <Card className="gap-4">
          {product.skinTypes.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">{t("suitedFor")}</h3>
              <div className="flex flex-wrap gap-1.5">
                {product.skinTypes.map((st) => (
                  <Badge key={st} variant="secondary">
                    {tSkinTypes(st)}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {product.concerns.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">{t("targets")}</h3>
              <div className="flex flex-wrap gap-1.5">
                {product.concerns.map((c) => (
                  <Badge key={c} variant="outline">
                    {tConcerns(c)}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {fullIngredients && (
        <Card className="gap-3">
          <h2 className="font-serif text-lg">{t("fullIngredients")}</h2>
          {marketFormulas.length > 0 ? (
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">{t("generalFormula")}</span>{" "}
              — {fullIngredients}
            </p>
          ) : (
            <p className="text-xs leading-relaxed text-muted-foreground">{fullIngredients}</p>
          )}

          {marketFormulas.map((f) => (
            <div key={f.market} className="rounded-xl bg-muted/40 p-3">
              <p className="mb-1 text-xs font-medium text-foreground">
                {t(`markets.${f.market}`)}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">{f.inciText}</p>
              {f.sourceName && (
                <p className="mt-1 text-[11px] text-muted-foreground/70">
                  {t("formulaSource")}:{" "}
                  {f.sourceUrl ? (
                    <a
                      href={f.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary hover:underline"
                    >
                      {f.sourceName}
                    </a>
                  ) : (
                    f.sourceName
                  )}
                </p>
              )}
            </div>
          ))}

          <p className="text-[11px] leading-relaxed text-muted-foreground/70">
            {t("formulaCountryNote")}
          </p>
        </Card>
      )}
    </div>
  );
}
