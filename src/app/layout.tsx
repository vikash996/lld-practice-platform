import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "LLD Practice",
  description: "Practice low-level design with clear prompts and transparent feedback.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main>{children}</main><footer className="site-footer"><div className="container footer-inner"><span>Built for thoughtful practice.</span><span>Feedback is a transparent rule-based checklist.</span></div></footer></body></html>;
}
