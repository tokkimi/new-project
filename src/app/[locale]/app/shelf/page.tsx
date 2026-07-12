"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoutineWorkspace } from "@/components/routine-workspace";

export default function ShelfPage() {
  const { status } = useSession();
  const t = useTranslations("shelf");

  if (status !== "authenticated") {
    return (
      <Card className="mx-auto max-w-md items-center gap-4 py-14 text-center">
        <h1 className="font-serif text-2xl">{t("workspaceTitle")}</h1>
        <p className="max-w-sm text-muted-foreground">{t("workspaceSignInText")}</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link href="/sign-in">{t("signInCta")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-up">{t("signUpCta")}</Link>
          </Button>
        </div>
      </Card>
    );
  }

  return <RoutineWorkspace />;
}
