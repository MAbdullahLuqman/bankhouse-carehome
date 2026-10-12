import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageIntro } from "@/components/PublicContent";
import { Button } from "@/components/Button";
import { siteDetails } from "@/lib/data";

export const metadata: Metadata = { title: "About Bank House" };

export default function AboutUsPage() {
  return <PageShell>
    <PageIntro label="About us" title="A welcoming place to call home.">
      <p>Bank House is a purpose-built care home in Bury for people aged {siteDetails.admissionsAge} and over, offering permanent residential care and respite stays.</p>
    </PageIntro>
    <section className="section">
      <div className="container split-section">
        <div className="section-heading">
          <p className="eyebrow">Life at Bank House</p>
          <h2>Care, comfort and connection.</h2>
          <p>Choosing a care home is a personal decision. A visit gives you time to see the setting, ask about everyday life and talk through the support a person needs.</p>
          <p>Bank House has space for up to {siteDetails.capacity} people, with single and companion rooms. Residents may bring familiar furniture and belongings.</p>
          <Button href="/contact#enquiry">Arrange a visit</Button>
        </div>
        <figure className="editorial-photo">
          <Image src="/images/lounge.jpg" alt="Sunlit shared lounge with comfortable seating and natural wood" width={1400} height={933} sizes="(max-width: 767px) calc(100vw - 48px), 560px" />
        </figure>
      </div>
    </section>
    <section className="section slate-section">
      <div className="container about-details">
        <div className="section-heading">
          <p className="eyebrow">The home</p>
          <h2>Get to know the details.</h2>
          <p>Ask the team about the home, current availability and whether its care arrangements are right for your family member.</p>
        </div>
        <dl className="about-facts">
          <div><dt>Location</dt><dd>{siteDetails.address}</dd></div>
          <div><dt>Owner</dt><dd>{siteDetails.owner}</dd></div>
          <div><dt>Manager</dt><dd>{siteDetails.manager}</dd></div>
          <div><dt>Accommodation</dt><dd>{siteDetails.rooms.single} single rooms and {siteDetails.rooms.companion} companion rooms</dd></div>
        </dl>
        <Link className="text-link" href="/facilities">Explore the home and facilities<ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  </PageShell>;
}
