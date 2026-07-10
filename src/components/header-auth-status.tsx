"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function HeaderAuthStatus() {
  const t = useTranslations("nav");
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="size-8 rounded-full bg-muted" />;
  }

  if (session?.user) {
    const initial = (session.user.name ?? session.user.email ?? "?").charAt(0).toUpperCase();
    return (
      <Link
        href="/app/profile"
        className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"
        title={session.user.name ?? session.user.email ?? undefined}
      >
        {initial}
      </Link>
    );
  }

  return (
    <Button asChild size="sm" variant="ghost">
      <Link href="/sign-in">
        <User className="size-4" />
        {t("signIn")}
      </Link>
    </Button>
  );
}
