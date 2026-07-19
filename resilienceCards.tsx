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
import { resilienceCategories, type ResilienceCategory, type ResilienceItem } from "./resilienceOptions";
import { BibliographyModal } from "./BibliographyModal";
import {
  Factory, FlaskConical, Timer, Scissors, Leaf, Fuel, Wheat, RefreshCw, Landmark, ShieldCheck,
  Waves, FileText, Anchor, Package, CloudRain, Droplets, Fish, MapPin, Users, Dna, Unlock,
  TestTube, Snowflake, Sprout, BookOpen, Radiation, Flame, Recycle, Zap, Gavel, Banknote,
  ScrollText, Lock, ShoppingCart, Pill, Thermometer, Warehouse, HandCoins, Refrigerator, Home, Sun,
  type LucideIcon,
} from "lucide-react";

const resilienceIconMap: Record<string, LucideIcon> = {
  Factory, FlaskConical, Timer, Scissors, Leaf, Fuel, Wheat, RefreshCw, Landmark, ShieldCheck,
  Waves, FileText, Anchor, Package, CloudRain, Droplets, Fish, MapPin, Users, Dna, Unlock,
  TestTube, Snowflake, Sprout, BookOpen, Radiation, Flame, Recycle, Zap, Gavel, Banknote,
  ScrollText, Lock, ShoppingCart, Pill, Thermometer, Warehouse, HandCoins, Refrigerator, Home, Sun,
};

const CARD_WIDTH = 260;
const CARD_GAP = 24;
const STEP = CARD_WIDTH + CARD_GAP;

export default function ResilienceCards() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [exploringId, setExploringId] = useState<string | null>(null);
  const [bibliographyOpen, setBibliographyOpen] = useState(false);

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
          Browse with the arrows, the keyboard, or by hovering a card. Pick one, <em className="text-[#F2EFE9]/85 not-italic italic">or more</em>, to explore in depth.
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

            <button
        type="button"
        onClick={() => setBibliographyOpen(true)}
        className="mt-10 mb-4 flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03]
                   px-6 py-3 font-[family-name:'Cabinet_Grotesk',sans-serif] text-sm font-medium
                   text-[#F2EFE9]/85 transition-colors hover:border-[#E8A33D]/50 hover:bg-[#E8A33D]/10
                   hover:text-[#E8A33D] focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-[#E8A33D]/60"
      >
        <BookOpen size={16} />
        View full bibliography
      </button>

      <BibliographyModal isOpen={bibliographyOpen} onClose={() => setBibliographyOpen(false)} />
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

      <motion.button
        type="button"
        onClick={onExplore}
        animate={{
          scale: [1, 1.04, 1],
          boxShadow: [
            "0 0 0px 0px #E8A33D00",
            "0 0 18px 2px #E8A33D55",
            "0 0 0px 0px #E8A33D00",
          ],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-full rounded-lg border border-[#E8A33D]/40 py-2 font-[family-name:'Cabinet_Grotesk',sans-serif]
                   text-xs font-semibold text-[#E8A33D] transition-colors hover:border-[#E8A33D] hover:bg-[#E8A33D]/10
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/60"
      >
        Explore this →
      </motion.button>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// Sub-component: scrollytelling detail — one full-height beat per sub-item
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full scroll-mt-12"
    >
      {/* Category header beat */}
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="text-5xl">{category.emoji}</span>
        <h3 className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-3xl font-bold text-[#F2EFE9] md:text-4xl">
          {category.title}
        </h3>
        <p className="max-w-lg font-[family-name:'Cabinet_Grotesk',sans-serif] text-base text-[#F2EFE9]/60 md:text-lg">
          {category.whatThisMeans}
        </p>
        <span className="mt-2 font-[family-name:'Cabinet_Grotesk',monospace] text-[11px] uppercase tracking-widest text-[#E8A33D]/70">
          Scroll to explore {category.items.length} approaches
        </span>
      </div>

      {/* One full beat per sub-item */}
      {category.items.map((item, index) => (
        <ResilienceItemBeat key={item.title} item={item} index={index} />
      ))}

      <div className="flex justify-center py-20">
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
// Sub-component: one scrolly beat — icons/title, biology intro, economics
// bullets, and a case study side box. Side box sits sticky next to the text
// on wide screens (lg:grid-cols-[1fr_280px]) and stacks below on mobile, so
// nothing feels crowded at any width.
// -----------------------------------------------------------------------------

function ResilienceItemBeat({ item, index }: { item: ResilienceItem; index: number }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-8 px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3"
      >
        <div className="flex gap-2">
          {item.icons.map((iconName) => {
            const IconComponent = resilienceIconMap[iconName];
            return IconComponent ? (
              <span
                key={iconName}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E8A33D]/30 bg-[#E8A33D]/10 text-[#E8A33D]"
              >
                <IconComponent size={18} />
              </span>
            ) : null;
          })}
        </div>
        <span className="font-[family-name:'Cabinet_Grotesk',monospace] text-xs uppercase tracking-widest text-[#F2EFE9]/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>

      <motion.h4
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-2xl font-bold text-[#F2EFE9] md:text-3xl"
      >
        {item.title}
      </motion.h4>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
        <div className="flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-base leading-relaxed text-[#F2EFE9]/85 md:text-lg"
          >
            {item.biology}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-3 flex items-center gap-2 font-[family-name:'Cabinet_Grotesk',monospace] text-[11px] uppercase tracking-widest text-[#E8A33D]/70">
              <Landmark size={13} />
              The economics
            </div>
            <ul className="flex flex-col gap-3">
              {item.economics.map((point, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 font-[family-name:'Cabinet_Grotesk',sans-serif] text-sm leading-relaxed text-[#F2EFE9]/70"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8A33D]/60" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-fit rounded-xl border border-white/15 bg-[#1C2226] p-4 lg:sticky lg:top-24"
        >
          <div className="mb-2 flex items-center gap-1.5 font-[family-name:'Cabinet_Grotesk',monospace] text-[11px] uppercase tracking-wide text-[#E8A33D]/80">
            <span>{item.caseStudy.flag}</span>
            <span>
              {item.caseStudy.country}, {item.caseStudy.year}
            </span>
          </div>
          <p className="font-[family-name:'Cabinet_Grotesk',sans-serif] text-[13px] leading-snug text-white/85">
            {item.caseStudy.text}
          </p>
          {item.caseStudy.source && (
            <p className="mt-3 border-t border-white/10 pt-2 font-[family-name:'Cabinet_Grotesk',sans-serif] text-[11px] leading-snug text-white/40">
              {item.caseStudy.source}
            </p>
          )}
        </motion.aside>
      </div>
    </div>
  );
}