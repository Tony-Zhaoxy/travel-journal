"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { TravelEntry } from "@/types/travel";

type InteractiveWorldMapProps = {
  travels: TravelEntry[];
};

type ProjectedPoint = {
  x: number;
  y: number;
};

function project(travel: TravelEntry): ProjectedPoint {
  if (travel.mapPosition) {
    return travel.mapPosition;
  }

  const { lat, lng } = travel.coordinates;
  const offset = travel.mapOffset ?? { x: 0, y: 0 };

  return {
    x: ((lng + 180) / 360) * 100 + offset.x,
    y: ((90 - lat) / 180) * 100 + offset.y
  };
}

function scrollToCountry(slug: string) {
  const target = document.getElementById(`country-${slug}`);

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function InteractiveWorldMap({ travels }: InteractiveWorldMapProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeTravel = useMemo(
    () => travels.find((travel) => travel.slug === activeSlug),
    [activeSlug, travels]
  );

  const activePoint = activeTravel ? project(activeTravel) : undefined;

  return (
    <div className="space-y-4">
      <div
        className="relative overflow-hidden rounded-lg border border-[#e5ddd1] bg-[#fbf7ef] shadow-[0_24px_80px_rgba(31,27,21,0.12)]"
        onClick={() => setActiveSlug(null)}
      >
        <div className="relative aspect-[1672/941] min-h-[320px] w-full">
          <img
            alt="极简世界地图"
            className="absolute inset-0 h-full w-full object-contain"
            draggable={false}
            src="/images/world-map-minimal.png"
          />

          {travels.map((travel) => {
            const point = project(travel);
            const isActive = travel.slug === activeSlug;

            return (
              <button
                aria-label={`${travel.name}，${travel.city}，${travel.visitSummary}，${travel.year}`}
                className="group absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none md:h-7 md:w-7"
                key={travel.slug}
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveSlug(travel.slug);
                  scrollToCountry(travel.slug);
                }}
                onBlur={() => setActiveSlug(null)}
                onFocus={() => setActiveSlug(travel.slug)}
                onMouseEnter={() => setActiveSlug(travel.slug)}
                onMouseLeave={() => setActiveSlug(null)}
                style={{
                  left: `${Math.min(Math.max(point.x, 4), 96)}%`,
                  top: `${Math.min(Math.max(point.y, 6), 94)}%`,
                  zIndex: isActive ? 35 : 20
                }}
                title={`${travel.name} · ${travel.visitSummary}`}
                type="button"
              >
                <motion.span
                  animate={{ opacity: isActive ? 0.28 : 0.16, scale: isActive ? 1.32 : 1 }}
                  className="absolute h-5 w-5 rounded-full md:h-6 md:w-6"
                  style={{ backgroundColor: travel.accent }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={{ scale: isActive ? 1.18 : 1 }}
                  className="relative h-2.5 w-2.5 rounded-full border border-white shadow-[0_4px_14px_rgba(0,0,0,0.28)] transition group-hover:shadow-[0_6px_18px_rgba(0,0,0,0.34)] md:h-3 md:w-3"
                  style={{ backgroundColor: travel.accent }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            );
          })}

          {activeTravel && activePoint ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="pointer-events-none absolute z-40 w-[min(230px,calc(100%-2rem))] rounded-lg border border-[#e6ded4] bg-white/95 p-4 text-[#2d2923] shadow-[0_18px_48px_rgba(31,27,21,0.18)] backdrop-blur"
              initial={{ opacity: 0, y: 8 }}
              key={activeTravel.slug}
              style={{
                left: `${Math.min(Math.max(activePoint.x, 12), 72)}%`,
                top: `${Math.min(Math.max(activePoint.y + 4, 10), 66)}%`
              }}
              transition={{ duration: 0.18 }}
            >
              <p className="text-xs uppercase text-[#948879]">
                {activeTravel.visitSummary} / {activeTravel.year}
              </p>
              <h3 className="mt-1 text-xl font-normal">{activeTravel.name}</h3>
              <p className="mt-1 text-sm text-[#948879]">{activeTravel.englishName}</p>
              <p className="mt-2 text-sm text-[#6f665d]">{activeTravel.city}</p>
            </motion.div>
          ) : null}
        </div>
      </div>

      <p className="text-center text-xs leading-6 text-[#948879]">
        点击地图上的点会跳到对应记录；空白区域可以取消当前提示。
      </p>
    </div>
  );
}
