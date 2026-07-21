"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import ResilienceCards from "./resilienceCards";

export interface ResilienceSegueProps {
  onRestart?: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.3 };

function ScrollNudge({ targetId, label = "Keep scrolling" }: { targetId: string; label?: string }) {
  return (
    <motion.button
      type="button"
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, y: [0, 8, 0] }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ opacity: { delay: 1.3, duration: 0.6 }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
      className="mt-8 flex flex-col items-center gap-2 text-[var(--color-accent)]/70 transition-colors hover:text-[var(--color-accent)]
                 focus-visible:outline-none"
      aria-label={label}
    >
      <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-widest">
        {label}
      </span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  );
}

export default function ResilienceSegue({ onRestart }: ResilienceSegueProps) {
  return (
    <section id="resilience-segue" className="mt-16 flex w-full flex-col items-center bg-[var(--color-background)]">
      <div id="resilience-group-a" className="flex min-h-screen w-full max-w-xl snap-start flex-col items-center justify-center gap-6 px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.7, ease: EASE }}
          className="text-xl text-[var(--color-foreground)]/80 font-[family-name:var(--font-body)] md:text-2xl">
          You kept your country afloat.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="text-xl text-[var(--color-foreground)]/80 font-[family-name:var(--font-body)] md:text-2xl">
          But every intervention came with a side effect you didn&apos;t order.
        </motion.p>
        <ScrollNudge targetId="resilience-group-b" />
      </div>

      <div id="resilience-group-b" className="flex min-h-screen w-full max-w-xl snap-start flex-col items-center justify-center gap-6 px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.7, ease: EASE }}
          className="text-xl text-[var(--color-foreground)]/80 font-[family-name:var(--font-body)] md:text-2xl">
          So why not just get out of the way next time? Let prices alone ration food during the next crisis.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
          className="text-xl text-[var(--color-foreground)]/80 font-[family-name:var(--font-body)] md:text-2xl">
          Tempting. But you can&apos;t price your way into more wheat overnight. Past a point, an unmanaged market rations by who can pay, not who&apos;s hungriest.
        </motion.p>
        <ScrollNudge targetId="resilience-group-c" />
      </div>

      <div id="resilience-group-c" className="flex min-h-screen w-full max-w-xl snap-start flex-col items-center justify-center gap-4 px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.7, ease: EASE }}
          className="text-xl text-[var(--color-foreground)]/80 font-[family-name:var(--font-body)] md:text-2xl">
          And the worse the shock (a nuclear winter, a supervolcano eruption, a stray asteroid, choose your apocalypse), the less that market ever corrects itself in time. You&apos;d still have to step in.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEWPORT} transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center gap-1.5 font-[family-name:var(--font-serif-accent)] text-xs italic text-[var(--color-accent)]/60">
          <span>↖</span>
          <span>yes, these could all actually happen</span>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
          className="text-2xl text-[var(--color-danger)] font-[family-name:var(--font-body)] md:text-3xl">
          Turns out it was the sequencing that sank you, not the intervention itself. You were never wrong to act. You just hadn&apos;t worked out how yet.
        </motion.p>
        <ScrollNudge targetId="resilience-group-d" />
      </div>

      <div id="resilience-group-d" className="flex min-h-screen w-full max-w-xl snap-start flex-col items-center justify-center gap-6 px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.7, ease: EASE }}
          className="text-xl text-[var(--color-foreground)]/80 font-[family-name:var(--font-body)] md:text-2xl">
          Here&apos;s the thing though: none of this has actually happened. Not yet.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
          className="text-2xl text-[var(--color-danger)] font-[family-name:var(--font-body)] md:text-3xl">
          In the real world, we might still have time. (Hopefully.) What if you did too?
        </motion.p>
        <ScrollNudge targetId="resilience-crop-loader" />
      </div>

      <div id="resilience-crop-loader" className="flex min-h-screen w-full snap-start flex-col items-center justify-center gap-8 px-6 text-center">
        <CropLoader />
      </div>

      <div id="resilience-beat-3" className="flex min-h-screen w-full snap-start flex-col items-center justify-center gap-8 px-6 pb-24 text-center">
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: EASE }}
          className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-foreground)] md:text-5xl">
          Let&apos;s try again.
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="max-w-lg font-[family-name:var(--font-body)] text-lg text-[var(--color-foreground)]/70 md:text-xl">
          This time, you have ten years to design the intervention properly.
        </motion.p>
        <ScrollNudge targetId="resilience-cards" label="Keep scrolling" />
      </div>

      <ResilienceCards />
    </section>
  );
}

const CROP_ICONS = ["🌾", "🌽", "🍚", "🌱", "🫘", "🍞", "🥔"];
const ICON_GAPS = [0, 0.32, 0.26, 0.21, 0.16, 0.12, 0.09];
const ICON_DELAYS = ICON_GAPS.reduce<number[]>((acc, gap, i) => {
  acc.push((acc[i - 1] ?? 0) + gap);
  return acc;
}, []);

function CropLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const gridControls = useAnimation();
  const zoomControls = useAnimation();

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;
    async function playSequence() {
      await gridControls.start("visible");
      if (cancelled) return;
      await new Promise((resolve) => setTimeout(resolve, 350));
      if (cancelled) return;
      await zoomControls.start({ scale: 6, opacity: 0, transition: { duration: 0.7, ease: [0.55, 0, 1, 0.45] } });
      if (cancelled) return;
      document.getElementById("resilience-beat-3")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    playSequence();
    return () => { cancelled = true; };
  }, [isInView, gridControls, zoomControls]);

  return (
    <motion.div ref={ref} animate={zoomControls} className="flex flex-col items-center gap-6">
      <motion.div initial="hidden" animate={gridControls}
        className="grid grid-cols-4 gap-3 rounded-2xl border border-[var(--color-accent)]/25 bg-[var(--color-foreground)]/[0.03] p-5">
        {CROP_ICONS.map((icon, index) => (
          <motion.span key={icon + index} custom={index}
            variants={{
              hidden: { opacity: 0, scale: 0.4 },
              visible: (i: number) => ({ opacity: 1, scale: 1, transition: { duration: 0.28, delay: ICON_DELAYS[i], ease: [0.22, 1, 0.36, 1] } }),
            }}
            className="flex h-14 w-14 items-center justify-center rounded-lg bg-[var(--color-foreground)]/[0.04] text-3xl">
            {icon}
          </motion.span>
        ))}
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={gridControls}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 1.1, duration: 0.5 } } }}
        className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]/70">
        Recalculating…
      </motion.p>
    </motion.div>
  );
}