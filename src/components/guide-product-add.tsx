"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const copy = {
  fr: { add: "Ajouter à ma routine", added: "Ajouté", signIn: "Se connecter pour ajouter" },
  en: { add: "Add to my routine", added: "Added", signIn: "Sign in to add" },
  ko: { add: "내 루틴에 추가", added: "추가됨", signIn: "로그인 후 추가" },
  ja: { add: "マイルーティンに追加", added: "追加済み", signIn: "ログインして追加" },
} as const;

export function GuideProductAdd({ productId }: { productId: string }) {
  const { status } = useSession();
  const locale = useLocale() as keyof typeof copy;
  const t = copy[locale] ?? copy.en;
  const [added, setAdded] = useState(false);
  const [saving, setSaving] = useState(false);
  if (status !== "authenticated") return <Button asChild size="sm" variant="outline"><Link href="/sign-in">{t.signIn}</Link></Button>;
  return <Button size="sm" variant="outline" disabled={added || saving} onClick={async () => { setSaving(true); const res = await fetch("/api/shelf", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId }) }); setAdded(res.ok); setSaving(false); }}>{added ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}{added ? t.added : t.add}</Button>;
}
