"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import useReducedMotion from "./useReducedMotion";

/*
 * StatsBar — Enhanced animated counter section.
 * Clean white design with upgraded animations and better typography.
 */

const stats = [
  { value: 500, suffix: "+", label: "CSR Work" },
  { value: 500, suffix: "+", label: "LED Models" },
  { value: 7, suffix: "+", label: "Years of Excellence" },
  { text: "PAN India", label: "Projects Delivered" },
];

function AnimatedCounter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || reducedMotion) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };
    let frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, duration, reducedMotion]);

  return (
    <span ref={ref} className="tabular-nums text-green-700">
      {reducedMotion ? target : count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="py-16 md:py-20 bg-white border-y border-slate-100" aria-label="Company statistics">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center relative"
              initial={reducedMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : i * 0.1 }}
            >
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-slate-100" />
              )}
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {stat.text || <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
