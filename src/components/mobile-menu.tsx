"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type NavItem = { href: string; label: string };

export function MobileMenu({ navItems }: { navItems: NavItem[] }) {
  const t = useTranslations("nav");
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Menu">
          <Menu className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        showClose={false}
        className="top-0 left-0 right-0 translate-x-0 translate-y-0 rounded-none border-0 border-b border-border sm:hidden data-[state=open]:slide-in-from-top-4"
      >
        <div className="flex items-center justify-between">
          <p className="font-serif text-lg">Haru</p>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-muted"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {navItems.length > 0 && (
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        <Button asChild size="lg" onClick={() => setOpen(false)}>
          <Link href="/app/shelf">{t("tryApp")}</Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
