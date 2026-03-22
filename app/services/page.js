import Link from "next/link";
import Image from "next/image";
import { Settings, Building2, Wrench, Hammer, Lightbulb } from "lucide-react";

export const metadata = {
  title: "Services - LED Lighting & Solar Infrastructure",
  description:
    "Comprehensive engineering solutions in Waluj MIDC, Aurangabad — high-performance LED lighting manufacturing and complete Solar Power infrastructure.",
  alternates: { canonical: "https://sudeepengineers.com/services" },
  openGraph: {
    title: "LED & Solar Services | Sudeep Engineers Aurangabad",
    description:
      "Full-range LED lighting manufacturing & Solar power infrastructure in Waluj MIDC.",
  },
};

const services = [
  {
    id: "led-lighting-manufacturing",
    icon: <Lightbulb color="currentColor" size={48} />,
    title: "LED Lighting Manufacturing",
    subtitle: "Energy-efficient LED lights for industrial and municipal use",
    description:
      "Sudeep Engineers manufactures high-quality LED lighting products including street lights, flood lights, and pixel LED systems. Our LED products are designed for energy efficiency, durability, and superior light output. We serve municipalities, industrial facilities, and commercial projects with reliable lighting solutions manufactured in Aurangabad.",
    benefits: [
      "Energy savings up to 60-70%",
      "Long lifespan (50,000+ hours)",
      "IP65/IP66 weatherproof designs",
      "Customizable wattage and optics",
      "BIS compliant manufacturing",
      "Comprehensive warranty support",
    ],
    industries: ["Municipal Corporations", "Highway Authorities", "Industrial Complexes", "Commercial Buildings", "Sports Facilities"],
    image: "/main/linearlight.webp"
  },
  {
    id: "solar-power-infrastructure",
    icon: <Settings color="currentColor" size={48} />,
    title: "Solar Power Infrastructure",
    subtitle: "Complete EPC solutions for solar projects",
    description:
      "Sudeep Engineers provides end-to-end solar power infrastructure solutions. We specialize in grid-tied and off-grid photovoltaic systems, solar street lighting, and commercial scale solar setups. Our experienced team ensures maximum energy yield through precision engineering and high-quality panel deployments.",
    benefits: [
      "Significant reduction in energy costs",
      "Sustainable and eco-friendly",
      "Complete design to commissioning (EPC)",
      "High-efficiency solar modules",
      "Integration with existing grids",
      "Low maintenance architecture",
    ],
    industries: ["Commercial Buildings", "Industrial Plants", "Hospitals", "Educational Institutes", "Government Facilities"],
    image: "/main/solarpanels.webp"
  }
];

export default function ServicesPage() {
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
              { "@type": "ListItem", position: 2, name: "Services", item: "https://sudeepengineers.com/services" },
            ],
          }),
        }}
      />

      {/* Page Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden min-h-[40vh] flex flex-col justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/main/ef51007f-a9cb-4195-96cc-ea488edfe5b9-0003.webp"
            alt="LED and Solar Services"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-[color:var(--color-background)]/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="absolute -top-[30%] -right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-[color:var(--color-text-muted)] mb-6 flex gap-2">
            <Link href="/" className="hover:text-blue-400 no-underline text-[color:var(--color-text-muted)]">Home</Link>
            <span>/</span><span className="text-[color:var(--color-text-secondary)]">Services</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4 text-[color:var(--color-foreground)]"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[600px] opacity-90"
            style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Premium LED Lighting and Solar Power Infrastructure from Sudeep Engineers.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, idx) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${idx % 2 === 0 ? "bg-[color:var(--color-bg-secondary)]" : "bg-[color:var(--color-bg-card)]"} ${
            idx > 0 ? "border-t border-[color:var(--color-border)]" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className={`animate-on-scroll ${idx % 2 !== 0 ? "lg:order-2" : ""}`}>
                <div className="w-14 h-14 rounded-lg bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/15 flex items-center justify-center text-[color:var(--color-primary)] mb-6 [&>svg]:w-6 [&>svg]:h-6">
                  {service.icon}
                </div>
                <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold mb-2 text-[color:var(--color-foreground)]">
                  {service.title}
                </h2>
                <p className="text-[color:var(--color-primary)] text-sm font-medium mb-4">{service.subtitle}</p>
                <p className="text-[color:var(--color-text-secondary)] leading-relaxed mb-6">{service.description}</p>

                <h3 className="font-heading font-semibold text-lg mb-3 text-[color:var(--color-foreground)]">Key Benefits</h3>
                <ul className="space-y-2 mb-6">
                  {service.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-[color:var(--color-text-secondary)] text-sm">
                      <span className="text-[color:var(--color-primary)] font-bold mt-0.5 shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="inline-flex px-6 py-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:-translate-y-0.5 transition-all no-underline text-sm"
                >
                  Get Quote for {service.title} →
                </Link>
              </div>

              <div className={`animate-on-scroll delay-2 ${idx % 2 !== 0 ? "lg:order-1" : ""}`}>
                <div className="rounded-2xl overflow-hidden border border-[color:var(--color-border)] lg:h-[400px] h-[320px] relative mb-6 group bg-white">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover opacity-90" 
                  />
                  <div className="absolute inset-0 bg-[color:var(--color-primary)]/5 mix-blend-multiply"></div>
                </div>
                <div className="glass-card p-6">
                  <h4 className="font-heading font-semibold text-sm mb-3 text-[color:var(--color-primary)]">Industries Using This Service</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.industries.map((ind, i) => (
                      <span
                        key={i}
                        className="bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/20 rounded-full px-3 py-1 text-xs text-[color:var(--color-primary)] font-medium"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)] border-t border-[color:var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden animate-on-scroll">
            <div className="absolute -top-1/2 -right-[30%] w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)" }} />
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold text-white mb-4 relative z-10">
              Need LED Lighting or Solar Infrastructure?
            </h2>
            <p className="text-white/90 text-[1.05rem] mb-8 max-w-[500px] mx-auto relative z-10">
              Contact us today for a free consultation and competitive quote. We deliver quality from Waluj MIDC, Aurangabad.
            </p>
            <Link href="/contact"
              className="relative z-10 inline-flex px-8 py-3.5 rounded-md bg-white text-blue-700 font-semibold hover:-translate-y-0.5 hover:bg-gray-100 transition-all no-underline">
              Request Free Quote →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
