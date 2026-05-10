import { CountryGrid } from "@/components/CountryGrid";
import { Hero } from "@/components/Hero";
import { SiteHeader } from "@/components/SiteHeader";
import { getMapTravels, getStoryTravels } from "@/lib/travel";

export default function Home() {
  const mapTravels = getMapTravels();
  const storyTravels = getStoryTravels();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero travels={mapTravels} />
        <CountryGrid travels={storyTravels} />
        <section className="border-t border-[#e6ded4] bg-[#f5efe6] px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <p className="text-sm uppercase text-[#948879]">后续编辑</p>
            <div className="space-y-6">
              <h2 className="max-w-3xl text-3xl font-normal text-balance text-[#2d2923] md:text-5xl">
                之后只需要替换数据里的城市、年份、简介和照片，地图与记录卡片会一起更新。
              </h2>
              <p className="max-w-2xl text-base leading-8 text-[#6f665d] md:text-lg">
                当前列表已经按你给的最新版整理好，包括英国地区和美国州；具体去过的城市、路线和照片可以下一步逐项补进去。
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
