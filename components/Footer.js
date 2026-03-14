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
    <footer style={{ background: "#0F172A" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 32px 0" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center no-underline mb-6 group">
              <img
                src="/logo.png"
                alt="Sudeep Engineers"
                className="h-[80px] w-auto object-contain transition-transform group-hover:scale-105 brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-[280px] mb-6">
              Premium LED lighting and solar solutions manufactured in Waluj MIDC,
              Aurangabad. Trusted MSME partner since 2019.
            </p>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-3 group">
                <span className="text-[#38BDF8]"><Icons.Location className="w-4 h-4" /></span>
                <span className="text-[#94A3B8] group-hover:text-[#38BDF8] transition-colors">Waluj MIDC, Aurangabad, Maharashtra</span>
              </p>
              <p className="flex items-center gap-3 group">
                <span className="text-[#38BDF8]"><Icons.Phone className="w-4 h-4" /></span>
                <a href="tel:+919922996236" className="text-[#94A3B8] no-underline group-hover:text-[#38BDF8] transition-colors">+91 9922996236</a>
              </p>
              <p className="flex items-center gap-3 group">
                <span className="text-[#38BDF8]"><Icons.Envelope className="w-4 h-4" /></span>
                <a href="mailto:info@sudeepengineers.com" className="text-[#94A3B8] no-underline group-hover:text-[#38BDF8] transition-colors">info@sudeepengineers.com</a>
              </p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-6 uppercase tracking-wider">Products</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[#94A3B8] hover:text-white text-sm transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[#94A3B8] hover:text-white text-sm transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.seo.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[#94A3B8] hover:text-white text-sm transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t border-white/10 py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[#64748B]"
        >
          <p>&copy; {new Date().getFullYear()} Sudeep Engineers. All rights reserved.</p>
          <p>
            Premium LED Lighting &amp; Solar Solutions — Waluj MIDC, Aurangabad
          </p>
        </div>
      </div>
    </footer>
  );
}
