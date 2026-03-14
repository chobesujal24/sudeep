"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Settings, Building2, Wrench, Lightbulb, Puzzle, PenTool, Landmark, Factory, Cog, Shield } from "lucide-react";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQ from "@/components/FAQ";

/* ── Animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const bgZoom = {
  hidden: { scale: 1.12 },
  visible: { scale: 1, transition: { duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ── Data ── */
const services = [
  { icon: <Settings size={28} />, title: "Engineering Fabrication", desc: "Custom engineering fabrication solutions for industrial projects." },
  { icon: <Building2 size={28} />, title: "Structural Manufacturing", desc: "High-quality structural metal components for construction." },
  { icon: <Wrench size={28} />, title: "Industrial Job Work", desc: "Precision job work services in Waluj MIDC." },
  { icon: <Lightbulb size={28} />, title: "LED Lighting", desc: "Energy-efficient LED street lights and solar solutions." },
  { icon: <Puzzle size={28} />, title: "Custom Solutions", desc: "Tailored engineering designs for specific requirements." },
  { icon: <PenTool size={28} />, title: "Design & Prototyping", desc: "Rapid prototyping and engineering design support." },
];

const products = [
  { title: "LED Street Lights", desc: "High-performance street lighting for highways and urban roads.", image: "/service_led.png", href: "/products/led-street-light" },
  { title: "High Mast Poles", desc: "Galvanized steel poles for industrial and municipal lighting.", image: "/service_structural.png", href: "/products/high-mast-pole" },
  { title: "Solar Street Lights", desc: "Self-sustaining solar-powered lighting for remote installations.", image: "/service_fabrication.png", href: "/products/solar-street-light" },
];

const industries = [
  { icon: <Building2 size={36} />, name: "Construction" },
  { icon: <Landmark size={36} />, name: "Infrastructure" },
  { icon: <Factory size={36} />, name: "Industrial Plants" },
  { icon: <Cog size={36} />, name: "Manufacturing" },
  { icon: <Shield size={36} />, name: "Government" },
];

const whyUs = [
  { title: "MSME Registered", desc: "Udyam registered micro enterprise with government credentials." },
  { title: "Strategic Location", desc: "Located in Waluj MIDC — Aurangabad's prime industrial hub." },
  { title: "Quality Assured", desc: "Rigorous quality control at every manufacturing stage." },
  { title: "On-Time Delivery", desc: "Reliable delivery schedules to keep your projects on track." },
  { title: "Competitive Pricing", desc: "Cost-effective solutions without compromising quality." },
  { title: "Expert Team", desc: "Skilled engineers and technicians with years of experience." },
];

