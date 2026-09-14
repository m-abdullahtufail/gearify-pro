"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, PRODUCTS, SPORTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Button";
import { Button } from "@/components/ui/Button";

function Wordmark({ onClick, scrolled }: { onClick?: () => void; scrolled?: boolean }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="relative block size-14 shrink-0 sm:size-16"
      aria-label="Gearify Pro — home"
    >
      <Image
        src={scrolled ? "/images/gearify-logo-scrolled.png" : "/images/gearify-logo-red.png"}
        alt=""
        width={2469}
        height={947}
        priority
        sizes="64px"
        className="h-full w-full object-contain brightness-0 invert"
      />
    </Link>
  );
}

type SubmenuKey = "sports" | "shop" | null;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenu, setSubmenu] = useState<SubmenuKey>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = scrollYProgress;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrolled(v > 0.02);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSubmenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openSubmenu = (key: Exclude<SubmenuKey, null>) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setSubmenu(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setSubmenu(null), 120);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "glass py-2.5 shadow-[0_12px_48px_rgba(0,0,0,0.45)]"
            : "border-b border-transparent bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 md:px-10">
          <Wordmark scrolled={scrolled} />

          {/* ── Desktop nav with mega menus ── */}
          <nav
            ref={navRef}
            onMouseLeave={scheduleClose}
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => {
              const key = link.href === "/sports" || link.href === "/shop" ? (link.href.slice(1) as "sports" | "shop") : null;
              const isActive = pathname === link.href;
              return (
                <div key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onMouseEnter={() => key && openSubmenu(key)}
                    onClick={() => (key ? setSubmenu(key === submenu ? null : key) : setSubmenu(null))}
                    className={cn(
                      "group/nav relative flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-medium uppercase tracking-[0.16em] transition-colors",
                      isActive
                        ? "text-volt"
                        : "text-mist-400 hover:text-ink-100"
                    )}
                  >
                    {link.label}
                    {key && (
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-300",
                          submenu === key && "rotate-180"
                        )}
                      />
                    )}
                    <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-volt transition-transform duration-300 group-hover/nav:scale-x-100" />
                  </Link>

                  {key && (
                    <AnimatePresence>
                      {submenu === key && (
                        <MegaMenu
                          key={key}
                          type={key}
                          onNavigate={() => setSubmenu(null)}
                        />
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic strength={0.25} radius={90}>
              <Button
                href="/request-a-quote"
                size="sm"
                magnetic={false}
                className={cn(
                  "!bg-volt !text-white !border-volt hover:!bg-[#ff3945] transition-all duration-500",
                  scrolled
                    ? "opacity-100"
                    : "md:opacity-90"
                )}
              >
                Request a Quote
              </Button>
            </Magnetic>
            <button
              onClick={() => setMenuOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-ink-700 bg-ink-900/60 backdrop-blur transition-colors hover:border-white/40 lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <span className="relative block h-3 w-5">
                <span className="absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-white transition-transform duration-300" />
              <span className="absolute left-0 top-[5px] h-[1.5px] w-3/4 rounded-full bg-volt transition-all duration-300" />
                <span className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-white transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        {/* ── Scroll progress hairline ── */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-volt via-frost to-volt"
        />
      </motion.header>

      <AnimatePresence>
        {menuOpen && <MobileNav onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MegaMenu({
  type,
  onNavigate,
}: {
  type: "sports" | "shop";
  onNavigate: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 top-[calc(100%+10px)] w-[640px] -translate-x-1/2 overflow-hidden rounded-3xl border border-white/[0.12] bg-[#101012]/95 shadow-[0_40px_120px_rgba(0,0,0,0.72)] backdrop-blur-2xl"
    >
      <div className="pointer-events-auto p-3">
        {type === "sports" ? (
          <div className="grid grid-cols-5 gap-1.5">
            {SPORTS.map((sport, i) => (
              <motion.div
                key={sport.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
              >
                <Link
                  href={sport.href}
                  onClick={onNavigate}
                  className="group/sport flex flex-col gap-3 rounded-2xl border border-transparent p-4 transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.06]"
                >
                  <span
                    className="size-2.5 rounded-full transition-transform duration-300 group-hover/sport:scale-125"
                    style={{ backgroundColor: sport.color }}
                  />
                  <span>
                    <span className="block font-sans text-sm font-semibold uppercase tracking-wide text-white">
                      {sport.name}
                    </span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-mist-500">
                      {sport.productCount} collections
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1.5">
            {PRODUCTS.slice(0, 6).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
              >
                <Link
                  href={product.href}
                  onClick={onNavigate}
                  className="group/shop flex items-center justify-between rounded-2xl border border-transparent px-4 py-3.5 transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.06]"
                >
                  <span>
                    <span className="block font-sans text-sm font-semibold uppercase tracking-wide text-white">
                      {product.name}
                    </span>
                    <span className="mt-0.5 block text-[10px] uppercase tracking-[0.16em] text-mist-500">
                      {product.category}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 text-mist-500 transition-all duration-300 group-hover/shop:translate-x-0.5 group-hover/shop:text-volt" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-white/[0.1] bg-black/20 p-4">
        <Link
          href="/custom-uniforms"
          onClick={onNavigate}
          className="group flex items-center justify-between rounded-2xl border border-volt/20 bg-gradient-to-r from-volt/[0.16] via-volt/[0.05] to-transparent px-5 py-4"
        >
          <div>
            <p className="font-sans text-base font-semibold uppercase tracking-wide text-white">
              Custom Team Uniforms
            </p>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-mist-400">
              Colors, crests, names — built for your squad
            </p>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-volt text-black transition-transform duration-300 group-hover:scale-110">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

function MobileNav({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0b]/95 backdrop-blur-2xl"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between px-6 py-5">
        <Wordmark onClick={onClose} />
        <button
          onClick={onClose}
          className="inline-flex size-11 items-center justify-center rounded-full border border-ink-700 text-mist-400 transition-colors hover:text-white"
          aria-label="Close menu"
        >
          <span className="relative block h-3 w-5">
            <span className="absolute left-0 top-[5px] h-[1.5px] w-full rotate-45 rounded-full bg-white" />
            <span className="absolute left-0 top-[5px] h-[1.5px] w-full -rotate-45 rounded-full bg-white" />
          </span>
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-2 px-8" aria-label="Mobile">
        {NAV_LINKS.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="group flex items-baseline gap-4 py-2"
            >
              <span className="font-sans text-[11px] font-medium text-volt">
                0{i + 1}
              </span>
              <span className="font-sans text-4xl font-bold uppercase tracking-tight text-white transition-colors group-hover:text-volt">
                {link.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="px-8 pb-10"
      >
        <Link
          href="/request-a-quote"
          onClick={onClose}
          className="flex h-14 w-full items-center justify-center rounded-full bg-volt font-sans text-sm font-semibold uppercase tracking-[0.16em] text-black"
        >
          Request a Quote
        </Link>
      </motion.div>
    </motion.div>
  );
}
