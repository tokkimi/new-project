"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/product-visual";
import type { Product } from "@/generated/prisma/client";

function ProductStrip({ products }: { products: Product[] }) {
  const tCategories = useTranslations("categories");

  return (
    <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
      {products.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, delay: (i % 8) * 0.04 }}
          className="w-40 shrink-0 sm:w-44"
        >
          <Link href={`/app/product/${p.slug}`}>
            <Card className="h-full gap-0 overflow-hidden p-0 transition-transform hover:-translate-y-0.5">
              <ProductVisual category={p.category} size="lg" className="rounded-none" />
              <div className="flex flex-col gap-0.5 p-3">
                <p className="truncate text-sm font-medium leading-snug">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {p.brand} · {tCategories(p.category)}
                </p>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export function ProductShowcase({
  latest,
  madeInKorea,
}: {
  latest: Product[];
  madeInKorea: Product[];
}) {
  const t = useTranslations("productShowcase");

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto mb-10 max-w-xl text-center">
        <p className="text-sm font-medium text-primary">{t("eyebrow")}</p>
        <h2 className="mt-2 text-balance font-serif text-3xl md:text-4xl">{t("title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-serif text-xl">{t("latestTitle")}</h3>
            <Link
              href="/app/products"
              className="shrink-0 text-sm font-medium text-primary hover:underline"
            >
              {t("seeAll")}
            </Link>
          </div>
          <ProductStrip products={latest} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl">{t("koreaTitle")}</h3>
              <p className="text-sm text-muted-foreground">{t("koreaSubtitle")}</p>
            </div>
            <Link
              href="/app/products"
              className="shrink-0 text-sm font-medium text-primary hover:underline"
            >
              {t("seeAll")}
            </Link>
          </div>
          <ProductStrip products={madeInKorea} />
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg" variant="outline">
          <Link href="/app/products">{t("browseAllCta")}</Link>
        </Button>
      </div>
    </section>
  );
}
