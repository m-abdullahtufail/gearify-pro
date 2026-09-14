"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { WHY_STATS } from "@/lib/data";

const FEATURES = [
  {
    title: "Lab-grade fabrics",
    body: "Moisture-wicking knits, four-way stretch, and abrasion panels tested where you play, not just in a brochure.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-7" aria-hidden>
        <motion.path
          d="M4 17 L8 9 L12 14 L15 7 L20 17 Z"
          stroke="#e30613"
          strokeWidth="1.6"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <motion.path
          d="M4 20 H20"
          stroke="#9A9AA2"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
        />
      </svg>
    ),
  },
  {
    title: "In-house production",
    body: "Cut, sewn, and QC'd under one roof. No middlemen, no label swaps — just your crest on fabric that holds.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-7" aria-hidden>
        <motion.path
          d="M12 3 L20 7 V13 C20 18 16.6 20.6 12 21.6 C7.4 20.6 4 18 4 13 V7 Z"
          stroke="#e30613"
          strokeWidth="1.6"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <motion.path
          d="M9 12 L11.2 14.4 L15.4 9.4"
          stroke="#e30613"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.9, ease: "easeInOut" }}
        />
      </svg>
    ),
  },
  {
    title: "Design to delivery",
    body: "A single team owns your order end to end. Spec sheets, mockups, and fit checks before anything ships.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-7" aria-hidden>
        <motion.path
          d="M4 18 L9 10 L13 14 L17 7 L20 11"
          stroke="#e30613"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <motion.path
          d="M4 20 H20"
          stroke="#9A9AA2"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
        />
        <motion.circle
          cx="17"
          cy="7"
          r="2"
          fill="#e30613"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6, duration: 0.4 }}
        />
      </svg>
    ),
  },
];

export function WhyGearifyPro() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 md:py-36">
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal className="mb-14 max-w-2xl md:mb-20">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-volt">
            Why Gearify Pro
          </p>
          <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-semibold uppercase leading-[1.05] tracking-tight text-ink-100">
            Built Like Equipment,
            <br />
            <span className="text-[#666666]">Worn Like Identity.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#555555]">
            Five hundred teams have stopped settling for off-the-shelf
            gear. Here is what happens when sportswear is built like a
            performance product.
          </p>
        </Reveal>

        <RevealStagger className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {WHY_STATS.map((stat, i) => (
            <RevealItem key={stat.label}>
              <div className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#131316] p-7 transition-all duration-500 hover:border-white/[0.12] md:p-9">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
                <div className="relative flex h-full flex-col justify-between gap-8">
                  <div className="flex items-start justify-between">
                    <p className="font-heading text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <span
                      aria-hidden
                      className="mt-2 size-2 rounded-full"
                      style={{
                        backgroundColor: ["#E30613", "#FF5A63", "#8F1018", "#7A2028"][i],
                      }}
                    />
                  </div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#777777]">
                    {stat.label}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <RevealStagger className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <RevealItem key={feature.title}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.06] bg-[#131316] p-8 transition-all duration-500 hover:border-white/[0.12]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
                <div className="relative">
                  <div className="mb-6 grid size-14 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04] transition-colors duration-500 group-hover:border-volt/30">
                    {feature.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#777777]">
                    {feature.body}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
