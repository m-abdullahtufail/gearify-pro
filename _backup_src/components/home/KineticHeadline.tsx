"use client";

import { motion, useReducedMotion } from "framer-motion";

type KineticHeadlineProps = {
  text: string;
  className?: string;
  /** Applied to each animated character span (e.g. gradient-clip text) */
  charClassName?: string;
  delay?: number;
  charDuration?: number;
  as?: "h1" | "h2" | "h3" | "span";
};

export function KineticHeadline({
  text,
  className,
  charClassName,
  delay = 0,
  charDuration = 0.9,
  as: Tag = "h1",
}: KineticHeadlineProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced)
    return (
      <Tag className={className}>
        {words.map((word, w) => (
          <span key={w} className="inline-block whitespace-nowrap">
            {word}
            {w < words.length - 1 ? "\u00A0" : null}
          </span>
        ))}
      </Tag>
    );

  const baseByWord = words.map((_, w) =>
    words.slice(0, w).reduce((acc, word) => acc + word.length + 1, 0) - 1
  );

  return (
    <Tag className={className}>
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap align-bottom">
          {word.split("").map((char, c) => {
            const i = baseByWord[w] + c;
            return (
              <span key={c} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className={`inline-block will-change-[transform,filter] ${charClassName ?? ""}`}
                  initial={{ y: "112%", filter: "blur(10px)", opacity: 0 }}
                  animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
                  transition={{
                    duration: charDuration,
                    delay: delay + i * 0.03,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
          {w < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </Tag>
  );
}