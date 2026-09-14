"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const BANNERS = [
  { src: "/images/banners/banner-1.webp", alt: "Gearify Pro custom teamwear banner" },
  { src: "/images/banners/banner-2.webp", alt: "Gearify Pro soccer teamwear banner" },
  { src: "/images/banners/banner-3.webp", alt: "Gearify Pro cricket performance banner" },
  { src: "/images/banners/banner-4.webp", alt: "Gearify Pro all-sports equipment banner" },
];

const INTERVAL = 6000;

export function BannerRotator() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % BANNERS.length);
    }, INTERVAL);
    return () => window.clearInterval(t);
  }, [reduced, paused]);

  return (
    <section
      className="relative overflow-hidden bg-ink-950 py-10 md:py-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Promotional banners"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-3xl border border-[#e0e0e0] bg-[#f5f5f5] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={BANNERS[index].src}
                alt={BANNERS[index].alt}
                fill
                priority={index === 0}
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {BANNERS.map((b, i) => (
              <button
                key={b.src}
                onClick={() => setIndex(i)}
                aria-label={`Show banner ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-400",
                  i === index ? "w-8 bg-volt" : "w-2.5 bg-white/30 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
