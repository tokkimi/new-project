import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getSeoMetadata } from "@/lib/seo";
import { ProductsBrowser } from "@/components/products-browser";
import { searchProducts, listBrandNames, PRODUCTS_BATCH_SIZE } from "@/lib/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "productsPage" });
  return getSeoMetadata("/app/products", locale, { title: t("title"), description: t("subtitle") });
}

type ProductsSearchParams = {
  q?: string;
  category?: string;
  skinType?: string;
  concern?: string;
  brand?: string;
  limit?: string;
};

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<ProductsSearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const limit = Math.max(PRODUCTS_BATCH_SIZE, Number(sp.limit) || PRODUCTS_BATCH_SIZE);
  const filters = { q: sp.q, category: sp.category, skinType: sp.skinType, concern: sp.concern, brand: sp.brand };

  const [t, { products, total }, brands] = await Promise.all([
    getTranslations("productsPage"),
    searchProducts(filters, limit),
    listBrandNames(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl">{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
      </div>
      <ProductsBrowser
        products={products}
        total={total}
        limit={limit}
        batchSize={PRODUCTS_BATCH_SIZE}
        brands={brands}
        filters={filters}
      />
    </div>
  );
}
