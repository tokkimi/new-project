import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getSeoMetadata } from "@/lib/seo";
import { ProductsBrowser } from "@/components/products-browser";
import { listProducts } from "@/lib/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "productsPage" });
  return getSeoMetadata("/app/products", locale, { title: t("title"), description: t("subtitle") });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, products] = await Promise.all([
    getTranslations("productsPage"),
    listProducts(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl">{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
      </div>
      <ProductsBrowser products={products} />
    </div>
  );
}
