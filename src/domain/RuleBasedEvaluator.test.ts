import { describe, expect, it } from "vitest";
import { RuleBasedEvaluator } from "./RuleBasedEvaluator";
import { getProblem } from "./problems";

const problem = getProblem("parking-lot")!;
const evaluator = new RuleBasedEvaluator();

describe("RuleBasedEvaluator", () => {
  it("returns the lower boundary and actionable notes for empty answers", () => {
    const result = evaluator.evaluate(problem, {});
    expect(result.score).toBe(0);
    expect(result.label).toBe("Room to build");
    expect(result.missingInformation).toHaveLength(4);
    expect(result.suggestions).toHaveLength(4);
  });

  it("rewards longer answers that mention checklist vocabulary", () => {
    const result = evaluator.evaluate(problem, {
      classes: "Space class and ParkingService class manage each vehicle and floor in this design.",
      relationships: "Lot contains many floors and each floor has many spaces; service calls repository.",
      patterns: "Strategy pattern chooses allocation policy because rules can vary between floors.",
      tradeoffs: "Trade-off: a simple scan is easy to explain but has a performance cost as lot size grows.",
    });
    expect(result.score).toBeGreaterThan(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.strengths).toHaveLength(4);
    expect(result.suggestions.length).toBeLessThan(4);
  });

  it("caps the upper boundary at 100", () => {
    const text = "class service manager controller repository entity policy factory strategy ticket floor elevator inventory payment vehicle space request has owns contains one-to-many many-to-one association composition depends calls uses relationship many one trade-off because simplify failure fail edge case concurrent scale complexity limitation risk instead however";
    const result = evaluator.evaluate(problem, Object.fromEntries(problem.prompts.map((prompt) => [prompt.id, text])));
    expect(result.score).toBe(100);
    expect(result.label).toBe("Strong foundation");
  });

  it("is deterministic apart from its evaluation timestamp", () => {
    const a = evaluator.evaluate(problem, { classes: "A class defines responsibilities", relationships: "one class has many spaces", patterns: "No pattern needed", tradeoffs: "Trade-off because simple" });
    const b = evaluator.evaluate(problem, { classes: "A class defines responsibilities", relationships: "one class has many spaces", patterns: "No pattern needed", tradeoffs: "Trade-off because simple" });
    expect({ ...a, evaluatedAt: "" }).toEqual({ ...b, evaluatedAt: "" });
  });
});
