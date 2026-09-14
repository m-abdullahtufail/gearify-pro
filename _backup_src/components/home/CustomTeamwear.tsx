"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { CUSTOM_COLORS } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function JerseyPreview({ primary, trim }: { primary: string; trim: string }) {
  return (
    <svg
      viewBox="0 0 320 440"
      className="h-full w-full"
      role="img"
      aria-label="Custom jersey preview"
    >
      <defs>
        <radialGradient id="jersey-glow" cx="50%" cy="30%" r="75%">
          <stop offset="0%" stopColor={primary} stopOpacity="0.28" />
          <stop offset="100%" stopColor={primary} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="160" cy="220" rx="150" ry="195" fill="url(#jersey-glow)" />

      {/* sleeves */}
      <path
        d="M92 118 L38 138 Q28 142 30 152 L40 190 Q44 200 56 196 L106 172 Z"
        fill={primary}
        stroke={trim}
        strokeWidth="3"
        style={{ transition: "fill 0.5s ease" }}
        opacity="0.92"
      />
      <path
        d="M228 118 L282 138 Q292 142 290 152 L280 190 Q276 200 264 196 L214 172 Z"
        fill={primary}
        stroke={trim}
        strokeWidth="3"
        style={{ transition: "fill 0.5s ease" }}
        opacity="0.92"
      />

      {/* body */}
      <path
        d="M160 96 Q95 96 78 130 L84 300 Q88 342 128 352 L160 360 L192 352 Q232 342 236 300 L242 130 Q225 96 160 96 Z"
        fill={primary}
        stroke={trim}
        strokeWidth="3.5"
        style={{ transition: "fill 0.5s ease" }}
      />

      {/* collar */}
      <path
        d="M160 96 Q140 96 138 80 Q150 90 160 90 Q170 90 182 80 Q180 96 160 96 Z"
        fill={trim}
        style={{ transition: "fill 0.5s ease" }}
      />

      {/* chest band */}
      <rect
        x="94"
        y="168"
        width="132"
        height="26"
        rx="6"
        fill={trim}
        style={{ transition: "fill 0.5s ease" }}
      />

      {/* number */}
      <text
        x="160"
        y="300"
        textAnchor="middle"
        fontFamily='"Angela Love Sans", sans-serif'
        fontSize="62"
        fontWeight="700"
        fill={trim}
        opacity="0.9"
        style={{ transition: "fill 0.5s ease" }}
      >
        07
      </text>

      {/* stitch dashes */}
      <path
        d="M92 148 Q90 230 94 320 M228 148 Q230 230 226 320"
        stroke={trim}
        strokeWidth="1.6"
        strokeDasharray="0.5 9"
        fill="none"
        opacity="0.55"
        style={{ transition: "stroke 0.5s ease" }}
      />
      <path
        d="M112 118 L112 344 M208 118 L208 344"
        stroke={trim}
        strokeWidth="1.2"
        strokeDasharray="0.5 12"
        fill="none"
        opacity="0.35"
      />
    </svg>
  );
}

export function CustomTeamwear() {
  const [primary, setPrimary] = useState(CUSTOM_COLORS[0].hex);
  const [trim, setTrim] = useState("#FFFFFF");
  const reduced = useReducedMotion();

  const primarySwatch = CUSTOM_COLORS.find((c) => c.hex === primary);

  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 md:py-36">
      {/* stitching lines drawing in */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 w-full opacity-60"
        viewBox="0 0 1600 200"
        preserveAspectRatio="none"
      >
        {[
          "M0 40 H1600",
          "M0 80 H1600",
          "M0 120 H1600",
          "M0 160 H1600",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke={i % 2 === 0 ? "#E30613" : "#FF5A63"}
            strokeOpacity="0.12"
            strokeWidth="1.5"
            strokeDasharray="10 14"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 2.4, delay: i * 0.35, ease: "easeInOut" }}
          />
        ))}
      </svg>

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-14 px-6 md:px-10 lg:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-volt">
            Custom Teamwear
          </p>
          <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-tight text-white">
            Your colors. Your crest.
            <br />
            <span className="text-mist-500">Built like a pro kit.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-mist-400">
            Start with a color. This is the seed of our full jersey
            designer — swap base and trim live, then take the design
            into production with your crest, names, and numbers.
          </p>

          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-400">
                Base color
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-mist-500">
                {primarySwatch?.name}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {CUSTOM_COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setPrimary(c.hex)}
                  aria-label={`Set base color to ${c.name}`}
                  className={cn(
                    "group relative grid size-10 place-items-center rounded-full border-2 transition-all duration-300",
                    primary === c.hex
                      ? "scale-110 border-white"
                      : "border-transparent hover:scale-105 hover:border-white/40"
                  )}
                  style={{ backgroundColor: c.hex }}
                >
                  {primary === c.hex && (
                    <motion.span
                      layoutId="swatch-check"
                      className="grid size-4 place-items-center"
                    >
                      <Check
                        className={cn(
                          "size-3.5",
                          c.name === "Team Black" ? "text-ink-100" : "text-ink-950"
                        )}
                      />
                    </motion.span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 mb-4 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-400">
                Trim color
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["#FFFFFF", "#0A0A0B", "#E30613", "#8F1018"].map((hex) => (
                <button
                  key={hex}
                  onClick={() => setTrim(hex)}
                  aria-label={`Set trim color to ${hex}`}
                  className={cn(
                    "size-8 rounded-full border-2 transition-all duration-300",
                    trim === hex
                      ? "scale-110 border-volt"
                      : "border-transparent hover:border-white/40"
                  )}
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/custom-uniforms" size="lg">
                Start Your Design
              </Button>
              <Button href="/request-a-quote" variant="ghost" size="lg">
                Get a Team Quote
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mx-auto aspect-[4/5] max-w-md">
            <div
              className="absolute inset-0 rounded-[2.5rem] border border-[#e0e0e0] bg-[#f5f5f5]/60"
              aria-hidden
            />
            <div
              className="absolute inset-4 overflow-hidden rounded-[2rem]"
            >
              <motion.div
                animate={reduced ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-full"
              >
                <JerseyPreview primary={primary} trim={trim} />
              </motion.div>
            </div>
            <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#e0e0e0] bg-white/80 px-5 py-2.5 backdrop-blur-xl">
              <span
                className="size-3 rounded-full border border-white/20"
                style={{ backgroundColor: primary }}
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-mist-400">
                Live preview — {primarySwatch?.name} base
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
