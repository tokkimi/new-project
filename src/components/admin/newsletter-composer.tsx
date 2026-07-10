"use client";

import * as React from "react";
import { useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function NewsletterComposer() {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: String(fd.get("subject") || ""),
        bodyHtml: String(fd.get("bodyHtml") || ""),
      }),
    });

    setSaving(false);
    if (!res.ok) {
      setError("Could not save draft.");
      return;
    }
    (e.target as HTMLFormElement).reset();
    router.refresh();
  };

  return (
    <Card className="gap-4">
      <h2 className="font-serif text-lg">New campaign</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Subject</span>
          <Input name="subject" required />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Body (HTML)</span>
          <textarea
            name="bodyHtml"
            required
            rows={8}
            className="w-full rounded-xl border border-input bg-card p-3 font-mono text-xs"
            placeholder="<p>Hello!</p>"
          />
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={saving} className="w-fit">
          {saving ? "Saving..." : "Save as draft"}
        </Button>
      </form>
    </Card>
  );
}
