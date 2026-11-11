import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/PageShell";
import { FacilityGrid } from "@/components/PublicContent";
import { Button } from "@/components/Button";
import { gallery, siteDetails, streetView } from "@/lib/data";
export const metadata: Metadata = { title: "Life at Bank House" };

export default function FacilitiesPage() {
  return <PageShell><section className="street-view-hero facilities-street-view"><div className="container"><h1 className="sr-only">Google Street View of the Bank House Care Home entrance</h1><div className="street-view-embed"><iframe className="street-view-frame" title="Google Street View of the Bank House Care Home entrance." src={streetView.panorama} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /><a className="street-view-clickthrough" href={streetView.open} target="_blank" rel="noreferrer" aria-label="Open Google Street View of the Bank House Care Home entrance in Google Maps" /></div></div></section>
    <section className="section"><div className="container split-section"><figure className="editorial-photo"><Image src={gallery[0].src} alt={gallery[0].alt} width={1400} height={933} sizes="(max-width: 767px) calc(100vw - 48px), 560px" /></figure><div className="section-heading"><p className="eyebrow">Rooms &amp; facilities</p><h2>Make room for<br />what matters to you.</h2><p>There are {siteDetails.rooms.single} single rooms and {siteDetails.rooms.companion} couples or companion rooms. Residents may bring their own furniture if required.</p><Button href="/contact#enquiry" secondary>Ask about a visit</Button></div></div></section>
    <section className="section slate-section"><div className="container"><div className="section-heading"><p className="eyebrow">At Bank House</p><h2>Comfort, access and connection.</h2><p>Facilities and amenities at the home include:</p></div><FacilityGrid /><p className="facility-location">{siteDetails.locationNote} to the centre of Bury. Visit <a className="text-link" href="https://maps.google.com/?q=Brandlesholme+Road%2C+Bury%2C+Greater+Manchester+BL8+1DJ">{siteDetails.address}</a>.</p></div></section>
  </PageShell>;
}
