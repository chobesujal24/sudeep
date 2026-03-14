"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    onScroll();
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

  // Transparent on hero (home + not scrolled), white otherwise
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: "76px",
          background: isTransparent ? "transparent" : "#FFFFFF",
          boxShadow: isTransparent ? "none" : "0 1px 20px rgba(0,0,0,0.06)",
          borderBottom: isTransparent ? "1px solid transparent" : "1px solid #F1F5F9",
          backdropFilter: isTransparent ? "none" : "blur(20px)",
          WebkitBackdropFilter: isTransparent ? "none" : "blur(20px)",
          transition: "background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
        }}
      >
        <div
          style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 32px" }}
          className="flex items-center justify-between h-full"
        >
          {/* Logo — Left */}
          <Link href="/" className="flex items-center no-underline group shrink-0">
            <img
              src="/logo.png"
              alt="Sudeep Engineers"
              className="h-[90px] w-auto object-contain transition-transform group-hover:scale-105"
              style={{
                filter: isTransparent ? "brightness(0) invert(1)" : "none",
                transition: "filter 0.4s ease",
              }}
            />
          </Link>

          {/* Center Nav Links — Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isTransparent ? "nav-link-transparent" : ""} ${
                  pathname === link.href ? "nav-link-active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — Contact + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold transition-all no-underline"
              style={{
                background: isTransparent ? "rgba(255,255,255,0.12)" : "#2563EB",
                color: isTransparent ? "#FFFFFF" : "#FFFFFF",
                border: isTransparent ? "1px solid rgba(255,255,255,0.3)" : "1px solid #2563EB",
                backdropFilter: isTransparent ? "blur(8px)" : "none",
                transition: "all 0.4s ease",
              }}
              onMouseOver={(e) => {
                if (!isTransparent) {
                  e.currentTarget.style.background = "#1D4ED8";
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseOut={(e) => {
                if (!isTransparent) {
                  e.currentTarget.style.background = "#2563EB";
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
            >
              Contact
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={toggleMobile}
              className="lg:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <span
                className="block w-6 h-0.5 rounded transition-all"
                style={{
                  background: isTransparent ? "#FFFFFF" : "#1E293B",
                  transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none",
                }}
              />
              <span
                className="block w-6 h-0.5 rounded transition-all"
                style={{
                  background: isTransparent ? "#FFFFFF" : "#1E293B",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-0.5 rounded transition-all"
                style={{
                  background: isTransparent ? "#FFFFFF" : "#1E293B",
                  transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-[300px] h-full bg-white z-50 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          boxShadow: "-5px 0 30px rgba(0,0,0,0.15)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="pt-24 px-6">
          {[{ href: "/", label: "Home" }, ...navLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className={`block px-4 py-3.5 rounded-xl text-base font-medium transition-all no-underline mb-1 ${
                pathname === link.href
                  ? "text-[#2563EB] bg-blue-50"
                  : "text-[#1E293B] hover:text-[#2563EB] hover:bg-[#F8FAFC]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMobile}
            className="mt-4 block w-full text-center px-5 py-3.5 rounded-full bg-[#2563EB] text-white font-semibold no-underline hover:bg-[#1D4ED8] transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
