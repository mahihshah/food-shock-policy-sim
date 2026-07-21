"use client";

// SourceTag.tsx — the small, non-obtrusive "Source" citation trigger.
// Fixes the floating-tooltip bug: sits inline below the case study text,
// opens on hover/focus, and lingers 700ms on mouse-out so the link inside
// stays clickable.

import { useRef, useState } from "react";
import { linkifyEntry } from "./lib/linkify";

export function SourceTag({ source }: { source?: string }) {
  const [open, setOpen] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!source) return null;

  const show = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setOpen(true);
  };
  const scheduleHide = () => {
    hideTimeout.current = setTimeout(() => setOpen(false), 700);
  };

  return (
    <span className="relative mt-1.5 inline-block" onMouseEnter={show} onMouseLeave={scheduleHide}>
      <button
        type="button"
        onClick={show}
        onFocus={show}
        onBlur={scheduleHide}
        className="font-[family-name:var(--font-serif-accent)] text-[10px] italic tracking-wide text-[var(--color-accent-2)]/70
                   underline decoration-[var(--color-accent-2)]/40 underline-offset-2 transition-colors hover:text-[var(--color-accent-2)]"
      >
        Source
      </button>
      {open && (
        <span
          role="tooltip"
          onMouseEnter={show}
          onMouseLeave={scheduleHide}
          className="absolute left-0 top-full z-50 mt-1.5 w-64 rounded-lg border border-[var(--color-border)]
                     bg-[var(--color-surface)] p-2.5 text-left shadow-xl shadow-black/30"
        >
          <span className="block whitespace-pre-line font-[family-name:var(--font-serif-accent)] text-[11px] leading-snug text-[var(--color-foreground)]/80">
            {linkifyEntry(source, "src")}
          </span>
        </span>
      )}
    </span>
  );
}