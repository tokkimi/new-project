"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { CloudSun, Sun, Droplets, Thermometer, Wind, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildEnvironmentAdvice, type EnvironmentReading } from "@/lib/environment";

type Status = "idle" | "loading" | "ready" | "unavailable" | "denied";
const STORAGE_KEY = "haru-env-enabled";

export function EnvironmentPanel() {
  const t = useTranslations("environment");
  const [status, setStatus] = React.useState<Status>("idle");
  const [reading, setReading] = React.useState<EnvironmentReading | null>(null);

  const enable = React.useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unavailable");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `/api/environment?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
          );
          const data = await res.json().catch(() => null);
          if (data?.available && data.reading) {
            setReading(data.reading as EnvironmentReading);
            setStatus("ready");
            try {
              localStorage.setItem(STORAGE_KEY, "1");
            } catch {}
          } else {
            setStatus("unavailable");
          }
        } catch {
          setStatus("unavailable");
        }
      },
      () => setStatus("denied"),
      { timeout: 8000, maximumAge: 30 * 60 * 1000 }
    );
  }, []);

  React.useEffect(() => {
    let stored = false;
    try {
      stored = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    if (!stored) return;
    // Defer out of the synchronous effect body so the initial state update
    // doesn't cascade during the same render pass.
    const id = setTimeout(() => enable(), 0);
    return () => clearTimeout(id);
  }, [enable]);

  const disable = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setReading(null);
    setStatus("idle");
  };

  const header = (
    <div className="flex items-start gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CloudSun className="size-5" />
      </span>
      <div>
        <h2 className="font-serif text-xl">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>
    </div>
  );

  if (status !== "ready" || !reading) {
    return (
      <Card className="gap-4">
        {header}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={enable} disabled={status === "loading"}>
            <MapPin className="size-4" />
            {status === "loading" ? t("loading") : t("enable")}
          </Button>
          {(status === "denied" || status === "unavailable") && (
            <span className="text-sm text-muted-foreground">
              {status === "denied" ? t("denied") : t("unavailable")}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{t("privacy")}</p>
      </Card>
    );
  }

  const advice = buildEnvironmentAdvice(reading);

  return (
    <Card className="gap-4">
      {header}

      <div className="flex flex-wrap gap-2">
        {typeof reading.uvIndex === "number" && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
            <Sun className="size-3.5" /> {t("uv")} {Math.round(reading.uvIndex)}
          </span>
        )}
        {typeof reading.humidity === "number" && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
            <Droplets className="size-3.5" /> {Math.round(reading.humidity)}%
          </span>
        )}
        {typeof reading.temperature === "number" && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
            <Thermometer className="size-3.5" /> {Math.round(reading.temperature)}°C
          </span>
        )}
        {typeof reading.aqi === "number" && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
            <Wind className="size-3.5" /> {t("aqi")} {Math.round(reading.aqi)}
          </span>
        )}
      </div>

      {advice.length > 0 && (
        <ul className="grid gap-2.5">
          {advice.map((code) => (
            <li
              key={code}
              className="rounded-2xl bg-am/10 px-4 py-3 text-sm text-muted-foreground"
            >
              {t(`advice.${code}`)}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">{t("privacy")}</p>
        <button
          type="button"
          onClick={disable}
          className="shrink-0 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          {t("disable")}
        </button>
      </div>
    </Card>
  );
}
