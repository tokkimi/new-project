import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link, redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { AuditResultView } from "@/components/audit-result-view";
import type { AuditResult } from "@/lib/audit-engine";

export default async function AuditHistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const session = await auth();

  if (!session?.user?.id) {
    redirect({ href: "/sign-in", locale });
    return;
  }

  const run = await db.auditRun.findUnique({ where: { id } });
  if (!run || run.userId !== session.user.id) notFound();

  const t = await getTranslations("auditPage");
  const tCategories = await getTranslations("categories");
  const tProfile = await getTranslations("profile");

  const result = run.result as unknown as AuditResult;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Link href="/app/profile" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        {tProfile("tabs.audits")}
      </Link>

      <div>
        <h1 className="font-serif text-3xl">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", {
            dateStyle: "full",
          }).format(run.createdAt)}
        </p>
      </div>

      <AuditResultView result={result} t={t} tCategories={tCategories} />
    </div>
  );
}
