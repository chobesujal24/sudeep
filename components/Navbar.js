"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/certifications", label: "Certifications" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  const toggleMobile = () => {
    setMobileOpen((v) => !v);
    document.body.style.overflow = mobileOpen ? "" : "hidden";
  };

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[color:var(--color-bg-secondary)] border-b border-[color:var(--color-border)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-[color:var(--color-bg-secondary)] border-b border-transparent"
        }`}
        style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 no-underline group -ml-2">
            <img src="/logo.png" alt="Sudeep Lights" className="h-[42px] w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all no-underline ${
                  pathname === link.href
                    ? "text-blue-700 bg-blue-50"
                    : "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-3 px-5 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)] no-underline"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMobile}
            className="lg:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-[color:var(--color-foreground)] rounded transition-all ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[color:var(--color-foreground)] rounded transition-all ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[color:var(--color-foreground)] rounded transition-all ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-[300px] h-full bg-[color:var(--color-bg-secondary)] z-50 transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ boxShadow: "-5px 0 30px rgba(0,0,0,0.5)" }}
      >
        <div className="pt-20 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className={`block px-4 py-3 rounded-md text-base font-medium transition-all no-underline mb-1 ${
                pathname === link.href
                  ? "text-blue-700 bg-blue-50"
                  : "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMobile}
            className="mt-4 block w-full text-center px-5 py-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold no-underline"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </>
  );
}
