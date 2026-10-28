"use client";
import Link from "next/link";
import ReadingProgress from "./reading-progress";
import { site } from "@/config/site";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Profile", href: "/#about" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Selected work", href: "/projects" },
  { label: "Field notes", href: "/blog" },
];
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link href="/" className="wordmark">
          {site.brand.split(".")[0]}
          <span className="brand-dot">.it</span>
        </Link>
        <nav aria-label="Primary navigation" className="desktop-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="nav-contact" href="/#contact">
          Let’s talk <ArrowUpRight size={15} />
        </Link>
        <button
          id="menu-toggle"
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <ReadingProgress />
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="mobile-nav"
        hidden={!open}
      >
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
            <ArrowUpRight size={16} />
          </Link>
        ))}
        <Link href="/#contact" onClick={() => setOpen(false)}>
          Get in touch <ArrowUpRight size={16} />
        </Link>
      </nav>
    </header>
  );
}
