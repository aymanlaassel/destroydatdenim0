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
  sizeGuide?: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    slug: "muji-denim-set",
    name: "muji set",
    lot: "lot 01",
    priceCents: 44000,
    currency: "usd",
    material: "100% japanese selvedge denim · vest + pants",
    origin: "cut & sewn — casablanca",
    sizes: ["s", "m", "l", "xl"],
    images: [
      "/assets/shoot/muji-set.jpg",
      "/assets/shoot/lot-02-a.jpg",
      "/assets/shoot/lot-02-b.jpg",
    ],
    note: "the full set. wear together or separately. unwashed indigo, fades to the wearer.",
    sizeGuide: [
      { label: "S", value: 'Chest 36"' },
      { label: "M", value: 'Chest 38"' },
      { label: "L", value: 'Chest 40"' },
      { label: "XL", value: 'Chest 42"' },
    ],
  },
  {
    slug: "muji-jean",
    name: "muji set pants",
    lot: "lot 02",
    priceCents: 26000,
    currency: "usd",
    material: "100% japanese selvedge denim",
    origin: "cut & sewn — casablanca",
    sizes: ["28", "30", "32", "34", "36"],
    images: ["/assets/shoot/lot-02-a.jpg", "/assets/shoot/lot-02-b.jpg"],
    note: "straight. raw. simple. the kind of jean you keep for years. part of the muji set. works alone. works together.",
    sizeGuide: [
      { label: "28", value: 'Waist 28" Inseam 32"' },
      { label: "30", value: 'Waist 30" Inseam 32"' },
      { label: "32", value: 'Waist 32" Inseam 32"' },
      { label: "34", value: 'Waist 34" Inseam 32"' },
      { label: "36", value: 'Waist 36" Inseam 32"' },
    ],
  },
  {
    slug: "muji-top",
    name: "muji set vest",
    lot: "lot 03",
    priceCents: 24000,
    currency: "usd",
    material: "100% japanese selvedge denim",
    origin: "cut & sewn — casablanca",
    sizes: ["s", "m", "l", "xl"],
    images: ["/assets/shoot/lot-02-b.jpg", "/assets/shoot/muji-set.jpg"],
    note: "clean cut. no excess. wear it alone or build around it. made to last. made to be worn.",
    sizeGuide: [
      { label: "S", value: 'Chest 36"' },
      { label: "M", value: 'Chest 38"' },
      { label: "L", value: 'Chest 40"' },
      { label: "XL", value: 'Chest 42"' },
    ],
  },
  {
    slug: "grandmas-jean",
    name: "your grandma's tablecloth jean",
    lot: "lot 04",
    priceCents: 28000,
    currency: "usd",
    material: "washed cotton denim · tablecloth-lined pockets",
    origin: "cut & sewn — casablanca",
    sizes: ["28", "30", "32", "34", "36"],
    images: [
      "/assets/shoot/grandmas-jean.jpg",
      "/assets/shoot/lot-01-b.jpg",
      "/assets/shoot/lot-03-b.jpg",
    ],
    note: "wide. soft. broken-in. plaid tablecloth lining the pockets.",
    sizeGuide: [
      { label: "28", value: 'Waist 28" Inseam 30"' },
      { label: "30", value: 'Waist 30" Inseam 30"' },
      { label: "32", value: 'Waist 32" Inseam 30"' },
      { label: "34", value: 'Waist 34" Inseam 30"' },
      { label: "36", value: 'Waist 36" Inseam 30"' },
    ],
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
