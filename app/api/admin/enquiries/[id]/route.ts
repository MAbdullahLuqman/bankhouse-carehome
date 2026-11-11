import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";
import { getFirebaseAdmin } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

const statuses = ["new", "contacted", "visit-booked", "closed"] as const;

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!await isAdminRequest(request)) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(params.id)) return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });

  let status: unknown;
  try {
    status = (await request.json()).status;
  } catch {
    return NextResponse.json({ error: "Choose a valid status." }, { status: 400 });
  }
  if (!statuses.includes(status as typeof statuses[number])) return NextResponse.json({ error: "Choose a valid status." }, { status: 400 });

  const { db } = getFirebaseAdmin();
  const enquiry = db.collection("enquiries").doc(params.id);
  const existing = await enquiry.get();
  if (!existing.exists) return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
  await enquiry.update({ status, updatedAt: new Date() });
  return NextResponse.json({ ok: true });
}
