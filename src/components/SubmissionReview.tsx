"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { problems } from "@/domain/problems";
import type { PracticeAttempt } from "@/domain/types";
import { LocalStorageAttemptRepository } from "@/repositories/LocalStorageAttemptRepository";

export function SubmissionReview({ id }: { id: string }) {
  const [attempt, setAttempt] = useState<PracticeAttempt | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const saved = new LocalStorageAttemptRepository().getAll().find((item) => item.id === id);
    if (saved) setAttempt(saved);
    else {
      try {
        const latest: unknown = JSON.parse(sessionStorage.getItem("cipherschools-latest-attempt") ?? "null");
        if (isAttempt(latest) && latest.id === id) setAttempt(latest);
      } catch { /* storage may be disabled or data corrupted */ }
    }
    setReady(true);
  }, [id]);
  if (!ready) return <div className="loading-card" role="status">Loading your feedback…</div>;
  if (!attempt) return <section className="empty-state"><span className="empty-icon">?</span><h1>We couldn’t find this attempt.</h1><p>It may have been cleared from this browser. Your attempts are stored locally on this device.</p><Link href="/history" className="button button-primary">View attempts <span>→</span></Link></section>;
  const problem = problems.find((item) => item.id === attempt.problemId);
  return <article className="review-card"><div className="review-top"><div><span className="section-kicker">SUBMISSION EVALUATED · RULE-BASED CHECKLIST</span><h1>{problem?.title ?? "Practice attempt"}</h1><p>{new Date(attempt.submittedAt).toLocaleString()}</p></div><div className="score-orb"><strong>{attempt.evaluation.score}</strong><span>/ 100</span></div></div><div className="review-label">{attempt.evaluation.label}</div>
    <div className="feedback-columns"><section className="feedback-group"><h2>What’s working</h2><ul>{attempt.evaluation.strengths.map((item) => <li key={item}>{item}</li>)}</ul></section><section className="feedback-group"><h2>What to build on</h2><ul>{attempt.evaluation.missingInformation.length ? attempt.evaluation.missingInformation.map((item) => <li key={item}>{item}</li>) : <li>Your answers covered the checklist areas. Check the suggestions below for another angle.</li>}{attempt.evaluation.suggestions.map((item) => <li key={item}>{item}</li>)}</ul></section></div>
    <section className="answer-review"><h2>Your submitted design</h2>{problem?.prompts.map((prompt) => <div className="answer-item" key={prompt.id}><h3>{prompt.title}</h3><p>{attempt.answers[prompt.id] || "No answer"}</p></div>)}</section><div className="review-actions"><Link href={`/problems/${attempt.problemId}`} className="button button-primary">Try again <span>→</span></Link><Link href="/history" className="text-link">All attempts <span>→</span></Link></div>
  </article>;
}

function isAttempt(value: unknown): value is PracticeAttempt {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<PracticeAttempt>;
  return typeof candidate.id === "string" && typeof candidate.problemId === "string" && typeof candidate.submittedAt === "string" && !!candidate.answers && !!candidate.evaluation;
}
