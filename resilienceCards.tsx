"use client";

// components/resilienceCards.tsx
//
// The "resilience options" panel shown after the crop-loader beat. Two
// states live in this one component, controlled by `exploringId`:
//
//   1. CAROUSEL (exploringId === null): 7 cards, one per resilienceCategory,
//      laid out horizontally. The focused card sits centered and scaled up;
//      the rest sit smaller/dimmed on either side. Navigate via the arrow
//      buttons, ArrowLeft/ArrowRight on the keyboard, or by hovering a
//      side card (which focuses it).
//
//   2. DETAIL (exploringId === category.id): the focused card's 4 items,
//      revealed one at a time down a zigzag "chain" as they scroll into
//      view. Each item shows the plain-language explanation by default;
//      the technical version sits behind an (i) tooltip. A "Back to all
//      options" button clears exploringId and scrolls back to the carousel.
//
// Both states live in the same component (rather than two components) so
// switching between them doesn't need to pass state up through a parent.

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { resilienceCategories, type ResilienceCategory } from "./resilienceOptions";

const CARD_WIDTH = 260;
const CARD_GAP = 24;
const STEP = CARD_WIDTH + CARD_GAP;

export default function ResilienceCards() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [exploringId, setExploringId] = useState<string | null>(null);

  const trackContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const measure = () => setContainerWidth(trackContainerRef.current?.offsetWidth ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const goTo = useCallback((index: number) => {
    const clamped = (index + resilienceCategories.length) % resilienceCategories.length;
    setFocusedIndex(clamped);
  }, []);

  // Keyboard navigation — only active while browsing the carousel, so it
  // doesn't fight with any keyboard handling in the detail view or the
  // main game above.
  useEffect(() => {
    if (exploringId !== null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        console.log("[ResilienceCards] ArrowRight → next card");
        goTo(focusedIndex + 1);
      } else if (e.key === "ArrowLeft") {
        console.log("[ResilienceCards] ArrowLeft → previous card");
        goTo(focusedIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [exploringId, focusedIndex, goTo]);

  const handleExplore = (category: ResilienceCategory) => {
    console.log(`[ResilienceCards] Exploring category "${category.id}"`);
    setExploringId(category.id);
    // Wait a tick for the detail view to mount before scrolling to it.
    requestAnimationFrame(() => {
      document.getElementById("resilience-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleBackToCards = () => {
    console.log("[ResilienceCards] Returning to carousel");
    setExploringId(null);
    requestAnimationFrame(() => {
      document.getElementById("resilience-cards")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const exploringCategory = resilienceCategories.find((c) => c.id === exploringId) ?? null;
  const offsetX = containerWidth / 2 - CARD_WIDTH / 2 - focusedIndex * STEP;

  return (
    <section
      id="resilience-cards"
      className="flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-[#14181B] px-6 py-24"
    >
      <div className="max-w-xl text-center">
        <h2 className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-2xl font-bold text-[#F2EFE9] md:text-3xl">
          Seven ways to build resilience before the next shock
        </h2>
        <p className="mt-3 font-[family-name:'Cabinet_Grotesk',sans-serif] text-sm text-[#F2EFE9]/60 md:text-base">
          Browse with the arrows, the keyboard, or by hovering a card. Pick one to explore it in depth.
        </p>
      </div>

      {/* Carousel */}
      <div ref={trackContainerRef} className="relative w-full max-w-4xl overflow-hidden py-6">
        <motion.div
          className="flex"
          style={{ gap: CARD_GAP }}
          animate={{ x: offsetX }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        >
          {resilienceCategories.map((category, index) => (
            <ResilienceCard
              key={category.id}
              category={category}
              isFocused={index === focusedIndex}
              onHoverFocus={() => goTo(index)}
              onExplore={() => handleExplore(category)}
            />
          ))}
        </motion.div>

        {/* Arrow controls */}
        <button
          type="button"
          onClick={() => goTo(focusedIndex - 1)}
          aria-label="Previous option"
          className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center
                     rounded-full border border-white/15 bg-[#14181B]/80 text-[#F2EFE9]/70 backdrop-blur
                     transition-colors hover:border-[#E8A33D]/50 hover:text-[#E8A33D]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/60"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => goTo(focusedIndex + 1)}
          aria-label="Next option"
          className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center
                     rounded-full border border-white/15 bg-[#14181B]/80 text-[#F2EFE9]/70 backdrop-blur
                     transition-colors hover:border-[#E8A33D]/50 hover:text-[#E8A33D]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/60"
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2">
        {resilienceCategories.map((category, index) => (
          <button
            key={category.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Jump to ${category.title}`}
            className={`h-1.5 rounded-full transition-all ${
              index === focusedIndex ? "w-6 bg-[#E8A33D]" : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Detail view */}
      <AnimatePresence mode="wait">
        {exploringCategory && (
          <ResilienceDetail
            key={exploringCategory.id}
            category={exploringCategory}
            onBack={handleBackToCards}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Sub-component: a single carousel card
// -----------------------------------------------------------------------------

function ResilienceCard({
  category,
  isFocused,
  onHoverFocus,
  onExplore,
}: {
  category: ResilienceCategory;
  isFocused: boolean;
  onHoverFocus: () => void;
  onExplore: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      onMouseEnter={onHoverFocus}
      animate={{
        scale: isFocused ? 1 : 0.85,
        opacity: isFocused ? 1 : 0.4,
        filter: isFocused ? "blur(0px)" : "blur(1px)",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: CARD_WIDTH }}
      className={`shrink-0 rounded-2xl border p-4 ${
        isFocused
          ? "z-10 border-[#E8A33D]/60 bg-[#1C2226] shadow-[0_0_40px_-10px_#E8A33D55]"
          : "border-white/10 bg-[#1C2226]/60"
      }`}
    >
      <div className="mb-3 flex h-32 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#E8A33D]/20 to-[#1C2226]">
        {!imgFailed ? (
          <img
            src={`/resilience/${category.image}`}
            alt={category.title}
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-5xl">{category.emoji}</span>
        )}
      </div>

      <div className="mb-1 text-2xl">{category.emoji}</div>
      <h3 className="mb-1.5 font-[family-name:'Cabinet_Grotesk',sans-serif] text-base font-bold leading-snug text-[#F2EFE9]">
        {category.title}
      </h3>
      <p className="mb-4 font-[family-name:'Cabinet_Grotesk',sans-serif] text-xs leading-relaxed text-[#F2EFE9]/60">
        {category.whatThisMeans}
      </p>

      <button
        type="button"
        onClick={onExplore}
        className="w-full rounded-lg border border-[#E8A33D]/40 py-2 font-[family-name:'Cabinet_Grotesk',sans-serif]
                   text-xs font-semibold text-[#E8A33D] transition-colors hover:border-[#E8A33D] hover:bg-[#E8A33D]/10
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/60"
      >
        Explore this →
      </button>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// Sub-component: the expanded detail chain for one category
// -----------------------------------------------------------------------------

function ResilienceDetail({
  category,
  onBack,
}: {
  category: ResilienceCategory;
  onBack: () => void;
}) {
  return (
    <motion.div
      id="resilience-detail"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 w-full max-w-2xl scroll-mt-12"
    >
      <div className="mb-8 text-center">
        <span className="text-4xl">{category.emoji}</span>
        <h3 className="mt-2 font-[family-name:'Cabinet_Grotesk',sans-serif] text-2xl font-bold text-[#F2EFE9] md:text-3xl">
          {category.title}
        </h3>
        <p className="mx-auto mt-2 max-w-md font-[family-name:'Cabinet_Grotesk',sans-serif] text-sm text-[#F2EFE9]/60">
          {category.whatThisMeans}
        </p>
      </div>

      {/* Zigzag chain — connecting line down the center, items alternating
          left/right on md+ screens, stacked in order on mobile. Each item
          fades/slides in as it scrolls into view. */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#E8A33D]/40 via-[#E8A33D]/20 to-transparent md:block" />
        <div className="flex flex-col gap-8">
          {category.items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex md:w-1/2 ${
                index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8 md:text-right"
              }`}
            >
              <div
                className={`w-full rounded-xl border border-white/10 bg-[#1C2226] p-4 ${
                  index % 2 === 0 ? "" : "md:items-end"
                }`}
              >
                <div
                  className={`mb-1.5 flex items-center gap-1.5 ${
                    index % 2 === 0 ? "" : "md:flex-row-reverse"
                  }`}
                >
                  <h4 className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-sm font-bold text-[#F2EFE9]">
                    {item.title}
                  </h4>
                  <InfoTooltip text={item.technical} />
                </div>
                <p className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-xs leading-relaxed text-[#F2EFE9]/70">
                  {item.simple}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-white/15 px-6 py-3 font-[family-name:'Cabinet_Grotesk',sans-serif]
                     text-sm text-[#F2EFE9]/80 transition-colors hover:border-[#E8A33D]/50 hover:text-[#F2EFE9]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/60"
        >
          ← Back to all options
        </button>
      </div>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// Sub-component: (i) tooltip showing the technical explanation
// -----------------------------------------------------------------------------

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="group/tooltip relative inline-flex items-center">
      <button
        type="button"
        aria-label="More technical explanation"
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#E8A33D]/50
                   text-[9px] text-[#E8A33D]/70 transition-colors hover:border-[#E8A33D] hover:text-[#E8A33D]
                   focus-visible:border-[#E8A33D] focus-visible:text-[#E8A33D]"
      >
        i
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-lg
                   border border-white/20 bg-[#14181B] p-2.5 text-left text-[11px] leading-snug text-white/80
                   opacity-0 shadow-xl transition-opacity duration-150
                   group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}