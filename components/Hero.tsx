"use client";

import { motion } from "framer-motion";
import type { TravelEntry } from "@/types/travel";
import { InteractiveWorldMap } from "@/components/InteractiveWorldMap";

type HeroProps = {
  travels: TravelEntry[];
};

export function Hero({ travels }: HeroProps) {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#f5efe6] px-5 pb-10 pt-28 text-[#2d2923] sm:px-8"
      id="atlas"
    >
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] max-w-6xl content-center gap-10">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl space-y-5 text-center"
          initial={false}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm uppercase text-[#948879]">
            Personal travel atlas / {travels.length} 个国家、地区与州
          </p>
          <h1 className="text-5xl font-normal text-balance md:text-7xl">旅行札记</h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-[#6f665d] md:text-lg">
            先从一张安静的世界地图进入，把去过的国家、地区、路线和照片慢慢整理成自己的生活记录。
          </p>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-full"
          initial={false}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <InteractiveWorldMap travels={travels} />
        </motion.div>
      </div>
    </section>
  );
}
