import Link from "next/link";
import { Lightbulb, SunDim, Factory, Sun, Wrench, TowerControl } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import StatsBar from "@/components/StatsBar";
import HomeContent from "@/components/HomeContent";
import BigImageGallery from "@/components/BigImageGallery";
import WhyUs from "@/components/WhyUs";
import CTABanner from "@/components/CTABanner";

export const metadata = {
  title: "Sudeep Engineers — LED Street Light, Flood Light, Solar Light & Pole Manufacturer in India | Aurangabad",
  description:
    "India's leading manufacturer of LED street lights, LED flood lights, LED highbay lights, solar street lights, highmast poles, octagonal poles, and solar infrastructure. ISO 9001:2015 certified, BIS approved, GeM registered. Serving BHEL, NTPC, Indian Railways from Waluj MIDC, Aurangabad, Maharashtra.",
  openGraph: {
    title: "Sudeep Engineers — LED Street Light, Flood Light & Solar Manufacturer India",
    description:
      "ISO 9001:2015 certified manufacturer of LED street lights, flood lights, highbay lights, solar street lights, highmast poles & octagonal poles. OEM manufacturer from Aurangabad, Maharashtra.",
    url: "https://sudeepengineers.com",
  },
};

/*
 * HomePage — Server Component.
 * Clean, professional homepage with proper SEO structure.
 */
