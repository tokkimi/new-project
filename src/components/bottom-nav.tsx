"use client";

import { useTranslations } from "next-intl";
import { ShoppingBag, Camera, CalendarClock, Sparkles, LayoutGrid } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const TABS = [
    { href: "/app/shelf", label: t("shelf"), icon: ShoppingBag },
    { href: "/app/products", label: t("products"), icon: LayoutGrid },
    { href: "/app/scan", label: t("scan"), icon: Camera },
    { href: "/app/routine", label: t("routine"), icon: CalendarClock },
    { href: "/app/audit", label: t("audit"), icon: Sparkles },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] sm:hidden">
      <div className="flex items-center justify-around">
        {TABS.map((tab) => {
          const active = pathname?.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <tab.icon className={cn("size-5", active && "fill-primary/15")} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
