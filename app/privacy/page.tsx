import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/lib/data";
export const metadata: Metadata = { title: legalPages.privacy.title };
export default function Page() { return <LegalPage name="privacy" />; }
