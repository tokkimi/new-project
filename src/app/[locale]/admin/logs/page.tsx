import { Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";

export default async function AdminLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; user?: string }>;
}) {
  const { type, user } = await searchParams;
  const events = await db.event.findMany({
    where: {
      ...(type ? { type } : {}),
      ...(user ? { userId: user } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const types = await db.event.groupBy({
    by: ["type"],
    _count: { type: true },
    orderBy: { _count: { type: "desc" } },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl">Logs & événements</h1>
        <p className="mt-1 text-muted-foreground">Dernières actions enregistrées côté application.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {types.map((item) => (
          <a
            key={item.type}
            href={`?type=${encodeURIComponent(item.type)}`}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-sm hover:border-primary/40"
          >
            {item.type} <span className="text-muted-foreground">{item._count.type}</span>
          </a>
        ))}
      </div>

      <Card className="gap-0 overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3">Type</th>
              <th className="p-3">Path / User</th>
              <th className="p-3">Locale</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-border/60 last:border-0">
                <td className="p-3">
                  <Badge variant="outline">
                    <Activity className="size-3" />
                    {event.type}
                  </Badge>
                </td>
                <td className="max-w-md truncate p-3 text-muted-foreground">
                  {event.path ?? event.userId ?? "No detail"}
                </td>
                <td className="p-3 text-muted-foreground">{event.locale ?? "-"}</td>
                <td className="p-3 text-muted-foreground">
                  {new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(event.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
