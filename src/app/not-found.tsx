import Link from "next/link";

export default function NotFound() { return <div className="container page-wrap"><section className="empty-state"><span className="empty-icon">404</span><h1>That problem isn’t here.</h1><p>Pick one of the available practice challenges and start fresh.</p><Link href="/" className="button button-primary">Back to practice <span>→</span></Link></section></div>; }
