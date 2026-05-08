import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#080807]/70 px-5 py-4 text-[#f6f0e7] backdrop-blur-md sm:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link className="text-sm uppercase" href="/">
          Travel Field Notes
        </Link>
        <div className="flex items-center gap-5 text-sm text-[#d7cabc]">
          <a className="transition hover:text-white" href="/#atlas">
            Atlas
          </a>
          <a className="transition hover:text-white" href="/#stories">
            Stories
          </a>
        </div>
      </nav>
    </header>
  );
}
