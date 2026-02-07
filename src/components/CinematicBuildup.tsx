"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CONFIG } from "@/config";

export default function CinematicBuildup({ onComplete }: { onComplete: () => void }) {
  const lines = CONFIG.buildupLines;
  const [currentLine, setCurrentLine] = useState(-1);
  const [done, setDone] = useState(false);

  // Auto-advance through lines
  useEffect(() => {
    // Initial pause before first line
    const startDelay = setTimeout(() => setCurrentLine(0), 600);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (currentLine < 0) return;
    if (currentLine >= lines.length) {
      // All lines shown — hold, then advance
      const timer = setTimeout(() => setDone(true), 1200);
      return () => clearTimeout(timer);
    }
    // Show each line for a dramatic beat
    const duration = currentLine === lines.length - 1 ? 2200 : 1800;
    const timer = setTimeout(() => setCurrentLine((c) => c + 1), duration);
    return () => clearTimeout(timer);
  }, [currentLine, lines.length]);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(onComplete, 400);
      return () => clearTimeout(timer);
    }
  }, [done, onComplete]);

  return (
    <motion.section
      className="fixed inset-0 z-30 flex items-center justify-center letterbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(124,58,237,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <AnimatePresence mode="wait">
          {currentLine >= 0 && currentLine < lines.length && (
            <motion.p
              key={currentLine}
              className="font-display text-3xl sm:text-4xl md:text-5xl text-white/90 text-glow-white leading-relaxed"
              initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{
                enter: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                exit: { duration: 0.5, ease: "easeIn" },
              }}
            >
              {lines[currentLine]}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Progress dots */}
        <motion.div
          className="flex justify-center gap-2 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5 }}
        >
          {lines.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                i <= currentLine ? "bg-rose-400 scale-100" : "bg-white/20 scale-75"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
