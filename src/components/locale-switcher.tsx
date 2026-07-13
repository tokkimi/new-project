"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  ko: "한국어",
  fr: "FR",
  ja: "日本語",
};

const LOCALE_CODE: Record<Locale, string> = {
  en: "EN",
  ko: "KO",
  fr: "FR",
  ja: "JA",
};

export function LocaleSwitcher({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  if (compact) {
    return (
      <select
        value={locale}
        disabled={pending}
        onChange={(e) =>
          startTransition(() => router.replace(pathname, { locale: e.target.value as Locale }))
        }
        aria-label="Language"
        className={cn(
          "h-7 rounded-full border border-border bg-muted px-2 text-[11px] font-medium text-muted-foreground",
          className
        )}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {LOCALE_CODE[loc]}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-muted p-1 text-xs font-medium",
        className
      )}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(() => {
              router.replace(pathname, { locale: loc });
            })
          }
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors",
            locale === loc
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {LOCALE_LABEL[loc]}
        </button>
      ))}
    </div>
  );
}
