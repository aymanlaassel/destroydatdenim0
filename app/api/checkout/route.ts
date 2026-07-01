import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/products";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { slug, size } = (await req.json()) as { slug?: string; size?: string };
    if (!slug || !size) {
      return NextResponse.json({ error: "missing slug or size" }, { status: 400 });
    }
    const product = getProduct(slug);
    if (!product) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    if (product.status === "soon") {
      return NextResponse.json({ error: "not yet available" }, { status: 400 });
    }
    if (!product.sizes.includes(size)) {
      return NextResponse.json({ error: "size unavailable" }, { status: 400 });
    }

    return NextResponse.json({ ready: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "checkout unavailable";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
