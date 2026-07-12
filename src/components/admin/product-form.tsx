"use client";

import * as React from "react";
import { useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CATEGORY_TREE } from "@/lib/seed-data/categories";
import type { Product } from "@/generated/prisma/client";

const TOP_LEVEL = CATEGORY_TREE.filter((c) => c.parentSlug === null);

function toCsv(arr: string[]) {
  return arr.join(", ");
}
function fromCsv(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      slug: String(fd.get("slug") || ""),
      name: String(fd.get("name") || ""),
      brand: String(fd.get("brand") || ""),
      category: String(fd.get("category") || ""),
      ingredientIds: fromCsv(String(fd.get("ingredientIds") || "")),
      fullIngredients: String(fd.get("fullIngredients") || ""),
      origin: String(fd.get("origin") || ""),
      description: String(fd.get("description") || ""),
      usageSteps: String(fd.get("usageSteps") || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      imageUrl: String(fd.get("imageUrl") || ""),
      officialUrl: String(fd.get("officialUrl") || ""),
      price: fd.get("price") ? Number(fd.get("price")) : undefined,
      currency: String(fd.get("currency") || "USD"),
      skinTypes: fromCsv(String(fd.get("skinTypes") || "")),
      concerns: fromCsv(String(fd.get("concerns") || "")),
      featured: fd.get("featured") === "on",
    };

    const res = await fetch(
      product ? `/api/admin/products/${product.id}` : "/api/admin/products",
      {
        method: product ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setSaving(false);
    if (!res.ok) {
      setError("Save failed — check required fields (slug format: lowercase-with-hyphens).");
      return;
    }
    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <Card className="grid gap-4 sm:grid-cols-2">
        <Field label="Slug (url, lowercase-hyphens)">
          <Input name="slug" defaultValue={product?.slug} required />
        </Field>
        <Field label="Category">
          <select
            name="category"
            defaultValue={product?.category}
            required
            className="h-11 w-full rounded-xl border border-input bg-card px-4 text-sm"
          >
            {TOP_LEVEL.map((parent) => {
              const children = CATEGORY_TREE.filter((c) => c.parentSlug === parent.slug);
              if (children.length === 0) {
                return (
                  <option key={parent.slug} value={parent.slug}>
                    {parent.nameEn}
                  </option>
                );
              }
              return (
                <optgroup key={parent.slug} label={parent.nameEn}>
                  <option value={parent.slug}>{parent.nameEn} (generic)</option>
                  {children.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.nameEn}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
        </Field>
        <Field label="Name">
          <Input name="name" defaultValue={product?.name} required />
        </Field>
        <Field label="Brand">
          <Input name="brand" defaultValue={product?.brand} required />
        </Field>
        <Field label="Origin (brand HQ / country)">
          <Input name="origin" defaultValue={product?.origin ?? ""} />
        </Field>
        <Field label="Price">
          <Input name="price" type="number" step="0.01" defaultValue={product?.price ?? ""} />
        </Field>
        <Field label="Currency">
          <Input name="currency" defaultValue={product?.currency ?? "USD"} />
        </Field>
        <Field label="Official URL">
          <Input name="officialUrl" type="url" defaultValue={product?.officialUrl ?? ""} />
        </Field>
        <Field label="Image URL">
          <Input name="imageUrl" type="url" defaultValue={product?.imageUrl ?? ""} />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={product?.featured} />
          Featured (shown in landing page demo)
        </label>
      </Card>

      <Card className="grid gap-4">
        <Field label="Description">
          <textarea
            name="description"
            defaultValue={product?.description ?? ""}
            rows={3}
            className="w-full rounded-xl border border-input bg-card p-3 text-sm"
          />
        </Field>
        <Field label="Usage steps (one per line)">
          <textarea
            name="usageSteps"
            defaultValue={product?.usageSteps.join("\n")}
            rows={4}
            className="w-full rounded-xl border border-input bg-card p-3 text-sm"
          />
        </Field>
        <Field label="Full ingredient list (INCI, raw text)">
          <textarea
            name="fullIngredients"
            defaultValue={product?.fullIngredients ?? ""}
            rows={3}
            className="w-full rounded-xl border border-input bg-card p-3 text-sm"
          />
        </Field>
      </Card>

      <Card className="grid gap-4 sm:grid-cols-3">
        <Field label="Tracked active ingredient IDs (comma-separated, e.g. retinol, niacinamide)">
          <Input name="ingredientIds" defaultValue={toCsv(product?.ingredientIds ?? [])} />
        </Field>
        <Field label="Skin types (comma-separated: oily, dry, combination, normal, sensitive)">
          <Input name="skinTypes" defaultValue={toCsv(product?.skinTypes ?? [])} />
        </Field>
        <Field label="Concerns (comma-separated)">
          <Input name="concerns" defaultValue={toCsv(product?.concerns ?? [])} />
        </Field>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save product"}
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
