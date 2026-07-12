"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function AppNav({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const TABS = [
    { href: "/app/today", label: t("today") },
    { href: "/app/shelf", label: t("shelf") },
    { href: "/app/face-scan", label: t("scan") },
    { href: "/app/audit", label: t("audit") },
    { href: "/app/profile", label: t("profile") },
  ];

  return (
    <nav className={cn("items-center gap-1 rounded-full bg-muted p-1", className)}>
      {TABS.map((tab) => {
        const active = pathname?.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
