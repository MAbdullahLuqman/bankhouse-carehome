import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, MessageCircle, Plus } from "lucide-react";
import { careTypes, facilities, reviews, siteDetails } from "@/lib/data";

export function PageIntro({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return <section className="page-intro"><div className="container"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>{label}</span></nav><p className="eyebrow">{label}</p><h1>{title}</h1><div className="intro-copy">{children}</div></div></section>;
}

export function CareGrid() {
  return <div className="care-grid">{careTypes.filter(care => care.slug !== "nursing").map(({ slug, title, description, image, icon: Icon }) => <article className="care-card" key={slug}>
    <Image className="care-card-image" src={image} alt="" fill sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) 44vw, 30vw" />
    <div className="care-card-copy"><span className="care-card-icon"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></span><h3>{title}</h3><p>{description}</p><Link className="text-link" href={`/care-services/${slug}`}>Learn about {title.toLowerCase()}</Link></div>
  </article>)}</div>;
}

export function FacilityGrid({ linkToTop = false }: { linkToTop?: boolean }) {
  return <nav className="facility-grid" aria-label="Explore life at Bank House">{facilities.map(({ title, text, icon: Icon }, index) => <Link className="facility-card" href={linkToTop ? "/facilities" : `/facilities#facility-${index + 1}`} id={`facility-${index + 1}`} key={title}>
    <span className="facility-icon"><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span><span className="facility-copy"><h3>{title}</h3><span className="facility-description">{text}</span></span>
  </Link>)}</nav>;
}

export function TrustStatus() {
  return <div className="trust-status"><ShieldCheck size={24} strokeWidth={1.5} aria-hidden="true" /><div><strong>CQC overall rating: {siteDetails.cqc.rating}</strong><span>Inspected {siteDetails.cqc.inspected}</span><span>{siteDetails.cqc.categories.map(({ name, rating }) => `${name}: ${rating}`).join(" · ")}</span>{siteDetails.cqc.url && <a href={siteDetails.cqc.url} className="text-link">Read the inspection report <ArrowUpRight size={16} aria-hidden="true" /></a>}</div></div>;
}

export function FamilyReviews() {
  return reviews.length ? <div className="review-grid">{reviews.map(review => <figure className="review-card" key={review.url}><blockquote>“{review.text}”</blockquote><figcaption>{review.name}<a className="text-link" href={review.url}>{review.source}<ArrowUpRight size={18} aria-hidden="true" /></a></figcaption></figure>)}</div> : <div className="reviews-pending"><MessageCircle size={34} strokeWidth={1.5} aria-hidden="true" /><div><h3>No reviews are currently published.</h3><p>There are also no awards, accreditations, upcoming events or team members listed at this time.</p></div></div>;
}

export function FAQs({ questions }: { questions: string[][] }) {
  return <div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={20} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>;
}
