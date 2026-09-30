import { NextResponse } from "next/server";
import { listProducts, searchProducts } from "@/lib/products";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim();

  if (query) {
    const { products, total } = await searchProducts({ q: query }, 8);
    return NextResponse.json({ products, total });
  }

  const products = await listProducts();
  return NextResponse.json({ products, total: products.length });
}
