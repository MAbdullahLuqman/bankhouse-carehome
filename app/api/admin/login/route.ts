import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, isAllowedAdminEmail } from "@/lib/adminAuth";
import { getFirebaseAdmin, hasFirebaseAuthConfig, isFirebaseEmulator } from "@/lib/firebaseAdmin";

const SESSION_AGE = 5 * 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  let credentials: { email?: unknown; password?: unknown };
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
  }
  if (typeof credentials.email !== "string" || credentials.email.length > 254 || typeof credentials.password !== "string" || credentials.password.length > 256) {
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
  }
  if (!hasFirebaseAuthConfig()) return NextResponse.json({ error: "Firebase admin sign-in is not configured. Follow FIREBASE_SETUP.md." }, { status: 503 });

  try {
    const authHost = process.env.FIREBASE_AUTH_EMULATOR_HOST || "127.0.0.1:9099";
    const authBase = isFirebaseEmulator() ? `http://${authHost}/identitytoolkit.googleapis.com` : "https://identitytoolkit.googleapis.com";
    const apiKey = process.env.FIREBASE_API_KEY || "demo-key";
    const signIn = await fetch(`${authBase}/v1/accounts:signInWithPassword?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: credentials.email, password: credentials.password, returnSecureToken: true }),
      cache: "no-store"
    });
    const result = await signIn.json();
    if (!signIn.ok || typeof result.idToken !== "string") return NextResponse.json({ error: "Email or password not recognised." }, { status: 401 });
    if (!isAllowedAdminEmail(result.email)) return NextResponse.json({ error: "This account is not authorised for Bank House admin." }, { status: 403 });

    const { auth } = getFirebaseAdmin();
    const sessionCookie = await auth.createSessionCookie(result.idToken, { expiresIn: SESSION_AGE });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_AGE / 1000
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to sign in right now. Check Firebase setup and try again." }, { status: 503 });
  }
}
