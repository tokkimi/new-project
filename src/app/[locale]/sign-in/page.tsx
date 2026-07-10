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

export default function SignInPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!result || result.error) {
      setError(t("errorInvalidCredentials"));
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
            <h1 className="font-serif text-2xl">{t("signIn")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("signInSubtitle")}</p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="flex items-center gap-1.5 text-sm text-destructive">
                <AlertCircle className="size-4 shrink-0" />
                {error}
              </p>
            )}

            <Button type="submit" disabled={loading} className="mt-1">
              {loading ? t("signIn") + "..." : t("signInCta")}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {t("noAccount")}{" "}
            <Link href="/sign-up" className="font-medium text-primary hover:underline">
              {t("createOne")}
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
