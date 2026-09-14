"use client";

import { motion } from "framer-motion";

export function AnnouncementBar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-50 flex items-center justify-center border-b border-white/10 bg-transparent px-4 py-2.5 text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist-400">
        Under Construction
      </p>
    </motion.div>
  );
}
