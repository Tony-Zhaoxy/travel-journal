import type { TravelEntry } from "@/types/travel";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CountryStoryCard } from "@/components/CountryStoryCard";

type CountryGridProps = {
  travels: TravelEntry[];
};

export function CountryGrid({ travels }: CountryGridProps) {
  return (
    <section className="bg-[#080807] px-5 py-20 text-[#f6f0e7] sm:px-8" id="stories">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="mb-12 grid gap-6 md:grid-cols-[0.7fr_1.3fr]">
          <p className="text-sm uppercase text-[#a99d8f]">Story Index</p>
          <h2 className="max-w-3xl text-3xl font-normal text-balance text-[#fff8ef] md:text-5xl">
            Fourteen places held as photographs, routes, and short personal field
            notes.
          </h2>
        </AnimatedSection>

        <div className="grid gap-5 md:grid-cols-2">
          {travels.map((travel, index) => (
            <CountryStoryCard index={index} key={travel.slug} travel={travel} />
          ))}
        </div>
      </div>
    </section>
  );
}
