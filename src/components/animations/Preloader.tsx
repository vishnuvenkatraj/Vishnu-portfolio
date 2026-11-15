"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "@/data/profile";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const stages = [
    "INITIALIZING CORE SYSTEM...",
    "LOADING PHYSICS ENGINE (MATTER.JS)...",
    "COMPILING DESIGN TOKENS...",
    "PREPARING INTERACTIVE PORTFOLIO...",
    "SYSTEM READY",
  ];

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsLoaded(true);
      if (onComplete) onComplete();
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoaded(true);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        const diff = Math.floor(Math.random() * 12) + 6;
        const next = Math.min(100, prev + diff);
        const nextStage = Math.floor((next / 100) * (stages.length - 1));
        setStageIndex(nextStage);
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsLoaded(true);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.6, ease: "easeOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050811] text-white select-none px-6"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

          {/* Monogram / Logo Mark */}
          <div className="relative mb-8">
            <div className="w-20 h-20 rounded-2xl border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-md flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.25)]">
              <span className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-cyan-400 font-mono">
                {profileData.initials}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full animate-shimmer" />
            </div>
            {/* Spinning decorative orbit */}
            <div className="absolute -inset-2 rounded-2xl border border-cyan-500/20 animate-pulse pointer-events-none" />
          </div>

          {/* Diagnostics Stage */}
          <div className="w-full max-w-xs text-center space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400/80 tracking-wider">
              <span>{stages[stageIndex]}</span>
              <span>{progress}%</span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2">
              <span>EST. LATENCY: &lt;10MS</span>
              <button
                onClick={handleSkip}
                className="text-cyan-400/60 hover:text-cyan-300 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Press to Skip [ESC]
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
