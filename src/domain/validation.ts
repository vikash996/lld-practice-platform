import type { PracticeAnswers, Problem, ValidationIssue } from "./types";

export function validateSubmission(problem: Problem, answers: PracticeAnswers): ValidationIssue[] {
  return problem.prompts.flatMap((prompt) => {
    const value = answers[prompt.id]?.trim() ?? "";
    if (!value) return [{ field: prompt.id, message: `${prompt.title} is required.` }];
    if (value.length < prompt.minLength) return [{ field: prompt.id, message: `Add a little more detail (${prompt.minLength} characters minimum).` }];
    return [];
  });
}
