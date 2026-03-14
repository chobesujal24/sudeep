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

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use framer-motion's animate for smooth spring animations
            animate(
              entry.target,
              { opacity: 1, y: 0 },
              { type: "spring", stiffness: 80, damping: 20, duration: 0.6 }
            );
            entry.target.classList.add("animated");
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Initial observe
    document.querySelectorAll(".animate-on-scroll:not(.animated)").forEach((el) => {
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
