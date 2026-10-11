import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { siteDetails } from "@/lib/data";

export const metadata: Metadata = { title: "Fees & admissions" };

export default function FeesPage() {
  return <PageShell>
    <section className="section"><div className="container"><div className="section-heading"><p className="eyebrow">The cost of care</p><h2>Weekly fees, clearly set out.</h2><p>Fees depend on the care arranged. Confirm the full cost and any applicable terms with Bank House.</p></div><table className="fees-table"><caption>Bank House published starting fees</caption><thead><tr><th scope="col">Care type</th><th scope="col">Starting weekly fee</th></tr></thead><tbody><tr><th scope="row">Residential care</th><td>£950 per week</td></tr><tr><th scope="row">Residential dementia care</th><td>£1,050 per week</td></tr></tbody></table></div></section>
    <section className="section slate-section"><div className="container split-section"><div className="section-heading"><p className="eyebrow">Admissions</p><h2>Start with an individual conversation.</h2><p>Bank House accepts admissions from age {siteDetails.admissionsAge}. Discuss care needs, suitability, room arrangements and the written fee with the home before making a decision.</p></div><div><h3>Funding accepted</h3><p>{siteDetails.funding}</p><h3 style={{ marginTop: 32 }}>Stay options</h3><p>Permanent residential and respite care are offered. Ask Bank House about current availability and respite fees.</p></div></div></section>
  </PageShell>;
}
