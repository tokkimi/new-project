import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { FaceScanClient } from "@/components/face-scan-client";

export default async function FaceScanPage() {
  const t = await getTranslations("faceScanPage");
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <Card className="mx-auto max-w-md items-center gap-4 py-14 text-center">
        <h1 className="font-serif text-2xl">{t("title")}</h1>
        <p className="text-muted-foreground">{t("signInPrompt")}</p>
        <Button asChild>
          <Link href="/sign-in?callbackUrl=%2Fapp%2Fface-scan">{t("signInCta")}</Link>
        </Button>
      </Card>
    );
  }

  return <FaceScanClient />;
}
