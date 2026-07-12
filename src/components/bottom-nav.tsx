"use client";

import { useTranslations } from "next-intl";
import { ShoppingBag, Camera, Sparkles, LayoutGrid, User } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const TABS = [
    { href: "/app/shelf", label: t("shelf"), icon: ShoppingBag },
    { href: "/app/products", label: t("products"), icon: LayoutGrid },
    { href: "/app/scan", label: t("scan"), icon: Camera },
    { href: "/app/audit", label: t("audit"), icon: Sparkles },
    { href: "/app/profile", label: t("profile"), icon: User },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 shadow-[0_-16px_40px_-28px_rgba(0,0,0,0.45)] backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-2xl items-center justify-around px-1 sm:px-3">
        {TABS.map((tab) => {
          const active = pathname?.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors sm:py-3 sm:text-xs",
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
