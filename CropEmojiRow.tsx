"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Each slot cycles through its own tiny set of crop emojis on click —
// a light, non-distracting gamification touch for the landing screen.
const CROP_SETS: string[][] = [
  ["🌾", "🌽", "🍚"],
  ["🥔", "🫘", "🌱"],
  ["🍞", "🥖", "🥯"],
  ["🐄", "🥛", "🧀"],
  ["🐟", "🦐", "🍤"],
];

export function CropEmojiRow() {
  const [indices, setIndices] = useState<number[]>(CROP_SETS.map(() => 0));

  const cycle = (slotIndex: number) => {
    setIndices((prev) => {
      const next = [...prev];
      next[slotIndex] = (next[slotIndex] + 1) % CROP_SETS[slotIndex].length;
      return next;
    });
  };

  return (
    <div className="flex items-center justify-center gap-3 pb-2" aria-hidden={false}>
      {CROP_SETS.map((set, slotIndex) => (
        <motion.button
          key={slotIndex}
          type="button"
          onClick={() => cycle(slotIndex)}
          whileHover={{ scale: 1.15, rotate: -4 }}
          whileTap={{ scale: 0.85, rotate: 8 }}
          className="flex h-11 w-11 items-center justify-center rounded-full border
                     border-[var(--color-border)] bg-[var(--color-surface)]/60 text-xl
                     transition-colors hover:border-[var(--color-accent)]/50
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60"
          aria-label="Tap to change crop"
        >
          <motion.span
            key={indices[slotIndex]}
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            {set[indices[slotIndex]]}
          </motion.span>
        </motion.button>
      ))}
    </div>
  );
}