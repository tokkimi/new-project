"use client";

import { useEffect, useState } from "react";

/** Brand reveal shown once per browser session on the first page load. */
export function BrandSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.sessionStorage.getItem("haru-brand-reveal") === "seen") {
      const immediate = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(immediate);
    }
    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem("haru-brand-reveal", "seen");
      setVisible(false);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;
  return (
    <div className="haru-brand-splash" role="status" aria-label="Haru Skin se prépare">
      <div className="haru-brand-splash-glow" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/haru-monogram-glass.png" alt="" className="haru-brand-splash-mark" />
      <div className="haru-brand-splash-wordmark"><strong>HARU</strong><span>— SKIN —</span></div>
      <div className="haru-brand-loading" aria-hidden="true"><i /></div>
    </div>
  );
}
