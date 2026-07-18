"use client";

// app/page.tsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QuestionCard from "../questionCard";
import {
  initializeGameState,
  selectChoice,
  restartGame,
  goToPreviousScenario,
  retryWithAlternateFirstChoice,
  getCurrentScenario,
  getStepLabel,
  getGameplayDecisionsCount,
  getPathSummary,
  calculatePlaythroughMetrics,
  type GameState,
} from "../gameLogic";
import { scenariosById } from "../scenarios";

const TOTAL_DECISIONS = 4;

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(() => {
    console.log("[page] Loading starting scenario");
    return initializeGameState();
  });

  const currentScenario = getCurrentScenario(gameState);
  const progressRatio = Math.min(getGameplayDecisionsCount(gameState) / TOTAL_DECISIONS, 1);

  const pathSummary = gameState.isEnded ? getPathSummary(gameState) : undefined;

  // On the FIRST ending only: offer a forced retry into the root policy the
  // player didn't pick, and hide "keep scrolling" until that retry is done.
  const retryInfo =
    gameState.isEnded && gameState.playCount === 1 && gameState.firstChoiceId
      ? {
          originalTitle: scenariosById[gameState.firstChoiceId]?.title ?? "",
          alternateTitle:
            scenariosById[gameState.firstChoiceId === "1" ? "2" : "1"]?.title ?? "",
          onRetry: () => {
            console.log("[page] Retrying with the alternate first policy");
            setGameState((prev) => retryWithAlternateFirstChoice(prev));
          },
        }
      : undefined;

  const showKeepScrolling = gameState.playCount >= 2;

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

  // Landing + role screens are full-bleed with zero surrounding chrome —
  // no progress bar, no back/restart row. QuestionCard's own isLanding
  // branch handles centering with no scroll.
  if (currentScenario.isLanding) {
    return <QuestionCard scenario={currentScenario} onSelectChoice={handleSelectChoice} />;
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center bg-[#14181B] px-4 py-12 ${
        gameState.isEnded ? "justify-start pt-16" : "justify-center"
      }`}
    >
      {/* Bare progress bar — no label, no percentage, no "Simulation complete" text */}
      <div className="mb-8 w-full max-w-2xl">
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
        pathSummary={pathSummary}
        retryInfo={retryInfo}
        showKeepScrolling={showKeepScrolling}
      />

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