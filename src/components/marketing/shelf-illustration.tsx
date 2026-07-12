export function ShelfIllustration() {
  return (
    <svg viewBox="0 0 400 225" className="h-full w-full" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="shelf-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--secondary)" />
          <stop offset="100%" stopColor="var(--background)" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#shelf-bg)" />

      {/* shelf surface */}
      <rect x="40" y="172" width="320" height="6" rx="3" className="fill-foreground/15" />

      {/* pump bottle */}
      <g>
        <rect x="66" y="90" width="46" height="82" rx="8" className="fill-primary/20 stroke-primary/40" strokeWidth="1.5" />
        <rect x="82" y="72" width="14" height="20" rx="4" className="fill-primary/30" />
        <rect x="78" y="62" width="22" height="12" rx="4" className="fill-foreground/25" />
      </g>

      {/* dropper bottle */}
      <g>
        <rect x="128" y="104" width="38" height="68" rx="8" className="fill-am/30 stroke-am/50" strokeWidth="1.5" />
        <path d="M138 104 L138 84 Q147 74 156 84 L156 104 Z" className="fill-am/40" />
        <rect x="144" y="60" width="6" height="26" rx="3" className="fill-foreground/25" />
      </g>

      {/* jar */}
      <g>
        <rect x="182" y="118" width="58" height="54" rx="10" className="fill-primary/15 stroke-primary/35" strokeWidth="1.5" />
        <rect x="182" y="110" width="58" height="14" rx="6" className="fill-foreground/20" />
      </g>

      {/* tall serum bottle */}
      <g>
        <rect x="256" y="80" width="34" height="92" rx="8" className="fill-pm/30 stroke-pm/50" strokeWidth="1.5" />
        <rect x="264" y="62" width="18" height="20" rx="4" className="fill-pm/40" />
      </g>

      {/* tube */}
      <g>
        <path
          d="M312 172 V126 Q312 108 330 108 Q348 108 348 126 V172 Z"
          className="fill-am/25 stroke-am/45"
          strokeWidth="1.5"
        />
        <rect x="322" y="96" width="16" height="14" rx="3" className="fill-foreground/20" />
      </g>
    </svg>
  );
}
