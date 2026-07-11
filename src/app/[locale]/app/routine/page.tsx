import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { RoutineContent } from "@/components/routine-content";

export default async function RoutinePage() {
  const session = await auth();

  if (!session?.user?.id) {
    const t = await getTranslations("routinePage");
    return (
      <Card className="mx-auto max-w-md items-center gap-4 py-14 text-center">
        <h1 className="font-serif text-2xl">{t("title")}</h1>
        <p className="text-muted-foreground">{t("signInPrompt")}</p>
        <Button asChild>
          <Link href="/sign-in">{t("signInCta")}</Link>
        </Button>
      </Card>
    );
  }

  return <RoutineContent />;
}
