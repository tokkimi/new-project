"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSignup() {
  const t = useTranslations("newsletterSignup");
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "done" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStatus(res.ok ? "done" : "error");
  };

  if (status === "done") {
    return (
      <p className="flex items-center gap-1.5 text-sm text-success">
        <Check className="size-4" />
        {t("done")}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-xs gap-2">
      <Input
        type="email"
        required
        placeholder={t("placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" disabled={status === "loading"}>
        {t("cta")}
      </Button>
    </form>
  );
}
