import Link from "next/link";
import Image from "next/image";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQ from "@/components/FAQ";
import { Icons } from "@/components/Icons";

const services = [
  {
    icon: <Icons.Engineering className="w-8 h-8 text-sky-400" />,
    title: "Engineering Fabrication",
    desc: "Custom engineering fabrication solutions for industrial projects across Aurangabad and Maharashtra.",
  },
  {
    icon: <Icons.Structure className="w-8 h-8 text-sky-400" />,
    title: "Structural Metal Manufacturing",
    desc: "High-quality structural metal components for construction, infrastructure, and industrial plants.",
  },
  {
    icon: <Icons.Factory className="w-8 h-8 text-sky-400" />,
    title: "Industrial Job Work",
    desc: "Precision industrial job work services in Waluj MIDC with fast turnaround and competitive pricing.",
  },
  {
    icon: <Icons.Lighting className="w-8 h-8 text-sky-400" />,
    title: "LED Lighting Manufacturing",
    desc: "Energy-efficient LED street lights, flood lights, and solar lighting solutions for industrial and municipal use.",
  },
  {
    icon: <Icons.Custom className="w-8 h-8 text-sky-400" />,
    title: "Custom Engineering Solutions",
    desc: "Tailored engineering designs and manufacturing solutions to meet specific industrial requirements.",
  },
  {
    icon: <Icons.Design className="w-8 h-8 text-sky-400" />,
    title: "Design & Prototyping",
    desc: "Engineering design support and rapid prototyping for new product development and modifications.",
  },
];

const industries = [
  { icon: <Icons.Structure className="w-10 h-10 text-sky-400 mx-auto" />, name: "Construction" },
  { icon: <Icons.Design className="w-10 h-10 text-sky-400 mx-auto" />, name: "Infrastructure" },
  { icon: <Icons.Factory className="w-10 h-10 text-sky-400 mx-auto" />, name: "Industrial Plants" },
  { icon: <Icons.Manufacturing className="w-10 h-10 text-sky-400 mx-auto" />, name: "Manufacturing" },
  { icon: <Icons.Engineering className="w-10 h-10 text-sky-400 mx-auto" />, name: "Government Projects" },
];

const whyUs = [
  { title: "MSME Registered", desc: "Udyam registered micro enterprise with government credentials" },
  { title: "Strategic Location", desc: "Located in Waluj MIDC — Aurangabad's prime industrial hub" },
  { title: "Quality Assured", desc: "Rigorous quality control at every manufacturing stage" },
  { title: "On-Time Delivery", desc: "Reliable delivery schedules to keep your projects on track" },
  { title: "Competitive Pricing", desc: "Cost-effective solutions without compromising quality" },
  { title: "Expert Team", desc: "Skilled engineers and technicians with years of experience" },
];

