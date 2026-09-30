"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Camera,
  Droplets,
  LinkIcon,
  NotebookPen,
  Pencil,
  Play,
  Plus,
  Trash2,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/product-image";
import { AddProductDialog } from "@/components/add-product-dialog";
import { RoutineContent, RoutineDiagnostics } from "@/components/routine-content";
import { TipOfTheDay } from "@/components/tip-of-the-day";
import { IngredientExposurePanel } from "@/components/ingredient-exposure-panel";
import { WeeklyRhythmPanel } from "@/components/weekly-rhythm-panel";
import { ReactionJournal } from "@/components/reaction-journal";
import { RoutineProtocolPanel } from "@/components/routine-protocol-panel";
import { useShelf } from "@/lib/shelf-store";
import type { Product } from "@/generated/prisma/client";

type Preference = {
  productId: string;
  favorite: boolean;
  routineSlot: "morning" | "evening" | "both" | "pause";
  customCategory: string | null;
  note: string | null;
  purchasedAt: string | null;
  expiresAt: string | null;
  openedAt: string | null;
  paoMonths: number | null;
};

type InitialPreference = Pick<Preference, "routineSlot" | "customCategory" | "note">;
type Note = { id: string; title: string; body: string };
type SavedLink = { id: string; title: string; url: string; platform: string | null; note: string | null };
type EmbedInfo = { src: string; thumbnail?: string };
type SkinProfileSummary = {
  skinType: string;
  concerns: string[];
  sensitivities: string[];
  ageRange: string | null;
  climate: string | null;
  waterIntake: string | null;
  sleepHours: string | null;
  stressLevel: string | null;
  sunExposure: string | null;
  exerciseFrequency: string | null;
};

const FIELD_CLASS =
  "h-10 rounded-xl border border-border bg-white/[0.035] px-3 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30";
const TEXTAREA_CLASS =
  "rounded-xl border border-border bg-white/[0.035] px-3 py-2 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30";

