import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { getStripe } from "@/lib/stripe";

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

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ??
      req.headers.get("origin") ??
      "http://localhost:3000";

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency,
            unit_amount: product.priceCents,
            product_data: {
              name: `${product.lot} — ${product.name}`,
              description: `${product.material} · size ${size}`,
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "FR", "ES", "MA", "JP", "DE", "IT", "NL", "BE", "PT"],
      },
      metadata: { slug, size },
      success_url: `${origin}/objects/success?s={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/objects/${slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
