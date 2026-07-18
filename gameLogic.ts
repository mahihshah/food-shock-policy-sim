// lib/gameLogic.ts
//
// Controls how the simulator behaves. Pure logic only — no React, no HTML,
// no imports from components/. This file only knows about scenarios.ts and
// plain data. A UI layer (e.g. a page component) is expected to hold a
// GameState in useState and call these functions to produce the next state.
//
// PATH ASSUMPTION: this file lives at lib/gameLogic.ts, one level below your
// project root, and scenarios.ts lives at the project root (same level as
// questionCard.tsx). If your layout differs, adjust the import below.

import type { Choice, Scenario } from "./scenarios";
import { scenarios, scenariosById, startScenario, choicePastTense } from "./scenarios";

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

/** A single recorded decision the player made */
export interface DecisionRecord {
  /** The scenario the player was looking at */
  fromScenarioId: string;
  /** The exact text of the choice they picked */
  choiceText: string;
  /** The scenario that choice led to */
  toScenarioId: string;
  /** 1-indexed position of this decision in the playthrough */
  stepNumber: number;
  /** When the decision was made (useful for debugging/analytics later) */
  timestamp: number;
}

/** The full state of a playthrough */
export interface GameState {
  /** The scenario currently being shown to the player */
  currentScenarioId: string;
  /** Ordered list of every scenario id visited before the current one */
  history: string[];
  /** Ordered list of every decision made so far */
  decisions: DecisionRecord[];
  /** True once the player has landed on an ending scenario */
  isEnded: boolean;
  /** nextId chosen at the very first decision (scenario "0") — "1" or "2" */
  firstChoiceId: string | null;
  /** Playthroughs completed this session — starts at 1, becomes 2 after a forced retry */
  playCount: number;
}

/** Result of validating the scenario graph in scenarios.ts */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// -----------------------------------------------------------------------------
// VALIDATION
// -----------------------------------------------------------------------------

/**
 * Checks the scenario graph for structural problems:
 * - every choice.nextId points to a scenario that actually exists
 * - every non-ending scenario has exactly 2 choices
 * - every ending scenario has 0 choices
 * - exactly one scenario is marked as the start
 *
 * Runs automatically when this module is first imported, and logs a clear
 * console error if anything is wrong — so broken branches are caught early
 * instead of surfacing as a silent dead end during play.
 */
export function validateScenarioGraph(): ValidationResult {
  const errors: string[] = [];

  const startScenarios = scenarios.filter((s) => s.isStart);
  if (startScenarios.length === 0) {
    errors.push("No scenario is marked isStart: true.");
  } else if (startScenarios.length > 1) {
    errors.push(
      `Multiple scenarios are marked isStart: true (${startScenarios
        .map((s) => s.id)
        .join(", ")}). There should be exactly one.`
    );
  }

  for (const scenario of scenarios) {
    if (scenario.isEnding) {
      if (scenario.choices.length !== 0) {
        errors.push(
          `Ending scenario "${scenario.id}" has ${scenario.choices.length} choice(s); endings should have 0.`
        );
      }
      continue;
    }

    const expectedChoices = scenario.isLanding ? 1 : 2;
    if (scenario.choices.length !== expectedChoices) {
      errors.push(
        `Scenario "${scenario.id}" has ${scenario.choices.length} choice(s); ${
          scenario.isLanding
            ? "landing scenarios should have exactly 1"
            : "non-ending scenarios should have exactly 2"
        }.`
      );
    }

    scenario.choices.forEach((choice: Choice, index: number) => {
      if (!scenariosById[choice.nextId]) {
        errors.push(
          `Scenario "${scenario.id}", choice ${index + 1} ("${choice.text}") points to nextId "${
            choice.nextId
          }", which does not exist in scenarios.ts.`
        );
      }
    });
  }

  const result: ValidationResult = { valid: errors.length === 0, errors };

  if (result.valid) {
    console.log(`[gameLogic] Scenario graph validated OK — ${scenarios.length} scenarios, no broken links.`);
  } else {
    console.error(
      `[gameLogic] Scenario graph validation FAILED with ${errors.length} problem(s):\n` +
        errors.map((e) => ` - ${e}`).join("\n")
    );
  }

  return result;
}

