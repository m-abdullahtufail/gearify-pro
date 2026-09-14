"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const reduced = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || reduced) return;

    const onMove = (e: MouseEvent) => {
      if (!enabled) {
        document.documentElement.classList.add("ua-cursor");
        setEnabled(true);
      }
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(target?.getAttribute("data-cursor") ?? null);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      document.documentElement.classList.remove("ua-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [reduced, x, y, enabled]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className={`-translate-x-1/2 -translate-y-1/2 flex size-3 items-center justify-center rounded-full ${
            label ? "scale-0" : "scale-100"
          }`}
          animate={{
            backgroundColor: "#E30613",
            scale: pressed ? 0.5 : label ? 0 : 1,
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border backdrop-blur-sm ${
            label
              ? "border-volt/60 bg-volt/10 px-4 py-2"
              : "size-9 border-white/25 bg-white/5"
          }`}
          animate={{
            scale: pressed ? 0.85 : 1,
            transition: { duration: 0.2 },
          }}
        >
          {label && (
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-volt whitespace-nowrap">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
