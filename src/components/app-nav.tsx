"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function AppNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const TABS = [
    { href: "/app/shelf", label: t("shelf") },
    { href: "/app/scan", label: t("scan") },
    { href: "/app/routine", label: t("routine") },
    { href: "/app/audit", label: t("audit") },
  ];

  return (
    <nav className="flex items-center gap-1 rounded-full bg-muted p-1">
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
