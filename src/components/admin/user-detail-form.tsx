"use client";

import * as React from "react";
import { useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Props = {
  userId: string;
  name: string | null;
  email: string;
  role: "USER" | "ADMIN";
  subscriptionStatus: "NONE" | "TRIALING" | "ACTIVE" | "PAST_DUE" | "CANCELED";
  faceScanCredits: number;
  newsletterSubscribed: boolean;
};

const SUBSCRIPTION_STATUSES = ["NONE", "TRIALING", "ACTIVE", "PAST_DUE", "CANCELED"] as const;

export function UserDetailForm({
  userId,
  name,
  email,
  role,
  subscriptionStatus,
  faceScanCredits,
  newsletterSubscribed,
}: Props) {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      role: String(fd.get("role") || "USER"),
      subscriptionStatus: String(fd.get("subscriptionStatus") || "NONE"),
      faceScanCredits: Number(fd.get("faceScanCredits") || 0),
      newsletterSubscribed: fd.get("newsletterSubscribed") === "on",
    };

    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (!res.ok) {
      setError("Save failed — check the email is valid and not already used.");
      return;
    }
    setSaved(true);
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Card className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <Input name="name" defaultValue={name ?? ""} />
        </Field>
        <Field label="Email">
          <Input name="email" type="email" defaultValue={email} required />
        </Field>
        <Field label="Role">
          <select
            name="role"
            defaultValue={role}
            className="h-11 w-full rounded-xl border border-input bg-card px-4 text-sm"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </Field>
        <Field label="Subscription (ACTIVE = premium)">
          <select
            name="subscriptionStatus"
            defaultValue={subscriptionStatus}
            className="h-11 w-full rounded-xl border border-input bg-card px-4 text-sm"
          >
            {SUBSCRIPTION_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Face scan credits (one-time purchases, unused when subscription is ACTIVE)">
          <Input name="faceScanCredits" type="number" min={0} defaultValue={faceScanCredits} />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="newsletterSubscribed" defaultChecked={newsletterSubscribed} />
          Newsletter subscribed
        </label>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {saved && <p className="text-sm text-primary">Saved.</p>}

      <div>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}
