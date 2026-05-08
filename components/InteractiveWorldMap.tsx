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
  const { lat, lng } = travel.coordinates;
  const offset = travel.mapOffset ?? { x: 0, y: 0 };

  return {
    x: ((lng + 180) / 360) * 1000 + offset.x,
    y: ((90 - lat) / 180) * 520 + offset.y
  };
}

function scrollToCountry(slug: string) {
  const target = document.getElementById(`country-${slug}`);

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function InteractiveWorldMap({ travels }: InteractiveWorldMapProps) {
  const [activeSlug, setActiveSlug] = useState(travels[0]?.slug);

  const activeTravel = useMemo(
    () => travels.find((travel) => travel.slug === activeSlug) ?? travels[0],
    [activeSlug, travels]
  );

  const activePoint = activeTravel ? project(activeTravel) : undefined;

  return (
    <div className="relative h-full min-h-[340px] overflow-hidden border border-white/15 bg-[#0d1618]/80 shadow-2xl shadow-black/30 backdrop-blur-md">
      <div className="map-grid absolute inset-0 opacity-40" />
      <svg
        aria-label="去过的国家和地区地图"
        className="relative h-full min-h-[340px] w-full"
        preserveAspectRatio="xMidYMid meet"
        role="group"
        viewBox="0 0 1000 520"
      >
        <defs>
          <linearGradient id="landGradient" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#f1dfc8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6a8d88" stopOpacity="0.32" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur result="coloredBlur" stdDeviation="5" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g fill="none" stroke="rgba(246,240,231,0.09)" strokeWidth="1">
          {[130, 260, 390].map((y) => (
            <path d={`M 35 ${y} C 260 ${y - 18}, 720 ${y + 18}, 965 ${y}`} key={y} />
          ))}
          {[170, 330, 500, 670, 830].map((x) => (
            <path d={`M ${x} 36 C ${x - 24} 172, ${x + 24} 348, ${x} 484`} key={x} />
          ))}
        </g>

        <g fill="url(#landGradient)" stroke="rgba(246,240,231,0.18)" strokeWidth="1">
          <path d="M132 138c34-37 91-52 143-39 50 13 85 48 102 89 18 44 5 91-31 120-31 25-74 32-118 19-42-13-68-40-104-66-35-25-55-70-36-104 8-14 25-17 44-19Z" />
          <path d="M264 319c38 6 68 29 76 64 8 34-7 76-37 91-31 16-69-2-88-32-22-35-24-76-8-101 11-18 32-25 57-22Z" />
          <path d="M432 112c48-24 116-22 174 1 57 23 92 72 91 126-1 44-31 72-79 81-49 8-86-9-124-35-42-29-96-39-113-83-14-37 11-69 51-90Z" />
          <path d="M495 278c31 7 51 30 53 57 2 28-14 58-41 70-28 12-57-1-75-25-19-27-19-63-2-84 14-18 37-23 65-18Z" />
          <path d="M632 177c41-43 115-60 180-45 67 15 112 57 121 109 9 53-18 98-70 118-53 20-110 5-152-28-35-27-79-38-96-78-12-28-5-53 17-76Z" />
          <path d="M739 337c46-18 96-6 126 27 29 32 36 78 13 111-22 32-70 42-114 24-42-16-79-51-83-90-3-32 21-58 58-72Z" />
        </g>

        {travels.map((travel) => {
          const point = project(travel);
          const isActive = travel.slug === activeSlug;

          return (
            <motion.g
              aria-label={`${travel.name} ${travel.englishName}，${travel.visitSummary}`}
              className="cursor-pointer outline-none"
              filter={isActive ? "url(#softGlow)" : undefined}
              key={travel.slug}
              onClick={() => scrollToCountry(travel.slug)}
              onFocus={() => setActiveSlug(travel.slug)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  scrollToCountry(travel.slug);
                }
              }}
              onMouseEnter={() => setActiveSlug(travel.slug)}
              role="button"
              tabIndex={0}
            >
              <motion.circle
                initial={false}
                opacity={isActive ? 0.25 : 0.14}
                r={isActive ? 19 : 13}
                animate={{ opacity: isActive ? 0.24 : 0.12, r: isActive ? 19 : 13 }}
                cx={point.x}
                cy={point.y}
                fill={travel.accent}
                transition={{ duration: 0.25 }}
              />
              <motion.circle
                initial={false}
                r={isActive ? 5.5 : 4}
                animate={{ r: isActive ? 5.5 : 4 }}
                cx={point.x}
                cy={point.y}
                fill={travel.accent}
                stroke="#fff8ef"
                strokeWidth="1.5"
                transition={{ duration: 0.25 }}
              />
            </motion.g>
          );
        })}
      </svg>

      {activeTravel && activePoint ? (
        <div
          className="pointer-events-none absolute w-[min(260px,calc(100%-2rem))] border border-white/15 bg-[#0a0908]/90 p-3 shadow-2xl backdrop-blur-md"
          style={{
            left: `${Math.min(Math.max(activePoint.x / 10, 10), 72)}%`,
            top: `${Math.min(Math.max(activePoint.y / 5.2, 8), 58)}%`
          }}
        >
          <div className="mb-3 aspect-[16/10] overflow-hidden">
            <img
              alt=""
              className="h-full w-full object-cover"
              src={activeTravel.coverImage}
            />
          </div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm uppercase text-[#b8aa9a]">{activeTravel.visitSummary}</p>
              <h3 className="text-xl text-[#fff8ef]">{activeTravel.name}</h3>
              <p className="text-xs uppercase text-[#8f8377]">{activeTravel.englishName}</p>
            </div>
            <span
              aria-hidden="true"
              className="mt-1 h-3 w-3 shrink-0"
              style={{ backgroundColor: activeTravel.accent }}
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-[#d7cabc]">{activeTravel.memory}</p>
        </div>
      ) : null}
    </div>
  );
}
