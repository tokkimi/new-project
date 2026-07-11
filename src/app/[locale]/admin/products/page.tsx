import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductVisual } from "@/components/product-visual";
import { db } from "@/lib/db";

export default async function AdminProductsPage() {
  const products = await db.product.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">Products</h1>
          <p className="mt-1 text-muted-foreground">{products.length} products</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="size-4" />
            New product
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-3"></th>
              <th className="p-3">Name</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Category</th>
              <th className="p-3">Origin</th>
              <th className="p-3">Featured</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border/60 last:border-0">
                <td className="p-3">
                  <ProductVisual category={p.category} size="sm" />
                </td>
                <td className="p-3">
                  <Link href={`/admin/products/${p.id}`} className="font-medium hover:underline">
                    {p.name}
                  </Link>
                </td>
                <td className="p-3 text-muted-foreground">{p.brand}</td>
                <td className="p-3 text-muted-foreground">{p.category}</td>
                <td className="p-3 text-muted-foreground">{p.origin ?? "—"}</td>
                <td className="p-3">{p.featured && <Badge>Featured</Badge>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
