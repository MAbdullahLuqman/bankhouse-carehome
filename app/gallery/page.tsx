import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PageIntro } from "@/components/PublicContent";
import { GalleryGrid } from "@/components/GalleryGrid";
export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return <PageShell><PageIntro label="Gallery" title="A sense of the spaces. A feeling of home."><p>Explore the visual direction for Bank House. Select a photograph to take a closer look.</p></PageIntro><section className="section"><div className="container"><p className="pending-note"><strong>Illustrative photography.</strong> These stock photographs are for the design preview and do not show Bank House, its residents or its facilities. Actual photography will replace them when supplied.</p><GalleryGrid /></div></section></PageShell>;
}
