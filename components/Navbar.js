"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { Icons } from "./Icons";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/product", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
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

  // Transparent on hero (home + not scrolled), adaptive otherwise
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: "76px",
          background: isTransparent 
            ? "transparent" 
            : "var(--color-background)",
          boxShadow: isTransparent ? "none" : "0 1px 20px rgba(0,0,0,0.06)",
          borderBottom: isTransparent 
            ? "1px solid transparent" 
            : "1px solid var(--color-border)",
          backdropFilter: isTransparent ? "none" : "blur(20px)",
          WebkitBackdropFilter: isTransparent ? "none" : "blur(20px)",
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
              className={`h-[90px] w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                isTransparent || theme === 'dark' ? "brightness-0 invert" : ""
              }`}
            />
          </Link>

          {/* Center Nav Links — Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isTransparent ? "nav-link-transparent" : "text-[color:var(--color-foreground)] hover:bg-[color:var(--color-bg-card-hover)]"} ${
                  pathname === link.href ? "nav-link-active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — Contact + Theme Toggle + Mobile Toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold transition-all no-underline"
              style={{
                background: isTransparent ? "rgba(255,255,255,0.12)" : "var(--color-primary)",
                color: "#FFFFFF",
                border: isTransparent ? "1px solid rgba(255,255,255,0.3)" : "1px solid var(--color-primary)",
                backdropFilter: isTransparent ? "blur(8px)" : "none",
              }}
            >
              Contact
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
                isTransparent 
                  ? "bg-white/10 text-white hover:bg-white/20 border border-white/20" 
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Icons.Moon className="w-5 h-5 text-indigo-600" />
              ) : (
                <Icons.Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={toggleMobile}
              className="lg:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <span
                className="block w-6 h-0.5 rounded transition-all"
                style={{
                  background: isTransparent || theme === 'dark' ? "#FFFFFF" : "#1E293B",
                  transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none",
                }}
              />
              <span
                className="block w-6 h-0.5 rounded transition-all"
                style={{
                  background: isTransparent || theme === 'dark' ? "#FFFFFF" : "#1E293B",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-0.5 rounded transition-all"
                style={{
                  background: isTransparent || theme === 'dark' ? "#FFFFFF" : "#1E293B",
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
        className={`fixed top-0 right-0 w-[300px] h-full bg-white dark:bg-slate-900 z-50 lg:hidden ${
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
                  ? "text-[#1E40AF] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-[#1E293B] dark:text-slate-300 hover:text-[#1E40AF] dark:hover:text-blue-400 hover:bg-[#F8FAFC] dark:hover:bg-slate-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMobile}
            className="mt-4 block w-full text-center px-5 py-3.5 rounded-full bg-[#1E40AF] dark:bg-blue-600 text-white font-semibold no-underline hover:bg-[#1D4ED8] dark:hover:bg-blue-500 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
