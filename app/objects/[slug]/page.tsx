import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav, Footer } from "@/components/nav";
import { AcquireButton } from "@/components/acquire-button";
import { formatPrice, getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p ? `${p.name} — destroy dat denim` : "destroy dat denim" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <Nav />
      <main>
        <div className="grid lg:grid-cols-[1.6fr_1fr]">
          {/* images */}
          <div className="lg:border-r border-line">
            {product.images.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative aspect-[4/5] bg-bg2 border-b border-line"
              >
                <Image
                  src={src}
                  alt={`${product.name} — ${i + 1}`}
                  fill
                  sizes="(min-width:1024px) 62vw, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* details */}
          <aside className="lg:sticky lg:top-16 self-start px-6 md:px-12 py-14 md:py-20">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted mb-5">
              {product.lot}
            </div>
            <h1 className="text-[clamp(1.9rem,3.4vw,3rem)] font-bold uppercase leading-[0.95] tracking-[-0.035em]">
              {product.name}
            </h1>
            <div className="text-[15px] text-muted mt-3 tabular-nums">
              {product.status === "soon"
                ? "coming soon"
                : formatPrice(product.priceCents, product.currency)}
            </div>

            <div className="my-10 h-px bg-line" />

            {product.status === "soon" ? (
              <div className="text-[12px] uppercase tracking-[0.18em] text-muted border border-line py-4 text-center">
                next drop
              </div>
            ) : (
              <AcquireButton slug={product.slug} sizes={product.sizes} />
            )}

            <div className="mt-10 space-y-1.5 text-[12px] text-muted">
              <p>{product.material}</p>
              <p>{product.origin}</p>
              {product.note && <p>{product.note}</p>}
            </div>

            <div className="mt-10 border-t border-line pt-6 space-y-4">
              {product.sizeGuide && product.sizeGuide.length > 0 && (
                <details className="group cursor-pointer">
                  <summary className="text-[11px] uppercase tracking-[0.16em] text-muted hover:text-fg transition-colors list-none flex items-center gap-2">
                    <span className="group-open:rotate-90 transition-transform">→</span>
                    size guide
                  </summary>
                  <div className="mt-3 pl-6 text-[12px] text-muted space-y-1">
                    {product.sizeGuide.map((guide) => (
                      <p key={guide.label}>
                        <span className="font-mono">{guide.label}</span> — {guide.value}
                      </p>
                    ))}
                  </div>
                </details>
              )}
              <details className="group cursor-pointer">
                <summary className="text-[11px] uppercase tracking-[0.16em] text-muted hover:text-fg transition-colors list-none flex items-center gap-2">
                  <span className="group-open:rotate-90 transition-transform">→</span>
                  shipping & returns
                </summary>
                <div className="mt-3 pl-6 text-[12px] text-muted space-y-2">
                  <p>Orders ship within 3–5 business days.</p>
                  <p>
                    Returns accepted within 14 days. See our{" "}
                    <a href="/returns" className="text-fg hover:text-muted transition-colors">
                      full returns policy
                    </a>
                    .
                  </p>
                </div>
              </details>
            </div>

            <Link
              href="/objects"
              className="inline-block mt-12 text-[11px] uppercase tracking-[0.16em] text-muted hover:text-fg transition-colors"
            >
              ← shop
            </Link>
          </aside>
        </div>
        <Footer />
      </main>
    </>
  );
}
