import Link from "next/link";
import Image from "next/image";
import { Settings, Building2, Wrench, Hammer, Lightbulb } from "lucide-react";

export const metadata = {
  title: "Services - Engineering Fabrication & Manufacturing Services",
  description:
    "Comprehensive engineering fabrication services in Waluj MIDC, Aurangabad — structural metal manufacturing, industrial job work, custom engineering solutions & LED lighting manufacturing.",
  alternates: { canonical: "https://sudeepengineers.com/services" },
  openGraph: {
    title: "Engineering Fabrication Services | Sudeep Engineers Aurangabad",
    description:
      "Full-range engineering fabrication, metal manufacturing & LED lighting services in Waluj MIDC.",
  },
};

const services = [
  {
    id: "engineering-fabrication",
    icon: <Settings color="currentColor" size={48} />,
    title: "Engineering Fabrication",
    subtitle: "Custom engineering fabrication solutions in Aurangabad",
    description:
      "Sudeep Engineers provides comprehensive engineering fabrication services from our state-of-the-art facility in Waluj MIDC, Aurangabad. We specialize in custom metal fabrication for industrial, commercial, and infrastructure projects across Maharashtra and India. Our experienced team uses advanced machinery and techniques to deliver precision-fabricated components that meet exact specifications.",
    benefits: [
      "Precision CNC machining and cutting",
      "Custom designs tailored to your specifications",
      "High-strength materials and alloys",
      "Competitive pricing for bulk orders",
      "Fast turnaround with reliable delivery",
      "Comprehensive quality control",
    ],
    industries: ["Construction", "Infrastructure", "Industrial Plants", "Manufacturing", "Government Projects"],
    image: "/service_fabrication.png"
  },
  {
    id: "structural-metal-manufacturing",
    icon: <Building2 color="currentColor" size={48} />,
    title: "Structural Metal Manufacturing",
    subtitle: "Heavy-duty structural components for construction and infrastructure",
    description:
      "Our structural metal manufacturing services deliver robust, high-quality components for construction and infrastructure projects. From steel beams and columns to custom structural frames, we manufacture to the highest standards of strength and durability. Our Waluj MIDC facility is equipped with heavy-duty fabrication tools for large-scale structural work.",
    benefits: [
      "Heavy-duty structural steel fabrication",
      "Certified welding (MIG/TIG/Arc)",
      "Corrosion-resistant surface treatments",
      "Load-bearing calculations and compliance",
      "Large-scale project capability",
      "On-site installation support",
    ],
    industries: ["Building Construction", "Bridge & Flyover Projects", "Industrial Sheds", "Warehousing", "Water Treatment Plants"],
    image: "/service_structural.png"
  },
  {
    id: "industrial-job-work",
    icon: <Wrench color="currentColor" size={48} />,
    title: "Industrial Job Work",
    subtitle: "Precision job work services in Waluj MIDC, Aurangabad",
    description:
      "As a trusted industrial job work provider in Waluj MIDC, Aurangabad, we offer a wide range of machining, fabrication, and assembly services. Whether you need batch processing or one-off custom parts, our skilled team and modern equipment deliver consistent quality. We serve as a reliable extension of your manufacturing capacity.",
    benefits: [
      "CNC machining and turning",
      "Sheet metal cutting and forming",
      "Welding and assembly services",
      "Batch and bulk processing",
      "Quick turnaround times",
      "Flexible capacity scaling",
    ],
    industries: ["Automobile Companies", "Machine Manufacturers", "Agricultural Equipment", "Power & Energy", "General Engineering"],
    image: "/industry_manufacturing_1772907702259.png"
  },
  {
    id: "custom-engineering-solutions",
    icon: <Hammer color="currentColor" size={48} />,
    title: "Custom Engineering Solutions",
    subtitle: "Tailored engineering designs for unique project requirements",
    description:
      "Every project is unique, and our custom engineering solutions are designed to solve specific challenges. From concept to delivery, we work closely with clients to develop bespoke fabrication solutions. Our engineering team provides design support, material selection guidance, and prototype development to ensure the final product meets or exceeds expectations.",
    benefits: [
      "End-to-end project management",
      "CAD design and 3D modeling support",
      "Material selection expertise",
      "Prototype development and testing",
      "Reverse engineering capabilities",
      "Ongoing technical support",
    ],
    industries: ["R&D Departments", "Startups & Innovators", "Specialized Machinery", "Defense & Aerospace", "Medical Equipment"],
    image: "/industry_plant_1772907685804.png"
  },
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
    image: "/service_led.png"
  },
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
            src="/services_hero_bg.png"
            alt="Engineering Fabrication Services"
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
            <span>/</span><span className="text-[color:var(--color-text-secondary)]">Services</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[600px]"
            style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Comprehensive engineering fabrication and LED lighting services from Waluj MIDC, Aurangabad.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, idx) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${idx % 2 === 0 ? "bg-[#F8FAFC]" : "bg-[#FFFFFF]"} ${
            idx > 0 ? "border-t border-[#E2E8F0]" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className={`animate-on-scroll ${idx % 2 !== 0 ? "lg:order-2" : ""}`}>
                <div className="w-14 h-14 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-blue-400 mb-6 [&>svg]:w-6 [&>svg]:h-6">
                  {service.icon}
                </div>
                <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold mb-2">
                  {service.title}
                </h2>
                <p className="text-blue-400 text-sm font-medium mb-4">{service.subtitle}</p>
                <p className="text-[color:var(--color-text-secondary)] leading-relaxed mb-6">{service.description}</p>

                <h3 className="font-heading font-semibold text-lg mb-3">Key Benefits</h3>
                <ul className="space-y-2 mb-6">
                  {service.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-[color:var(--color-text-secondary)] text-sm">
                      <span className="text-blue-400 font-bold mt-0.5 shrink-0">✓</span>
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
                <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] lg:h-[400px] h-[320px] relative mb-6 group bg-[#FFFFFF]">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" 
                  />
                  <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply"></div>
                </div>
                <div className="glass-card p-6">
                  <h4 className="font-heading font-semibold text-sm mb-3 text-blue-600">Industries Using This Service</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.industries.map((ind, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-xs text-blue-700 font-medium"
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
              Need Engineering Fabrication Services?
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
