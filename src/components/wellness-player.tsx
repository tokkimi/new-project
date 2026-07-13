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
  audioUrl,
  label,
  description,
  errorText = "Tap again or check browser audio permissions.",
}: {
  mode?: SoundMode;
  audioUrl?: string;
  label: string;
  description: string;
  errorText?: string;
}) {
  const [playing, setPlaying] = React.useState(false);
  const [error, setError] = React.useState(false);
  const cleanupRef = React.useRef<(() => void) | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => () => cleanupRef.current?.(), []);

  const toggle = async () => {
    if (playing) {
      cleanupRef.current?.();
      cleanupRef.current = null;
      setPlaying(false);
      setError(false);
      return;
    }

    setError(false);

    try {
      if (audioUrl) {
        const audio = audioRef.current ?? new Audio(audioUrl);
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;
        await audio.play();
        cleanupRef.current = () => {
          audio.pause();
          audio.currentTime = 0;
        };
        setPlaying(true);
        return;
      }

      if (!mode) return;

      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) throw new Error("audio_context_unavailable");
      const ctx = new AudioContextCtor();
      if (ctx.state === "suspended") await ctx.resume();
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
    } catch (playError) {
      console.error("wellness sound failed", playError);
      cleanupRef.current?.();
      cleanupRef.current = null;
      setPlaying(false);
      setError(true);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-3xl bg-card/80 p-4 ring-1 ring-border/50">
      <Button type="button" size="icon" variant={playing ? "default" : "outline"} onClick={toggle}>
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
      </Button>
      <div className="min-w-0">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        {error && <p className="mt-1 text-xs text-destructive">{errorText}</p>}
      </div>
    </div>
  );
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
