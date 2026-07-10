import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-3xl">New product</h1>
      <ProductForm />
    </div>
  );
}
