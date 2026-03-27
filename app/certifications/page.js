import Link from "next/link";
import { Landmark, ClipboardList, CheckCircle2, Lock, FileCheck } from "lucide-react";

export const metadata = {
  title: "Certifications & Quality Standards",
  description:
    "Sudeep Engineers is MSME Udyam registered, GST registered, and adheres to strict quality standards. LED lighting and Solar infrastructure company in Waluj MIDC, Aurangabad.",
  alternates: { canonical: "https://sudeepengineers.com/certifications" },
};

const certifications = [
  {
    icon: <Landmark color="#38BDF8" size={32} />,
    title: "MSME / Udyam Registration",
    status: "Registered",
    desc: "Sudeep Engineers is officially registered as a Micro Enterprise under the Government of India's Udyam Registration scheme (formerly MSME registration). This certification validates our standing as a recognized small industry and enables participation in government tenders and schemes.",
    benefits: [
      "Eligible for government tenders and procurement preferences",
      "Access to MSME credit facilities and subsidies",
      "Priority sector lending benefits",
      "Tax benefits under various government schemes",
      "Participation in trade fairs and exhibitions",
    ],
  },
  {
    icon: <ClipboardList color="#38BDF8" size={32} />,
    title: "GST Registration",
    status: "Active",
    desc: "We are a fully GST-compliant business with valid GSTIN registration. All our transactions, invoicing, and billing are conducted in full compliance with the Goods and Services Tax framework, ensuring transparency and seamless business dealings.",
    benefits: [
      "Transparent and compliant invoicing",
      "Input tax credit for business clients",
      "Regular GST return filing",
      "Seamless inter-state business capability",
      "Full digital compliance",
    ],
  },
  {
    icon: <CheckCircle2 color="#38BDF8" size={32} />,
    title: "Quality Management Standards",
    status: "Implemented",
    desc: "We follow rigorous quality management practices inspired by international standards. Our quality control processes cover incoming material inspection, in-process quality checks, and final product testing to ensure every deliverable meets the highest standards.",
    benefits: [
      "Comprehensive incoming material inspection",
      "In-process quality monitoring at every stage",
      "Final product testing and verification",
      "Documented quality control procedures",
      "Continuous improvement processes",
    ],
  },
  {
    icon: <Lock color="#38BDF8" size={32} />,
    title: "Safety Standards Compliance",
    status: "Compliant",
    desc: "Our manufacturing facility in Waluj MIDC adheres to all applicable safety standards and regulations. We maintain safe working conditions, proper material handling procedures, and conduct regular safety training for our workforce.",
    benefits: [
      "Safe and compliant manufacturing facility",
      "Regular safety audits and inspections",
      "Employee safety training programs",
      "Proper material handling and storage",
      "Fire safety and emergency protocols",
    ],
  },
];

const OFFICIAL_DOCUMENTS = [
  { file: "BIS CERTIFICATE SUDEEP Flood Light.pdf", title: "BIS Certificate — Flood Lights" },
  { file: "BIS CERTIFICATE SUDEEP HIBAY LIGHTS.pdf", title: "BIS Certificate — Highbay" },
  { file: "BIS CERTIFICATE SUDEEP LED DRIVER .pdf", title: "BIS Certificate — LED Driver" },
  { file: "BIS CERTIFICATE SUDEEP STREET LIGHT.pdf", title: "BIS Certificate — Street Light" },
  { file: "ISO CERTIFICATE.pdf", title: "ISO 9001:2015 Certificate" },
  { file: "SUDEEP BIFMA.pdf", title: "BIFMA Standards Compliance" },
  { file: "TRADEMARK CERTIFICATE.pdf", title: "Trademark Registration" },
];

