"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Settings, Building2, Wrench, Lightbulb, Puzzle, PenTool, Landmark, Factory, Cog, Shield } from "lucide-react";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQ from "@/components/FAQ";

/* ── Animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const bgZoom = {
  hidden: { scale: 1.1 },
  visible: { scale: 1, transition: { duration: 2, ease: [0.33, 1, 0.68, 1] } },
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

// Removed static products array

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
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          // The database products don't have is_active, take the first 6 for the marquee
          const featuredProducts = data.slice(0, 6);

          const mapped = featuredProducts.map(p => ({
            title: p.name || p.title || "Product", // Fallback to title just in case
            desc: p.description,
            // the JSON uses an array of images
            image: (p.images && p.images.length > 0) ? p.images[0] : "/placeholder-image.jpg",
            href: `/products/${p.slug}`
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="section-cinematic-hero">
        <motion.div className="absolute inset-0 z-0" variants={bgZoom} initial="hidden" animate="visible">
          <Image src="/industry_hero_bg1.png" alt="Industrial Fabrication Facility" fill priority className="object-cover object-center" sizes="100vw" quality={90} />
        </motion.div>
        <div className="section-overlay" />
        <div className="relative z-10 text-center px-6 max-w-[900px] mx-auto">
          <motion.h1 className="font-heading font-extrabold text-white leading-[1.05] mb-6" style={{ fontSize: "clamp(3.5rem, 7vw, 5rem)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}>
            <br />Engineering <span className="gradient-text">Brighter</span> Lighting Systems<span style={{ color: "rgba(57, 190, 86, 0.75)" }}></span>
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

      {/* ═══ FIND US ON (MARKETPLACES) ═══ */}
      <section className="relative" style={{ background: "var(--color-section)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)" }} />
        <div className="py-12 px-6" style={{ maxWidth: "1400px", margin: "0 auto" }}>

          <div className="text-center mb-8">
            <h2 className="text-[color:var(--color-text-muted)] text-sm md:text-base font-bold uppercase tracking-[0.2em]">Find Us On Top Marketplaces</h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">

            {/* IndiaMart */}
            <a
              href="https://www.indiamart.com/eveready-solar-energy/"
              target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 hover:bg-white/5"
            >
              <div className="h-16 w-48 bg-white dark:bg-white/95 rounded-lg flex items-center justify-center border border-[color:var(--color-border)] dark:border-white/10 shadow-lg px-4 transition-all duration-300">
                <img src="/indiamart-clean.svg" alt="IndiaMart" className="w-[90px] h-auto object-contain" />
              </div>
              <span className="text-[color:var(--color-text-muted)] text-[10px] font-bold uppercase tracking-widest group-hover:text-[#00A699] transition-colors">Verified Supplier</span>
            </a>

            {/* JustDial */}
            <a
              href="https://www.justdial.com/Aurangabad-Maharashtra/SUDEEP-ENGINEERS-Waluj-Midc/9999PX240-X240-250509132009-B4K6_BZDET"
              target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 hover:bg-white/5 relative"
            >
              {/* Divider vertical line (hidden on mobile) */}
              <div className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 w-px h-16 bg-white/10" />

               <div className="h-16 w-48 bg-white dark:bg-white/95 rounded-lg flex items-center justify-center border border-[color:var(--color-border)] dark:border-white/10 shadow-lg px-4 transition-all duration-300">
                <img src="/justdial-clean.svg" alt="JustDial" className="w-[120px] h-auto object-contain" />
              </div>
              <span className="text-[color:var(--color-text-muted)] text-[10px] font-bold uppercase tracking-widest group-hover:text-[#F96A00] transition-colors">Top Rated</span>
            </a>

            {/* GeM */}
            <a
              href="https://mkp.gem.gov.in/browse_nodes/browse_list#!/categories_for_brand?brand=SUDEEP"
              target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 hover:bg-white/5 relative"
            >
              <div className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 w-px h-16 bg-white/10" />

              <div className="h-16 w-48 bg-white dark:bg-white/95 rounded-lg flex items-center justify-center border border-[color:var(--color-border)] dark:border-white/10 shadow-lg px-4 transition-all duration-300">
                <img src="/gem-official.svg" alt="GeM Marketplace" className="w-[110px] h-auto object-contain" />
              </div>
              <span className="text-[color:var(--color-text-muted)] text-[10px] font-bold uppercase tracking-widest group-hover:text-[color:var(--color-primary)] transition-colors">Registered OEM</span>
            </a>

          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="section-cinematic" style={{ background: "var(--color-background)" }}>
        <div className="absolute inset-0 z-0">
          <Image src="/services_hero_bg1.png" alt="Engineering Services" fill className="object-cover object-center" sizes="100vw" quality={85} />
          <div className="section-overlay" />
        </div>
        <div className="relative z-10 w-full px-6" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div className="text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="font-heading font-bold text-[color:var(--color-foreground)] mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Our Services</h2>
            <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[500px] mx-auto">Comprehensive engineering and lighting solutions.</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {services.map((s, i) => (
              <motion.div key={i} className="bg-transparent border border-white/20 p-8 rounded-2xl transition-all duration-300 hover:bg-white/5 group" variants={fadeUp} custom={i}>
                <div className="mb-5 text-[color:var(--color-accent)] transition-transform duration-300 group-hover:scale-110">{s.icon}</div>
                <h3 className="font-heading font-bold text-lg mb-3 text-white">{s.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Link href="/services" className="btn-secondary">Explore All Services</Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section className="section-cinematic" style={{ background: "var(--color-section)" }}>
        <div className="relative z-10 w-full px-6 py-20" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div className="text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="font-heading font-bold text-[color:var(--color-foreground)] mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Featured <span className="gradient-text">Products</span></h2>
            <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[500px] mx-auto">Premium lighting and fabrication products built to last.</p>
          </motion.div>

          {/* Animated Marquee Container */}
          {products.length > 0 ? (
            <div className="relative w-full overflow-hidden mx-auto py-4" style={{ maxWidth: "1200px" }}>
              <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[color:var(--color-section)] to-transparent z-20 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[color:var(--color-section)] to-transparent z-20 pointer-events-none" />

              <motion.div
                className="flex gap-8 w-max"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              >
                {[...products, ...products, ...products].map((p, i) => (
                  <div key={i} className="w-[300px] sm:w-[350px] shrink-0">
                    <Link href={p.href} className="block no-underline group">
                      <div className="glass-card overflow-hidden">
                        <div className="relative h-[250px] overflow-hidden">
                          <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                        <div className="p-6">
                          <h3 className="font-heading font-bold text-lg mb-2 text-[color:var(--color-foreground)] group-hover:text-[color:var(--color-primary)] transition-colors line-clamp-1">{p.title}</h3>
                          <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed line-clamp-2">{p.desc}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="h-[250px] flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[#1E40AF] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <motion.div className="text-center mt-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Link href="/products" className="btn-primary">View All Products</Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="section-cinematic" style={{ background: "var(--color-background)" }}>
        <div className="relative z-10 w-full px-6 py-20" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <h2 className="font-heading font-bold text-[color:var(--color-foreground)] mb-6" style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)" }}>About <span className="text-[color:var(--color-primary)]">Sudeep Engineers</span></h2>
              <p className="text-[color:var(--color-text-secondary)] text-lg leading-relaxed mb-6">Trusted engineering fabrication company located in Waluj MIDC, Aurangabad. Our state-of-the-art facility delivers precision lighting and structural solutions.</p>
              <ul className="space-y-3 mb-8">
                {["Semi-automated production lines", "MIG/TIG welding and fabrication", "Sheet metal forming and bending", "In-house powder coating", "LED PCB assembly and testing", "Quality inspection lab"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[color:var(--color-text-secondary)] text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-primary)] shrink-0" />
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
            <h2 className="font-heading font-bold text-[color:var(--color-foreground)] mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Industries We Serve</h2>
            <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[500px] mx-auto">Trusted across diverse industrial sectors.</p>
          </motion.div>
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {industries.map((ind, i) => (
              <motion.div key={i} className="bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] p-8 text-center rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl group" variants={fadeUp} custom={i}>
                <div className="text-[color:var(--color-primary)] mb-4 flex justify-center group-hover:scale-110 transition-transform">{ind.icon}</div>
                <h3 className="font-heading font-semibold text-sm text-[color:var(--color-foreground)]">{ind.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="section-cinematic" style={{ background: "var(--color-section)" }}>
        <div className="relative z-10 w-full px-6 py-20" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div className="text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-[color:var(--color-foreground)] mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Why <span className="gradient-text">Sudeep Engineers</span>?</h2>
            <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[500px] mx-auto">What makes us the preferred engineering partner.</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {whyUs.map((item, i) => (
              <motion.div key={i} className="bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] p-8 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl" variants={fadeUp} custom={i}>
                <h3 className="font-heading font-bold text-lg mb-3 text-[color:var(--color-foreground)]">{item.title}</h3>
                <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section-cinematic" style={{ background: "var(--color-section)" }}>
        <div className="relative z-10 w-full px-6 py-20" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-[color:var(--color-foreground)] mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>What Our Clients Say</h2>
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
          <motion.h2 className="font-heading font-bold text-[color:var(--color-foreground)] mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Ready to Start Your Project?</motion.h2>
          <motion.p className="text-[color:var(--color-text-secondary)] text-lg mb-10 max-w-[500px] mx-auto" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>Get a free consultation and competitive quote from our engineering team.</motion.p>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
            <Link href="/contact" className="btn-primary">Request a Quote</Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="section-cinematic" style={{ background: "var(--color-background)" }}>
        <div className="relative z-10 w-full px-6 py-20" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-[color:var(--color-foreground)] mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Frequently Asked <span className="gradient-text">Questions</span></h2>
          </motion.div>
          <FAQ />
        </div>
      </section>
    </>
  );
}
