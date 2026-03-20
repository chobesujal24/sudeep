import Link from "next/link";
import { Icons } from "./Icons";

const footerLinks = {
  services: [
    { href: "/product/led-street-light/led-street-light", label: "LED Street Lights" },
    { href: "/product/led-street-light/led-flood-light", label: "LED Flood Lights" },
    { href: "/product/led-street-light/solar-street-light", label: "Solar Street Lights" },
    { href: "/product/highmast-light/high-mast-pole", label: "High Mast Poles" },
    { href: "/product", label: "All Products" },
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
  marketplaces: [
    { href: "https://www.indiamart.com/eveready-solar-energy/", label: "IndiaMart" },
    { href: "https://www.justdial.com/Aurangabad-Maharashtra/SUDEEP-ENGINEERS-Waluj-Midc/9999PX240-X240-250509132009-B4K6_BZDET", label: "JustDial" },
    { href: "https://mkp.gem.gov.in/browse_nodes/browse_list#!/categories_for_brand?brand=SUDEEP", label: "GeM Marketplace" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border)" }} className="transition-colors duration-300">
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 32px 0" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center no-underline mb-6 group">
              <img
                src="/logo.png"
                alt="Sudeep Engineers"
                className="h-[80px] w-auto object-contain transition-transform group-hover:scale-105 logo-invert-on-dark"
              />
            </Link>
            <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed max-w-[280px] mb-6">
              Premium LED lighting and solar solutions manufactured in Waluj MIDC,
              Aurangabad. Trusted MSME partner since 2019.
            </p>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-3 group">
                <span className="text-[color:var(--color-primary)]"><Icons.Location className="w-4 h-4" /></span>
                <span className="text-[color:var(--color-text-secondary)] group-hover:text-[color:var(--color-primary)] transition-colors">Waluj MIDC, Aurangabad, Maharashtra</span>
              </p>
              <p className="flex items-center gap-3 group">
                <span className="text-[color:var(--color-primary)]"><Icons.Phone className="w-4 h-4" /></span>
                <a href="tel:+919922996236" className="text-[color:var(--color-text-secondary)] no-underline group-hover:text-[color:var(--color-primary)] transition-colors">+91 9922996236</a>
              </p>
              <p className="flex items-center gap-3 group">
                <span className="text-[color:var(--color-primary)]"><Icons.Envelope className="w-4 h-4" /></span>
                <a href="mailto:info@sudeepengineers.com" className="text-[color:var(--color-text-secondary)] no-underline group-hover:text-[color:var(--color-primary)] transition-colors">info@sudeepengineers.com</a>
              </p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-[color:var(--color-foreground)] text-sm mb-6 uppercase tracking-wider">Products</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[color:var(--color-text-muted)] hover:text-[color:var(--color-primary)] text-sm transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-[color:var(--color-foreground)] text-sm mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[color:var(--color-text-muted)] hover:text-[color:var(--color-primary)] text-sm transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-[color:var(--color-foreground)] text-sm mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.seo.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[color:var(--color-text-muted)] hover:text-[color:var(--color-primary)] text-sm transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Find Us On Marketplaces Row */}
        <div className="border-t border-[color:var(--color-border)] pt-8 pb-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="text-[color:var(--color-text-muted)] text-sm font-medium uppercase tracking-wider flex-shrink-0 text-center md:text-left">
            Find Us On Top Marketplaces
          </div>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-8 md:gap-12">
            <a href="https://www.indiamart.com/eveready-solar-energy/" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 group">
              <img src="/indiamart-clean.svg" alt="IndiaMart" className="h-8 md:h-10 w-auto opacity-100 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300" />
            </a>
            <a href="https://www.justdial.com/Aurangabad-Maharashtra/SUDEEP-ENGINEERS-Waluj-Midc/9999PX240-X240-250509132009-B4K6_BZDET" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 group">
              <img src="/justdial-clean.svg" alt="JustDial" className="h-8 md:h-10 w-auto opacity-100 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300" />
            </a>
            <a href="https://mkp.gem.gov.in/browse_nodes/browse_list#!/categories_for_brand?brand=SUDEEP" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 group flex items-center justify-center">
              <img src="/gem-footer.svg" alt="GeM Marketplace Logo" className="h-8 md:h-10 lg:h-12 w-auto opacity-100 transition-opacity duration-300" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t border-[color:var(--color-border)] py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[color:var(--color-text-muted)]"
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
