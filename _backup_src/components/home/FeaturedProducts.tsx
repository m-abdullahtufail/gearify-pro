"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { PRODUCTS, type Product } from "@/lib/data";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const SPAN: Record<string, string> = {
  "aero-match-jersey": "md:col-span-2 md:row-span-2",
  "command-cricket-uniform": "md:col-span-2",
  "payload-duffel": "md:col-span-2",
  "tundra-training-top": "md:col-span-2",
};

const FEATURED_IDS = [
  "aero-match-jersey",
  "command-cricket-uniform",
  "velocity-track-suit",
  "apex-tech-hoodie",
  "payload-duffel",
  "tundra-training-top",
  "courtside-jersey",
  "karate-master-gi",
];

export function FeaturedProducts() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const featured = PRODUCTS.filter((p) => FEATURED_IDS.includes(p.id));
  const active = PRODUCTS.find((p) => p.id === activeId) ?? null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section className="relative bg-ink-950 py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <RevealStagger className="mb-14 flex flex-col gap-5 md:mb-20 md:flex-row md:items-end md:justify-between">
          <RevealItem>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-volt">
              Featured Products
            </p>
            <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-semibold uppercase leading-tight tracking-tight text-ink-100">
              Gear That Earns
              <br />
              <span className="text-mist-500">Its Place In The Bag.</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <Button href="/shop" variant="ghost" size="md">
              View the full shop
              <ArrowRight className="size-4" />
            </Button>
          </RevealItem>
        </RevealStagger>

        <RevealStagger
          stagger={0.08}
          className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[240px]"
        >
          {featured.map((product) => (
            <RevealItem key={product.id} className={SPAN[product.id] ?? ""}>
              <QuickViewCard
                product={product}
                onOpen={() => setActiveId(product.id)}
                reduced={!!reduced}
              />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>

      <AnimatePresence>
        {active && (
          <QuickViewModal product={active} onClose={() => setActiveId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function QuickViewCard({
  product,
  onOpen,
  reduced,
}: {
  product: Product;
  onOpen: () => void;
  reduced: boolean;
}) {
  return (
    <div className="h-full">
      <motion.div
        layoutId={`qv-${product.id}`}
        className="h-full"
      >
        <div
          className="group h-full cursor-pointer rounded-3xl border border-[#2a2a30] bg-[#131316] transition-colors duration-500 hover:border-[#2a2a30]/60"
        >
          <button
            onClick={onOpen}
            className="relative block h-full w-full overflow-hidden rounded-3xl text-left"
            aria-label={`Quick view ${product.name}`}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/90 via-[#0a0a0b]/10 to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-end p-6">
              <div className="flex items-center gap-2">
                {product.tag && (
                  <span className="rounded-full bg-volt/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-volt">
                    {product.tag}
                  </span>
                )}
                <span className="rounded-full border border-[#2a2a30] bg-[#0a0a0b]/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-mist-400 backdrop-blur">
                  {product.category}
                </span>
              </div>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-heading text-xl font-bold tracking-tight text-white md:text-2xl">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-mist-500">
                    {product.sport} · From ${product.price}
                  </p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
              {!reduced && (
                <p className="mt-2 max-w-md text-xs leading-relaxed text-mist-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {product.description}
                </p>
              )}
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function QuickViewModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-end justify-center p-4 md:items-center md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} quick view`}
    >
      <motion.div
        className="absolute inset-0 bg-[#0a0a0b]/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        layoutId={`qv-${product.id}`}
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-[#2a2a30] bg-[#131316] shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
      >
        <div className="grid max-h-[85vh] overflow-y-auto md:grid-cols-2 md:overflow-hidden">
          <div className="relative aspect-square md:aspect-auto md:min-h-[420px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-5 p-8 md:p-10">
            <div className="flex items-center gap-2">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: product.color }}
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-mist-400">
                {product.category}
              </span>
              {product.tag && (
                <span className="rounded-full bg-volt/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-volt">
                  {product.tag}
                </span>
              )}
            </div>

            <h3 className="font-heading text-3xl font-bold tracking-tight text-white">
              {product.name}
            </h3>
            <p className="text-sm leading-relaxed text-mist-400">
              {product.description}
            </p>

            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
                Available sizes
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="rounded-full border border-[#2a2a30] bg-[#0a0a0b]/60 px-3.5 py-1.5 text-xs font-medium text-mist-400"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#2a2a30] pt-5">
              <p className="font-sans text-2xl font-bold text-white">
                ${product.price}
                <span className="ml-1 text-xs font-normal uppercase tracking-[0.18em] text-mist-500">
                  / unit
                </span>
              </p>
              {product.isCustomizable && (
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-volt">
                  Customizable
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href={product.href} size="md">
                View Product
                <ArrowRight className="size-4" />
              </Button>
              <Button
                href="/request-a-quote"
                variant="gradient"
                size="md"
                magnetic={false}
              >
                Team Quote
              </Button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/15 bg-[#0a0a0b]/60 text-mist-400 backdrop-blur transition-colors hover:text-ink-100"
        >
          <X className="size-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}
