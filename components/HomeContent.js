"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FileCheck, X } from "lucide-react";
import { motion } from "framer-motion";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQ from "@/components/FAQ";
import { supabase } from "@/lib/supabase";

const services = [
  { image: "/main/wiki-LED_street_light.webp", title: "LED Street Lights", desc: "High-efficiency street lighting for urban & highway infrastructure.", link: "/led-light-manufacturer-aurangabad" },
  { image: "/main/floodlight.webp", title: "LED Flood Lights", desc: "Powerful flood lighting for stadiums, warehouses, and industrial areas.", link: "/product" },
  { image: "/main/highbay.webp", title: "LED HighBay Lights", desc: "Premium high-bay lighting for factories and large indoor spaces.", link: "/product" },
  { image: "/main/solarled.webp", title: "Solar Street Lights", desc: "Self-sustained solar-powered street lighting for eco-friendly installations.", link: "/solar-street-light-manufacturer" },
  { image: "/main/highmastclean.webp", title: "LED Highmast", desc: "Towering highmast lighting systems for highways and airports.", link: "/street-light-pole-manufacturer" },
  { image: "/main/solarhighmast.webp", title: "Solar Highmast", desc: "Solar-powered highmast lighting for remote and off-grid locations.", link: "/solar-street-light-manufacturer" }
];

