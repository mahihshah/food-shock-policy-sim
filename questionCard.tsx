"use client";

// components/QuestionCard.tsx
//
// Displays a single scenario: title, description, supporting info, and its
// choices (or its outcome, if it's an ending). Fully driven by props — this
// component never imports scenarios.ts directly, so it works for any
// scenario without modification.
//
// FONT SETUP (assumption — adjust to match your project):
// This file assumes three font families are available as CSS font-family
// names: "Fraunces" (display/serif), "Inter" (body/sans), and
// "IBM Plex Mono" (utility/mono). Easiest way with Next.js is next/font:
//
//   import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
//   const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });
//   const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
//   const plexMono = IBM_Plex_Mono({ weight: ["500"], subsets: ["latin"], variable: "--font-mono" });
//
// ...then apply the variables' classNames to your root layout <body>, and
// this component's font-[family-name:...] arbitrary Tailwind values will
// pick them up. If you haven't set this up yet, the component still works —
// it'll just fall back to system fonts.

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Choice, Scenario } from "./scenarios";
// If you have a "@/*" path alias set up in tsconfig.json, you can use
// `import type { Choice, Scenario } from "@/data/scenarios";` instead.

export interface QuestionCardProps {
  /** The scenario to render */
  scenario: Scenario;
  /**
   * Called with the id of the next scenario once the player commits to a
   * choice (via click, or number key + Enter).
   */
  onSelectChoice: (nextId: string) => void;
  /** Optional label shown in the eyebrow area alongside the case number, e.g. "Decision 3" */
  stepLabel?: string;
  /** Optional callback for a "play again" action on ending scenarios */
  onRestart?: () => void;
}

export default function QuestionCard({
  scenario,
  onSelectChoice,
  stepLabel,
  onRestart,
}: QuestionCardProps) {
  // Which choice (0 or 1) is currently highlighted via keyboard selection,
  // awaiting Enter to confirm. Resets whenever the scenario changes.
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(
      `[QuestionCard] Rendering scenario "${scenario.id}" — "${scenario.title}"` +
        (scenario.isEnding ? " (ENDING)" : "")
    );
    setSelectedIndex(null);
    // Move focus to the card on scenario change so keyboard controls work
    // immediately without the player needing to click first.
    cardRef.current?.focus();
  }, [scenario]);

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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (scenario.isEnding) return;

      // Number keys 1 / 2 highlight a choice (does not commit yet)
      if (e.key === "1" || e.key === "2") {
        const index = Number(e.key) - 1;
        if (scenario.choices[index]) {
          console.log(`[QuestionCard] Key "${e.key}" pressed → highlighting choice ${index + 1}`);
          setSelectedIndex(index);
        }
        return;
      }

      // Enter confirms whichever choice is currently highlighted
      if (e.key === "Enter") {
        if (selectedIndex !== null) {
          console.log(`[QuestionCard] Enter pressed → confirming choice ${selectedIndex + 1}`);
          commitChoice(selectedIndex);
        } else {
          console.log("[QuestionCard] Enter pressed, but no choice is highlighted yet — ignoring");
        }
      }
    },
    [scenario, selectedIndex, commitChoice]
  );

  const handleClick = (index: number) => {
    console.log(`[QuestionCard] Choice ${index + 1} clicked directly`);
    setSelectedIndex(index);
    commitChoice(index);
  };

  const handleRestart = () => {
    console.log("[QuestionCard] Restart requested from ending scenario");
    onRestart?.();
  };
 if (scenario.isLanding) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          ref={cardRef}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log("[QuestionCard] Enter pressed on landing scenario → confirming");
              commitChoice(0);
            }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-h-screen w-full flex-col items-center justify-center
                     bg-[#14181B] px-6 py-16 text-center outline-none"
        >
          <p className="max-w-2xl whitespace-pre-line font-[family-name:'Cabinet_Grotesk',sans-serif]
                        text-2xl leading-relaxed text-[#F2EFE9] md:text-4xl">
            {scenario.description}
          </p>

          <motion.button
            type="button"
            onClick={() => commitChoice(0)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-12 rounded-full border border-[#E8A33D]/60 bg-[#E8A33D]/10
                       px-10 py-4 font-[family-name:'Cabinet_Grotesk',sans-serif] text-base text-[#F2EFE9]
                       transition-colors hover:bg-[#E8A33D]/20
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/60
                       md:text-lg"
          >
            {scenario.choices[0].text}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
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
        {/* Eyebrow: case-file stamp */}
        <div className="mb-6 flex items-center justify-between">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide
                        font-[family-name:'Cabinet_Grotesk',monospace]"
            style={{
              borderColor: scenario.isEnding ? "#C1502E66" : "#E8A33D66",
              color: scenario.isEnding ? "#E8896F" : "#E8A33D",
            }}
          >
            {scenario.isEnding ? "OUTCOME" : "CASE"} {scenario.id}
          </span>
          {stepLabel && !scenario.isEnding && (
            <span className="font-[family-name:'Cabinet_Grotesk',monospace] text-xs text-white/40">
              {stepLabel}
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          className="mb-4 font-[family-name:'Cabinet_Grotesk',sans-serif] text-3xl leading-tight text-[#F2EFE9] md:text-4xl"
        >
          {scenario.title}
        </h1>

        {/* Description */}
        <p className="mb-6 font-[family-name:'Cabinet_Grotesk',sans-serif] text-base leading-relaxed text-[#F2EFE9]/80 md:text-lg">
          {scenario.description}
        </p>

        {/* Supporting info, if present */}
        {scenario.supportingInfo && (
          <div className="mb-8 rounded-lg border border-white/10 bg-white/[0.03] p-4 font-[family-name:'Cabinet_Grotesk',sans-serif] text-sm leading-relaxed text-[#F2EFE9]/60">
            {scenario.supportingInfo}
          </div>
        )}

        {/* Ending state: show outcome, optional restart */}
        {scenario.isEnding ? (
          <div className="mt-8">
            <p className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-xl text-[#E8896F] md:text-2xl">
              {scenario.outcome}
            </p>
            {onRestart && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRestart}
                className="mt-8 rounded-xl border border-white/15 px-6 py-3 font-[family-name:'Cabinet_Grotesk',sans-serif]
                           text-sm text-[#F2EFE9]/80 transition-colors hover:border-[#E8A33D]/50 hover:text-[#F2EFE9]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/60"
              >
                Start over
              </motion.button>
            )}
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-3">
            {scenario.choices.map((choice, index) => (
              <ChoiceButton
                key={choice.nextId + index}
                choice={choice}
                index={index}
                isSelected={selectedIndex === index}
                onClick={() => handleClick(index)}
              />
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
  );
}

// -----------------------------------------------------------------------------
// Sub-component: a single choice button
// -----------------------------------------------------------------------------

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
      onFocus={() => console.log(`[QuestionCard] Choice ${index + 1} focused: "${choice.text}"`)}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      aria-pressed={isSelected}
      className={`group flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-colors
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
      <span className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-base text-[#F2EFE9]/90 md:text-lg">
        {choice.text}
      </span>
    </motion.button>
  );
}