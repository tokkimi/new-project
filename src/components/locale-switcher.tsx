"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  if (compact) {
    const other = routing.locales.find((loc) => loc !== locale) ?? routing.locales[0];
    return (
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => router.replace(pathname, { locale: other }))}
        aria-label={other === "ko" ? "한국어" : t("en")}
        className={cn(
          "flex h-7 items-center justify-center rounded-full border border-border bg-muted px-2.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground",
          className
        )}
      >
        {other === "ko" ? "KO" : "EN"}
      </button>
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
          {loc === "ko" ? "한국어" : t("en")}
        </button>
      ))}
    </div>
  );
}
