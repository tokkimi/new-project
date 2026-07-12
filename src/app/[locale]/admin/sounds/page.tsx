import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";

export default async function AdminSoundsPage() {
  const sounds = await db.sound.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">Sounds</h1>
          <p className="mt-1 text-muted-foreground">
            {sounds.length} sounds shown on the wellness page&apos;s calming sounds section
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/sounds/new">
            <Plus className="size-4" />
            New sound
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">Label</th>
              <th className="p-3">Source</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {sounds.map((s) => (
              <tr key={s.id} className="border-b border-border/60 last:border-0">
                <td className="p-3 text-muted-foreground">{s.order}</td>
                <td className="p-3">
                  <Link href={`/admin/sounds/${s.id}`} className="font-medium hover:underline">
                    {s.labelEn}
                  </Link>
                  <p className="text-xs text-muted-foreground">{s.labelKo}</p>
                </td>
                <td className="p-3 text-muted-foreground">
                  {s.sourceType === "synthesis" ? `synthesis: ${s.synthesisMode}` : "audio URL"}
                </td>
                <td className="p-3">
                  {s.active ? <Badge variant="success">Active</Badge> : <Badge variant="secondary">Hidden</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
