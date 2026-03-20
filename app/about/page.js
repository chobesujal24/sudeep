import Link from "next/link";
import Image from "next/image";
import { Settings, Wrench, Lightbulb, PenTool, TestTube, Factory, Target, Telescope } from "lucide-react";

export const metadata = {
  title: "About Us - Engineering Fabrication Company in Aurangabad",
  description:
    "Learn about Sudeep Engineers — a trusted MSME engineering fabrication and LED lighting manufacturer in Waluj MIDC, Aurangabad, Maharashtra. Established 2019.",
  alternates: { canonical: "https://sudeepengineers.com/about" },
  openGraph: {
    title: "About Sudeep Engineers | Engineering Fabrication Aurangabad",
    description:
      "Trusted engineering fabrication & LED lighting manufacturer in Waluj MIDC, Aurangabad since 2019.",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://sudeepengineers.com" },
              { "@type": "ListItem", position: 2, name: "About", item: "https://sudeepengineers.com/about" },
            ],
          }),
        }}
      />

      {/* Page Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-[color:var(--color-background)]">
        <div className="absolute -top-[30%] -right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-[color:var(--color-text-muted)] mb-6 flex gap-2">
            <Link href="/" className="hover:text-[color:var(--color-accent)] no-underline text-[color:var(--color-text-muted)]">Home</Link>
            <span>/</span><span className="text-[color:var(--color-foreground)]">About</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4 text-[color:var(--color-foreground)]"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            About <span className="text-[color:var(--color-primary)]">Sudeep Engineers</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] opacity-80 text-lg max-w-[600px]"
            style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Engineering excellence from the heart of Waluj MIDC, Aurangabad.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-[color:var(--color-section)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="inline-flex items-center gap-2 bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/20 rounded-full px-4 py-1 text-[0.8rem] font-semibold text-[color:var(--color-primary)] uppercase tracking-wider mb-4">
                Our Story
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold mb-4 text-[color:var(--color-foreground)]">
                Built on Precision, Driven by <span className="text-[color:var(--color-primary)]">Innovation</span>
              </h2>
              <p className="text-[color:var(--color-text-secondary)] opacity-80 leading-relaxed mb-4">
                Founded in 2019, Sudeep Engineers was established with a vision to provide
                world-class engineering fabrication services from the industrial heartland of
                Aurangabad. Starting as a small workshop in Waluj MIDC, we have grown into a
                trusted name in engineering fabrication and LED lighting manufacturing.
              </p>
              <p className="text-[color:var(--color-text-secondary)] opacity-80 leading-relaxed mb-4">
                Our journey began with a commitment to quality and customer satisfaction. Today, we
                serve clients across construction, infrastructure, industrial plants, manufacturing
                companies, and government projects — delivering precision-engineered solutions that
                meet the highest standards.
              </p>
              <p className="text-[color:var(--color-text-secondary)] opacity-80 leading-relaxed">
                As a registered MSME Micro Enterprise under the Udyam scheme, we combine the agility
                of a focused team with the capabilities of modern manufacturing technology.
              </p>
            </div>
            <div className="animate-on-scroll delay-2">
              <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] h-[400px] relative">
                <Image src="/sudeep_factory_exterior.png" alt="Sudeep Engineers Factory" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Expertise */}
      <section className="py-20 bg-[color:var(--color-background)] border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-[700px] mx-auto mb-14 animate-on-scroll">
            <span className="inline-flex items-center gap-2 bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/20 rounded-full px-4 py-1 text-[0.8rem] font-semibold text-[color:var(--color-primary)] uppercase tracking-wider mb-4">
              Our Expertise
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-heading font-bold mb-4 text-[color:var(--color-foreground)]">
              Engineering <span className="text-[color:var(--color-primary)]">Expertise</span>
            </h2>
            <p className="text-[color:var(--color-text-secondary)] opacity-80 text-[1.05rem]">
              Deep domain knowledge across multiple engineering disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Settings className="w-6 h-6" />, title: "Mechanical Engineering", desc: "Precision machining, CNC operations, and mechanical assembly with tight tolerances." },
              { icon: <Wrench className="w-6 h-6" />, title: "Structural Engineering", desc: "Heavy-duty structural fabrication for buildings, bridges, and industrial frameworks." },
              { icon: <Lightbulb className="w-6 h-6" />, title: "Electrical Engineering", desc: "LED lighting design, PCB assembly, and electrical component manufacturing." },
              { icon: <PenTool className="w-6 h-6" />, title: "Design Engineering", desc: "CAD-based design, prototyping, and engineering documentation for custom solutions." },
              { icon: <TestTube className="w-6 h-6" />, title: "Quality Engineering", desc: "Comprehensive quality control, material testing, and compliance verification." },
              { icon: <Factory className="w-6 h-6" />, title: "Manufacturing Engineering", desc: "Process optimization, production planning, and lean manufacturing practices." },
            ].map((item, i) => (
              <div key={i} className={`bg-[color:var(--color-section)] border border-[color:var(--color-border)] rounded-xl p-8 animate-on-scroll delay-${(i % 5) + 1}`}>
                <div className="w-[52px] h-[52px] rounded-lg bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/15 flex items-center justify-center text-[color:var(--color-primary)] text-2xl mb-5">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-lg mb-3 text-[color:var(--color-foreground)]">{item.title}</h3>
                <p className="text-[color:var(--color-text-secondary)] opacity-80 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="py-20 bg-[color:var(--color-section)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll delay-2">
              <div className="rounded-2xl overflow-hidden border border-[color:var(--color-border)] h-[400px] relative">
                <Image src="/precision_manufacturing_capabilities_v2.png" alt="Manufacturing Capabilities" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
            <div className="animate-on-scroll">
              <span className="inline-flex items-center gap-2 bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/20 rounded-full px-4 py-1 text-[0.8rem] font-semibold text-[color:var(--color-primary)] uppercase tracking-wider mb-4">
                Our Capabilities
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold mb-6 text-[color:var(--color-foreground)]">
                Manufacturing <span className="text-[color:var(--color-primary)]">Capabilities</span>
              </h2>
              <ul className="space-y-4">
                {[
                  "CNC machining & precision cutting",
                  "MIG/TIG welding & fabrication",
                  "Sheet metal forming, bending & punching",
                  "Surface treatment & powder coating",
                  "LED PCB assembly & testing",
                  "Quality inspection laboratory",
                  "Prototype development & testing",
                  "Custom tooling & fixtures",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[color:var(--color-text-secondary)] opacity-80 text-sm">
                    <span className="text-[color:var(--color-accent)] font-bold mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Waluj MIDC Presence */}
      <section className="py-20 bg-[color:var(--color-background)] border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="inline-flex items-center gap-2 bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/20 rounded-full px-4 py-1 text-[0.8rem] font-semibold text-[color:var(--color-primary)] uppercase tracking-wider mb-4">
                Our Location
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold mb-4 text-[color:var(--color-foreground)]">
                Waluj MIDC, <span className="text-[color:var(--color-primary)]">Aurangabad</span>
              </h2>
              <p className="text-[color:var(--color-text-secondary)] opacity-80 leading-relaxed mb-4">
                Our manufacturing facility is strategically located in Waluj MIDC — one of the
                largest industrial areas in Aurangabad, Maharashtra. This prime location gives us
                access to excellent infrastructure, supply chains, and a skilled workforce.
              </p>
              <p className="text-[color:var(--color-text-secondary)] opacity-80 leading-relaxed mb-4">
                Waluj MIDC hosts over 2,000 industrial units including major automobile and
                engineering companies, making it ideal for our engineering fabrication operations. Our
                proximity to key suppliers and logistics networks ensures efficient project delivery.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { label: "Industrial Units Nearby", val: "2,000+" },
                  { label: "Year Established", val: "2019" },
                  { label: "Facility Area", val: "Modern" },
                  { label: "Location", val: "Waluj MIDC" },
                ].map((s, i) => (
                  <div key={i} className="bg-[color:var(--color-section)] border border-[color:var(--color-border)] rounded-xl p-4 text-center">
                    <h4 className="text-[color:var(--color-primary)] font-bold text-lg">{s.val}</h4>
                    <p className="text-[color:var(--color-text-muted)] text-xs font-medium uppercase mt-1 tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-on-scroll delay-2">
              <div className="rounded-2xl overflow-hidden border border-[color:var(--color-border)] shadow-sm h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.7!2d75.34!3d19.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDUyJzEyLjAiTiA3NcKwMjAnMzU.5JRU!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                  title="Sudeep Engineers Location - Waluj MIDC, Aurangabad"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[color:var(--color-section)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-xl p-10 animate-on-scroll">
              <div className="w-14 h-14 rounded-lg bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/15 flex items-center justify-center text-[color:var(--color-primary)] mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="font-heading font-bold text-2xl mb-4 text-[color:var(--color-foreground)]">Our Mission</h2>
              <p className="text-[#1E293B] opacity-80 leading-relaxed">
                To deliver world-class engineering fabrication and LED lighting solutions that exceed
                customer expectations in quality, reliability, and value. We are committed to
                contributing to India&apos;s industrial growth through precision manufacturing from
                our base in Waluj MIDC, Aurangabad.
              </p>
            </div>
            <div className="bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-xl p-10 animate-on-scroll delay-2">
              <div className="w-14 h-14 rounded-lg bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/15 flex items-center justify-center text-[color:var(--color-primary)] mb-6">
                <Telescope className="w-7 h-7" />
              </div>
              <h2 className="font-heading font-bold text-2xl mb-4 text-[color:var(--color-foreground)]">Short description</h2>
              <p className="text-[color:var(--color-text-secondary)] opacity-80 leading-relaxed">
                Sudeep Engineers is a 6 years 9 months old Proprietorship Firm incorporated on 04-Jun-2019, having its registered office located at Aurangabad, Maharashtra.
                The major activity of Sudeep Engineers is Manufacturing, Sub-classified into Manufacture of fabricated metal products except machinery and equipment and is primarily engaged in the Manufacture of metal frameworks or skeletons for construction and parts thereof towers masts trusses bridges etc .
                Sudeep Engineers is classified as Micro enterprise in the financial year 2024-25. It has its unit situated at Aurangabad, Maharashtra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-20 bg-[color:var(--color-section)] border-t border-[color:var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden animate-on-scroll" style={{ background: "linear-gradient(135deg, #166534, #15803D, #166534)" }}>
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold text-[#FFFFFF] mb-4 relative z-10">
              Partner with Sudeep Engineers
            </h2>
            <p className="text-[#FFFFFF]/90 text-[1.05rem] mb-8 max-w-[500px] mx-auto relative z-10">
              Let&apos;s discuss your engineering fabrication or LED lighting project requirements.
            </p>
            <Link href="/contact"
              className="relative z-10 inline-flex px-8 py-3.5 rounded-md bg-[#38BDF8] text-[#0F172A] font-bold hover:opacity-90 transition-all no-underline">
              Contact Us Today →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
