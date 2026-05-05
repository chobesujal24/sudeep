"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

/*
 * Premium Hero Image Slider — Clean crossfade with subtle zoom.
 */
const IMAGES = [
  {
    src: "/slider/user-req-1.webp",
    alt: "LED Street Light Infrastructure Project by Sudeep Engineers",
  },
  {
    src: "/slider/rajasthan-solar.webp",
    alt: "Solar LED Street Light Installation in Rajasthan",
  },
  {
    src: "/slider/post-top-led.webp",
    alt: "Premium LED Post Top Light Systems",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
      {IMAGES.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          className={`object-cover transition-all duration-[2500ms] ease-in-out ${
            index === currentIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          priority={index === 0}
          unoptimized
        />
      ))}
    </div>
  );
}
