"use client";

import { type FormEvent, useState } from "react";
import { ArrowUpRight, ExternalLink, Search, ScanLine, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductImage } from "@/components/product-image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/generated/prisma/client";

export function ProductDecoder() {
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
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_24px_80px_-56px_rgba(17,35,29,0.8)]">
        <div className="grid gap-7 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <div>
            <div className="mb-5 flex items-center gap-2 text-sm font-medium text-primary"><Sparkles className="size-4" /> Le réflexe Haru</div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">Décoder un produit, avant de l&apos;ajouter.</h2>
            <p className="mt-5 max-w-md leading-7 text-muted-foreground">Cherche un produit pour voir sa composition, son origine et son mode d&apos;emploi. Connecte-toi ensuite pour vérifier s&apos;il a une place dans ta routine.</p>
            <div className="mt-7 grid gap-3 text-sm text-muted-foreground"><p><strong className="text-foreground">1.</strong> Trouve le produit ou scanne son emballage.</p><p><strong className="text-foreground">2.</strong> Lis les actifs et la façon de l&apos;utiliser.</p><p><strong className="text-foreground">3.</strong> Ajoute-le à ta routine : Haru le compare à tes produits.</p></div>
            <Button asChild variant="outline" className="mt-7 rounded-full"><Link href="/app/scan"><ScanLine className="size-4" /> Scanner un produit</Link></Button>
          </div>

          <Card className="gap-4 rounded-3xl border-border bg-[#fafaf8] p-5 sm:p-6">
            <form onSubmit={search} className="relative"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex. COSRX Snail 96 ou Beauty of Joseon" className="h-12 rounded-full bg-white pl-11 pr-28" /><Button type="submit" disabled={loading} className="absolute right-1.5 top-1.5 h-9 rounded-full px-4">{loading ? "…" : "Décoder"}</Button></form>
            {!searched && <div className="rounded-2xl border border-dashed border-border bg-white p-5 text-sm leading-6 text-muted-foreground">Un achat en vue ? Commence ici : Haru t&apos;explique le produit puis t&apos;invite à le comparer à ta routine personnelle.</div>}
            {searched && products.length === 0 && <div className="rounded-2xl bg-white p-5 text-sm leading-6 text-muted-foreground">Ce produit n&apos;est pas encore dans le catalogue. Lance une recherche en ligne pour retrouver sa fiche officielle et ses avis, puis scanne l&apos;étiquette pour l&apos;ajouter à Haru.<a className="mt-3 flex w-fit items-center gap-1 font-medium text-primary hover:underline" href={webSearch} target="_blank" rel="noreferrer">Rechercher la fiche officielle <ExternalLink className="size-3.5" /></a></div>}
            {products.slice(0, 3).map((product) => <ProductResult key={product.id} product={product} />)}
          </Card>
        </div>
      </div>
    </section>
  );
}

function ProductResult({ product }: { product: Product }) {
  return <Dialog><DialogTrigger asChild><button className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left transition hover:bg-secondary/60"><ProductImage imageUrl={product.imageUrl} category={product.category} name={product.name} size="sm" /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{product.name}</span><span className="block truncate text-xs text-muted-foreground">{product.brand} · {product.origin}</span></span><ArrowUpRight className="size-4 text-muted-foreground" /></button></DialogTrigger><DialogContent className="max-h-[85vh] overflow-y-auto"><DialogHeader><DialogTitle>{product.name}</DialogTitle><DialogDescription>{product.brand} · {product.origin}</DialogDescription></DialogHeader><p className="text-sm leading-6 text-muted-foreground">{product.description}</p><div><p className="text-sm font-semibold">Comment l&apos;utiliser</p><ol className="mt-2 grid gap-2 text-sm text-muted-foreground">{product.usageSteps.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}</ol></div><div className="flex flex-wrap gap-2"><Button asChild><Link href={`/app/product/${product.slug}`}>Voir la fiche complète</Link></Button><Button asChild variant="outline"><Link href="/app/routine">Comparer à ma routine</Link></Button>{product.officialUrl && <Button asChild variant="ghost"><a href={product.officialUrl} target="_blank" rel="noreferrer">Avis & achat <ExternalLink className="size-4" /></a></Button>}</div></DialogContent></Dialog>;
}
