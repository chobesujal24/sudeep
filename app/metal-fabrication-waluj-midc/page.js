import Link from "next/link";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Metal Fabrication in Waluj MIDC | Top Manufacturer Aurangabad",
  description:
    "Leading metal fabrication company in Waluj MIDC, Aurangabad. Custom structural steel, sheet metal & industrial fabrication by Sudeep Engineers. MSME registered.",
  keywords: "metal fabrication waluj midc, waluj midc fabrication, metal manufacturing aurangabad, structural steel waluj, industrial fabrication waluj midc",
  alternates: { canonical: "https://sudeepengineers.com/metal-fabrication-waluj-midc" },
};

export default function MetalFabricationWaluj() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service",
        name: "Metal Fabrication in Waluj MIDC",
        provider: { "@type": "LocalBusiness", name: "Sudeep Engineers", address: { "@type": "PostalAddress", streetAddress: "Waluj MIDC", addressLocality: "Aurangabad", addressRegion: "Maharashtra" }},
        areaServed: { "@type": "Place", name: "Waluj MIDC, Aurangabad" },
      })}} />

      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0e17 0%, #111827 50%, #0f172a 100%)" }}>
        <div className="absolute -top-[30%] -right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-[color:var(--color-text-muted)] mb-6 flex gap-2">
            <Link href="/" className="hover:text-blue-400 no-underline text-[color:var(--color-text-muted)]">Home</Link>
            <span>/</span><span className="text-[color:var(--color-text-secondary)]">Metal Fabrication Waluj MIDC</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4" style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            Metal Fabrication in <span className="gradient-text">Waluj MIDC</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[600px]" style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Your trusted metal fabrication partner in Aurangabad&apos;s largest industrial area.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[color:var(--color-bg-secondary)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-on-scroll blog-prose">
            <h2>Metal Fabrication Excellence in Waluj MIDC</h2>
            <p>Waluj MIDC in Aurangabad is one of Maharashtra&apos;s largest industrial estates, hosting major automotive, engineering, and manufacturing companies. Sudeep Engineers operates from this strategic industrial hub, providing comprehensive metal fabrication services to businesses of all sizes.</p>
            <p>Our Waluj MIDC facility is equipped with modern fabrication equipment including CNC cutting machines, industrial welding stations, press brakes, and surface treatment facilities. This allows us to handle projects ranging from small custom parts to large-scale structural fabrication.</p>

            <h2>Metal Fabrication Services Available in Waluj MIDC</h2>
            <ul>
              <li><strong>Structural Steel Fabrication</strong> — Beams, columns, trusses, and frames for construction and industrial applications</li>
              <li><strong>Sheet Metal Fabrication</strong> — Precision cutting, bending, punching, and forming of various sheet metals</li>
              <li><strong>Pipe & Tube Fabrication</strong> — Custom pipe work, frames, and tubular structures</li>
              <li><strong>Stainless Steel Fabrication</strong> — Specialized SS fabrication for food, pharma, and chemical industries</li>
              <li><strong>Aluminum Fabrication</strong> — Lightweight aluminum structures and components</li>
              <li><strong>Industrial Job Work</strong> — Batch processing and contract manufacturing from our MIDC facility</li>
            </ul>

            <h2>Advantages of Choosing a Waluj MIDC Fabricator</h2>
            <p>Partnering with a metal fabrication company in Waluj MIDC offers several distinct advantages:</p>
            <ul>
              <li><strong>Proximity to suppliers</strong> — Direct access to steel suppliers and raw material dealers</li>
              <li><strong>Skilled labor availability</strong> — Access to trained welders, fitters, and machinists</li>
              <li><strong>Industrial infrastructure</strong> — Reliable power, water, and transport facilities</li>
              <li><strong>Cost efficiency</strong> — Lower operational costs compared to metro cities</li>
              <li><strong>Quick turnaround</strong> — Efficient supply chain enables faster project completion</li>
            </ul>

            <h2>Quality Standards in Our Metal Fabrication</h2>
            <p>At Sudeep Engineers, quality is not optional. Every metal fabrication project undergoes:</p>
            <ul>
              <li>Raw material inspection and certification verification</li>
              <li>Dimensional accuracy checks during fabrication</li>
              <li>Weld quality inspection (visual and destructive testing)</li>
              <li>Surface finish verification</li>
              <li>Final assembly and fit-up checks</li>
              <li>Documentation and traceability records</li>
            </ul>

            <blockquote>For reliable, quality metal fabrication in Waluj MIDC, choose Sudeep Engineers — where precision meets performance.</blockquote>
          </div>

          <div className="mt-12 animate-on-scroll">
            <Link href="/contact" className="inline-flex px-8 py-3.5 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-[color:var(--color-foreground)] font-semibold hover:-translate-y-0.5 transition-all no-underline">
              Request a Quote from Waluj MIDC →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[color:var(--color-bg-secondary)] border-t border-[color:var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-heading font-bold text-center mb-10 animate-on-scroll">Frequently Asked Questions</h2>
          <FAQ />
        </div>
      </section>
    </>
  );
}
