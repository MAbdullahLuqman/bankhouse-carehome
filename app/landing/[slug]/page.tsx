import type { Metadata } from "next";
import { ManagedPageView } from "@/components/ManagedPageView";
import { getManagedPage } from "@/lib/siteContent";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getManagedPage("landing", params.slug);
  return page ? { title: page.title, description: page.summary } : { title: "Information" };
}
export default function LandingPage({ params }: { params: { slug: string } }) {
  return <ManagedPageView kind="landing" slug={params.slug} />;
}
