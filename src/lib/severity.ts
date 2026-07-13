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
    "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
    severity === "low" && "bg-success/15 text-success",
    severity === "medium" && "bg-am/25 text-am-foreground",
    severity === "attention" && "bg-destructive/15 text-destructive"
  );
}

export function scoreColor(score: number) {
  if (score >= 7) return "var(--destructive)";
  if (score >= 3) return "var(--am)";
  return "var(--success)";
}
