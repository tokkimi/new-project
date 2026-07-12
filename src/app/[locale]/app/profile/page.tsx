import { getTranslations, getLocale } from "next-intl/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { ProfileActions } from "@/components/profile-actions";
import { AccountSettingsForm } from "@/components/account-settings-form";

export default async function ProfilePage() {
  const session = await auth();
  const locale = await getLocale();

  const userId = session?.user?.id;
  if (!userId) {
    redirect({ href: "/sign-in", locale });
    return;
  }

  const [user, shelfCount] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, createdAt: true },
    }),
    db.shelfItem.count({ where: { userId } }),
  ]);

  if (!user) {
    redirect({ href: "/sign-in", locale });
    return;
  }

  const t = await getTranslations("profile");
  const memberSince = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
  }).format(user.createdAt);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl">Paramètres</h1>
        <p className="mt-1 text-muted-foreground">Compte, préférences, sécurité et accès.</p>
      </div>

      <Card className="gap-4">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary text-xl font-medium text-primary-foreground">
            {(user.name ?? user.email).charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{user.name ?? user.email}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
          <p>{t("memberSince", { date: memberSince })}</p>
          <p>{t("shelfCount", { count: shelfCount })}</p>
        </div>
      </Card>

      <AccountSettingsForm name={user.name} email={user.email} />

      <ProfileActions />
    </div>
  );
}
