"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function SubscribeButton({
  subscribeLabel,
  comingSoonLabel,
  signedIn,
}: {
  subscribeLabel: string;
  comingSoonLabel: string;
  signedIn: boolean;
}) {
  const [notConfigured, setNotConfigured] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  if (!signedIn) {
    return (
      <Button asChild size="lg">
        <Link href="/sign-in">{subscribeLabel}</Link>
      </Button>
    );
  }

  const onClick = async () => {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    setLoading(false);

    if (!res.ok) {
      setNotConfigured(true);
      return;
    }
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <div className="flex flex-col gap-2">
      <Button size="lg" onClick={onClick} disabled={loading}>
        <Sparkles className="size-4" />
        {subscribeLabel}
      </Button>
      {notConfigured && <p className="text-xs text-muted-foreground">{comingSoonLabel}</p>}
    </div>
  );
}
