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
        <section className="border-t border-white/10 bg-[#11100d] px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <p className="text-sm uppercase text-[#c0b4a5]">Journal Direction</p>
            <div className="space-y-6">
              <h2 className="max-w-3xl text-3xl font-normal text-balance text-[#fff8ef] md:text-5xl">
                A quiet archive for trips, photographs, and the details that survive
                after the itinerary fades.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-[#c9beb1] md:text-lg">
                The site is organized around a reusable travel data file. Update one
                entry and the map marker, landing card, country page, metadata, and
                sitemap all move together.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
