import Link from "next/link";
import Image from "next/image";
import { Building2, Globe, Factory, Settings, Landmark } from "lucide-react";

export const metadata = {
  title: "Industries Served - Engineering Solutions Across Sectors",
  description:
    "Sudeep Engineers serves construction, infrastructure, industrial plants, manufacturing companies & government projects with engineering fabrication & LED lighting in Aurangabad.",
  alternates: { canonical: "https://sudeepengineers.com/industries" },
};

const industries = [
  {
    icon: <Building2 color="currentColor" size={48} />,
    title: "Construction",
    desc: "Structural steel fabrication, metal frameworks, roofing systems, and building components for residential, commercial, and industrial construction projects across Aurangabad and Maharashtra.",
    services: ["Structural steel beams & columns", "Metal roofing systems", "Staircase fabrication", "Railing & handrails", "Cladding support structures"],
  },
  {
    icon: <Globe color="currentColor" size={48} />,
    title: "Infrastructure",
    desc: "Heavy-duty fabricated components for infrastructure development including bridges, flyovers, water treatment plants, and public utility projects. Trusted by government agencies and contractors.",
    services: ["Bridge components", "Flyover structural elements", "Water tank structures", "Pipeline supports", "LED street lighting systems"],
  },
  {
    icon: <Factory color="currentColor" size={48} />,
    title: "Industrial Plants",
    desc: "Custom fabrication and job work for industrial facilities. We supply machine components, industrial fixtures, conveyor systems, and maintenance parts to keep plants running efficiently.",
    services: ["Machine guards & enclosures", "Conveyor system components", "Industrial platforms & walkways", "Duct fabrication", "LED industrial lighting"],
  },
  {
    icon: <Settings color="currentColor" size={48} />,
    title: "Manufacturing Companies",
    desc: "Precision parts and assemblies for manufacturing companies. From CNC-machined components to complete sub-assemblies, we serve as an extension of your production capability.",
    services: ["CNC machined components", "Jigs & fixtures", "Assembly sub-contracts", "Tool & die components", "Prototype development"],
  },
  {
    icon: <Landmark color="currentColor" size={48} />,
    title: "Government Projects",
    desc: "As an MSME registered company, we are qualified for government tenders and projects. We have experience delivering fabrication and LED lighting solutions for municipal and state government initiatives.",
    services: ["Smart city LED lighting", "Government building fabrication", "Public infrastructure works", "Solar structure fabrication", "Street light installation"],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://sudeepengineers.com" },
              { "@type": "ListItem", position: 2, name: "Industries", item: "https://sudeepengineers.com/industries" },
            ],
          }),
        }}
      />

      {/* Page Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden min-h-[40vh] flex flex-col justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/industries_hero_bg.png"
            alt="Engineering Infrastructure Projects"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>
        </div>

        <div className="absolute -top-[30%] -right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-[color:var(--color-text-muted)] mb-6 flex gap-2">
            <Link href="/" className="hover:text-blue-400 no-underline text-[color:var(--color-text-muted)]">Home</Link>
            <span>/</span><span className="text-[color:var(--color-text-secondary)]">Industries</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            Industries <span className="gradient-text">We Serve</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[600px]"
            style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Delivering engineering fabrication and LED lighting solutions across diverse industrial sectors.
          </p>
        </div>
      </section>

      {/* Industries */}
      {industries.map((ind, idx) => (
        <section
          key={idx}
          className={`py-20 ${idx % 2 === 0 ? "bg-[#F8FAFC]" : "bg-[#FFFFFF]"} ${idx > 0 ? "border-t border-[#E2E8F0]" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className={`animate-on-scroll ${idx % 2 !== 0 ? "lg:order-2" : ""}`}>
                <div className="text-blue-400 mb-6 [&>svg]:w-12 [&>svg]:h-12">{ind.icon}</div>
                <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold mb-4">{ind.title}</h2>
                <p className="text-[color:var(--color-text-secondary)] leading-relaxed mb-6">{ind.desc}</p>
                <h3 className="font-heading font-semibold text-base mb-3">Our Solutions</h3>
                <ul className="space-y-2 mb-6">
                  {ind.services.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-[color:var(--color-text-secondary)] text-sm">
                      <span className="text-blue-400 font-bold mt-0.5 shrink-0">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
                <Link href="/contact"
                  className="inline-flex px-6 py-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-[color:var(--color-foreground)] font-semibold hover:-translate-y-0.5 transition-all no-underline text-sm">
                  Enquire for {ind.title} →
                </Link>
              </div>
              <div className={`animate-on-scroll delay-2 ${idx % 2 !== 0 ? "lg:order-1" : ""}`}>
                <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] lg:h-[400px] h-[350px] relative group bg-[#FFFFFF]">
                  <Image 
                    src="/general_industry_fabrication_1772904248397.png" 
                    alt={ind.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" 
                  />
                  <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ====== CTA ====== */}
      <section className="py-20 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#2563EB] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden animate-on-scroll">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold text-[#FFFFFF] mb-4 relative z-10">
              Your Industry, Our Expertise
            </h2>
            <p className="text-[#FFFFFF]/90 text-[1.05rem] mb-8 max-w-[500px] mx-auto relative z-10">
              Whatever your industry, we have the engineering fabrication capabilities to deliver.
            </p>
            <Link href="/contact"
              className="relative z-10 inline-flex px-8 py-3.5 rounded-md bg-[#38BDF8] text-[#0F172A] font-bold hover:opacity-90 transition-all no-underline">
              Discuss Your Project →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
