// ============================================================
//  CUSTOMIZE YOUR PROPOSE DAY EXPERIENCE
//  Edit these values to make it yours.
// ============================================================

export const CONFIG = {
  // Your name (shown on the celebration screen)
  yourName: "Karthik",

  // ── Opening Screen (Scene 1) ───────────────────────────────
  openingLine: "Today is Propose Day.",
  openingSubtext: "And I have something to say.",
  openingButton: "Start",

  // ── Cinematic Buildup (Scene 2) ────────────────────────────
  buildupLines: [
    "I tried to keep this normal.",
    "That failed.",
    "So here we are.",
  ],

  // ── Proposal Reveal (Scene 3) ──────────────────────────────
  proposalLine1: "On this Propose Day\u2026",
  proposalLine2: "Will you be mine?",

  // ── Celebration (Scene 4) ──────────────────────────────────
  celebrationTitle: "Best Propose Day ever.",
  celebrationSubtitle: "You just made me the happiest person alive.",
  celebrationFooter: "Forever starts now.",

  // ── Background Music ──────────────────────────────────────
  // Place an MP3 in /public and set the path here. null = disabled.
  musicUrl: null as string | null,
} as const;
