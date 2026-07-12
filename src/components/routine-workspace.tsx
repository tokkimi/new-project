"use client";

import * as React from "react";
import { Camera, ChevronDown, Heart, LinkIcon, NotebookPen, Pencil, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
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

type InitialPreference = Pick<Preference, "routineSlot" | "customCategory" | "note">;
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
  const t = useTranslations("routineWorkspace");
  const [open, setOpen] = React.useState(false);

  return (
    <Card className="gap-0 overflow-hidden p-0">
      <button className="flex w-full items-center gap-3 p-3 text-left" onClick={() => setOpen((v) => !v)}>
        <ProductImage imageUrl={product.imageUrl} category={product.category} name={product.name} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{product.name}</p>
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <div className="mt-1 flex flex-wrap gap-1">
            <Badge variant="outline">{t(`routineSlot.${pref?.routineSlot ?? "both"}`)}</Badge>
            {pref?.customCategory && <Badge variant="secondary">{pref.customCategory}</Badge>}
            {pref?.favorite && <Badge>{t("favorite")}</Badge>}
          </div>
        </div>
        <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="grid gap-3 border-t border-border p-3">
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/app/product/${product.slug}`}>{t("viewSheet")}</Link>
            </Button>
            <Button
              variant={pref?.favorite ? "default" : "outline"}
              size="sm"
              onClick={() => onPref(product.id, { favorite: !pref?.favorite })}
            >
              <Heart className="size-4" /> {t("favorite")}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onRemove(product.id)}>
              <Trash2 className="size-4" /> {t("remove")}
            </Button>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <select
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={pref?.routineSlot ?? "both"}
              onChange={(e) => onPref(product.id, { routineSlot: e.target.value as Preference["routineSlot"] })}
            >
              <option value="both">{t("routineSlot.both")}</option>
              <option value="morning">{t("routineSlot.morning")}</option>
              <option value="evening">{t("routineSlot.evening")}</option>
              <option value="pause">{t("routineSlot.pause")}</option>
            </select>
            <input
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              placeholder={t("categoryPlaceholder")}
              defaultValue={pref?.customCategory ?? ""}
              onBlur={(e) => onPref(product.id, { customCategory: e.target.value || null })}
            />
          </div>
          <textarea
            className="min-h-16 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder={t("productNotePlaceholder")}
            defaultValue={pref?.note ?? ""}
            onBlur={(e) => onPref(product.id, { note: e.target.value || null })}
          />
        </div>
      )}
    </Card>
  );
}

export function RoutineWorkspace() {
  const t = useTranslations("routineWorkspace");
  const { shelf, addProduct, removeProduct } = useShelf();
  const [tab, setTab] = React.useState("routine");
  const [preferences, setPreferences] = React.useState<Record<string, Preference>>({});
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [links, setLinks] = React.useState<SavedLink[]>([]);
  const [noteDraft, setNoteDraft] = React.useState({ title: "", body: "" });
  const [editingNoteId, setEditingNoteId] = React.useState<string | null>(null);
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

  const savePref = React.useCallback((productId: string, patch: Partial<Preference>) => {
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
  }, [preferences]);

  const handleProductAdded = (product: Product, preference: InitialPreference) => {
    addProduct(product);
    savePref(product.id, preference);
    setTab("routine");
  };

  const saveNote = async () => {
    if (!noteDraft.title.trim()) return;
    const res = await fetch("/api/workspace/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingNoteId ? { ...noteDraft, id: editingNoteId } : noteDraft),
    });
    if (res.ok) {
      const data = await res.json();
      setNotes((prev) =>
        editingNoteId ? prev.map((n) => (n.id === editingNoteId ? data.note : n)) : [data.note, ...prev]
      );
      setNoteDraft({ title: "", body: "" });
      setEditingNoteId(null);
    }
  };

  const editNote = (note: Note) => {
    setEditingNoteId(note.id);
    setNoteDraft({ title: note.title, body: note.body });
  };

  const cancelNoteEdit = () => {
    setEditingNoteId(null);
    setNoteDraft({ title: "", body: "" });
  };

  const deleteNote = async (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingNoteId === id) cancelNoteEdit();
    await fetch(`/api/workspace/notes/${id}`, { method: "DELETE" }).catch(() => {});
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
    ["routine", t("tabs.routine")],
    ["favorites", t("tabs.favorites")],
    ["notes", t("tabs.notes")],
    ["links", t("tabs.links")],
  ];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-3xl">{t("title")}</h1>
          <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/app/scan">
              <Camera className="size-4" /> {t("scan")}
            </Link>
          </Button>
          <AddProductDialog existingProducts={shelf} onProductAdded={handleProductAdded} />
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

      {tab === "routine" && (
        <div className="grid gap-5">
          <RoutineContent compact />
          <section className="grid gap-3">
            <div>
              <h2 className="font-serif text-xl">{t("routineProductsTitle")}</h2>
              <p className="text-sm text-muted-foreground">{t("routineProductsText")}</p>
            </div>
            {shelf.length === 0 ? (
              <Card className="items-center gap-3 py-14 text-center">
                <p className="font-serif text-xl">{t("emptyProductsTitle")}</p>
                <p className="text-sm text-muted-foreground">{t("emptyProductsText")}</p>
                <AddProductDialog existingProducts={shelf} onProductAdded={handleProductAdded} />
              </Card>
            ) : (
              shelf.map((p) => (
                <ProductRow key={p.id} product={p} pref={preferences[p.id]} onPref={savePref} onRemove={removeProduct} />
              ))
            )}
          </section>
        </div>
      )}

      {tab === "favorites" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.length === 0 ? (
            <Card className="py-12 text-center">{t("emptyFavorites")}</Card>
          ) : (
            favorites.map((p) => (
              <Card key={p.id} className="gap-3">
                <ProductImage imageUrl={p.imageUrl} category={p.category} name={p.name} size="md" />
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-muted-foreground">{p.brand}</p>
                </div>
                {preferences[p.id]?.customCategory && <Badge>{preferences[p.id].customCategory}</Badge>}
              </Card>
            ))
          )}
        </div>
      )}

      {tab === "notes" && (
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card className="gap-3">
            <div className="flex items-center gap-2 font-medium">
              <NotebookPen className="size-4" /> {editingNoteId ? t("edit") : t("newNote")}
            </div>
            <input className="h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder={t("noteTitlePlaceholder")} value={noteDraft.title} onChange={(e) => setNoteDraft({ ...noteDraft, title: e.target.value })} />
            <textarea className="min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder={t("noteBodyPlaceholder")} value={noteDraft.body} onChange={(e) => setNoteDraft({ ...noteDraft, body: e.target.value })} />
            <div className="flex gap-2">
              <Button onClick={saveNote}><Plus className="size-4" /> {editingNoteId ? t("save") : t("add")}</Button>
              {editingNoteId && (
                <Button variant="outline" onClick={cancelNoteEdit}>{t("cancel")}</Button>
              )}
            </div>
          </Card>
          <div className="grid gap-3">
            {notes.map((n) => (
              <Card key={n.id} className="gap-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium">{n.title}</p>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => editNote(n)}
                      aria-label={t("edit")}
                      className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteNote(n.id)}
                      aria-label={t("remove")}
                      className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">{n.body}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "links" && (
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card className="gap-3">
            <div className="flex items-center gap-2 font-medium"><LinkIcon className="size-4" /> {t("saveVideo")}</div>
            <input className="h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder={t("linkTitlePlaceholder")} value={linkDraft.title} onChange={(e) => setLinkDraft({ ...linkDraft, title: e.target.value })} />
            <input className="h-10 rounded-md border border-input bg-background px-3 text-sm" placeholder={t("linkUrlPlaceholder")} value={linkDraft.url} onChange={(e) => setLinkDraft({ ...linkDraft, url: e.target.value })} />
            <textarea className="min-h-20 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder={t("linkNotePlaceholder")} value={linkDraft.note} onChange={(e) => setLinkDraft({ ...linkDraft, note: e.target.value })} />
            <Button onClick={addLink}><Plus className="size-4" /> {t("save")}</Button>
          </Card>
          <div className="grid gap-3">
            {links.map((l) => <Card key={l.id} className="gap-1"><Badge className="w-fit">{l.platform ?? t("link")}</Badge><a className="font-medium underline-offset-4 hover:underline" href={l.url} target="_blank" rel="noreferrer">{l.title}</a><p className="text-sm text-muted-foreground">{l.note}</p></Card>)}
          </div>
        </div>
      )}
    </div>
  );
}