export default function HomeContent() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="section-cinematic-hero">
        <motion.div className="absolute inset-0 z-0" variants={bgZoom} initial="hidden" animate="visible">
          <Image src="/industry_hero_bg.png" alt="Industrial Fabrication Facility" fill priority className="object-cover object-center" sizes="100vw" quality={90} />
        </motion.div>
        <div className="section-overlay" />
        <div className="relative z-10 text-center px-6 max-w-[900px] mx-auto">
          <motion.h1 className="font-heading font-extrabold text-white leading-[1.05] mb-6" style={{ fontSize: "clamp(3.5rem, 7vw, 5rem)" }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}>
            Precision Engineering<br /><span style={{ color: "rgba(255,255,255,0.75)" }}>Fabrication Solutions</span>
          </motion.h1>
          <motion.p className="text-white/80 text-lg md:text-xl max-w-[560px] mx-auto mb-10 leading-relaxed" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
            Trusted engineering partner in Waluj MIDC, Aurangabad.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
            <Link href="/contact" className="btn-primary">Get Quote</Link>
            <Link href="/services" className="btn-secondary">View Services</Link>
          </motion.div>
        </div>
        <div className="scroll-indicator">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/50 text-xs font-medium tracking-widest uppercase">Scroll</span>
            <div className="scroll-indicator-line" />
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP — Premium separator ═══ */}
      <section className="relative" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)" }} />
        <div className="py-12 px-6" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "5+", label: "Years of Excellence" },
              { num: "200+", label: "Projects Delivered" },
              { num: "50+", label: "Happy Clients" },
              { num: "100%", label: "Quality Commitment" },
            ].map((s, i) => (
              <div key={i} className="relative px-4">
                {i > 0 && <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-10" style={{ background: "rgba(255,255,255,0.1)" }} />}
                <h3 className="text-3xl md:text-4xl font-extrabold mb-1" style={{ color: "#38BDF8" }}>{s.num}</h3>
                <p className="text-white/50 text-xs font-medium uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="section-cinematic" style={{ background: "#FFFFFF" }}>
        <div className="absolute inset-0 z-0">
          <Image src="/services_hero_bg.png" alt="Engineering Services" fill className="object-cover object-center" sizes="100vw" quality={85} />
          <div className="section-overlay" />
        </div>
        <div className="relative z-10 w-full px-6" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div className="text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Our Services</h2>
            <p className="text-white/60 text-lg max-w-[500px] mx-auto">Comprehensive engineering and lighting solutions.</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {services.map((s, i) => (
              <motion.div key={i} className="glass-card-dark p-8" variants={fadeUp} custom={i}>
                <div className="mb-5 text-[#38BDF8]">{s.icon}</div>
                <h3 className="font-heading font-bold text-lg mb-3 text-white">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Link href="/services" className="btn-secondary">Explore All Services</Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section className="section-cinematic" style={{ background: "#F8FAFC" }}>
        <div className="relative z-10 w-full px-6 py-20" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div className="text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="font-heading font-bold text-[#1E293B] mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Featured <span className="gradient-text">Products</span></h2>
            <p className="text-[#475569] text-lg max-w-[500px] mx-auto">Premium lighting and fabrication products built to last.</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {products.map((p, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <Link href={p.href} className="block no-underline group">
                  <div className="glass-card overflow-hidden">
                    <div className="relative h-[280px] overflow-hidden">
                      <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading font-bold text-lg mb-2 text-[#1E293B] group-hover:text-[#2563EB] transition-colors">{p.title}</h3>
                      <p className="text-[#475569] text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Link href="/products" className="btn-primary">View All Products</Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="section-cinematic">
        <div className="absolute inset-0 z-0">
          <Image src="/service_fabrication.png" alt="Manufacturing Process" fill className="object-cover object-center" sizes="100vw" quality={85} />
          <div className="section-overlay" />
        </div>
        <div className="relative z-10 w-full px-6 text-center" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.h2 className="font-heading font-bold text-white mb-16" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Engineering Excellence</motion.h2>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-10" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            {[{ num: "5+", label: "Years of Excellence" }, { num: "200+", label: "Projects Delivered" }, { num: "50+", label: "Satisfied Clients" }, { num: "10+", label: "Industry Sectors" }].map((s, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <h3 className="text-5xl md:text-6xl font-extrabold text-white mb-2">{s.num}</h3>
                <p className="text-white/60 text-sm font-medium uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="section-cinematic" style={{ background: "#FFFFFF" }}>
        <div className="relative z-10 w-full px-6 py-20" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <h2 className="font-heading font-bold text-[#1E293B] mb-6" style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)" }}>About <span className="text-[#2563EB]">Sudeep Engineers</span></h2>
              <p className="text-[#334155] text-lg leading-relaxed mb-6">Trusted engineering fabrication company located in Waluj MIDC, Aurangabad. Our state-of-the-art facility delivers precision lighting and structural solutions.</p>
              <ul className="space-y-3 mb-8">
                {["Semi-automated production lines", "MIG/TIG welding and fabrication", "Sheet metal forming and bending", "In-house powder coating", "LED PCB assembly and testing", "Quality inspection lab"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#334155] text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="btn-primary">Learn More</Link>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={2}>
              <div className="rounded-2xl overflow-hidden h-[480px] relative shadow-2xl">
                <Image src="/about_metal_poles.jpg" alt="Sudeep Engineers Manufacturing" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="section-cinematic">
        <div className="absolute inset-0 z-0">
          <Image src="/industries_hero_bg.png" alt="Industries We Serve" fill className="object-cover object-center" sizes="100vw" quality={85} />
          <div className="section-overlay" />
        </div>
        <div className="relative z-10 w-full px-6 text-center" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div className="mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Industries We Serve</h2>
            <p className="text-white/60 text-lg max-w-[500px] mx-auto">Trusted across diverse industrial sectors.</p>
          </motion.div>
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {industries.map((ind, i) => (
              <motion.div key={i} className="glass-card-dark p-8 text-center" variants={fadeUp} custom={i}>
                <div className="text-[#38BDF8] mb-4 flex justify-center">{ind.icon}</div>
                <h3 className="font-heading font-semibold text-sm text-white">{ind.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="section-cinematic" style={{ background: "#F8FAFC" }}>
        <div className="relative z-10 w-full px-6 py-20" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div className="text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-[#1E293B] mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Why <span className="gradient-text">Sudeep Engineers</span>?</h2>
            <p className="text-[#475569] text-lg max-w-[500px] mx-auto">What makes us the preferred engineering partner.</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {whyUs.map((item, i) => (
              <motion.div key={i} className="glass-card p-8" variants={fadeUp} custom={i}>
                <h3 className="font-heading font-bold text-lg mb-3 text-[#1E293B]">{item.title}</h3>
                <p className="text-[#475569] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section-cinematic" style={{ background: "#0F172A" }}>
        <div className="relative z-10 w-full px-6 py-20" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>What Our Clients Say</h2>
          </motion.div>
          <TestimonialSlider />
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section-cinematic">
        <div className="absolute inset-0 z-0">
          <Image src="/service_structural.png" alt="Engineering Workshop" fill className="object-cover object-center" sizes="100vw" quality={85} />
          <div className="section-overlay" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-[700px] mx-auto">
          <motion.h2 className="font-heading font-bold text-white mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Ready to Start Your Project?</motion.h2>
          <motion.p className="text-white/70 text-lg mb-10 max-w-[500px] mx-auto" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>Get a free consultation and competitive quote from our engineering team.</motion.p>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
            <Link href="/contact" className="btn-primary">Request a Quote</Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="section-cinematic" style={{ background: "#FFFFFF" }}>
        <div className="relative z-10 w-full px-6 py-20" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-[#1E293B] mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Frequently Asked <span className="gradient-text">Questions</span></h2>
          </motion.div>
          <FAQ />
        </div>
      </section>
    </>
  );
}
