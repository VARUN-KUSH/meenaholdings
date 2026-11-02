"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TLink from "./TLink";
import { Arrow, Logo } from "./Icons";

export const links = [
  { href: "/", label: "Home" },
  { href: "/apps", label: "Apps" },
  { href: "/studio", label: "Studio" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > last && y > 300);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className={`nav${hidden && !open ? " is-hidden" : ""}${solid && !open ? " is-solid" : ""}`}>
        <TLink href="/" className="logo" aria-label="meenaholdings home">
          <span className="logo-mark"><Logo /></span>
          meenaholdings
        </TLink>
        <nav className="nav-links" aria-label="Primary">
          {links.slice(1).map((l) => (
            <TLink key={l.href} href={l.href} className={pathname === l.href ? "is-active" : ""}>
              {l.label}
            </TLink>
          ))}
        </nav>
        <TLink href="/contact" className="btn btn-primary" data-magnetic>
          <span>Let&apos;s talk</span>
          <span><Arrow /></span>
        </TLink>
        <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          <i /><i />
        </button>
      </header>
      <div className="mobile-menu" aria-hidden={!open}>
        <div>
          {links.map((l) => (
            <TLink key={l.href} href={l.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              <span>{l.label}</span>
            </TLink>
          ))}
        </div>
        <div className="mm-foot">
          <a href="mailto:hello@meenaholdings.com" tabIndex={open ? 0 : -1}>hello@meenaholdings.com</a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </>
  );
}
