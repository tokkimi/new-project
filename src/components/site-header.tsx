"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { HeaderAuthStatus } from "@/components/header-auth-status";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const t = useTranslations("nav");

  return (
    <header
      className={
        overlay
          ? "fixed inset-x-0 top-0 z-40 bg-white/[0.025] backdrop-blur-[2px] dark:bg-black/[0.025]"
          : "sticky top-0 z-40 bg-white/[0.025] backdrop-blur-[2px] dark:bg-black/[0.025]"
      }
    >
      <div className="relative mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="absolute left-4 flex items-center sm:left-6">
          <LocaleSwitcher compact className="sm:hidden" />
          <LocaleSwitcher className="hidden sm:inline-flex" />
        </div>
        <Link href="/" className="absolute left-1/2 shrink-0 -translate-x-1/2">
          <Logo />
        </Link>
        <div className="w-16 sm:w-32" />
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex">
            <Link href="/app/upgrade">Premium</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/app/shelf">{t("tryApp")}</Link>
          </Button>
          <HeaderAuthStatus />
        </div>
      </div>
    </header>
  );
}
