import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageIntro } from "@/components/PublicContent";
import { GalleryGrid } from "@/components/GalleryGrid";
export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return <PageShell><PageIntro label="Gallery" title="A sense of the spaces. A feeling of home."><p>Explore welcoming shared spaces, resident rooms, gardens and everyday moments.</p></PageIntro><section className="section"><div className="container"><GalleryGrid /></div></section></PageShell>;
}
