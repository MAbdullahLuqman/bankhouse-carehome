import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { getFirebaseAdmin, hasFirebaseAdminConfig } from "@/lib/firebaseAdmin";

export const ADMIN_SESSION_COOKIE = "bankhouse_session";

export function isAllowedAdminEmail(email?: string | null) {
  return Boolean(email && process.env.FIREBASE_ADMIN_EMAILS?.split(",").some(value => value.trim().toLowerCase() === email.toLowerCase()));
}

export async function verifyAdminToken(token?: string) {
  if (!token || !hasFirebaseAdminConfig()) return null;
  try {
    const { auth } = getFirebaseAdmin();
    const session = await auth.verifySessionCookie(token, true);
    return isAllowedAdminEmail(session.email) ? session : null;
  } catch {
    return null;
  }
}

export async function isAdminRequest(request: NextRequest) {
  return verifyAdminToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function requireAdmin() {
  const session = await verifyAdminToken(cookies().get(ADMIN_SESSION_COOKIE)?.value);
  if (!session) redirect("/admin/login");
  return session;
}
