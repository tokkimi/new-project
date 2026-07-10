import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            Haru décode les ingrédients de ta routine skincare pour t&apos;éviter
            les mauvaises combinaisons — et le gaspillage.
          </p>
        </div>
        <div className="flex gap-8 text-sm text-muted-foreground">
          <Link href="/app/shelf" className="hover:text-foreground">
            L&apos;app
          </Link>
          <a href="#ingredients" className="hover:text-foreground">
            Ingrédients
          </a>
          <a href="#comment-ca-marche" className="hover:text-foreground">
            Comment ça marche
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Haru. Fait avec attention, sans blabla marketing.
      </div>
    </footer>
  );
}
