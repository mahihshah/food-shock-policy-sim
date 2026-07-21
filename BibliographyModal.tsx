"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { bibliography } from "./bibliography";
import { linkifyEntry } from "./lib/linkify";

export interface BibliographyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BibliographyModal({ isOpen, onClose }: BibliographyModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          onClick={onClose} role="dialog" aria-modal="true" aria-label="Bibliography"
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-12 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-2xl shadow-black/50 md:p-10">
            <button type="button" onClick={onClose} aria-label="Close bibliography"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)]
                         text-[var(--color-foreground)]/60 transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <h3 className="mb-1 pr-10 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-foreground)]">
              Bibliography
            </h3>
            <p className="mb-6 font-[family-name:var(--font-body)] text-sm text-[var(--color-foreground)]/50">
              Every source referenced across the policy simulation and resilience options.
            </p>

            <ol className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto pr-2 font-[family-name:var(--font-serif-accent)] text-[15px] italic leading-relaxed text-[var(--color-foreground)]/70">
              {bibliography.map((entry, index) => (
                <li key={index} className="border-b border-[var(--color-border)] pb-4 last:border-none">
                  {linkifyEntry(entry, index)}
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}