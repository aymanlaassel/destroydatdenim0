import { Nav, Footer } from "@/components/nav";

export const metadata = { title: "returns — destroy dat denim" };

export default function Returns() {
  return (
    <>
      <Nav />
      <main>
        <section className="px-6 md:px-12 pt-20 md:pt-28 pb-28 max-w-2xl">
          <h1 className="text-[clamp(2.25rem,6.4vw,5.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
            returns
          </h1>
          <div className="mt-12 space-y-6 text-[14px] leading-relaxed">
            <p>
              We accept returns within 14 days of delivery. Items must be unworn, unwashed, and in original condition with all tags attached.
            </p>
            <p>
              To initiate a return, contact us at{" "}
              <a href="mailto:contact@destroydatdenim.com" className="hover:text-muted transition-colors">
                contact@destroydatdenim.com
              </a>
              .
            </p>
            <p>
              We will provide a prepaid shipping label. Once we receive and inspect your item, we will issue a full refund within 5–7 business days.
            </p>
            <p>
              Denim that has been worn, washed, or altered cannot be returned.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
