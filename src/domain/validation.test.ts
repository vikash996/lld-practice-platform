import { describe, expect, it } from "vitest";
import { getProblem } from "./problems";
import { validateSubmission } from "./validation";

const problem = getProblem("vending-machine")!;

describe("validateSubmission", () => {
  it("requires every answer", () => {
    const issues = validateSubmission(problem, {});
    expect(issues).toHaveLength(4);
    expect(issues[0].message).toContain("required");
  });

  it("trims whitespace before checking minimum length", () => {
    const issues = validateSubmission(problem, { classes: "             ", relationships: "long enough description", patterns: "none", tradeoffs: "some useful detail" });
    expect(issues.map((issue) => issue.field)).toContain("classes");
    expect(issues.map((issue) => issue.field)).not.toContain("patterns");
  });

  it("accepts answers that meet each prompt minimum", () => {
    const answers = Object.fromEntries(problem.prompts.map((prompt) => [prompt.id, "x".repeat(prompt.minLength)]));
    expect(validateSubmission(problem, answers)).toEqual([]);
  });
});
