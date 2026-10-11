import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { CareGrid, FAQs } from "@/components/PublicContent";
import { Button } from "@/components/Button";
import { careCategories, siteDetails, specialisms } from "@/lib/data";

export const metadata: Metadata = { title: "Our care" };

export default function CareServicesPage() {
  return <PageShell>
    <section className="care-hero">
      <Image src="/images/hero-residents.webp" alt="An older couple sharing a happy moment together in a welcoming lounge" fill priority sizes="100vw" />
      <div className="care-hero-shade" />
      <div className="care-hero-copy">
        <p className="eyebrow">Our care</p>
        <h1>Helping people feel at home, one day at a time.</h1>
        <p>Every person and family has a story. Let’s talk about the support that could help make life feel more comfortable.</p>
        <Button href="#care-options">Explore our care</Button>
        <span className="care-hero-caption">Illustrative image · Bank House photography to follow</span>
      </div>
    </section>

    <section className="care-feature-wrap container" aria-label="Starting points">
      <article className="care-feature-card">
        <Image src="/images/lounge.jpg" alt="Illustrative bright lounge with comfortable seating" width={800} height={700} />
        <div><p className="eyebrow">A familiar setting</p><h2>Residential and respite stays</h2><p>Bank House offers permanent residential care and respite stays for people aged {siteDetails.admissionsAge} and over.</p><Link className="text-link" href="/care-services/residential">About residential care<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </article>
      <article className="care-feature-card">
        <Image src="/images/room.jpg" alt="Illustrative comfortable room with neutral furnishings" width={800} height={700} />
        <div><p className="eyebrow">Support for each person</p><h2>Find the right kind of care</h2><p>Explore the care categories listed for Bank House and discuss individual needs with the home.</p><Link className="text-link" href="#care-options">See care categories<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </article>
    </section>

    <section className="section slate-section" id="care-options">
      <div className="container">
        <div className="section-heading"><p className="eyebrow">Registered care categories</p><h2>Care shaped around each person.</h2><p>Suitability is discussed around each person’s assessed needs.</p></div>
        <CareGrid />
        <div className="split-section care-details">
          <div><h3>Other listed specialisms</h3><ul className="check-list">{specialisms.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>Stay options</h3><p>Permanent residential care and respite care are offered. Contact Bank House to discuss dates and availability.</p><p><strong>Registered for mild dementia.</strong></p></div>
        </div>
        <p className="pending-note care-nursing-note"><strong>Nursing care is not included</strong> in the service information supplied. Contact Bank House to confirm whether it can meet specific clinical needs.</p>
      </div>
    </section>

    <section className="section">
      <div className="container split-section">
        <div className="section-heading"><p className="eyebrow">A personal decision</p><h2>Begin with a conversation.</h2><p>Discuss routines, mobility, medication, meals and companionship. An assessment helps establish whether the home can meet a person’s needs.</p><Button href="/contact#enquiry">Plan your next step</Button></div>
        <div><h3>Questions worth bringing along</h3><ul className="check-list"><li>How will my loved one’s needs be assessed?</li><li>Who will be involved in care planning?</li><li>How are changes in health and wellbeing communicated?</li><li>What happens if care needs change?</li></ul></div>
      </div>
    </section>

    <section className="section slate-section">
      <div className="container faq-layout"><div className="section-heading"><p className="eyebrow">A little clarity</p><h2>Common questions.</h2></div><FAQs questions={[["Which care categories are listed?", careCategories.join(", ") + "."], ["Does Bank House offer respite care?", "Yes. Both permanent residential and respite care are offered. Contact the home to discuss availability."], ["What is the minimum admissions age?", `Admissions are for people aged ${siteDetails.admissionsAge} and over.`], ["Does Bank House provide nursing care?", "Nursing care is not included in the service information supplied. Contact the home to confirm whether it can meet specific clinical needs."]]}/></div>
    </section>
  </PageShell>;
}
