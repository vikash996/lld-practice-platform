import Link from "next/link";

export function SiteHeader() {
  return <header className="site-header"><div className="container header-inner">
    <Link href="/" className="brand" aria-label="LLD Practice home"><span className="brand-mark">C<span>.</span></span><span className="brand-name">LLD <span>Practice</span><small>LOW LEVEL DESIGN</small></span></Link>
    <nav aria-label="Main navigation"><Link href="/" className="nav-link">Practice</Link><Link href="/history" className="nav-link">My attempts</Link></nav>
  </div></header>;
}
