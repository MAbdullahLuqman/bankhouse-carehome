"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    setLoading(false);
    if (!response.ok) {
      setError("Password not recognised.");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-6 grid gap-4">
      <label className="grid gap-2 text-sm font-semibold text-charcoal">
        Password
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          className="min-h-12 rounded-md border border-charcoal/10 bg-canvas px-4 text-base text-charcoal"
          autoComplete="current-password"
          required
        />
      </label>
      {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
      <button className="min-h-12 rounded-md bg-terracotta px-5 py-3 font-semibold text-white transition duration-300 ease-out hover:scale-105 hover:bg-terracotta/90 hover:brightness-90 hover:shadow-lg" disabled={loading}>
        {loading ? "Checking..." : "Sign In"}
      </button>
      <p className="text-sm text-charcoal/80">Mock password: ChangeMeBankHouse!</p>
    </form>
  );
}
