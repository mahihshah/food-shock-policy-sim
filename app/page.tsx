"use client";

// app/page.tsx
//
// The main page. Connects scenarios.ts, gameLogic.ts, and questionCard.tsx —
// deliberately kept thin: state lives here, but all the rules about how
// state changes live in gameLogic.ts, and all the rendering of a single
// scenario lives in questionCard.tsx.
//
// PATH ASSUMPTION: this file lives at app/page.tsx, one level below your
// project root, where scenarios.ts, gameLogic.ts, and questionCard.tsx all
// live flat (no subfolders). If that changes, update the three imports below.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QuestionCard from "../questionCard";
import {
  initializeGameState,
  selectChoice,
  restartGame,
  goToPreviousScenario,
  getCurrentScenario,
  getStepLabel,
  getGameplayDecisionsCount,
  calculatePlaythroughMetrics,
  type GameState,
} from "../gameLogic";

// Every path through scenarios.ts currently resolves in exactly 4 decisions
// before reaching an ending (opening → policy → response → action → outcome).
// This is only used to render the progress bar. If you add branches with a
// different depth later, update this number (or swap it for a computed
// max-depth helper in gameLogic.ts).
const TOTAL_DECISIONS = 4;

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(() => {
    console.log("[page] Loading starting scenario");
    return initializeGameState();
  });

  const currentScenario = getCurrentScenario(gameState);
const progressRatio = Math.min(getGameplayDecisionsCount(gameState) / TOTAL_DECISIONS, 1);
  // Log a final summary the moment an ending is reached — confirms the
  // whole chain (page → gameLogic → scenarios) is wired correctly end to end.
  useEffect(() => {
    if (gameState.isEnded) {
      console.log(`[page] Ending reached: "${currentScenario.id}" — "${currentScenario.title}"`);
      calculatePlaythroughMetrics(gameState);
    }
  }, [gameState, currentScenario]);

  const handleSelectChoice = (nextId: string) => {
    console.log(`[page] Player chose to move to scenario "${nextId}"`);
    setGameState((prev) => selectChoice(prev, nextId));
  };

  const handleRestart = () => {
    console.log("[page] Restart requested");
    setGameState(restartGame());
  };

  const handleBack = () => {
    console.log("[page] Back requested");
    setGameState((prev) => goToPreviousScenario(prev));
  };

  if (currentScenario.isLanding) {
    return <QuestionCard scenario={currentScenario} onSelectChoice={handleSelectChoice} />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#14181B] px-4 py-12">
      <div className="mb-8 w-full max-w-2xl">
        <div className="mb-2 flex items-center justify-between font-[family-name:'Cabinet_Grotesk',monospace] text-xs text-white/40">
          <span>{gameState.isEnded ? "Simulation complete" : getStepLabel(gameState)}</span>
          <span>{Math.round(progressRatio * 100)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-[#E8A33D]"
            initial={{ width: 0 }}
            animate={{ width: `${progressRatio * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <QuestionCard
        scenario={currentScenario}
        stepLabel={gameState.isEnded ? undefined : getStepLabel(gameState)}
        onSelectChoice={handleSelectChoice}
        onRestart={gameState.isEnded ? handleRestart : undefined}
      />

      {/* While mid-game, offer quieter back/restart controls below the card */}
      {!gameState.isEnded && (
        <div className="mt-6 flex gap-4 font-[family-name:'Inter',sans-serif] text-xs text-white/30">
          {gameState.history.length > 0 && (
            <button onClick={handleBack} className="underline-offset-2 hover:text-white/60 hover:underline">
              Back
            </button>
          )}
          <button onClick={handleRestart} className="underline-offset-2 hover:text-white/60 hover:underline">
            Restart simulation
          </button>
        </div>
      )}
    </main>
  );
}
