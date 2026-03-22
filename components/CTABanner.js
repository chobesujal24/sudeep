"use client";
import Link from "next/link";

/*
 * CTABanner — Corporate B2B Call-to-Action strip.
 * Clean, high-contrast, designed to drive quote requests.
 */

export default function CTABanner() {
  return (
    <section className="py-20 bg-emerald-800 border-t border-emerald-900">
      <div className="max-w-[1000px] mx-auto px-6 text-center">
        <span className="inline-block text-emerald-300 text-sm font-bold uppercase tracking-[0.2em] mb-4">
          Ready to Start Your Project?
        </span>
        <h2
          className="font-extrabold text-white mb-6 uppercase tracking-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", lineHeight: 1.15 }}
        >
          Let's Engineer Your Next Infrastructure Solution
        </h2>
        <p className="text-emerald-100 text-lg max-w-[700px] mx-auto mb-10 leading-relaxed font-medium">
          Get a detailed, customized technical proposal for your LED lighting
          or solar infrastructure requirements within 48 hours. Built for scale, delivered on time.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/contact" className="inline-flex items-center justify-center px-10 py-4 bg-white text-emerald-800 font-bold uppercase tracking-wider hover:bg-emerald-50 transition-colors border-2 border-transparent">
            Request a Consultation
          </Link>
          <Link href="/services" className="inline-flex items-center justify-center px-10 py-4 bg-transparent text-white font-bold uppercase tracking-wider border-2 border-white hover:bg-white/10 transition-colors">
            Explore Capabilities
          </Link>
        </div>
      </div>
    </section>
  );
}
