import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080807] px-5 text-[#f6f0e7]">
      <div className="max-w-md space-y-6 text-center">
        <p className="text-sm uppercase text-[#c0b4a5]">Lost Frame</p>
        <h1 className="text-4xl font-normal">This story has not been developed yet.</h1>
        <Link className="inline-flex border-b border-[#d6925f] pb-1 text-sm" href="/">
          Back to the atlas
        </Link>
      </div>
    </main>
  );
}
