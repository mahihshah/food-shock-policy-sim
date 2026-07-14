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

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

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

      {/* Beat 2: crop-loader moment */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 px-6 text-center">
        <CropLoader />
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
// Sub-component: crop-icon loader
//
// A small grid of crop/food emoji pop in one at a time, each gap shorter
// than the last (accelerating), then the whole grid zooms out and fades —
// reading like a quick "recalculating the world" beat. Runs once, the
// moment this section scrolls into view.
// -----------------------------------------------------------------------------

const CROP_ICONS = ["🌾", "🌽", "🍚", "🌱", "🫘", "🍞", "🥔"];

// Accelerating gaps between each icon appearing (seconds) — decreasing, so
// the loader visibly speeds up as it fills.
const ICON_GAPS = [0, 0.32, 0.26, 0.21, 0.16, 0.12, 0.09];
const ICON_DELAYS = ICON_GAPS.reduce<number[]>((acc, gap, i) => {
  acc.push((acc[i - 1] ?? 0) + gap);
  return acc;
}, []);

function CropLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const gridControls = useAnimation();
  const zoomControls = useAnimation();

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;

    async function playSequence() {
      console.log("[ResilienceSegue] CropLoader entering view — playing sequence");
      await gridControls.start("visible");
      if (cancelled) return;
      // Brief hold once the grid is full, then zoom out + fade — total
      // runtime lands comfortably inside a 3–4s window.
      await new Promise((resolve) => setTimeout(resolve, 350));
      if (cancelled) return;
      await zoomControls.start({
        scale: 6,
        opacity: 0,
        transition: { duration: 0.7, ease: [0.55, 0, 1, 0.45] },
      });
    }

    playSequence();
    return () => {
      cancelled = true;
    };
  }, [isInView, gridControls, zoomControls]);

  return (
    <motion.div ref={ref} animate={zoomControls} className="flex flex-col items-center gap-6">
      <motion.div
        initial="hidden"
        animate={gridControls}
        className="grid grid-cols-4 gap-3 rounded-2xl border border-[#E8A33D]/25 bg-white/[0.03] p-5"
      >
        {CROP_ICONS.map((icon, index) => (
          <motion.span
            key={icon + index}
            custom={index}
            variants={{
              hidden: { opacity: 0, scale: 0.4 },
              visible: (i: number) => ({
                opacity: 1,
                scale: 1,
                transition: { duration: 0.28, delay: ICON_DELAYS[i], ease: [0.22, 1, 0.36, 1] },
              }),
            }}
            className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/[0.04] text-3xl"
          >
            {icon}
          </motion.span>
        ))}
        {/* 8th grid cell left empty on purpose — 7 icons in a 4-wide grid
            reads as "still filling", which suits the loading feel. */}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={gridControls}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 1.1, duration: 0.5 } } }}
        className="font-[family-name:'Cabinet_Grotesk',monospace] text-xs uppercase tracking-[0.3em] text-[#E8A33D]/70"
      >
        Recalculating…
      </motion.p>
    </motion.div>
  );
}