export default function CertificationsPage() {
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
              { "@type": "ListItem", position: 2, name: "Certifications", item: "https://sudeepengineers.com/certifications" },
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
            <span>/</span><span className="text-[color:var(--color-foreground)]">Certifications</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4 text-[color:var(--color-foreground)]"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            Certifications &amp; <span className="text-[color:var(--color-primary)]">Quality</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] opacity-80 text-lg max-w-[600px]"
            style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Our commitment to quality, compliance, and industry standards.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-[color:var(--color-section)]">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {certifications.map((cert, idx) => (
            <div key={idx} className={`bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] shadow-sm rounded-xl p-8 md:p-10 animate-on-scroll delay-${(idx % 5) + 1}`}>
              <div className="flex items-start gap-6 flex-col md:flex-row">
                <div className="w-[72px] h-[72px] rounded-full bg-[color:var(--color-primary)]/5 border border-[color:var(--color-primary)]/10 flex items-center justify-center text-[color:var(--color-accent)] shrink-0 [&>svg]:w-8 [&>svg]:h-8">
                  {cert.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h2 className="font-heading font-bold text-xl text-[color:var(--color-foreground)]">{cert.title}</h2>
                    <span className="bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-3 py-0.5 text-xs font-semibold">
                      {cert.status}
                    </span>
                  </div>
                  <p className="text-[color:var(--color-text-secondary)] opacity-80 leading-relaxed mb-4">{cert.desc}</p>
                  <h3 className="font-heading font-semibold text-sm mb-3 text-[color:var(--color-primary)]">Key Benefits</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {cert.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-[color:var(--color-text-secondary)] opacity-80 text-sm">
                        <span className="text-[color:var(--color-accent)] font-bold mt-0.5 shrink-0">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accreditation & Certifications Grid */}
      <section className="py-20 bg-[color:var(--color-background)] border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="inline-flex items-center gap-2 bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/20 rounded-full px-4 py-1 text-[0.8rem] font-semibold text-[color:var(--color-primary)] uppercase tracking-wider mb-4">
              Compliance
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-heading font-bold mb-4 text-[color:var(--color-foreground)]">
              Accreditation & <span className="text-[color:var(--color-primary)]">Certifications</span>
            </h2>
            <p className="text-[color:var(--color-text-secondary)] opacity-80 text-lg max-w-lg mx-auto">
              Industrial-grade certifications for mission-critical infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFICIAL_DOCUMENTS.map((doc, i) => (
              <a 
                key={i} 
                href={`/certifications/${doc.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-6 bg-[color:var(--color-section)] border border-[color:var(--color-border)] rounded-xl hover:border-[color:var(--color-primary)]/30 hover:shadow-lg transition-all duration-300 animate-on-scroll delay-${(i % 5) + 1} no-underline"
              >
                <div className="w-12 h-12 rounded-lg bg-[color:var(--color-primary)]/10 flex items-center justify-center text-[color:var(--color-primary)] shrink-0 group-hover:bg-[color:var(--color-primary)] group-hover:text-white transition-all duration-300 shadow-sm">
                  <FileCheck size={24} strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-[color:var(--color-foreground)] group-hover:text-[color:var(--color-primary)] transition-colors truncate mb-1">
                    {doc.title}
                  </h4>
                  <p className="text-[11px] text-[color:var(--color-text-muted)] font-bold uppercase tracking-widest flex items-center gap-1.5 opacity-70 group-hover:opacity-100">
                    View Document <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-20 bg-[color:var(--color-section)] border-t border-[color:var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden animate-on-scroll" style={{ background: "linear-gradient(135deg, #166534, #15803D, #166534)" }}>
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold text-[#FFFFFF] mb-4 relative z-10">
              Work With a Certified Partner
            </h2>
            <p className="text-[#FFFFFF]/90 text-[1.05rem] mb-8 max-w-[500px] mx-auto relative z-10">
              Partner with an MSME-registered, quality-focused LED and Solar company.
            </p>
            <Link href="/contact"
              className="relative z-10 inline-flex px-8 py-3.5 rounded-md bg-[#38BDF8] text-[#0F172A] font-bold hover:opacity-90 transition-all no-underline">
              Get in Touch →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
