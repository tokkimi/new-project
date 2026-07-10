"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import type { Product } from "@/generated/prisma/client";

const STORAGE_KEY = "haru:shelf:v2"; // v2 = stores product IDs, not full snapshots

let catalogCache: Product[] | null = null;
let catalogPromise: Promise<Product[]> | null = null;

async function loadCatalog(): Promise<Product[]> {
  if (catalogCache) return catalogCache;
  if (!catalogPromise) {
    catalogPromise = fetch("/api/products")
      .then((res) => (res.ok ? res.json() : { products: [] }))
      .then(({ products }: { products: Product[] }) => {
        catalogCache = products;
        return products;
      })
      .catch(() => []);
  }
  return catalogPromise;
}

// --- Guest mode: a set of product IDs persisted in localStorage. ---

function loadGuestIds(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function persistGuestIds(ids: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

function useGuestShelf() {
  const [catalog, setCatalog] = React.useState<Product[]>([]);
  const [ids, setIds] = React.useState<string[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    loadCatalog().then((products) => {
      if (cancelled) return;
      setCatalog(products);

      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === null) {
        // First visit ever: seed with the curated starter set so the app
        // demonstrates value immediately instead of showing an empty shelf.
        const starter = products.filter((p) => p.featured).map((p) => p.id);
        setIds(starter);
        persistGuestIds(starter);
      } else {
        setIds(loadGuestIds());
      }
      setHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const shelf = React.useMemo(
    () => ids.map((id) => catalog.find((p) => p.id === id)).filter((p): p is Product => !!p),
    [ids, catalog]
  );

  const addProduct = React.useCallback((product: Product) => {
    setIds((prev) => {
      if (prev.includes(product.id)) return prev;
      const next = [...prev, product.id];
      persistGuestIds(next);
      return next;
    });
    setCatalog((prev) => (prev.some((p) => p.id === product.id) ? prev : [...prev, product]));
  }, []);

  const removeProduct = React.useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.filter((pid) => pid !== id);
      persistGuestIds(next);
      return next;
    });
  }, []);

  return { shelf, loaded: hydrated, addProduct, removeProduct };
}

/**
 * Called once right after sign-in: pushes whatever the guest had in
 * localStorage into their new account, then clears the local copy so a
 * later sign-out starts from a clean guest shelf instead of duplicating it.
 */
export async function importGuestShelf() {
  const ids = loadGuestIds();
  if (ids.length === 0) return;

  try {
    await fetch("/api/shelf/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productIds: ids }),
    });
  } finally {
    persistGuestIds([]);
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
      .then((res) => (res.ok ? res.json() : { products: [] }))
      .then(({ products }: { products: Product[] }) => {
        if (cancelled) return;
        setShelf(products);
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

  return { shelf, loaded, addProduct, removeProduct };
}

export function useShelf() {
  const { status } = useSession();
  const guest = useGuestShelf();
  const db = useDbShelf(status === "authenticated");

  return status === "authenticated" ? db : guest;
}

/** Full product catalog (for pickers, scan mock, etc.) — cached across calls. */
export function useCatalog() {
  const [catalog, setCatalog] = React.useState<Product[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    loadCatalog().then((products) => {
      if (!cancelled) {
        setCatalog(products);
        setLoaded(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { catalog, loaded };
}
