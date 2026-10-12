# Product and technical design

## User journey

The learner chooses one of three systems on the dashboard, reviews its statement, functional requirements, constraints, and design considerations, then writes a short response in four sections. Client-side validation catches blank or very short sections. Submitting creates a `PracticeAttempt`, evaluates the answers, saves the result in local storage, and opens a review page. Review shows the original answers alongside the checklist feedback and offers a direct path to try the problem again. The attempts page lists saved submissions; its empty state returns the learner to the dashboard.

## Domain model

- `Problem` contains the prompt, context, constraints, considerations, and `PracticePrompt`s.
- `PracticeAnswers` maps prompt IDs to learner text.
- `PracticeAttempt` combines a stable ID, problem ID, submission time, answers, and evaluation.
- `EvaluationResult` contains a bounded score, label, strengths, missing-information notes, suggestions, timestamp, and evaluator version.
- `Evaluator` and `AttemptRepository` describe the two useful boundaries. They allow isolated evaluation and persistence without introducing a framework or service container.

`RuleBasedEvaluator` is pure with respect to React and persistence. For each prompt it awards 10 points when minimum length is met, 5 more at 45 characters, and 5 per detected relevant term up to three. Across four prompts, the maximum is 100. Scores are clamped to 0–100. The rubric also emits strengths when relevant vocabulary appears and a targeted suggestion when a response is short or lacks multiple rubric terms. It is an illustrative checklist, not semantic understanding or an objective grade.

`LocalStorageAttemptRepository` owns the storage key, serializes attempts, filters malformed entries, sorts newest first, and turns storage exceptions into actionable errors. React components do not parse the localStorage payload themselves. Current-session storage is used only to preserve the just-submitted review when persistent storage is unavailable; it is also guarded.

## Trade-offs

This is a single Next.js application with a small domain layer. There is no database, authentication, API route, external service, diagram editor, or server-side user state. This keeps deployment configuration free and makes the evaluator easy to inspect. The cost is browser-specific history and a deliberately shallow rubric. Term matching is transparent and testable but can miss equivalent wording and reward vocabulary without good design reasoning.

The UI keeps requirements adjacent to the answer form on wide screens and stacks them on smaller screens. Native controls and labels provide keyboard and assistive-technology support; feedback uses status and alert semantics. Motion is limited to small hover effects and disabled for reduced-motion preferences.

## Failure handling and extension

Blank and undersized answers are reported on their fields before scoring. Corrupt JSON or invalid records result in an empty/filtered history rather than a crash. Read or write access failures are caught; a learner receives feedback for the current submission where possible and an explanation if it cannot be retained. An unknown problem ID and a missing attempt have useful recovery links.

To extend the app, add a `Problem` object and its prompt data, then add vocabulary and feedback rules to the evaluator. A more advanced evaluator could implement `Evaluator` while retaining the same `EvaluationResult`; a different repository could implement `AttemptRepository`. Neither extension requires changing the problem page’s domain responsibilities.
