export type Product = {
  slug: string;
  name: string;
  lot: string;
  priceCents: number;
  currency: "usd" | "eur";
  material: string;
  origin: string;
  sizes: string[];
  images: string[];
  note?: string;
  status?: "available" | "soon";
};

export const products: Product[] = [
  {
    slug: "muji-denim-set",
    name: "muji denim set",
    lot: "lot 01",
    priceCents: 44000,
    currency: "usd",
    material: "14oz japanese selvedge denim · trucker + jean",
    origin: "cut & sewn — casablanca",
    sizes: ["s", "m", "l", "xl"],
    images: [
      "/assets/shoot/muji-set.jpg",
      "/assets/shoot/lot-02-a.jpg",
      "/assets/shoot/lot-02-b.jpg",
    ],
    note: "the full set — boxy trucker over a straight–baggy jean. unwashed indigo, fades to the wearer.",
  },
  {
    slug: "muji-jean",
    name: "muji jean",
    lot: "lot 02",
    priceCents: 26000,
    currency: "usd",
    material: "14oz japanese selvedge denim",
    origin: "cut & sewn — casablanca",
    sizes: ["28", "30", "32", "34", "36"],
    images: ["/assets/shoot/lot-02-a.jpg", "/assets/shoot/lot-02-b.jpg"],
    note: "straight through the hip, baggy to the hem. button fly. unwashed.",
  },
  {
    slug: "muji-top",
    name: "muji top",
    lot: "lot 03",
    priceCents: 24000,
    currency: "usd",
    material: "14oz japanese selvedge denim",
    origin: "cut & sewn — casablanca",
    sizes: ["s", "m", "l", "xl"],
    images: ["/assets/shoot/lot-02-b.jpg", "/assets/shoot/muji-set.jpg"],
    note: "boxy trucker. wears in at the cuffs and collar.",
  },
  {
    slug: "grandmas-jean",
    name: "grandma's jean",
    lot: "lot 04",
    priceCents: 28000,
    currency: "usd",
    material: "washed cotton denim, tablecloth-lined pockets",
    origin: "cut & sewn — casablanca",
    sizes: ["28", "30", "32", "34", "36"],
    images: [
      "/assets/shoot/grandmas-jean.jpg",
      "/assets/shoot/lot-01-b.jpg",
      "/assets/shoot/lot-03-b.jpg",
    ],
    note: "wide, soft, broken-in. plaid tablecloth lining the pockets.",
  },
  {
    slug: "jacket",
    name: "jacket",
    lot: "lot 05",
    priceCents: 0,
    currency: "usd",
    material: "—",
    origin: "cut & sewn — casablanca",
    sizes: [],
    images: ["/assets/shoot/lot-03-a.jpg"],
    note: "next drop.",
    status: "soon",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(cents: number, currency: "usd" | "eur" = "usd"): string {
  const value = cents / 100;
  if (currency === "eur") return `€${value.toFixed(0)}`;
  return `$${value.toFixed(0)}`;
}
