"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { AlertCircle } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { Logo } from "@/components/logo";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { importGuestShelf } from "@/lib/shelf-store";

export default function SignUpPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError(t("errorWeakPassword"));
      return;
    }
    if (password !== confirmPassword) {
      setError(t("errorGeneric"));
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    if (!res.ok) {
      setLoading(false);
      if (res.status === 409) {
        setError(t("errorEmailTaken"));
      } else {
        setError(t("errorGeneric"));
      }
      return;
    }

    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (!result || result.error) {
      setError(t("errorGeneric"));
      return;
    }

    await importGuestShelf();
    router.push("/app/shelf");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-6 py-16">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <Link href="/">
          <Logo />
        </Link>
        <Card className="w-full gap-5">
          <div>
            <h1 className="font-serif text-2xl">{t("signUp")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("signUpSubtitle")}</p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                {t("name")}
              </label>
              <Input
                id="name"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                {t("email")}
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium">
                {t("password")}
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                {t("confirmPassword")}
              </label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="flex items-center gap-1.5 text-sm text-destructive">
                <AlertCircle className="size-4 shrink-0" />
                {error}
              </p>
            )}

            <Button type="submit" disabled={loading} className="mt-1">
              {loading ? t("signUp") + "..." : t("signUpCta")}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {t("hasAccount")}{" "}
            <Link href="/sign-in" className="font-medium text-primary hover:underline">
              {t("signInInstead")}
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
