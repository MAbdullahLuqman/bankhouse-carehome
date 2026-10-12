import Link from "next/link";
import { PageShell } from "./PageShell";
import { PageIntro } from "./PublicContent";
import { legalPages } from "@/lib/data";

export function LegalPage({ name }: { name: keyof typeof legalPages }) {
  const page = legalPages[name];
  return <PageShell><PageIntro label={page.title} title={page.title}><p>{page.description}</p></PageIntro><section className="section"><div className="container document-layout"><nav className="document-nav" aria-label="On this page"><h2>On this page</h2>{page.sections.map((title, index) => <a key={title} href={`#section-${index + 1}`}>{title}</a>)}</nav><div className="document-content"><p>Approved policy text for Bank House is being prepared. For current information, contact the home.</p>{page.sections.map((title, index) => <section id={`section-${index + 1}`} key={title}><h2>{title}</h2></section>)}<p>For the current status of contact information, visit the <Link className="text-link" href="/contact">contact page</Link>.</p></div></div></section></PageShell>;
}
