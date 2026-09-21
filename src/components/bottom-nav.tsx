"use client";
import { useTranslations } from "next-intl";
import { BookOpen, ShoppingBag, ClipboardCheck, Flower2, ListChecks } from "lucide-react";
import { useSession } from "next-auth/react";
import { Link, usePathname } from "@/i18n/navigation";

export function BottomNav() {
  const t = useTranslations("nav");
  const ux = useTranslations("homeUx");
  const pathname = usePathname();
  const { status } = useSession();
  const isPublic = pathname === "/" || pathname.startsWith("/guides") || pathname.startsWith("/learn");
  if (!isPublic && !pathname.startsWith("/app")) return null;
  const tabs = [
    { href: "/guides", label: ux("guides"), icon: BookOpen },
    { href: "/app/audit", label: t("audit"), icon: ClipboardCheck },
    ...(status === "authenticated" ? [{ href: "/app/shelf", label: t("myRoutine"), icon: ListChecks }] : []),
    { href: "/app/products", label: t("products"), icon: ShoppingBag },
    { href: "/app/wellness", label: t("wellness"), icon: Flower2 },
  ];
  return <nav aria-label={ux("navigation")} className="haru-bottom-nav fixed inset-x-3 bottom-3 z-40 mx-auto max-w-xl rounded-[26px]">
    <div className="flex items-center p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">{tabs.map(({href,label,icon:Icon}) => {
      const active = pathname.startsWith(href);
      const personal = href === "/app/shelf";
      return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[10px] font-medium sm:text-xs ${personal ? "bg-[#253f39] text-white shadow-sm" : active ? "haru-tab-active" : ""}`}><Icon className="size-5" aria-hidden="true" /><span>{label}</span></Link>;
    })}</div>
  </nav>;
}
