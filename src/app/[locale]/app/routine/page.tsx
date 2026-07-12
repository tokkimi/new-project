import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

export default async function RoutinePage() {
  const locale = await getLocale();
  redirect({ href: "/app/profile", locale });
}
