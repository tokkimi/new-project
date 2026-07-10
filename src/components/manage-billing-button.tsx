"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export function ManageBillingButton({ label }: { label: string }) {
  const [loading, setLoading] = React.useState(false);

  const onClick = async () => {
    setLoading(true);
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    setLoading(false);
    if (res.ok) {
      const { url } = await res.json();
      if (url) window.location.href = url;
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={loading}>
      {label}
    </Button>
  );
}
