"use client";

import { useState } from "react";

type Props = {
  slug: string;
  sizes: string[];
};

export function AcquireButton({ slug, sizes }: Props) {
  const [size, setSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onAcquire() {
    if (!size) {
      setError("select a size");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug, size }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "checkout unavailable");
      }
      setError("Checkout coming soon via Shopify.");
      setLoading(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "checkout unavailable");
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted mb-3">
        size
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => {
          const selected = size === s;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={selected}
              className={`h-10 min-w-[44px] px-3 text-[12px] uppercase border transition-colors ${
                selected
                  ? "border-fg text-fg"
                  : "border-line text-muted hover:border-muted"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onAcquire}
        disabled={loading}
        className="mt-6 w-full h-12 border border-fg text-[11px] uppercase tracking-[0.18em] hover:bg-fg hover:text-bg transition-colors disabled:opacity-40"
      >
        {loading ? "—" : "add to cart"}
      </button>

      {error && <p className="mt-3 text-[11px] text-muted">{error}</p>}
    </div>
  );
}
