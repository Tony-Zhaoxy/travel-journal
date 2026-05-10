"use client";

import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import type { TravelEntry } from "@/types/travel";

type InteractiveWorldMapProps = {
  travels: TravelEntry[];
};

type ProjectedPoint = {
  x: number;
  y: number;
};

type PanPosition = {
  x: number;
  y: number;
};

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  startPan: PanPosition;
};

const zoomLevels = [1, 1.25, 1.5] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

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
  const [zoomIndex, setZoomIndex] = useState(0);
  const [pan, setPan] = useState<PanPosition>({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

  const zoom = zoomLevels[zoomIndex];

  const activeTravel = useMemo(
    () => travels.find((travel) => travel.slug === activeSlug),
    [activeSlug, travels]
  );

  const activePoint = activeTravel ? project(activeTravel) : undefined;

  function clampPan(nextPan: PanPosition, nextZoom = zoom) {
    const viewport = viewportRef.current;

    if (!viewport || nextZoom === 1) {
      return { x: 0, y: 0 };
    }

    const maxX = (viewport.clientWidth * (nextZoom - 1)) / 2;
    const maxY = (viewport.clientHeight * (nextZoom - 1)) / 2;

    return {
      x: clamp(nextPan.x, -maxX, maxX),
      y: clamp(nextPan.y, -maxY, maxY)
    };
  }

  function changeZoom(direction: 1 | -1) {
    const nextIndex = clamp(zoomIndex + direction, 0, zoomLevels.length - 1);
    const nextZoom = zoomLevels[nextIndex];

    setZoomIndex(nextIndex);
    setPan((currentPan) => clampPan(currentPan, nextZoom));
  }

  function resetMapView() {
    setZoomIndex(0);
    setPan({ x: 0, y: 0 });
    setActiveSlug(null);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (zoom === 1) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startPan: pan
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const dragState = dragRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    setPan(
      clampPan({
        x: dragState.startPan.x + event.clientX - dragState.startX,
        y: dragState.startPan.y + event.clientY - dragState.startY
      })
    );
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
    }
  }

  return (
    <div className="space-y-4">
      <div
        className="relative overflow-hidden rounded-lg border border-[#e5ddd1] bg-[#fbf7ef] shadow-[0_24px_80px_rgba(31,27,21,0.12)]"
        onClick={() => setActiveSlug(null)}
      >
        <div className="absolute right-3 top-3 z-50 flex items-center gap-1 rounded-full border border-[#e6ded4] bg-white/86 p-1 text-[#2d2923] shadow-[0_10px_28px_rgba(31,27,21,0.12)] backdrop-blur">
          <button
            aria-label="缩小地图"
            className="grid h-8 w-8 place-items-center rounded-full text-lg leading-none transition hover:bg-[#f1e8db] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={zoomIndex === 0}
            onClick={(event) => {
              event.stopPropagation();
              changeZoom(-1);
            }}
            type="button"
          >
            -
          </button>
          <span className="min-w-10 text-center text-xs text-[#6f665d]">
            {zoom.toFixed(2).replace(/\.00$/, "")}x
          </span>
          <button
            aria-label="放大地图"
            className="grid h-8 w-8 place-items-center rounded-full text-lg leading-none transition hover:bg-[#f1e8db] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={zoomIndex === zoomLevels.length - 1}
            onClick={(event) => {
              event.stopPropagation();
              changeZoom(1);
            }}
            type="button"
          >
            +
          </button>
          <button
            aria-label="重置地图视图"
            className="hidden rounded-full px-3 py-2 text-xs text-[#6f665d] transition hover:bg-[#f1e8db] sm:block"
            onClick={(event) => {
              event.stopPropagation();
              resetMapView();
            }}
            type="button"
          >
            重置
          </button>
        </div>

        <div
          className={`relative aspect-[1672/941] w-full select-none md:min-h-[320px] ${
            zoom > 1 ? "touch-none cursor-grab active:cursor-grabbing" : "touch-pan-y"
          }`}
          onPointerCancel={handlePointerEnd}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          ref={viewportRef}
        >
          <motion.div
            animate={{ scale: zoom, x: pan.x, y: pan.y }}
            className="absolute inset-0"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
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
                  aria-label={`${travel.name}，${travel.city}，${travel.year}`}
                  className="group absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none"
                  key={travel.slug}
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveSlug(travel.slug);
                    scrollToCountry(travel.mapTargetSlug ?? travel.slug);
                  }}
                  onBlur={() => setActiveSlug(null)}
                  onFocus={() => setActiveSlug(travel.slug)}
                  onMouseEnter={() => setActiveSlug(travel.slug)}
                  onMouseLeave={() => setActiveSlug(null)}
                  onPointerDown={(event) => event.stopPropagation()}
                  style={{
                    left: `${Math.min(Math.max(point.x, 2), 98)}%`,
                    top: `${Math.min(Math.max(point.y, 6), 94)}%`,
                    zIndex: isActive ? 35 : 20
                  }}
                  title={`${travel.name} · ${travel.year}`}
                  type="button"
                >
                  <motion.span
                    animate={{ opacity: isActive ? 0.24 : 0.11, scale: isActive ? 1.3 : 1 }}
                    className="absolute h-4 w-4 rounded-full md:h-5 md:w-5"
                    style={{ backgroundColor: travel.accent }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    animate={{ scale: isActive ? 1.18 : 1 }}
                    className="relative h-2 w-2 rounded-full border border-white shadow-[0_3px_10px_rgba(0,0,0,0.24)] transition group-hover:shadow-[0_5px_14px_rgba(0,0,0,0.3)] md:h-2.5 md:w-2.5"
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
                  {activeTravel.year}
                </p>
                <h3 className="mt-1 text-xl font-normal">{activeTravel.name}</h3>
                <p className="mt-1 text-sm text-[#948879]">{activeTravel.englishName}</p>
                <p className="mt-2 text-sm text-[#6f665d]">{activeTravel.city}</p>
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </div>

      <p className="text-center text-xs leading-6 text-[#948879]">
        可轻微放大地图，放大后拖动查看细节；点击地图上的点会跳到对应记录。
      </p>
    </div>
  );
}
