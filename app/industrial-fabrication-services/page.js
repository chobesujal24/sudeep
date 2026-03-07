import Link from "next/link";

export const metadata = {
  title: "Industrial Fabrication Services | Engineering Solutions India",
  description:
    "Premium industrial fabrication services by Sudeep Engineers. Custom metal fabrication, structural manufacturing & engineering solutions from Aurangabad, Maharashtra, India.",
  keywords: "industrial fabrication services, industrial metal fabrication india, engineering fabrication services, custom industrial fabrication, manufacturing services india",
  alternates: { canonical: "https://sudeepengineers.com/industrial-fabrication-services" },
};

export default function IndustrialFabricationServices() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service",
        name: "Industrial Fabrication Services",
        provider: { "@type": "LocalBusiness", name: "Sudeep Engineers" },
        areaServed: { "@type": "Country", name: "India" },
      })}} />

      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0e17 0%, #111827 50%, #0f172a 100%)" }}>
        <div className="absolute -top-[30%] -right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-[color:var(--color-text-muted)] mb-6 flex gap-2">
            <Link href="/" className="hover:text-blue-400 no-underline text-[color:var(--color-text-muted)]">Home</Link>
            <span>/</span><span className="text-[color:var(--color-text-secondary)]">Industrial Fabrication Services</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4" style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            Industrial Fabrication <span className="gradient-text">Services</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[600px]" style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            End-to-end industrial fabrication solutions for manufacturing, construction, and infrastructure.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[color:var(--color-bg-secondary)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-on-scroll blog-prose">
            <h2>Comprehensive Industrial Fabrication Services</h2>
            <p>Industrial fabrication is the backbone of modern manufacturing and construction. At Sudeep Engineers, we provide end-to-end industrial fabrication services that transform raw materials into precision-engineered components and structures ready for deployment.</p>
            <p>Operating from our well-equipped facility in Waluj MIDC, Aurangabad, we serve industrial clients across Maharashtra and India with reliable, high-quality fabrication solutions.</p>

            <h2>Our Industrial Fabrication Capabilities</h2>

            <h3>Heavy Structural Fabrication</h3>
            <p>We fabricate heavy-duty structural components including steel columns, beams, trusses, portal frames, and industrial building structures. Our structural fabrication meets relevant IS codes and industry standards for load-bearing applications.</p>

            <h3>Process Equipment Fabrication</h3>
            <p>Custom fabrication of process equipment components including tanks, vessels, hoppers, chutes, ductwork, and piping systems. We work with mild steel, stainless steel, and specialized alloys based on application requirements.</p>

            <h3>Machine Component Fabrication</h3>
            <p>Precision fabrication of machine parts, frames, guards, enclosures, and assemblies. Our CNC machining capabilities ensure tight tolerances for critical components.</p>

            <h3>LED Lighting Solutions</h3>
            <p>In addition to metal fabrication, we manufacture industrial LED lighting products including high-bay lights, flood lights, and street lights for factory and infrastructure applications.</p>

            <h2>Industries Benefiting from Our Services</h2>
            <ul>
              <li>Automobile manufacturing and tier suppliers</li>
              <li>Chemical and pharmaceutical plants</li>
              <li>Food processing and beverage industry</li>
              <li>Power generation and distribution</li>
              <li>Water and wastewater treatment</li>
              <li>Construction and real estate</li>
              <li>Mining and material handling</li>
            </ul>

            <h2>Our Process</h2>
            <ol>
              <li><strong>Consultation</strong> — Understanding your requirements, specifications, and delivery timeline</li>
              <li><strong>Design Review</strong> — Analyzing drawings, suggesting improvements, and material selection</li>
              <li><strong>Material Procurement</strong> — Sourcing certified materials from trusted suppliers</li>
              <li><strong>Fabrication</strong> — Precision cutting, forming, welding, and assembly</li>
              <li><strong>Quality Check</strong> — Multi-stage inspection and testing</li>
              <li><strong>Surface Treatment</strong> — Coating, painting, or galvanizing as required</li>
              <li><strong>Delivery</strong> — Safe packaging and timely delivery to your site</li>
            </ol>

            <blockquote>From concept to delivery, Sudeep Engineers is your complete industrial fabrication partner. Get precision-engineered results for every project.</blockquote>
          </div>

          <div className="mt-12 animate-on-scroll">
            <Link href="/contact" className="inline-flex px-8 py-3.5 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-[color:var(--color-foreground)] font-semibold hover:-translate-y-0.5 transition-all no-underline">
              Discuss Your Industrial Fabrication Needs →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
