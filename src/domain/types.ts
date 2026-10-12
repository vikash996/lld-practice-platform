export type PracticePrompt = {
  id: string;
  title: string;
  placeholder: string;
  hint: string;
  minLength: number;
};

export type Problem = {
  id: string;
  title: string;
  eyebrow: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  time: string;
  summary: string;
  statement: string;
  functionalRequirements: string[];
  constraints: string[];
  considerations: string[];
  prompts: PracticePrompt[];
};

export type PracticeAnswers = Record<string, string>;

export type EvaluationResult = {
  score: number;
  label: string;
  strengths: string[];
  missingInformation: string[];
  suggestions: string[];
  evaluatedAt: string;
  evaluator: "rule-based-v1";
};

export type PracticeAttempt = {
  id: string;
  problemId: string;
  submittedAt: string;
  answers: PracticeAnswers;
  evaluation: EvaluationResult;
};

export type ValidationIssue = { field: string; message: string };

export interface Evaluator {
  evaluate(problem: Problem, answers: PracticeAnswers): EvaluationResult;
}

export interface AttemptRepository {
  getAll(): PracticeAttempt[];
  save(attempt: PracticeAttempt): void;
  clear(): void;
}
