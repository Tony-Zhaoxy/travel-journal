import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#e6ded4]/80 bg-[#f5efe6]/80 px-5 py-4 text-[#2d2923] backdrop-blur-md sm:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link className="text-sm uppercase" href="/">
          旅行札记
        </Link>
        <div className="flex items-center gap-5 text-sm text-[#6f665d]">
          <Link className="transition hover:text-[#2d2923]" href="/#atlas">
            地图
          </Link>
          <Link className="transition hover:text-[#2d2923]" href="/#stories">
            记录
          </Link>
        </div>
      </nav>
    </header>
  );
}
