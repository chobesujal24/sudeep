import Link from "next/link";

import { Icons } from "./Icons";

const footerLinks = {
  services: [
    { href: "/products/led-street-light", label: "LED Street Lights" },
    { href: "/products/led-flood-light", label: "LED Flood Lights" },
    { href: "/products/solar-street-light", label: "Solar Street Lights" },
    { href: "/products/high-mast-pole", label: "High Mast Poles" },
    { href: "/products", label: "All Products" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/industries", label: "Industries" },
    { href: "/certifications", label: "Certifications" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  seo: [
    { href: "/fabrication-aurangabad", label: "Fabrication in Aurangabad" },
    { href: "/metal-fabrication-waluj-midc", label: "Metal Fabrication Waluj" },
    { href: "/industrial-fabrication-services", label: "Industrial Fabrication" },
    { href: "/led-light-manufacturer-aurangabad", label: "LED Manufacturer" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center no-underline mb-4 group -ml-1">
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white flex items-center gap-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-white">SUDEEP</span>
                <span className="font-light tracking-wide text-white">Lights</span>
              </span>
            </Link>
            <p className="text-[#E2E8F0] text-sm leading-relaxed max-w-[300px]">
              Premium LED lighting and solar solutions manufactured in Waluj MIDC,
              Aurangabad. Trusted MSME partner since 2019.
            </p>
            <div className="mt-5 space-y-3 text-sm text-[#E2E8F0]">
              <p className="flex items-center gap-3 group">
                <span className="text-[#38BDF8]"><Icons.Location className="w-4 h-4" /></span>
                <span className="group-hover:text-[#38BDF8] transition-colors">Waluj MIDC, Aurangabad, Maharashtra</span>
              </p>
              <p className="flex items-center gap-3 group">
                <span className="text-[#38BDF8]"><Icons.Phone className="w-4 h-4" /></span>
                <a href="tel:+919922996236" className="text-inherit no-underline group-hover:text-[#38BDF8] transition-colors">+91 9922996236</a>
              </p>
              <p className="flex items-center gap-3 group">
                <span className="text-[#38BDF8]"><Icons.Envelope className="w-4 h-4" /></span>
                <a href="mailto:info@sudeepengineers.com" className="text-inherit no-underline group-hover:text-[#38BDF8] transition-colors">info@sudeepengineers.com</a>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-5">Our Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[#E2E8F0] hover:text-[#38BDF8] text-sm transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-5">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[#E2E8F0] hover:text-[#38BDF8] text-sm transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks.seo.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[#E2E8F0] hover:text-[#38BDF8] text-sm transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#E2E8F0] opacity-80">
          <p>&copy; {new Date().getFullYear()} Sudeep Lights. All rights reserved.</p>
          <p>
            Premium LED Lighting &amp; Solar Solutions Manufacturer in Waluj MIDC, Aurangabad,
            Maharashtra, India
          </p>
        </div>
      </div>
    </footer>
  );
}
