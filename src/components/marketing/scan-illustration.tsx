export function ScanIllustration() {
  return (
    <svg viewBox="0 0 400 225" className="h-full w-full" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="scan-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--secondary)" />
          <stop offset="100%" stopColor="var(--background)" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#scan-bg)" />

      {/* product silhouette */}
      <g className="fill-foreground/10">
        <rect x="165" y="70" width="70" height="100" rx="10" />
        <rect x="185" y="52" width="30" height="22" rx="6" />
      </g>

      {/* viewfinder frame */}
      <g className="stroke-primary" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M120 60 V44 a8 8 0 0 1 8-8 h16" />
        <path d="M280 60 V44 a8 8 0 0 0-8-8 h-16" />
        <path d="M120 165 V181 a8 8 0 0 0 8 8 h16" />
        <path d="M280 165 V181 a8 8 0 0 1-8 8 h-16" />
      </g>

      {/* scan line */}
      <line x1="130" y1="0" x2="270" y2="0" className="stroke-primary" strokeWidth="3" opacity="0.8">
        <animate attributeName="y1" values="55;170;55" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="y2" values="55;170;55" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.8s" repeatCount="indefinite" />
      </line>

      {/* corner tick marks scattered like a detection overlay */}
      <g className="fill-primary">
        <circle cx="150" cy="90" r="3" opacity="0.7" />
        <circle cx="220" cy="110" r="3" opacity="0.5" />
        <circle cx="185" cy="140" r="3" opacity="0.6" />
      </g>
    </svg>
  );
}
