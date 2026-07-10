"use client";

import * as React from "react";
import { useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SeoForm() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      path: String(fd.get("path") || ""),
      locale: String(fd.get("locale") || ""),
      title: String(fd.get("title") || ""),
      description: String(fd.get("description") || ""),
      ogImage: String(fd.get("ogImage") || ""),
    };

    const res = await fetch("/api/admin/seo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (!res.ok) {
      setError("Save failed — check the path/locale.");
      return;
    }
    (e.target as HTMLFormElement).reset();
    router.refresh();
  };

  return (
    <Card className="gap-4">
      <h2 className="font-serif text-lg">Add / update a page&apos;s SEO</h2>
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Path (e.g. /, /app/shelf)</span>
          <Input name="path" required placeholder="/" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Locale</span>
          <select name="locale" required className="h-11 rounded-xl border border-input bg-card px-4 text-sm">
            <option value="en">en</option>
            <option value="ko">ko</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
          <span className="font-medium">Title override</span>
          <Input name="title" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
          <span className="font-medium">Description override</span>
          <textarea name="description" rows={2} className="w-full rounded-xl border border-input bg-card p-3 text-sm" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
          <span className="font-medium">OG image URL</span>
          <Input name="ogImage" type="url" />
        </label>
        {error && <p className="text-sm text-destructive sm:col-span-2">{error}</p>}
        <Button type="submit" disabled={saving} className="w-fit">
          {saving ? "Saving..." : "Save"}
        </Button>
      </form>
    </Card>
  );
}
