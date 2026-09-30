"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WheelCarousel } from "@/components/ui/wheel-carousel";

const FEATURED = ["sensitive-barrier", "brightening", "minimalist", "acne-prone"] as const;
export function SkinGoalsShowcase() {
  const t = useTranslations("homeUx");
  const guides = useTranslations("routineGuides");
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const items = FEATURED.map((slug) => ({ label: guides(`guides.${slug}.title`), image: "/brand/routine-glass-cards.png", imageAlt: guides(`guides.${slug}.title`) }));
  const slug = FEATURED[active] ?? FEATURED[0];
  useEffect(() => {
    let last = -1;
    const updateFromScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const travel = Math.max(1, track.offsetHeight - window.innerHeight);
      const progress = Math.min(0.9999, Math.max(0, -rect.top / travel));
      const next = Math.min(FEATURED.length - 1, Math.floor(progress * FEATURED.length));
      if (next !== last) { last = next; setActive(next); }
    };
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateFromScroll);
  }, []);
  return <section id="routines" className="haru-routines scroll-mt-28" aria-labelledby="routines-title">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div ref={trackRef} className="haru-goals-pin-track">
        <div className="haru-goals-pin-stage">
          <div className="haru-goals-heading flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-2xl">
              <h2 id="routines-title" className="text-balance text-2xl leading-tight sm:text-3xl">{t("routinesTitle")}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{t("routinesSubtitle")}</p></div>
            <Link href="/guides" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">{t("allGuides")}<ArrowUpRight className="size-4" aria-hidden="true" /></Link>
          </div>
          <div className="haru-goals-wheel-panel">
            <WheelCarousel items={items} activeIndex={active} onActiveChange={(_, index) => setActive(index)} photoHref={`/guides/${slug}`} />
            <div className="haru-goals-wheel-copy"><p className="text-[10px] font-medium tracking-[.16em] text-primary">0{active + 1} / 0{FEATURED.length}</p><h3><Link href={`/guides/${slug}`} prefetch={false}>{guides(`guides.${slug}.title`)} <ArrowUpRight className="inline size-4" aria-hidden="true" /></Link></h3><p>{guides(`guides.${slug}.goal`)}</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
