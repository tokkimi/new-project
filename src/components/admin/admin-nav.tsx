"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/sounds", label: "Sounds" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/logs", label: "Logs" },
];

function isActive(pathname: string | null, href: string) {
  return href === "/admin" ? pathname === "/admin" : !!pathname?.startsWith(href);
}

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const current = TABS.find((tab) => isActive(pathname, tab.href))?.href ?? "/admin";

  return (
    <>
      <select
        aria-label="Admin section"
        value={current}
        onChange={(e) => router.push(e.target.value)}
        className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm font-medium md:hidden"
      >
        {TABS.map((tab) => (
          <option key={tab.href} value={tab.href}>
            {tab.label}
          </option>
        ))}
      </select>

      <nav className="hidden items-center gap-1 rounded-full bg-muted p-1 md:flex">
        {TABS.map((tab) => {
          const active = isActive(pathname, tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
