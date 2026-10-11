import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="public-site"><a className="skip-link" href="#main-content">Skip to main content</a><Header /><main id="main-content" tabIndex={-1}>{children}</main><Footer /></div>;
}
