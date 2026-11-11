"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { AdminEnquiry, EnquiryStatus } from "@/lib/adminTypes";

const statusLabels: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  "visit-booked": "Visit booked",
  closed: "Closed"
};

export function EnquiryManager({ enquiries }: { enquiries: AdminEnquiry[] }) {
  const [rows, setRows] = useState(enquiries);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState("");
  const [error, setError] = useState("");
  const visibleRows = useMemo(() => rows.filter(row => {
    const matchesStatus = filter === "all" || row.status === filter;
    const term = query.trim().toLowerCase();
    const matchesQuery = !term || [row.name, row.email, row.message, row.enquiryType].some(value => value.toLowerCase().includes(term));
    return matchesStatus && matchesQuery;
  }), [filter, query, rows]);

  async function updateStatus(id: string, status: EnquiryStatus) {
    setUpdating(id);
    setError("");
    try {
      const response = await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error("Could not update this enquiry. Refresh and try again.");
      setRows(current => current.map(row => row.id === id ? { ...row, status } : row));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not update this enquiry.");
    } finally {
      setUpdating("");
    }
  }

  return <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div><p className="text-xs font-bold uppercase tracking-[.16em] text-slate-500">Inbox</p><h2 className="mt-1 text-xl font-semibold text-slate-900">Recent enquiries</h2></div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative"><span className="sr-only">Search enquiries</span><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" /><input className="min-h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm sm:w-56" placeholder="Search name or email" value={query} onChange={event => setQuery(event.target.value)} /></label>
        <label><span className="sr-only">Filter by status</span><select className="min-h-10 w-full rounded-lg border border-slate-200 px-3 text-sm sm:w-40" value={filter} onChange={event => setFilter(event.target.value)}><option value="all">All statuses</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      </div>
    </div>
    {error && <p className="border-b border-red-100 bg-red-50 px-5 py-3 text-sm text-red-700" role="alert">{error}</p>}
    {visibleRows.length ? <div className="divide-y divide-slate-100">
      {visibleRows.map(row => <article key={row.id} className="grid gap-4 p-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_170px] lg:items-center">
        <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold text-slate-900">{row.name}</h3><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600">{row.enquiryType === "visit" ? "Visit request" : row.enquiryType === "other" ? "General question" : `Discuss ${row.enquiryType}`}</span></div><a className="mt-1 inline-block text-sm text-sky-700 hover:underline" href={`mailto:${row.email}`}>{row.email}</a>{row.phone && <a className="ml-3 inline-block text-sm text-slate-500" href={`tel:${row.phone}`}>{row.phone}</a>}<p className="mt-2 text-xs text-slate-500">{row.createdAt ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(row.createdAt)) : "Just received"}</p></div>
        <div className="min-w-0 text-sm text-slate-600">{row.visitDate && <p className="font-medium text-slate-800">Preferred: {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${row.visitDate}T00:00:00Z`))}{row.visitTime ? ` · ${row.visitTime}` : ""}</p>}{row.message ? <p className="mt-1 line-clamp-3 whitespace-pre-wrap">{row.message}</p> : <p className="mt-1 text-slate-400">No message added.</p>}</div>
        <label className="grid gap-1 text-xs font-semibold text-slate-500">Status<select aria-label={`Status for ${row.name}`} className="min-h-10 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-800" value={row.status} disabled={updating === row.id} onChange={event => updateStatus(row.id, event.target.value as EnquiryStatus)}>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      </article>)}
    </div> : <p className="px-5 py-12 text-center text-sm text-slate-500">{rows.length ? "No enquiries match those filters." : "New visit requests and questions will appear here."}</p>}
    <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">Showing the latest {rows.length} of up to 100 enquiries.</p>
  </div>;
}
