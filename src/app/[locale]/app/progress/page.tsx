import { redirect } from "@/i18n/navigation";

export default async function ProgressRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/app/profile", locale });
}
