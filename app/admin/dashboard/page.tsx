import { redirect } from "next/navigation";
import { CalendarDays, CheckCheck, ClipboardList, Inbox, LayoutDashboard, FileText } from "lucide-react";
import { getFirebaseAdmin } from "@/lib/firebaseAdmin";
import { requireAdmin } from "@/lib/adminAuth";
import type { AdminEnquiry, EnquiryStatus } from "@/lib/adminTypes";
import { LogoutButton } from "./LogoutButton";
import { EnquiryManager } from "./EnquiryManager";
import { ContentManager } from "./ContentManager";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();
  const enquiries: AdminEnquiry[] = [];
  let loadError = "";
  try {
    const { db } = getFirebaseAdmin();
    const snapshot = await db.collection("enquiries").orderBy("createdAt", "desc").limit(100).get();
    for (const document of snapshot.docs) {
      const data = document.data();
      const type = ["visit", "care", "fees", "other"].includes(data.enquiryType) ? data.enquiryType : "other";
      const status = ["new", "contacted", "visit-booked", "closed"].includes(data.status) ? data.status : "new";
      enquiries.push({
        id: document.id,
        name: typeof data.name === "string" ? data.name : "Unknown",
        email: typeof data.email === "string" ? data.email : "",
        phone: typeof data.phone === "string" ? data.phone : null,
        enquiryType: type,
        message: typeof data.message === "string" ? data.message : "",
        visitDate: typeof data.visitDate === "string" ? data.visitDate : null,
        visitTime: typeof data.visitTime === "string" ? data.visitTime : null,
        status: status as EnquiryStatus,
        createdAt: data.createdAt?.toDate?.().toISOString() ?? null
      });
    }
  } catch {
    loadError = "Could not load enquiries. Check that Firestore is enabled and the service account has access.";
  }

  const fresh = enquiries.filter(enquiry => enquiry.status === "new").length;
  const visits = enquiries.filter(enquiry => enquiry.enquiryType === "visit").length;
  const booked = enquiries.filter(enquiry => enquiry.status === "visit-booked").length;
  const cards = [
    { label: "Latest enquiries", value: enquiries.length, icon: Inbox, note: "Up to 100 recent" },
    { label: "Needs a response", value: fresh, icon: ClipboardList, note: "Marked new" },
    { label: "Visit requests", value: visits, icon: CalendarDays, note: "In recent enquiries" },
    { label: "Visits booked", value: booked, icon: CheckCheck, note: "Marked by your team" }
  ];

  if (!admin.email) redirect("/admin/login");

  return <main className="min-h-screen bg-slate-50 text-slate-900 lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
    <aside className="border-b border-slate-200 bg-white p-5 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
      <a href="/" className="flex items-center gap-3" aria-label="Bank House public website">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-900 text-sm font-bold text-white">BH</span>
        <span><strong className="block text-sm text-slate-900">Bank House</strong><small className="text-xs text-slate-500">Care Home Admin</small></span>
      </a>
      <nav className="mt-7 flex gap-2 lg:grid" aria-label="Admin navigation">
        <a href="#overview" className="flex min-h-10 items-center gap-3 rounded-lg bg-sky-50 px-3 text-sm font-semibold text-sky-900"><LayoutDashboard className="h-4 w-4" aria-hidden="true" />Overview</a>
        <a href="#content" className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-50"><FileText className="h-4 w-4" aria-hidden="true" />Pages</a>
        <a href="#enquiries" className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-50"><Inbox className="h-4 w-4" aria-hidden="true" />Enquiries</a>
      </nav>
      <div className="mt-8 hidden rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500 lg:block">Your enquiry inbox is private to authorised Bank House administrators.</div>
    </aside>

    <div id="overview" className="min-w-0">
      <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div><p className="text-xs font-bold uppercase tracking-[.16em] text-slate-500">Operations</p><h1 className="mt-1 text-2xl font-semibold tracking-tight">Good to see you.</h1><p className="mt-1 text-sm text-slate-500">Signed in as {admin.email}</p></div>
        <LogoutButton><span>Sign out</span></LogoutButton>
      </header>
      <div className="mx-auto max-w-7xl space-y-7 px-5 py-7 sm:px-8 sm:py-9">
        <section aria-label="Enquiry overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ label, value, icon: Icon, note }) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-500">{label}</span><span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-50 text-sky-900"><Icon className="h-4 w-4" aria-hidden="true" /></span></div>
            <p className="mt-5 text-3xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-slate-500">{note}</p>
          </article>)}
        </section>
        {loadError && <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="alert">{loadError}</p>}
        <ContentManager />
        <section id="enquiries" aria-label="Enquiries"><EnquiryManager enquiries={enquiries} /></section>
      </div>
    </div>
  </main>;
}
