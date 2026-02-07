"use client";

import { useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import ParticleField from "@/components/ParticleField";
import OpeningScreen from "@/components/OpeningScreen";
import CinematicBuildup from "@/components/CinematicBuildup";
import ProposalReveal from "@/components/ProposalReveal";
import Celebration from "@/components/Celebration";
import AudioPlayer from "@/components/AudioPlayer";

const StarField3D = lazy(() => import("@/components/StarField3D"));

type Scene = "opening" | "buildup" | "proposal" | "celebration";

const PARTICLE_INTENSITY: Record<Scene, number> = {
  opening: 0.4,
  buildup: 0.6,
  proposal: 1,
  celebration: 2,
};

export default function Home() {
  const [scene, setScene] = useState<Scene>("opening");

  return (
    <main className="relative h-screen w-screen bg-cinematic vignette overflow-hidden">
      {/* Layer 0: 3D galaxy */}
      <Suspense fallback={null}>
        <StarField3D />
      </Suspense>

      {/* Layer 1: 2D floating hearts */}
      <ParticleField intensity={PARTICLE_INTENSITY[scene]} />

      {/* Layer 2: Music toggle */}
      <AudioPlayer />

      {/* Layer 3: Scenes */}
      <AnimatePresence mode="wait">
        {scene === "opening" && (
          <OpeningScreen
            key="opening"
            onStart={() => setScene("buildup")}
          />
        )}

        {scene === "buildup" && (
          <CinematicBuildup
            key="buildup"
            onComplete={() => setScene("proposal")}
          />
        )}

        {scene === "proposal" && (
          <ProposalReveal
            key="proposal"
            onAccept={() => setScene("celebration")}
          />
        )}

        {scene === "celebration" && (
          <Celebration key="celebration" />
        )}
      </AnimatePresence>
    </main>
  );
}
