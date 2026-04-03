"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Building2, BookOpen, Newspaper } from "lucide-react";

const navLinks = [
  { href: "/industries", label: "Industries" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dbCategories, setDbCategories] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('*').order('sequence', { ascending: true });
      if (data) setDbCategories(data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        className={`sticky top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_2px_10px_rgba(0,0,0,0.04)]" : ""
        }`}
        style={{ height: "80px" }}
      >
        <div
          style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 32px" }}
          className="flex items-center justify-between h-full"
        >
          {/* Logo — Left */}
          <Link href="/" className="flex items-center no-underline shrink-0">
            <img
              src="/logo.png"
              alt="Sudeep Engineers"
              className="h-[115px] w-auto object-contain logo-green"
            />
          </Link>

          {/* Center Nav Links — Desktop */}
          <div className="hidden lg:flex items-center gap-8 h-full">
            <Link
              href="/"
              className={`text-[15px] font-semibold tracking-wide transition-colors h-full flex items-center border-b-2 ${pathname === "/" ? "text-green-700 border-green-600" : "text-slate-700 hover:text-green-700 border-transparent hover:border-green-600"}`}
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div className="relative group h-full flex items-center">
              <Link
                href="/about"
                className={`text-[15px] font-semibold tracking-wide transition-colors h-full flex items-center gap-1 border-b-2 ${pathname.startsWith("/about") || pathname.startsWith("/blog") || pathname.startsWith("/news") ? "text-green-700 border-green-600" : "text-slate-700 hover:text-green-700 border-transparent hover:border-green-600"}`}
              >
                About Us <svg className="w-4 h-4 rotate-180 group-hover:rotate-0 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              </Link>
              
              {/* Dropdown */}
              <div className="absolute top-[80px] left-0 w-[320px] bg-white border border-slate-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0 p-3 flex flex-col gap-1">
                <Link href="/about" className="group/item flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors rounded-md border border-transparent hover:border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex shrink-0 items-center justify-center">
                    <Building2 size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[0.85rem] font-bold text-slate-900 uppercase tracking-tight group-hover/item:text-green-700 transition-colors">Company Profile</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Heritage, vision, and team.</p>
                  </div>
                </Link>
                <Link href="/blog" className="group/item flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors rounded-md border border-transparent hover:border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex shrink-0 items-center justify-center">
                    <BookOpen size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[0.85rem] font-bold text-slate-900 uppercase tracking-tight group-hover/item:text-green-700 transition-colors">Blog</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Insights and technical articles.</p>
                  </div>
                </Link>
                <Link href="/news" className="group/item flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors rounded-md border border-transparent hover:border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex shrink-0 items-center justify-center">
                    <Newspaper size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[0.85rem] font-bold text-slate-900 uppercase tracking-tight group-hover/item:text-green-700 transition-colors">Projects</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Discover ongoing and completed projects.</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Products Dropdown */}
            <div className="relative group h-full flex items-center">
              <Link
                href="/product"
                className={`text-[15px] font-semibold tracking-wide transition-colors h-full flex items-center gap-1 border-b-2 ${pathname.startsWith("/product") ? "text-green-700 border-green-600" : "text-slate-700 hover:text-green-700 border-transparent hover:border-green-600"}`}
              >
                Products <svg className="w-4 h-4 rotate-180 group-hover:rotate-0 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              </Link>
              
              {/* Mega-Menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1000px] bg-white border border-slate-200 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 p-6">
                <div className="flex justify-between items-end mb-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Industrial Products</h3>
                    <p className="text-sm text-slate-500 mt-1">Explore our complete range of certified manufacturing solutions.</p>
                  </div>
                  <Link href="/product" className="text-sm font-bold text-green-700 hover:text-green-800 uppercase tracking-wider flex items-center gap-1">
                    View Complete Catalog ➔
                  </Link>
                </div>
                <div className="max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid gap-4 grid-cols-4 lg:grid-cols-5">
                    {dbCategories.map((cat, idx) => (
                      <Link key={cat.id || idx} href={`/product/${cat.slug}`} className="group/item flex flex-col gap-2">
                        <div className="relative w-full aspect-[4/3] bg-white border border-slate-100 overflow-hidden flex items-center justify-center p-3 group-hover/item:border-green-200 group-hover/item:shadow-sm transition-all rounded-md">
                          <img src={cat.image || "/placeholder-image.jpg"} alt={cat.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                        </div>
                        <div>
                          <h4 className="text-[0.75rem] font-bold text-slate-900 group-hover/item:text-green-700 transition-colors uppercase tracking-tight leading-tight">{cat.name}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed line-clamp-1">{cat.description || "View details and specifications"}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] font-semibold tracking-wide transition-colors h-full flex items-center border-b-2 ${pathname === link.href ? "text-green-700 border-green-600" : "text-slate-700 hover:text-green-700 border-transparent hover:border-green-600"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — Contact & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3 text-slate-600">
              <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Call Us</span>
                <a href="tel:+919922996236" className="text-sm font-bold text-slate-800 hover:text-green-600 transition-colors">+91 9922996236</a>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={toggleMobile}
              className="lg:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <span
                className="block w-6 h-0.5 rounded transition-all bg-slate-800"
                style={{
                  transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none",
                }}
              />
              <span
                className="block w-6 h-0.5 rounded transition-all bg-slate-800"
                style={{
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-0.5 rounded transition-all bg-slate-800"
                style={{
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
        className={`fixed top-0 right-0 w-[300px] h-full bg-white z-50 lg:hidden shadow-2xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="pt-24 px-6 overflow-y-auto h-full pb-20">
          {[{ href: "/", label: "Home" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className={`block px-4 py-3.5 border-b border-slate-100 text-base font-semibold transition-all ${pathname === link.href ? "text-green-700 bg-green-50/50" : "text-slate-700"}`}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-6 mb-2 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">About Us</div>
          {[ { href: "/about", label: "Company Profile" }, { href: "/blog", label: "Blog" }, { href: "/news", label: "News" } ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-green-700 bg-white"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-6 mb-2 border-t border-slate-100 pt-6 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">Quick Links</div>
          {navLinks.map((link) => (
             <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className={`block px-4 py-3.5 border-b border-slate-100 text-base font-semibold transition-all ${pathname === link.href ? "text-green-700 bg-green-50/50" : "text-slate-700"}`}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="mt-8 mb-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">Products Range</div>
          
          {dbCategories.map((cat, idx) => (
            <Link
              key={cat.id || idx}
              href={`/product/${cat.slug}`}
              onClick={closeMobile}
              className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-green-700 bg-slate-50 mb-1 rounded-md"
            >
              {cat.name}
            </Link>
          ))}
          
          <Link
            href="/product"
            onClick={closeMobile}
            className="block px-4 py-3 text-sm font-bold text-green-700 hover:bg-green-50 mb-1 rounded-md"
          >
            View All Products ➔
          </Link>

          <a
            href="tel:+919922996236"
            className="mt-8 flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-none bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> Call Now
          </a>
        </div>
      </div>
    </>
  );
}
