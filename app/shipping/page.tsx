import { Nav, Footer } from "@/components/nav";

export const metadata = { title: "shipping — destroy dat denim" };

export default function Shipping() {
  return (
    <>
      <Nav />
      <main>
        <section className="px-6 md:px-12 pt-20 md:pt-28 pb-28 max-w-2xl">
          <h1 className="text-[clamp(2.25rem,6.4vw,5.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
            shipping
          </h1>
          <div className="mt-12 space-y-6 text-[14px] leading-relaxed">
            <p>
              We ship worldwide. Orders are dispatched within 3–5 business days.
            </p>
            <p>
              Shipping costs are calculated at checkout based on your location and selected method.
            </p>
            <p>
              You will receive a tracking number via email once your order ships.
            </p>
            <p>
              Delivery times vary by region and carrier. International orders may take 2–4 weeks.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