// Run validation once as soon as this module loads, so a broken scenarios.ts
// is caught the moment the app starts rather than mid-playthrough.
validateScenarioGraph();

// -----------------------------------------------------------------------------
// STATE INITIALIZATION
// -----------------------------------------------------------------------------

/** Creates a brand-new game state at the start scenario */
export function initializeGameState(): GameState {
  const state: GameState = {
    currentScenarioId: startScenario.id,
    history: [],
    decisions: [],
    isEnded: !!startScenario.isEnding,
    firstChoiceId: null,
    playCount: 1,
  };
  console.log(`[gameLogic] New game initialized at scenario "${state.currentScenarioId}"`);
  return state;
}

/** Alias for initializeGameState — use this name when resetting mid-game for clarity */
export function restartGame(): GameState {
  console.log("[gameLogic] Restarting game");
  return initializeGameState();
}

// -----------------------------------------------------------------------------
// LOOKUPS
// -----------------------------------------------------------------------------

/** Returns the Scenario object the player is currently looking at */
export function getCurrentScenario(state: GameState): Scenario {
  const scenario = scenariosById[state.currentScenarioId];
  if (!scenario) {
    console.error(
      `[gameLogic] currentScenarioId "${state.currentScenarioId}" does not exist in scenarios.ts — falling back to start scenario`
    );
    return startScenario;
  }
  return scenario;
}

/** True if the player has reached an ending and progression should stop */
export function isEndingReached(state: GameState): boolean {
  return state.isEnded;
}

/** Decisions made since leaving the landing/role-briefing screens — used to drive the progress bar so intro clicks aren't counted as gameplay decisions */
export function getGameplayDecisionsCount(state: GameState): number {
  return state.decisions.filter((d) => !scenariosById[d.fromScenarioId]?.isLanding).length;
}

/** 1-indexed count of "which decision is this", for UI labels like "Decision 3" */
export function getStepLabel(state: GameState): string {
  return `Decision ${getGameplayDecisionsCount(state) + 1}`;
}



// -----------------------------------------------------------------------------
// STATE TRANSITIONS
// -----------------------------------------------------------------------------

/**
 * Advances the game after the player picks a choice. Looks up the choice on
 * the current scenario matching `nextId` (to record its text), validates the
 * target scenario exists, and returns a brand-new GameState — the input
 * state is never mutated.
 *
 * If the game has already ended, or nextId doesn't resolve to a real
 * scenario, this logs an error and returns the state unchanged rather than
 * silently corrupting progress.
 */
export function selectChoice(state: GameState, nextId: string): GameState {
  if (state.isEnded) {
    console.warn(
      `[gameLogic] selectChoice called after the game already ended at "${state.currentScenarioId}" — ignoring`
    );
    return state;
  }

  const currentScenario = getCurrentScenario(state);
  const matchingChoice = currentScenario.choices.find((c) => c.nextId === nextId);

  if (!matchingChoice) {
    console.error(
      `[gameLogic] "${nextId}" is not a valid choice from scenario "${currentScenario.id}" — ignoring`
    );
    return state;
  }

  const nextScenario = scenariosById[nextId];
  if (!nextScenario) {
    console.error(
      `[gameLogic] Choice "${matchingChoice.text}" points to nextId "${nextId}", which does not exist — ignoring`
    );
    return state;
  }

  const decision: DecisionRecord = {
    fromScenarioId: currentScenario.id,
    choiceText: matchingChoice.text,
    toScenarioId: nextId,
    stepNumber: state.decisions.length + 1,
    timestamp: Date.now(),
  };

  const newState: GameState = {
    currentScenarioId: nextId,
    history: [...state.history, currentScenario.id],
    decisions: [...state.decisions, decision],
    isEnded: !!nextScenario.isEnding,
    firstChoiceId: currentScenario.id === "0" ? nextId : state.firstChoiceId,
    playCount: state.playCount,
  };

  console.log(
    `[gameLogic] Step ${decision.stepNumber}: "${decision.choiceText}" — "${decision.fromScenarioId}" → "${decision.toScenarioId}"` +
      (newState.isEnded ? " (ENDING REACHED)" : "")
  );

  return newState;
}

