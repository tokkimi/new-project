"use client";

import { type FormEvent, useState } from "react";
import { ArrowUpRight, Camera, ExternalLink, Search } from "lucide-react";
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
        <div className="haru-decoder-square mx-auto">
          <div className="haru-decoder-label"><h2>{t("decoderTitle")}</h2></div>
          <Link href="/app/scan" aria-label={t("decoderScan")} className="haru-decoder-camera"><Camera className="size-7" aria-hidden="true" /></Link>
          <form onSubmit={search} className="haru-decoder-search relative">
            <Search className="absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("decoderPlaceholder")} className="h-9 rounded-full bg-black/15 pl-9 pr-10 text-xs" />
            <Button type="submit" size="icon" disabled={loading} aria-label={t("decoderAction")} className="absolute right-1 top-1 size-7 rounded-full">{loading ? "…" : <ArrowUpRight className="size-3.5" />}</Button>
          </form>
        </div>
        <div className="mx-auto mt-4 grid max-w-md gap-3">
          {!searched && <p className="text-center text-xs leading-5 text-muted-foreground">{t("decoderHint")}</p>}
          {searched && products.length === 0 && <div className="text-center text-xs leading-5 text-muted-foreground">{t("decoderMissing")}<a className="mx-auto mt-2 flex w-fit items-center gap-1 font-medium text-primary hover:underline" href={webSearch} target="_blank" rel="noreferrer">{t("decoderSearchOfficial")} <ExternalLink className="size-3.5" /></a></div>}
          {products.slice(0, 3).map((product) => <ProductResult key={product.id} product={product} />)}
        </div>
    </section>
  );
}

function ProductResult({ product }: { product: Product }) {
  const t = useTranslations("homeUx");
  return <Dialog><DialogTrigger asChild><button className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-left transition hover:bg-white/[0.07]"><ProductImage imageUrl={product.imageUrl} category={product.category} name={product.name} size="sm" /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{product.name}</span><span className="block truncate text-xs text-muted-foreground">{product.brand} · {product.origin}</span></span><ArrowUpRight className="size-4 text-primary" /></button></DialogTrigger><DialogContent className="haru-product-result-dialog max-h-[85vh] overflow-y-auto border-white/15 bg-[#151111]/95 p-0 text-foreground backdrop-blur-2xl"><div className="grid gap-5 p-5 sm:grid-cols-[9rem_1fr] sm:p-6"><div className="overflow-hidden rounded-2xl bg-[#f6f1ed]"><ProductImage imageUrl={product.imageUrl} category={product.category} name={product.name} size="lg" /></div><div className="min-w-0"><DialogHeader><p className="text-[10px] font-medium uppercase tracking-[.18em] text-primary">{product.brand}</p><DialogTitle className="mt-2 font-serif text-2xl leading-tight">{product.name}</DialogTitle><DialogDescription className="mt-2 text-xs">{product.origin}</DialogDescription></DialogHeader><p className="mt-4 text-sm leading-6 text-muted-foreground">{product.description}</p></div></div><div className="border-y border-white/10 bg-white/[0.025] px-5 py-4 sm:px-6"><p className="text-xs font-medium text-foreground">{t("decoderHowTo")}</p><ol className="mt-2 grid gap-1.5 text-xs leading-5 text-muted-foreground">{product.usageSteps.slice(0, 3).map((step, index) => <li key={step}>{index + 1}. {step}</li>)}</ol></div><div className="flex flex-wrap gap-2 p-5 sm:p-6"><Button asChild className="rounded-full"><Link href={`/app/product/${product.slug}`}>{t("decoderFull")} <ArrowUpRight className="size-3.5" /></Link></Button><Button asChild variant="outline" className="rounded-full"><Link href="/app/routine">{t("decoderCompare")}</Link></Button>{product.officialUrl && <Button asChild variant="ghost" className="rounded-full"><a href={product.officialUrl} target="_blank" rel="noreferrer">{t("decoderBuy")} <ExternalLink className="size-3.5" /></a></Button>}</div></DialogContent></Dialog>;
}
