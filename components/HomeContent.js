"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Building2, Wrench, Lightbulb, Puzzle, PenTool, Landmark, Factory, Cog, Shield, X } from "lucide-react";
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
  { icon: <Lightbulb size={28} />, title: "LED Street Light Luminaries", desc: "High-efficiency street lighting solutions for urban & highway infrastructure." },
  { icon: <Lightbulb size={28} />, title: "LED Flood Light Luminaries", desc: "Powerful flood lighting for stadiums, warehouses, and industrial areas." },
  { icon: <Lightbulb size={28} />, title: "LED HighBay Lights", desc: "Premium high-bay lighting for factories, warehouses, and large indoor spaces." },
  { icon: <PenTool size={28} />, title: "LED Linear Lights", desc: "Sleek linear lighting for commercial spaces, offices, and retail environments." },
  { icon: <Settings size={28} />, title: "LED Solar Street Lights", desc: "Self-sustained solar-powered street lighting for eco-friendly installations." },
  { icon: <Building2 size={28} />, title: "LED Highmast", desc: "Towering highmast lighting systems for highways, airports, and large areas." },
  { icon: <Wrench size={28} />, title: "LED Solar Highmast", desc: "Solar-powered highmast lighting for remote and off-grid locations." },
  { icon: <Shield size={28} />, title: "LED Stadium Mast", desc: "Professional-grade stadium mast lighting for sports arenas and grounds." },
  { icon: <Puzzle size={28} />, title: "LED Bollard Light", desc: "Elegant bollard lights for pathways, gardens, and landscape lighting." },
];

// Removed static products array

/* ── Client logos ── */
const featuredClients = [
  { logo: "/iNDUSTRIES LOGO/BHEL.webp", name: "BHEL" },
  { logo: "/iNDUSTRIES LOGO/NTPC.webp", name: "NTPC" },
  { logo: "/iNDUSTRIES LOGO/RAIL.webp", name: "Indian Railways" },
  { logo: "/iNDUSTRIES LOGO/ongc.webp", name: "ONGC" },
  { logo: "/iNDUSTRIES LOGO/gail.webp", name: "GAIL" },
  { logo: "/iNDUSTRIES LOGO/image (5).webp", name: "SAIL" },
  { logo: "/iNDUSTRIES LOGO/image (10).webp", name: "DRDO" },
  { logo: "/iNDUSTRIES LOGO/image (8).webp", name: "Indian Oil" },
  { logo: "/iNDUSTRIES LOGO/Oil india.webp", name: "Oil India" },
];

