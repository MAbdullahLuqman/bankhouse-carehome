"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Flower2, MapPin, Menu } from "lucide-react";
import { useRef } from "react";
import { careTypes, siteDetails } from "@/lib/data";
import { Button } from "./Button";

const careLinks = ["residential", "nursing", "dementia", "respite", "physical-disability", "visual-hearing-impairment"]
  .map(slug => careTypes.find(care => care.slug === slug)!)
  .map(care => ({ ...care, title: care.slug === "residential" ? "Residential care" : care.title }));

export function Header() {
  const pathname = usePathname();
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const closeMobileMenu = () => { if (mobileMenu.current) mobileMenu.current.open = false; };
  const isCarePage = pathname.startsWith("/care-services");
  const renderCareLinks = () => careLinks.map(({ slug, title }) => <Link key={slug} href={`/care-services/${slug}`} aria-current={pathname === `/care-services/${slug}` ? "page" : undefined} onClick={closeMobileMenu}>{title}</Link>);

  return (
    <header className="site-header">
      <div className="header-top"><div className="container header-top-inner">
        <span>Thoughtful care. A reassuring next step.</span>
        <Link href="/contact"><MapPin size={15} aria-hidden="true" />{siteDetails.address}</Link>
      </div></div>
      <div className="container header-main">
        <Link href="/" className="brand" aria-label="Bank House Care Home — home"><Flower2 aria-hidden="true" /><span>Bank House<small>CARE HOME</small></span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/facilities" aria-current={pathname === "/facilities" ? "page" : undefined}>Our homes</Link>
          <div className={`care-dropdown${isCarePage ? " is-active" : ""}`}>
            <Link id="care-dropdown-trigger" className="care-dropdown-trigger" href="/care-services" aria-current={isCarePage ? "page" : undefined}>Our care<ChevronDown size={17} aria-hidden="true" /></Link>
            <div className="care-dropdown-panel" aria-labelledby="care-dropdown-trigger">
              <Link href="/care-services">Explore all care</Link>
              {renderCareLinks()}
            </div>
          </div>
          <Link href="/fees" aria-current={pathname === "/fees" ? "page" : undefined}>Help &amp; Advice</Link>
          <Link href="/about-us" aria-current={pathname === "/about-us" ? "page" : undefined}>About us</Link>
        </nav>
        <div className="header-controls">
          <Button href="/contact#enquiry">Book a Visit</Button>
          <details ref={mobileMenu} className="mobile-menu" onKeyDown={event => {
            if (event.key === "Escape" && mobileMenu.current?.open) { closeMobileMenu(); mobileMenu.current.querySelector("summary")?.focus(); }
          }}>
            <summary aria-label="Navigation menu"><Menu size={22} aria-hidden="true" /><span>Menu</span></summary>
            <nav aria-label="Mobile navigation">
              <Link href="/facilities" onClick={closeMobileMenu}>Our homes</Link>
              <span className="mobile-menu-heading">Our care</span>
              <Link href="/care-services" onClick={closeMobileMenu}>Explore all care</Link>
              {renderCareLinks()}
              <Link href="/fees" onClick={closeMobileMenu}>Help &amp; Advice</Link>
              <Link href="/about-us" onClick={closeMobileMenu}>About us</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
