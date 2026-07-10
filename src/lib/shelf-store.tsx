"use client";

import * as React from "react";
import { DEMO_SHELF, type Product } from "@/data/ingredients";

const STORAGE_KEY = "haru:shelf";

let state: Product[] = DEMO_SHELF;
let initialized = false;
const listeners = new Set<() => void>();

function loadFromStorage(): Product[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : DEMO_SHELF;
  } catch {
    return DEMO_SHELF;
  }
}

function ensureInitialized() {
  if (!initialized) {
    state = loadFromStorage();
    initialized = true;
  }
}

function persist() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  ensureInitialized();
  return state;
}

function getServerSnapshot() {
  return DEMO_SHELF;
}

function addProduct(product: Product) {
  ensureInitialized();
  if (state.some((p) => p.id === product.id)) return;
  state = [...state, product];
  persist();
  emit();
}

function removeProduct(id: string) {
  ensureInitialized();
  state = state.filter((p) => p.id !== id);
  persist();
  emit();
}

function resetToDemo() {
  state = DEMO_SHELF;
  persist();
  emit();
}

export function useShelf() {
  const shelf = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { shelf, addProduct, removeProduct, resetToDemo };
}
