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

function project({ lat, lng }: TravelEntry["coordinates"]): ProjectedPoint {
  return {
    x: ((lng + 180) / 360) * 1000,
    y: ((90 - lat) / 180) * 520
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

  const activePoint = activeTravel ? project(activeTravel.coordinates) : undefined;

  return (
    <div className="relative h-full min-h-[310px] overflow-hidden border border-white/15 bg-[#0d1618]/70 shadow-2xl shadow-black/30 backdrop-blur-md">
      <div className="map-grid absolute inset-0 opacity-40" />
      <svg
        aria-label="Visited places world map"
        className="relative h-full min-h-[310px] w-full"
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
          <path d="M143 143c31-42 86-57 129-43 43 15 74 48 93 90 18 40 8 84-18 115-25 31-62 43-102 33-46-11-76-39-111-65-36-28-53-75-31-113 8-14 23-15 40-17Z" />
          <path d="M270 324c35 4 65 27 72 60 7 31-6 76-34 89-29 14-65-3-83-31-21-33-23-74-8-99 10-17 29-22 53-19Z" />
          <path d="M452 118c43-23 104-23 155-1 52 22 81 70 80 121-1 42-28 68-72 75-46 7-78-10-111-34-37-26-87-35-104-78-14-36 13-63 52-83Z" />
          <path d="M500 283c28 7 44 27 46 51 2 24-12 54-36 64-26 11-52 0-68-22-17-25-18-58-3-78 13-17 35-20 61-15Z" />
          <path d="M639 182c36-42 105-60 165-46 62 14 104 53 113 102 9 50-16 92-64 111-48 18-101 5-139-25-32-25-73-35-89-73-11-26-6-49 14-69Z" />
          <path d="M742 340c43-16 89-5 116 25 27 30 34 72 13 103-20 30-64 39-105 23-38-15-72-47-76-83-3-30 18-55 52-68Z" />
        </g>

        {travels.map((travel) => {
          const point = project(travel.coordinates);
          const isActive = travel.slug === activeSlug;

          return (
            <motion.g
              aria-label={`${travel.name}, ${travel.visitedYear}`}
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
                animate={{ opacity: isActive ? 0.24 : 0.12, r: isActive ? 19 : 13 }}
                cx={point.x}
                cy={point.y}
                fill={travel.accent}
                transition={{ duration: 0.25 }}
              />
              <motion.circle
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
              <p className="text-sm uppercase text-[#b8aa9a]">{activeTravel.visitedYear}</p>
              <h3 className="text-xl text-[#fff8ef]">{activeTravel.name}</h3>
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
