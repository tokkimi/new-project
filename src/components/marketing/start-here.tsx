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
  return <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16" aria-labelledby="start-title">
    <h2 id="start-title" className="text-3xl">{t("startTitle")}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{t("startSubtitle")}</p>
    <div className="mt-7 grid gap-4 md:grid-cols-3">{actions.map(({ key, href, icon: Icon }, i) => <Link href={href} key={key} className="haru-glass group rounded-3xl p-6 transition-shadow hover:shadow-lg">
      <div className="flex items-center justify-between"><span className="haru-icon-disc flex size-11 items-center justify-center rounded-2xl"><Icon className="size-5" aria-hidden="true" /></span><span className="text-xs text-muted-foreground">0{i + 1}</span></div>
      <h3 className="mt-5 flex items-center justify-between gap-3 text-lg font-medium">{t(`${key}Title`)}<ArrowUpRight className="size-4 shrink-0" aria-hidden="true" /></h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{t(`${key}Text`)}</p>
    </Link>)}</div>
  </section>;
}
