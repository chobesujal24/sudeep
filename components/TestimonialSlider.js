"use client";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    text: "Sudeep Engineers delivered exceptional quality on our structural fabrication project. Their precision and attention to detail exceeded our expectations.",
    author: "Rajesh Patil",
    role: "Project Manager, Construction Company",
    stars: 5,
  },
  {
    text: "We've been working with Sudeep Engineers for our LED lighting requirements. Their products are reliable, energy-efficient, and competitively priced.",
    author: "Priya Sharma",
    role: "Procurement Head, Infrastructure Firm",
    stars: 5,
  },
  {
    text: "Outstanding engineering job work quality. Sudeep Engineers consistently delivers on time and their custom fabrication solutions have helped us streamline our manufacturing.",
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
            <div className="glass-card-dark p-10 md:p-14 text-center relative">
              <div className="absolute top-4 left-8 text-6xl text-white/10 font-serif leading-none select-none">
                &ldquo;
              </div>
              <div className="text-amber-400 mb-5 text-lg tracking-wider">
                {"★".repeat(t.stars)}
              </div>
              <p className="text-white/80 text-lg leading-relaxed mb-8 italic max-w-[600px] mx-auto">
                {t.text}
              </p>
              <p className="font-semibold text-white text-sm">{t.author}</p>
              <p className="text-white/50 text-xs mt-1">{t.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2.5 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all border-none cursor-pointer ${
              i === current
                ? "bg-white w-8"
                : "bg-white/30 w-2.5 hover:bg-white/50"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