export default function HomePage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/industry_hero_bg.png"
            alt="Sudeep Engineers Industrial Facility"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
          {/* Light overlay to ensure text readability */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
        </div>

        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-1/2 -right-[30%] w-[800px] h-[800px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-[30%] -left-[20%] w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)" }} />
          <div className="absolute inset-0 grid-overlay" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/25 rounded-full px-5 py-1.5 text-[0.82rem] font-semibold text-sky-400 mb-6"
              style={{ animation: "fade-in-up 0.6s ease forwards" }}>
              <Icons.Factory className="w-4 h-4" /> MSME Registered Engineering Company
            </div>

            <h1 className="text-[clamp(2.2rem,5vw,3.75rem)] font-heading font-extrabold leading-[1.08] mb-5"
              style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
              Premium <span className="gradient-text">LED Lighting</span> &amp; Solar Solutions
            </h1>

            <p className="text-[clamp(1rem,1.5vw,1.15rem)] text-[color:var(--color-text-secondary)] max-w-[560px] mb-8 leading-relaxed"
              style={{ animation: "fade-in-up 0.6s ease 0.2s forwards", opacity: 0 }}>
              Leading LED lighting and solar solutions manufacturer in{" "}
              <strong className="text-[color:var(--color-text-secondary)]">Waluj MIDC, Aurangabad</strong>. Delivering
              high-quality street lights, flood lights, and custom fabricated lighting profiles since 2019.
            </p>

            <div className="flex flex-wrap gap-4"
              style={{ animation: "fade-in-up 0.6s ease 0.3s forwards", opacity: 0 }}>
              <Link href="/contact"
                className="px-8 py-3.5 rounded-md border border-[#2563EB] bg-[#2563EB] text-[#FFFFFF] font-semibold shadow-[0_2px_10px_rgba(37,99,235,0.15)] hover:-translate-y-0.5 transition-all no-underline">
                Primary Button
              </Link>
              <Link href="/services"
                className="px-8 py-3.5 rounded-md border border-[#2563EB] text-[#2563EB] bg-transparent font-semibold hover:bg-blue-50 transition-all no-underline">
                Secondary Button
              </Link>
            </div>

            <div className="flex gap-12 mt-14 pt-10 border-t border-[color:var(--color-border)] flex-wrap"
              style={{ animation: "fade-in-up 0.6s ease 0.4s forwards", opacity: 0 }}>
              {[
                { num: "5+", label: "Years Experience" },
                { num: "200+", label: "Projects Completed" },
                { num: "50+", label: "Happy Clients" },
                { num: "100%", label: "Quality Commitment" },
              ].map((s) => (
                <div key={s.label}>
                  <h3 className="text-[2.25rem] font-extrabold text-sky-400 mb-1">{s.num}</h3>
                  <p className="text-xs text-[color:var(--color-text-muted)] font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== SERVICES OVERVIEW ====== */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-[700px] mx-auto mb-14 animate-on-scroll">
            <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-heading font-bold mb-4 text-[#1E293B]">
              Comprehensive Lighting <span className="text-[#2563EB]">Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-8 animate-on-scroll shadow-sm hover:shadow-md transition-all">
                <div className="mb-5 text-[#38BDF8] [&>svg]:w-10 [&>svg]:h-10">
                  {s.icon}
                </div>
                <h3 className="font-heading font-bold text-lg mb-3 text-[#1E293B]">{s.title}</h3>
                <p className="text-[#1E293B] opacity-80 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 animate-on-scroll">
            <Link href="/services"
              className="px-8 py-3 rounded-md border border-[#2563EB] text-[#2563EB] font-semibold hover:bg-blue-50 transition-all no-underline text-sm">
              Secondary Button →
            </Link>
          </div>
        </div>
      </section>

      {/* ====== STATS ====== */}
      <section className="py-16 bg-[color:var(--color-bg-secondary)] border-t border-b border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "5+", label: "Years of Excellence" },
              { num: "200+", label: "Projects Delivered" },
              { num: "50+", label: "Satisfied Clients" },
              { num: "10+", label: "Industry Sectors" },
            ].map((s, i) => (
              <div key={i} className={`animate-on-scroll delay-${i + 1}`}>
                <h3 className="text-[2.5rem] font-extrabold text-sky-400 mb-1">{s.num}</h3>
                <p className="text-[color:var(--color-text-secondary)] text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== ABOUT/MANUFACTURING CAPABILITIES ====== */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-heading font-bold mb-4 text-[#1E293B]">
                About <span className="text-[#2563EB]">Sudeep Engineers</span>
              </h2>
              <p className="text-[#1E293B] opacity-90 mb-6 leading-relaxed">
                Trusted engineering fabrication company located in Waluj MIDC, Aurangabad. Our state-of-the-art facility is equipped with modern
                machinery and tools for precision lighting component assembly and MS/GI pole
                manufacturing.
              </p>
              <ul className="space-y-3">
                {[
                  "Semi-automated production lines",
                  "MIG/TIG welding and fabrication for poles",
                  "Sheet metal forming and bending",
                  "In-house powder coating capabilities",
                  "LED PCB assembly and advanced testing",
                  "Comprehensive quality inspection lab",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#1E293B] opacity-90 text-sm">
                    <span className="text-[#38BDF8] font-bold mt-0.5 shrink-0"><Icons.Lighting className="w-4 h-4" /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-on-scroll delay-2">
              <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] bg-gradient-to-br from-blue-50 to-[#F8FAFC] h-[400px] flex items-center justify-center text-blue-200">
                <Icons.Factory className="w-32 h-32 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== INDUSTRIES SERVED ====== */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)] border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-[700px] mx-auto mb-14 animate-on-scroll">
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1 text-[0.8rem] font-semibold text-blue-400 uppercase tracking-wider mb-4">
              Industries We Serve
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-heading font-bold mb-4">
              Trusted Across <span className="gradient-text">Industries</span>
            </h2>
            <p className="text-[color:var(--color-text-secondary)] text-[1.05rem]">
              We serve a diverse range of industries with our engineering fabrication and LED lighting solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {industries.map((ind, i) => (
              <div key={i} className={`glass-card p-6 text-center animate-on-scroll delay-${i + 1}`}>
                <div className="text-4xl mb-3">{ind.icon}</div>
                <h3 className="font-heading font-semibold text-sm">{ind.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== WHY CHOOSE US ====== */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-[700px] mx-auto mb-14 animate-on-scroll">
            <span className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1 text-[0.8rem] font-semibold text-sky-400 uppercase tracking-wider mb-4">
              Why Choose Us
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-heading font-bold mb-4">
              Why <span className="gradient-text">Sudeep Lights</span>?
            </h2>
            <p className="text-[color:var(--color-text-secondary)] text-[1.05rem]">
              Discover what makes us the preferred engineering partner for businesses across Aurangabad and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <div key={i} className={`glass-card p-8 animate-on-scroll delay-${(i % 5) + 1}`}>
                <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)] border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-[700px] mx-auto mb-14 animate-on-scroll">
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1 text-[0.8rem] font-semibold text-blue-400 uppercase tracking-wider mb-4">
              Testimonials
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-heading font-bold mb-4 text-[color:var(--color-foreground)]">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#2563EB] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden animate-on-scroll">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold text-[#FFFFFF] mb-4 relative z-10">
              Need Industrial Fabrication Services?
            </h2>
            <p className="text-[#FFFFFF] text-[1.05rem] mb-8 max-w-[500px] mx-auto relative z-10 opacity-90">
              Request a quote from our engineering team today.
            </p>
            <Link href="/contact"
              className="relative z-10 inline-flex px-8 py-3.5 rounded-md bg-[#38BDF8] text-[#0F172A] font-bold hover:opacity-90 transition-all no-underline">
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)] border-t border-[color:var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1 text-[0.8rem] font-semibold text-blue-400 uppercase tracking-wider mb-4">
              FAQ
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-heading font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>
          <FAQ />
        </div>
      </section>
    </>
  );
}
