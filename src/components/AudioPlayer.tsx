"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "@/config";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  // Try auto-play after first user interaction
  useEffect(() => {
    if (!CONFIG.musicUrl) return;

    const start = () => {
      if (!ready) {
        setReady(true);
        audioRef.current
          ?.play()
          .then(() => setPlaying(true))
          .catch(() => {});
      }
    };

    window.addEventListener("click", start, { once: true });
    window.addEventListener("touchstart", start, { once: true });
    return () => {
      window.removeEventListener("click", start);
      window.removeEventListener("touchstart", start);
    };
  }, [ready]);

  if (!CONFIG.musicUrl) return null;

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={CONFIG.musicUrl} loop preload="auto" />
      <motion.button
        onClick={toggle}
        className="fixed bottom-5 right-5 z-[100] w-11 h-11 rounded-full glass
                   flex items-center justify-center cursor-pointer
                   hover:border-rose-500/25 transition-colors"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.span
              key="on"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              className="text-rose-300 text-base"
            >
              ♫
            </motion.span>
          ) : (
            <motion.span
              key="off"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              className="text-rose-500/40 text-base"
            >
              ♪
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
