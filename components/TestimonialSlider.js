"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Sudeep Engineers delivered exceptional quality on our highway LED street light deployment. Their precision and lighting efficiency exceeded our expectations.",
    author: "Rajesh Patil",
    role: "Project Manager, Infrastructure Company",
    stars: 5,
  },
  {
    text: "We've been working with Sudeep Engineers for our LED lighting requirements. Their products are reliable, energy-efficient, and competitively priced.",
    author: "Priya Sharma",
    role: "Procurement Head, Infrastructure Firm",
    stars: 5,
  },
  {
    text: "Outstanding smart lighting quality. Sudeep Engineers consistently delivers on time and their highmast solutions have completely illuminated our facility safely.",
    author: "Amit Deshmukh",
    role: "Plant Manager, Industrial Company",
    stars: 5,
  },
  {
    text: "The best LED lighting partner in Aurangabad. Their modern facility in Waluj MIDC and skilled team make them our go-to choice for all infrastructure lighting needs.",
    author: "Sunil Joshi",
    role: "Director, Municipal Operations",
    stars: 5,
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const goTo = (index) => setCurrent(index);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => clearInterval(intervalRef.current)}
      onMouseLeave={() => {
        intervalRef.current = setInterval(() => {
          setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
      }}
    >
      <motion.div
        className="flex"
        animate={{ x: `-${current * 100}%` }}
        transition={{ 
          type: "spring", 
          stiffness: 80, 
          damping: 20, 
          mass: 1,
          restDelta: 0.001
        }}
      >
        {testimonials.map((t, i) => (
          <div key={i} className="min-w-full px-4">
            <div className="bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] p-10 md:p-14 text-center relative rounded-3xl shadow-xl transition-all duration-300">
              <div className="absolute top-4 left-8 text-6xl text-[color:var(--color-primary)] opacity-10 font-serif leading-none select-none">
                &ldquo;
              </div>
              <div className="text-amber-500 dark:text-amber-400 mb-5 text-lg tracking-wider">
                {"★".repeat(t.stars)}
              </div>
              <p className="text-[color:var(--color-text-secondary)] text-lg leading-relaxed mb-8 italic max-w-[600px] mx-auto">
                {t.text}
              </p>
              <p className="font-semibold text-[color:var(--color-foreground)] text-sm">{t.author}</p>
              <p className="text-[color:var(--color-text-muted)] text-xs mt-1">{t.role}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Dots */}
      <div className="flex justify-center gap-2.5 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all border-none cursor-pointer ${
              i === current
                ? "bg-[color:var(--color-primary)] w-8"
                : "bg-[color:var(--color-border-accent)] dark:bg-slate-700 w-2.5 hover:bg-[color:var(--color-primary)]/50"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
