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
        className="relative overflow-hidden rounded-lg border border-white/10 bg-[#f5efe6] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
        onClick={() => setActiveSlug(null)}
      >
        <div className="relative aspect-[4/5] min-h-[420px]">
          <svg
            aria-label="英国地区地图"
            className="absolute inset-0 h-full w-full"
            role="img"
            viewBox="0 0 420 520"
          >
            <rect fill="#f5efe6" height="520" width="420" />
            <path
              d="M174 76 C210 58 253 75 266 115 C279 156 245 181 254 214 C263 245 298 257 294 294 C290 335 247 339 237 373 C229 400 250 425 227 449 C200 477 159 458 161 422 C163 390 188 372 174 340 C160 309 128 297 135 260 C142 222 177 217 167 182 C157 148 138 97 174 76 Z"
              fill="#393936"
              opacity="0.92"
            />
            <path
              d="M137 282 C154 276 176 286 177 307 C179 331 154 340 138 327 C121 313 119 290 137 282 Z"
              fill="#44413d"
              opacity="0.9"
            />
            <path
              d="M125 331 C146 326 162 343 157 364 C152 386 125 389 113 371 C100 352 105 336 125 331 Z"
              fill="#3d3a36"
              opacity="0.9"
            />
            <path
              d="M91 260 C113 252 132 267 131 288 C130 309 107 321 89 309 C70 297 69 268 91 260 Z"
              fill="#3c3935"
              opacity="0.9"
            />
            <path
              d="M162 76 C184 46 242 50 272 91"
              fill="none"
              opacity="0.35"
              stroke="#8f877c"
            />
            <path
              d="M155 183 C190 185 223 188 257 207"
              fill="none"
              opacity="0.28"
              stroke="#e8ded0"
            />
            <path
              d="M137 282 C177 284 222 290 294 294"
              fill="none"
              opacity="0.28"
              stroke="#e8ded0"
            />
            <path
              d="M161 422 C189 401 211 386 237 373"
              fill="none"
              opacity="0.26"
              stroke="#e8ded0"
            />
            <path
              d="M91 260 C105 284 107 296 89 309"
              fill="none"
              opacity="0.26"
              stroke="#e8ded0"
            />
          </svg>

          {sections.map((section) => {
            const isActive = activeSlug === section.slug;

            return (
              <button
                aria-label={`${section.name}，${section.year}`}
                className="group absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none"
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
                  animate={{ opacity: isActive ? 0.28 : 0.14, scale: isActive ? 1.35 : 1 }}
                  className="absolute h-6 w-6 rounded-full"
                  style={{ backgroundColor: section.accent }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={{ scale: isActive ? 1.18 : 1 }}
                  className="relative h-3 w-3 rounded-full border border-white shadow-[0_5px_18px_rgba(0,0,0,0.32)]"
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
        点击英国地图上的点会跳到下方对应地区。
      </p>
    </div>
  );
}
