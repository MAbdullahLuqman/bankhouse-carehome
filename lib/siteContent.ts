import { careTypes } from "@/lib/data";
import { getFirebaseAdmin, hasFirebaseAdminConfig } from "@/lib/firebaseAdmin";

export type CarePageContent = Pick<typeof careTypes[number], "slug" | "title" | "intro" | "approachTitle" | "approach" | "dailyLife" | "questions">;
export type ManagedPage = { slug: string; kind: "blog" | "landing"; title: string; summary: string; body: string; published: boolean };

export async function getCarePageContent(slug: string): Promise<CarePageContent | null> {
  const base = careTypes.find(page => page.slug === slug);
  if (!base) return null;
  if (!hasFirebaseAdminConfig()) return base;
  try {
    const { db } = getFirebaseAdmin();
    const snapshot = await db.collection("siteContent").doc(`care-${slug}`).get();
    if (!snapshot.exists) return base;
    const saved = snapshot.data()!;
    return {
      ...base,
      intro: typeof saved.intro === "string" ? saved.intro : base.intro,
      approachTitle: typeof saved.approachTitle === "string" ? saved.approachTitle : base.approachTitle,
      approach: typeof saved.approach === "string" ? saved.approach : base.approach,
      dailyLife: Array.isArray(saved.dailyLife) ? saved.dailyLife.filter((item: unknown): item is string => typeof item === "string") : base.dailyLife,
      questions: Array.isArray(saved.questions) ? saved.questions.filter((item: unknown) => Array.isArray(item) && item.length === 2 && item.every(value => typeof value === "string")) : base.questions
    };
  } catch {
    return base;
  }
}

export async function getManagedPage(kind: "blog" | "landing", slug: string): Promise<ManagedPage | null> {
  if (!hasFirebaseAdminConfig()) return null;
  try {
    const { db } = getFirebaseAdmin();
    const snapshot = await db.collection("siteContent").doc(`${kind}-${slug}`).get();
    if (!snapshot.exists) return null;
    const page = snapshot.data()!;
    if (page.kind !== kind || page.slug !== slug || page.published !== true || typeof page.title !== "string" || typeof page.summary !== "string" || typeof page.body !== "string") return null;
    return { slug, kind, title: page.title, summary: page.summary, body: page.body, published: true } as ManagedPage;
  } catch {
    return null;
  }
}

export async function getPublishedPages(kind: "blog" | "landing"): Promise<ManagedPage[]> {
  if (!hasFirebaseAdminConfig()) return [];
  try {
    const { db } = getFirebaseAdmin();
    const snapshot = await db.collection("siteContent").where("kind", "==", kind).where("published", "==", true).get();
    return snapshot.docs.flatMap(document => {
      const data = document.data();
      return typeof data.slug === "string" && typeof data.title === "string" && typeof data.summary === "string" && typeof data.body === "string"
        ? [{ slug: data.slug, kind, title: data.title, summary: data.summary, body: data.body, published: true }]
        : [];
    });
  } catch {
    return [];
  }
}
