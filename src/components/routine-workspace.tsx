"use client";

import * as React from "react";
import { Camera, Heart, LinkIcon, NotebookPen, Plus, Trash2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/product-image";
import { AddProductDialog } from "@/components/add-product-dialog";
import { RoutineContent } from "@/components/routine-content";
import { useShelf } from "@/lib/shelf-store";
import type { Product } from "@/generated/prisma/client";

type Preference = {
  productId: string;
  favorite: boolean;
  routineSlot: "morning" | "evening" | "both" | "pause";
  customCategory: string | null;
  note: string | null;
};

type Note = { id: string; title: string; body: string };
type SavedLink = { id: string; title: string; url: string; platform: string | null; note: string | null };

function ProductRow({
  product,
  pref,
  onPref,
  onRemove,
}: {
  product: Product;
  pref?: Preference;
  onPref: (productId: string, patch: Partial<Preference>) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <Card className="grid gap-4 p-3 sm:grid-cols-[96px_1fr]">
      <ProductImage imageUrl={product.imageUrl} category={product.category} name={product.name} size="sm" />
      <div className="min-w-0 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/app/product/${product.slug}`} className="min-w-0">
            <p className="truncate font-medium">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.brand}</p>
          </Link>
          <div className="flex gap-1">
            <Button
              variant={pref?.favorite ? "default" : "outline"}
              size="icon"
              title="Favori"
              onClick={() => onPref(product.id, { favorite: !pref?.favorite })}
            >
              <Heart className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Retirer" onClick={() => onRemove(product.id)}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <select
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={pref?.routineSlot ?? "both"}
            onChange={(e) => onPref(product.id, { routineSlot: e.target.value as Preference["routineSlot"] })}
          >
            <option value="both">Matin et soir</option>
            <option value="morning">Matin</option>
            <option value="evening">Soir</option>
            <option value="pause">En pause</option>
          </select>
          <input
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            placeholder="Catégorie perso: acne, glow, makeup..."
            defaultValue={pref?.customCategory ?? ""}
            onBlur={(e) => onPref(product.id, { customCategory: e.target.value || null })}
          />
        </div>
        <textarea
          className="min-h-16 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Note sur ce produit, réaction, fréquence, ordre..."
          defaultValue={pref?.note ?? ""}
          onBlur={(e) => onPref(product.id, { note: e.target.value || null })}
        />
      </div>
    </Card>
  );
}

