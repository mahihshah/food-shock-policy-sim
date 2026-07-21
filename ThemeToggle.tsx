"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("fss-theme") as "dark" | "light" | null;
    const initial = stored ?? "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("fss-theme", next);
  };

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      role="switch"
      aria-checked={isLight}
      className="fixed right-5 top-5 z-[60] flex h-8 w-14 items-center rounded-full border
                 border-[var(--color-border)] bg-[var(--color-surface)]/90 px-1 backdrop-blur
                 transition-colors focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-[var(--color-accent)]/60"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="flex h-6 w-6 items-center justify-center rounded-full shadow-md"
        style={{
          backgroundColor: "var(--color-accent)",
          marginLeft: isLight ? "auto" : 0,
        }}
      >
        {isLight ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-background)" strokeWidth="2.2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-background)" strokeWidth="2.2">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
          </svg>
        )}
      </motion.span>
    </button>
  );
}