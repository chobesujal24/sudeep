import Link from "next/link";
import { Icons } from "./Icons";

const footerLinks = {
  products: [
    { href: "/product/led-street-light/led-street-light", label: "LED Street Lights" },
    { href: "/product/led-street-light/led-flood-light", label: "LED Flood Lights" },
    { href: "/product/led-street-light/solar-street-light", label: "Solar Street Lights" },
    { href: "/product/highmast-light/high-mast-pole", label: "High Mast Poles" },
    { href: "/product", label: "Browse All Products" },
  ],
  company: [
    { href: "/about", label: "About Sudeep Engineers" },
    { href: "/industries", label: "Core Industries" },
    { href: "/certifications", label: "ISO & MSME Certifications" },
    { href: "/blog", label: "Technical Blog" },
    { href: "/contact", label: "Contact Us" },
  ],
  support: [
    { href: "/contact", label: "Request a Quote" },
    { href: "/services", label: "OEM/ODM Manufacturing" },
    { href: "/product/led-street-light/solar-street-light", label: "Solar Installation Guide" },
    { href: "/contact", label: "Customer Support" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600">
      <div className="max-w-[1400px] mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/logo.png"
                alt="Sudeep Engineers"
                className="h-[80px] w-auto object-contain logo-green"
              />
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm mb-8 font-medium">
              Premium LED lighting and solar solutions manufactured entirely in Waluj MIDC,
              Aurangabad. Trusted MSME and GeM registered partner for India's largest infrastructure projects.
            </p>
            <div className="space-y-4 text-sm font-semibold">
              <div className="flex items-start gap-3">
                <Icons.Location className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span>Waluj MIDC, Aurangabad,<br/>Maharashtra 431136, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Icons.Phone className="w-5 h-5 text-emerald-700 shrink-0" />
                <a href="tel:+919922996236" className="hover:text-emerald-700 transition-colors">+91 9922996236</a>
              </div>
              <div className="flex items-center gap-3">
                <Icons.Envelope className="w-5 h-5 text-emerald-700 shrink-0" />
                <a href="mailto:info@sudeepengineers.com" className="hover:text-emerald-700 transition-colors">info@sudeepengineers.com</a>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-6 uppercase tracking-widest">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm font-medium hover:text-emerald-700 transition-colors flex items-center gap-2">
                    <span className="text-emerald-500 text-xs">▸</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-6 uppercase tracking-widest">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm font-medium hover:text-emerald-700 transition-colors flex items-center gap-2">
                    <span className="text-emerald-500 text-xs">▸</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-6 uppercase tracking-widest">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm font-medium hover:text-emerald-700 transition-colors flex items-center gap-2">
                    <span className="text-emerald-500 text-xs">▸</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Corporate Certification Bar */}
        <div className="border-t border-slate-200 pt-8 pb-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
             <img src="/indiamart-clean.svg" alt="IndiaMart Supplier" className="h-8 md:h-10 w-auto" />
             <img src="/justdial-clean.svg" alt="JustDial Verified" className="h-8 md:h-10 w-auto" />
             <img src="/gem-official.svg" alt="GeM Registered" className="h-8 md:h-10 w-auto" />
          </div>
          <div className="text-right">
            <h5 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-1">Stay Connected</h5>
            <p className="text-xs text-slate-500 font-medium">Follow our latest manufacturing updates</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Sudeep Engineers. All rights reserved.</p>
          <p>ISO 9001:2015 B2B Manufacturing Facility</p>
        </div>
      </div>
    </footer>
  );
}
