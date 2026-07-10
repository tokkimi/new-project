"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONFLICT_RULES } from "@/data/ingredients";
import { findProduct } from "@/data/catalog";
import { severityMeta } from "@/lib/routine-engine";
import type { VariantProps } from "class-variance-authority";

export default function ConflictDetailPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const rule = CONFLICT_RULES.find((r) => r.id === params.id);
  const productA = findProduct(searchParams.get("a") ?? "");
  const productB = findProduct(searchParams.get("b") ?? "");

  if (!rule) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <p className="text-muted-foreground">Ce conflit n&apos;existe pas (ou plus).</p>
        <Button asChild variant="link">
          <Link href="/app/routine">Retour à la routine</Link>
        </Button>
      </div>
    );
  }

  const meta = severityMeta(rule.severity);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Button asChild variant="ghost" size="sm" className="w-fit -ml-2">
        <Link href="/app/routine">
          <ArrowLeft className="size-4" />
          Retour à la routine
        </Link>
      </Button>

      <div>
        <Badge variant={meta.tone as VariantProps<typeof badgeVariants>["variant"]} className="mb-3">
          {meta.label}
        </Badge>
        <h1 className="text-balance font-serif text-3xl">{rule.headline}</h1>
      </div>

      {(productA || productB) && (
        <div className="flex flex-wrap items-center gap-2">
          {productA && <Badge variant="outline">{productA.name}</Badge>}
          {productA && productB && <span className="text-muted-foreground">+</span>}
          {productB && <Badge variant="outline">{productB.name}</Badge>}
        </div>
      )}

      <Card className="gap-3">
        <h2 className="font-serif text-lg">Pourquoi c&apos;est signalé</h2>
        <p className="leading-relaxed text-muted-foreground">{rule.reason}</p>
      </Card>

      <Card className="gap-3 border-primary/25 bg-primary/5">
        <h2 className="flex items-center gap-2 font-serif text-lg">
          <Layers className="size-4 text-primary" />
          Ce que Haru te propose
        </h2>
        <p className="leading-relaxed text-muted-foreground">{rule.recommendation}</p>
      </Card>

      <p className="text-xs text-muted-foreground">
        Ces recommandations sont générales et ne remplacent pas l&apos;avis
        d&apos;un dermatologue, notamment en cas de peau sensible ou de
        traitement prescrit.
      </p>
    </div>
  );
}
