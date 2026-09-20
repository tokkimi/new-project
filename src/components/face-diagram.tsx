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
        <style>
          {`
            .face-care-motion {
              stroke-dasharray: 9 9;
              animation: faceCareFlow 1.65s linear infinite;
            }
            .face-care-loop {
              stroke-dasharray: 7 7;
              animation: faceCareFlow 1.35s linear infinite;
            }
            .face-care-zone {
              animation: faceCareBreathe 1.9s ease-in-out infinite;
              transform-origin: center;
            }
            @keyframes faceCareFlow {
              to { stroke-dashoffset: -36; }
            }
            @keyframes faceCareBreathe {
              0%, 100% { opacity: .48; }
              50% { opacity: .82; }
            }
          `}
        </style>
        <filter id="soft-glow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker id="fc-arrowhead" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#ff7a3d" />
        </marker>
      </defs>

      <image
        href="/face-care/wireframe-face-reference.png"
        x="0"
        y="0"
        width="200"
        height="240"
        preserveAspectRatio="xMidYMid meet"
      />

      {layers.map((layer, i) => {
        if (layer.kind === "zone") {
          return (
            <ellipse
              key={i}
              cx={layer.cx}
              cy={layer.cy}
              rx={layer.rx}
              ry={layer.ry}
              className="face-care-zone fill-[#ff7a3d]/26 stroke-[#ff7a3d]/90"
              strokeWidth="2"
              filter="url(#soft-glow)"
            />
          );
        }
        if (layer.kind === "arrow") {
          return (
            <path
              key={i}
              d={layer.d}
              className="face-care-motion stroke-[#ff7a3d]"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              markerEnd="url(#fc-arrowhead)"
              filter="url(#soft-glow)"
            />
          );
        }
        if (layer.kind === "loop") {
          return (
            <path
              key={i}
              d={layer.d}
              className="face-care-loop stroke-[#ff7a3d]"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              markerEnd="url(#fc-arrowhead)"
              filter="url(#soft-glow)"
            />
          );
        }
        return (
          <g key={i}>
            <circle cx={layer.cx} cy={layer.cy} r="14" className="fill-[#ff7a3d]/30 animate-pulse" />
            <circle cx={layer.cx} cy={layer.cy} r="5.5" className="fill-[#ff7a3d]" />
          </g>
        );
      })}
    </svg>
  );
}
