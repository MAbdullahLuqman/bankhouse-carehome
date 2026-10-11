import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { EnquiryForm } from "@/components/EnquiryForm";
import { siteDetails } from "@/lib/data";

export const metadata: Metadata = { title: "Contact & visits" };

export default function ContactPage() {
  return <PageShell>
    <section className="contact-main"><div className="container"><EnquiryForm /></div></section>
    <section className="contact-followup"><div className="container">
      <article className="contact-row"><h2><span>01</span>What to expect</h2><div><p>A visit is a chance to see the home, meet the team and ask questions about care, rooms and everyday life.</p><p>Bring the questions that matter to your family. The team can discuss individual needs and explain the next steps.</p></div></article>
      <article className="contact-row"><h2><span>02</span>Where we are</h2><div><p>{siteDetails.address}</p><p>{siteDetails.locationNote}.</p>{siteDetails.phone && <p><Phone size={18} aria-hidden="true" /> <a href={`tel:${siteDetails.phone.replace(/[^+\d]/g, "")}`}>{siteDetails.phone}</a></p>}{siteDetails.email && <p><Mail size={18} aria-hidden="true" /> <a href={`mailto:${siteDetails.email}`}>{siteDetails.email}</a></p>}<a className="text-link" href={`https://maps.google.com/?q=${encodeURIComponent(siteDetails.address)}`}>Open in Google Maps <ArrowUpRight size={18} aria-hidden="true" /></a><iframe title="Bank House location on Google Maps" className="contact-map" loading="lazy" referrerPolicy="no-referrer" src={`https://maps.google.com/maps?q=${encodeURIComponent(siteDetails.address)}&output=embed`} /></div></article>
      <article className="contact-row"><h2><span>03</span>Care quality</h2><div><h3>CQC overall rating: {siteDetails.cqc.rating}</h3><p>Inspected {siteDetails.cqc.inspected}</p><ul className="check-list">{siteDetails.cqc.categories.map(item => <li key={item.name}>{item.name}: {item.rating}</li>)}</ul></div></article>
    </div></section>
  </PageShell>;
}