function SkinPassportPanel({ profile }: { profile: SkinProfileSummary | null }) {
  const t = useTranslations("routineWorkspace.reliability");
  const tSkin = useTranslations("skinTypes");
  const tConcerns = useTranslations("concerns");
  const tSens = useTranslations("sensitivities");
  const tClimate = useTranslations("climates");
  const tLifestyle = useTranslations("report.lifestyle");
  const { data: session } = useSession();
  const safe = (fn: () => string, fallback: string) => {
    try {
      return fn();
    } catch {
      return fallback;
    }
  };
  const initial = (session?.user?.name ?? session?.user?.email ?? "H").charAt(0).toUpperCase();
  const profileImage = session?.user?.image;
  const details = profile
    ? [
        { label: t("skinType"), value: safe(() => tSkin(profile.skinType), profile.skinType) },
        profile.ageRange ? { label: t("age"), value: profile.ageRange } : null,
        profile.concerns.length
          ? { label: t("concerns"), value: profile.concerns.map((c) => safe(() => tConcerns(c), c)).join(", ") }
          : null,
        profile.sensitivities.length
          ? {
              label: t("sensitivities"),
              value: profile.sensitivities.map((s) => safe(() => tSens(s), s)).join(", "),
            }
          : null,
        profile.climate ? { label: t("climate"), value: safe(() => tClimate(profile.climate!), profile.climate) } : null,
        profile.waterIntake
          ? { label: t("hydration"), value: safe(() => tLifestyle(`water.${profile.waterIntake}`), profile.waterIntake) }
          : null,
        profile.sleepHours
          ? { label: t("sleep"), value: safe(() => tLifestyle(`sleep.${profile.sleepHours}`), profile.sleepHours) }
          : null,
        profile.stressLevel
          ? { label: t("stress"), value: safe(() => tLifestyle(`stress.${profile.stressLevel}`), profile.stressLevel) }
          : null,
        profile.sunExposure
          ? { label: t("sunExposure"), value: safe(() => tLifestyle(`sun.${profile.sunExposure}`), profile.sunExposure) }
          : null,
        profile.exerciseFrequency
          ? { label: t("sport"), value: safe(() => tLifestyle(`exercise.${profile.exerciseFrequency}`), profile.exerciseFrequency) }
          : null,
      ].filter((item): item is { label: string; value: string } => Boolean(item))
    : [];

  return (
    <section className="grid gap-4">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">{t("passport")}</p>
          <h2 className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">{t("passportTitle")}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("passportIntro")}</p>
          <Button asChild variant="outline" className="mt-5 w-fit border-border bg-transparent text-foreground hover:bg-white/8">
            <Link href="/app/quiz">
              <Droplets className="size-4" /> {t("skinTypeExerciseCta")}
            </Link>
          </Button>
      </div>

      <Card className="grid gap-4 p-5 sm:grid-cols-[auto_1fr] sm:p-6">
        <div className="flex shrink-0 flex-col items-center gap-3">
          <div className="flex size-24 items-center justify-center overflow-hidden rounded-full border border-border bg-white/[0.025] text-4xl font-medium text-foreground sm:size-28">
          {profileImage ? (
            <Image src={profileImage} alt="" width={112} height={112} className="size-full object-cover" unoptimized />
          ) : (
            initial
          )}
          </div>
          <Button asChild variant="outline"><Link href="/app/quiz">{t("generatePassport")}</Link></Button>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">{t("passport")}</p>
          {profile ? (
            <div className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
              {details.map((item) => (
                <div key={item.label} className="border-b border-border pb-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
                  <p className="mt-1 text-sm leading-5 text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("noSkinProfile")}</p>
          )}
        </div>
      </Card>
    </section>
  );
}

function embedInfo(rawUrl: string): EmbedInfo | null {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.toLowerCase();

    if (host.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id
        ? { src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`, thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg` }
        : null;
    }

    if (host.includes("youtube.com")) {
      const id = url.searchParams.get("v") ?? url.pathname.match(/\/shorts\/([^/?]+)/)?.[1];
      return id
        ? { src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`, thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg` }
        : null;
    }

    if (host.includes("instagram.com")) {
      const path = url.pathname.replace(/\/$/, "");
      if (/\/(p|reel|tv)\//.test(path)) return { src: `https://www.instagram.com${path}/embed` };
    }

    if (host.includes("tiktok.com")) {
      const id = url.pathname.match(/video\/(\d+)/)?.[1];
      return id ? { src: `https://www.tiktok.com/embed/v2/${id}` } : null;
    }
  } catch {
    return null;
  }

  return null;
}

function SavedVideoCard({ link }: { link: SavedLink }) {
  const t = useTranslations("routineWorkspace");
  const embed = embedInfo(link.url);
  const [playing, setPlaying] = React.useState(!embed?.thumbnail);

  return (
    <Card className="gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium">{link.title}</p>
        <Badge className="w-fit">{link.platform ?? t("link")}</Badge>
      </div>
      {embed ? (
        <div className="overflow-hidden rounded-2xl border border-border bg-transparent">
          {embed.thumbnail && !playing ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="relative block aspect-video w-full overflow-hidden text-left"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={embed.thumbnail}
                alt=""
                className="h-full w-full object-cover"
                onError={(event) => {
                  const img = event.currentTarget;
                  if (img.src.includes("hqdefault")) img.src = img.src.replace("hqdefault", "mqdefault");
                }}
              />
              <span className="absolute inset-0 bg-black/18" />
              <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/30 text-white backdrop-blur-md">
                <Play className="ml-0.5 size-6 fill-current" />
              </span>
            </button>
          ) : (
            <iframe
              src={embed.src}
              title={link.title}
              className="aspect-video w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-white/[0.025] p-4 text-sm text-muted-foreground">
          {t("embedUnavailable")}
        </div>
      )}
      {link.note && <p className="text-sm text-muted-foreground">{link.note}</p>}
    </Card>
  );
}

export function RoutineWorkspace() {
  const t = useTranslations("routineWorkspace");
  const tProtocol = useTranslations("protocol");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const { shelf, addProduct } = useShelf();
  const requestedTab = searchParams.get("tab");
  const [tab, setTab] = React.useState(() => requestedTab === "links" || requestedTab === "lab" ? requestedTab : "routine");
  const [preferences, setPreferences] = React.useState<Record<string, Preference>>({});
  const [profile, setProfile] = React.useState<SkinProfileSummary | null>(null);
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
        setProfile(data.profile ?? null);
        setNotes(data.notes);
        setLinks(data.links);
      })
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    if (requestedTab === "links" || requestedTab === "lab") setTab(requestedTab);
  }, [requestedTab]);

  const savePref = React.useCallback((productId: string, patch: Partial<Preference>) => {
    const base: Preference = {
      productId,
      favorite: false,
      routineSlot: "both",
      customCategory: null,
      note: null,
      purchasedAt: null,
      expiresAt: null,
      openedAt: null,
      paoMonths: null,
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
    ["analysis", t("tabs.analysis")],
    ["reactions", t("tabs.reactions")],
    ["favorites", t("tabs.favorites")],
    ["notes", t("tabs.notes")],
    ["links", t("tabs.links")],
    ["lab", tProtocol("title")],
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl min-w-0 flex-col gap-6 overflow-hidden">
      <div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-3xl">{t("title")}</h1>
          <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="flex min-w-0 flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/app/scan">
              <Camera className="size-4" /> {t("scan")}
            </Link>
          </Button>
        </div>
      </div>

      <TipOfTheDay locale={locale} label={t("tipOfTheDay")} />

      <div className="no-scrollbar flex min-w-0 gap-1 overflow-x-auto rounded-full border border-border bg-transparent p-1 backdrop-blur-xl">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${tab === id ? "border border-border bg-white/[0.035] text-foreground" : "text-muted-foreground hover:bg-white/[0.025] hover:text-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "routine" && (
        <div className="grid min-w-0 gap-5">
          <SkinPassportPanel profile={profile} />
          {shelf.length === 0 ? (
            <Card className="items-center gap-3 py-14 text-center">
              <p className="font-serif text-xl">{t("emptyProductsTitle")}</p>
              <p className="text-sm text-muted-foreground">{t("emptyProductsText")}</p>
              <AddProductDialog existingProducts={shelf} onProductAdded={handleProductAdded} />
            </Card>
          ) : (
            <RoutineContent compact showDiagnostics={false} preferences={preferences} onPref={savePref} />
          )}
        </div>
      )}

      {tab === "analysis" && (
        <div className="grid min-w-0 gap-5">
          <RoutineDiagnostics preferences={preferences} />
          <IngredientExposurePanel
            items={shelf.map((p) => ({
              ingredientIds: p.ingredientIds,
              slot: preferences[p.id]?.routineSlot ?? "both",
            }))}
          />
          {shelf.length > 0 && (
            <WeeklyRhythmPanel
              shelfActiveIds={Array.from(new Set(shelf.flatMap((p) => p.ingredientIds)))}
              locale={locale}
            />
          )}
        </div>
      )}

      {tab === "reactions" && <ReactionJournal products={shelf} />}

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
            <input className={FIELD_CLASS} placeholder={t("noteTitlePlaceholder")} value={noteDraft.title} onChange={(e) => setNoteDraft({ ...noteDraft, title: e.target.value })} />
            <textarea className={`${TEXTAREA_CLASS} min-h-32`} placeholder={t("noteBodyPlaceholder")} value={noteDraft.body} onChange={(e) => setNoteDraft({ ...noteDraft, body: e.target.value })} />
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
                      className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-white/8 hover:text-foreground"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteNote(n.id)}
                      aria-label={t("remove")}
                      className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-white/8 hover:text-foreground"
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
            <input className={FIELD_CLASS} placeholder={t("linkTitlePlaceholder")} value={linkDraft.title} onChange={(e) => setLinkDraft({ ...linkDraft, title: e.target.value })} />
            <input className={FIELD_CLASS} placeholder={t("linkUrlPlaceholder")} value={linkDraft.url} onChange={(e) => setLinkDraft({ ...linkDraft, url: e.target.value })} />
            <textarea className={`${TEXTAREA_CLASS} min-h-20`} placeholder={t("linkNotePlaceholder")} value={linkDraft.note} onChange={(e) => setLinkDraft({ ...linkDraft, note: e.target.value })} />
            <Button onClick={addLink}><Plus className="size-4" /> {t("save")}</Button>
          </Card>
          <div className="grid gap-3">
            {links.map((link) => (
              <SavedVideoCard key={link.id} link={link} />
            ))}
          </div>
        </div>
      )}

      {tab === "lab" && <RoutineProtocolPanel products={shelf} />}
    </div>
  );
}
