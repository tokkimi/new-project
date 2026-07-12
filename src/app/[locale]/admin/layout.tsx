import { getLocale } from "next-intl/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "@/i18n/navigation";
import { isAdmin } from "@/lib/entitlements";
import { AdminNav } from "@/components/admin/admin-nav";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/logo";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    redirect({ href: "/sign-in", locale });
    return;
  }

  const user = await db.user.findUnique({ where: { id: userId }, select: { role: true, subscriptionStatus: true } });
  if (!isAdmin(user)) {
    redirect({ href: "/app/shelf", locale });
    return;
  }

  return (
    <div className="flex min-h-screen flex-col bg-secondary/30">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo />
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              Admin
            </span>
          </Link>
          <AdminNav />
          <Link href="/app/shelf" className="text-sm text-muted-foreground hover:text-foreground">
            Exit admin
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>
    </div>
  );
}
