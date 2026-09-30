import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-transparent">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
        <p className="font-serif text-base tracking-[0.18em] text-foreground">HARU</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <Link href="/app/shelf" className="hover:text-foreground">
            {t("app")}
          </Link>
          <Link href="/app/ingredients" className="hover:text-foreground">
            {t("ingredients")}
          </Link>
          <Link href="/legal" className="hover:text-foreground">
            {t("legal")}
          </Link>
        </div>
      </div>
      <div className="px-6 pb-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Haru Skin · {t("swissBase")}
      </div>
    </footer>
  );
}
