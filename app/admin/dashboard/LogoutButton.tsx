"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton({ children }: { children: ReactNode }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button onClick={logout} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-charcoal/10 px-4 py-2 font-semibold text-charcoal hover:bg-sage">
      {children}
    </button>
  );
}
