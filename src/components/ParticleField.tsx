"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  drift: number;
  phase: number;
  opacity: number;
}

export default function ParticleField({ intensity = 1 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const drawHeart = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      const t = size * 0.3;
      ctx.moveTo(x, y + t);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + t);
      ctx.bezierCurveTo(x - size / 2, y + (size + t) / 2, x, y + (size + t) / 1.2, x, y + size);
      ctx.bezierCurveTo(x, y + (size + t) / 1.2, x + size / 2, y + (size + t) / 2, x + size / 2, y + t);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + t);
      ctx.closePath();
      ctx.fill();
    },
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.innerWidth < 768;
    const count = Math.floor((isMobile ? 18 : 35) * intensity);

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 7 + 3,
      speedY: -(Math.random() * 0.4 + 0.15),
      drift: Math.random() * 1.5 - 0.75,
      phase: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.35 + 0.05,
    }));

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      for (const p of particles) {
        p.y += p.speedY;
        p.x += Math.sin(time + p.phase) * p.drift * 0.25;

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        // Warm rose with slight hue variation
        const hue = 340 + Math.sin(time + p.phase) * 12;
        ctx.fillStyle = `hsl(${hue}, 75%, 65%)`;
        drawHeart(ctx, p.x, p.y, p.size);
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [intensity, drawHeart]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[8]"
      aria-hidden="true"
    />
  );
}
