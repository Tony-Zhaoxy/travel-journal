import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedSection } from "@/components/AnimatedSection";
import { RegionalDetailMap } from "@/components/RegionalDetailMap";
import { SiteHeader } from "@/components/SiteHeader";
import { getAdjacentTravels, getStoryTravels, getTravelBySlug } from "@/lib/travel";

type CountryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getStoryTravels().map((travel) => ({
    slug: travel.slug
  }));
}

export async function generateMetadata({
  params
}: CountryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = getTravelBySlug(slug);

  if (!country) {
    return {};
  }

  return {
    title: country.name,
    description: country.memory,
    openGraph: {
      title: `${country.name} | 旅行札记`,
      description: country.memory,
      images: [
        {
          url: country.coverImage,
          width: 1600,
          height: 1000,
          alt: `${country.name} 旅行照片`
        }
      ]
    }
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = getTravelBySlug(slug);

  if (!country) {
    notFound();
  }

  const adjacent = getAdjacentTravels(country.slug);

  return (
    <>
      <SiteHeader />
      <main className="bg-[#080807] text-[#f6f0e7]">
        <section className="relative min-h-[82vh] overflow-hidden px-5 pb-16 pt-28 sm:px-8">
          <div className="absolute inset-0">
            <img
              alt={`${country.name} 封面照片`}
              className="h-full w-full object-cover"
              src={country.coverImage}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#080807]" />
          </div>
          <AnimatedSection className="relative z-10 mx-auto flex min-h-[64vh] max-w-6xl flex-col justify-end">
            <Link className="mb-10 w-fit border-b border-white/40 pb-1 text-sm" href="/">
              回到地图
            </Link>
            <div className="max-w-4xl space-y-7">
              <p className="text-sm uppercase text-[#e7d8c7]">
                {country.region} / {country.city} / {country.year}
              </p>
              <h1 className="text-5xl font-normal text-balance text-white md:text-7xl">
                {country.name}
              </h1>
              <p className="text-lg uppercase text-[#d8cec1]">{country.englishName}</p>
              <p className="max-w-2xl text-lg leading-8 text-[#efe5d8] md:text-xl">
                {country.memory}
              </p>
            </div>
          </AnimatedSection>
        </section>

        <AnimatedSection className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="space-y-8">
            <div>
              <p className="mb-3 text-sm uppercase text-[#a99d8f]">路线</p>
              <p className="text-2xl text-[#fff8ef]">{country.route}</p>
            </div>
            <div>
              <p className="mb-3 text-sm uppercase text-[#a99d8f]">坐标</p>
              <p className="text-lg text-[#d8cec1]">
                {country.coordinates.lat.toFixed(2)}, {country.coordinates.lng.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="mb-3 text-sm uppercase text-[#a99d8f]">城市 / 路线</p>
              <div className="space-y-2">
                {country.places.map((place) => (
                  <p className="border-l border-white/20 pl-3 text-sm text-[#d8cec1]" key={place}>
                    {place}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {country.highlights.map((highlight) => (
                <span
                  className="border border-white/15 px-3 py-2 text-sm text-[#d8cec1]"
                  key={highlight}
                >
                  {highlight}
                </span>
              ))}
            </div>
          </aside>

          <article className="space-y-8">
            <p className="text-2xl leading-10 text-[#efe5d8]">{country.story}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {country.gallery.map((caption, index) => (
                <figure
                  className="border border-white/10 bg-white/[0.03] p-4"
                  key={caption}
                >
                  <div
                    className="mb-5 aspect-[4/5]"
                    style={{
                      background: `linear-gradient(145deg, ${country.accent}, #15130f 58%, #f0d1a1)`
                    }}
                  />
                  <figcaption className="text-sm leading-6 text-[#c9beb1]">
                    0{index + 1}. {caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </article>
        </AnimatedSection>

        {country.detailSections?.length ? (
          <AnimatedSection className="border-y border-white/10 bg-[#0d0c0a] px-5 py-20 sm:px-8">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="space-y-5">
                <p className="text-sm uppercase text-[#a99d8f]">英国地图</p>
                <h2 className="text-4xl font-normal text-balance text-[#fff8ef] md:text-5xl">
                  从英国地图继续进入具体城市。
                </h2>
                <p className="max-w-md text-base leading-8 text-[#c9beb1]">
                  从伦敦、曼彻斯特、布里斯托一路展开，把生活过、停留过和想继续补充的地方慢慢串起来。
                </p>
              </div>
              <RegionalDetailMap sections={country.detailSections} />
            </div>
          </AnimatedSection>
        ) : null}

        {country.detailSections?.length ? (
          <AnimatedSection className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <div className="mb-10 grid gap-6 md:grid-cols-[0.72fr_1.28fr]">
              <p className="text-sm uppercase text-[#a99d8f]">城市记录</p>
              <h2 className="text-4xl font-normal text-balance text-[#fff8ef] md:text-5xl">
                先放几个城市的交互样子，之后再慢慢补路线和照片。
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {country.detailSections.map((section) => (
                <article
                  className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.035] p-5 md:p-7"
                  id={`${country.slug}-${section.slug}`}
                  key={section.slug}
                >
                  <div className="mb-6 flex items-center justify-between gap-4 text-sm uppercase text-[#a99d8f]">
                    <span>{section.englishName}</span>
                    <span>{section.year}</span>
                  </div>
                  <h3 className="text-3xl font-normal text-[#fff8ef]">{section.name}</h3>
                  <p className="mt-1 text-sm text-[#c9beb1]">{section.city}</p>
                  <p className="mt-5 text-base leading-8 text-[#efe5d8]">
                    {section.description}
                  </p>
                  <div className="mt-6 space-y-2">
                    {section.places.map((place) => (
                      <p className="border-l border-white/15 pl-3 text-sm text-[#c9beb1]" key={place}>
                        {place}
                      </p>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {section.gallery.map((caption) => (
                      <div
                        className="aspect-square rounded-md border border-white/10 bg-white/[0.04] p-2"
                        key={caption}
                      >
                        <div
                          className="h-full w-full rounded-sm opacity-80"
                          style={{
                            background: `linear-gradient(135deg, ${section.accent}, #15130f 68%)`
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </AnimatedSection>
        ) : null}

        <nav className="border-t border-white/10 px-5 py-10 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
            <Link
              className="border border-white/10 p-5 transition hover:border-white/30"
              href={`/countries/${adjacent.previous.slug}`}
            >
              <p className="text-sm text-[#a99d8f]">上一站</p>
              <p className="mt-2 text-2xl">{adjacent.previous.name}</p>
            </Link>
            <Link
              className="border border-white/10 p-5 text-left transition hover:border-white/30 sm:text-right"
              href={`/countries/${adjacent.next.slug}`}
            >
              <p className="text-sm text-[#a99d8f]">下一站</p>
              <p className="mt-2 text-2xl">{adjacent.next.name}</p>
            </Link>
          </div>
        </nav>
      </main>
    </>
  );
}
