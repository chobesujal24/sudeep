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
};

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600">
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/logo.png"
                alt="Sudeep Engineers"
                className="h-16 w-auto object-contain logo-green"
              />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
              Premium LED lighting and solar solutions. MSME and GeM registered partner for India's infrastructure projects.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Icons.Location className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-slate-500">Waluj MIDC, Aurangabad,<br />Maharashtra 431136</span>
              </div>
              <div className="flex items-center gap-3">
                <Icons.Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href="tel:+919922996236" className="text-slate-500 hover:text-emerald-600 transition-colors">+91 9922996236</a>
              </div>
              <div className="flex items-center gap-3">
                <Icons.Envelope className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href="mailto:info@sudeepengineers.com" className="text-slate-500 hover:text-emerald-600 transition-colors">info@sudeepengineers.com</a>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-semibold text-slate-900 text-sm mb-5 uppercase tracking-wider">Products</h4>
            <ul className="space-y-2.5">
              {footerLinks.products.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-slate-900 text-sm mb-5 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-semibold text-slate-900 text-sm mb-5 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Sudeep Engineers. All rights reserved.</p>
          <p className="font-medium">ISO 9001:2015 Certified · MSME Registered · GeM Approved</p>
        </div>
      </div>
    </footer>
  );
}
