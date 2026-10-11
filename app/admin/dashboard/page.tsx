import { CalendarCheck, LogOut } from "lucide-react";
import { enquiries, stats } from "@/lib/data";
import { LogoutButton } from "./LogoutButton";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-canvas text-charcoal">
      <header className="border-b border-charcoal/10 bg-canvas px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-terracotta">Admin Dashboard</p>
            <h1 className="mt-1 text-3xl font-bold text-charcoal">Bank House Operations</h1>
          </div>
          <LogoutButton>
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </LogoutButton>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-lg border border-charcoal/10 bg-sage p-5">
              <p className="text-sm font-semibold text-charcoal/80">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-charcoal">{stat.value}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-charcoal/10 bg-sage">
          <div className="flex items-center gap-3 border-b border-charcoal/10 p-5">
            <CalendarCheck className="h-6 w-6 text-terracotta" aria-hidden="true" />
            <h2 className="text-xl font-bold text-charcoal">Recent Enquiries</h2>
          </div>
          <div className="divide-y divide-charcoal/10">
            {enquiries.length === 0 ? <p className="p-5 text-charcoal/80">No enquiry records are available in this read-only dashboard.</p> : enquiries.map((enquiry) => (
              <article key={enquiry.name} className="grid gap-2 p-5 sm:grid-cols-4 sm:items-center">
                <p className="font-bold text-charcoal">{enquiry.name}</p>
                <p className="text-charcoal/80">{enquiry.need}</p>
                <p className="font-semibold text-terracotta">{enquiry.status}</p>
                <p className="text-sm text-charcoal/80 sm:text-right">{enquiry.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
