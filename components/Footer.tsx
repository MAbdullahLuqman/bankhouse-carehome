import { Flower2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { careTypes, navLinks, siteDetails } from "@/lib/data";

export function Footer() {
  return (
    <footer>
      <div className="footer-bottom"><div className="container">
        <div className="footer-grid">
          <div><Link href="/" className="brand"><Flower2 aria-hidden="true" /><span>Bank House<small>CARE HOME</small></span></Link><p>{siteDetails.address}</p><p>{siteDetails.owner}<br />Manager: {siteDetails.manager}</p><Link className="text-link" href="/contact">Contact &amp; location <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
          <div><nav aria-label="Footer navigation">{navLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/reviews">Family reviews</Link></nav></div>
          <div><nav aria-label="Care guides">{careTypes.map(({ slug, title }) => <Link key={slug} href={`/care-services/${slug}`}>{title}</Link>)}</nav></div>
        </div>
        <div className="footer-legal"><p>© {new Date().getFullYear()} {siteDetails.name}.</p><nav aria-label="Policies"><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link><Link href="/terms">Terms</Link><Link href="/accessibility">Accessibility</Link><Link href="/admin/login">Admin</Link></nav></div>
      </div></div>
    </footer>
  );
}
