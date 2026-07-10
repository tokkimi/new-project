import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";

export default async function AdminNewsPage() {
  const items = await db.newsItem.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">News</h1>
          <p className="mt-1 text-muted-foreground">{items.length} items</p>
        </div>
        <Button asChild>
          <Link href="/admin/news/new">
            <Plus className="size-4" />
            New item
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Source</th>
              <th className="p-3">Published</th>
              <th className="p-3">Featured</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border/60 last:border-0">
                <td className="max-w-sm p-3">
                  <Link href={`/admin/news/${item.id}`} className="font-medium hover:underline">
                    {item.title}
                  </Link>
                </td>
                <td className="p-3 text-muted-foreground">{item.category}</td>
                <td className="p-3 text-muted-foreground">{item.sourceName ?? "—"}</td>
                <td className="p-3 text-xs text-muted-foreground">
                  {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(item.publishedAt)}
                </td>
                <td className="p-3">{item.featured && <Badge>Featured</Badge>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
