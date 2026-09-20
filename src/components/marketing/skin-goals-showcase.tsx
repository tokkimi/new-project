import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HorizontalRail } from "@/components/horizontal-rail";
import { guideVisual } from "@/lib/guide-visuals";

const FEATURED = ["glass-skin", "sensitive-barrier", "brightening", "minimalist"] as const;
export function SkinGoalsShowcase() {
  const t = useTranslations("homeUx");
  const guides = useTranslations("routineGuides");
  return <section id="routines" className="haru-routines scroll-mt-28 py-14 sm:py-20" aria-labelledby="routines-title">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-2xl">
          <h2 id="routines-title" className="mt-3 text-balance text-3xl leading-tight sm:text-4xl">{t("routinesTitle")}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{t("routinesSubtitle")}</p></div>
        <Link href="/guides" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">{t("allGuides")}<ArrowUpRight className="size-4" aria-hidden="true" /></Link>
      </div>
      <HorizontalRail label={t("routinesTitle")}>
        {FEATURED.map((slug, index) => <Link key={slug} href={`/guides/${slug}`} prefetch={false} className="haru-routine-card group relative w-[80%] max-w-[330px] shrink-0 snap-start overflow-hidden rounded-[28px] sm:w-[310px]">
          <div className="relative aspect-[4/4.7] overflow-hidden"><Image src={guideVisual(slug)} alt="" fill sizes="(max-width: 640px) 80vw, 330px" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
            <span className="haru-glass absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-medium">0{index + 1}</span></div>
          <div className="haru-glass relative mx-3 -mt-12 mb-3 min-h-40 rounded-[22px] p-5">
            <div className="flex items-start justify-between gap-3"><h3 className="text-xl leading-tight">{guides(`guides.${slug}.title`)}</h3><ArrowUpRight className="mt-1 size-5 shrink-0" aria-hidden="true" /></div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{guides(`guides.${slug}.goal`)}</p></div>
        </Link>)}
      </HorizontalRail>
    </div>
  </section>;
}
