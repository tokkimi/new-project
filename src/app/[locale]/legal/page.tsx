import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function LegalPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-serif text-4xl">Informations légales</h1>
        <div className="mt-8 space-y-8 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="font-serif text-2xl text-foreground">Éditeur</h2>
            <p>Haru est édité par une société digitale basée en Suisse. Les informations de contact complètes peuvent être demandées depuis l&apos;espace support ou l&apos;administration du site.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-foreground">Objet du service</h2>
            <p>Haru aide les utilisateurs à organiser leurs produits beauté, leurs notes, leurs routines et leurs liens de contenus. Les contenus proposés sont informatifs et ne remplacent pas un avis médical, dermatologique ou pharmaceutique.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-foreground">Protection des données</h2>
            <p>Les données de compte, produits sauvegardés, notes, liens et préférences sont utilisées pour fournir le service demandé. Le traitement s&apos;appuie sur la Loi fédérale suisse sur la protection des données et, lorsque nécessaire pour des visiteurs situés dans l&apos;Union européenne, sur les principes du RGPD.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-foreground">Cookies</h2>
            <p>Les cookies strictement nécessaires permettent la connexion, la sécurité et les préférences essentielles. Les autres cookies sont soumis au choix de l&apos;utilisateur. Le refus doit rester aussi simple que l&apos;acceptation, conformément aux bonnes pratiques rappelées par le FDPIC suisse et les autorités européennes.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-foreground">Responsabilité</h2>
            <p>L&apos;utilisateur reste responsable du choix et de l&apos;utilisation de ses produits. En cas d&apos;irritation, d&apos;allergie, de grossesse, de traitement médical ou de doute, il faut demander conseil à un professionnel de santé.</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
