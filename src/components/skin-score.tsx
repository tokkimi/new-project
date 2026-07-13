"use client";

import { motion } from "framer-motion";
import { scoreColor } from "@/lib/severity";

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

/**
 * Small inline gauge used per module row. `score` is the model's raw 0-9
 * severity read (0 = clear, 9 = severe) — inverted here to a 0-9 "clear"
 * reading so a fuller, greener bar always means healthier skin, matching
 * the overall SkinScoreRing above it instead of running the opposite way.
 */
export function ModuleScoreBar({ score }: { score: number }) {
  const color = scoreColor(score);
  const clear = 9 - score;
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${(clear / 9) * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <span className="w-4 text-right text-xs font-medium tabular-nums text-muted-foreground">
        {clear}
      </span>
    </div>
  );
}
