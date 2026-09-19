import { redirect } from "@/i18n/navigation";

export default async function LegacyRoutineGuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  redirect({ href: `/guides/${slug}`, locale });
}
