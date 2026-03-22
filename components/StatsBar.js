"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/*
 * StatsBar — "By the Numbers" animated counter section.
 * Numbers count up when the section scrolls into view.
 */

const stats = [
  { value: 500, suffix: "+", label: "CSR Work" },
  { value: 500, suffix: "+", label: "LED Models" },
  { value: 7, suffix: "+", label: "Years of Excellence" },
  { value: 250, suffix: "+", label: "Projects Delivered" },
];

function AnimatedCounter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="stats-number">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "var(--color-section)" }}>
      {/* Top/bottom border lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-border), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-border), transparent)" }} />

      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, var(--color-primary), transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 w-full px-6" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center relative">
              {/* Vertical divider (hidden on first item and mobile) */}
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-[color:var(--color-border)]" />
              )}
              <div className="text-4xl md:text-5xl font-extrabold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
