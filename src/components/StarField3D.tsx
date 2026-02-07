"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// ── Spiral Galaxy ───────────────────────────────────────────
function Galaxy() {
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = 4000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const inner = new THREE.Color("#f43f5e");
    const outer = new THREE.Color("#7c3aed");
    const mix = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 5 + 0.3;
      const spin = radius * 2.8;
      const branch = ((i % 4) / 4) * Math.PI * 2;
      const angle = branch + spin;
      const scatter = Math.pow(Math.random(), 2) * 0.6 * (radius / 4);

      pos[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * scatter;
      pos[i3 + 1] = (Math.random() - 0.5) * 0.3;
      pos[i3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * scatter;

      mix.lerpColors(inner, outer, Math.min(radius / 5, 1));
      col[i3] = mix.r;
      col[i3 + 1] = mix.g;
      col[i3 + 2] = mix.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.025;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.85}
      />
    </Points>
  );
}

// ── Ambient Stars ───────────────────────────────────────────
function Stars() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 25;
      pos[i3 + 1] = (Math.random() - 0.5) * 25;
      pos[i3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.008;
      ref.current.rotation.x += delta * 0.003;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#e2d0f0"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.5}
      />
    </Points>
  );
}

// ── Camera Drift (smooth slow orbit) ────────────────────────
function CameraDrift() {
  useFrame(({ camera }) => {
    const t = Date.now() * 0.0001;
    camera.position.x = Math.sin(t) * 0.6;
    camera.position.y = Math.cos(t * 0.7) * 0.3;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── Main Export ─────────────────────────────────────────────
export default function StarField3D() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <CameraDrift />
        <Galaxy />
        <Stars />
      </Canvas>
    </div>
  );
}
