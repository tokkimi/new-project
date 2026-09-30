"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WheelCarousel } from "@/components/ui/wheel-carousel";
import { guideVisual } from "@/lib/guide-visuals";

const FEATURED = ["glass-skin", "sensitive-barrier", "brightening", "minimalist"] as const;
export function SkinGoalsShowcase() {
  const t = useTranslations("homeUx");
  const guides = useTranslations("routineGuides");
  const [active, setActive] = useState(0);
  const items = FEATURED.map((slug) => ({ label: guides(`guides.${slug}.title`), image: guideVisual(slug), imageAlt: guides(`guides.${slug}.title`) }));
  const slug = FEATURED[active] ?? FEATURED[0];
  return <section id="routines" className="haru-routines scroll-mt-28 py-14 sm:py-20" aria-labelledby="routines-title">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-2xl">
          <h2 id="routines-title" className="mt-3 text-balance text-3xl leading-tight sm:text-4xl">{t("routinesTitle")}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{t("routinesSubtitle")}</p></div>
        <Link href="/guides" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">{t("allGuides")}<ArrowUpRight className="size-4" aria-hidden="true" /></Link>
      </div>
      <div className="haru-goals-wheel-panel">
        <WheelCarousel items={items} activeIndex={active} onActiveChange={(_, index) => setActive(index)} />
        <div className="haru-goals-wheel-copy"><p className="text-xs font-medium tracking-[.16em] text-primary">0{active + 1} / 0{FEATURED.length}</p><h3>{guides(`guides.${slug}.title`)}</h3><p>{guides(`guides.${slug}.goal`)}</p><Link href={`/guides/${slug}`} prefetch={false} className="haru-cta">Découvrir cette routine <ArrowUpRight className="size-4" aria-hidden="true" /></Link></div>
      </div>
    </div>
  </section>;
}
