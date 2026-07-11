"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BuyScanButton({
  buyLabel,
  comingSoonLabel,
}: {
  buyLabel: string;
  comingSoonLabel: string;
}) {
  const [notConfigured, setNotConfigured] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onClick = async () => {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout-scan", { method: "POST" });
    setLoading(false);

    if (!res.ok) {
      setNotConfigured(true);
      return;
    }
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button size="lg" onClick={onClick} disabled={loading}>
        <Sparkles className="size-4" />
        {buyLabel}
      </Button>
      {notConfigured && <p className="text-xs text-muted-foreground">{comingSoonLabel}</p>}
    </div>
  );
}
