import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import { isMailConfigured } from "@/lib/mail";
import { NewsletterComposer } from "@/components/admin/newsletter-composer";
import { NewsletterCampaignRow } from "@/components/admin/newsletter-campaign-row";

export default async function AdminNewsletterPage() {
  const [campaigns, subscriberCount] = await Promise.all([
    db.newsletter.findMany({ orderBy: { createdAt: "desc" } }),
    db.newsletterSubscriber.count(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl">Newsletter</h1>
        <p className="mt-1 text-muted-foreground">
          {subscriberCount} subscribers
          {!isMailConfigured() && " — sending disabled until RESEND_API_KEY is set"}
        </p>
      </div>

      {!isMailConfigured() && (
        <Card className="flex-row items-center gap-3 border-warning/30 bg-warning/5">
          <Mail className="size-5 shrink-0 text-warning" />
          <p className="text-sm text-muted-foreground">
            Drafts can be created now. To actually send, set{" "}
            <code className="rounded bg-muted px-1">RESEND_API_KEY</code> (and optionally{" "}
            <code className="rounded bg-muted px-1">NEWSLETTER_FROM_EMAIL</code>) as environment
            variables.
          </p>
        </Card>
      )}

      <NewsletterComposer />

      <div className="flex flex-col gap-3">
        {campaigns.map((c) => (
          <NewsletterCampaignRow key={c.id} campaign={c} />
        ))}
        {campaigns.length === 0 && (
          <p className="text-sm text-muted-foreground">No campaigns yet.</p>
        )}
      </div>
    </div>
  );
}
