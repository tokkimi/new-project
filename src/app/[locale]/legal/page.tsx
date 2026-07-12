import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default async function LegalPage() {
  const t = await getTranslations("legal");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-serif text-4xl">{t("title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-8 space-y-8 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="font-serif text-2xl text-foreground">{t("privacyTitle")}</h2>
            <p>{t("privacyText")}</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-foreground">{t("cookiesTitle")}</h2>
            <p>{t("cookiesText")}</p>
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
