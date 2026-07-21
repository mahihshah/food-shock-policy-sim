"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { resilienceCategories, type ResilienceCategory, type ResilienceItem } from "./resilienceOptions";
import { BibliographyModal } from "./BibliographyModal";
import { SourceTag } from "./SourceTag";
import { renderHighlighted } from "./lib/highlights";
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

  useEffect(() => {
    if (exploringId !== null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(focusedIndex + 1);
      else if (e.key === "ArrowLeft") goTo(focusedIndex - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [exploringId, focusedIndex, goTo]);

  const handleExplore = (category: ResilienceCategory) => {
    setExploringId(category.id);
    requestAnimationFrame(() => {
      document.getElementById("resilience-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleBackToCards = () => {
    setExploringId(null);
    requestAnimationFrame(() => {
      document.getElementById("resilience-cards")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const exploringCategory = resilienceCategories.find((c) => c.id === exploringId) ?? null;
  const offsetX = containerWidth / 2 - CARD_WIDTH / 2 - focusedIndex * STEP;

  return (
    <section id="resilience-cards" className="flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-[var(--color-background)] px-6 py-24">
      <div className="max-w-xl text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-foreground)] md:text-3xl">
          Seven ways to build resilience before the next shock
        </h2>
        <p className="mt-3 font-[family-name:var(--font-body)] text-sm text-[var(--color-foreground)]/60 md:text-base">
          Browse with the arrows, the keyboard, or by hovering a card. Pick one, <em className="italic text-[var(--color-foreground)]/85">or more</em>, to explore in depth.
        </p>
      </div>

      <div ref={trackContainerRef} className="relative w-full max-w-4xl overflow-hidden py-6">
        <motion.div className="flex" style={{ gap: CARD_GAP }} animate={{ x: offsetX }} transition={{ type: "spring", stiffness: 220, damping: 28 }}>
          {resilienceCategories.map((category, index) => (
            <ResilienceCard key={category.id} category={category} isFocused={index === focusedIndex} onHoverFocus={() => goTo(index)} onExplore={() => handleExplore(category)} />
          ))}
        </motion.div>

        <button type="button" onClick={() => goTo(focusedIndex - 1)} aria-label="Previous option"
          className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center
                     rounded-full border border-[var(--color-border)] bg-[var(--color-background)]/80 text-[var(--color-foreground)]/70 backdrop-blur
                     transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60">
          ←
        </button>
        <button type="button" onClick={() => goTo(focusedIndex + 1)} aria-label="Next option"
          className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center
                     rounded-full border border-[var(--color-border)] bg-[var(--color-background)]/80 text-[var(--color-foreground)]/70 backdrop-blur
                     transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60">
          →
        </button>
      </div>

      <div className="flex gap-2">
        {resilienceCategories.map((category, index) => (
          <button key={category.id} type="button" onClick={() => goTo(index)} aria-label={`Jump to ${category.title}`}
            className={`h-1.5 rounded-full transition-all ${index === focusedIndex ? "w-6 bg-[var(--color-accent)]" : "w-1.5 bg-[var(--color-foreground)]/20 hover:bg-[var(--color-foreground)]/40"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {exploringCategory && <ResilienceDetail key={exploringCategory.id} category={exploringCategory} onBack={handleBackToCards} />}
      </AnimatePresence>

      <button type="button" onClick={() => setBibliographyOpen(true)}
        className="mt-10 mb-2 flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-foreground)]/[0.03]
                   px-6 py-3 font-[family-name:var(--font-body)] text-sm font-medium
                   text-[var(--color-foreground)]/85 transition-colors hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/10
                   hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-[var(--color-accent)]/60">
        <BookOpen size={16} />
        View full bibliography
      </button>

      <p className="mt-2 max-w-md text-center font-[family-name:var(--font-serif-accent)] text-[15px] italic text-[var(--color-foreground)]/40">
        This interactive was developed as part of the{" "}
        <a href="https://pages.mru.org/high-school-fellowship/" target="_blank" rel="noopener noreferrer"
          className="underline decoration-[var(--color-accent)]/50 underline-offset-2 hover:text-[var(--color-accent)]/70">
          MRU High School Fellowship
        </a>
        . Many thanks to all those who gave feedback on earlier versions of this.
      </p>

      <BibliographyModal isOpen={bibliographyOpen} onClose={() => setBibliographyOpen(false)} />
    </section>
  );
}

function ResilienceCard({ category, isFocused, onHoverFocus, onExplore }: {
  category: ResilienceCategory; isFocused: boolean; onHoverFocus: () => void; onExplore: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      onMouseEnter={onHoverFocus}
      animate={{ scale: isFocused ? 1 : 0.85, opacity: isFocused ? 1 : 0.4, filter: isFocused ? "blur(0px)" : "blur(1px)" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: CARD_WIDTH }}
      className={`shrink-0 rounded-2xl border p-4 ${isFocused ? "z-10 border-[var(--color-accent)]/60 bg-[var(--color-surface)] shadow-[0_0_40px_-10px_var(--color-accent)]" : "border-[var(--color-border)] bg-[var(--color-surface)]/60"}`}
    >
      <div className="mb-3 flex h-32 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-surface)]">
        {!imgFailed ? (
          <img src={`/resilience/${category.image}`} alt={category.title} onError={() => setImgFailed(true)} className="h-full w-full object-cover" />
        ) : (
          <span className="text-5xl">{category.emoji}</span>
        )}
      </div>

      <div className="mb-1 text-2xl">{category.emoji}</div>
      <h3 className="mb-1.5 font-[family-name:var(--font-display)] text-base font-bold leading-snug text-[var(--color-foreground)]">
        {category.title}
      </h3>
      <p className="mb-4 font-[family-name:var(--font-body)] text-xs leading-relaxed text-[var(--color-foreground)]/60">
        {category.whatThisMeans}
      </p>

      <motion.button type="button" onClick={onExplore}
        animate={{ scale: [1, 1.04, 1], boxShadow: ["0 0 0px 0px transparent", "0 0 18px 2px var(--color-accent)", "0 0 0px 0px transparent"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        className="w-full rounded-lg border border-[var(--color-accent)]/40 py-2 font-[family-name:var(--font-body)]
                   text-xs font-semibold text-[var(--color-accent)] transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60">
        Explore this →
      </motion.button>
    </motion.div>
  );
}

function ResilienceDetail({ category, onBack }: { category: ResilienceCategory; onBack: () => void }) {
  return (
    <motion.div id="resilience-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="w-full scroll-mt-12">
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="text-5xl">{category.emoji}</span>
        <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-foreground)] md:text-4xl">
          {category.title}
        </h3>
        <p className="max-w-lg font-[family-name:var(--font-body)] text-base text-[var(--color-foreground)]/60 md:text-lg">
          {category.whatThisMeans}
        </p>
        <span className="mt-2 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-widest text-[var(--color-accent)]/70">
          Scroll to explore {category.items.length} approaches
        </span>
      </div>

      {category.items.map((item, index) => <ResilienceItemBeat key={item.title} item={item} index={index} />)}

      <div className="flex justify-center py-20">
        <button type="button" onClick={onBack}
          className="rounded-xl border border-[var(--color-border)] px-6 py-3 font-[family-name:var(--font-body)]
                     text-sm text-[var(--color-foreground)]/80 transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-foreground)]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60">
          ← Back to all options
        </button>
      </div>
    </motion.div>
  );
}

function ResilienceItemBeat({ item, index }: { item: ResilienceItem; index: number }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-8 px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="flex items-center gap-3">
        <div className="flex gap-2">
          {item.icons.map((iconName) => {
            const IconComponent = resilienceIconMap[iconName];
            return IconComponent ? (
              <span key={iconName} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <IconComponent size={18} />
              </span>
            ) : null;
          })}
        </div>
        <span className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-widest text-[var(--color-foreground)]/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>

      <motion.h4 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-foreground)] md:text-3xl">
        {item.title}
      </motion.h4>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
        <div className="flex flex-col gap-6">
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-body)] text-base leading-relaxed text-[var(--color-foreground)]/85 md:text-lg">
            {renderHighlighted(item.biology)}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-foreground)]/[0.03] p-5">
            <div className="mb-3 flex items-center gap-2 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-widest text-[var(--color-accent)]/70">
              <Landmark size={13} />
              The economics
            </div>
            <ul className="flex flex-col gap-3">
              {item.economics.map((point, i) => (
                <li key={i} className="flex gap-2.5 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--color-foreground)]/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]/60" />
                  <span>{renderHighlighted(point)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.aside initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-fit rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 lg:sticky lg:top-24">
          <div className="mb-2 flex items-center gap-1.5 font-[family-name:var(--font-serif-accent)] text-[13px] italic uppercase tracking-wide text-[var(--color-accent)]/80">
            <span>{item.caseStudy.flag}</span>
            <span>{item.caseStudy.country}, {item.caseStudy.year}</span>
          </div>
          <p className="font-[family-name:var(--font-serif-accent)] text-[15px] italic leading-snug text-[var(--color-foreground)]/90">
            {renderHighlighted(item.caseStudy.text)}
          </p>
          <SourceTag source={item.caseStudy.source} />
        </motion.aside>
      </div>
    </div>
  );
}