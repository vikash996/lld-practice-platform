import Link from "next/link";
import { notFound } from "next/navigation";
import { getProblem, problems } from "@/domain/problems";
import { PracticeForm } from "@/components/PracticeForm";

export function generateStaticParams() { return problems.map((problem) => ({ id: problem.id })); }

export default async function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const problem = getProblem(id);
  if (!problem) notFound();
  return <div className="container page-wrap"><div className="breadcrumbs"><Link href="/">Practice room</Link><span>/</span><span>{problem.title}</span></div>
    <section className="problem-intro"><div className="problem-title-block"><span className="section-kicker">{problem.eyebrow}</span><h1>{problem.title}</h1><p>{problem.summary}</p><div className="intro-tags"><span>{problem.level}</span><span>{problem.time}</span></div></div><div className="problem-statement"><span className="mini-label">THE CHALLENGE</span><p>{problem.statement}</p></div></section>
    <div className="problem-layout"><aside className="requirements-panel"><div className="panel-heading"><span className="section-kicker">START WITH THE BRIEF</span><h2>What your design needs to handle</h2></div><div className="requirement-group"><h3><span className="req-dot green"/>Functional requirements</h3><ul>{problem.functionalRequirements.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="requirement-group"><h3><span className="req-dot orange"/>Constraints</h3><ul>{problem.constraints.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="requirement-group"><h3><span className="req-dot blue"/>Design considerations</h3><ul>{problem.considerations.map((item) => <li key={item}>{item}</li>)}</ul></div></aside><section className="practice-panel"><PracticeForm problem={problem} /></section></div>
  </div>;
}
