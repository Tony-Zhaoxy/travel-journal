import type { TravelEntry } from "@/types/travel";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CountryStoryCard } from "@/components/CountryStoryCard";

type CountryGridProps = {
  travels: TravelEntry[];
};

export function CountryGrid({ travels }: CountryGridProps) {
  return (
    <section className="bg-[#fbf7ef] px-5 py-20 text-[#2d2923] sm:px-8" id="stories">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="mb-12 grid gap-6 md:grid-cols-[0.7fr_1.3fr]">
          <p className="text-sm uppercase text-[#948879]">旅行记录</p>
          <h2 className="max-w-3xl text-3xl font-normal text-balance md:text-5xl">
            每一个地图标点都会对应下面的一段旅行记录，先留好城市、路线、次数和照片位置。
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
