"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Check, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/components/product-image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/generated/prisma/client";

const routines = [
  { key: "sensitive", title: "Barrière apaisée", skin: "Peau sensible ou déshydratée", note: "Quatre gestes doux pour hydrater sans multiplier les actifs.", slugs: ["round-lab-birch-juice-moisturizing-cleanser", "cosrx-advanced-snail-96-mucin-power-essence", "skin1004-madagascar-centella-ampoule", "beauty-of-joseon-relief-sun"] },
  { key: "oily", title: "Pores & brillance", skin: "Peau grasse ou mixte", note: "Une base courte, avec l&apos;exfoliation réservée à quelques soirs par semaine.", slugs: ["cosrx-low-ph-good-morning-gel-cleanser", "round-lab-1025-dokdo-toner", "cosrx-bha-blackhead-power-liquid", "round-lab-birch-juice-moisturizing-sun-cream-spf50"] },
  { key: "glow", title: "Éclat & taches", skin: "Peau terne ou marques visibles", note: "Des actifs éclat, puis une protection solaire indispensable le matin.", slugs: ["beauty-of-joseon-green-plum-refreshing-toner", "round-lab-vita-niacinamide-dark-spot-serum", "beauty-of-joseon-glow-serum-propolis-niacinamide", "beauty-of-joseon-relief-sun"] },
];

export function KBeautyRoutineBuilder({ products }: { products: Product[] }) {
  const [active, setActive] = useState("sensitive");
  const routine = routines.find((item) => item.key === active) ?? routines[0];
  const selected = useMemo(() => routine.slugs.map((slug) => products.find((product) => product.slug === slug)).filter((product): product is Product => Boolean(product)), [products, routine]);
  return <section className="bg-[#f6f5f1] py-20 sm:py-28"><div className="mx-auto max-w-6xl px-6"><div className="max-w-2xl"><p className="text-sm font-medium text-primary">Routines K-beauty</p><h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">Compose une routine complète, sans te perdre.</h2><p className="mt-4 leading-7 text-muted-foreground">Des sélections simples à adapter à ton passeport de peau. Clique sur un produit pour l&apos;usage, l&apos;origine et les liens officiels.</p></div><div className="mt-8 flex gap-2 overflow-x-auto pb-2">{routines.map((item) => <button key={item.key} onClick={() => setActive(item.key)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${active === item.key ? "bg-primary text-primary-foreground" : "bg-white text-foreground hover:bg-secondary"}`}>{item.skin}</button>)}</div><Card className="mt-6 grid gap-7 rounded-[2rem] border-border bg-white p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-sm text-muted-foreground">Routine sélectionnée</p><h3 className="mt-2 text-3xl font-semibold">{routine.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{routine.note.replace("&apos;", "'")}</p><div className="mt-6 flex items-start gap-2 text-sm leading-6 text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-primary" />Ne démarre pas tous les actifs d&apos;un coup : introduis-les progressivement.</div><Button asChild className="mt-6 rounded-full"><Link href="/app/routine">Adapter à ma routine <ArrowUpRight className="size-4" /></Link></Button></div><div className="grid gap-3 sm:grid-cols-2">{selected.map((product, index) => <RoutineProduct key={product.id} product={product} step={index + 1} />)}</div></Card></div></section>;
}

function RoutineProduct({ product, step }: { product: Product; step: number }) {
  return <Dialog><DialogTrigger asChild><button className="flex items-center gap-3 rounded-2xl border border-border p-3 text-left transition hover:bg-secondary/50"><ProductImage imageUrl={product.imageUrl} category={product.category} name={product.name} size="sm" /><span className="min-w-0"><span className="text-xs font-medium text-primary">Étape {step}</span><span className="mt-0.5 block truncate text-sm font-semibold">{product.name}</span><span className="block truncate text-xs text-muted-foreground">{product.brand}</span></span></button></DialogTrigger><DialogContent className="max-h-[85vh] overflow-y-auto"><DialogHeader><DialogTitle>{product.name}</DialogTitle><DialogDescription>{product.brand} · Fabriqué en {product.origin}</DialogDescription></DialogHeader><p className="text-sm leading-6 text-muted-foreground">{product.description}</p><div><p className="text-sm font-semibold">Conseils d&apos;utilisation</p><ul className="mt-2 grid gap-2 text-sm text-muted-foreground">{product.usageSteps.map((step) => <li key={step}>• {step}</li>)}</ul></div><div className="flex flex-wrap gap-2"><Button asChild><Link href={`/app/product/${product.slug}`}>Fiche & ingrédients</Link></Button><Button asChild variant="outline"><Link href="/app/routine">Ajouter à ma routine</Link></Button>{product.officialUrl && <Button asChild variant="ghost"><a href={product.officialUrl} target="_blank" rel="noreferrer"><ShoppingBag className="size-4" /> Avis & achat</a></Button>}</div></DialogContent></Dialog>;
}
