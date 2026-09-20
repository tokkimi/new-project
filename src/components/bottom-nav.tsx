"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const iconVersion = "20260726-ringless";

  if (pathname !== "/" && !pathname?.startsWith("/app")) return null;

  const tabs = [
    { href: "/app/products", label: t("products"), icon: "/nav-icons/products.png" },
    { href: "/app/wellness", label: t("wellness"), icon: "/nav-icons/wellness.png" },
    { href: "/app/scan", label: t("scan"), icon: "/nav-icons/scan.png", center: true },
    { href: "/app/audit", label: t("audit"), icon: "/nav-icons/audit.png" },
    { href: "/app/shelf", label: t("routine"), icon: "/nav-icons/routine.png" },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 bg-transparent backdrop-blur-[2px] pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-2xl items-end justify-around px-1 sm:px-3">
        {tabs.map((tab) => {
          const active = pathname?.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-white transition-opacity sm:py-3 sm:text-xs",
                active ? "opacity-100" : "opacity-72 hover:opacity-100"
              )}
            >
              <span
                className={cn(
                  "flex size-10 items-center justify-center bg-transparent sm:size-16",
                  tab.center && "size-[3.25rem] sm:size-20"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${tab.icon}?v=${iconVersion}`}
                  alt=""
                  aria-hidden="true"
                  className={cn(
                    "size-7 object-contain opacity-95 sm:size-14",
                    tab.center && "size-9 drop-shadow-[0_0_16px_rgba(255,255,255,0.58)] sm:size-[4.5rem]"
                  )}
                />
              </span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