export function RoutineWorkspace() {
  const { shelf, removeProduct } = useShelf();
  const [tab, setTab] = React.useState("routine");
  const [preferences, setPreferences] = React.useState<Record<string, Preference>>({});
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [links, setLinks] = React.useState<SavedLink[]>([]);
  const [noteDraft, setNoteDraft] = React.useState({ title: "", body: "" });
  const [linkDraft, setLinkDraft] = React.useState({ title: "", url: "", note: "" });

  React.useEffect(() => {
    fetch("/api/workspace")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        setPreferences(Object.fromEntries(data.preferences.map((p: Preference) => [p.productId, p])));
        setNotes(data.notes);
        setLinks(data.links);
      })
      .catch(() => {});
  }, []);

  const savePref = (productId: string, patch: Partial<Preference>) => {
    const base: Preference = {
      productId,
      favorite: false,
      routineSlot: "both",
      customCategory: null,
      note: null,
    };
    const next = { ...base, ...preferences[productId], ...patch };
    setPreferences((prev) => ({ ...prev, [productId]: next }));
    fetch("/api/workspace/product-preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    }).catch(() => {});
  };

  const addNote = async () => {
    if (!noteDraft.title.trim()) return;
    const res = await fetch("/api/workspace/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteDraft),
    });
    if (res.ok) {
      const data = await res.json();
      setNotes((prev) => [data.note, ...prev]);
      setNoteDraft({ title: "", body: "" });
    }
  };

  const addLink = async () => {
    if (!linkDraft.title.trim() || !linkDraft.url.trim()) return;
    const res = await fetch("/api/workspace/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(linkDraft),
    });
    if (res.ok) {
      const data = await res.json();
      setLinks((prev) => [data.link, ...prev]);
      setLinkDraft({ title: "", url: "", note: "" });
    }
  };

  const favorites = shelf.filter((p) => preferences[p.id]?.favorite);
  const tabs = [
    ["routine", "Routine"],
    ["products", "Produits"],
    ["favorites", "Favoris"],
    ["notes", "Notes"],
    ["links", "Vidéos"],
  ];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-3xl">Mon espace routine</h1>
          <p className="mt-1 text-muted-foreground">
            Produits, favoris, routine matin/soir, notes et vidéos beauté au même endroit.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/app/scan"><Camera className="size-4" /> Scanner</Link>
          </Button>
          <AddProductDialog />
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto rounded-full bg-muted p-1">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${tab === id ? "bg-card shadow-sm" : "text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "routine" && <RoutineContent compact />}

      {tab === "products" && (
        <div className="grid gap-3">
          {shelf.length === 0 ? (
            <Card className="items-center gap-3 py-14 text-center">
              <p className="font-serif text-xl">Aucun produit enregistré</p>
              <p className="text-sm text-muted-foreground">Ajoute tes produits depuis le catalogue ou le scan.</p>
              <AddProductDialog />
            </Card>
          ) : (
            shelf.map((p) => (
              <ProductRow key={p.id} product={p} pref={preferences[p.id]} onPref={savePref} onRemove={removeProduct} />
            ))
          )}
        </div>
      )}

      {tab === "favorites" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.length === 0 ? <Card className="py-12 text-center">Aucun favori pour le moment.</Card> : favorites.map((p) => (
            <Card key={p.id} className="gap-3">
              <ProductImage imageUrl={p.imageUrl} category={p.category} name={p.name} size="md" />
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.brand}</p>
              </div>
              {preferences[p.id]?.customCategory && <Badge>{preferences[p.id].customCategory}</Badge>}
            </Card>
          ))}
        </div>
      )}

      {tab === "notes" && (
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card className="gap-3">
            <div className="flex items-center gap-2 font-medium"><NotebookPen className="size-4" /> Nouvelle note</div>
            <input className="h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder="Titre" value={noteDraft.title} onChange={(e) => setNoteDraft({ ...noteDraft, title: e.target.value })} />
            <textarea className="min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Routine, réaction, idée makeup..." value={noteDraft.body} onChange={(e) => setNoteDraft({ ...noteDraft, body: e.target.value })} />
            <Button onClick={addNote}><Plus className="size-4" /> Ajouter</Button>
          </Card>
          <div className="grid gap-3">
            {notes.map((n) => <Card key={n.id} className="gap-1"><p className="font-medium">{n.title}</p><p className="whitespace-pre-wrap text-sm text-muted-foreground">{n.body}</p></Card>)}
          </div>
        </div>
      )}

      {tab === "links" && (
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card className="gap-3">
            <div className="flex items-center gap-2 font-medium"><LinkIcon className="size-4" /> Sauvegarder une vidéo</div>
            <input className="h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder="Titre" value={linkDraft.title} onChange={(e) => setLinkDraft({ ...linkDraft, title: e.target.value })} />
            <input className="h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder="Lien YouTube, Instagram, TikTok..." value={linkDraft.url} onChange={(e) => setLinkDraft({ ...linkDraft, url: e.target.value })} />
            <textarea className="min-h-20 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Pourquoi tu veux garder cette routine ?" value={linkDraft.note} onChange={(e) => setLinkDraft({ ...linkDraft, note: e.target.value })} />
            <Button onClick={addLink}><Plus className="size-4" /> Enregistrer</Button>
          </Card>
          <div className="grid gap-3">
            {links.map((l) => <Card key={l.id} className="gap-1"><Badge className="w-fit">{l.platform ?? "Lien"}</Badge><a className="font-medium underline-offset-4 hover:underline" href={l.url} target="_blank" rel="noreferrer">{l.title}</a><p className="text-sm text-muted-foreground">{l.note}</p></Card>)}
          </div>
        </div>
      )}
    </div>
  );
}
