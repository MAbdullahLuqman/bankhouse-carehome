import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ActionGrid() {
  return <nav className="container quick-actions" aria-label="Next steps">{[["Explore our care", "/care-services"], ["Understand the fees", "/fees"], ["Plan a visit", "/contact#enquiry"]].map(([label, href]) => <Link href={href} key={href}>{label}<ArrowUpRight size={20} aria-hidden="true" /></Link>)}</nav>;
}