/**
 * Moves back to the previous scenario, undoing the last decision. Returns
 * the state unchanged (with a console warning) if there's nowhere to go
 * back to.
 */
export function goToPreviousScenario(state: GameState): GameState {
  if (state.history.length === 0) {
    console.warn("[gameLogic] goToPreviousScenario called with no history — already at the start");
    return state;
  }

  const previousScenarioId = state.history[state.history.length - 1];
  const newState: GameState = {
    currentScenarioId: previousScenarioId,
    history: state.history.slice(0, -1),
    decisions: state.decisions.slice(0, -1),
    isEnded: false, // you can only go "back" from a non-ending, or back out of an ending
    firstChoiceId: state.firstChoiceId,
    playCount: state.playCount,
  };

  console.log(`[gameLogic] Went back to scenario "${previousScenarioId}"`);
  return newState;
}

// -----------------------------------------------------------------------------
// FORCED RETRY — jump straight into the branch NOT taken at scenario "0"
// -----------------------------------------------------------------------------

export function retryWithAlternateFirstChoice(state: GameState): GameState {
  const rootScenario = scenariosById["0"];
  const originalId = state.firstChoiceId;

  if (!rootScenario || !originalId) {
    console.warn("[gameLogic] No recorded first choice to retry against — restarting instead");
    return restartGame();
  }

  const alternateChoice = rootScenario.choices.find((c) => c.nextId !== originalId);
  if (!alternateChoice) {
    console.error("[gameLogic] Could not find an alternate first choice — restarting instead");
    return restartGame();
  }

  const decision: DecisionRecord = {
    fromScenarioId: "0",
    choiceText: alternateChoice.text,
    toScenarioId: alternateChoice.nextId,
    stepNumber: 1,
    timestamp: Date.now(),
  };

  const newState: GameState = {
    currentScenarioId: alternateChoice.nextId,
    history: ["0"],
    decisions: [decision],
    isEnded: false,
    firstChoiceId: alternateChoice.nextId,
    playCount: state.playCount + 1,
  };

  console.log(`[gameLogic] Retrying with alternate first choice: "${alternateChoice.text}"`);
  return newState;
}

// -----------------------------------------------------------------------------
// PATH SUMMARY — plain-language, past-tense trail for ending screens
// -----------------------------------------------------------------------------

export function getPathSummary(state: GameState): string {
  return state.decisions
    .filter((d) => !scenariosById[d.fromScenarioId]?.isLanding)
    .map((d) => choicePastTense[d.choiceText] ?? d.choiceText)
    .join(" → ");
}


// -----------------------------------------------------------------------------
// METRICS / SCORING
// -----------------------------------------------------------------------------
//
// scenarios.ts doesn't currently carry numeric weights (e.g. an "economic
// cost" or "food security impact" per choice), so there's nothing meaningful
// to compute a score from yet. Rather than fabricate numbers, this section
// gives you a real, working summary of the playthrough now, plus a single
// place to extend later.
//
// To add real scoring:
//   1. Add optional numeric fields to Choice in scenarios.ts, e.g.
//        foodSecurityImpact?: number; economicCost?: number;
//   2. Sum them in calculatePlaythroughMetrics below.
// No other file needs to change when you do this.

export interface PlaythroughMetrics {
  /** How many decisions the player has made so far */
  decisionsMade: number;
  /** How many scenarios have been visited, including the current one */
  scenariosVisited: number;
  /** Whether the player has reached a terminal (ending) scenario */
  reachedEnding: boolean;
  /** The full path of scenario ids visited, in order, ending at the current one */
  pathTaken: string[];
}

export function calculatePlaythroughMetrics(state: GameState): PlaythroughMetrics {
  const metrics: PlaythroughMetrics = {
    decisionsMade: state.decisions.length,
    scenariosVisited: state.history.length + 1,
    reachedEnding: state.isEnded,
    pathTaken: [...state.history, state.currentScenarioId],
  };

  console.log(
    `[gameLogic] Metrics — ${metrics.decisionsMade} decision(s), path: ${metrics.pathTaken.join(" → ")}`
  );

  return metrics;
}