import Link from "next/link";
import type { Problem } from "@/domain/types";

export function ProblemCard({ problem, index }: { problem: Problem; index: number }) {
  return <article className="problem-card">
    <div className="card-topline"><span className="card-index">0{index + 1}</span><span className="eyebrow">{problem.eyebrow}</span><span className="card-arrow" aria-hidden="true">↗</span></div>
    <h3>{problem.title}</h3><p>{problem.summary}</p>
    <div className="card-meta"><span className="level"><i />{problem.level}</span><span>{problem.time}</span></div>
    <Link className="card-link" href={`/problems/${problem.id}`}>Explore problem <span aria-hidden="true">→</span></Link>
  </article>;
}
