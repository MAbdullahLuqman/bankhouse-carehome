import type { Metadata } from "next";
import { ManagedPageView } from "@/components/ManagedPageView";
import { getManagedPage } from "@/lib/siteContent";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getManagedPage("blog", params.slug);
  return page ? { title: page.title, description: page.summary } : { title: "News & updates" };
}
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <ManagedPageView kind="blog" slug={params.slug} />;
}
