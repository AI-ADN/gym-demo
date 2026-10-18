"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { site } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";

/** Decorative scroll-progress rail (wide screens only). The header remains the navigation. */
export function PulseRail() {
  const active = useActiveSection(site.sections);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const activeIndex = active ? site.sections.indexOf(active as (typeof site.sections)[number]) : -1;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 transition-opacity duration-500 rail:flex ${
        activeIndex < 0 ? "opacity-0" : "opacity-100"
      }`}
    >
      <span className="type-label tabular-nums text-pulse">{String(Math.max(activeIndex, 0) + 1).padStart(2, "0")}</span>
      <div className="relative flex h-[min(48vh,24rem)] w-px flex-col justify-between bg-bone/12">
        <motion.span style={{ scaleY: progress }} className="absolute inset-0 origin-top bg-pulse" />
        {site.sections.map((id, i) => (
          <span
            key={id}
            className={`relative block size-[5px] -translate-x-[2px] rounded-full transition-[background-color,transform] duration-300 ${
              i === activeIndex ? "scale-150 bg-pulse" : i < activeIndex ? "bg-pulse/70" : "bg-bone/30"
            }`}
          />
        ))}
      </div>
      <span className="type-label tabular-nums text-bone/40">{String(site.sections.length).padStart(2, "0")}</span>
    </div>
  );
}
