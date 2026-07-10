import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">{t("tagline")}</p>
        </div>
        <div className="flex gap-8 text-sm text-muted-foreground">
          <Link href="/app/shelf" className="hover:text-foreground">
            {t("app")}
          </Link>
          <a href="#ingredients" className="hover:text-foreground">
            {t("ingredients")}
          </a>
          <a href="#how-it-works" className="hover:text-foreground">
            {t("howItWorks")}
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {t("rights")}
      </div>
    </footer>
  );
}
