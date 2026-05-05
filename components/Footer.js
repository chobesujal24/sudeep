"use client";
import Link from "next/link";
import { Icons } from "./Icons";

const footerLinks = {
  products: [
    { href: "/product/led-street-light", label: "LED Street Lights" },
    { href: "/product/led-flood-light", label: "LED Flood Lights" },
    { href: "/product/solar-street-light", label: "Solar Street Lights" },
    { href: "/product/high-mast-pole", label: "High Mast Poles" },
    { href: "/product", label: "Browse All Products" },
  ],
  company: [
    { href: "/about", label: "About Sudeep Engineers" },
    { href: "/industries", label: "Core Industries" },
    { href: "/certifications", label: "Certifications" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact Us" },
  ],
  support: [
    { href: "/contact", label: "Request a Quote" },
    { href: "/services", label: "OEM/ODM Manufacturing" },
    { href: "/contact", label: "Customer Support" },
  ],
  seoPages: [
    { href: "/led-light-manufacturer-aurangabad", label: "LED Manufacturer Aurangabad" },
    { href: "/solar-street-light-manufacturer", label: "Solar Street Light Manufacturer" },
    { href: "/street-light-pole-manufacturer", label: "Pole Manufacturer India" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-green-100/30 text-slate-900 overflow-hidden" 
      style={{ background: "url('/main/footer_bg.png') center/cover no-repeat" }}>
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/logo.png"
                alt="Sudeep Engineers"
                className="h-32 w-auto object-contain logo-green"
              />
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs mb-6 font-medium">
              Premium LED lighting and solar solutions. ISO 9001:2015 certified, BIS approved. MSME and GeM registered partner for India&apos;s infrastructure projects.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Icons.Location className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                <span className="text-slate-600 font-medium">Waluj MIDC, Aurangabad,<br />Maharashtra 431136</span>
              </div>
              <div className="flex items-center gap-3">
                <Icons.Phone className="w-4 h-4 text-green-700 shrink-0" />
                <a href="tel:+919922996236" className="text-slate-600 hover:text-green-800 transition-colors font-semibold tracking-wide">+91 9922996236</a>
              </div>
              <div className="flex items-center gap-3">
                <Icons.Envelope className="w-4 h-4 text-green-700 shrink-0" />
                <a href="mailto:info@sudeepengineers.com" className="text-slate-600 hover:text-green-800 transition-colors font-medium">info@sudeepengineers.com</a>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-bold text-green-900 text-sm mb-6 uppercase tracking-[0.2em]">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-green-700 font-medium transition-colors inline-flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-2 h-px bg-green-600 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-green-900 text-sm mb-6 uppercase tracking-[0.2em]">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-green-700 font-medium transition-colors inline-flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-2 h-px bg-green-600 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Manufacturing Column (SEO Landing Pages) */}
          <div>
            <h4 className="font-bold text-green-900 text-sm mb-6 uppercase tracking-[0.2em]">Manufacturing</h4>
            <ul className="space-y-3">
              {footerLinks.seoPages.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-green-700 font-medium transition-colors inline-flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-2 h-px bg-green-600 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Quick CTA card */}
            <div className="mt-8 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-green-100">
              <h5 className="text-sm font-bold text-green-900 mb-2">Get a Quote</h5>
              <p className="text-xs text-slate-500 mb-3">Contact us for custom pricing on your infrastructure project.</p>
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 hover:text-green-800 transition-colors">
                Contact Us →
              </Link>
            </div>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold text-green-900 text-sm mb-6 uppercase tracking-[0.2em]">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-green-700 font-medium transition-colors inline-flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-2 h-px bg-green-600 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-green-900/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-green-950/60 uppercase tracking-widest font-bold">
          <p>&copy; {new Date().getFullYear()} Sudeep Engineers. All rights reserved.</p>
          <div className="flex gap-4">
            <span>ISO 9001:2015</span>
            <span className="text-green-900/20">|</span>
            <span>BIS Certified</span>
            <span className="text-green-900/20">|</span>
            <span>MSME Registered</span>
            <span className="text-green-900/20">|</span>
            <span>GeM Approved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
