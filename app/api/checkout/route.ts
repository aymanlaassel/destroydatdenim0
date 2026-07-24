import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { shopifyConfigured, getVariantId, createCheckoutUrl } from "@/lib/shopify";

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

    if (!shopifyConfigured()) {
      return NextResponse.json({ error: "checkout not configured yet" }, { status: 503 });
    }

    const variantId = await getVariantId(slug, size);
    if (!variantId) {
      return NextResponse.json({ error: "size sold out" }, { status: 409 });
    }

    const url = await createCheckoutUrl(variantId);
    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "checkout unavailable";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
