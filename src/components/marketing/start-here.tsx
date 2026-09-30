import { ArrowUpRight, ScanFace, SlidersHorizontal, Layers3 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
const actions = [
  { key: "profile", href: "/app/quiz", icon: SlidersHorizontal },
  { key: "scan", href: "/app/scan", icon: ScanFace },
  { key: "shelf", href: "/app/shelf", icon: Layers3 },
] as const;
export function StartHere() {
  const t = useTranslations("homeUx");
  return <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12" aria-labelledby="start-title">
    <h2 id="start-title" className="text-2xl">{t("startTitle")}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{t("startSubtitle")}</p>
    <div className="haru-start-cards mt-5 grid grid-cols-3 gap-2.5 sm:gap-4">{actions.map(({ key, href, icon: Icon }) => <Link href={href} key={key} className="haru-glass haru-start-card group transition-shadow hover:shadow-lg">
      <span className="haru-icon-disc flex size-9 items-center justify-center rounded-xl"><Icon className="size-4" aria-hidden="true" /></span>
      <h3 className="mt-3 flex items-center justify-between gap-2 text-sm font-medium">{t(`${key}Title`)}<ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" /></h3><p className="mt-1.5 text-xs leading-5 text-muted-foreground">{t(`${key}Text`)}</p>
    </Link>)}</div>
  </section>;
}
