export type DiagramVariant =
  | "cheek-sweep-up"
  | "jaw-glide-out"
  | "temple-circular"
  | "forehead-glide"
  | "jaw-press-hold"
  | "neck-sweep-up"
  | "scalp-circular"
  | "eye-corner-press"
  | "brow-glide"
  | "lip-corner-lift"
  | "cheek-lift-diagonal"
  | "general-relax-hold";

type Layer =
  | { kind: "zone"; cx: number; cy: number; rx: number; ry: number }
  | { kind: "arrow"; d: string }
  | { kind: "loop"; d: string }
  | { kind: "press"; cx: number; cy: number };

const VARIANTS: Record<DiagramVariant, Layer[]> = {
  "cheek-sweep-up": [
    { kind: "zone", cx: 133, cy: 142, rx: 22, ry: 20 },
    { kind: "arrow", d: "M120 162 Q 128 145 148 118" },
  ],
  "jaw-glide-out": [
    { kind: "zone", cx: 148, cy: 168, rx: 24, ry: 16 },
    { kind: "arrow", d: "M104 186 Q 132 182 166 160" },
  ],
  "temple-circular": [
    { kind: "zone", cx: 150, cy: 100, rx: 16, ry: 16 },
    { kind: "loop", d: "M150 90 A 10 10 0 1 1 149.9 90" },
  ],
  "forehead-glide": [
    { kind: "zone", cx: 100, cy: 76, rx: 34, ry: 16 },
    { kind: "arrow", d: "M100 82 Q 80 70 62 66" },
    { kind: "arrow", d: "M100 82 Q 120 70 138 66" },
  ],
  "jaw-press-hold": [
    { kind: "zone", cx: 150, cy: 163, rx: 18, ry: 16 },
    { kind: "press", cx: 150, cy: 163 },
  ],
  "neck-sweep-up": [
    { kind: "zone", cx: 100, cy: 208, rx: 28, ry: 14 },
    { kind: "arrow", d: "M100 226 L 100 190" },
  ],
  "scalp-circular": [
    { kind: "zone", cx: 100, cy: 52, rx: 40, ry: 18 },
    { kind: "loop", d: "M85 48 A 8 8 0 1 1 84.9 48" },
    { kind: "loop", d: "M115 48 A 8 8 0 1 1 114.9 48" },
  ],
  "eye-corner-press": [
    { kind: "zone", cx: 136, cy: 112, rx: 10, ry: 8 },
    { kind: "press", cx: 136, cy: 112 },
  ],
  "brow-glide": [
    { kind: "zone", cx: 112, cy: 92, rx: 30, ry: 10 },
    { kind: "arrow", d: "M88 94 Q 112 84 138 88" },
  ],
  "lip-corner-lift": [
    { kind: "zone", cx: 122, cy: 170, rx: 12, ry: 10 },
    { kind: "arrow", d: "M116 174 Q 122 164 132 158" },
  ],
  "cheek-lift-diagonal": [
    { kind: "zone", cx: 130, cy: 150, rx: 20, ry: 18 },
    { kind: "arrow", d: "M118 168 Q 128 150 156 122" },
  ],
  "general-relax-hold": [
    { kind: "zone", cx: 100, cy: 185, rx: 16, ry: 12 },
    { kind: "press", cx: 100, cy: 185 },
  ],
};

export function FaceDiagram({ variant, className }: { variant: DiagramVariant; className?: string }) {
  const layers = VARIANTS[variant];

  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      role="img"
      aria-label={`Diagram: ${variant.replace(/-/g, " ")}`}
    >
      <defs>
        <marker id="fc-arrowhead" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" className="fill-primary" />
        </marker>
      </defs>

      {/* base face outline */}
      <g className="stroke-muted-foreground/40" fill="none" strokeWidth="1.5">
        <ellipse cx="100" cy="120" rx="62" ry="80" />
        <ellipse cx="38" cy="122" rx="10" ry="16" />
        <ellipse cx="162" cy="122" rx="10" ry="16" />
        <ellipse cx="76" cy="110" rx="9" ry="5" />
        <ellipse cx="124" cy="110" rx="9" ry="5" />
        <path d="M64 92 Q 76 86 88 92" />
        <path d="M112 92 Q 124 86 136 92" />
        <path d="M100 118 L 96 142 Q 100 146 104 142" />
        <path d="M82 168 Q 100 178 118 168" />
        <path d="M78 198 L 122 198 L 116 232 L 84 232 Z" />
      </g>

      {layers.map((layer, i) => {
        if (layer.kind === "zone") {
          return (
            <ellipse
              key={i}
              cx={layer.cx}
              cy={layer.cy}
              rx={layer.rx}
              ry={layer.ry}
              className="fill-primary/10 stroke-primary/30"
              strokeWidth="1"
            />
          );
        }
        if (layer.kind === "arrow") {
          return (
            <path
              key={i}
              d={layer.d}
              className="stroke-primary"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              markerEnd="url(#fc-arrowhead)"
            />
          );
        }
        if (layer.kind === "loop") {
          return (
            <path
              key={i}
              d={layer.d}
              className="stroke-primary"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              markerEnd="url(#fc-arrowhead)"
            />
          );
        }
        return (
          <g key={i}>
            <circle cx={layer.cx} cy={layer.cy} r="10" className="fill-primary/20 animate-pulse" />
            <circle cx={layer.cx} cy={layer.cy} r="4" className="fill-primary" />
          </g>
        );
      })}
    </svg>
  );
}
