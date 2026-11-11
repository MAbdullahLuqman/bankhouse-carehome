import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PageIntro } from "@/components/PublicContent";
import { getManagedPage } from "@/lib/siteContent";

export async function ManagedPageView({ kind, slug }: { kind: "blog" | "landing"; slug: string }) {
  const page = await getManagedPage(kind, slug);
  if (!page) notFound();
  return <PageShell>
    <PageIntro label={kind === "blog" ? "News & updates" : "Information"} title={page.title}><p>{page.summary}</p></PageIntro>
    <section className="section"><div className="container managed-page-copy">{page.body.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></section>
  </PageShell>;
}
