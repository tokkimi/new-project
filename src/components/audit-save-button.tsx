"use client";

import * as React from "react";
import { Check, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuditSaveButton({ label, savedLabel }: { label: string; savedLabel: string }) {
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/audit/save", { method: "POST" });
    setSaving(false);
    if (res.ok) setSaved(true);
  };

  return (
    <Button type="button" size="sm" variant={saved ? "outline" : "default"} disabled={saving || saved} onClick={save}>
      {saved ? <Check className="size-4" /> : <Save className="size-4" />}
      {saved ? savedLabel : label}
    </Button>
  );
}
