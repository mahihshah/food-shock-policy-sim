"use client";

// components/QuestionCard.tsx

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { Choice, Scenario } from "./scenarios";
import { caseStudies, type CaseStudy } from "./caseStudies";
import ResilienceSegue from "./resilienceSegue";
import { econConceptsById } from "./econConcepts";
import { EconConceptCallout } from "./EconConceptCallout";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["600", "700"],
});
export interface QuestionCardProps {
  scenario: Scenario;
  onSelectChoice: (nextId: string) => void;
  stepLabel?: string;
  onRestart?: () => void;
  /** Only passed on ending scenarios — every choice made this playthrough, joined into one trail */
  pathSummary?: string;
  /** Only passed on the FIRST ending — prompts a forced retry into the other root policy */
  retryInfo?: { originalTitle: string; alternateTitle: string; onRetry: () => void };
  /** False until a second (retried) playthrough is complete — hides "keep scrolling" and the resilience segue */
  showKeepScrolling?: boolean;
}

export default function QuestionCard({
  scenario,
  onSelectChoice,
  stepLabel,
  onRestart,
  pathSummary,
  retryInfo,
  showKeepScrolling,
}: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const commitChoice = useCallback(
    (index: number) => {
      const choice = scenario.choices[index];
      if (!choice) return;
      console.log(
        `[QuestionCard] Choice confirmed: "${choice.text}" → navigating to scenario "${choice.nextId}"`
      );
      onSelectChoice(choice.nextId);
    },
    [scenario, onSelectChoice]
  );

  useEffect(() => {
    console.log(
      `[QuestionCard] Rendering scenario "${scenario.id}" — "${scenario.title}"` +
        (scenario.isEnding ? " (ENDING)" : "")
    );
    setSelectedIndex(null);
    cardRef.current?.focus();
  }, [scenario]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (scenario.isEnding) return;
      if (e.key === "1" || e.key === "2") {
        const index = Number(e.key) - 1;
        if (scenario.choices[index]) {
          setSelectedIndex(index);
        }
        return;
      }
      if (e.key === "Enter") {
        if (selectedIndex !== null) {
          commitChoice(selectedIndex);
        }
      }
    },
    [scenario, selectedIndex, commitChoice]
  );

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    commitChoice(index);
  };

  const handleRestart = () => {
    onRestart?.();
  };

  // ---------------------------------------------------------------------
  // LANDING / ROLE SCREENS — centered, exactly one viewport, no scroll.
  // ---------------------------------------------------------------------
  if (scenario.isLanding) {
    const [headline, ...bodyParagraphs] = scenario.description.split("\n\n");

    const containerVariants: Variants = {
      hidden: {},
      visible: { transition: { staggerChildren: 0.9, delayChildren: 0.3 } },
    };

    const lineVariants: Variants = {
      hidden: { opacity: 0, y: 12 },
      visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          ref={cardRef}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitChoice(0);
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-dvh w-full flex-col items-center justify-center
                     overflow-hidden bg-[#14181B] px-6 text-center outline-none"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex max-w-3xl flex-col items-center gap-5"
          >
            <motion.h1
              variants={lineVariants}
              className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-4xl font-bold leading-[1.05]
                         tracking-tight text-[#F2EFE9] sm:text-5xl md:text-6xl"
            >
              {headline}
            </motion.h1>

            {bodyParagraphs.map((paragraph, pIndex) =>
              paragraph.split("\n").map((line, lIndex) => (
                <motion.p
                  key={`${pIndex}-${lIndex}`}
                  variants={lineVariants}
                  className="font-[family-name:'Cabinet_Grotesk',sans-serif]
                             text-base leading-relaxed text-[#F2EFE9]/80 md:text-xl"
                >
                  {line}
                </motion.p>
              ))
            )}

            <motion.div variants={lineVariants} className="mt-4">
              <motion.button
                type="button"
                onClick={() => commitChoice(0)}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border-2 border-[#E8A33D] bg-[#E8A33D]/10
                           px-10 py-4 font-[family-name:'Cabinet_Grotesk',sans-serif] text-base font-bold text-[#F2EFE9]
                           shadow-[0_0_30px_-5px_#E8A33D66] transition-colors hover:bg-[#E8A33D]/25
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/60
                           md:text-lg"
              >
                {scenario.choices[0].text}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // ---------------------------------------------------------------------
  // MAIN SIMULATOR + ENDING CARD — plain mount/unmount, not scrollytelling.
  // ---------------------------------------------------------------------
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          ref={cardRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-2xl rounded-2xl border border-white/10
                     bg-[#1C2226] p-8 shadow-2xl shadow-black/40 outline-none
                     focus-visible:ring-2 focus-visible:ring-[#E8A33D]/60 md:p-12"
        >
   <EconConceptCallout concepts={econConceptsById[scenario.id] ?? []} />
          {/* Only a "Decision X" tag now — no CASE/OUTCOME id shown to the user */}
          {stepLabel && !scenario.isEnding && (
            <div className="mb-6 flex items-center justify-end">
              <span className="font-[family-name:'Cabinet_Grotesk',monospace] text-xs text-white/40">
                {stepLabel}
              </span>
            </div>
          )}

          <h1 className="mb-4 font-[family-name:'Cabinet_Grotesk',sans-serif] text-3xl leading-tight text-[#F2EFE9] md:text-4xl">
            {scenario.title}
          </h1>

          <p className="mb-6 font-[family-name:'Cabinet_Grotesk',sans-serif] text-base leading-relaxed text-[#F2EFE9]/80 md:text-lg">
            {scenario.description}
          </p>

          {scenario.supportingInfo && (
            <div className="mb-8 rounded-lg border border-white/10 bg-white/[0.03] p-4 font-[family-name:'Cabinet_Grotesk',sans-serif] text-sm leading-relaxed text-[#F2EFE9]/60">
              {scenario.supportingInfo}
            </div>
          )}

          {scenario.isEnding ? (
            <div className="mt-8">
              {pathSummary && (
                <p className="mb-4 inline-block rounded-lg border border-white/15 px-3 py-2 font-[family-name:'Cabinet_Grotesk',sans-serif] text-xs italic text-white/50">
                  Your path: {pathSummary}
                </p>
              )}
              <p className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-xl text-[#E8896F] md:text-2xl">
                {scenario.outcome}
              </p>
              {retryInfo ? (
                <motion.button
                  type="button"
                  onClick={retryInfo.onRetry}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mx-auto mt-6 block rounded-xl border-2 border-[#E8A33D] bg-[#E8A33D]/10 px-6 py-3
                             font-[family-name:'Cabinet_Grotesk',sans-serif] text-sm font-semibold text-[#F2EFE9]
                             transition-colors hover:bg-[#E8A33D]/20 focus-visible:outline-none
                             focus-visible:ring-2 focus-visible:ring-[#E8A33D]/60"
                >
                  Retry with <strong>{retryInfo.alternateTitle}</strong> instead of{" "}
                  <strong>{retryInfo.originalTitle}</strong>
                </motion.button>
              ) : (
                showKeepScrolling && (
                  <motion.button
                    type="button"
                    onClick={() =>
                      document.getElementById("resilience-segue")?.scrollIntoView({ behavior: "smooth" })
                    }
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ opacity: { delay: 0.6, duration: 0.6 }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
                    className="mx-auto mt-10 flex flex-col items-center gap-2 text-[#E8A33D]/70 transition-colors hover:text-[#E8A33D]
                               focus-visible:outline-none"
                    aria-label="Continue to the resilience debrief"
                  >
                    <span className="font-[family-name:'Cabinet_Grotesk',monospace] text-[11px] uppercase tracking-widest">
                      Keep scrolling
                    </span>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>
                )
              )}
            </div>
          ) : (
            <div className="mt-8 flex flex-col gap-3">
              {scenario.choices.map((choice, index) => (
                <div key={choice.nextId + index} className="relative">
                  <ChoiceButton
                    choice={choice}
                    index={index}
                    isSelected={selectedIndex === index}
                    onClick={() => handleClick(index)}
                  />
                  <CaseStudyPanel
                    caseStudy={caseStudies[choice.nextId]}
                    side={index === 0 ? "left" : "right"}
                  />
                </div>
              ))}
              <AnimatePresence>
                {selectedIndex !== null && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1 font-[family-name:'Cabinet_Grotesk',monospace] text-xs text-white/40"
                  >
                    Press Enter to continue
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Only mounted once, only on the ending scenario. If your duplicate/loop
          bug persists after this file replaces yours, search your whole project
          for "<ResilienceSegue" — it must appear in exactly this one spot. */}
      {scenario.isEnding && showKeepScrolling && <ResilienceSegue onRestart={handleRestart} />}
    </>
  );
}

function ChoiceButton({
  choice,
  index,
  isSelected,
  onClick,
}: {
  choice: Choice;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      aria-pressed={isSelected}
      className={`group flex w-full items-start gap-4 rounded-xl border px-5 py-4 text-left transition-colors
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/60
                  ${
                    isSelected
                      ? "border-[#E8A33D] bg-[#E8A33D]/10"
                      : "border-white/10 bg-white/[0.02] hover:border-[#E8A33D]/40 hover:bg-white/[0.05]"
                  }`}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-[family-name:'Cabinet_Grotesk',monospace] text-xs
                    ${
                      isSelected
                        ? "bg-[#E8A33D] text-[#14181B]"
                        : "bg-white/10 text-white/60 group-hover:bg-[#E8A33D]/20 group-hover:text-[#E8A33D]"
                    }`}
      >
        {index + 1}
      </span>
      <span className="flex flex-col gap-1.5 pt-0.5">
        <span className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-base text-[#F2EFE9]/90 md:text-lg">
          {choice.text}
        </span>
        {choice.description && (
          <span className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-xs leading-relaxed text-[#F2EFE9]/50 md:text-[13px]">
            {choice.description}
          </span>
        )}
      </span>
    </motion.button>
  );
}

function CaseStudyPanel({ caseStudy, side }: { caseStudy?: CaseStudy; side: "left" | "right" }) {
  if (!caseStudy) return null;
  const isLeft = side === "left";

  return (
    <div
      className={`pointer-events-none absolute top-1/2 hidden w-56 -translate-y-1/2 lg:block
                  ${isLeft ? "right-full mr-6" : "left-full ml-6"}`}
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 12 : -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex items-center gap-2"
      >
        {!isLeft && <span className="shrink-0 text-[#E8A33D]/50">←</span>}
        <div className="rounded-lg border border-white/20 bg-white/[0.06] p-3">
          <span
            className={`${jetbrainsMono.className} mb-1.5 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#6FCF97]`}
          >
            This actually happened
          </span>
          <div className="mb-1 flex items-center gap-1.5 font-[family-name:'Cabinet_Grotesk',monospace] text-[11px] uppercase tracking-wide text-[#E8A33D]/80">
            <span>{caseStudy.flag}</span>
            <span>{caseStudy.country}, {caseStudy.year}</span>
          </div>
          <p className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-[13px] leading-snug text-white">
            {caseStudy.text}
            {caseStudy.source && (
              <sup className="group/tooltip relative ml-0.5 inline-block">
                <button
                  type="button"
                  aria-label="View source"
                  className="cursor-help align-super text-[11px] font-bold text-[#6FCF97] transition-colors hover:text-[#8FE0B3] focus-visible:text-[#8FE0B3]"
                >
                  *
                </button>
                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full right-0 z-50 mb-2 max-h-64 w-64 overflow-y-auto rounded-lg border border-white/20 bg-[#14181B] p-2.5 text-left normal-case leading-snug tracking-normal opacity-0 shadow-xl transition-opacity duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100"
                >
                  <span className="mb-1 block font-[family-name:'Cabinet_Grotesk',monospace] text-[10px] uppercase tracking-wide text-[#6FCF97]/80">
                    Source
                  </span>
                  <span className="block whitespace-pre-line text-[11px] leading-snug text-white/80">
                    {caseStudy.source}
                  </span>
                </span>
              </sup>
            )}
          </p>
        </div>
        {isLeft && <span className="shrink-0 text-[#E8A33D]/50">→</span>}
      </motion.div>
    </div>
  );
}