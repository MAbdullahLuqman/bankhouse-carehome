import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageIntro } from "@/components/PublicContent";
import { getPublishedPages } from "@/lib/siteContent";

export const metadata: Metadata = { title: "News & updates" };
export const dynamic = "force-dynamic";
export default async function BlogIndexPage() {
  const posts = await getPublishedPages("blog");
  return <PageShell><PageIntro label="News & updates" title="Life at Bank House"><p>News and updates from the home.</p></PageIntro>
    <section className="section"><div className="container managed-page-list">{posts.length ? posts.map(post => <article key={post.slug}><p className="eyebrow">News &amp; updates</p><h2>{post.title}</h2><p>{post.summary}</p><Link className="text-link" href={`/blog/${post.slug}`}>Read more <ArrowUpRight size={18} aria-hidden="true" /></Link></article>) : <p>There are no updates to share at the moment.</p>}</div></section>
  </PageShell>;
}
