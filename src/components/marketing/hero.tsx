import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("hero");
  const ux = useTranslations("homeUx");
  return <section className="haru-hero relative isolate overflow-hidden">
    <div className="mx-auto grid max-w-7xl items-center gap-4 px-5 pb-10 pt-10 sm:px-8 lg:min-h-[620px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-0 lg:py-14">
      <div className="relative z-10 max-w-xl">
        <span className="haru-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"><Sparkles className="size-3.5" aria-hidden="true" />{t("badge")}</span>
        <h1 className="mt-7 text-balance text-[clamp(2.4rem,4.4vw,4.5rem)] leading-[1.08] tracking-tight">{t("titleLine1")}<br />{t("titleLine2")}</h1>
        <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3"><Link href="/app/quiz" className="haru-cta">{ux("findRoutine")}<ArrowUpRight className="size-4" aria-hidden="true" /></Link><a href="#routines" className="haru-cta haru-cta-secondary">{ux("explore")}<ArrowDown className="size-4" aria-hidden="true" /></a></div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">{t("disclaimer")}</p>
      </div>
      <div className="relative mx-auto w-full max-w-2xl lg:w-[110%] lg:max-w-none lg:-translate-x-2">
        <Image src="/hero-haru-editorial-cutout.png" alt={ux("heroAlt")} width={1672} height={941} sizes="(min-width: 1024px) 58vw, 100vw" preload className="h-auto w-full object-contain" />
        <div className="haru-glass relative mx-auto mt-2 flex w-fit max-w-[90%] items-center gap-3 rounded-2xl px-5 py-3 text-sm"><Sparkles className="size-4 shrink-0" aria-hidden="true" />{ux("heroNote")}</div>
      </div>
    </div>
  </section>;
}
