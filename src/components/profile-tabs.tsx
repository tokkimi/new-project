"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Camera, ClipboardCheck, LineChart, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AccountSettingsForm } from "@/components/account-settings-form";
import { ProfileActions } from "@/components/profile-actions";

type ScanRow = { id: string; createdAt: string; overallScore: number; summary: string | null };
type BilanRow = { id: string; createdAt: string; overallScore: number };

function scoreTone(score: number) {
  if (score >= 70) return "success" as const;
  if (score >= 40) return "warning" as const;
  return "destructive" as const;
}

export function ProfileTabs({
  scans,
  bilans,
  name,
  email,
}: {
  scans: ScanRow[];
  bilans: BilanRow[];
  name: string | null;
  email: string;
}) {
  const t = useTranslations("profile");
  const locale = useLocale();
  const [tab, setTab] = React.useState("scans");

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));

  const tabs: [string, string][] = [
    ["scans", t("tabs.scans")],
    ["audits", t("tabs.audits")],
    ["progress", t("tabs.progress")],
    ["account", t("tabs.account")],
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-1 overflow-x-auto rounded-full bg-muted p-1">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
              tab === id ? "bg-card shadow-sm" : "text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "scans" && (
        <Card className="rounded-[1.5rem]">
          <div className="flex items-center gap-2">
            <Camera className="size-5 text-primary" />
            <h2 className="font-serif text-xl">{t("tabs.scans")}</h2>
          </div>
          {scans.length === 0 ? (
            <p className="text-sm leading-6 text-muted-foreground">{t("scansEmpty")}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {scans.map((scan) => (
                <Link
                  key={scan.id}
                  href={`/app/face-scan/history/${scan.id}`}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{formatDate(scan.createdAt)}</p>
                    {scan.summary && <p className="mt-0.5 truncate text-xs text-muted-foreground">{scan.summary}</p>}
                  </div>
                  <Badge variant={scoreTone(scan.overallScore)} className="shrink-0">
                    {t("scoreLabel")} {scan.overallScore}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
          <Button asChild className="self-start">
            <Link href="/app/face-scan">{t("startScan")}</Link>
          </Button>
        </Card>
      )}

      {tab === "audits" && (
        <Card className="rounded-[1.5rem]">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="size-5 text-primary" />
            <h2 className="font-serif text-xl">{t("tabs.audits")}</h2>
          </div>
          {bilans.length === 0 ? (
            <p className="text-sm leading-6 text-muted-foreground">{t("auditsEmpty")}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {bilans.map((bilan) => (
                <Link
                  key={bilan.id}
                  href={`/app/bilan/history/${bilan.id}`}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary"
                >
                  <p className="text-sm font-medium">{formatDate(bilan.createdAt)}</p>
                  <Badge variant={scoreTone(bilan.overallScore)} className="shrink-0">
                    {t("scoreLabel")} {bilan.overallScore}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
          <Button asChild className="self-start">
            <Link href="/app/audit">{t("openAudit")}</Link>
          </Button>
        </Card>
      )}

      {tab === "progress" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="rounded-[1.5rem]">
            <LineChart className="size-5 text-primary" />
            <h2 className="font-serif text-xl">{t("compareTitle")}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{t("compareText")}</p>
          </Card>
          <Card className="rounded-[1.5rem]">
            <ShieldCheck className="size-5 text-primary" />
            <h2 className="font-serif text-xl">{t("routineChangesTitle")}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{t("routineChangesText")}</p>
          </Card>
        </div>
      )}

      {tab === "account" && (
        <div className="flex flex-col gap-4">
          <AccountSettingsForm name={name} email={email} />
          <ProfileActions />
        </div>
      )}
    </div>
  );
}
