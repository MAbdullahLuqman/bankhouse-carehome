import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { careTypes } from "@/lib/data";
import { getCarePageContent } from "@/lib/siteContent";
import { PageShell } from "@/components/PageShell";
import { PageIntro, FAQs } from "@/components/PublicContent";
import { Button } from "@/components/Button";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata { return { title: careTypes.find(care => care.slug === params.slug)?.title ?? "Care guide" }; }
export const dynamic = "force-dynamic";
export default async function CareDetailPage({ params }: { params: { slug: string } }) {
  const care = await getCarePageContent(params.slug);
  const careDetails = careTypes.find(page => page.slug === params.slug);
  if (!care) notFound();
  const Icon = careDetails!.icon;
  return <PageShell><PageIntro label={care.title} title={care.title === "Dementia care" ? "Understanding the person. Supporting their every day." : care.title}><p>{care.intro}</p>{care.slug === "nursing" && <p><strong>Nursing care is not listed</strong> in the service information supplied for Bank House. Contact the home to confirm whether it can meet specific clinical needs.</p>}</PageIntro>
    <section className="section"><div className="container content-grid care-detail-layout"><div><p className="eyebrow">Understanding the approach</p><h2 style={{ marginTop: 16 }}>{care.approachTitle}</h2><p>{care.approach}</p>{["dementia", "residential", "respite"].includes(care.slug) && <Image className="care-detail-image" src={careDetails!.image} alt={care.slug === "dementia" ? "An older woman and caregiver sharing memories as they look through a photo album." : care.slug === "residential" ? "An older man receiving a glass of water from a caregiver at home." : "An older man sharing tea and laughter with a caregiver and visitor in a garden."} width={care.slug === "respite" ? 1448 : 1536} height={care.slug === "respite" ? 1086 : 1024} sizes="(max-width: 767px) calc(100vw - 48px), 50vw" />}<h3 style={{ marginTop: 40 }}>Everyday life: what to discuss</h3><ul className="check-list">{care.dailyLife.map(item => <li key={item}><Check size={20} aria-hidden="true" />{item}</li>)}</ul></div><aside className="side-card"><span className="icon-tile"><Icon size={28} aria-hidden="true" /></span><h2>Take it at your own pace.</h2><p>Bring your questions about care, availability and what day-to-day life could look like.</p><Button href="/contact#enquiry">Book a Visit</Button><div style={{ marginTop: 12 }}><Button href="/fees" secondary>Explore fees</Button></div></aside></div></section>
    <section className="section slate-section"><div className="container faq-layout"><div className="section-heading"><p className="eyebrow">Here to help you understand</p><h2>Your questions,<br />considered.</h2></div><FAQs questions={care.questions} /></div></section>
  </PageShell>;
}
