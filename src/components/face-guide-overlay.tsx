"use client";

import { cn } from "@/lib/utils";

type FaceGuideOverlayProps = {
  compact?: boolean;
  active?: boolean;
  className?: string;
};

export function FaceGuideOverlay({ compact = false, active = false, className }: FaceGuideOverlayProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 520"
      className={cn(
        "pointer-events-none absolute inset-0 size-full text-white",
        active ? "opacity-90" : "opacity-68",
        compact && "opacity-50",
        className
      )}
      fill="none"
    >
      <defs>
        <filter id="haru-face-guide-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.65" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g
        filter="url(#haru-face-guide-glow)"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        <path
          d="M180 50C251 52 296 106 302 191C308 289 268 398 180 457C92 398 52 289 58 191C64 106 109 52 180 50Z"
          strokeWidth="1"
          strokeDasharray="4 7"
          opacity="0.72"
        />
        <path d="M180 76V446" strokeWidth="0.7" opacity="0.44" />
        <path d="M102 164C128 145 158 145 180 162C202 145 232 145 258 164" strokeWidth="0.65" opacity="0.28" />
        <path d="M95 188C119 170 151 171 172 188" strokeWidth="0.88" opacity="0.62" />
        <path d="M188 188C209 171 241 170 265 188" strokeWidth="0.88" opacity="0.62" />
        <path d="M111 207C133 218 154 218 172 204" strokeWidth="0.62" opacity="0.4" />
        <path d="M188 204C206 218 227 218 249 207" strokeWidth="0.62" opacity="0.4" />
        <path d="M180 171C168 218 161 253 166 285C169 305 176 318 180 318C184 318 191 305 194 285C199 253 192 218 180 171Z" strokeWidth="0.75" opacity="0.42" />
        <path d="M146 292C164 303 196 303 214 292" strokeWidth="0.62" opacity="0.38" />
        <path d="M136 348C158 332 202 332 224 348" strokeWidth="0.82" opacity="0.56" />
        <path d="M143 362C166 375 194 375 217 362" strokeWidth="0.62" opacity="0.4" />
        <path d="M112 247C94 284 99 338 132 381" strokeWidth="0.62" opacity="0.3" />
        <path d="M248 247C266 284 261 338 228 381" strokeWidth="0.62" opacity="0.3" />
        <path d="M84 236C118 249 149 253 180 250C211 253 242 249 276 236" strokeWidth="0.58" opacity="0.26" />
        <path d="M78 294C113 309 148 316 180 314C212 316 247 309 282 294" strokeWidth="0.58" opacity="0.26" />
        <path d="M103 398C128 387 155 383 180 386C205 383 232 387 257 398" strokeWidth="0.58" opacity="0.26" />
        <path d="M122 122H238" strokeWidth="0.55" opacity="0.24" />
        <path d="M106 145H254" strokeWidth="0.55" opacity="0.24" />
      </g>

      <g fill="currentColor" opacity={active ? "0.86" : "0.62"}>
        {[
          [180, 78],
          [180, 123],
          [180, 174],
          [180, 251],
          [180, 319],
          [180, 386],
          [180, 444],
          [99, 187],
          [171, 187],
          [189, 187],
          [261, 187],
          [164, 283],
          [196, 283],
          [137, 348],
          [223, 348],
          [113, 250],
          [247, 250],
          [129, 379],
          [231, 379],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={compact ? 1.05 : 1.35} />
        ))}
      </g>
    </svg>
  );
}
