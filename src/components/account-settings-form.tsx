"use client";

import * as React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AccountSettingsForm({ name, email }: { name: string | null; email: string }) {
  const [form, setForm] = React.useState({
    name: name ?? "",
    email,
    currentPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = React.useState("");

  const save = async () => {
    setMessage("");
    const payload: Record<string, string> = { name: form.name, email: form.email };
    if (form.newPassword) {
      payload.currentPassword = form.currentPassword;
      payload.newPassword = form.newPassword;
    }
    const res = await fetch("/api/account/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setMessage(res.ok ? "Paramètres enregistrés." : "Impossible d'enregistrer ces changements.");
    if (res.ok) setForm((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
  };

  return (
    <Card className="gap-4">
      <div>
        <h2 className="font-serif text-xl">Informations du compte</h2>
        <p className="text-sm text-muted-foreground">Nom, email de connexion et mot de passe.</p>
      </div>
      <label className="grid gap-1 text-sm">
        Nom
        <input className="h-10 rounded-md border border-input bg-background px-3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </label>
      <label className="grid gap-1 text-sm">
        Email
        <input className="h-10 rounded-md border border-input bg-background px-3" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          Mot de passe actuel
          <input type="password" className="h-10 rounded-md border border-input bg-background px-3" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} />
        </label>
        <label className="grid gap-1 text-sm">
          Nouveau mot de passe
          <input type="password" className="h-10 rounded-md border border-input bg-background px-3" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
        </label>
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={save}><Save className="size-4" /> Enregistrer</Button>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </Card>
  );
}
