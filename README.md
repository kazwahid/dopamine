# CINEMA·LAB

A polished Next.js showcase built around two Higgsfield-generated video sequences. It combines a cinematic reel, a real Three.js scene, a stateful motion button, a typed AI tool lifecycle, failure states, and an accessibility/performance audit trail.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The AI chat works in **demo mode** without a key. To connect a real model, copy `.env.example` to `.env.local` and add `OPENAI_API_KEY`.

## What maps to the assignments

- **Audit:** `AUDIT.md`, semantic landmarks, focus states, labels, live chat output, keyboard stop, reduced motion, compressed media.
- **3D:** `components/ThreeScene.tsx` uses Three.js, has a meaningful material/light switch, DPR cap, low-power renderer, and fallback copy.
- **Buttons with a Brain:** `components/MotionButton.tsx` has idle, hover/focus, loading, success, error, and disabled behavior with reduced-motion support.
- **Testing:** Vitest + React Testing Library cover motion states, tool states, keyboard focus, and failure behavior. Playwright covers the primary flow. CI is in `.github/workflows/ci.yml`.
- **Failure handling:** `app/error.tsx`, demo AI fallback, tool sabotage, retryable motion states, and empty-input validation.
- **Generative UI:** `lib/tool.ts` defines a Zod-backed `scoreScene` server tool; `ToolCard` renders input-streaming, input-available, output-available, and output-error distinctly.

## Tool contract

`scoreScene({ scene: 'ring' | 'morning', goal: string })` → `{ title, confidence, tags[], recommendation }`.

The tool intentionally throws when the goal contains `fail`, making the error state easy to demonstrate.

## Performance note

The original uploads were 31 MB and 19 MB. Production copies are about 2.1 MB and 0.64 MB at 960px H.264 with `faststart`. The 3D renderer caps device pixel ratio at 1.5 and uses `powerPreference: low-power`.

## What I would add with more time

- WebVTT captions and transcript search for both videos.
- AV1/WebM variants with `<source>` negotiation.
- Real tool-result streaming rendered directly from AI SDK UI messages.
- A deployment-time Lighthouse/WAVE CI job and real before/after screenshots.
