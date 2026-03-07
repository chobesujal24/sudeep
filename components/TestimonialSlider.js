"use client";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    text: "Sudeep Engineers delivered exceptional quality on our structural fabrication project. Their precision and attention to detail exceeded our expectations. Highly recommend for any industrial fabrication work.",
    author: "Rajesh Patil",
    role: "Project Manager, Construction Company",
    stars: 5,
  },
  {
    text: "We've been working with Sudeep Engineers for our LED lighting requirements. Their products are reliable, energy-efficient, and competitively priced. Great team to work with in Waluj MIDC.",
    author: "Priya Sharma",
    role: "Procurement Head, Infrastructure Firm",
    stars: 5,
  },
  {
    text: "Outstanding engineering job work quality. Sudeep Engineers consistently delivers on time and their custom fabrication solutions have helped us streamline our manufacturing process significantly.",
    author: "Amit Deshmukh",
    role: "Plant Manager, Industrial Company",
    stars: 5,
  },
  {
    text: "The best engineering fabrication partner in Aurangabad. Their modern facility in Waluj MIDC and skilled team make them our go-to choice for all metal fabrication needs.",
    author: "Sunil Joshi",
    role: "Director, Manufacturing Enterprise",
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
      <div
        className="testimonial-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {testimonials.map((t, i) => (
          <div key={i} className="min-w-full px-4">
            <div className="glass-card p-10 text-center relative">
              <div className="absolute top-4 left-8 text-6xl text-blue-500/15 font-serif leading-none select-none">
                &ldquo;
              </div>
              <div className="text-amber-400 mb-4 text-lg">
                {"★".repeat(t.stars)}
              </div>
              <p className="text-[color:var(--color-text-secondary)] text-[1.05rem] leading-relaxed mb-6 italic max-w-[600px] mx-auto">
                {t.text}
              </p>
              <p className="font-semibold text-[color:var(--color-foreground)] text-sm">{t.author}</p>
              <p className="text-[color:var(--color-text-muted)] text-xs">{t.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all border-none cursor-pointer ${
              i === current
                ? "bg-blue-500 w-7"
                : "bg-[#334155] w-2.5 hover:bg-[#475569]"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
