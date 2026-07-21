// lib/highlight.tsx
import type { ReactNode } from "react";

const HL_SPLIT = /::(.+?)::/g;
const HL_COLORS = ["accent", "accent-2", "accent-3", "accent-4"] as const;
type HlColor = (typeof HL_COLORS)[number];

const COLOR_VARS: Record<HlColor, string> = {
  accent: "var(--color-accent)",
  "accent-2": "var(--color-accent-2)",
  "accent-3": "var(--color-accent-3)",
  "accent-4": "var(--color-accent-4)",
};

export function Hl({ children, color = "accent" }: { children: ReactNode; color?: HlColor }) {
  return (
    <span
      className="underline decoration-[3px] underline-offset-[3px]"
      style={{ textDecorationColor: COLOR_VARS[color] }}
    >
      {children}
    </span>
  );
}

export function renderHighlighted(text: string): ReactNode[] {
  const parts = text.split(HL_SPLIT);
  let colorIndex = 0;
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      const color = HL_COLORS[colorIndex % HL_COLORS.length];
      colorIndex += 1;
      return (
        <Hl key={i} color={color}>
          {part}
        </Hl>
      );
    }
    return <span key={i}>{part}</span>;
  });
}