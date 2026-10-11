import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageIntro, FamilyReviews } from "@/components/PublicContent";
export const metadata: Metadata = { title: "Reviews & recognition" };

export default function ReviewsPage() {
  return <PageShell><PageIntro label="Reviews & recognition" title="Honest information for your decision."><p>There are currently no published reviews, awards, accreditations, upcoming events or team member profiles for Bank House.</p></PageIntro><section className="section"><div className="container"><FamilyReviews /></div></section><section className="section slate-section"><div className="container split-section"><div className="section-heading"><p className="eyebrow">Getting to know Bank House</p><h2>Bring the questions<br />that matter to you.</h2><p>A visit and a conversation about individual needs can help you decide whether the home feels right.</p></div><ul className="check-list"><li>How will care needs be assessed?</li><li>How are residents’ preferences respected?</li><li>How are questions and concerns handled?</li><li>What does everyday life at the home include?</li></ul></div></section></PageShell>;
}
