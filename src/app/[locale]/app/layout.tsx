import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { HeaderAuthStatus } from "@/components/header-auth-status";
import { Button } from "@/components/ui/button";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-secondary/30">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between gap-4 px-6">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <LocaleSwitcher compact className="sm:hidden" />
            <LocaleSwitcher className="hidden sm:inline-flex" />
            <ThemeToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/app/upgrade">Premium</Link>
            </Button>
            <HeaderAuthStatus />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 pb-28 sm:pb-32">
        {children}
      </main>
    </div>
  );
}
