import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import StatsBar from "@/components/StatsBar";
import CTABanner from "@/components/CTABanner";
import HomeContent from "@/components/HomeContent";
import BigImageGallery from "@/components/BigImageGallery";

/*
 * HomePage — Server Component.
 * Premium $100M minimalist homepage with clean typography and generous whitespace.
 */
export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════
          HERO — Full-screen cinematic
          ═══════════════════════════════════════ */}
      <div className="relative w-full h-screen min-h-[600px] max-h-[1000px] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <HeroSlider />
        </div>
        
        {/* Clean gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/80" />
        
        {/* Central content */}
        <div className="relative z-10 w-full px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Glowing B2B Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest leading-none">
              India's Premier Lighting OEM Solutions
            </span>
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.3em] mb-4 text-zinc-300">
            Domestic & Industrial Lighting Solutions
          </p>

          {/* Epic Typography Engine */}
          <h1 className="font-extrabold text-white leading-[1.1] mb-6 tracking-tight flex flex-col items-center">
            <div className="flex items-center gap-3 md:gap-4 mb-2">
              <span className="bg-gradient-to-r from-zinc-100 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-lg" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>SUDEEP</span>
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>ENGINEERS</span>
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

          {/* Clean CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-emerald-500 text-white text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-emerald-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] min-w-[200px]"
            >
              Request OEM Quote
            </Link>
            <Link
              href="/product"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-white/20 transition-all duration-300 min-w-[200px]"
            >
              Explore Catalog
            </Link>
          </div>
        </div>
        
        {/* Bottom trust bar — minimal, clean */}
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-slate-950/40 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-center items-center gap-8 md:gap-12 text-[10px] md:text-[11px] font-medium text-white/40 uppercase tracking-[0.2em]">
            <span>MSME Registered</span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="hidden sm:inline">500+ Projects</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span className="hidden md:inline">PAN India Delivery</span>
            <span className="hidden lg:inline text-white/10">|</span>
            <span className="hidden lg:inline">7+ Years</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          STATS BAR
          ═══════════════════════════════════════ */}
      <StatsBar />

      {/* ═══════════════════════════════════════
          PRODUCT GALLERY
          ═══════════════════════════════════════ */}
      <BigImageGallery />

      {/* ═══════════════════════════════════════
          MAIN CONTENT — Products, Clients, Certifications, FAQ
          ═══════════════════════════════════════ */}
      <HomeContent />

      {/* ═══════════════════════════════════════
          CTA BANNER — Pre-Footer
          ═══════════════════════════════════════ */}
      <CTABanner />
    </>
  );
}
