"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { Choice, Scenario } from "./scenarios";
import { caseStudies, type CaseStudy } from "./caseStudies";
import ResilienceSegue from "./resilienceSegue";
import { econConceptsById } from "./econConcepts";
import { SourceTag } from "./SourceTag";
import { renderHighlighted } from "./lib/highlights";
import { CropEmojiRow } from "./CropEmojiRow";

export interface QuestionCardProps {
  scenario: Scenario;
  onSelectChoice: (nextId: string) => void;
  stepLabel?: string;
  onRestart?: () => void;
  pathSummary?: string;
  retryInfo?: { originalTitle: string; alternateTitle: string; onRetry: () => void };
  showKeepScrolling?: boolean;
}

export default function QuestionCard({
  scenario, onSelectChoice, stepLabel, onRestart, pathSummary, retryInfo, showKeepScrolling,
}: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showEcon, setShowEcon] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const econConcepts = econConceptsById[scenario.id] ?? [];

  const commitChoice = useCallback((index: number) => {
    const choice = scenario.choices[index];
    if (!choice) return;
    onSelectChoice(choice.nextId);
  }, [scenario, onSelectChoice]);

  useEffect(() => {
    setSelectedIndex(null);
    setShowEcon(false);
    cardRef.current?.focus();
  }, [scenario]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (scenario.isEnding) return;
    if (e.key === "1" || e.key === "2") {
      const index = Number(e.key) - 1;
      if (scenario.choices[index]) setSelectedIndex(index);
      return;
    }
    if (e.key === "Enter" && selectedIndex !== null) commitChoice(selectedIndex);
  }, [scenario, selectedIndex, commitChoice]);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    commitChoice(index);
  };

  const handleRestart = () => onRestart?.();

  if (scenario.isLanding) {
    const [headline, ...bodyParagraphs] = scenario.description.split("\n\n");

    const containerVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.9, delayChildren: 0.3 } } };
    const lineVariants: Variants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } } };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id} ref={cardRef} tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") commitChoice(0); }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[var(--color-background)] px-6 text-center outline-none"
        >
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex max-w-3xl flex-col items-center gap-5">
            {scenario.isStart && <CropEmojiRow />}
            <motion.h1 variants={lineVariants} className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.05] tracking-tight text-[var(--color-foreground)] sm:text-5xl md:text-6xl">
              {headline}
            </motion.h1>

            {bodyParagraphs.map((paragraph, pIndex) =>
              paragraph.split("\n").map((line, lIndex) => (
                <motion.p key={`${pIndex}-${lIndex}`} variants={lineVariants}
                  className="font-[family-name:var(--font-body)] text-base leading-relaxed text-[var(--color-foreground)]/80 md:text-xl">
                  {line}
                </motion.p>
              ))
            )}

            <motion.div variants={lineVariants} className="mt-4">
              <motion.button type="button" onClick={() => commitChoice(0)}
                animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1, backgroundColor: "color-mix(in srgb, var(--color-accent) 35%, transparent)" }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-accent)]/10
                           px-10 py-4 font-[family-name:var(--font-body)] text-base font-bold text-[var(--color-foreground)]
                           shadow-[0_0_30px_-5px_var(--color-accent)] transition-colors
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60 md:text-lg">
                {scenario.choices[0].text}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id} ref={cardRef} tabIndex={0} onKeyDown={handleKeyDown}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-2xl outline-none"
          style={{ perspective: 1800 }}
        >
          <motion.div
            animate={{ rotateY: showEcon ? 180 : 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full"
          >
            {/* FRONT — the scenario itself */}
            <div
              style={{ backfaceVisibility: "hidden" }}
              className="w-full rounded-2xl border border-[var(--color-accent-3)]/25 border-t-2 border-t-[var(--color-accent)]
                         bg-[var(--color-surface)] p-8 shadow-2xl shadow-black/40 focus-visible:ring-2
                         focus-visible:ring-[var(--color-accent)]/60 md:p-12"
            >
              {stepLabel && !scenario.isEnding && (
                <div className="mb-6 flex items-center justify-end">
                  <span className="font-[family-name:var(--font-body)] text-xs text-[var(--color-foreground)]/40">
                    {stepLabel}
                  </span>
                </div>
              )}

              <h1 className="mb-4 font-[family-name:var(--font-display)] text-3xl leading-tight text-[var(--color-foreground)] md:text-4xl">
                {scenario.title}
              </h1>

              <p className="mb-6 font-[family-name:var(--font-body)] text-base leading-relaxed text-[var(--color-foreground)]/80 md:text-lg">
                {renderHighlighted(scenario.description)}
              </p>

              {scenario.supportingInfo && (
                <div className="mb-8 rounded-lg border-2 border-[var(--color-accent-3)]/60 bg-[var(--color-foreground)]/[0.03] p-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--color-foreground)]/60">
                  {renderHighlighted(scenario.supportingInfo)}
                </div>
              )}

              {scenario.isEnding ? (
                <div className="mt-8">
                  {pathSummary && (
                    <p className="mb-4 inline-block rounded-lg border-2 border-[var(--color-accent-4)] px-3 py-2 font-[family-name:var(--font-serif-accent)] text-[13px] italic text-[var(--color-foreground)]/50">
                      Your path: {pathSummary}
                    </p>
                  )}
                  <p
                    className="font-[family-name:var(--font-display)] text-xl md:text-2xl"
                    style={{ color: "#ff3b2f", fontWeight: 800 }}
                  >
                    {renderHighlighted(scenario.outcome ?? "")}
                  </p>
                  {retryInfo ? (
                    <motion.button type="button" onClick={retryInfo.onRetry}
                      whileHover={{ scale: 1.02, backgroundColor: "color-mix(in srgb, var(--color-accent) 30%, transparent)" }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                      className="mx-auto mt-6 block rounded-xl border-2 border-[var(--color-accent)] bg-[var(--color-accent)]/10 px-6 py-3
                                 font-[family-name:var(--font-body)] text-sm font-semibold text-[var(--color-foreground)]
                                 transition-colors focus-visible:outline-none
                                 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60">
                      Retry with <strong>{retryInfo.alternateTitle}</strong> instead of <strong>{retryInfo.originalTitle}</strong>
                    </motion.button>
                  ) : (
                    showKeepScrolling && (
                      <motion.button type="button"
                        onClick={() => document.getElementById("resilience-segue")?.scrollIntoView({ behavior: "smooth" })}
                        initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{ opacity: { delay: 0.6, duration: 0.6 }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
                        className="mx-auto mt-10 flex flex-col items-center gap-2 text-[var(--color-accent)]/70 transition-colors hover:text-[var(--color-accent)]
                                   focus-visible:outline-none"
                        aria-label="Continue to the resilience debrief">
                        <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-widest">
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
                      <ChoiceButton choice={choice} index={index} isSelected={selectedIndex === index} onClick={() => handleClick(index)} />
                      <CaseStudyPanel caseStudy={caseStudies[choice.nextId]} side={index === 0 ? "left" : "right"} />
                    </div>
                  ))}
                  <AnimatePresence>
                    {selectedIndex !== null && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="mt-1 font-[family-name:var(--font-body)] text-xs text-[var(--color-foreground)]/40">
                        Press Enter to continue
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {econConcepts.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowEcon(true)}
                    className="rounded-full border border-[var(--color-accent-3)]/50 bg-[var(--color-accent-3)]/10 px-5 py-2
                               font-[family-name:var(--font-body)] text-xs font-semibold text-[var(--color-accent-3)]
                               transition-colors hover:border-[var(--color-accent-3)] hover:bg-[var(--color-accent-3)]/20
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-3)]/60"
                  >
                    How economics explains this
                  </button>
                </div>
              )}
            </div>

            {/* BACK — econ concept flashcard */}
            {econConcepts.length > 0 && (
              <div
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                className="absolute inset-0 flex flex-col justify-center gap-5 overflow-y-auto rounded-2xl
                           border border-[var(--color-accent-3)]/30 border-t-2 border-t-[var(--color-accent-3)]
                           bg-[var(--color-surface)] p-8 shadow-2xl shadow-black/40 md:p-12"
              >
                <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-widest text-[var(--color-accent-3)]/70">
                  How economics explains this
                </span>
                {econConcepts.map((concept, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="font-[family-name:var(--font-econ)] text-lg font-semibold italic leading-snug text-[var(--color-foreground)]">
                      {concept.name}
                    </span>
                    <span className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--color-foreground)]/70">
                      {renderHighlighted(concept.description)}
                    </span>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setShowEcon(false)}
                  className="mx-auto mt-2 rounded-full border border-[var(--color-accent)]/50 bg-[var(--color-accent)]/10 px-5 py-2
                             font-[family-name:var(--font-body)] text-xs font-semibold text-[var(--color-accent)]
                             transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/20
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60"
                >
                  ← Flip back to scenario
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {scenario.isEnding && showKeepScrolling && <ResilienceSegue onRestart={handleRestart} />}
    </>
  );
}

function ChoiceButton({ choice, index, isSelected, onClick }: {
  choice: Choice; index: number; isSelected: boolean; onClick: () => void;
}) {
  return (
    <motion.button type="button" onClick={onClick}
      whileHover={{ scale: 1.02, backgroundColor: "color-mix(in srgb, var(--color-accent) 14%, transparent)" }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isSelected}
      className={`group flex w-full items-start gap-4 rounded-xl border-2 px-5 py-4 text-left transition-colors
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60
                  ${isSelected
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 shadow-[0_0_24px_-6px_var(--color-accent)]"
                    : index === 0
                    ? "border-[var(--color-accent-2)]/40 bg-[var(--color-foreground)]/[0.02] hover:border-[var(--color-accent-2)]"
                    : "border-[var(--color-accent-3)]/40 bg-[var(--color-foreground)]/[0.02] hover:border-[var(--color-accent-3)]"}`}>
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-body)] text-xs font-semibold
                    ${isSelected ? "bg-[var(--color-accent)] text-[var(--color-background)]" : "bg-[var(--color-foreground)]/10 text-[var(--color-foreground)]/60 group-hover:bg-[var(--color-accent)]/20 group-hover:text-[var(--color-accent)]"}`}>
        {index + 1}
      </span>
      <span className="flex flex-col gap-1.5 pt-0.5">
        <span className="font-[family-name:var(--font-body)] text-base text-[var(--color-foreground)]/90 md:text-lg">
          {choice.text}
        </span>
        {choice.description && (
          <span className="font-[family-name:var(--font-body)] text-xs leading-relaxed text-[var(--color-foreground)]/50 md:text-[13px]">
            {renderHighlighted(choice.description)}
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
    <div className={`pointer-events-none absolute top-1/2 hidden w-56 -translate-y-1/2 lg:block ${isLeft ? "right-full mr-6" : "left-full ml-6"}`}>
      <motion.div initial={{ opacity: 0, x: isLeft ? 12 : -12 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }} className="pointer-events-auto flex items-center gap-2">
        {!isLeft && <span className="shrink-0 text-[var(--color-accent)]/50">←</span>}
        <div className="rounded-lg border border-[var(--color-accent-2)]/30 bg-[var(--color-foreground)]/[0.06] p-3">
          <span className="mb-1.5 block font-[family-name:var(--font-body)] text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--color-accent-2)]">
            This actually happened
          </span>
          <div className="mb-1 flex items-center gap-1.5 font-[family-name:var(--font-serif-accent)] text-[13px] italic uppercase tracking-wide text-[var(--color-accent)]/80">
            <span>{caseStudy.flag}</span>
            <span>{caseStudy.country}, {caseStudy.year}</span>
          </div>
          <p className="font-[family-name:var(--font-serif-accent)] text-[15px] italic leading-snug text-[var(--color-foreground)]">
            {renderHighlighted(caseStudy.text)}
          </p>
          <SourceTag source={caseStudy.source} />
        </div>
        {isLeft && <span className="shrink-0 text-[var(--color-accent)]/50">→</span>}
      </motion.div>
    </div>
  );
}