"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Camera, ScanFace, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

type Position = { x: number; y: number };
const STORAGE = "haru-floating-scanner-position-v1";
const copy = {
  fr: { label: "Ouvrir le scanner", title: "Scanner", product: "Scanner un produit", face: "Faire un scan visage" },
  en: { label: "Open scanner", title: "Scanner", product: "Scan a product", face: "Start a face scan" },
  ko: { label: "스캐너 열기", title: "스캐너", product: "제품 스캔", face: "얼굴 스캔" },
  ja: { label: "スキャナーを開く", title: "スキャナー", product: "製品をスキャン", face: "顔をスキャン" },
} as const;

export function FloatingScanner() {
  const locale = useLocale() as keyof typeof copy;
  const t = copy[locale] ?? copy.en;
  const pathname = usePathname();
  const [position, setPosition] = useState<Position | null>(null);
  const [open, setOpen] = useState(false);
  const moved = useRef(false);
  const dragging = useRef(false);
  const origin = useRef<Position>({x:0,y:0});

  useEffect(() => {
    const frame = requestAnimationFrame(() => { try {
      const saved = JSON.parse(localStorage.getItem(STORAGE) ?? "null") as Position | null;
      if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) setPosition({x:Math.max(12,Math.min(saved.x,innerWidth-70)),y:Math.max(12,Math.min(saved.y,innerHeight-70))});
    } catch {} });
    const resize = () => setPosition(p => p ? {x:Math.max(12,Math.min(p.x,innerWidth-70)),y:Math.max(12,Math.min(p.y,innerHeight-70))} : p);
    window.addEventListener("resize",resize);
    return () => {cancelAnimationFrame(frame);window.removeEventListener("resize",resize);};
  }, []);

  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) return null;
  const move = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragging.current) return;
    if (Math.abs(event.clientX-origin.current.x) + Math.abs(event.clientY-origin.current.y) > 6) moved.current = true;
    if (!moved.current) return;
    const x = Math.max(12, Math.min(event.clientX - 29, window.innerWidth - 70));
    const y = Math.max(12, Math.min(event.clientY - 29, window.innerHeight - 70));
    const next = { x, y };
    setPosition(next);
    try { localStorage.setItem(STORAGE, JSON.stringify(next)); } catch {}
  };
  const release = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  return <div className="fixed z-[60]" style={position ? { left: position.x, top: position.y } : { right: "1rem", bottom: "6.25rem" }}>
    {open && <div style={{left:position ? Math.max(12,Math.min(position.x,window.innerWidth-236))-position.x : undefined,right:position ? undefined : 0,top:position && position.y < 190 ? 68 : undefined,bottom:position && position.y < 190 ? undefined : 68}} className="absolute w-56 rounded-2xl border border-border bg-white/95 p-2 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between px-2 py-1 text-xs font-semibold text-muted-foreground"><span>{t.title}</span><button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1 hover:bg-secondary"><X className="size-4" /></button></div>
      <Link href="/app/scan" onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium hover:bg-secondary"><Camera className="size-4" />{t.product}</Link>
      <Link href="/app/face-scan" onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium hover:bg-secondary"><ScanFace className="size-4" />{t.face}</Link>
    </div>}
    <button type="button" aria-label={t.label} aria-expanded={open} onPointerDown={(event) => { dragging.current = true; moved.current = false; origin.current={x:event.clientX,y:event.clientY}; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={move} onPointerUp={release} onPointerCancel={release} onClick={() => { if (moved.current) { moved.current = false; return; } setOpen((value) => !value); }} className="flex size-[52px] touch-none items-center justify-center rounded-full border border-[#f5dfce]/70 bg-[#251e1d]/90 text-[#f7eadf] shadow-[0_12px_30px_rgba(0,0,0,.42)] backdrop-blur-xl transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ead1be]"><Camera className="size-5" aria-hidden="true" /></button>
  </div>;
}
