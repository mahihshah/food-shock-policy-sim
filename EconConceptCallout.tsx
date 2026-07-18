"use client";

// EconConceptCallout.tsx
//
// The small "how economics explains this" box that sits above a corner of
// the main card, connected to it by a curved dashed arrow. Rendered by
// QuestionCard for every non-landing scenario, driven by econConcepts.ts.
//
// Hidden below `md` — there isn't room for it next to the card on mobile,
// same call as CaseStudyPanel in QuestionCard.tsx.

import { Lora } from "next/font/google";
import { motion } from "framer-motion";
import type { EconConcept } from "./econConcepts";

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export function EconConceptCallout({
  concepts,
  side = "right",
}: {
  concepts: EconConcept[];
  side?: "left" | "right";
}) {
  if (!concepts || concepts.length === 0) return null;
  const isLeft = side === "left";

  return (
    <div
      className={`pointer-events-none absolute -top-28 hidden w-64 md:block
                  ${isLeft ? "-left-6" : "-right-6"}`}
    >
      {/* Curved dashed arrow: starts at the card's top corner, curves up
          and out toward the box. Flip horizontally for the left side. */}
      <svg
        width="96"
        height="88"
        viewBox="0 0 96 88"
        fill="none"
        className={`absolute -bottom-2 ${isLeft ? "left-0" : "right-0"}`}
        style={isLeft ? { transform: "scaleX(-1)" } : undefined}
      >
        <defs>
          <marker
            id={`econ-arrowhead-${side}`}
            markerWidth="7"
            markerHeight="7"
            refX="3.5"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#E8A33D" />
          </marker>
        </defs>
        <path
          d="M90 82 C 60 60, 45 30, 10 6"
          stroke="#E8A33D"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
          fill="none"
          markerEnd={`url(#econ-arrowhead-${side})`}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex flex-col gap-2 rounded-xl border border-[#E8A33D]/25
                   bg-[#1C2226]/95 p-4 shadow-lg shadow-black/30 backdrop-blur-sm"
      >
        {concepts.map((concept, i) => (
          <div
            key={concept.name}
            className={i > 0 ? "mt-1 border-t border-white/10 pt-2" : ""}
          >
            <span className="mb-0.5 block font-[family-name:'Cabinet_Grotesk',monospace] text-[10px] uppercase tracking-wide text-[#E8A33D]/70">
              How economics explains this
            </span>
            <span
              className={`${lora.className} block text-[15px] font-semibold italic leading-snug text-[#F2EFE9]`}
            >
              {concept.name}
            </span>
            <span className="mt-1 block font-[family-name:'Cabinet_Grotesk',sans-serif] text-[12px] leading-relaxed text-[#F2EFE9]/65">
              {concept.description}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}