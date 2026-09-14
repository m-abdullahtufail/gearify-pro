"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SPORTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";

type Cell = {
  slug: string;
  span: string;
};

const LAYOUT: Cell[] = [
  { slug: "soccer", span: "md:col-span-2 md:row-span-2" },
  { slug: "cricket", span: "" },
  { slug: "basketball", span: "" },
  { slug: "baseball", span: "" },
  { slug: "ice-hockey", span: "" },
  { slug: "track-suit", span: "" },
  { slug: "hoodies", span: "" },
  { slug: "duffel", span: "" },
  { slug: "karate", span: "" },
];

const CARD_IMAGES: Record<string, string> = {
  soccer: "/images/cards/soccer.webp",
  cricket: "/images/cards/cricket.webp",
  basketball: "/images/cards/basketball.webp",
  baseball: "/images/cards/baseball.webp",
  "ice-hockey": "/images/cards/ice-hockey.webp",
  "track-suit": "/images/cards/track-suit.webp",
  hoodies: "/images/cards/hoodie.webp",
  duffel: "/images/cards/duffel.webp",
  karate: "/images/cards/karate.webp",
};

export function SportCategories() {
  const ordered = LAYOUT.map((cell) => ({
    cell,
    sport: SPORTS.find((s) => s.slug === cell.slug)!,
  }));

  return (
    <section id="sports" className="relative scroll-mt-24 bg-ink-950 py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <RevealStagger className="mb-14 md:mb-20">
          <RevealItem>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-volt">
              Shop by Sport
            </p>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-2xl font-heading text-[clamp(2rem,4vw,3.5rem)] font-semibold uppercase leading-[1.05] tracking-tight text-ink-100">
                Pick Your Discipline.
                <br />
                <span className="text-[#666666]">We Engineered For It.</span>
              </h2>
              <p className="max-w-sm pb-1 text-sm leading-relaxed text-[#555555] md:text-right">
                Every category is backed by sport-specific pattern work,
                moisture management, and durability testing. Start where
                your team plays.
              </p>
            </div>
          </RevealItem>
          <div className="mt-10 h-px w-full bg-[#e0e0e0]" />
        </RevealStagger>

        <RevealStagger stagger={0.09} className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[220px] lg:auto-rows-[240px]">
          {ordered.map(({ cell, sport }) => (
            <RevealItem key={sport.slug} className={cn(cell.span)}>
              <div className={cn("h-full", cell.span)}>
                <div className="group h-full rounded-3xl border border-[#2a2a30] bg-[#131316] transition-colors duration-500 hover:border-[#2a2a30]/60">
                  <Link
                    href={sport.href}
                    className="relative block h-full w-full overflow-hidden rounded-3xl p-6"
                  >
                    <Image
                      src={CARD_IMAGES[sport.slug]}
                      alt={sport.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/90 via-[#0a0a0b]/20 to-transparent" />

                    <div className="relative z-10 flex h-full flex-col justify-end">
                      <div className="flex items-center gap-2">
                        <span
                          className="size-2 rounded-full"
                          style={{ backgroundColor: sport.color }}
                        />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mist-400">
                          {sport.productCount} collections
                        </span>
                      </div>
                      <div className="mt-2 flex items-end justify-between gap-4">
                        <h3 className="font-heading text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-volt md:text-3xl">
                          {sport.name}
                        </h3>
                        <span className="mb-1 grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </div>
                      <p className="mt-2 max-w-md text-xs leading-relaxed text-mist-400 opacity-0 transition-all duration-500 group-hover:opacity-100">
                        {sport.blurb}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
