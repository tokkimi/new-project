"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AdminDeleteButton } from "@/components/admin/admin-delete-button";
import type { Newsletter } from "@/generated/prisma/client";

export function NewsletterCampaignRow({ campaign }: { campaign: Newsletter }) {
  const router = useRouter();
  const [sending, setSending] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const send = async () => {
    setSending(true);
    setMessage(null);
    const res = await fetch(`/api/admin/newsletter/${campaign.id}/send`, { method: "POST" });
    setSending(false);

    if (res.status === 503) {
      setMessage("Resend isn't configured yet (RESEND_API_KEY missing).");
      return;
    }
    if (!res.ok) {
      setMessage("Send failed.");
      return;
    }
    const data = await res.json();
    setMessage(`Sent to ${data.sentTo} subscribers.`);
    router.refresh();
  };

  return (
    <Card className="gap-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="font-medium">{campaign.subject}</p>
          <p className="text-xs text-muted-foreground">
            {new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(
              campaign.createdAt
            )}
          </p>
        </div>
        <Badge variant={campaign.status === "sent" ? "success" : "secondary"}>
          {campaign.status}
        </Badge>
      </div>
      {campaign.status !== "sent" && (
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={send} disabled={sending}>
            <Send className="size-4" />
            {sending ? "Sending..." : "Send now"}
          </Button>
          <AdminDeleteButton
            endpoint={`/api/admin/newsletter/${campaign.id}`}
            redirectTo="/admin/newsletter"
            title="Delete this draft?"
          />
        </div>
      )}
      {message && <p className="text-xs text-muted-foreground">{message}</p>}
    </Card>
  );
}
