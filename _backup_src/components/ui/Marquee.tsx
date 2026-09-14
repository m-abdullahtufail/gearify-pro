"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  slow?: boolean;
};

export function Marquee({ children, className, slow }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          slow ? "animate-marquee-slow motion-reduce:animate-none" : "animate-marquee motion-reduce:animate-none",
          "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}