export default function HomePage() {
  return (
    <article itemScope itemType="https://schema.org/WebPage">
      {/* ═══ HERO ═══ */}
      <section
        id="hero"
        className="relative w-full h-screen min-h-[600px] max-h-[1000px] flex items-center justify-center overflow-hidden bg-slate-950"
        aria-label="Hero section"
      >
        <div className="absolute inset-0 z-0">
          <HeroSlider />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Central content */}
        <div className="relative z-10 w-full px-6 text-center max-w-5xl mx-auto flex flex-col items-center">

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold text-white/80 uppercase tracking-[0.2em] leading-none">
              ISO 9001:2015 Certified &bull; BIS Approved
            </span>
          </div>

          {/* Company name */}
          <h1 className="font-extrabold text-white leading-[1.05] mb-6 tracking-tight" itemProp="name">
            <span className="block text-white" style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)" }}>
              SUDEEP ENGINEERS
            </span>
            <span className="block text-base md:text-xl font-medium tracking-[0.35em] text-white/50 uppercase mt-3">
              LED &amp; Solar Infrastructure Manufacturer
            </span>
          </h1>

          <p className="text-white/70 text-base md:text-lg md:leading-relaxed font-light max-w-2xl mb-10 text-center" itemProp="description">
            India&apos;s trusted OEM manufacturer of high-performance LED Street Lights, Flood Lights, 
            Highbay Systems, and Solar Infrastructure — serving BHEL, NTPC, Indian Railways &amp; 500+ projects nationwide.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-green-600 text-white text-sm font-semibold uppercase tracking-widest rounded hover:bg-green-500 transition-all duration-300 min-w-[200px]"
            >
              Request OEM Quote
            </Link>
            <Link
              href="/product"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold uppercase tracking-widest rounded hover:bg-white/20 transition-all duration-300 min-w-[200px]"
            >
              Explore Catalog
            </Link>
          </div>
        </div>

        {/* Bottom trust bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-black/30 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-center items-center gap-8 md:gap-12 text-[10px] md:text-[11px] font-medium text-white/40 uppercase tracking-[0.2em]">
            <span>MSME Registered</span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="hidden sm:inline">500+ Projects</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span className="hidden md:inline">PAN India Delivery</span>
            <span className="hidden lg:inline text-white/10">|</span>
            <span className="hidden lg:inline">GeM Approved</span>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <StatsBar />

      {/* ═══ WHY US ═══ */}
      <WhyUs />

      {/* ═══ GALLERY ═══ */}
      <BigImageGallery />

      {/* ═══ MAIN CONTENT ═══ */}
      <HomeContent />

      {/* ═══ CTA ═══ */}
      <CTABanner />

      {/* ═══ SEO CONTENT BLOCK ═══ */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100" aria-label="About our products and manufacturing">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-green-700 bg-green-50 border border-green-200 px-4 py-1.5 rounded-full mb-4">Complete Product Range</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              LED Street Light, Solar Light &amp; Pole Manufacturer in India
            </h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              <strong>Sudeep Engineers</strong> is a leading <strong>LED street light manufacturer</strong> and <strong>solar street light manufacturer</strong> based in Waluj MIDC, Aurangabad, Maharashtra.
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { icon: <Lightbulb className="w-6 h-6" />, title: "LED Street Lights", desc: "20W to 200W LED street lights for highways, urban roads, and residential colonies. IP66 rated, BIS certified with precision optics." },
              { icon: <SunDim className="w-6 h-6" />, title: "LED Flood Lights", desc: "50W to 500W industrial LED flood lights for stadiums, warehouses, factory yards, and building facades. IP65 rated." },
              { icon: <Factory className="w-6 h-6" />, title: "LED Highbay Lights", desc: "LED highbay lights for warehouses, factories, and industrial facilities. Energy savings up to 70% with 50,000+ hour lifespan." },
              { icon: <Sun className="w-6 h-6" />, title: "Solar Street Lights", desc: "All-in-one and split-type solar street lights with lithium battery, MPPT controller, and high-lumen LED for off-grid lighting." },
              { icon: <Wrench className="w-6 h-6" />, title: "Octagonal & Conical Poles", desc: "Hot-dip galvanized octagonal poles (4m–12m), conical poles, swaged poles, and decorative poles for street light mounting." },
              { icon: <TowerControl className="w-6 h-6" />, title: "Highmast Poles", desc: "Highmast lighting poles (15m–35m) with raising & lowering mechanism for highway interchanges, airports, and stadiums." },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-green-300 hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center text-green-700 mb-4">{item.icon}</div>
                <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-green-700 transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Two Column: Content + Credentials */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
            
            {/* Left: Rich Content */}
            <div className="text-slate-600 text-sm md:text-[15px] leading-relaxed space-y-6">
              <h3 className="text-lg font-bold text-slate-800">Solar Street Lights &amp; Solar Infrastructure</h3>
              <p>
                As a <strong>solar street light manufacturer in India</strong>, we offer <strong>all-in-one solar street lights</strong>, 
                <strong> integrated solar street lights</strong>, <strong>split-type solar LED street lights</strong>, and <strong>solar highmast lighting systems</strong>. 
                Our solar products include high-efficiency solar panels, lithium-ion batteries, MPPT charge controllers, and LED luminaires — 
                designed for <strong>off-grid street lighting</strong> in rural areas, highways, and remote locations. We also provide <strong>solar EPC services</strong>.
              </p>

              <h3 className="text-lg font-bold text-slate-800">Lighting Poles &amp; Infrastructure</h3>
              <p>
                Sudeep Engineers is a trusted <strong>lighting pole manufacturer</strong> in India. We manufacture <strong>octagonal poles</strong> (4m to 12m), 
                <strong> conical poles</strong>, <strong>swaged poles</strong>, <strong>decorative poles</strong>, <strong>street light poles</strong>, and 
                <strong> highmast poles</strong> (15m to 35m) with raising and lowering mechanisms. All poles are <strong>hot-dip galvanized</strong> as per IS 4759.
              </p>

              <h3 className="text-lg font-bold text-slate-800">Industries &amp; Applications</h3>
              <p>
                Our <strong>LED lighting</strong> and <strong>solar lighting products</strong> serve 
                <strong> highway and road lighting</strong>, <strong>smart city infrastructure</strong>, <strong>industrial and warehouse lighting</strong>, 
                <strong> stadium and sports flood lighting</strong>, <strong>parking area lighting</strong>, <strong>railway station lighting</strong>, 
                <strong> airport perimeter lighting</strong>, <strong>garden and landscape lighting</strong>, 
                and <strong>residential colony lighting</strong>. We deliver complete turnkey <strong>street lighting infrastructure</strong> — poles, foundations, wiring, and commissioning.
              </p>
            </div>

            {/* Right: Credentials Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 sticky top-28">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-6">Why Choose Us</h3>
              <ul className="space-y-4 text-sm">
                {[
                  { label: "ISO 9001:2015", sub: "Certified Quality" },
                  { label: "BIS Certified", sub: "LED Street, Flood, Highbay, Drivers" },
                  { label: "GeM Registered", sub: "Govt e-Marketplace Approved" },
                  { label: "MSME / Udyam", sub: "Micro Enterprise" },
                  { label: "500+ Projects", sub: "PAN India Delivery" },
                  { label: "OEM / ODM", sub: "Custom Manufacturing" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">✓</span>
                    <div>
                      <div className="font-semibold text-white">{item.label}</div>
                      <div className="text-white/50 text-xs">{item.sub}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block w-full mt-8 py-3 bg-green-600 text-white text-center text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-green-500 transition-colors no-underline">
                Get OEM Quote →
              </Link>
            </div>
          </div>

          {/* Bottom trust line */}
          <p className="mt-12 pt-8 border-t border-slate-100 text-slate-400 text-sm text-center">
            Sudeep Engineers — Trusted by BHEL, NTPC, Indian Railways, ONGC &amp; 20+ PSUs for LED street lights, flood lights, solar street lights, octagonal poles &amp; highmast poles.
          </p>
        </div>
      </section>
    </article>
  );
}
