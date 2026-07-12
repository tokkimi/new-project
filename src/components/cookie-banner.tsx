"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [choice, setChoice] = React.useState<string | null | undefined>(undefined);

  React.useEffect(() => {
    window.requestAnimationFrame(() => {
      setChoice(window.localStorage.getItem("haru-cookie-choice"));
    });
  }, []);

  const save = (value: "necessary" | "all") => {
    window.localStorage.setItem("haru-cookie-choice", value);
    setChoice(value);
  };

  if (choice !== null) return null;

  return (
    <div className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-3xl rounded-lg border border-border bg-background p-4 shadow-lg">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Haru utilise les cookies nécessaires au fonctionnement du site. Les cookies de mesure ou d&apos;amélioration ne sont activés qu&apos;avec ton accord.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" onClick={() => save("necessary")}>Refuser</Button>
          <Button onClick={() => save("all")}>Accepter</Button>
        </div>
      </div>
    </div>
  );
}
