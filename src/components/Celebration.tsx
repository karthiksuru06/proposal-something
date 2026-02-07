"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";
import { CONFIG } from "@/config";

interface Confetti {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  color: string;
  opacity: number;
  shape: "heart" | "star" | "dot";
}

const PALETTE = [
  "#f43f5e", "#fb7185", "#fda4af", "#fbbf24",
  "#f472b6", "#e879f9", "#c084fc", "#fb923c", "#fff",
];

export default function Celebration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const drawHeart = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, s: number) => {
      ctx.beginPath();
      const t = s * 0.3;
      ctx.moveTo(x, y + t);
      ctx.bezierCurveTo(x, y, x - s / 2, y, x - s / 2, y + t);
      ctx.bezierCurveTo(x - s / 2, y + (s + t) / 2, x, y + (s + t) / 1.2, x, y + s);
      ctx.bezierCurveTo(x, y + (s + t) / 1.2, x + s / 2, y + (s + t) / 2, x + s / 2, y + t);
      ctx.bezierCurveTo(x + s / 2, y, x, y, x, y + t);
      ctx.closePath();
      ctx.fill();
    },
    []
  );

  const drawStar = useCallback(
    (ctx: CanvasRenderingContext2D, s: number) => {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        const ox = Math.cos(a) * s;
        const oy = Math.sin(a) * s;
        const ia = a + Math.PI / 4;
        const ix = Math.cos(ia) * s * 0.3;
        const iy = Math.sin(ia) * s * 0.3;
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
        ctx.lineTo(ix, iy);
      }
      ctx.closePath();
      ctx.fill();
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Confetti[] = [];
    const shapes: Confetti["shape"][] = ["heart", "star", "dot"];

    // Explosion burst from center
    for (let i = 0; i < 180; i++) {
      const angle = (Math.PI * 2 * i) / 180;
      const speed = 2.5 + Math.random() * 9;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: Math.random() * 10 + 4,
        speedX: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
        speedY: Math.sin(angle) * speed - Math.random() * 3,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        opacity: 1,
        shape: shapes[Math.floor(Math.random() * 3)],
      });
    }

    const addRain = () => {
      if (particles.length < 350) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -15,
          size: Math.random() * 7 + 3,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: Math.random() * 2 + 0.8,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 5,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          opacity: 0.8 + Math.random() * 0.2,
          shape: shapes[Math.floor(Math.random() * 3)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.35) addRain();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.04;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.0015;

        if (p.opacity <= 0 || p.y > canvas.height + 40) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === "heart") drawHeart(ctx, 0, 0, p.size);
        else if (p.shape === "star") drawStar(ctx, p.size);
        else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [drawHeart, drawStar]);

  return (
    <motion.section
      className="fixed inset-0 z-40 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Warm background */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, #1a0610 0%, #0d0208 50%, #060208 100%)",
        }}
      />

      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Celebration message */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white text-glow-gold mb-3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.4 }}
        >
          {CONFIG.celebrationTitle}
        </motion.h1>

        <motion.p
          className="font-display text-xl sm:text-2xl md:text-3xl text-rose-200/70 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {CONFIG.celebrationSubtitle}
        </motion.p>

        <motion.div
          className="text-5xl sm:text-6xl mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: "spring", stiffness: 200, damping: 10 }}
        >
          💍 ✨ 💕
        </motion.div>

        <motion.p
          className="font-body text-rose-200/30 text-xs sm:text-sm tracking-[0.25em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1.5 }}
        >
          {CONFIG.celebrationFooter}
        </motion.p>

        <motion.p
          className="font-display text-rose-300/40 text-sm mt-8 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1.5 }}
        >
          — {CONFIG.yourName}
        </motion.p>
      </div>
    </motion.section>
  );
}
