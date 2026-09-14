"use client";

import { useRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Magnetic({
  children,
  strength = 0.32,
  radius = 130,
  className,
}: {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.2 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.2 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        if (Math.hypot(dx, dy) > radius) {
          x.set(0);
          y.set(0);
          return;
        }
        x.set(dx * strength);
        y.set(dy * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

type ButtonProps = {
  href?: string;
  variant?: "primary" | "gradient" | "ghost" | "frost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const VARIANTS: Record<string, string> = {
  primary:
    "border border-volt/30 bg-volt/15 text-volt backdrop-blur-xl shadow-[0_0_24px_rgba(227,6,19,0.12)] hover:bg-volt/25 hover:border-volt/50 hover:shadow-[0_0_40px_rgba(227,6,19,0.28)]",
  gradient: "gradient-ring bg-ink-900/60 text-white backdrop-blur-sm",
  ghost: "hairline bg-ink-950/40 text-ink-100 hover:bg-ink-800",
  frost: "border border-frost/30 bg-frost/15 text-frost backdrop-blur-xl shadow-[0_0_24px_rgba(255,90,99,0.1)] hover:bg-frost/25 hover:border-frost/50 hover:shadow-[0_0_40px_rgba(255,90,99,0.25)]",
};

const SIZES: Record<string, string> = {
  sm: "h-10 px-5 text-xs",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-sm",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  magnetic = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = cn(
    "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300",
    VARIANTS[variant],
    SIZES[size],
    className
  );

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
    </>
  );

  const content = href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );

  if (!magnetic) return content;
  return <Magnetic>{content}</Magnetic>;
}
