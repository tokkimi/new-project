"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/logo";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { HeaderAuthStatus } from "@/components/header-auth-status";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const t = useTranslations("nav");
  const ux = useTranslations("homeUx");
  return <header className={`${overlay ? "fixed inset-x-0" : "sticky"} haru-site-header top-0 z-40`}>
    <a href="#main-content" className="haru-skip">{ux("skip")}</a>
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
      <Link href="/" className="shrink-0"><Logo className="h-12 sm:h-14" /></Link>
      <nav aria-label={ux("navigation")} className="hidden items-center gap-6 text-sm font-medium lg:flex">
        <Link href="/guides" className="hover:underline underline-offset-4">{ux("guides")}</Link>
        <Link href="/app/products" className="hover:underline underline-offset-4">{t("products")}</Link>
        <Link href="/app/wellness" className="hover:underline underline-offset-4">{t("wellness")}</Link>
        <Link href="/app/upgrade" className="hover:underline underline-offset-4">Premium</Link>
      </nav>
      <div className="flex items-center gap-2 sm:gap-3"><LocaleSwitcher compact /><HeaderAuthStatus /></div>
    </div>
  </header>;
}
