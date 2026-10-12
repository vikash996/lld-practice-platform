# AI usage

AI assistance was used to draft and implement this assignment. These are the concrete design decisions made during that work; the application itself does not call an AI model.

1. **Keep evaluation inspectable and local.** The initial design considered an LLM evaluator because free-form design answers are nuanced. That was rejected: the assignment disallows external AI services, and a keyword score can be explained and reproduced in an interview. The accepted `RuleBasedEvaluator` exposes its small rubric in source and returns actionable, clearly limited feedback.
2. **Separate the scoring rules from the UI.** A direct scoring loop inside the form would have been shorter. It was rejected because it would couple feedback to React and make the logic harder to explain and unit test. The accepted evaluator implements a small interface in the domain layer.
3. **Use browser-local persistence with defensive parsing.** A backend account and database could make history portable, but would add deployment and privacy scope the assignment does not need. The accepted localStorage repository checks parsed records and treats unavailable storage as a recoverable condition. The interface explicitly says history is browser-specific.
4. **Make prompts structured but answers open-ended.** A multiple-choice quiz would make automated scoring easier, but would not give learners practice articulating class responsibilities and trade-offs. The accepted form uses four free-text prompts with minimum-detail validation and a transparent checklist rubric.

AI-generated code and copy were reviewed and edited as part of implementation. No external AI API, generated answer, or model claim is present in the product.
