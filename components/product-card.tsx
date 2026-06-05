import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link href={`/objects/${p.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-bg2">
        <Image
          src={p.images[0]}
          alt={p.name}
          fill
          sizes="(min-width:768px) 33vw, 50vw"
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {p.images[1] && (
          <Image
            src={p.images[1]}
            alt=""
            fill
            sizes="(min-width:768px) 33vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <span className="text-[13px] tracking-[0.01em]">{p.name}</span>
        <span className="text-[13px] text-muted tabular-nums">
          {p.status === "soon"
            ? "soon"
            : formatPrice(p.priceCents, p.currency)}
        </span>
      </div>
    </Link>
  );
}
