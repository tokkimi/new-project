"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FaceZoneId, ZoneFinding } from "@/lib/face-scan-engine";

const SEVERITY_COLOR: Record<ZoneFinding["severity"], string> = {
  low: "var(--success)",
  medium: "var(--am)",
  attention: "var(--destructive)",
};

const MARKERS: { zone: FaceZoneId; x: number; y: number }[] = [
  { zone: "forehead", x: 100, y: 55 },
  { zone: "underEye", x: 74, y: 108 },
  { zone: "underEye", x: 126, y: 108 },
  { zone: "nose", x: 100, y: 122 },
  { zone: "cheeks", x: 58, y: 142 },
  { zone: "cheeks", x: 142, y: 142 },
  { zone: "chin", x: 100, y: 196 },
];

export function FaceMap({ zones }: { zones: ZoneFinding[] }) {
  const byZone = new Map(zones.map((z) => [z.id, z]));

  return (
    <svg viewBox="0 0 200 240" className="mx-auto h-56 w-auto text-border">
      <ellipse
        cx="100"
        cy="125"
        rx="72"
        ry="97"
        fill="var(--card)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {MARKERS.map((m, i) => {
        const zone = byZone.get(m.zone);
        const color = zone ? SEVERITY_COLOR[zone.severity] : SEVERITY_COLOR.low;
        const pulse = zone?.flagged && zone.severity === "attention";
        return (
          <g key={`${m.zone}-${i}`}>
            {pulse && (
              <motion.circle
                cx={m.x}
                cy={m.y}
                r={6}
                fill={color}
                opacity={0.35}
                animate={{ scale: [1, 2.2, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                style={{ transformOrigin: `${m.x}px ${m.y}px` }}
              />
            )}
            <circle cx={m.x} cy={m.y} r={5} fill={color} stroke="var(--card)" strokeWidth="1.5" />
          </g>
        );
      })}
    </svg>
  );
}

export function severityBadgeClass(severity: ZoneFinding["severity"]) {
  return cn(
    "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
    severity === "low" && "bg-success/15 text-success",
    severity === "medium" && "bg-am/25 text-am-foreground",
    severity === "attention" && "bg-destructive/15 text-destructive"
  );
}
