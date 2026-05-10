import { CountryGrid } from "@/components/CountryGrid";
import { Hero } from "@/components/Hero";
import { SiteHeader } from "@/components/SiteHeader";
import { travels } from "@/data/travels";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero travels={travels} />
        <CountryGrid travels={travels} />
        <section className="border-t border-[#e6ded4] bg-[#f5efe6] px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <p className="text-sm uppercase text-[#948879]">How to edit later</p>
            <div className="space-y-6">
              <h2 className="max-w-3xl text-3xl font-normal text-balance text-[#2d2923] md:text-5xl">
                Replace the placeholders with your real cities, dates, notes, and
                photographs whenever you are ready.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-[#6f665d] md:text-lg">
                Travel entries live in one simple data file. Updating a country,
                coordinate, city, year, cover image, or gallery caption updates the
                map marker and story section together.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
