"use client";

import { motion } from "framer-motion";

export function AnnouncementBar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-50 flex items-center justify-center border-b border-volt/20 bg-volt/[0.06] px-4 py-2 text-center"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-300">
        Under Construction — A Project of{" "}
        <a
          href="https://primedotstudio.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-volt transition-colors hover:text-frost"
        >
          Prime Dot Studio
        </a>
      </p>
    </motion.div>
  );
}
