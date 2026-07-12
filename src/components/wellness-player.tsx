"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export type SoundMode = "white" | "pink" | "rain" | "ocean" | "calm432" | "soft528";

function createNoise(ctx: AudioContext, mode: SoundMode) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;

  for (let i = 0; i < bufferSize; i += 1) {
    const white = Math.random() * 2 - 1;
    last = mode === "pink" || mode === "ocean" ? last * 0.96 + white * 0.04 : white;
    const wave = mode === "rain" ? white * (Math.random() > 0.985 ? 1 : 0.15) : last;
    data[i] = wave * 0.55;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

export function WellnessPlayer({
  mode,
  label,
  description,
}: {
  mode: SoundMode;
  label: string;
  description: string;
}) {
  const [playing, setPlaying] = React.useState(false);
  const cleanupRef = React.useRef<(() => void) | null>(null);

  React.useEffect(() => () => cleanupRef.current?.(), []);

  const toggle = async () => {
    if (playing) {
      cleanupRef.current?.();
      cleanupRef.current = null;
      setPlaying(false);
      return;
    }

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContextCtor();
    const gain = ctx.createGain();
    gain.gain.value = 0.045;
    gain.connect(ctx.destination);

    if (mode === "calm432" || mode === "soft528") {
      const oscillator = ctx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = mode === "calm432" ? 432 : 528;
      oscillator.connect(gain);
      oscillator.start();
      cleanupRef.current = () => {
        oscillator.stop();
        ctx.close();
      };
    } else {
      const noise = createNoise(ctx, mode);
      const filter = ctx.createBiquadFilter();
      filter.type = mode === "rain" ? "highpass" : "lowpass";
      filter.frequency.value = mode === "rain" ? 900 : mode === "ocean" ? 650 : 1600;
      noise.connect(filter);
      filter.connect(gain);
      noise.start();
      cleanupRef.current = () => {
        noise.stop();
        ctx.close();
      };
    }

    setPlaying(true);
  };

  return (
    <div className="flex items-center gap-3 rounded-3xl bg-card/80 p-4 ring-1 ring-border/50">
      <Button type="button" size="icon" variant={playing ? "default" : "outline"} onClick={toggle}>
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
      </Button>
      <div className="min-w-0">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
