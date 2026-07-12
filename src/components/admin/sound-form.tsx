"use client";

import * as React from "react";
import { useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Sound } from "@/generated/prisma/client";

const SYNTHESIS_MODES = ["white", "pink", "rain", "ocean", "calm432", "soft528"] as const;

export function SoundForm({ sound }: { sound?: Sound }) {
  const router = useRouter();
  const [sourceType, setSourceType] = React.useState<"synthesis" | "url">(
    (sound?.sourceType as "synthesis" | "url") ?? "synthesis"
  );
  const [error, setError] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      slug: String(fd.get("slug") || ""),
      labelEn: String(fd.get("labelEn") || ""),
      labelKo: String(fd.get("labelKo") || ""),
      descriptionEn: String(fd.get("descriptionEn") || ""),
      descriptionKo: String(fd.get("descriptionKo") || ""),
      sourceType,
      synthesisMode: sourceType === "synthesis" ? String(fd.get("synthesisMode") || "") : undefined,
      audioUrl: sourceType === "url" ? String(fd.get("audioUrl") || "") : undefined,
      order: fd.get("order") ? Number(fd.get("order")) : 0,
      active: fd.get("active") === "on",
    };

    const res = await fetch(sound ? `/api/admin/sounds/${sound.id}` : "/api/admin/sounds", {
      method: sound ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (!res.ok) {
      setError("Save failed — check required fields (slug format: lowercase-with-hyphens).");
      return;
    }
    router.push("/admin/sounds");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <Card className="grid gap-4 sm:grid-cols-2">
        <Field label="Slug (lowercase-hyphens)">
          <Input name="slug" defaultValue={sound?.slug} required />
        </Field>
        <Field label="Order (lower shows first)">
          <Input name="order" type="number" min={0} defaultValue={sound?.order ?? 0} />
        </Field>
        <Field label="Label (English)">
          <Input name="labelEn" defaultValue={sound?.labelEn} required />
        </Field>
        <Field label="Label (Korean)">
          <Input name="labelKo" defaultValue={sound?.labelKo} required />
        </Field>
        <Field label="Description (English)">
          <Input name="descriptionEn" defaultValue={sound?.descriptionEn} required />
        </Field>
        <Field label="Description (Korean)">
          <Input name="descriptionKo" defaultValue={sound?.descriptionKo} required />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked={sound?.active ?? true} />
          Active (shown on the wellness page)
        </label>
      </Card>

      <Card className="grid gap-4">
        <Field label="Source">
          <select
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value as "synthesis" | "url")}
            className="h-11 w-full rounded-xl border border-input bg-card px-4 text-sm"
          >
            <option value="synthesis">Built-in synthesis (generated in the browser)</option>
            <option value="url">Hosted audio file (URL)</option>
          </select>
        </Field>

        {sourceType === "synthesis" ? (
          <Field label="Synthesis mode">
            <select
              name="synthesisMode"
              defaultValue={sound?.synthesisMode ?? "white"}
              className="h-11 w-full rounded-xl border border-input bg-card px-4 text-sm"
            >
              {SYNTHESIS_MODES.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </Field>
        ) : (
          <Field label="Audio file URL (mp3/ogg, must loop cleanly)">
            <Input name="audioUrl" type="url" defaultValue={sound?.audioUrl ?? ""} placeholder="https://..." />
          </Field>
        )}
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save sound"}
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
