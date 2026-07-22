// lib/highlight.tsx
import type { ReactNode } from "react";

const HL_SPLIT = /::(.+?)::/g;

export function Hl({ children }: { children: ReactNode }) {
  return (
    <span
      className="underline decoration-[3px] underline-offset-[3px]"
      style={{ textDecorationColor: "var(--color-highlight)" }}
    >
      {children}
    </span>
  );
}

export function renderHighlighted(text: string): ReactNode[] {
  const parts = text.split(HL_SPLIT);
  return parts.map((part, i) =>
    i % 2 === 1 ? <Hl key={i}>{part}</Hl> : <span key={i}>{part}</span>
  );
}