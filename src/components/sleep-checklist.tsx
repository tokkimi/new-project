"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

function todayKey() {
  const d = new Date();
  return `haru-sleep-cue-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function SleepChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = React.useState<boolean[]>(() => items.map(() => false));

  React.useEffect(() => {
    window.requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(todayKey());
        if (saved) setChecked(JSON.parse(saved));
      } catch {
        // ignore malformed/unavailable storage
      }
    });
  }, []);

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      try {
        localStorage.setItem(todayKey(), JSON.stringify(next));
      } catch {
        // storage unavailable, skip persistence silently
      }
      return next;
    });
  };

  const doneCount = checked.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">
        {doneCount}/{items.length}
      </p>
      {items.map((item, i) => (
        <button
          key={item}
          type="button"
          onClick={() => toggle(i)}
          className="flex items-center gap-2.5 rounded-xl bg-secondary/50 px-3 py-2 text-left text-sm transition-colors hover:bg-secondary"
        >
          <span
            className={cn(
              "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
              checked[i] ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40"
            )}
          >
            {checked[i] && <Check className="size-3.5" />}
          </span>
          <span className={cn(checked[i] && "text-muted-foreground line-through")}>{item}</span>
        </button>
      ))}
    </div>
  );
}
