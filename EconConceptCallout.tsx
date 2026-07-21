"use client";

import { motion } from "framer-motion";
import type { EconConcept } from "./econConcepts";
import { renderHighlighted } from "./lib/highlight";

function SingleCallout({ concept, side }: { concept: EconConcept; side: "left" | "right" }) {
  const isLeft = side === "left";

  return (
    <div className={`pointer-events-none absolute top-6 hidden w-80 xl:block ${isLeft ? "right-full mr-10" : "left-full ml-10"}`}>
      <svg width="80" height="60" viewBox="0 0 80 60" fill="none"
        className={`absolute top-4 ${isLeft ? "-right-9" : "-left-9"}`}
        style={isLeft ? { transform: "scaleX(-1)" } : undefined}>
        <defs>
          <marker id={`econ-arrowhead-${side}`} markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--color-accent)" />
          </marker>
        </defs>
        <motion.path
          d="M2 4 C 30 4, 50 30, 78 54"
          stroke="var(--color-accent)"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
          fill="none"
          markerEnd={`url(#econ-arrowhead-${side})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex flex-col gap-2 rounded-xl border border-[var(--color-accent)]/25
                   bg-[var(--color-surface)]/95 p-4 shadow-lg shadow-black/30 backdrop-blur-sm">
        <span className="mb-0.5 block font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-wide text-[var(--color-accent)]/70">
          How economics explains this
        </span>
        <span className="font-[family-name:var(--font-econ)] block text-[15px] font-semibold italic leading-snug text-[var(--color-foreground)]">
          {concept.name}
        </span>
        <span className="mt-1 block max-h-[190px] overflow-y-auto font-[family-name:var(--font-body)] text-[12px] leading-snug text-[var(--color-foreground)]/65">
          {renderHighlighted(concept.description)}
        </span>
      </motion.div>
    </div>
  );
}

export function EconConceptCallout({ concepts }: { concepts: EconConcept[] }) {
  if (!concepts || concepts.length === 0) return null;
  const [first, second] = concepts;

  return (
    <>
      {first && <SingleCallout concept={first} side="right" />}
      {second && <SingleCallout concept={second} side="left" />}
    </>
  );
}