"use client";

import Image from "next/image";
import { ArrowDown, ScanFace, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("hero");
  const ux = useTranslations("homeUx");
  const scan = useTranslations("faceScanPage");

  return (
    <section className="haru-hero relative isolate overflow-hidden">
      <div className="relative min-h-[min(760px,100svh)] overflow-hidden">
        <Image src="/brand/hero-glass-skin.png" alt="" fill priority className="hero-editorial-bg object-cover object-[68%_center]" />
        <div className="hero-editorial-shade" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[min(760px,100svh)] max-w-7xl items-center px-5 py-20 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:py-16">
          <div className="relative z-10 max-w-[31rem]">
            <p className="hero-kicker"><Sparkles className="size-3" aria-hidden="true" /> {t("kicker")}</p>
            <h1 className="hero-editorial-title mt-5 text-balance">{t("titleLine1")}<br />{t("titleLine2")}</h1>
            <p className="mt-5 max-w-md text-[.91rem] leading-6 text-[#e9e1dc]/78">{t("subtitle")}</p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Link href="/app/face-scan" className="haru-cta haru-cta-compact"><ScanFace className="size-4" aria-hidden="true" />{scan("title")}</Link>
              <Link href="/app/routines" className="haru-cta haru-cta-secondary haru-cta-compact">{ux("explore")}<ArrowDown className="size-3.5" aria-hidden="true" /></Link>
            </div>
            <p className="mt-4 text-[11px] leading-5 text-[#e9e1dc]/52">{t("disclaimer")}</p>
          </div>
          <div className="pointer-events-none relative hidden min-h-[37rem] lg:block" aria-hidden="true">
            <div className="hero-reference-scan">
              <p>SKIN SCAN</p>
              <div className="mt-5 space-y-3 text-[11px] text-[#f9eee7]/88">
                <p><span>Hydratation</span><b>87%</b></p><i /><p><span>Texture</span><b>76%</b></p><i /><p><span>Pores</span><b>62%</b></p><i /><p><span>Éclat</span><b>81%</b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-benefits relative z-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-6 sm:px-8 lg:grid-cols-4 lg:py-7">
          {(t.raw("benefits") as Array<{ title: string; text: string }>).map(({ title, text }, index) => <div key={title} className="hero-benefit px-4 py-2 first:pl-0 lg:px-7"><span>0{index + 1}</span><h2>{title}</h2><p>{text}</p></div>)}
        </div>
      </div>
    </section>
  );
}
