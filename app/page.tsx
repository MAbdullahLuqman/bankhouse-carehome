import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, UsersRound, House, Heart, BadgeCheck } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/Button";
import { CareGrid, FacilityGrid, FamilyReviews, TrustStatus } from "@/components/PublicContent";
import { gallery, siteDetails } from "@/lib/data";

const homeHighlights = [
  { icon: UsersRound, title: "Relationship-Centred", text: "You and your loved ones at the heart of everything we do." },
  { icon: House, title: "Homes for Living", text: `A purpose-built home with space for up to ${siteDetails.capacity} people.` },
  { icon: Heart, title: "Familiar Comforts", text: "Bring familiar furniture and belongings to make a room your own." },
  { icon: BadgeCheck, title: "CQC Rated Good", text: `Inspected ${siteDetails.cqc.inspected}.` }
];

export default function HomePage() {
  return <PageShell>
    <section className="hero"><div className="container hero-grid">
      <div className="hero-copy"><p className="eyebrow">Welcome to Bank House</p><h1>A little support. A lot of <em>feeling at home.</em></h1><p>Where thoughtful care and everyday comforts help you and your family feel at home.</p><div className="button-row"><Button href="/contact#enquiry">Book a Visit</Button>{siteDetails.brochure ? <Button href={siteDetails.brochure} secondary>Download Brochure</Button> : <Link className="text-link" href="/care-services">Explore our care<ArrowUpRight size={18} aria-hidden="true" /></Link>}</div><TrustStatus /></div>
      <figure className="hero-photo"><Image src="/images/home-residents.png" alt="An older woman sharing tea and a happy conversation with her daughter in a bright lounge" width={1536} height={1024} priority sizes="(max-width: 767px) calc(100vw - 48px), 560px" /><div className="photo-label"><HeartHandshake size={34} strokeWidth={1.3} aria-hidden="true" /><span>Because care<br />is personal.</span></div><figcaption>Illustrative image · Bank House photography to follow</figcaption></figure>
    </div></section>
    <section className="home-highlights" aria-label="Bank House at a glance"><div className="container home-highlights-grid">{homeHighlights.map(({ icon: Icon, title, text }) => <article key={title}><Icon className="home-highlight-icon" size={52} strokeWidth={2.3} aria-hidden="true" /><h2>{title}</h2><p>{text}</p></article>)}</div></section>
    <section className="section" id="overview"><div className="container split-section"><div className="section-heading"><p className="eyebrow">More than a place to live</p><h2>The familiar things.<br />The everyday joys.</h2><p>A favourite chair. A conversation over tea. Time spent with the people who matter. The little things are often what make a place feel like home.</p><p>Use this guide to explore care, daily life and the questions to bring along when you visit Bank House.</p><Link href="/facilities" className="text-link">Discover life at Bank House<ArrowUpRight size={18} aria-hidden="true" /></Link></div><figure className="editorial-photo"><Image src={gallery[2].src} alt={gallery[2].alt} width={1200} height={800} sizes="(max-width: 767px) calc(100vw - 48px), 560px" /><figcaption>Illustrative interior · Actual rooms awaiting photography</figcaption></figure></div></section>
    <section className="section slate-section" id="care"><div className="container"><div className="section-heading"><p className="eyebrow">Finding the right support</p><h2>Care that considers<br />the whole person.</h2><p>Bank House offers permanent residential and respite care for people aged 65 and over. Explore its listed care categories and specialisms.</p></div><CareGrid /><p className="pending-note" style={{ marginTop: 32 }}>Nursing care is not included in the service information supplied. Contact Bank House to discuss specific clinical needs.</p></div></section>
    <section className="section"><div className="container"><div className="section-heading center"><p className="eyebrow">Life at Bank House</p><h2>Space for comfort.<br />Room for connection.</h2><p>Purpose-built accommodation for up to {siteDetails.capacity} people, with room for individual and companion living.</p></div><p className="facility-summary">{siteDetails.building} · {siteDetails.rooms.single} single rooms · {siteDetails.rooms.companion} couples or companion rooms</p><FacilityGrid linkToTop /></div></section>
    <section className="section slate-section"><div className="container"><div className="section-heading center"><p className="eyebrow">Reviews & recognition</p><h2>A clear picture of<br />life at Bank House.</h2></div><FamilyReviews /><div className="button-row" style={{ justifyContent: "center", marginTop: 24 }}><Link className="text-link" href="/reviews">Reviews & recognition<ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section>
    <section className="section"><div className="container split-section"><div className="section-heading"><p className="eyebrow">One step at a time</p><h2>You don’t need all<br />the answers today.</h2><p>Start with what matters to your family. A visit is an opportunity to listen, look around and ask practical questions.</p><Button href="/fees">Fees & admissions</Button></div><ol className="numbered-list">{[["01", "Explore the care", "Understand the support needed now and how that may change."], ["02", "See the home", "Ask about rooms, everyday routines and the team providing care."], ["03", "Discuss the next step", "Confirm suitability, availability and written fees before making plans."]].map(([number, title, text]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ol></div></section>
  </PageShell>;
}
