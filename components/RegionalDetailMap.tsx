"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { TravelDetailSection } from "@/types/travel";

type RegionalDetailMapProps = {
  sections: TravelDetailSection[];
};

function scrollToSection(slug: string) {
  const target = document.getElementById(`united-kingdom-${slug}`);

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function RegionalDetailMap({ sections }: RegionalDetailMapProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeSection = useMemo(
    () => sections.find((section) => section.slug === activeSlug),
    [activeSlug, sections]
  );

  return (
    <div className="space-y-4">
      <div
        className="relative mx-auto max-w-[560px] overflow-hidden rounded-lg border border-white/10 bg-[#f5efe6] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
        onClick={() => setActiveSlug(null)}
      >
        <div className="relative aspect-[972/1619] w-full">
          <img
            alt="无标记的极简英国地图"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
            src="/images/uk-map-minimal.png"
          />

          {sections.map((section) => {
            const isActive = activeSlug === section.slug;

            return (
              <button
                aria-label={`${section.name}，${section.year}`}
                className="group absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none"
                key={section.slug}
                onBlur={() => setActiveSlug(null)}
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveSlug(section.slug);
                  scrollToSection(section.slug);
                }}
                onFocus={() => setActiveSlug(section.slug)}
                onMouseEnter={() => setActiveSlug(section.slug)}
                onMouseLeave={() => setActiveSlug(null)}
                style={{
                  left: `${section.mapPosition.x}%`,
                  top: `${section.mapPosition.y}%`,
                  zIndex: isActive ? 20 : 10
                }}
                title={`${section.name} · ${section.year}`}
                type="button"
              >
                <motion.span
                  animate={{ opacity: isActive ? 0.34 : 0.16, scale: isActive ? 1.45 : 1 }}
                  className="absolute h-7 w-7 rounded-full"
                  style={{ backgroundColor: section.accent }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={{ scale: isActive ? 1.18 : 1 }}
                  className="relative h-3.5 w-3.5 rounded-full border border-white shadow-[0_5px_18px_rgba(0,0,0,0.32)]"
                  style={{ backgroundColor: section.accent }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            );
          })}

          {activeSection ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="pointer-events-none absolute left-5 top-5 z-30 w-[min(250px,calc(100%-2.5rem))] rounded-lg border border-[#e6ded4] bg-white/95 p-4 text-[#2d2923] shadow-[0_18px_48px_rgba(31,27,21,0.16)] backdrop-blur"
              initial={{ opacity: 0, y: 8 }}
              key={activeSection.slug}
              transition={{ duration: 0.18 }}
            >
              <p className="text-xs uppercase text-[#948879]">{activeSection.year}</p>
              <h3 className="mt-1 text-xl font-normal">{activeSection.name}</h3>
              <p className="mt-1 text-sm text-[#948879]">{activeSection.englishName}</p>
              <p className="mt-2 text-sm text-[#6f665d]">{activeSection.city}</p>
            </motion.div>
          ) : null}
        </div>
      </div>

      <p className="text-center text-xs leading-6 text-[#a99d8f]">
        英国城市坐标 / London, Manchester, Bristol, Edinburgh
      </p>
    </div>
  );
}
