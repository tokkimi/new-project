"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Beaker, Check, Circle, Flag, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CHANGE_KINDS,
  PROTOCOL_GOALS,
  PROTOCOL_OUTCOMES,
  PROTOCOL_DURATIONS,
  daysElapsed,
  checkpointDays,
} from "@/lib/protocol";
import type { Product } from "@/generated/prisma/client";

type Protocol = {
  id: string;
  goal: string;
  changeKind: string;
  productId: string | null;
  note: string | null;
  durationDays: number;
  status: string;
  startedAt: string;
  product: { name: string } | null;
};

const SELECT_CLASS =
  "h-10 w-full min-w-0 rounded-xl border border-input bg-card px-3 text-sm text-foreground";

export function RoutineProtocolPanel({ products }: { products: Product[] }) {
  const t = useTranslations("protocol");
  const [protocol, setProtocol] = React.useState<Protocol | null>(null);
  const [loaded, setLoaded] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [goal, setGoal] = React.useState<string>("");
  const [changeKind, setChangeKind] = React.useState<string>("");
  const [productId, setProductId] = React.useState<string>("");
  const [durationDays, setDurationDays] = React.useState<number>(14);

  React.useEffect(() => {
    fetch("/api/workspace/protocol")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setProtocol(d?.protocol ?? null))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const start = async () => {
    if (!goal || !changeKind || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/workspace/protocol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, changeKind, productId: productId || null, durationDays }),
      });
      if (res.ok) {
        const d = await res.json();
        setProtocol(d.protocol);
      }
    } finally {
      setBusy(false);
    }
  };

  const complete = async (outcome: string) => {
    if (!protocol || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/workspace/protocol", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: protocol.id, outcome }),
      });
      if (res.ok) setProtocol(null);
    } finally {
      setBusy(false);
    }
  };

  const abandon = async () => {
    if (!protocol || busy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/workspace/protocol?id=${protocol.id}`, { method: "DELETE" });
      if (res.ok) setProtocol(null);
    } finally {
      setBusy(false);
    }
  };

  if (!loaded) return null;

  const header = (
    <div className="flex items-start gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Beaker className="size-5" />
      </span>
      <div>
        <h2 className="font-serif text-xl">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>
    </div>
  );

  if (protocol) {
    const elapsed = Math.min(daysElapsed(protocol.startedAt), protocol.durationDays);
    const pct = Math.round((elapsed / protocol.durationDays) * 100);
    const checkpoints = checkpointDays(protocol.durationDays);
    return (
      <Card className="gap-4">
        {header}

        <div className="rounded-2xl bg-primary/8 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            {t(`goals.${protocol.goal}`)}
          </p>
          <p className="mt-1 font-medium">
            {t(`changeKinds.${protocol.changeKind}`)}
            {protocol.product ? ` — ${protocol.product.name}` : ""}
          </p>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium">{t("dayProgress", { elapsed, total: protocol.durationDays })}</span>
            <span className="text-muted-foreground">{pct}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {t("checkpointsLabel")}
          </p>
          <div className="flex flex-wrap gap-2">
            {checkpoints.map((day) => {
              const done = elapsed >= day;
              return (
                <span
                  key={day}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm",
                    done ? "bg-success/12 text-success" : "bg-secondary text-muted-foreground"
                  )}
                >
                  {done ? <Check className="size-3.5" /> : <Circle className="size-3.5" />}
                  {t("checkpointDay", { day })}
                </span>
              );
            })}
          </div>
        </div>

        <p className="flex items-start gap-2 rounded-2xl bg-am/10 px-4 py-3 text-sm text-muted-foreground">
          <Flag className="mt-0.5 size-4 shrink-0 text-am-foreground" />
          {t("principle")}
        </p>

        <div>
          <p className="mb-2 text-sm font-medium">{t("outcomeLabel")}</p>
          <div className="flex flex-wrap gap-2">
            {PROTOCOL_OUTCOMES.map((outcome) => (
              <Button key={outcome} variant="outline" disabled={busy} onClick={() => complete(outcome)}>
                {t(`outcomes.${outcome}`)}
              </Button>
            ))}
            <Button variant="ghost" disabled={busy} onClick={abandon}>
              <X className="size-4" />
              {t("abandon")}
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">{t("disclaimer")}</p>
      </Card>
    );
  }

  return (
    <Card className="gap-4">
      {header}

      <div>
        <p className="mb-2 text-sm font-medium">{t("goalLabel")}</p>
        <div className="flex flex-wrap gap-2">
          {PROTOCOL_GOALS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGoal(g)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                goal === g ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {t(`goals.${g}`)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">{t("changeLabel")}</p>
        <div className="flex flex-wrap gap-2">
          {CHANGE_KINDS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setChangeKind(k)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                changeKind === k ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {t(`changeKinds.${k}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <select className={SELECT_CLASS} value={productId} onChange={(e) => setProductId(e.target.value)}>
          <option value="">{t("noProduct")}</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          className={SELECT_CLASS}
          value={durationDays}
          onChange={(e) => setDurationDays(Number(e.target.value))}
        >
          {PROTOCOL_DURATIONS.map((d) => (
            <option key={d} value={d}>
              {t("days", { count: d })}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <Button onClick={start} disabled={!goal || !changeKind || busy}>
          {t("start")}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">{t("disclaimer")}</p>
    </Card>
  );
}
