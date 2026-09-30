import { cn } from "@/lib/utils";
import type { ZoneSeverity } from "@/lib/face-scan-engine";

/**
 * Plain, server-safe helpers for severity styling. Kept out of skin-score.tsx
 * (a "use client" file) because Next.js forbids calling a function exported
 * from a client module directly from server code — only rendering it as a
 * component is allowed. Calling severityBadgeClass() from a server component
 * previously crashed every visit to the face-scan history detail page.
 */
export function severityBadgeClass(severity: ZoneSeverity) {
  return cn(
    "inline-flex items-center rounded-full border bg-[#171413] px-2 py-0.5 text-[11px] font-medium text-[#f7eadf]",
    severity === "low" && "border-white/18",
    severity === "medium" && "border-[#9ba8b5]/55",
    severity === "attention" && "border-[#c97b70]/65"
  );
}

export function scoreColor(score: number) {
  if (score >= 7) return "#cf8178";
  if (score >= 3) return "#b7c5d0";
  return "#e9e1d9";
}
