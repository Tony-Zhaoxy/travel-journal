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
            <p className="text-sm uppercase text-[#c0b4a5]">下一步整理</p>
            <div className="space-y-6">
              <h2 className="max-w-3xl text-3xl font-normal text-balance text-[#fff8ef] md:text-5xl">
                现在先把地图和国家列表放准，之后再把每一段旅程写成真正的个人相册。
              </h2>
              <p className="max-w-2xl text-base leading-8 text-[#c9beb1] md:text-lg">
                所有国家、次数、简介、封面图和地点占位都集中在一个数据文件里。下一步只需要补照片和具体城市，地图、卡片和详情页会一起更新。
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
