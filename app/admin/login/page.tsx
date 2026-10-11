import { LoginForm } from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4 py-12 text-charcoal">
      <section className="w-full max-w-md rounded-lg border border-charcoal/10 bg-sage p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-terracotta">Secure Admin</p>
        <h1 className="mt-3 text-3xl font-bold text-charcoal">Bank House Dashboard</h1>
        <p className="mt-3 text-charcoal/80">Use the admin password to manage enquiries and occupancy snapshots.</p>
        <LoginForm />
      </section>
    </main>
  );
}
