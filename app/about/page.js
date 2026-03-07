import Link from "next/link";
import { Building2, Settings, Wrench, Lightbulb, PenTool, TestTube, Factory, Target, Telescope } from "lucide-react";

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
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0e17 0%, #111827 50%, #0f172a 100%)" }}
      >
        <div className="absolute -top-[30%] -right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-[color:var(--color-text-muted)] mb-6 flex gap-2">
            <Link href="/" className="hover:text-blue-400 no-underline text-[color:var(--color-text-muted)]">Home</Link>
            <span>/</span><span className="text-[color:var(--color-text-secondary)]">About</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            About <span className="gradient-text">Sudeep Engineers</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[600px]"
            style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Engineering excellence from the heart of Waluj MIDC, Aurangabad.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1 text-[0.8rem] font-semibold text-blue-400 uppercase tracking-wider mb-4">
                Our Story
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold mb-4">
                Built on Precision, Driven by <span className="gradient-text">Innovation</span>
              </h2>
              <p className="text-[color:var(--color-text-secondary)] leading-relaxed mb-4">
                Founded in 2019, Sudeep Engineers was established with a vision to provide
                world-class engineering fabrication services from the industrial heartland of
                Aurangabad. Starting as a small workshop in Waluj MIDC, we have grown into a
                trusted name in engineering fabrication and LED lighting manufacturing.
              </p>
              <p className="text-[color:var(--color-text-secondary)] leading-relaxed mb-4">
                Our journey began with a commitment to quality and customer satisfaction. Today, we
                serve clients across construction, infrastructure, industrial plants, manufacturing
                companies, and government projects — delivering precision-engineered solutions that
                meet the highest standards.
              </p>
              <p className="text-[color:var(--color-text-secondary)] leading-relaxed">
                As a registered MSME Micro Enterprise under the Udyam scheme, we combine the agility
                of a focused team with the capabilities of modern manufacturing technology.
              </p>
            </div>
            <div className="animate-on-scroll delay-2">
              <div className="rounded-2xl overflow-hidden border border-[color:var(--color-border)] bg-gradient-to-br from-[#111827] to-[#0f172a] h-[400px] flex items-center justify-center text-slate-700">
                <Building2 className="w-32 h-32 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Expertise */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)] border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-[700px] mx-auto mb-14 animate-on-scroll">
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1 text-[0.8rem] font-semibold text-blue-400 uppercase tracking-wider mb-4">
              Our Expertise
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-heading font-bold mb-4">
              Engineering <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-[color:var(--color-text-secondary)] text-[1.05rem]">
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
              <div key={i} className={`glass-card p-8 animate-on-scroll delay-${(i % 5) + 1}`}>
                <div className="w-[52px] h-[52px] rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-2xl mb-5">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll delay-2">
              <div className="rounded-2xl overflow-hidden border border-[color:var(--color-border)] bg-gradient-to-br from-[#111827] to-[#0f172a] h-[400px] flex items-center justify-center text-slate-700">
                <Settings className="w-32 h-32 opacity-50" />
              </div>
            </div>
            <div className="animate-on-scroll">
              <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1 text-[0.8rem] font-semibold text-blue-400 uppercase tracking-wider mb-4">
                Our Capabilities
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold mb-6">
                Manufacturing <span className="gradient-text">Capabilities</span>
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
                  <li key={i} className="flex items-start gap-3 text-[color:var(--color-text-secondary)] text-sm">
                    <span className="text-blue-400 font-bold mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Waluj MIDC Presence */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)] border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1 text-[0.8rem] font-semibold text-blue-400 uppercase tracking-wider mb-4">
                Our Location
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold mb-4">
                Waluj MIDC, <span className="gradient-text">Aurangabad</span>
              </h2>
              <p className="text-[color:var(--color-text-secondary)] leading-relaxed mb-4">
                Our manufacturing facility is strategically located in Waluj MIDC — one of the
                largest industrial areas in Aurangabad, Maharashtra. This prime location gives us
                access to excellent infrastructure, supply chains, and a skilled workforce.
              </p>
              <p className="text-[color:var(--color-text-secondary)] leading-relaxed mb-4">
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
                  <div key={i} className="glass-card p-4 text-center">
                    <h4 className="text-blue-400 font-bold text-lg">{s.val}</h4>
                    <p className="text-[color:var(--color-text-muted)] text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-on-scroll delay-2">
              <div className="rounded-2xl overflow-hidden border border-[color:var(--color-border)] h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.7!2d75.34!3d19.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDUyJzEyLjAiTiA3NcKwMjAnMzUuOSJF!5e0!3m2!1sen!2sin!4v1"
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
      <section className="py-20 bg-[color:var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-10 animate-on-scroll">
              <div className="w-14 h-14 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-blue-400 mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="font-heading font-bold text-2xl mb-4">Our Mission</h2>
              <p className="text-[color:var(--color-text-secondary)] leading-relaxed">
                To deliver world-class engineering fabrication and LED lighting solutions that exceed
                customer expectations in quality, reliability, and value. We are committed to
                contributing to India&apos;s industrial growth through precision manufacturing from
                our base in Waluj MIDC, Aurangabad.
              </p>
            </div>
            <div className="glass-card p-10 animate-on-scroll delay-2">
              <div className="w-14 h-14 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-blue-400 mb-6">
                <Telescope className="w-7 h-7" />
              </div>
              <h2 className="font-heading font-bold text-2xl mb-4">Our Vision</h2>
              <p className="text-[color:var(--color-text-secondary)] leading-relaxed">
                To become a leading engineering fabrication and LED lighting manufacturer recognized
                across India for innovation, quality, and sustainable manufacturing practices. We aim
                to expand our capabilities while maintaining the personalized service our clients
                value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)] border-t border-[color:var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden animate-on-scroll">
            <div className="absolute -top-1/2 -right-[30%] w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)" }} />
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold text-[color:var(--color-foreground)] mb-4 relative z-10">
              Partner with Sudeep Engineers
            </h2>
            <p className="text-[color:var(--color-foreground)]/85 text-[1.05rem] mb-8 max-w-[500px] mx-auto relative z-10">
              Let&apos;s discuss your engineering fabrication or LED lighting project requirements.
            </p>
            <Link href="/contact"
              className="relative z-10 inline-flex px-8 py-3.5 rounded-md bg-white text-blue-700 font-semibold hover:-translate-y-0.5 hover:bg-gray-100 transition-all no-underline">
              Contact Us Today →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
