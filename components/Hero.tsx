"use client";

import { motion } from "framer-motion";
import type { TravelEntry } from "@/types/travel";
import { InteractiveWorldMap } from "@/components/InteractiveWorldMap";

type HeroProps = {
  travels: TravelEntry[];
};

export function Hero({ travels }: HeroProps) {
  const featured = travels[0];

  return (
    <section
      className="relative min-h-[96vh] overflow-hidden bg-[#080807] px-5 pb-8 pt-28 text-[#f6f0e7] sm:px-8"
      id="atlas"
    >
      <div className="absolute inset-0">
        <img
          alt=""
          className="h-full w-full object-cover opacity-70"
          src={featured.coverImage}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_24%,rgba(236,177,113,0.28),transparent_32%),linear-gradient(180deg,rgba(8,8,7,0.20),#080807_88%)]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(96vh-9rem)] max-w-6xl content-end gap-10">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl space-y-7"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm uppercase text-[#e7d8c7]">
            Personal photography atlas / 14 places
          </p>
          <h1 className="text-5xl font-normal text-balance text-white md:text-7xl">
            Travel Field Notes
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[#e8dccd] md:text-xl">
            A cinematic journal of countries, routes, photographs, and the small
            life details that stay bright long after returning home.
          </p>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="min-h-[310px]"
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <InteractiveWorldMap travels={travels} />
        </motion.div>
      </div>
    </section>
  );
}
