import { Check, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

const premiumBenefits = [
  "Audit complet de ta routine et des associations à surveiller",
  "Passeport de peau et recommandations plus personnelles",
  "Suivi de progression, rapports et outils bien-être",
];

export function SubscriptionPreview() {
  return (
    <section className="border-y border-border/70 bg-[#080707] py-20 text-foreground sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-7 px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="max-w-xl">
          <div className="mb-5 flex items-center gap-2 text-sm font-medium text-primary"><Crown className="size-4" /> Haru Premium</div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">Ta routine mérite plus qu&apos;une liste de produits.</h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">Commence gratuitement, puis active les analyses et le suivi qui transforment ta routine en décisions simples, au fil de ta peau.</p>
          <Button asChild size="lg" className="mt-7 rounded-full px-6"><Link href="/app/upgrade">Voir l&apos;abonnement <Sparkles className="size-4" /></Link></Button>
        </div>
        <Card className="gap-5 rounded-[2rem] border-border bg-white/[0.06] p-6 shadow-[0_22px_70px_-45px_rgba(0,0,0,0.8)] sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><p className="text-sm text-muted-foreground">Premium</p><p className="mt-1 text-2xl font-semibold">L&apos;analyse qui suit ta peau</p></div><Crown className="size-7 text-primary" /></div>
          <ul className="grid gap-4">{premiumBenefits.map((benefit) => <li key={benefit} className="flex gap-3 text-sm leading-6"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-3" /></span>{benefit}</li>)}</ul>
          <p className="border-t border-border pt-4 text-xs leading-5 text-muted-foreground">Sans diagnostic médical. Les conseils restent à adapter à ton ressenti et à un professionnel si nécessaire.</p>
        </Card>
      </div>
    </section>
  );
}
