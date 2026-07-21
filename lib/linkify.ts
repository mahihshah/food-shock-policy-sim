// lib/linkify.ts — shared URL-detection used by BibliographyModal and SourceTag
// Uses React.createElement instead of JSX so this file has zero dependency
// on JSX-parsing config — works as plain .ts.

import { createElement, type ReactNode } from "react";

const URL_SPLIT_REGEX = /(https?:\/\/[^\s]+)/g;
const URL_TEST_REGEX = /^https?:\/\//;

export function linkifyEntry(entry: string, keyPrefix: string | number): ReactNode[] {
  const parts = entry.split(URL_SPLIT_REGEX);
  const rendered: ReactNode[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const nodeKey = `${keyPrefix}-${i}`;

    if (URL_TEST_REGEX.test(part)) {
      rendered.push(
        createElement(
          "a",
          {
            key: nodeKey,
            href: part,
            target: "_blank",
            rel: "noopener noreferrer",
            className:
              "break-all text-[var(--color-accent)] underline decoration-[var(--color-accent)]/40 underline-offset-2 transition-colors hover:text-[var(--color-foreground)] hover:decoration-[var(--color-accent)]",
          },
          part
        )
      );
    } else {
      rendered.push(createElement("span", { key: nodeKey }, part));
    }
  }

  return rendered;
}