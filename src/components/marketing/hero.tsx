"use client";

import Image from "next/image";
import { type RefObject, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { ArrowDown, ScanFace, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";

function SkinScoreGauge({ label, score }: { label: string; score: number }) {
  const radius = 43;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);
  return <div className="haru-score-gauge relative flex size-[116px] shrink-0 items-center justify-center rounded-full p-2" aria-label={`${label}: ${score}%`}>
    <svg className="score-spinner size-full -rotate-90" viewBox="0 0 104 104" aria-hidden="true"><circle cx="52" cy="52" r={radius} fill="none" stroke="rgba(38,31,29,.13)" strokeWidth="5" /><circle className="score-arc" cx="52" cy="52" r={radius} fill="none" stroke="url(#score-gradient)" strokeLinecap="round" strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={offset} /><defs><linearGradient id="score-gradient" x1="0" y1="0" x2="104" y2="104"><stop stopColor="#d1a995" /><stop offset="1" stopColor="#927c93" /></linearGradient></defs></svg>
    <div className="absolute text-center text-[#282321]"><strong className="block text-xl leading-none">{score}</strong><span className="text-[9px] uppercase tracking-[.16em] text-[#665a55]">{label}</span></div>
  </div>;
}

function ScannerPhone({ phoneRef, gaugeRef }: { phoneRef: RefObject<HTMLDivElement | null>; gaugeRef: RefObject<HTMLDivElement | null> }) {
  const t = useTranslations("hero");
  return <div className="relative mx-auto flex min-h-[620px] items-start justify-center sm:min-h-[710px]">
    <div ref={phoneRef} className="hero-phone relative z-10 w-[min(74vw,390px)]"><Image src="/skin-scanner-phone-preview.png" alt={t("scannerPreview")} width={879} height={1780} sizes="(min-width: 1024px) 390px, 74vw" priority className="h-auto w-full drop-shadow-[0_30px_34px_rgba(43,32,29,.18)]" /></div>
    <div ref={gaugeRef} className="hero-gauge haru-hero-glass absolute bottom-20 right-0 z-20 flex items-center rounded-2xl p-2.5 shadow-xl sm:-right-4 sm:bottom-28"><SkinScoreGauge label={t("hydration")} score={87} /></div>
  </div>;
}

export function Hero() {
  const t = useTranslations("hero");
  const ux = useTranslations("homeUx");
  const scan = useTranslations("faceScanPage");
  const heroRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 1024px)", () => {
        const arc = gaugeRef.current?.querySelector<SVGCircleElement>(".score-arc");
        gsap.set(phoneRef.current, { autoAlpha: 0, y: 220, scale: 0.78, rotate: 4 });
        gsap.set(gaugeRef.current, { autoAlpha: 0, x: 70, y: 42, scale: 0.68 });
        if (arc) gsap.set(arc, { attr: { strokeDashoffset: 270 } });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=2600",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        timeline
          .to(phoneRef.current, { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 1.35, ease: "power3.out" }, 0.1)
          .to(gaugeRef.current, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.4)" }, 0.82)
          .to(arc ?? {}, { attr: { strokeDashoffset: 35 }, duration: 0.85, ease: "power3.out" }, 0.86)
          .to(gaugeRef.current?.querySelector(".score-spinner") ?? {}, { rotation: 360, transformOrigin: "50% 50%", duration: 0.85, ease: "power2.inOut" }, 0.86)
          .to(phoneRef.current, { y: -24, scale: 1.04, duration: 1.15, ease: "none" }, 1.55)
          .to({}, { duration: 1.4 });
      });
    }, heroRef);
    return () => context.revert();
  }, []);

  return <section ref={heroRef} className="haru-hero relative isolate min-h-screen overflow-hidden bg-white">
    <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-8 lg:py-14">
      <div ref={copyRef} className="relative z-10 max-w-xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e7dfda] bg-white px-3 py-1.5 text-xs font-medium text-[#5f514b] shadow-sm"><Sparkles className="size-3.5" />{t("badge")}</span>
        <h1 className="mt-5 text-balance text-[clamp(2.5rem,4.6vw,4.7rem)] leading-[1.04] tracking-tight">{t("titleLine1")}<br />{t("titleLine2")}</h1>
        <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3"><Link href="/app/face-scan" className="haru-cta"><ScanFace className="size-5" aria-hidden="true" />{scan("title")}</Link><a href="#routines" className="haru-cta haru-cta-secondary">{ux("explore")}<ArrowDown className="size-4" aria-hidden="true" /></a></div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">{t("disclaimer")}</p>
      </div>
      <div className="relative min-h-[620px] sm:min-h-[710px] lg:min-h-[650px]"><ScannerPhone phoneRef={phoneRef} gaugeRef={gaugeRef} /></div>
    </div>
  </section>;
}
