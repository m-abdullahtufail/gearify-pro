"use client";

import { Marquee } from "@/components/ui/Marquee";
import { SPORTS } from "@/lib/data";

const WORDS = [
  "Custom Kits",
  "Team Identities",
  "Match-Day Gear",
  "Performance Fabric",
  "In-House Production",
  "Crest Embroidery",
];

export function MarqueeStrip() {
  const items = [...SPORTS, ...WORDS];

  return (
    <section className="relative border-y border-[rgb(227_6_19_/_0.16)] bg-[rgb(227_6_19_/_0.035)] py-6" aria-label="Sports and capabilities">
      <Marquee slow>
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-sans text-sm font-semibold uppercase tracking-[0.28em] text-mist-400">
              {typeof item === "string" ? item : item.name}
            </span>
            <span
              className="mx-8 size-1.5 rounded-full"
              style={{
                backgroundColor: "rgb(227 6 19 / 0.42)",
              }}
            />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
