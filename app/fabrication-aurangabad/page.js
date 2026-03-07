import Link from "next/link";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Engineering Fabrication in Aurangabad | #1 Fabrication Company",
  description:
    "Best engineering fabrication services in Aurangabad. Sudeep Engineers — your trusted partner for custom metal fabrication, structural manufacturing & industrial job work in Waluj MIDC.",
  keywords: "engineering fabrication aurangabad, fabrication company aurangabad, metal fabrication aurangabad, industrial fabrication aurangabad, waluj midc fabrication",
  alternates: { canonical: "https://sudeepengineers.com/fabrication-aurangabad" },
  openGraph: {
    title: "Engineering Fabrication in Aurangabad | Sudeep Engineers",
    description: "Top-rated engineering fabrication services in Aurangabad, Maharashtra. Custom solutions from Waluj MIDC.",
  },
};

export default function FabricationAurangabad() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service",
        name: "Engineering Fabrication Services in Aurangabad",
        provider: { "@type": "LocalBusiness", name: "Sudeep Engineers", address: { "@type": "PostalAddress", addressLocality: "Aurangabad", addressRegion: "Maharashtra", addressCountry: "IN" }},
        areaServed: { "@type": "City", name: "Aurangabad" },
        description: "Comprehensive engineering fabrication services in Aurangabad including metal fabrication, structural manufacturing, CNC machining, and industrial job work."
      })}} />

      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0e17 0%, #111827 50%, #0f172a 100%)" }}>
        <div className="absolute -top-[30%] -right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-[color:var(--color-text-muted)] mb-6 flex gap-2">
            <Link href="/" className="hover:text-blue-400 no-underline text-[color:var(--color-text-muted)]">Home</Link>
            <span>/</span><span className="text-[color:var(--color-text-secondary)]">Fabrication Aurangabad</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4" style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            Engineering Fabrication in <span className="gradient-text">Aurangabad</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[600px]" style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Precision engineering fabrication from Waluj MIDC — Aurangabad&apos;s premier industrial manufacturing hub.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[color:var(--color-bg-secondary)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-on-scroll blog-prose">
            <h2>Why Aurangabad Is a Hub for Engineering Fabrication</h2>
            <p>Aurangabad has emerged as one of Maharashtra&apos;s most important industrial cities, with Waluj MIDC at its center. Home to over 2,000 industrial units, Waluj MIDC provides the perfect ecosystem for engineering fabrication — with access to skilled labor, raw material suppliers, logistics networks, and supporting industries.</p>
            <p>Sudeep Engineers, located in the heart of Waluj MIDC, leverages this strategic location to deliver world-class engineering fabrication services to clients across Aurangabad, Maharashtra, and India. Our modern facility is equipped with advanced machinery for precision cutting, welding, machining, and surface finishing.</p>

            <h2>Our Engineering Fabrication Services in Aurangabad</h2>
            <p>We offer a comprehensive range of engineering fabrication services designed to meet the diverse needs of industrial, commercial, and infrastructure projects:</p>
            <ul>
              <li><strong>Custom Metal Fabrication</strong> — Bespoke fabricated components manufactured to your exact specifications using high-grade materials</li>
              <li><strong>Structural Steel Fabrication</strong> — Heavy-duty structural components for construction, bridges, and industrial frameworks</li>
              <li><strong>CNC Machining</strong> — Precision machining services with tight tolerances for critical components</li>
              <li><strong>Sheet Metal Work</strong> — Cutting, bending, forming, and finishing of sheet metal for various applications</li>
              <li><strong>Welding Services</strong> — MIG, TIG, and arc welding by certified welders for strong, reliable joints</li>
              <li><strong>Surface Treatment</strong> — Powder coating, galvanizing, and other surface treatments for durability</li>
            </ul>

            <h2>Industries We Serve in Aurangabad</h2>
            <p>Our engineering fabrication services cater to a wide spectrum of industries in and around Aurangabad:</p>
            <ul>
              <li>Construction and real estate development</li>
              <li>Infrastructure and public works</li>
              <li>Automobile and auto component manufacturing</li>
              <li>Industrial plant maintenance and expansion</li>
              <li>Agricultural equipment manufacturing</li>
              <li>Government and municipal projects</li>
            </ul>

            <h2>Why Choose Sudeep Engineers for Fabrication in Aurangabad?</h2>
            <ul>
              <li><strong>Strategic Waluj MIDC Location</strong> — Easy access, excellent logistics</li>
              <li><strong>MSME Registered</strong> — Government recognized, tender eligible</li>
              <li><strong>Modern Equipment</strong> — CNC machines, welding stations, cutting tools</li>
              <li><strong>Experienced Team</strong> — Skilled engineers and technicians</li>
              <li><strong>Quality Assured</strong> — Rigorous quality control at every stage</li>
              <li><strong>Competitive Pricing</strong> — Best value without compromising quality</li>
            </ul>

            <blockquote>Looking for a reliable engineering fabrication partner in Aurangabad? Sudeep Engineers delivers precision, quality, and reliability from Waluj MIDC.</blockquote>
          </div>

          <div className="mt-12 animate-on-scroll">
            <Link href="/contact" className="inline-flex px-8 py-3.5 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-[color:var(--color-foreground)] font-semibold hover:-translate-y-0.5 transition-all no-underline">
              Get a Free Quote for Fabrication in Aurangabad →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[color:var(--color-bg-secondary)] border-t border-[color:var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-heading font-bold text-center mb-10 animate-on-scroll">
            Frequently Asked Questions
          </h2>
          <FAQ />
        </div>
      </section>
    </>
  );
}
