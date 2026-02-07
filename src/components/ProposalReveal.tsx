"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { CONFIG } from "@/config";

export default function ProposalReveal({ onAccept }: { onAccept: () => void }) {
  const [phase, setPhase] = useState<"line1" | "line2" | "ring" | "buttons">("line1");
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [noAttempts, setNoAttempts] = useState(0);

  // Phase progression
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("line2"), 2400));
    timers.push(setTimeout(() => setPhase("ring"), 4200));
    timers.push(setTimeout(() => setPhase("buttons"), 5400));
    return () => timers.forEach(clearTimeout);
  }, []);

  const dodgeNo = useCallback(() => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 400;
    const vh = typeof window !== "undefined" ? window.innerHeight : 600;
    setNoPos({
      x: (Math.random() - 0.5) * (vw * 0.6),
      y: (Math.random() - 0.5) * (vh * 0.4),
    });
    setNoAttempts((a) => a + 1);
    setNoScale((s) => Math.max(s - 0.12, 0.25));
  }, []);

  const noLabels = [
    "No",
    "Are you sure?",
    "Really?!",
    "Think again!",
    "Please? 🥺",
    "I'll be sad...",
    "Wrong button!",
    "😭",
  ];

  return (
    <motion.section
      className="fixed inset-0 z-30 flex flex-col items-center justify-center letterbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      {/* Deep rose glow that breathes */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at center, rgba(244,63,94,0.06) 0%, transparent 55%)",
            "radial-gradient(ellipse at center, rgba(244,63,94,0.14) 0%, transparent 55%)",
            "radial-gradient(ellipse at center, rgba(244,63,94,0.06) 0%, transparent 55%)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Line 1: "On this Propose Day…" */}
        <motion.h2
          className="font-display text-3xl sm:text-4xl md:text-5xl text-rose-200/80 mb-3"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {CONFIG.proposalLine1}
        </motion.h2>

        {/* Line 2: "Will you be mine?" */}
        <AnimatePresence>
          {(phase === "line2" || phase === "ring" || phase === "buttons") && (
            <motion.h1
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white text-glow-intense"
              initial={{ opacity: 0, y: 50, scale: 0.85, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {CONFIG.proposalLine2}
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Ring */}
        <AnimatePresence>
          {(phase === "ring" || phase === "buttons") && (
            <motion.div
              className="text-5xl sm:text-6xl mt-6 sm:mt-8"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 12 }}
            >
              💍
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <AnimatePresence>
          {phase === "buttons" && (
            <motion.div
              className="flex items-center gap-6 sm:gap-8 mt-10 sm:mt-14"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* YES */}
              <motion.button
                onClick={onAccept}
                className="px-10 sm:px-14 py-4 sm:py-5 rounded-full font-display text-xl sm:text-2xl
                           text-white cursor-pointer
                           bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500
                           bg-[length:200%_auto]
                           transition-all duration-500"
                style={{
                  boxShadow:
                    "0 0 25px rgba(244,63,94,0.4), 0 0 60px rgba(244,63,94,0.15)",
                }}
                whileHover={{
                  scale: 1.08,
                  boxShadow:
                    "0 0 35px rgba(244,63,94,0.5), 0 0 80px rgba(244,63,94,0.25)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{ backgroundPosition: ["0% center", "200% center"] }}
                transition={{ backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" } }}
              >
                Yes! 💕
              </motion.button>

              {/* NO — dodges */}
              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-body text-sm sm:text-base
                           border border-white/15 text-white/40
                           hover:text-white/60 transition-colors cursor-pointer"
                animate={{
                  x: noPos.x,
                  y: noPos.y,
                  scale: noScale,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={dodgeNo}
                onTouchStart={dodgeNo}
              >
                {noLabels[Math.min(noAttempts, noLabels.length - 1)]}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
