import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { HeaderAuthStatus } from "@/components/header-auth-status";
import { Button } from "@/components/ui/button";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <header className="sticky top-0 z-40 bg-white/[0.025] backdrop-blur-[2px] dark:bg-black/[0.025]">
        <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6">
          <div className="absolute left-4 flex items-center sm:left-6">
            <LocaleSwitcher compact className="sm:hidden" />
            <LocaleSwitcher className="hidden sm:inline-flex" />
          </div>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Logo className="h-10 w-auto sm:h-14" />
          </Link>
          <div className="w-16 sm:w-32" />
          <div className="ml-auto flex min-w-0 items-center gap-1.5 sm:gap-3">
            <div>
              <ThemeToggle />
            </div>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/app/upgrade">Premium</Link>
            </Button>
            <HeaderAuthStatus />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl min-w-0 flex-1 overflow-x-hidden px-4 py-6 pb-28 sm:px-6 sm:py-10 sm:pb-32">
        {children}
      </main>
    </div>
  );
}
