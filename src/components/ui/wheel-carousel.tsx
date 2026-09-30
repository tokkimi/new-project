"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

export type WheelCarouselItem = { label: string; image: string; imageAlt?: string };

export function WheelCarousel({ items, activeIndex = 0, onActiveChange, className, photoHref }: { items: WheelCarouselItem[]; activeIndex?: number; onActiveChange?: (item: WheelCarouselItem, index: number) => void; className?: string; photoHref?: string }) {
  const reducedMotion = useReducedMotion();
  const [uncontrolledCurrent, setUncontrolledCurrent] = useState(activeIndex);
  const current = onActiveChange ? activeIndex : uncontrolledCurrent;
  const selected = items[current] ?? items[0];
  const setActive = (index: number) => { const next = (index + items.length) % items.length; setUncontrolledCurrent(next); onActiveChange?.(items[next]!, next); };
  const offset = (index: number) => { let value = index - current; if (value > items.length / 2) value -= items.length; if (value < -items.length / 2) value += items.length; return value; };
  return <div className={cn("haru-wheel-carousel", className)}>
    <div className="haru-wheel-photo">{photoHref ? <Link href={photoHref} aria-label={`Découvrir ${selected.label}`} className="block size-full"><AnimatePresence mode="wait"><motion.img key={`${selected.image}-${current}`} src={selected.image} alt={selected.imageAlt ?? selected.label} data-card={current} initial={reducedMotion ? false : { opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.45 }} /></AnimatePresence></Link> : <AnimatePresence mode="wait"><motion.img key={`${selected.image}-${current}`} src={selected.image} alt={selected.imageAlt ?? selected.label} data-card={current} initial={reducedMotion ? false : { opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.45 }} /></AnimatePresence>}</div>
    <div className="haru-wheel-list" role="listbox" aria-label="Types de peau" tabIndex={0} onWheel={(event) => { event.preventDefault(); setActive(current + (event.deltaY > 0 ? 1 : -1)); }} onKeyDown={(event) => { if (event.key === "ArrowDown" || event.key === "ArrowRight") { event.preventDefault(); setActive(current + 1); } if (event.key === "ArrowUp" || event.key === "ArrowLeft") { event.preventDefault(); setActive(current - 1); } }}><span className="haru-wheel-marker" aria-hidden="true" />{items.map((item, index) => { const distance = offset(index); if (Math.abs(distance) > 2) return null; const isActive = distance === 0; return <button key={item.label} role="option" aria-selected={isActive} onClick={() => setActive(index)} className="haru-wheel-item" style={{ transform: `translateY(calc(-50% + ${distance * 46}px)) rotate(${distance * 3}deg) scale(${isActive ? 1 : 0.92})`, opacity: isActive ? 1 : 0.34 }}>{item.label}</button>; })}</div>
  </div>;
}
