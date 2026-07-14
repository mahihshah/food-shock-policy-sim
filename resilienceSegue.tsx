"use client";

// components/resilienceSegue.tsx
//
// The scrollytelling bridge between "you survived the shock" and the next
// phase ("this time, you have ten years"). Rendered by QuestionCard directly
// beneath the final outcome card whenever the current scenario isEnding —
// it lives in normal document flow, not fixed/absolute, so scrolling down
// reveals it while the outcome card stays exactly where it was. Nothing
// above it ever unmounts.
//
// STRUCTURE: three full-height "beats", each revealed as it scrolls into
// view via whileInView (no scroll-hijacking library needed):
//   1. reflection lines, one at a time
//   2. a rewind moment (clock spinning backwards)
//   3. the reframe + CTA button
//
// HOOK POINT: `onRestart` currently just restarts the existing simulator.
// Once the "ten years before the crisis" mode exists, swap the CTA's
// onClick for whatever kicks that off instead.

import { motion } from "framer-motion";

export interface ResilienceSegueProps {
  onRestart?: () => void;
}

const REFLECTION_LINES = [
  "You kept your country afloat.",
  "But every path came with painful trade-offs.",
  "There was never a perfect decision…",
  "…because you were already too late.",
];

export default function ResilienceSegue({ onRestart }: ResilienceSegueProps) {
  return (
    <section id="resilience-segue" className="mt-32 flex w-full flex-col items-center bg-[#14181B]">
      {/* Beat 1: reflection lines */}
      <div className="flex min-h-screen w-full max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
        {REFLECTION_LINES.map((line, index) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`font-[family-name:'Cabinet_Grotesk',sans-serif] leading-snug text-[#F2EFE9] ${
              index === REFLECTION_LINES.length - 1
                ? "text-2xl text-[#E8896F] md:text-3xl"
                : "text-xl text-[#F2EFE9]/80 md:text-2xl"
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* Beat 2: rewind moment */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <RewindClock />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-[family-name:'Cabinet_Grotesk',monospace] text-xs uppercase tracking-[0.3em] text-[#E8A33D]/70"
        >
          Rewinding…
        </motion.p>
      </div>

      {/* Beat 3: reframe + CTA */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 px-6 pb-32 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-3xl font-bold text-[#F2EFE9] md:text-5xl"
        >
          Let&apos;s try again.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg font-[family-name:'Cabinet_Grotesk',sans-serif] text-lg text-[#F2EFE9]/70 md:text-xl"
        >
          This time, you have ten years before the crisis.
        </motion.p>
        <motion.button
          type="button"
          onClick={() => {
            console.log("[ResilienceSegue] Continuing into the resilience phase");
            onRestart?.();
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 rounded-full border-2 border-[#E8A33D] bg-[#E8A33D]/10 px-10 py-4
                     font-[family-name:'Cabinet_Grotesk',sans-serif] text-base font-bold text-[#F2EFE9]
                     shadow-[0_0_30px_-5px_#E8A33D66] transition-colors hover:bg-[#E8A33D]/25
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/60 md:text-lg"
        >
          Begin the ten-year path
        </motion.button>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Sub-component: rewinding clock
// -----------------------------------------------------------------------------

function RewindClock() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="54" stroke="#E8A33D" strokeOpacity="0.3" strokeWidth="2" />
      <circle cx="60" cy="60" r="2.5" fill="#E8A33D" />
      {/* minute hand — spins backwards continuously */}
      <motion.line
        x1="60"
        y1="60"
        x2="60"
        y2="18"
        stroke="#E8A33D"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ transformOrigin: "60px 60px" }}
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      {/* hour hand — spins backwards, slower */}
      <motion.line
        x1="60"
        y1="60"
        x2="60"
        y2="34"
        stroke="#F2EFE9"
        strokeOpacity="0.6"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ transformOrigin: "60px 60px" }}
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}