import { NextResponse } from "next/server";
import { getFirebaseAdmin, hasFirebaseAdminConfig } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

const enquiryTypes = ["visit", "care", "fees", "other"] as const;
const visitTimes = ["morning", "afternoon", "any", ""] as const;

export async function POST(request: Request) {
  if (!hasFirebaseAdminConfig()) return NextResponse.json({ error: "Enquiries are not available yet. Firebase setup is incomplete." }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter your details and try again." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const type = body.enquiryType;
  const visitDate = typeof body.visitDate === "string" ? body.visitDate : "";
  const visitTime = typeof body.visitTime === "string" ? body.visitTime : "";

  if (!name || name.length > 150 || !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a name and a valid email address." }, { status: 400 });
  }
  if (phone.length > 40 || message.length > 2000 || !enquiryTypes.includes(type as typeof enquiryTypes[number])) {
    return NextResponse.json({ error: "Check your enquiry details and try again." }, { status: 400 });
  }
  if (type !== "visit" && !message) return NextResponse.json({ error: "Add a short message so the team knows how to help." }, { status: 400 });
  if (type === "visit" && visitDate) {
    const parsedDate = new Date(`${visitDate}T00:00:00.000Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(visitDate) || Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== visitDate) {
      return NextResponse.json({ error: "Choose a valid preferred date." }, { status: 400 });
    }
  }
  if (!visitTimes.includes(visitTime as typeof visitTimes[number])) return NextResponse.json({ error: "Choose a valid preferred time." }, { status: 400 });

  try {
    const { db } = getFirebaseAdmin();
    const reference = await db.collection("enquiries").add({
      name,
      email,
      phone: phone || null,
      enquiryType: type,
      message,
      visitDate: type === "visit" ? visitDate || null : null,
      visitTime: type === "visit" ? visitTime || null : null,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return NextResponse.json({ ok: true, id: reference.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "We couldn’t save your enquiry. Please try again shortly." }, { status: 503 });
  }
}
