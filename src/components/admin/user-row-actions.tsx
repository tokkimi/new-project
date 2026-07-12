"use client";

import * as React from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const PLAN_LABEL: Record<Props["subscriptionStatus"], string> = {
  NONE: "Free",
  TRIALING: "Trial",
  ACTIVE: "Premium",
  PAST_DUE: "Payment issue",
  CANCELED: "Canceled",
};

const PLAN_BADGE: Record<Props["subscriptionStatus"], "success" | "secondary" | "warning" | "destructive"> = {
  NONE: "secondary",
  TRIALING: "warning",
  ACTIVE: "success",
  PAST_DUE: "warning",
  CANCELED: "destructive",
};

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

  const isPremium = subscriptionStatus === "ACTIVE";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        className="rounded-lg border border-border bg-card px-2 py-1 text-xs"
        value={role}
        disabled={busy}
        onChange={(e) => patch({ role: e.target.value })}
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>

      <Badge variant={PLAN_BADGE[subscriptionStatus]}>{PLAN_LABEL[subscriptionStatus]}</Badge>

      <Button
        type="button"
        size="sm"
        variant={isPremium ? "outline" : "default"}
        disabled={busy}
        onClick={() => patch({ subscriptionStatus: isPremium ? "NONE" : "ACTIVE" })}
      >
        {isPremium ? "Remove premium" : "Make premium"}
      </Button>

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
