import { LoginForm } from "./LoginForm";
import { hasFirebaseAuthConfig } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4 py-12 text-charcoal">
      <section className="w-full max-w-md rounded-lg border border-charcoal/10 bg-sage p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-terracotta">Secure Admin</p>
        <h1 className="mt-3 text-3xl font-bold text-charcoal">Bank House Dashboard</h1>
        <p className="mt-3 text-charcoal/80">Sign in with an authorised Firebase account to manage care enquiries.</p>
        {!hasFirebaseAuthConfig() && <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">Firebase is not configured yet. Fill in the values in <code>.env.local</code> using the project’s Firebase settings, then restart the app.</p>}
        <LoginForm />
      </section>
    </main>
  );
}
