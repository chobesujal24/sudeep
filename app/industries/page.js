import Link from "next/link";
import Image from "next/image";
import { Building2, Globe, Factory, Settings, Landmark } from "lucide-react";

export const metadata = {
  title: "Industries We Serve — Highway, Municipal, Industrial & Stadium LED Lighting",
  description:
    "Sudeep Engineers supplies LED street lights, flood lights, solar lights, octagonal poles & highmast poles to highway authorities, municipal corporations, industrial plants, stadiums & government projects across India.",
  alternates: { canonical: "https://sudeepengineers.com/industries" },
  openGraph: {
    title: "LED Lighting & Solar Infrastructure for All Industries | Sudeep Engineers",
    description: "Highway LED street lights, stadium flood lights, industrial highbay, solar street lights & poles for every sector.",
  },
};

const industries = [
  {
    icon: <Building2 color="currentColor" size={48} />,
    title: "Construction & Real Estate",
    desc: "Complete lighting and solar infrastructure solutions for residential, commercial, and industrial construction projects across India.",
    services: ["Commercial LED Lighting", "Solar Power Infrastructure", "Highmast Area Lighting", "Security Parameter Lighting"],
    image: "/main/industry-construction.webp"
  },
  {
    icon: <Globe color="currentColor" size={48} />,
    title: "Highways & Infrastructure",
    desc: "Heavy-duty engineered lighting for infrastructure development including highways, flyovers, and public utility projects. Trusted by agencies and contractors.",
    services: ["LED Street Lighting systems", "Octagonal Poles", "Solar Street Lights", "Smart City Lighting"],
    image: "/main/industry-highways.webp"
  },
  {
    icon: <Factory color="currentColor" size={48} />,
    title: "Industrial Plants",
    desc: "Custom LED lighting and solar solutions for industrial facilities. We supply robust, IP66 rated fixtures to keep production lines bright and energy efficient.",
    services: ["LED High Bay Lights", "Industrial Flood Lights", "Solar Roof Installations", "Warehouse Lighting"],
    image: "/main/industry-plants.webp"
  },
  {
    icon: <Settings color="currentColor" size={48} />,
    title: "Sports & Stadiums",
    desc: "Precision illumination for professional sporting arenas and community grounds. Engineered to deliver uniform lux levels without glare.",
    services: ["Stadium Flood Lights", "Highmast Lifting Carriages", "Sports Complex Lighting", "Auditorium Lighting"],
    image: "/main/industry-stadium.webp"
  },
  {
    icon: <Landmark color="currentColor" size={48} />,
    title: "Government & Municipal",
    desc: "As an MSME registered company, we deliver large-scale lighting and solar infrastructure for municipal and state government smart-city initiatives.",
    services: ["Smart City LED Networks", "Public Parks & Post Tops", "Government Building Solar", "Street Light Installation"],
    image: "/main/industry-government.webp"
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
            src="/main/posttoplight.webp"
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
          style={{ background: "radial-gradient(circle, rgba(21,128,61,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-[color:var(--color-text-muted)] mb-6 flex gap-2">
            <Link href="/" className="hover:text-green-500 no-underline text-[color:var(--color-text-muted)]">Home</Link>
            <span>/</span><span className="text-[color:var(--color-text-secondary)]">Industries</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            Industries <span className="gradient-text">We Serve</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[600px]"
            style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Delivering elite LED lighting and Solar solutions across diverse industrial sectors.
          </p>
        </div>
      </section>

      {/* Industries */}
      {industries.map((ind, idx) => (
        <section
          key={idx}
          className={`py-12 md:py-20 ${idx % 2 === 0 ? "bg-[color:var(--color-section)]" : "bg-[color:var(--color-background)]"} ${idx > 0 ? "border-t border-[color:var(--color-border)]" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
              <div className={`animate-on-scroll ${idx % 2 !== 0 ? "lg:order-2" : ""}`}>
                <div className="text-green-500 mb-6 [&>svg]:w-12 [&>svg]:h-12">{ind.icon}</div>
                <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold mb-4">{ind.title}</h2>
                <p className="text-[color:var(--color-text-secondary)] leading-relaxed mb-6">{ind.desc}</p>
                <h3 className="font-heading font-semibold text-base mb-3">Our Solutions</h3>
                <ul className="space-y-2 mb-6">
                  {ind.services.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-[color:var(--color-text-secondary)] text-sm">
                      <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
                <Link href="/contact"
                  className="inline-flex px-6 py-3 rounded-md bg-gradient-to-r from-green-600 to-green-700 text-[color:var(--color-foreground)] font-semibold hover:-translate-y-0.5 transition-all no-underline text-sm">
                  Enquire for {ind.title} →
                </Link>
              </div>
              <div className={`animate-on-scroll delay-2 ${idx % 2 !== 0 ? "lg:order-1" : ""}`}>
                <div className="rounded-2xl overflow-hidden border border-[color:var(--color-border)] lg:h-[400px] h-[250px] sm:h-[350px] relative group bg-[color:var(--color-background)]">
                  <Image 
                    src={ind.image} 
                    alt={ind.title} 
                    fill 
                    className="object-cover opacity-90" 
                  />
                  <div className="absolute inset-0 bg-green-900/5 mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ====== CTA ====== */}
      <section className="py-12 md:py-20 bg-[color:var(--color-section)] border-t border-[color:var(--color-border)]">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="rounded-3xl p-8 sm:p-10 md:p-16 text-center relative overflow-hidden animate-on-scroll" style={{ background: "linear-gradient(135deg, #166534, #15803D, #166534)" }}>
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold text-[#FFFFFF] mb-4 relative z-10">
              Your Industry, Our Expertise
            </h2>
            <p className="text-[#FFFFFF]/90 text-[1.05rem] mb-8 max-w-[500px] mx-auto relative z-10">
              Whatever your industry, we have the manufacturing capabilities to light it up.
            </p>
            <Link href="/contact"
              className="relative z-10 inline-flex px-8 py-3.5 rounded-md bg-[#15803d] text-[#0F172A] font-bold hover:opacity-90 transition-all no-underline">
              Discuss Your Project →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