const featuredClients = [
  { logo: "/iNDUSTRIES LOGO/BHEL.webp", name: "BHEL" },
  { logo: "/iNDUSTRIES LOGO/NTPC.webp", name: "NTPC" },
  { logo: "/iNDUSTRIES LOGO/RAIL.webp", name: "Indian Railways" },
  { logo: "/iNDUSTRIES LOGO/ongc.webp", name: "ONGC" },
  { logo: "/iNDUSTRIES LOGO/gail.webp", name: "GAIL" },
  { logo: "/iNDUSTRIES LOGO/image (5).webp", name: "SAIL" },
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

export default function HomeContent() {
  const [categories, setCategories] = useState([]);
  const [showAllClients, setShowAllClients] = useState(false);

  const OFFICIAL_DOCUMENTS = [
    { file: "BIS CERTIFICATE SUDEEP Flood Light.pdf", title: "BIS Certificate — Flood Lights" },
    { file: "BIS CERTIFICATE SUDEEP HIBAY LIGHTS.pdf", title: "BIS Certificate — Highbay" },
    { file: "BIS CERTIFICATE SUDEEP LED DRIVER .pdf", title: "BIS Certificate — LED Driver" },
    { file: "BIS CERTIFICATE SUDEEP STREET LIGHT.pdf", title: "BIS Certificate — Street Light" },
    { file: "ISO CERTIFICATE.pdf", title: "ISO 9001:2015 Certificate" },
    { file: "SUDEEP BIFMA.pdf", title: "BIFMA Standards Compliance" },
    { file: "TRADEMARK CERTIFICATE.pdf", title: "Trademark Registration" },
  ];

  useEffect(() => {
    if (showAllClients) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showAllClients]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('sequence', { ascending: true });
          
        if (error) {
          console.error("Supabase Error [HomeContent]:", error.message, error.details, error.hint);
          throw error;
        }
        if (data) setCategories(data);
      } catch (err) {
        console.error("Failed to fetch featured categories:", err);
      }
    }
    fetchCategories();
  }, []);

  // Duplicate for infinite scroll
  const marqueeClients = [...allClients, ...allClients];

  return (
    <>
      {/* ═══ PRODUCT RANGE ═══ */}
      <section className="py-20 md:py-28 bg-white" id="products" aria-label="Product range">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-green-600 mb-4 block">What We Build</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">Our Product Range</h2>
            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Engineered for high-performance infrastructure across India.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="group bg-white rounded-2xl border border-slate-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                  <div className="aspect-[4/3] bg-slate-50 flex items-center justify-center p-6 overflow-hidden">
                    <img src={s.image} alt={s.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                    <Link href={s.link} className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors inline-flex items-center gap-1.5 group/link">
                      View Details <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/product" className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition-colors">
              Browse All Products <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="py-20 md:py-28 bg-slate-50" id="categories" aria-label="Product categories">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-green-600 mb-4 block">Product Lines</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">Categories</h2>
            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Explore our dynamic product categories.
            </p>
          </motion.div>
 
          {categories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                >
                  <Link href={`/product/${cat.slug}`} className="group block bg-white rounded-xl border border-slate-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1 flex flex-col">
                    <div className="aspect-[4/3] bg-slate-50 p-4 flex items-center justify-center relative">
                      <img 
                        src={cat.image || "https://placehold.co/600x400/f8fafc/94a3b8?text=Category"} 
                        alt={cat.name} 
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" 
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-sm md:text-base text-slate-900 mb-1 group-hover:text-green-700 transition-colors line-clamp-1">
                          {cat.name}
                        </h3>
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">
                          {cat.description || "View details and specifications"}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-green-600 inline-flex items-center gap-1">
                        View <span className="hidden sm:inline">Specifications</span> <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="h-[200px] flex items-center justify-center bg-white rounded-2xl border border-slate-100">
              <span className="text-slate-400 font-medium text-sm">Loading Categories...</span>
            </div>
          )}
        </div>
      </section>

      {/* ═══ TRUSTED CLIENTS — Infinite Marquee ═══ */}
      <section className="py-20 md:py-28 bg-white" id="clients" aria-label="Trusted clients">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-green-600 mb-4 block">Our Clients</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">Trusted by India&apos;s Leading Institutions</h2>
            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Powering infrastructure for government and private sector organizations nationwide.
            </p>
          </motion.div>

          {/* Infinite scrolling logo marquee */}
          <div className="logo-scroll-container mb-10">
            <div className="logo-scroll-track">
              {marqueeClients.map((client, i) => (
                <div key={i} className="flex-none w-28 md:w-36 mx-3 md:mx-4 bg-slate-50 rounded-xl p-4 md:p-5 flex flex-col items-center justify-center gap-3 hover:bg-white hover:shadow-md transition-all duration-300 aspect-square">
                  <img src={client.logo} alt={client.name} className="w-12 md:w-16 h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                  <span className="text-slate-500 text-[9px] md:text-[10px] font-semibold uppercase tracking-wider text-center">{client.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button onClick={() => setShowAllClients(true)} className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-green-600 border border-green-200 rounded-full hover:bg-green-50 transition-all">
              View All {allClients.length} Clients →
            </button>
          </div>

          {/* ═══ CERTIFICATIONS ═══ */}
          <div className="mt-24">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-green-600 mb-4 block">Compliance</span>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">Accreditation &amp; Certifications</h3>
              <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto">Industrial-grade certifications for mission-critical infrastructure.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {OFFICIAL_DOCUMENTS.map((doc, i) => (
                <a 
                  key={i} 
                  href={`/certifications/${doc.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 bg-slate-50 rounded-xl hover:bg-white hover:shadow-md border border-transparent hover:border-green-100 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    <FileCheck size={20} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-green-700 transition-colors truncate">{doc.title}</h4>
                    <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">View PDF →</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── All Clients Modal ── */}
      {showAllClients && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAllClients(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Our Clients</h3>
                <p className="text-sm text-slate-500 mt-1">{allClients.length} organizations trust Sudeep Engineers</p>
              </div>
              <button 
                onClick={() => setShowAllClients(false)} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(85vh - 85px)" }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {allClients.map((client, i) => (
                  <div 
                    key={i} 
                    className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-white hover:shadow-md transition-all h-[120px]"
                  >
                    <img src={client.logo} alt={client.name} className="w-14 h-14 object-contain" />
                    <span className="text-slate-600 text-[10px] font-semibold uppercase tracking-wider text-center">{client.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TESTIMONIALS & FAQ ═══ */}
      <section className="py-20 md:py-28 bg-slate-50" aria-label="Testimonials and FAQ">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <div>
            <div className="mb-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-green-600 mb-3 block">Reviews</span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">What Our Clients Say</h2>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8">
              <TestimonialSlider />
            </div>
          </div>
          <div>
            <div className="mb-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400 mb-3 block">Support</span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            </div>
            <FAQ />
          </div>
        </div>
      </section>
    </>
  );
}
