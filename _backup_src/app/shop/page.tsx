"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, X, SlidersHorizontal } from "lucide-react";
import { PRODUCTS, type Product } from "@/lib/data";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const filtered =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const active = PRODUCTS.find((p) => p.id === activeId) ?? null;

  return (
    <main className="min-h-screen bg-ink-950 pt-32 pb-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Header */}
        <RevealStagger className="mb-14 md:mb-20">
          <RevealItem>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-volt">
              Shop
            </p>
            <h1 className="font-heading text-[clamp(2rem,5vw,4.5rem)] font-semibold uppercase leading-[1.05] tracking-tight text-ink-100">
              Every Product.
              <br />
              <span className="text-mist-500">Every Sport. One Place.</span>
            </h1>
          </RevealItem>
        </RevealStagger>

        {/* Category Filter */}
        <RevealStagger className="mb-10 flex flex-wrap gap-3">
          <RevealItem>
            <div className="flex items-center gap-2 rounded-full border border-[#2a2a30] bg-[#131316] px-4 py-2">
              <SlidersHorizontal className="size-4 text-mist-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mist-500">
                Filter
              </span>
            </div>
          </RevealItem>
          {CATEGORIES.map((cat) => (
            <RevealItem key={cat}>
              <button
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                  activeCategory === cat
                    ? "border-volt bg-volt/15 text-volt"
                    : "border-[#2a2a30] bg-[#131316] text-mist-400 hover:border-[#3a3a40]"
                }`}
              >
                {cat}
              </button>
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Product Count */}
        <p className="mb-8 text-sm text-mist-500">
          Showing {filtered.length} product{filtered.length !== 1 && "s"}
          {activeCategory !== "All" && (
            <span>
              {" "}
              in <span className="text-volt">{activeCategory}</span>
            </span>
          )}
        </p>

        {/* Product Grid */}
        <RevealStagger
          stagger={0.05}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((product) => (
            <RevealItem key={product.id}>
              <ProductCard
                product={product}
                onOpen={() => setActiveId(product.id)}
                reduced={!!reduced}
              />
            </RevealItem>
          ))}
        </RevealStagger>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-lg text-mist-500">No products found in this category.</p>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {active && (
          <QuickViewModal product={active} onClose={() => setActiveId(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}

function ProductCard({
  product,
  onOpen,
  reduced,
}: {
  product: Product;
  onOpen: () => void;
  reduced: boolean;
}) {
  return (
    <div className="group cursor-pointer rounded-3xl border border-[#2a2a30] bg-[#131316] transition-colors duration-500 hover:border-[#2a2a30]/60">
      <button
        onClick={onOpen}
        className="relative block w-full overflow-hidden rounded-3xl text-left"
        aria-label={`Quick view ${product.name}`}
      >
        <div className="relative aspect-[4/3]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/90 via-[#0a0a0b]/10 to-transparent" />
        </div>

        <div className="relative z-10 p-5">
          <div className="mb-2 flex items-center gap-2">
            {product.tag && (
              <span className="rounded-full bg-volt/15 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-volt">
                {product.tag}
              </span>
            )}
            <span className="rounded-full border border-[#2a2a30] bg-[#0a0a0b]/60 px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-mist-400 backdrop-blur">
              {product.category}
            </span>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="font-heading text-lg font-bold tracking-tight text-white">
                {product.name}
              </h3>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-mist-500">
                {product.sport} · From ${product.price}
              </p>
            </div>
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
              <ArrowUpRight className="size-3.5" />
            </span>
          </div>

          {!reduced && (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-mist-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {product.description}
            </p>
          )}
        </div>
      </button>
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
