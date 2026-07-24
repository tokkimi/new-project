"use client";

import { useTranslations } from "next-intl";
import { CalendarDays, Moon, Sparkles, Sun } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { buildWeeklyRhythm, hasStrongActives } from "@/lib/weekly-schedule";

// A fixed Monday-anchored week so Intl gives us localized weekday names
// without translating seven day names in four locale files.
function weekdayNames(locale: string): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "long" });
  return Array.from({ length: 7 }, (_, i) =>
    fmt.format(new Date(Date.UTC(2024, 0, 1 + i))) // 2024-01-01 is a Monday
  );
}

export function WeeklyRhythmPanel({
  shelfActiveIds,
  locale,
}: {
  shelfActiveIds: string[];
  locale: string;
}) {
  const t = useTranslations("weeklyRhythm");
  const tIng = useTranslations("ingredients");
  const days = weekdayNames(locale);

  const nameOf = (id: string) => {
    try {
      return tIng(`${id}.name`);
    } catch {
      return id;
    }
  };

  return (
    <Card className="gap-4">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CalendarDays className="size-5" />
        </span>
        <div>
          <h2 className="font-serif text-xl">{t("title")}</h2>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>

      <p className="flex items-start gap-2 rounded-2xl bg-am/10 px-4 py-3 text-sm text-muted-foreground">
        <Sun className="mt-0.5 size-4 shrink-0 text-am-foreground" />
        {t("amNote")}
      </p>

      {!hasStrongActives(shelfActiveIds) ? (
        <p className="rounded-2xl bg-secondary/60 px-4 py-3 text-sm text-muted-foreground">
          {t("noStrong")}
        </p>
      ) : (
        <ul className="grid gap-1.5">
          {buildWeeklyRhythm(shelfActiveIds).map((evening) => (
            <li
              key={evening.day}
              className={cn(
                "flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5",
                evening.kind === "active" ? "bg-primary/8" : "bg-secondary/50"
              )}
            >
              <span className="text-sm font-medium text-foreground">{days[evening.day]}</span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm",
                  evening.kind === "active" ? "font-medium text-primary" : "text-muted-foreground"
                )}
              >
                {evening.kind === "active" ? (
                  <Sparkles className="size-3.5" />
                ) : (
                  <Moon className="size-3.5" />
                )}
                {evening.activeId ? nameOf(evening.activeId) : t("recovery")}
              </span>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-muted-foreground">{t("disclaimer")}</p>
    </Card>
  );
}
