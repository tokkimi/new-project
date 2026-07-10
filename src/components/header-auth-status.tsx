"use client";

import { useTranslations } from "next-intl";
import { User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function HeaderAuthStatus() {
  const t = useTranslations("nav");

  return (
    <Button asChild size="sm" variant="ghost">
      <Link href="/sign-in">
        <User className="size-4" />
        {t("signIn")}
      </Link>
    </Button>
  );
}
