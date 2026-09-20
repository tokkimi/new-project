"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function HorizontalRail({ children, label }: { children: ReactNode; label: string }) {
  const t = useTranslations("homeUx");
  const id = useId();
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => setEdges({ start: element.scrollLeft <= 2, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    return () => { observer.disconnect(); element.removeEventListener("scroll", update); };
  }, []);
  const move = (direction: number) => {
    const element = rail.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement | null;
    const distance = card ? card.offsetWidth + parseFloat(getComputedStyle(element).columnGap || "0") : element.clientWidth * 0.85;
    element.scrollBy({ left: direction * distance, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <div>
    <div id={id} ref={rail} role="region" aria-label={label} tabIndex={0}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
      }} className="haru-rail flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain rounded-3xl pb-5">
      {children}
    </div>
    <div className="mt-3 flex items-center justify-between gap-4">
      <p className="text-xs text-muted-foreground">{t("swipeHint")}</p>
      <div className="flex gap-2">
        <button type="button" className="haru-glass flex size-11 items-center justify-center rounded-full disabled:opacity-30" aria-label={t("previous")} aria-controls={id} disabled={edges.start} onClick={() => move(-1)}><ArrowLeft className="size-4" aria-hidden="true" /></button>
        <button type="button" className="haru-glass flex size-11 items-center justify-center rounded-full disabled:opacity-30" aria-label={t("next")} aria-controls={id} disabled={edges.end} onClick={() => move(1)}><ArrowRight className="size-4" aria-hidden="true" /></button>
      </div>
    </div>
  </div>;
}
