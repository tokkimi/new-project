import { cn } from "@/lib/utils";

/** The full Haru Skin logo lockup (monogram + wordmark). */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("haru-brand-lockup", className)} aria-label="Haru Skin">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/haru-monogram-glass.png" alt="" className="haru-brand-mark" />
      <span className="haru-brand-type"><strong>HARU</strong><small>— SKIN —</small></span>
    </span>
  );
}
