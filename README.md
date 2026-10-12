# LLD Practice

An independent student assignment project. It is not an official CipherSchools product.

A self-contained, student-friendly practice app for three low-level design exercises. It gives learners a structured place to explain a design and receive an honest, deterministic checklist score. There is no AI service behind the evaluator.

## Run locally

Requires Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # serve a production build
npm run lint       # Next.js lint checks
npm run typecheck  # TypeScript checks
npm test           # Vitest suite
```

## Features

- Dashboard for Parking Lot, Elevator System, and Vending Machine.
- Requirements, constraints, and design considerations for each problem.
- Four guided answer sections covering classes, relationships, patterns, and trade-offs.
- Required-field and minimum-detail validation before evaluation.
- Separate rule-based evaluator with a bounded 0–100 score, strengths, missing areas, and specific next steps.
- Attempt history and complete submission review in the current browser.
- Graceful handling for malformed stored records and unavailable browser storage.
- Responsive layout, keyboard focus states, semantic labels, and reduced-motion support.

## Architecture

- `src/domain/types.ts` defines `Problem`, `PracticeAttempt`, `EvaluationResult`, and the `Evaluator` and `AttemptRepository` interfaces.
- `src/domain/problems.ts` contains the three prompts and their requirements.
- `src/domain/validation.ts` validates form answers without UI dependencies.
- `src/domain/RuleBasedEvaluator.ts` implements deterministic evaluation without React or storage.
- `src/repositories/LocalStorageAttemptRepository.ts` stores and validates browser-local attempts.
- `src/components` contains the reusable presentation and client interaction pieces; `src/app` contains App Router pages.

More detail: [docs/DESIGN.md](docs/DESIGN.md). Research notes: [docs/RESEARCH.md](docs/RESEARCH.md). AI-assisted decisions: [AI_USAGE.md](AI_USAGE.md).

## Limitations

The evaluator checks for a small, visible set of terms and answer length. Its score is a practice signal, not a measure of design correctness, and it can miss good answers phrased differently. There is no diagram editor, account, server sync, or AI evaluation. Attempt history belongs to the current browser’s local storage and is not shared across devices. Clearing browser data removes it. If local storage is disabled or full, the immediate feedback remains visible, but history may not be saved.

## Deploy to Vercel

Import this folder as a project in Vercel, or install the Vercel CLI and run `vercel` from this folder. Vercel detects Next.js automatically; no environment variables or external services are required. Use the default build command (`npm run build`) and output settings. After deployment, each browser keeps its own local attempt history.
