"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { TravelEntry } from "@/types/travel";

type CountryStoryCardProps = {
  index: number;
  travel: TravelEntry;
};

export function CountryStoryCard({ index, travel }: CountryStoryCardProps) {
  return (
    <motion.article
      className="group scroll-mt-28 overflow-hidden rounded-lg border border-[#e6ded4] bg-white shadow-[0_18px_48px_rgba(31,27,21,0.08)]"
      id={`country-${travel.slug}`}
      initial={false}
      transition={{ delay: Math.min(index * 0.035, 0.3), duration: 0.6 }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="grid min-h-full sm:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
          <img
            alt={`${travel.name} 封面照片`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            src={travel.coverImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="flex min-h-[330px] flex-col justify-between p-5 md:p-7">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4 text-sm uppercase text-[#948879]">
              <span>{travel.region}</span>
              <span>{travel.visitSummary}</span>
            </div>
            <div>
              <h3 className="text-3xl font-normal text-[#2d2923]">{travel.name}</h3>
              <p className="mt-1 text-sm text-[#948879]">
                {travel.englishName} / {travel.city} / {travel.year}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#6f665d]">{travel.memory}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {travel.highlights.slice(0, 3).map((highlight) => (
                <span
                  className="rounded-full border border-[#e6ded4] px-3 py-1.5 text-xs text-[#6f665d]"
                  key={highlight}
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {travel.gallery.map((caption, galleryIndex) => (
              <div
                className="aspect-square rounded-md border border-[#e6ded4] bg-[#f5efe6] p-2"
                key={caption}
              >
                <div
                  className="h-full w-full rounded-sm opacity-80"
                  style={{
                    background: `linear-gradient(135deg, ${travel.accent}, #f3e4d1 68%)`
                  }}
                />
                <span className="sr-only">
                  Photo placeholder {galleryIndex + 1}: {caption}
                </span>
              </div>
            ))}
          </div>

          <Link
            className="mt-8 w-fit border-b pb-1 text-sm text-[#5f574d] transition hover:text-[#2d2923]"
            href={`/countries/${travel.slug}`}
            style={{ borderColor: travel.accent }}
          >
            打开记录
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
