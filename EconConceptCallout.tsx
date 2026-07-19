"use client";

// EconConceptCallout.tsx
//
// Renders up to two "how economics explains this" boxes flanking the main
// card: concepts[0] on the right, concepts[1] on the left, each pushed
// fully outside the card into the page's blank margin space and connected
// back to the card's corner with a curved dashed arrow.
//
// Uses left-full / right-full (not fixed pixel offsets) so the box always
// clears the card's edge regardless of card width. Only shows at `xl`
// breakpoints and up — below that there usually isn't enough margin on
// either side of the card to fit a 256px box without it clipping.

import { Lora } from "next/font/google";
import { motion } from "framer-motion";
import type { EconConcept } from "./econConcepts";

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

function SingleCallout({
  concept,
  side,
}: {
  concept: EconConcept;
  side: "left" | "right";
}) {
  const isLeft = side === "left";

  return (
      <div
      className={`pointer-events-none absolute top-6 hidden w-80 xl:block
                  ${isLeft ? "right-full mr-10" : "left-full ml-10"}`}
    >
      {/* Curved dashed arrow: starts near the card's top corner, curves
          out toward the box. Mirrored for the left side. */}
      <svg
        width="80"
        height="60"
        viewBox="0 0 80 60"
        fill="none"
        className={`absolute top-4 ${isLeft ? "-right-9" : "-left-9"}`}
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
          d="M2 4 C 30 4, 50 30, 78 54"
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
        <span className="mb-0.5 block font-[family-name:'Cabinet_Grotesk',monospace] text-[10px] uppercase tracking-wide text-[#E8A33D]/70">
          How economics explains this
        </span>
        <span
          className={`${lora.className} block text-[15px] font-semibold italic leading-snug text-[#F2EFE9]`}
        >
          {concept.name}
        </span>
        <span className="mt-1 block max-h-[190px] overflow-y-auto font-[family-name:'Cabinet_Grotesk',sans-serif] text-[12px] leading-snug text-[#F2EFE9]/65">
          {concept.description}
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