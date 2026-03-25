"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/*
 * StatsBar — Clean animated counter section with minimalist design.
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
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums text-emerald-600">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-slate-100">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center relative">
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-slate-100" />
              )}
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
