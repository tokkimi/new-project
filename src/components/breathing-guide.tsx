"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHASES = [
  { key: "inhale", seconds: 4 },
  { key: "hold", seconds: 2 },
  { key: "exhale", seconds: 6 },
] as const;

type PhaseKey = (typeof PHASES)[number]["key"];

export function BreathingGuide({
  labels,
}: {
  labels: Record<PhaseKey, string> & { start: string; pause: string };
}) {
  const [running, setRunning] = React.useState(false);
  const [phaseIndex, setPhaseIndex] = React.useState(0);
  const [secondsLeft, setSecondsLeft] = React.useState<number>(PHASES[0].seconds);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;
        setPhaseIndex((i) => (i + 1) % PHASES.length);
        return PHASES[(phaseIndex + 1) % PHASES.length].seconds;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, phaseIndex]);

  const toggle = () => {
    if (!running) {
      setPhaseIndex(0);
      setSecondsLeft(PHASES[0].seconds);
    }
    setRunning((v) => !v);
  };

  const phase = PHASES[phaseIndex];
  const scale = phase.key === "inhale" ? 1.35 : phase.key === "exhale" ? 0.75 : 1.1;

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="relative flex size-32 items-center justify-center">
        <div
          className="absolute inset-0 rounded-full bg-primary/15 transition-transform duration-[1000ms] ease-in-out"
          style={{ transform: `scale(${running ? scale : 1})` }}
        />
        <div className="absolute inset-3 rounded-full bg-primary/25" />
        <div className="relative flex flex-col items-center">
          <span className="font-serif text-2xl">{secondsLeft}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {running ? labels[phase.key] : ""}
          </span>
        </div>
      </div>
      <Button type="button" variant={running ? "default" : "outline"} onClick={toggle}>
        {running ? <Pause className="size-4" /> : <Play className="size-4" />}
        {running ? labels.pause : labels.start}
      </Button>
    </div>
  );
}
