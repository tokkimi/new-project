import { db } from "@/lib/db";
import { SeoForm } from "@/components/admin/seo-form";
import { AdminDeleteButton } from "@/components/admin/admin-delete-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminSeoPage() {
  const entries = await db.seoMeta.findMany({ orderBy: [{ path: "asc" }, { locale: "asc" }] });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl">SEO</h1>
        <p className="mt-1 text-muted-foreground">
          Per-page title/description overrides. Pages without an entry use the default copy.
        </p>
      </div>

      <SeoForm />

      <div className="flex flex-col gap-3">
        {entries.map((e) => (
          <Card key={e.id} className="flex-row items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium">{e.path}</p>
                <Badge variant="secondary">{e.locale}</Badge>
              </div>
              {e.title && <p className="truncate text-sm text-muted-foreground">{e.title}</p>}
            </div>
            <AdminDeleteButton
              endpoint={`/api/admin/seo/${e.id}`}
              redirectTo="/admin/seo"
              title="Delete this SEO override?"
            />
          </Card>
        ))}
        {entries.length === 0 && (
          <p className="text-sm text-muted-foreground">No overrides yet — pages use default copy.</p>
        )}
      </div>
    </div>
  );
}
