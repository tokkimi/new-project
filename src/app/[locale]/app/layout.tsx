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
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6">
          <Link href="/">
            <Logo className="h-10 w-auto sm:h-14" />
          </Link>
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
            <LocaleSwitcher compact className="sm:hidden" />
            <LocaleSwitcher className="hidden sm:inline-flex" />
            <div className="hidden min-[390px]:block">
              <ThemeToggle />
            </div>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/app/upgrade">Premium</Link>
            </Button>
            <HeaderAuthStatus />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-28 sm:px-6 sm:py-10 sm:pb-32">
        {children}
      </main>
    </div>
  );
}
