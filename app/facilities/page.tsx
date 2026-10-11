import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/PageShell";
import { PageIntro, FacilityGrid } from "@/components/PublicContent";
import { Button } from "@/components/Button";
import { gallery, siteDetails } from "@/lib/data";
export const metadata: Metadata = { title: "Life at Bank House" };

export default function FacilitiesPage() {
  return <PageShell><PageIntro label="Life at Bank House" title="The comforts of home. The company that matters."><p>Bank House is a purpose-built care home for up to {siteDetails.capacity} people. The last refurbishment was completed in 2013.</p></PageIntro>
    <section className="section"><div className="container split-section"><figure className="editorial-photo"><Image src={gallery[0].src} alt={gallery[0].alt} width={1400} height={933} sizes="(max-width: 767px) calc(100vw - 48px), 560px" /><figcaption>Illustrative photograph · Not a photograph of Bank House</figcaption></figure><div className="section-heading"><p className="eyebrow">Rooms &amp; facilities</p><h2>Make room for<br />what matters to you.</h2><p>There are {siteDetails.rooms.single} single rooms and {siteDetails.rooms.companion} couples or companion rooms. Residents may bring their own furniture if required.</p><Button href="/contact#enquiry" secondary>Ask about a visit</Button></div></div></section>
    <section className="section slate-section"><div className="container"><div className="section-heading"><p className="eyebrow">At Bank House</p><h2>Comfort, access and connection.</h2><p>Facilities and amenities at the home include:</p></div><FacilityGrid /><p className="facility-location">{siteDetails.locationNote} to the centre of Bury. Visit <a className="text-link" href="https://maps.google.com/?q=Brandlesholme+Road%2C+Bury%2C+Greater+Manchester+BL8+1DJ">{siteDetails.address}</a>.</p></div></section>
  </PageShell>;
}
