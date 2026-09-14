"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { KineticHeadline } from "./KineticHeadline";
import { Button, Magnetic } from "@/components/ui/Button";

const ALT_LINES = [
  "Every Thread. Every Stitch. Every Win.",
  "Engineered for the Moments That Matter.",
  "Where Craft Meets Competition.",
];

const HERO_BLUR =
  "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAADQAwCdASoYAA4APu1iqU2ppaQiMAgBMB2JZwABHuwCVCORfKelhNAA/v6Ht9V1LFg5bT6zHzeESVtMR81YrKbpnv3E0FpbmeKMC768Jn5xzOJ3pk+npUnJsfIxKZiR6IEwDsFb/5OlZ/z1lMgAAA==";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [lineIdx, setLineIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.25]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduced) return;
    const idx = v < 0.14 ? 0 : v < 0.45 ? 1 : 2;
    if (idx !== lineIdx) setLineIdx(idx);
  });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#0a0a0b]"
    >
      {/* ── Full-bleed hero photo ── */}
      <motion.div
        aria-hidden
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0"
      >
        <Image
          src="/images/gearify-hero-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={HERO_BLUR}
          className="object-cover object-[70%_center] md:object-[62%_center]"
        />
      </motion.div>

      {/* ── Dark overlays for text legibility ── */}
      <div className="absolute inset-0" aria-hidden>
        {/* left-to-right gradient so headline reads clearly */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/92 via-[#0a0a0b]/50 to-transparent" />
        {/* bottom gradient so scroll cue + bottom content read */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent" />
        {/* top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/60 via-transparent to-transparent" />
        {/* subtle grid texture */}
        <div className="grid-bg absolute inset-0 opacity-20 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />
        {/* ambient glow */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute -top-40 left-1/3 h-[600px] w-[800px] -translate-x-1/2 rounded-full blur-[140px]"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgb(227 6 19 / 0.14) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 pb-16 pt-36 md:px-10 lg:pt-32">
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-volt opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-volt" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-400">
              Performance Sportswear Studio
            </span>
          </motion.div>

          <KineticHeadline
            text="BUILT TO PERFORM."
            delay={0.22}
            className="font-display text-[clamp(2.9rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-white"
          />
          <KineticHeadline
            as="span"
            text="DESIGNED FOR YOUR TEAM."
            delay={0.5}
            charClassName="text-[#e30613]"
            className="mt-2 block font-display text-[clamp(2.9rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight"
          />

          <div className="mt-6 h-7 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIdx}
                initial={reduced ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduced ? undefined : { opacity: 0, y: -18, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-sm font-semibold uppercase tracking-[0.24em] text-mist-400"
              >
                {ALT_LINES[lineIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-md text-base leading-relaxed text-mist-400 md:text-lg"
          >
            Custom jerseys, kits, and team apparel engineered like
            equipment — not apparel. From floodlit turf to the big
            final, we build what your squad wears when it matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="/sports" size="lg">
              Explore Sports
            </Button>
            <Button href="/request-a-quote" variant="gradient" size="lg">
              Request a Quote
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="relative z-10 flex items-center justify-center pb-8"
      >
        <Magnetic strength={0.4} radius={70}>
          <Link
            href="#sports"
            className="flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-mist-500 transition-colors hover:text-white"
          >
            <span>Scroll</span>
            <motion.span
              animate={reduced ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="size-4" />
            </motion.span>
          </Link>
        </Magnetic>
      </motion.div>
    </section>
  );
}
