import { AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { AuditResult } from "@/lib/audit-engine";

export function AuditResultView({
  result,
  t,
  tCategories,
}: {
  result: AuditResult;
  t: (key: string) => string;
  tCategories: (key: string) => string;
}) {
  const missingSteps = result.issues.filter((i) => i.type === "missing_step");
  const mismatches = result.issues.filter((i) => i.type === "profile_mismatch");

  return (
    <div className="flex flex-col gap-6">
      <Card className="gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{t("scoreLabel")}</p>
          <p className="font-serif text-2xl">{result.score}/100</p>
        </div>
        <Progress
          value={result.score}
          indicatorClassName={
            result.score >= 70 ? "bg-success" : result.score >= 40 ? "bg-warning" : "bg-destructive"
          }
        />
      </Card>

      {result.issues.length === 0 ? (
        <Card className="items-center gap-2 py-10 text-center">
          <p className="font-medium">{t("noIssuesTitle")}</p>
          <p className="text-sm text-muted-foreground">{t("noIssuesText")}</p>
        </Card>
      ) : (
        <>
          {missingSteps.length > 0 && (
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-warning" />
                <h2 className="font-serif text-xl">{t("missingStepsTitle")}</h2>
              </div>
              {missingSteps.map((issue) =>
                issue.type === "missing_step" ? (
                  <Card key={issue.step} className="gap-1.5">
                    <p className="font-medium">{t(`missingStep.${issue.step}`)}</p>
                    <p className="text-sm text-muted-foreground">{t(`missingStepHint.${issue.step}`)}</p>
                  </Card>
                ) : null
              )}
            </section>
          )}

          {mismatches.length > 0 && (
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-destructive" />
                <h2 className="font-serif text-xl">{t("mismatchTitle")}</h2>
              </div>
              {mismatches.map((issue) =>
                issue.type === "profile_mismatch" ? (
                  <Card key={issue.product.id} className="gap-3">
                    <div>
                      <p className="font-medium">{issue.product.name}</p>
                      <p className="text-sm text-muted-foreground">{issue.product.brand}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{t("mismatchReason")}</p>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {t("alternativesLabel")}
                      </p>
                      {issue.alternatives.length === 0 ? (
                        <p className="text-sm text-muted-foreground">{t("noAlternatives")}</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {issue.alternatives.map((alt) => (
                            <Link key={alt.id} href={`/app/product/${alt.slug}`}>
                              <Badge variant="outline" className="cursor-pointer hover:border-primary/50">
                                {alt.name} · {tCategories(alt.category)}
                              </Badge>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                ) : null
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}
