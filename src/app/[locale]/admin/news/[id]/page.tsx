import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { NewsForm } from "@/components/admin/news-form";
import { AdminDeleteButton } from "@/components/admin/admin-delete-button";

export default async function EditNewsItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await db.newsItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Edit news item</h1>
        <AdminDeleteButton
          endpoint={`/api/admin/news/${item.id}`}
          redirectTo="/admin/news"
          title="Delete this news item?"
        />
      </div>
      <NewsForm item={item} />
    </div>
  );
}
