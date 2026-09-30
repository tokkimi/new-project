"use client";

import { type FormEvent, useState } from "react";
import { ArrowUpRight, ExternalLink, Search, ScanLine, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductImage } from "@/components/product-image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { Product } from "@/generated/prisma/client";

export function ProductDecoder() {
  const t = useTranslations("homeUx");
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function search(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    setLoading(true);
    setSearched(true);
    try {
      const response = await fetch(`/api/products?q=${encodeURIComponent(value)}`);
      const data = await response.json() as { products?: Product[] };
      setProducts(data.products ?? []);
    } finally { setLoading(false); }
  }

  const webSearch = `https://www.google.com/search?q=${encodeURIComponent(`${query || "skincare product"} official ingredients`)}`;

  return (
    <section className="mx-auto max-w-6xl px-6 py-14 sm:py-18">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary"><Sparkles className="size-4" /> Haru</div>
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">{t("decoderTitle")}</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">{t("decoderText")}</p>
            <Button asChild variant="outline" className="mt-6 rounded-full"><Link href="/app/scan"><ScanLine className="size-4" /> {t("decoderScan")}</Link></Button>
          </div>

          <div className="grid gap-4">
            <form onSubmit={search} className="relative"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("decoderPlaceholder")} className="h-11 rounded-full bg-white/[0.06] pl-11 pr-28" /><Button type="submit" disabled={loading} className="absolute right-1 top-1 h-9 rounded-full px-4">{loading ? "…" : t("decoderAction")}</Button></form>
            {!searched && <p className="text-sm leading-6 text-muted-foreground">{t("decoderHint")}</p>}
            {searched && products.length === 0 && <div className="text-sm leading-6 text-muted-foreground">{t("decoderMissing")}<a className="mt-3 flex w-fit items-center gap-1 font-medium text-primary hover:underline" href={webSearch} target="_blank" rel="noreferrer">{t("decoderSearchOfficial")} <ExternalLink className="size-3.5" /></a></div>}
            {products.slice(0, 3).map((product) => <ProductResult key={product.id} product={product} />)}
          </div>
        </div>
    </section>
  );
}

function ProductResult({ product }: { product: Product }) {
  const t = useTranslations("homeUx");
  return <Dialog><DialogTrigger asChild><button className="flex w-full items-center gap-3 py-3 text-left transition"><ProductImage imageUrl={product.imageUrl} category={product.category} name={product.name} size="sm" /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{product.name}</span><span className="block truncate text-xs text-muted-foreground">{product.brand} · {product.origin}</span></span><ArrowUpRight className="size-4 text-muted-foreground" /></button></DialogTrigger><DialogContent className="max-h-[85vh] overflow-y-auto"><DialogHeader><DialogTitle>{product.name}</DialogTitle><DialogDescription>{product.brand} · {product.origin}</DialogDescription></DialogHeader><p className="text-sm leading-6 text-muted-foreground">{product.description}</p><div><p className="text-sm font-semibold">{t("decoderHowTo")}</p><ol className="mt-2 grid gap-2 text-sm text-muted-foreground">{product.usageSteps.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}</ol></div><div className="flex flex-wrap gap-2"><Button asChild><Link href={`/app/product/${product.slug}`}>{t("decoderFull")}</Link></Button><Button asChild variant="outline"><Link href="/app/routine">{t("decoderCompare")}</Link></Button>{product.officialUrl && <Button asChild variant="ghost"><a href={product.officialUrl} target="_blank" rel="noreferrer">{t("decoderBuy")} <ExternalLink className="size-4" /></a></Button>}</div></DialogContent></Dialog>;
}
