"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  color?: string;
  className?: string;
  style?: CSSProperties;
};

export function SpotlightCard({
  children,
  color = "#E30613",
  className,
  style,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={cn("spotlight-card", className)}
      style={
        {
          "--spot-color": `${color}`,
          ...style,
        } as CSSProperties
      }
      onMouseMove={(e) => {
        if (reduced || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        ref.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        ref.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      }}
    >
      {children}
    </div>
  );
}

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  onClick?: () => void;
};

export function TiltCard({ children, className, maxTilt = 8, onClick }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const x = useSpring(rotateX, { stiffness: 260, damping: 22, mass: 0.5 });
  const y = useSpring(rotateY, { stiffness: 260, damping: 22, mass: 0.5 });

  if (reduced) {
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      onClick={onClick}
      style={{ rotateX: x, rotateY: y, transformPerspective: 1100 }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        rotateX.set(-((e.clientY - rect.top) / rect.height - 0.5) * maxTilt);
        rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * maxTilt);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
