"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

/*
 * WhyUs — Engineering excellence section.
 * Two-column layout: text + image. Focused on LED lighting & Solar.
 */

const advantages = [
  "10,000+ sq ft manufacturing facility in Waluj MIDC",
  "In-house LED PCB assembly, driver testing, and quality lab",
  "Complete product range: street lights to stadium masts",
  "Solar-powered LED systems for off-grid deployments",
  "MSME / Udyam registered with government credentials",
  "Trusted by BHEL, NTPC, Indian Railways, and 20+ PSUs",
];

export default function WhyUs() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "var(--color-section)" }}>
      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-border), transparent)" }} />

      {/* Subtle glow */}
      <div
        className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #4ADE80, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 w-full px-6" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <span className="inline-block text-[color:var(--color-primary)] text-xs font-bold uppercase tracking-[0.3em] mb-4">
              The Sudeep Advantage
            </span>
            <h2
              className="font-heading font-bold text-[color:var(--color-foreground)] mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", lineHeight: 1.15 }}
            >
              Built to Outperform.{" "}
              <span className="gradient-text">Engineered to Last.</span>
            </h2>
            <p className="text-[color:var(--color-text-secondary)] text-lg leading-relaxed mb-8">
              Every luminaire leaving our facility is stress-tested, quality-inspected, and built for decades
              of industrial service. From high-mast towers standing 30 meters tall to LED drivers rated for
              extreme temperature differentials — our manufacturing process eliminates compromise.
            </p>

            {/* Advantages list */}
            <ul className="space-y-3.5">
              {advantages.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-[color:var(--color-text-secondary)] text-sm md:text-[0.95rem]"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <CheckCircle
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--color-primary)" }}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="rounded-2xl overflow-hidden h-[500px] relative shadow-2xl">
              <Image
                src="/slider/factory.jpg"
                alt="Majestic LED Street Light Pole Infrastructure"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
              {/* Gradient overlay at bottom */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
