import type { EvaluationResult, Evaluator, PracticeAnswers, Problem } from "./types";

const terms: Record<string, string[]> = {
  classes: ["class", "service", "manager", "controller", "repository", "entity", "policy", "factory", "strategy", "ticket", "floor", "elevator", "inventory", "payment", "vehicle", "space", "request"],
  relationships: ["has", "owns", "contains", "one-to-many", "many-to-one", "association", "composition", "depends", "calls", "uses", "relationship", "many", "one"],
  patterns: ["strategy", "factory", "observer", "state", "singleton", "pattern", "none", "no pattern", "why"],
  tradeoffs: ["trade-off", "tradeoff", "because", "simplify", "failure", "fail", "edge case", "concurrent", "scale", "complexity", "limitation", "risk", "instead", "however"],
};

const suggestionsByField: Record<string, string> = {
  classes: "Name the core entities and one service that coordinates a use case; state each class’s responsibility.",
  relationships: "Explain who owns which objects and how the main request flows between them.",
  patterns: "Tie a pattern to a specific change point, or explicitly justify a simpler design without one.",
  tradeoffs: "Add a concrete failure or edge case and explain what your design gives up to handle it.",
};

export class RuleBasedEvaluator implements Evaluator {
  evaluate(problem: Problem, answers: PracticeAnswers): EvaluationResult {
    const strengths: string[] = [];
    const missingInformation: string[] = [];
    const suggestions: string[] = [];
    let score = 0;
    for (const prompt of problem.prompts) {
      const text = answers[prompt.id]?.trim() ?? "";
      const found = (terms[prompt.id] ?? []).filter((term) => text.toLowerCase().includes(term));
      if (text.length >= prompt.minLength) score += 10;
      if (text.length >= 45) score += 5;
      if (found.length) {
        score += Math.min(found.length, 3) * 5;
        strengths.push(`${prompt.title}: includes relevant design language (${found.slice(0, 3).join(", ")}).`);
      } else {
        missingInformation.push(`Your ${prompt.title.toLowerCase()} section does not yet mention concepts this checklist looks for.`);
      }
      if (text.length < 45 || found.length < 2) suggestions.push(suggestionsByField[prompt.id] ?? `Add specific detail to ${prompt.title.toLowerCase()}.`);
    }
    const normalized = Math.max(0, Math.min(100, Math.round(score)));
    if (normalized === 0 && !missingInformation.length) missingInformation.push("No design details could be checked.");
    return {
      score: normalized,
      label: normalized >= 80 ? "Strong foundation" : normalized >= 55 ? "Good start" : normalized >= 30 ? "Keep developing" : "Room to build",
      strengths: strengths.length ? strengths : ["You have a submission to build on. Add specific design concepts to reveal more strengths."],
      missingInformation,
      suggestions: suggestions.length ? [...new Set(suggestions)] : ["Review your design against each requirement and consider one failure or scale scenario."],
      evaluatedAt: new Date().toISOString(),
      evaluator: "rule-based-v1",
    };
  }
}
