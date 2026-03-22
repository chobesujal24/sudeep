"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

/*
 * Premium Hero Image Slider
 * Crossfades 3 high-quality industrial Unsplash images every 5 seconds.
 */
const IMAGES = [
  {
    src: "/slider/user-req-1.jpg",
    alt: "LED Street Light Replacement Project Savings",
  },
  {
    src: "/slider/rajasthan-solar.jpg",
    alt: "Rajasthan LED and Solar Open Access",
  },
  {
    src: "/slider/posttop.jpg",
    alt: "Premium LED Post Top Lights Ecosystem",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Auto-switch image every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {IMAGES.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          className={`object-cover transition-opacity duration-[2000ms] ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0} // Only prioritize LCP for the first image
          unoptimized
        />
      ))}
    </div>
  );
}
