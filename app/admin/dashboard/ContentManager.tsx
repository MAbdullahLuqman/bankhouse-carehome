"use client";

import { useEffect, useState } from "react";

type CarePage = { slug: string; title: string; intro: string; approachTitle: string; approach: string; dailyLife: string[] };
type ManagedPage = { slug: string; kind: "blog" | "landing"; title: string; summary: string; body: string; published: boolean };
type ContentResponse = { carePages: CarePage[]; pages: ManagedPage[] };
const inputClass = "mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900";
const areaClass = `${inputClass} min-h-28`;

export function ContentManager() {
  const [content, setContent] = useState<ContentResponse>({ carePages: [], pages: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [selectedCare, setSelectedCare] = useState("residential");
  const [selectedPage, setSelectedPage] = useState("");
  const [page, setPage] = useState<ManagedPage>({ slug: "", kind: "blog", title: "", summary: "", body: "", published: false });

  useEffect(() => {
    fetch("/api/admin/content", { cache: "no-store" }).then(async response => {
      if (!response.ok) throw new Error((await response.json()).error ?? "Could not load content.");
      setContent(await response.json());
    }).catch(cause => setError(cause instanceof Error ? cause.message : "Could not load content."))
      .finally(() => setLoading(false));
  }, []);

  const care = content.carePages.find(item => item.slug === selectedCare) ?? content.carePages[0];
  async function save(body: Record<string, unknown>) {
    setSaving(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not save changes.");
      const refreshed = await fetch("/api/admin/content", { cache: "no-store" });
      if (!refreshed.ok) throw new Error("Saved, but the content list could not refresh.");
      setContent(await refreshed.json());
      if (body.action === "page" && typeof body.slug === "string") setSelectedPage(body.slug);
      setNotice("Saved. Published changes are now visible on the site.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save changes."); }
    finally { setSaving(false); }
  }

  function editPage(value: ManagedPage) { setSelectedPage(value.slug); setPage(value); }
  function newPage() { setSelectedPage(""); setPage({ slug: "", kind: "blog", title: "", summary: "", body: "", published: false }); }

  return <section id="content" className="space-y-5" aria-labelledby="content-heading">
    <div><p className="text-xs font-bold uppercase tracking-[.16em] text-slate-500">Website</p><h2 id="content-heading" className="mt-1 text-xl font-semibold text-slate-900">Page content</h2><p className="mt-1 text-sm text-slate-500">Edit care page copy, or create a simple blog post or landing page.</p></div>
    {loading && <p className="text-sm text-slate-500">Loading content from Firebase…</p>}
    {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
    {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</p>}
    <div className="grid gap-5 xl:grid-cols-2">
      <form className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" onSubmit={event => { event.preventDefault(); if (care) void save({ action: "care", slug: care.slug, content: care }); }}>
        <h3 className="font-semibold text-slate-900">Care service pages</h3>
        <label className="block text-sm font-medium text-slate-700">Page<select className={inputClass} value={selectedCare} onChange={event => setSelectedCare(event.target.value)}>{content.carePages.map(item => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></label>
        {care && <>
          <label className="block text-sm font-medium text-slate-700">Introduction<textarea className={areaClass} value={care.intro} onChange={event => setContent(value => ({ ...value, carePages: value.carePages.map(item => item.slug === care.slug ? { ...item, intro: event.target.value } : item) }))} /></label>
          <label className="block text-sm font-medium text-slate-700">Approach heading<input className={inputClass} value={care.approachTitle} onChange={event => setContent(value => ({ ...value, carePages: value.carePages.map(item => item.slug === care.slug ? { ...item, approachTitle: event.target.value } : item) }))} /></label>
          <label className="block text-sm font-medium text-slate-700">Approach copy<textarea className={areaClass} value={care.approach} onChange={event => setContent(value => ({ ...value, carePages: value.carePages.map(item => item.slug === care.slug ? { ...item, approach: event.target.value } : item) }))} /></label>
          <label className="block text-sm font-medium text-slate-700">Everyday discussion points <span className="font-normal text-slate-500">(one per line)</span><textarea className={areaClass} value={care.dailyLife.join("\n")} onChange={event => setContent(value => ({ ...value, carePages: value.carePages.map(item => item.slug === care.slug ? { ...item, dailyLife: event.target.value.split("\n") } : item) }))} /></label>
          <button className="min-h-11 rounded-lg bg-sky-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60" disabled={saving || !care}>{saving ? "Saving…" : "Save care page"}</button>
        </>}
      </form>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-semibold text-slate-900">Blogs &amp; landing pages</h3><p className="mt-1 text-sm text-slate-500">Drafts stay private until published.</p></div><button className="min-h-10 rounded-lg border border-slate-300 px-3 text-sm font-semibold" onClick={newPage}>New page</button></div>
        {content.pages.length > 0 && <ul className="space-y-2">{content.pages.map(item => <li key={`${item.kind}-${item.slug}`} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2"><button className="min-w-0 text-left text-sm" onClick={() => editPage(item)}><strong>{item.title}</strong><span className="ml-2 text-slate-500">/{item.kind}/{item.slug}</span></button><span className="flex shrink-0 items-center gap-3"><span className="text-xs text-slate-500">{item.published ? "Published" : "Draft"}</span>{item.published && <a className="text-xs font-semibold text-sky-800 underline" href={`/${item.kind}/${item.slug}`} target="_blank" rel="noreferrer">View</a>}</span></li>)}</ul>}
        <form className="space-y-3 border-t border-slate-100 pt-4" onSubmit={event => { event.preventDefault(); void save({ action: "page", ...page, isEdit: Boolean(selectedPage) }); }}>
          <div className="grid gap-3 sm:grid-cols-2"><label className="block text-sm font-medium text-slate-700">Type<select className={inputClass} value={page.kind} disabled={Boolean(selectedPage)} onChange={event => setPage(value => ({ ...value, kind: event.target.value as ManagedPage["kind"] }))}><option value="blog">Blog</option><option value="landing">Landing page</option></select></label><label className="block text-sm font-medium text-slate-700">URL slug<input className={inputClass} pattern="[a-z0-9]+(-[a-z0-9]+)*" required disabled={Boolean(selectedPage)} placeholder="seasonal-update" value={page.slug} onChange={event => setPage(value => ({ ...value, slug: event.target.value }))} /></label></div>
          <label className="block text-sm font-medium text-slate-700">Title<input className={inputClass} required maxLength={180} value={page.title} onChange={event => setPage(value => ({ ...value, title: event.target.value }))} /></label>
          <label className="block text-sm font-medium text-slate-700">Summary<textarea className={areaClass} required maxLength={500} value={page.summary} onChange={event => setPage(value => ({ ...value, summary: event.target.value }))} /></label>
          <label className="block text-sm font-medium text-slate-700">Page copy<textarea className={`${areaClass} min-h-40`} required maxLength={12000} value={page.body} onChange={event => setPage(value => ({ ...value, body: event.target.value }))} /></label>
          <label className="flex min-h-10 items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={page.published} onChange={event => setPage(value => ({ ...value, published: event.target.checked }))} />Publish page</label>
          <button className="min-h-11 rounded-lg bg-sky-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60" disabled={saving}>{saving ? "Saving…" : selectedPage ? "Save page" : "Create page"}</button>
        </form>
      </div>
    </div>
  </section>;
}
