"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SPORTS } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

const FOOTER_COLS = [
  {
    title: "Products",
    links: [
      { label: "Jerseys", href: "/products/jerseys" },
      { label: "Cricket Uniforms", href: "/products/cricket-uniforms" },
      { label: "Track Suits", href: "/products/track-suits" },
      { label: "Hoodies", href: "/products/hoodies" },
      { label: "Duffel Bags", href: "/products/duffel-bags" },
    ],
  },
  {
    title: "Sports",
    links: SPORTS.map((s) => ({ label: s.name, href: s.href })),
  },
  {
    title: "Company",
    links: [
      { label: "Custom Uniforms", href: "/custom-uniforms" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Request a Quote", href: "/request-a-quote" },
    ],
  },
];

export function Footer() {
  const reduced = useReducedMotion();

  return (
    <footer className="relative overflow-hidden border-t border-ink-700 bg-[#0a0a0b]">
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="relative block size-28" aria-label="Gearify Pro — home">
              <Image
                src="/images/gearify-logo-scrolled.png"
                alt=""
                fill
                sizes="112px"
                className="object-contain"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-400">
              A performance sportswear studio. Custom team uniforms,
              jerseys, and athletic apparel — built for the game,
              designed for your team.
            </p>
            <div className="mt-6 flex gap-3">
              {["Instagram", "X", "YouTube"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="rounded-full border border-ink-700 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-mist-400 transition-colors hover:border-white/40 hover:text-ink-100"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-mist-400 transition-colors hover:text-ink-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink-700 pt-6 text-xs text-mist-500 md:flex-row">
          <p>© {new Date().getFullYear()} Gearify Pro. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-ink-100">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-ink-100">
              Terms
            </Link>
            <Link href="#" className="transition-colors hover:text-ink-100">
              Shipping
            </Link>
          </div>
        </div>
      </div>

      <Reveal y={40} scale={1}>
        <div className="relative select-none overflow-hidden">
          <motion.p
            aria-hidden
            className="bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent bg-clip-text text-center font-sans text-[13.5vw] font-bold uppercase leading-[0.82] tracking-tight text-transparent"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Gearify Pro
          </motion.p>
          {!reduced && (
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              aria-hidden
            >
              <div
                className="h-full w-1/3 animate-sheen"
                style={{
                  background:
                    "linear-gradient(100deg, transparent 0%, rgba(198,255,61,0.14) 50%, transparent 100%)",
                }}
              />
            </div>
          )}
        </div>
      </Reveal>
    </footer>
  );
}