const allClients = [
  ...featuredClients,
  { logo: "/iNDUSTRIES LOGO/IRCTC.webp", name: "IRCTC" },
  { logo: "/iNDUSTRIES LOGO/RVNL.webp", name: "RVNL" },
  { logo: "/iNDUSTRIES LOGO/nalco.webp", name: "NALCO" },
  { logo: "/iNDUSTRIES LOGO/IMG.webp", name: "HAL" },
  { logo: "/iNDUSTRIES LOGO/image (1).webp", name: "NPCIL" },
  { logo: "/iNDUSTRIES LOGO/image (2).webp", name: "Coal India" },
  { logo: "/iNDUSTRIES LOGO/image (3).webp", name: "BEL" },
  { logo: "/iNDUSTRIES LOGO/image (4).webp", name: "Munitions India" },
  { logo: "/iNDUSTRIES LOGO/image (6).webp", name: "HMT" },
  { logo: "/iNDUSTRIES LOGO/image (7).webp", name: "BPCL" },
  { logo: "/iNDUSTRIES LOGO/image (9).webp", name: "NMDC" },
  { logo: "/iNDUSTRIES LOGO/image (11).webp", name: "Ministry of Defence" },
  { logo: "/iNDUSTRIES LOGO/image (13).webp", name: "Goa Shipyard" },
  { logo: "/iNDUSTRIES LOGO/image (14).webp", name: "Cochin Shipyard" },
  { logo: "/iNDUSTRIES LOGO/image (15).webp", name: "IIT ISM Dhanbad" },
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
  const [categories, setCategories] = React.useState([]);
  const [showAllClients, setShowAllClients] = React.useState(false);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          // Limit to first 6 categories as requested
          setCategories(data.slice(0, 6));
        }
      } catch (err) {
        console.error("Failed to fetch featured categories:", err);
      }
    }
    fetchCategories();
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
          <motion.h1 className="font-extrabold text-white leading-[1.05] mb-6" style={{ fontSize: "clamp(3.5rem, 7vw, 5rem)", fontFamily: "'Playfair Display', serif" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}>
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
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-border), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-border), transparent)" }} />
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

      {/* ═══ PRODUCT RANGE ═══ */}
      <section className="section-cinematic" style={{ background: "var(--color-background)" }}>
        <div className="absolute inset-0 z-0">
          <Image src="/services_hero_bg1.png" alt="LED Product Range" fill className="object-cover object-center" sizes="100vw" quality={85} />
          <div className="section-overlay" />
        </div>
        <div className="relative z-10 w-full px-6" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div className="text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <span className="inline-block text-[#4ADE80] text-xs font-bold uppercase tracking-[0.3em] mb-3">What We Offer</span>
            <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Our Product Range</h2>
            <p className="text-white/80 text-lg max-w-[550px] mx-auto">Premium LED lighting solutions engineered for performance, durability, and energy efficiency.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.33, 1, 0.68, 1] }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/15 p-8 rounded-2xl transition-all duration-500 hover:bg-white/10 hover:-translate-y-1.5 relative overflow-hidden h-full">
                  {/* Accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#166534] to-[#4ADE80] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="mb-5 text-[#4ADE80] transition-transform duration-300 group-hover:scale-110 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-3 text-white">{s.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="text-center mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
            <Link href="/product" className="btn-secondary">View All Products</Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ PRODUCTS (Now Categories) ═══ */}
      <section className="py-24" style={{ background: "var(--color-section)" }}>
        <div className="relative z-10 w-full px-6" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div className="text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="font-heading font-bold text-[color:var(--color-foreground)] mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Product <span className="gradient-text">Categories</span></h2>
            <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[600px] mx-auto">High-performance industrial lighting solutions manufactured for infrastructure and safety.</p>
          </motion.div>
 
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto" style={{ maxWidth: "1200px" }}>
              {categories.map((cat, i) => (
                <motion.div 
                  key={cat.id} 
                  variants={fadeUp} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  custom={i}
                >
                  <Link href={`/product/${cat.slug}`} className="block no-underline group h-full">
                    <div className="glass-card overflow-hidden h-full flex flex-col border border-[color:var(--color-border)] hover:border-[color:var(--color-primary)] transition-all duration-500 hover:shadow-2xl">
                      <div className="relative h-[250px] overflow-hidden">
                        <Image 
                          src={cat.image || "/placeholder-image.jpg"} 
                          alt={cat.name} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110" 
                          sizes="(max-width: 768px) 100vw, 33vw" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-heading font-bold text-xl mb-3 text-[color:var(--color-foreground)] group-hover:text-[color:var(--color-primary)] transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed line-clamp-2 mb-4">
                          {cat.description}
                        </p>
                        <div className="mt-auto pt-4 border-t border-[color:var(--color-border)]/10 text-xs font-bold text-[color:var(--color-primary)] uppercase tracking-wider flex items-center gap-2">
                          Explore Category <span>→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="h-[250px] flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[color:var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
 
          <motion.div className="text-center mt-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Link href="/product" className="btn-primary">View All Categories</Link>
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

      {/* ═══ TRUSTED BY — Company Logos ═══ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-section)" }}>
        {/* Subtle warm accent glow */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #F59E0B, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #166534, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-border), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-border), transparent)" }} />
        
        <div className="relative z-10 w-full px-6" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div className="text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="inline-block text-[color:var(--color-primary)] text-xs font-bold uppercase tracking-[0.3em] mb-4">Our Esteemed Clients</span>
            <h2 className="font-heading font-bold text-[color:var(--color-foreground)] mb-5" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>
              Trusted By India&apos;s <span className="gradient-text">Leading Organizations</span>
            </h2>
            <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[550px] mx-auto leading-relaxed">
              Proudly serving India&apos;s most prestigious government and private sector organizations with world-class engineering solutions.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 mx-auto" 
            style={{ maxWidth: "900px" }}
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          >
            {featuredClients.map((client, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="group"
              >
                <div className="bg-[color:var(--color-bg-card)] rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center gap-3 border border-[color:var(--color-border)] transition-all duration-500 hover:shadow-xl hover:scale-[1.03] hover:border-[color:var(--color-primary)]/30 h-[120px] md:h-[150px]">
                  <div className="relative w-[60px] h-[60px] md:w-[80px] md:h-[80px] flex items-center justify-center">
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-[color:var(--color-text-secondary)] text-[0.65rem] md:text-xs font-bold uppercase tracking-wider text-center leading-tight">{client.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center mt-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <button 
              onClick={() => setShowAllClients(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[color:var(--color-primary)]/30 text-[color:var(--color-primary)] font-bold text-sm hover:bg-[color:var(--color-primary)]/5 hover:border-[color:var(--color-primary)] transition-all duration-300 cursor-pointer bg-transparent"
            >
              View All {allClients.length}+ Clients
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── All Clients Modal ── */}
      <AnimatePresence>
        {showAllClients && (
          <motion.div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAllClients(false)} />
            <motion.div 
              className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#0F172A]">Our Esteemed Clients</h3>
                  <p className="text-sm text-[#64748B] mt-1">{allClients.length} organizations trust Sudeep Engineers</p>
                </div>
                <button 
                  onClick={() => setShowAllClients(false)} 
                  className="p-2 rounded-full hover:bg-[#F1F5F9] transition-colors bg-transparent border-none cursor-pointer"
                >
                  <X size={20} className="text-[#64748B]" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(85vh - 80px)" }}>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {allClients.map((client, i) => (
                    <div 
                      key={i} 
                      className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:border-[#38BDF8]/30 hover:scale-[1.03] transition-all duration-300 h-[120px]"
                    >
                      <div className="relative w-[50px] h-[50px] flex items-center justify-center">
                        <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <span className="text-[#334155] text-[0.6rem] font-bold uppercase tracking-wider text-center leading-tight">{client.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
