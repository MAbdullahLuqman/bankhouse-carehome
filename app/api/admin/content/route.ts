import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";
import { careTypes } from "@/lib/data";
import { getFirebaseAdmin } from "@/lib/firebaseAdmin";
import { getCarePageContent, type ManagedPage } from "@/lib/siteContent";

export const runtime = "nodejs";

function validText(value: unknown, limit: number) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= limit;
}

export async function GET(request: NextRequest) {
  if (!await isAdminRequest(request)) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  try {
    const { db } = getFirebaseAdmin();
    const [carePages, storedPages] = await Promise.all([
      Promise.all(careTypes.map(page => getCarePageContent(page.slug))),
      db.collection("siteContent").get()
    ]);
    const pages: ManagedPage[] = storedPages.docs.flatMap(document => {
      const data = document.data();
      return (["blog", "landing"].includes(data.kind) && typeof data.slug === "string" && typeof data.title === "string")
        ? [{ slug: data.slug, kind: data.kind, title: data.title, summary: data.summary ?? "", body: data.body ?? "", published: data.published === true } as ManagedPage]
        : [];
    });
    return NextResponse.json({ carePages, pages });
  } catch {
    return NextResponse.json({ error: "Could not load site content from Firestore." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  if (!await isAdminRequest(request)) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  let input: Record<string, unknown>;
  try { input = await request.json(); } catch { return NextResponse.json({ error: "Invalid content." }, { status: 400 }); }
  const { action, slug } = input;
  if (action === "care") {
    const base = careTypes.find(page => page.slug === slug);
    const content = input.content as Record<string, unknown> | undefined;
    if (!base || !content || !validText(content.intro, 3000) || !validText(content.approachTitle, 180) || !validText(content.approach, 4000) || !Array.isArray(content.dailyLife) || content.dailyLife.length > 12 || !content.dailyLife.every(item => validText(item, 240))) {
      return NextResponse.json({ error: "Check the care page fields and try again." }, { status: 400 });
    }
    const { db } = getFirebaseAdmin();
    await db.collection("siteContent").doc(`care-${slug}`).set({
      intro: (content.intro as string).trim(), approachTitle: (content.approachTitle as string).trim(),
      approach: (content.approach as string).trim(), dailyLife: (content.dailyLife as string[]).map(item => item.trim()),
      updatedAt: new Date()
    }, { merge: true });
    return NextResponse.json({ ok: true });
  }

  const kind = input.kind;
  if (input.action !== "page" || (kind !== "blog" && kind !== "landing") || typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 80 || !validText(input.title, 180) || !validText(input.summary, 500) || !validText(input.body, 12000) || typeof input.published !== "boolean" || typeof input.isEdit !== "boolean") {
    return NextResponse.json({ error: "Check the page fields and try again." }, { status: 400 });
  }
  const { db } = getFirebaseAdmin();
  const page: ManagedPage = { slug, kind, title: (input.title as string).trim(), summary: (input.summary as string).trim(), body: (input.body as string).trim(), published: input.published };
  const reference = db.collection("siteContent").doc(`${kind}-${slug}`);
  const existing = await reference.get();
  if (input.isEdit && (!existing.exists || existing.data()?.kind !== kind)) return NextResponse.json({ error: "Page not found." }, { status: 404 });
  if (!input.isEdit && existing.exists) return NextResponse.json({ error: "That page URL is already in use." }, { status: 409 });
  await reference.set({ ...page, updatedAt: new Date(), ...(existing.exists ? {} : { createdAt: new Date() }) }, { merge: true });
  return NextResponse.json({ ok: true });
}
