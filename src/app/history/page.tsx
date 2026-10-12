import Link from "next/link";
import { AttemptHistory } from "@/components/AttemptHistory";

export default function HistoryPage() {
  return <div className="container page-wrap"><div className="breadcrumbs"><Link href="/">Practice room</Link><span>/</span><span>My attempts</span></div><div className="page-heading"><span className="section-kicker">YOUR PRACTICE</span><h1>Every attempt is progress.</h1><p>Feedback from this browser, ready when you are.</p></div><AttemptHistory /><p className="privacy-note">Attempts are saved in this browser’s local storage. They are not shared across devices.</p></div>;
}
