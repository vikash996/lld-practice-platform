import Link from "next/link";
import { SubmissionReview } from "@/components/SubmissionReview";

export default async function SubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div className="container page-wrap"><div className="breadcrumbs"><Link href="/">Practice room</Link><span>/</span><Link href="/history">My attempts</Link><span>/</span><span>Feedback</span></div><SubmissionReview id={id} /></div>;
}
