"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lightbulb, Wrench, Shield, CheckCircle, Users, Award, ShieldCheck, FileCheck, Landmark, X } from "lucide-react";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQ from "@/components/FAQ";
import { supabase } from "@/lib/supabase";

const services = [
  { image: "/main/wiki-LED_street_light.webp", icon: <Lightbulb size={24} />, title: "LED Street Light Luminaries", desc: "High-efficiency street lighting solutions for urban & highway infrastructure." },
  { image: "/main/floodlight.webp", icon: <Lightbulb size={24} />, title: "LED Flood Light Luminaries", desc: "Powerful flood lighting for stadiums, warehouses, and industrial areas." },
  { image: "/main/highbay.webp", icon: <Lightbulb size={24} />, title: "LED HighBay Lights", desc: "Premium high-bay lighting for factories, warehouses, and large indoor spaces." },
  { image: "/main/solarled.webp", icon: <Wrench size={24} />, title: "LED Solar Street Lights", desc: "Self-sustained solar-powered street lighting for eco-friendly installations." },
  { image: "/main/highmastclean.webp", icon: <Shield size={24} />, title: "LED Highmast", desc: "Towering highmast lighting systems for highways, airports, and large areas." },
  { image: "/main/solarhighmast.webp", icon: <Wrench size={24} />, title: "LED Solar Highmast", desc: "Solar-powered highmast lighting for remote and off-grid locations." }
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

  // OFFICIAL PDF DOCUMENTS (New structure matching the user's uploaded files)
  const OFFICIAL_DOCUMENTS = [
    { file: "BIS CERTIFICATE SUDEEP Flood Light.pdf", title: "BIS Certificate (Flood Lights)" },
    { file: "BIS CERTIFICATE SUDEEP HIBAY LIGHTS.pdf", title: "BIS Certificate (Highbay)" },
    { file: "BIS CERTIFICATE SUDEEP LED DRIVER .pdf", title: "BIS Certificate (LED Driver)" },
    { file: "BIS CERTIFICATE SUDEEP STREET LIGHT.pdf", title: "BIS Certificate (Street Light)" },
    { file: "ISO CERTIFICATE.pdf", title: "ISO 9001:2015 Certificate" },
    { file: "SUDEEP BIFMA.pdf", title: "BIFMA Standards Compliance" },
    { file: "TRADEMARK CERTIFICATE.pdf", title: "Trademark Registration" },
  ];

  // Scroll Lock Strategy
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
          .order('sequence', { ascending: true })
          .limit(6);
          
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

  return (
    <>
      {/* ═══ OEM/ODM & CERTIFICATION RIBBON ═══ */}
      <section className="bg-emerald-800 py-6 border-b border-emerald-900 text-white">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-300" />
            <span className="text-sm font-semibold tracking-wide uppercase">ISO 9001:2015 Certified</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-emerald-600"></div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <span className="text-sm font-semibold tracking-wide uppercase">MSME Registered OEM</span>
          </div>
          <div className="hidden lg:block w-px h-4 bg-emerald-600"></div>
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-300" />
            <span className="text-sm font-semibold tracking-wide uppercase">GeM Registered</span>
          </div>
          <div className="hidden xl:block w-px h-4 bg-emerald-600"></div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-300" />
            <span className="text-sm font-semibold tracking-wide uppercase">B2B & Bulk Manufacturing</span>
          </div>
        </div>
      </section>

      {/* ═══ OUR PRODUCT RANGE (CATALOG GRID) ═══ */}
      <section className="py-12 bg-white border-b border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-12 border-l-4 border-emerald-600 pl-4 w-full flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight mb-2 uppercase">Main Product Range</h2>
              <p className="text-zinc-500 text-lg">Engineered for uncompromising high-performance infrastructure.</p>
            </div>
            <Link href="/product" className="hidden md:flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors uppercase tracking-wider text-sm">
              View All Series <span className="text-lg">➔</span>
            </Link>
          </div>

          <div className="mb-12 relative">

            {/* Banner Image */}
            <div className="mb-12 w-full overflow-hidden border border-zinc-200 bg-zinc-50">
              <img 
                src="/services_hero_bg1.png" 
                alt="Sudeep Engineers Infrastructure Lighting" 
                className="w-full h-auto object-contain" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 border-t border-l border-zinc-200">
              {services.map((s, i) => (
                <div key={i} className="bg-white p-6 border-r border-b border-zinc-200 hover:bg-zinc-50 transition-colors group flex flex-col items-start text-left cursor-default">
                  <div className="w-full h-[180px] bg-white border border-zinc-100 mb-6 flex items-center justify-center overflow-hidden p-4 group-hover:border-emerald-200 transition-colors">
                    <img src={s.image} alt={s.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="text-emerald-700 mb-4 bg-emerald-50 p-2.5 w-10 h-10 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    {s.icon}
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900 mb-2 uppercase tracking-wide">{s.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6 flex-grow">{s.desc}</p>
                  <Link href="/product" className="text-sm font-bold text-emerald-600 hover:text-emerald-800 uppercase tracking-wider flex items-center gap-2 mt-auto">
                    View Specs <span className="transform group-hover:translate-x-1 transition-transform">➔</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORY SERIES (CATALOG LOOK) ═══ */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-200 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="mb-12 border-l-4 border-emerald-600 pl-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight uppercase mb-2">Categories</h2>
              <p className="text-zinc-500 text-lg">Dynamic product categories fetched natively.</p>
            </div>
          </div>
 
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, i) => (
                <Link key={cat.id} href={`/product/${cat.slug}`} className="block group bg-white border border-zinc-200 hover:border-emerald-600 transition-colors">
                  <div className="relative h-[220px] bg-white p-4 border-b border-zinc-100 flex items-center justify-center">
                    <img 
                      src={cat.image || "https://placehold.co/600x400/f1f5f9/64748b?text=Category+Image"} 
                      alt={cat.name} 
                      className="max-w-full max-h-full object-contain" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-zinc-900 mb-2 uppercase tracking-wide group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mb-4">
                      {cat.description}
                    </p>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
                      View Specifications ➔
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="h-[200px] flex items-center justify-center bg-white border border-zinc-200">
              <span className="text-zinc-400 font-semibold tracking-widest uppercase text-sm">Loading Categories...</span>
            </div>
          )}
        </div>
      </section>

      {/* ═══ TRUSTED CLIENTS (TECHNICAL GRID) ═══ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-12 border-l-4 border-emerald-600 pl-4 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
            <div>
              <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight uppercase mb-2">Trusted By Major Organizations</h2>
              <p className="text-zinc-500 text-lg">Powering infrastructure for India's leading institutions.</p>
            </div>
            <button onClick={() => setShowAllClients(true)} className="btn-secondary btn-secondary-dark flex items-center gap-2 shrink-0">
              View All Clients ➔
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-l border-zinc-200">
            {featuredClients.map((client, i) => (
              <div key={i} className="bg-white p-6 border-r border-b border-zinc-200 flex flex-col items-center justify-center gap-4 hover:bg-zinc-50 transition-colors h-[140px]">
                <img src={client.logo} alt={client.name} className="max-w-[80px] max-h-[60px] object-contain transition-all duration-300" />
                <span className="text-zinc-500 text-[0.65rem] font-bold uppercase tracking-wider text-center">{client.name}</span>
              </div>
            ))}
          </div>

          {/* ═══ ACCREDITATION & COMPLIANCE ═══ */}
          <div className="mt-20">
            <div className="mb-10 text-center">
              <h3 className="text-xl font-bold text-zinc-900 uppercase tracking-widest mb-2">Accreditation & Compliance</h3>
              <p className="text-zinc-500 text-sm">Industrial grade certifications for mission-critical infrastructure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {OFFICIAL_DOCUMENTS.map((doc, i) => (
                <a 
                  key={i} 
                  href={`/certifications/${doc.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white border border-zinc-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)] hover:border-emerald-500/50 transition-all duration-500 flex flex-col no-underline rounded-xl overflow-hidden"
                >
                  {/* Premium Document Preview Area */}
                  <div className="w-full h-[280px] bg-zinc-50 flex items-center justify-center relative overflow-hidden group-hover:bg-emerald-50/30 transition-colors">
                     {/* Decorative Background Pattern */}
                     <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#10b981 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                     
                     {/* The 'Vault' Card */}
                     <div className="relative w-44 h-56 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-zinc-100 flex flex-col p-6 items-center justify-center gap-6 transition-all duration-700 group-hover:scale-105 group-hover:-rotate-1">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                           <FileCheck size={32} strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col gap-1.5 w-full">
                           <div className="h-1.5 w-full bg-zinc-100 rounded-full"></div>
                           <div className="h-1.5 w-3/4 bg-zinc-50 rounded-full"></div>
                           <div className="h-1.5 w-1/2 bg-zinc-50 rounded-full"></div>
                        </div>
                        
                        {/* Official Seal Mockup */}
                        <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-emerald-100 rounded-full flex items-center justify-center opacity-30 group-hover:opacity-100 group-hover:border-emerald-500 transition-all duration-700">
                           <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100"></div>
                        </div>
                     </div>

                     {/* Glass Overlay on Hover */}
                     <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-emerald-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     
                     {/* Premium Shine Effect */}
                     <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  </div>

                  {/* High-Authority Meta Area */}
                  <div className="p-8 bg-white border-t border-zinc-100 flex flex-col gap-5 relative">
                    <div className="flex items-center gap-3">
                       <span className="flex h-2 w-2 relative">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                       </span>
                       <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.3em]">Verified Credential</span>
                    </div>

                    <div>
                       <h4 className="text-[1.05rem] font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors uppercase tracking-tight leading-snug">
                         {doc.title}
                       </h4>
                       <p className="text-[11px] text-zinc-400 font-bold mt-2 uppercase tracking-widest flex items-center gap-2">
                          <Landmark size={12} className="text-zinc-300" /> Government Compliance Standard
                       </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-5 border-t border-zinc-100">
                       <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                         Review PDF <span className="text-sm">➔</span>
                       </div>
                       <span className="text-[9px] font-mono text-zinc-300">REF_{2024}_0{i+1}</span>
                    </div>
                  </div>

                  {/* Subtle Accent Line */}
                  <div className="h-1 w-0 bg-emerald-500 group-hover:w-full transition-all duration-700" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>




      {/* ── All Clients Modal (B2B Style) ── */}
      {showAllClients && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setShowAllClients(false)} />
          <div className="relative bg-white border border-slate-200 w-full max-w-5xl max-h-[85vh] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
              <div>
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Our Esteemed Clients</h3>
                <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-widest">{allClients.length} Organizations Trust Sudeep Engineers</p>
              </div>
              <button 
                onClick={() => setShowAllClients(false)} 
                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-300 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(85vh - 85px)" }}>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-0 border-t border-l border-slate-200">
                {allClients.map((client, i) => (
                  <div 
                    key={i} 
                    className="bg-white p-4 flex flex-col items-center justify-center gap-4 hover:bg-slate-50 transition-colors h-[130px] border-r border-b border-slate-200 group"
                  >
                    <div className="h-[50px] flex items-center justify-center">
                      <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain transition-all duration-300" />
                    </div>
                    <span className="text-slate-700 text-[0.65rem] font-bold uppercase tracking-wider text-center flex-shrink-0 group-hover:text-emerald-700 transition-colors">{client.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ OFFICIAL GOVERNMENT PARTNER ═══ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1000px] mx-auto px-6 flex flex-col items-center justify-center gap-8">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] text-center mb-2">Registered Official Government Partner</span>
          <div className="flex justify-center w-full hover:scale-105 transition-transform duration-500">
            <img 
              src="/gem-official.svg" 
              className="h-[120px] sm:h-[160px] md:h-[200px] w-auto drop-shadow-lg" 
              alt="GeM Marketplace | Official Channel Partner" 
            />
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS & FAQ ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-8 border-l-4 border-emerald-600 pl-4 text-left">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">Client Testimonials</h2>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-8">
              <TestimonialSlider />
            </div>
          </div>
          <div>
            <div className="mb-8 border-l-4 border-slate-800 pl-4 text-left">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">Frequently Asked Questions</h2>
            </div>
            <FAQ />
          </div>
        </div>
      </section>
    </>
  );
}
