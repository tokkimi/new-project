import { getTranslations } from "next-intl/server";
import { AlertTriangle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

function Placeholder({ label, text }: { label: string; text: string }) {
  return (
    <div className="mt-1 flex items-start gap-2 rounded-xl border border-dashed border-am/50 bg-am/10 p-3 text-sm">
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-am-foreground" />
      <p>
        <span className="font-medium text-am-foreground">{label}: </span>
        {text}
      </p>
    </div>
  );
}

export default async function LegalPage() {
  const t = await getTranslations("legal");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-serif text-4xl">{t("title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>

        <div className="mt-10 space-y-12 text-sm leading-7 text-muted-foreground">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-foreground">{t("noticeTitle")}</h2>
            <p>{t("noticeIntro")}</p>
            <div>
              <p className="font-medium text-foreground">{t("noticePublisherLabel")}</p>
              <Placeholder label={t("placeholderBadge")} text={t("noticePublisherPlaceholder")} />
            </div>
            <div>
              <p className="font-medium text-foreground">{t("noticeDirectorLabel")}</p>
              <Placeholder label={t("placeholderBadge")} text={t("noticeDirectorPlaceholder")} />
            </div>
            <div>
              <p className="font-medium text-foreground">{t("noticeHostingLabel")}</p>
              <p>{t("noticeHostingText")}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">{t("noticeContactLabel")}</p>
              <Placeholder label={t("placeholderBadge")} text={t("noticeContactPlaceholder")} />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl text-foreground">{t("termsTitle")}</h2>
            <p>{t("termsIntro")}</p>
            {[
              ["termsServiceTitle", "termsServiceText"],
              ["termsPriceTitle", "termsPriceText"],
              ["termsPaymentTitle", "termsPaymentText"],
              ["termsDurationTitle", "termsDurationText"],
              ["termsWithdrawalTitle", "termsWithdrawalText"],
              ["termsRefundTitle", "termsRefundText"],
            ].map(([titleKey, textKey]) => (
              <div key={titleKey}>
                <p className="font-medium text-foreground">{t(titleKey)}</p>
                <p>{t(textKey)}</p>
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl text-foreground">{t("privacyTitle")}</h2>
            <p>{t("privacyIntro")}</p>
            {[
              ["privacyDataTitle", "privacyDataText"],
              ["privacyScanTitle", "privacyScanText"],
              ["privacySubprocessorsTitle", "privacySubprocessorsText"],
              ["privacyRightsTitle", "privacyRightsText"],
              ["privacyRetentionTitle", "privacyRetentionText"],
            ].map(([titleKey, textKey]) => (
              <div key={titleKey}>
                <p className="font-medium text-foreground">{t(titleKey)}</p>
                <p>{t(textKey)}</p>
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl text-foreground">{t("cookiesTitle")}</h2>
            <p>{t("cookiesIntro")}</p>
            {[
              ["cookiesEssentialTitle", "cookiesEssentialText"],
              ["cookiesOptionalTitle", "cookiesOptionalText"],
            ].map(([titleKey, textKey]) => (
              <div key={titleKey}>
                <p className="font-medium text-foreground">{t(titleKey)}</p>
                <p>{t(textKey)}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground">{t("responsibilityTitle")}</h2>
            <p>{t("responsibilityText")}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground">{t("contactTitle")}</h2>
            <p>{t("contactText")}</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
