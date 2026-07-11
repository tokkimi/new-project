"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ZoneSeverity } from "@/lib/face-scan-engine";

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

/** Circular gauge for the 0-100 overall skin score. */
export function SkinScoreRing({ score, size = 108 }: { score: number; size?: number }) {
  const clamped = Math.max(0, Math.min(100, score));
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);
  const color = clamped >= 75 ? "var(--success)" : clamped >= 50 ? "var(--am)" : "var(--destructive)";

  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--border)" strokeWidth={strokeWidth} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-serif text-2xl leading-none">{clamped}</span>
        <span className="text-[10px] text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}

/** Small inline score gauge used per module row (0-9 scale). */
export function ModuleScoreBar({ score }: { score: number }) {
  const color = scoreColor(score);
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${(score / 9) * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <span className="w-4 text-right text-xs font-medium tabular-nums text-muted-foreground">
        {score}
      </span>
    </div>
  );
}
