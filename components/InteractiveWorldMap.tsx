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
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeTravel = useMemo(
    () => travels.find((travel) => travel.slug === activeSlug),
    [activeSlug, travels]
  );

  const activePoint = activeTravel ? project(activeTravel) : undefined;

  return (
    <div
      className="relative h-full min-h-[340px] overflow-hidden border border-white/15 bg-[#0d1618]/80 shadow-2xl shadow-black/30 backdrop-blur-md"
      onClick={() => setActiveSlug(null)}
    >
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
            <stop offset="0%" stopColor="#f1dfc8" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#6a8d88" stopOpacity="0.46" />
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

        <g
          fill="url(#landGradient)"
          stroke="rgba(246,240,231,0.48)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        >
          <path d="M42 142 L70 121 L105 112 L91 135 L63 151 L48 168 L31 160 Z" />
          <path d="M68 147 L96 121 L132 108 L169 92 L207 90 L236 101 L264 105 L293 124 L321 151 L351 160 L370 184 L352 216 L319 230 L284 222 L260 238 L232 241 L208 257 L176 254 L152 232 L130 220 L110 198 L82 187 L62 166 Z" />
          <path d="M303 239 L333 250 L358 263 L386 270 L401 283 L379 293 L345 280 L318 264 Z" />
          <path d="M378 62 L425 51 L469 67 L482 99 L447 123 L399 119 L370 92 Z" />
          <path d="M323 286 L356 291 L387 315 L401 354 L389 392 L366 430 L354 475 L328 498 L304 471 L293 427 L276 395 L283 352 L300 323 Z" />
          <path d="M449 134 L459 124 L466 143 L452 153 Z" />
          <path d="M464 116 L479 105 L492 124 L480 145 L462 137 Z" />
          <path d="M532 90 L566 58 L596 68 L589 105 L566 126 L543 111 Z" />
          <path d="M491 126 L515 111 L544 109 L568 124 L563 145 L538 151 L525 166 L501 160 L482 142 Z" />
          <path d="M520 171 L560 162 L602 178 L632 214 L642 260 L622 311 L597 357 L562 384 L536 355 L519 307 L496 272 L502 220 Z" />
          <path d="M566 166 L584 125 L631 98 L684 101 L727 87 L776 105 L835 113 L895 145 L930 184 L906 222 L861 222 L832 250 L789 241 L755 268 L717 247 L683 245 L658 217 L621 210 L606 181 Z" />
          <path d="M725 255 L755 275 L785 290 L806 322 L779 335 L747 310 L721 286 Z" />
          <path d="M762 363 L812 345 L874 357 L912 388 L896 425 L842 437 L791 420 L748 394 Z" />
          <path d="M918 438 L944 454 L934 471 L909 456 Z" />
          <path d="M68 488 L165 468 L267 478 L383 468 L497 486 L624 470 L752 482 L895 467 L963 489 L918 507 L741 501 L583 510 L417 500 L249 510 L111 503 Z" />
        </g>

        <g className="select-none text-[11px]" fill="rgba(246,240,231,0.36)">
          <text x="172" y="172">北美洲</text>
          <text x="322" y="376">南美洲</text>
          <text x="505" y="137">欧洲</text>
          <text x="552" y="274">非洲</text>
          <text x="726" y="165">亚洲</text>
          <text x="800" y="397">澳洲</text>
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
              onClick={(event) => {
                event.stopPropagation();
                setActiveSlug(travel.slug);
                scrollToCountry(travel.slug);
              }}
              onFocus={() => setActiveSlug(travel.slug)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveSlug(travel.slug);
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
