import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/lib/data";
export const metadata: Metadata = { title: legalPages.terms.title };
export default function Page() { return <LegalPage name="terms" />; }
