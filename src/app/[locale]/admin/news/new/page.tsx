import { NewsForm } from "@/components/admin/news-form";

export default function NewNewsItemPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-3xl">New news item</h1>
      <NewsForm />
    </div>
  );
}
