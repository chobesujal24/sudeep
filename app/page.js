import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import StatsBar from "@/components/StatsBar";
import CTABanner from "@/components/CTABanner";
import HomeContent from "@/components/HomeContent";
import BigImageGallery from "@/components/BigImageGallery";

/*
 * HomePage — Server Component.
 *
 * The Hero section features an automated, premium crossfade HeroSlider background.
 * Below the hero: StatsBar, BentoGrid Services, existing sections, WhyUs, CTA.
 */
export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════
          B2B/B2C PREMIUM HERO SECTION
          ═══════════════════════════════════════ */}
      <div className="relative w-full h-[90vh] min-h-[650px] pt-[80px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <HeroSlider />
        </div>
        
        {/* Advanced Ambient Backdrop overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-transparent backdrop-blur-[1px]" />
        
        {/* Central UI */}
        <div className="relative z-10 w-full px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Glowing B2B Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest leading-none">
              India's Premier Lighting OEM
            </span>
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.3em] mb-4 text-zinc-300">
            Domestic & Industrial Lighting Solutions
          </p>

          {/* Epic Typography Engine */}
          <h1 className="font-extrabold text-white leading-[1.1] mb-6 font-heading tracking-tight flex flex-col items-center">
            <div className="flex items-center gap-3 md:gap-4 mb-2">
              <span className="bg-gradient-to-r from-zinc-100 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-lg font-serif" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>SUDEEP</span>
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(16,185,129,0.4)] font-serif" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>ENGINEERS</span>
            </div>
            <div className="text-lg md:text-2xl font-light tracking-[0.3em] text-zinc-300 uppercase flex items-center gap-3 md:gap-5 mt-2">
              <span className="drop-shadow-sm">Save Energy</span>
              <span className="text-emerald-400/80 text-sm">✦</span>
              <span className="drop-shadow-sm">Save the World</span>
            </div>
          </h1>

          <p className="text-zinc-300 text-lg md:text-xl md:leading-relaxed font-light max-w-3xl mb-12 drop-shadow-md">
            The uncompromising OEM manufacturer of high-performance <strong className="font-semibold text-white">LED Street lights, Flood lights, Highbay systems, and Industrial Solar Infrastructure</strong>. Engineered for B2B excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
            <Link href="/contact" className="group relative px-8 py-4 bg-emerald-600 text-white text-sm font-bold uppercase tracking-wider overflow-hidden rounded-sm transition-all hover:bg-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-500">
              <span className="relative z-10 flex items-center gap-2">Request OEM Quote <span className="text-lg group-hover:translate-x-1 transition-transform">➔</span></span>
            </Link>
            <Link href="/product" className="group px-8 py-4 bg-white/5 border border-white/20 backdrop-blur-md text-white text-sm font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white/40 transition-all rounded-sm shadow-xl">
              <span className="flex items-center gap-2">Explore Catalog <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">➔</span></span>
            </Link>
          </div>
        </div>
        
        {/* Floating Trust Bar (Glassmorphism) docked to bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-slate-950/60 backdrop-blur-xl">
          <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4 text-[10px] md:text-xs font-semibold text-zinc-300 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span> ISO 9001:2015
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span> MSME Registered
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span> Govt. GeM Approved
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-emerald-400">✓</span> 500+ Projects
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-emerald-400">✓</span> PAN India Delivery
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          STATS BAR — Animated Counters
          ═══════════════════════════════════════ */}
      <StatsBar />

      {/* ═══════════════════════════════════════
          NEW BIG IMAGE SHOWCASE
          ═══════════════════════════════════════ */}
      <BigImageGallery />

      {/* ═══════════════════════════════════════
          EXISTING SECTIONS — Clients, Products, FAQ, Testimonials
          ═══════════════════════════════════════ */}
      <HomeContent />

      {/* ═══════════════════════════════════════
          CTA BANNER — Pre-Footer
          ═══════════════════════════════════════ */}
      <CTABanner />
    </>
  );
}
