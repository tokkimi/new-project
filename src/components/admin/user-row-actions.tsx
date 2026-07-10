"use client";

import * as React from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

type Props = {
  userId: string;
  role: "USER" | "ADMIN";
  subscriptionStatus: "NONE" | "TRIALING" | "ACTIVE" | "PAST_DUE" | "CANCELED";
};

const SUBSCRIPTION_STATUSES = ["NONE", "TRIALING", "ACTIVE", "PAST_DUE", "CANCELED"] as const;

export function UserRowActions({ userId, role, subscriptionStatus }: Props) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [busy, setBusy] = React.useState(false);

  const patch = async (data: Record<string, string>) => {
    setBusy(true);
    await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setBusy(false);
    router.refresh();
  };

  const remove = async () => {
    setBusy(true);
    await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
    setBusy(false);
    setConfirmOpen(false);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <select
        className="rounded-lg border border-border bg-card px-2 py-1 text-xs"
        value={role}
        disabled={busy}
        onChange={(e) => patch({ role: e.target.value })}
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>
      <select
        className="rounded-lg border border-border bg-card px-2 py-1 text-xs"
        value={subscriptionStatus}
        disabled={busy}
        onChange={(e) => patch({ subscriptionStatus: e.target.value })}
      >
        {SUBSCRIPTION_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive">
            <Trash2 className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this user?</DialogTitle>
            <DialogDescription>
              This permanently deletes the account and their shelf. This can&apos;t be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" disabled={busy} onClick={remove}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
