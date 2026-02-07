"use client";

import { motion } from "framer-motion";
import { CONFIG } from "@/config";

export default function OpeningScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.section
      className="fixed inset-0 z-30 flex flex-col items-center justify-center letterbox"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Ambient glow pulse */}
      <motion.div
        className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(244,63,94,0.08) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main text */}
      <motion.h1
        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white text-glow-intense text-center relative z-10 px-6"
        initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {CONFIG.openingLine}
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="font-body text-base sm:text-lg text-rose-200/40 tracking-[0.3em] uppercase mt-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.2 }}
      >
        {CONFIG.openingSubtext}
      </motion.p>

      {/* Start button */}
      <motion.button
        onClick={onStart}
        className="relative z-10 mt-14 sm:mt-16 group cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3 }}
      >
        <span className="relative inline-flex items-center justify-center px-10 py-4 rounded-full
                         font-display text-lg sm:text-xl text-white
                         bg-white/[0.06] border border-white/[0.12]
                         backdrop-blur-md
                         group-hover:bg-white/[0.1] group-hover:border-rose-500/30
                         transition-all duration-500">
          {CONFIG.openingButton}
        </span>

        {/* Outer glow ring */}
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                         transition-opacity duration-500"
              style={{
                boxShadow: "0 0 30px rgba(244,63,94,0.2), 0 0 60px rgba(244,63,94,0.1)",
              }}
        />
      </motion.button>

      {/* Scroll hint line */}
      <motion.div
        className="absolute bottom-[7vh] left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 3.5 }}
      />
    </motion.section>
  );
}
