"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { animate } from "framer-motion";

export default function ScrollAnimations() {
  const pathname = usePathname();
  const observerRef = useRef(null);

  useEffect(() => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const elements = document.querySelectorAll(".animate-on-scroll:not(.animated)");

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const classes = el.classList;
            
            // Default animation values
            let initialProps = { opacity: 1, x: 0, y: 0 };
            
            // Specific initial props based on classes if needed beyond CSS
            // but we mostly want to animate back to "identity" values.
            
            // More fluid/organic spring config
            const springConfig = { 
              type: "spring", 
              stiffness: 60, 
              damping: 25, 
              mass: 1.2,
              duration: 1.0 
            };
            
            // Extract delay from index if multiple elements intersecting at once
            // or from explicit delay-X classes
            const delayMatch = [...classes].find(c => c.startsWith("delay-"));
            const delaySeconds = delayMatch ? parseInt(delayMatch.split("-")[1]) * 0.1 : 0;

            animate(
              el,
              { opacity: 1, x: 0, y: 0 },
              { ...springConfig, delay: delaySeconds }
            );

            el.classList.add("animated");
            observerRef.current.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    elements.forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname]);

  return null;
}
