# Propose Day

A cinematic single-page proposal website. Next.js 14 + Tailwind + Framer Motion + Three.js.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

Push to GitHub, import on [vercel.com](https://vercel.com), deploy. Or:

```bash
npx vercel
```

## Customize

Edit `src/config.ts`:

```typescript
export const CONFIG = {
  yourName: "Karthik",
  openingLine: "Today is Propose Day.",
  buildupLines: ["I tried to keep this normal.", "That failed.", "So here we are."],
  proposalLine1: "On this Propose Day...",
  proposalLine2: "Will you be mine?",
  celebrationTitle: "Best Propose Day ever.",
  musicUrl: null, // set to "/music.mp3" after placing file in public/
};
```

## Structure

```
src/
├── config.ts                # All customization
├── app/
│   ├── globals.css          # Tailwind + glassmorphism + cinematic utilities
│   ├── layout.tsx           # Fonts, metadata
│   └── page.tsx             # Scene state machine
└── components/
    ├── StarField3D.tsx      # Three.js galaxy + camera drift
    ├── ParticleField.tsx    # Canvas floating hearts
    ├── OpeningScreen.tsx    # "Today is Propose Day."
    ├── CinematicBuildup.tsx # Dramatic line sequence
    ├── ProposalReveal.tsx   # The big question + dodging No
    ├── Celebration.tsx      # Confetti explosion + final message
    └── AudioPlayer.tsx      # Music toggle (renders nothing if no musicUrl)
```
