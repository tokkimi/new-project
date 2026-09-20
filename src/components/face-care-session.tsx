"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaceDiagram, type DiagramVariant } from "@/components/face-diagram";

export interface SessionStep {
  diagram: DiagramVariant;
  seconds: number;
  title: string;
  instruction: string;
}

export function FaceCareSession({
  steps,
  labels,
}: {
  steps: SessionStep[];
  labels: {
    start: string;
    pause: string;
    next: string;
    previous: string;
    restart: string;
    stepOf: string; // e.g. "Step {current} of {total}"
    done: string;
    doneText: string;
  };
}) {
  const [index, setIndex] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(steps[0]?.seconds ?? 0);
  const [finished, setFinished] = React.useState(false);

  const step = steps[index];
  const isLast = index === steps.length - 1;

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;
        if (isLast) {
          setRunning(false);
          setFinished(true);
          return 0;
        }
        setIndex((i) => i + 1);
        return steps[index + 1]?.seconds ?? 0;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, index, isLast, steps]);

  const goTo = (nextIndex: number) => {
    const clamped = Math.max(0, Math.min(steps.length - 1, nextIndex));
    setIndex(clamped);
    setSecondsLeft(steps[clamped].seconds);
    setRunning(false);
    setFinished(false);
  };

  const toggle = () => setRunning((v) => !v);

  const restart = () => {
    setIndex(0);
    setSecondsLeft(steps[0].seconds);
    setRunning(false);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[1.5rem] border border-white/35 bg-transparent p-8 text-center text-white backdrop-blur-md">
        <span className="flex size-14 items-center justify-center rounded-full border border-white/45 bg-white/[0.04] text-white">
          <Check className="size-7" />
        </span>
        <div>
          <p className="font-serif text-2xl">{labels.done}</p>
          <p className="mt-1 text-sm text-white/68">{labels.doneText}</p>
        </div>
        <Button variant="outline" onClick={restart}>
          <RotateCcw className="size-4" />
          {labels.restart}
        </Button>
      </div>
    );
  }

  const progress = ((index + (running || secondsLeft < step.seconds ? (step.seconds - secondsLeft) / step.seconds : 0)) / steps.length) * 100;

  return (
    <div className="flex flex-col gap-5 rounded-[1.5rem] border border-white/35 bg-transparent p-5 text-white backdrop-blur-md sm:p-6">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/18">
        <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="grid gap-5 sm:grid-cols-[minmax(0,180px)_1fr] sm:items-center">
        <FaceDiagram variant={step.diagram} className="mx-auto w-full max-w-[210px]" />
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-white/62">
            {labels.stepOf.replace("{current}", String(index + 1)).replace("{total}", String(steps.length))}
          </p>
          <h3 className="mt-1 font-serif text-2xl">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/72">{step.instruction}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" size="icon" onClick={() => goTo(index - 1)} disabled={index === 0}>
          <ChevronLeft className="size-5" />
        </Button>

        <div className="flex flex-col items-center">
          <span className="font-serif text-3xl tabular-nums">{secondsLeft}s</span>
          <Button type="button" variant={running ? "default" : "outline"} size="sm" onClick={toggle} className="mt-1">
            {running ? <Pause className="size-4" /> : <Play className="size-4" />}
            {running ? labels.pause : labels.start}
          </Button>
        </div>

        <Button type="button" variant="ghost" size="icon" onClick={() => goTo(index + 1)} disabled={isLast}>
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
