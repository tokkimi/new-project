import { NextResponse } from "next/server";
import { findProductBySlug } from "@/lib/products";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = await findProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}
