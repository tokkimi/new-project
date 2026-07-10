"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { DEMO_SHELF, type Product } from "@/data/ingredients";
import { findProduct } from "@/data/catalog";

const STORAGE_KEY = "haru:shelf";

// --- Guest mode: shelf persisted in localStorage, no account required. ---

let guestState: Product[] = DEMO_SHELF;
let guestInitialized = false;
const guestListeners = new Set<() => void>();

function loadFromStorage(): Product[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : DEMO_SHELF;
  } catch {
    return DEMO_SHELF;
  }
}

function ensureGuestInitialized() {
  if (!guestInitialized) {
    guestState = loadFromStorage();
    guestInitialized = true;
  }
}

function persistGuest() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(guestState));
}

function emitGuest() {
  for (const listener of guestListeners) listener();
}

function subscribeGuest(listener: () => void) {
  guestListeners.add(listener);
  return () => guestListeners.delete(listener);
}

function getGuestSnapshot() {
  ensureGuestInitialized();
  return guestState;
}

function getServerSnapshot() {
  return DEMO_SHELF;
}

function addGuestProduct(product: Product) {
  ensureGuestInitialized();
  if (guestState.some((p) => p.id === product.id)) return;
  guestState = [...guestState, product];
  persistGuest();
  emitGuest();
}

function removeGuestProduct(id: string) {
  ensureGuestInitialized();
  guestState = guestState.filter((p) => p.id !== id);
  persistGuest();
  emitGuest();
}

function resetGuestToDemo() {
  guestState = DEMO_SHELF;
  persistGuest();
  emitGuest();
}

function clearGuestShelf() {
  guestState = [];
  persistGuest();
  emitGuest();
}

function useGuestShelf() {
  const shelf = React.useSyncExternalStore(subscribeGuest, getGuestSnapshot, getServerSnapshot);
  return {
    shelf,
    addProduct: (p: Product) => addGuestProduct(p),
    removeProduct: (id: string) => removeGuestProduct(id),
    resetToDemo: resetGuestToDemo,
  };
}

/**
 * Called once right after sign-in: pushes whatever the guest had in
 * localStorage into their new account, then clears the local copy so a
 * later sign-out starts from a clean guest shelf instead of duplicating it.
 */
export async function importGuestShelf() {
  ensureGuestInitialized();
  const productIds = guestState.map((p) => p.id);
  if (productIds.length === 0) return;

  try {
    await fetch("/api/shelf/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productIds }),
    });
  } finally {
    clearGuestShelf();
  }
}

// --- Signed-in mode: shelf persisted server-side via /api/shelf. ---

function useDbShelf(enabled: boolean) {
  const [shelf, setShelf] = React.useState<Product[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    fetch("/api/shelf")
      .then((res) => (res.ok ? res.json() : { productIds: [] }))
      .then(({ productIds }: { productIds: string[] }) => {
        if (cancelled) return;
        setShelf(productIds.map(findProduct).filter((p): p is Product => !!p));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  const addProduct = React.useCallback((product: Product) => {
    setShelf((prev) => (prev.some((p) => p.id === product.id) ? prev : [...prev, product]));
    fetch("/api/shelf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    }).catch(() => {});
  }, []);

  const removeProduct = React.useCallback((id: string) => {
    setShelf((prev) => prev.filter((p) => p.id !== id));
    fetch(`/api/shelf/${id}`, { method: "DELETE" }).catch(() => {});
  }, []);

  return { shelf, loaded, addProduct, removeProduct, resetToDemo: () => {} };
}

export function useShelf() {
  const { status } = useSession();
  const guest = useGuestShelf();
  const db = useDbShelf(status === "authenticated");

  return status === "authenticated" ? db : guest;
}
