"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { LogOut, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProfileActions() {
  const t = useTranslations("profile");
  const tCommon = useTranslations("common");
  const [deleting, setDeleting] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await fetch("/api/account", { method: "DELETE" });
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <Card className="gap-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{t("language")}</p>
          <LocaleSwitcher />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{t("theme")}</p>
          <ThemeToggle />
        </div>
      </Card>

      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="size-4" />
          {t("signOutCta")}
        </Button>

        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="text-destructive hover:text-destructive">
              <Trash2 className="size-4" />
              {t("deleteAccount")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("deleteAccount")}</DialogTitle>
              <DialogDescription>{t("deleteAccountConfirm")}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                {tCommon("cancel")}
              </Button>
              <Button variant="destructive" disabled={deleting} onClick={handleDelete}>
                {t("deleteAccount")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
