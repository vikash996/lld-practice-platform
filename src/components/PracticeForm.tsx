"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PracticeAnswers, PracticeAttempt, Problem } from "@/domain/types";
import { validateSubmission } from "@/domain/validation";
import { RuleBasedEvaluator } from "@/domain/RuleBasedEvaluator";
import { LocalStorageAttemptRepository } from "@/repositories/LocalStorageAttemptRepository";

export function PracticeForm({ problem }: { problem: Problem }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<PracticeAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [storageMessage, setStorageMessage] = useState("");
  const [result, setResult] = useState<PracticeAttempt | null>(null);
  const [submitting, setSubmitting] = useState(false);
  function update(id: string, value: string) {
    setAnswers((current) => ({ ...current, [id]: value }));
    setErrors((current) => { const next = { ...current }; delete next[id]; return next; });
  }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const issues = validateSubmission(problem, answers);
    if (issues.length) {
      setErrors(Object.fromEntries(issues.map((issue) => [issue.field, issue.message])));
      document.getElementById(issues[0].field)?.focus();
      return;
    }
    setSubmitting(true);
    const evaluation = new RuleBasedEvaluator().evaluate(problem, answers);
    const attempt: PracticeAttempt = { id: crypto.randomUUID(), problemId: problem.id, submittedAt: new Date().toISOString(), answers, evaluation };
    try { new LocalStorageAttemptRepository().save(attempt); }
    catch (error) { setStorageMessage(error instanceof Error ? error.message : "Attempt history is unavailable."); }
    try { sessionStorage.setItem("cipherschools-latest-attempt", JSON.stringify(attempt)); }
    catch { setStorageMessage("This browser blocks session storage. Feedback is shown below, but the attempt cannot be reopened after leaving this page."); setResult(attempt); setSubmitting(false); return; }
    router.push(`/submission/${attempt.id}`);
  }
  return <form onSubmit={submit} noValidate>
    <div className="form-intro"><span className="section-kicker">YOUR DESIGN</span><h2>Work through your approach</h2><p>There’s no single right answer. Explain your reasoning as you go.</p></div>
    {problem.prompts.map((prompt, index) => <div className="field" key={prompt.id}>
      <div className="field-heading"><label htmlFor={prompt.id}><span className="field-number">0{index + 1}</span>{prompt.title}</label><span className="field-count">{(answers[prompt.id] ?? "").length} chars</span></div>
      <p className="field-hint" id={`${prompt.id}-hint`}>{prompt.hint}</p>
      <textarea id={prompt.id} value={answers[prompt.id] ?? ""} onChange={(event) => update(prompt.id, event.target.value)} placeholder={prompt.placeholder} rows={4} aria-describedby={`${prompt.id}-hint${errors[prompt.id] ? ` ${prompt.id}-error` : ""}`} aria-invalid={Boolean(errors[prompt.id])} />
      {errors[prompt.id] && <p className="field-error" id={`${prompt.id}-error`} role="alert">{errors[prompt.id]}</p>}
    </div>)}
    {storageMessage && <p className="notice" role="status">{storageMessage}</p>}
    {result && <section className="inline-result" aria-live="polite"><span className="section-kicker">SUBMISSION EVALUATED</span><h2>{result.evaluation.score}<small> / 100</small></h2><p>{result.evaluation.label} · Rule-based checklist</p><div className="feedback-group"><h3>Strengths</h3><ul>{result.evaluation.strengths.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="feedback-group"><h3>Next steps</h3><ul>{[...result.evaluation.missingInformation, ...result.evaluation.suggestions].map((item) => <li key={item}>{item}</li>)}</ul></div></section>}
    <div className="submit-row"><p>Evaluation is a deterministic checklist, not AI.</p><button className="button button-primary" type="submit" disabled={submitting}>{submitting ? "Evaluating…" : "Submit for feedback"}<span aria-hidden="true">→</span></button></div>
  </form>;
}
