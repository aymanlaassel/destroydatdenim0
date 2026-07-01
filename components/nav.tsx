import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-line">
      <div className="flex items-center justify-between px-6 md:px-12 h-16">
        <Link
          href="/"
          className="text-[13px] tracking-[0.03em] hover:opacity-60 transition-opacity"
        >
          destroy dat denim
        </Link>
        <nav className="flex items-center gap-8 text-[11px] uppercase tracking-[0.16em] text-muted">
          <Link href="/objects" className="hover:text-fg transition-colors">
            shop
          </Link>
          <Link href="/info" className="hover:text-fg transition-colors">
            info
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line mt-32">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 px-6 md:px-12 py-16">
        <div className="text-[13px] tracking-[0.03em]">destroy dat denim</div>
        <div className="flex flex-col md:items-end gap-2 text-[11px] uppercase tracking-[0.16em] text-muted">
          <span>casablanca · tokyo · madrid · new york</span>
          <a
            href="mailto:contact@destroydatdenim.com"
            className="lowercase tracking-[0.03em] hover:text-fg transition-colors"
          >
            contact@destroydatdenim.com
          </a>
          <div className="flex gap-4">
            <Link href="/shipping" className="hover:text-fg transition-colors">
              shipping
            </Link>
            <Link href="/returns" className="hover:text-fg transition-colors">
              returns
            </Link>
            <a
              href="https://instagram.com/destroydatdenim"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg transition-colors"
            >
              instagram
            </a>
          </div>
          <Link href="/archive" className="hover:text-fg transition-colors">
            archive
          </Link>
        </div>
      </div>
      <div className="px-6 md:px-12 pb-10 text-[10px] uppercase tracking-[0.16em] text-muted">
        © 2026 destroy dat denim
      </div>
    </footer>
  );
}
