"use client";

import * as React from "react";
import { useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { NewsItem } from "@/generated/prisma/client";

const CATEGORIES = ["innovation", "launch", "ingredient-trend", "brand-news", "award"] as const;

export function NewsForm({ item }: { item?: NewsItem }) {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      category: String(fd.get("category") || ""),
      title: String(fd.get("title") || ""),
      summary: String(fd.get("summary") || ""),
      sourceName: String(fd.get("sourceName") || ""),
      sourceUrl: String(fd.get("sourceUrl") || ""),
      imageUrl: String(fd.get("imageUrl") || ""),
      featured: fd.get("featured") === "on",
      publishedAt: String(fd.get("publishedAt") || ""),
    };

    const res = await fetch(item ? `/api/admin/news/${item.id}` : "/api/admin/news", {
      method: item ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (!res.ok) {
      setError("Save failed — check required fields.");
      return;
    }
    router.push("/admin/news");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <Card className="grid gap-4 sm:grid-cols-2">
        <Field label="Category">
          <select
            name="category"
            defaultValue={item?.category}
            required
            className="h-11 w-full rounded-xl border border-input bg-card px-4 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Published date">
          <Input
            name="publishedAt"
            type="date"
            defaultValue={item?.publishedAt.toISOString().slice(0, 10)}
            required
          />
        </Field>
        <Field label="Source name">
          <Input name="sourceName" defaultValue={item?.sourceName ?? ""} />
        </Field>
        <Field label="Source URL">
          <Input name="sourceUrl" type="url" defaultValue={item?.sourceUrl ?? ""} />
        </Field>
        <Field label="Image URL">
          <Input name="imageUrl" type="url" defaultValue={item?.imageUrl ?? ""} />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={item?.featured} />
          Featured
        </label>
      </Card>

      <Card className="grid gap-4">
        <Field label="Title">
          <Input name="title" defaultValue={item?.title} required />
        </Field>
        <Field label="Summary">
          <textarea
            name="summary"
            defaultValue={item?.summary}
            rows={4}
            required
            className="w-full rounded-xl border border-input bg-card p-3 text-sm"
          />
        </Field>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={saving} className="w-fit">
        {saving ? "Saving..." : "Save news item"}
      </Button>
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
