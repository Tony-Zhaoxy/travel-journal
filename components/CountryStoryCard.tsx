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
      className="group scroll-mt-28 overflow-hidden border border-white/10 bg-white/[0.03]"
      id={`country-${travel.slug}`}
      initial={false}
      transition={{ delay: Math.min(index * 0.035, 0.3), duration: 0.6 }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="grid min-h-full sm:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
          <img
            alt={`${travel.name}旅行封面`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            src={travel.coverImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="flex min-h-[330px] flex-col justify-between p-5 md:p-7">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4 text-sm uppercase text-[#a99d8f]">
              <span>{travel.region}</span>
              <span>{travel.visitSummary}</span>
            </div>
            <div>
              <h3 className="text-3xl font-normal text-[#fff8ef]">{travel.name}</h3>
              <p className="mt-1 text-sm text-[#a99d8f]">{travel.englishName}</p>
              <p className="mt-3 text-sm leading-7 text-[#c9beb1]">{travel.memory}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {travel.highlights.slice(0, 3).map((highlight) => (
                <span
                  className="border border-white/10 px-3 py-1.5 text-xs text-[#c9beb1]"
                  key={highlight}
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <Link
            className="mt-8 w-fit border-b pb-1 text-sm transition group-hover:text-white"
            href={`/countries/${travel.slug}`}
            style={{ borderColor: travel.accent, color: "#eadccb" }}
          >
            打开记录
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
