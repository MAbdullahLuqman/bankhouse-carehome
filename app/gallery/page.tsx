import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GalleryGrid } from "@/components/GalleryGrid";
import { streetView } from "@/lib/data";
export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return <PageShell><section className="street-view-hero"><div className="container"><p className="eyebrow">Gallery</p><h1>See the entrance to Bank House</h1><p className="street-view-intro">Take a look at the entrance from Brandlesholme Road before your visit.</p><div className="street-view-embed"><iframe className="street-view-frame" title="Google Street View of the Bank House Care Home entrance." src={streetView.panorama} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /><a className="street-view-clickthrough" href={streetView.open} target="_blank" rel="noreferrer" aria-label="Open Google Street View of the Bank House Care Home entrance in Google Maps" /></div><a className="text-link" href={streetView.open} target="_blank" rel="noreferrer">Open Street View in Google Maps <ArrowUpRight size={18} aria-hidden="true" /></a></div></section><section className="section"><div className="container"><GalleryGrid /></div></section></PageShell>;
}
