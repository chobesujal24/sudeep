"use client";
import Link from "next/link";

/*
 * CTABanner — Clean, minimalist CTA section.
 */

export default function CTABanner() {
  return (
    <section className="py-20 md:py-28 bg-slate-900">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-400 mb-6 block">
          Ready to Start?
        </span>
        <h2
          className="font-bold text-white mb-6 tracking-tight"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.15 }}
        >
          Let's engineer your next
          <br />
          infrastructure solution.
        </h2>
        <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Get a customized technical proposal for your LED lighting
          or solar infrastructure requirements within 48 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="px-8 py-4 bg-emerald-500 text-white text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-emerald-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] min-w-[200px]">
            Request a Quote
          </Link>
          <Link href="/services" className="px-8 py-4 bg-white/10 border border-white/20 text-white text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-white/20 transition-all duration-300 min-w-[200px]">
            Our Capabilities
          </Link>
        </div>
      </div>
    </section>
  );
}
