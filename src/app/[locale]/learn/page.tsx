import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SkinLearning } from "@/components/skin-learning";
import { skinLessons } from "@/lib/skin-lessons";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "learn" });
  return { title: `${t("title")} | Haru Skin`, description: t("description") };
}
export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("learn");
  return <div className="haru-public haru-learning flex flex-1 flex-col"><SiteHeader /><main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-5 py-12 sm:px-8 sm:py-16"><h1 className="max-w-4xl text-3xl leading-tight sm:text-5xl">{t("title")}</h1><p className="mb-10 mt-5 max-w-2xl leading-7 text-muted-foreground">{t("description")}</p><SkinLearning lessons={skinLessons(locale)} /><p className="mt-8 max-w-3xl text-xs leading-6 text-muted-foreground">{t("note")}</p></main><SiteFooter /></div>;
}
