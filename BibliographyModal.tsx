"use client";

// BibliographyModal.tsx
//
// Full-source popup for the resilience section. Closes via the X button,
// Escape, or clicking the dark overlay outside the card. Every URL inside
// each bibliography entry is auto-linkified and opens in a new tab.

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { bibliography } from "./bibliography";

export interface BibliographyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const URL_SPLIT_REGEX = /(https?:\/\/[^\s]+)/g;
const URL_TEST_REGEX = /^https?:\/\//;

function linkifyEntry(entry: string, entryIndex: number) {
  return entry.split(URL_SPLIT_REGEX).map((part, partIndex) =>
    URL_TEST_REGEX.test(part) ? (
      <a
        key={`${entryIndex}-${partIndex}`}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-[#E8A33D] underline decoration-[#E8A33D]/40 underline-offset-2 transition-colors hover:text-[#F2EFE9] hover:decoration-[#E8A33D]"
      >
        {part}
      </a>
    ) : (
      <span key={`${entryIndex}-${partIndex}`}>{part}</span>
    )
  );
}

export function BibliographyModal({ isOpen, onClose }: BibliographyModalProps) {
  // Escape to close + lock background scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log("[BibliographyModal] Escape pressed — closing");
        onClose();
      }
    };

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Bibliography"
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-12 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#1C2226] p-8 shadow-2xl shadow-black/50 md:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close bibliography"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15
                         text-[#F2EFE9]/60 transition-colors hover:border-[#E8A33D]/50 hover:text-[#E8A33D]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/60"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <h3 className="mb-1 pr-10 font-[family-name:'Cabinet_Grotesk',sans-serif] text-2xl font-bold text-[#F2EFE9]">
              Bibliography
            </h3>
            <p className="mb-6 font-[family-name:'Cabinet_Grotesk',sans-serif] text-sm text-[#F2EFE9]/50">
              Every source referenced across the policy simulation and resilience options.
            </p>

            <ol className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto pr-2 font-[family-name:'Cabinet_Grotesk',sans-serif] text-[13px] leading-relaxed text-[#F2EFE9]/70">
              {bibliography.map((entry, index) => (
                <li key={index} className="border-b border-white/5 pb-4 last:border-none">
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