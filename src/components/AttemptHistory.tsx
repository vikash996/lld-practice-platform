"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { problems } from "@/domain/problems";
import type { PracticeAttempt } from "@/domain/types";
import { LocalStorageAttemptRepository } from "@/repositories/LocalStorageAttemptRepository";

export function AttemptHistory() {
  const [attempts, setAttempts] = useState<PracticeAttempt[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { setAttempts(new LocalStorageAttemptRepository().getAll()); setReady(true); }, []);
  if (!ready) return <div className="loading-card" role="status">Loading your attempts…</div>;
  if (!attempts.length) return <section className="empty-state"><span className="empty-icon">↗</span><h2>Your next idea starts here.</h2><p>Once you submit a design, you’ll find its score and feedback in this space.</p><Link href="/" className="button button-primary">Choose a problem <span>→</span></Link></section>;
  return <div className="attempt-list">{attempts.map((attempt) => {
    const problem = problems.find((item) => item.id === attempt.problemId);
    return <Link href={`/submission/${attempt.id}`} key={attempt.id} className="attempt-row">
      <span className="attempt-symbol">{problem?.title.slice(0, 1) ?? "?"}</span>
      <span className="attempt-info"><strong>{problem?.title ?? "Unknown problem"}</strong><small>{new Date(attempt.submittedAt).toLocaleString()}</small></span>
      <span className="attempt-score"><strong>{attempt.evaluation.score}</strong><small>/ 100</small></span><span className="attempt-label">{attempt.evaluation.label}</span><span className="attempt-arrow" aria-hidden="true">→</span>
    </Link>;
  })}</div>;
}
