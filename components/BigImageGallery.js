"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const bigImages = [
  { src: "/main/bigimage1.webp", title: "Heavy Duty HighBay Assembly" },
  { src: "/main/bigimage2.webp", title: "Precision LED Matrix Testing" },
  { src: "/main/bigimage3.webp", title: "Automated SMT Production Line" },
  { src: "/main/bigimage4.webp", title: "Quality Control & Spectrometry" },
  { src: "/main/bigimage5.webp", title: "Solar Array Manufacturing" },
  { src: "/main/bigimage6.webp", title: "Highmast Infrastructure Depot" },
];

export default function BigImageGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  /* Auto-play */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bigImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section className="py-12 md:py-20 lg:py-28 bg-slate-50" aria-label="Product showcase gallery">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-green-600 mb-4 block">Manufacturing</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
           LED Solar Street Light
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Our LED Solar Street Light Models.
          </p>
        </div>

        {/* Layout: Featured + Thumbnails */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          
          {/* Featured Image */}
          <div className="lg:col-span-8 relative bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col h-[280px] sm:h-[400px] lg:h-[550px]">
            <div className="relative w-full flex-grow overflow-hidden bg-slate-50">
              <Image 
                src={bigImages[activeIndex].src} 
                alt="Ambient Background"
                fill 
                className="object-cover blur-3xl opacity-40 scale-110 transition-opacity duration-500 pointer-events-none"
                aria-hidden="true" 
              />
              <Image 
                src={bigImages[activeIndex].src} 
                alt={bigImages[activeIndex].title}
                fill 
                className="object-contain relative z-10 transition-opacity duration-500 pointer-events-none drop-shadow-xl p-4" 
              />
            </div>
            <div className="bg-white p-3 md:p-4 border-t border-slate-50">
              <p className="text-xs md:text-sm font-semibold text-slate-700 text-center line-clamp-2 md:line-clamp-1">
                {bigImages[activeIndex].title}
              </p>
            </div>
          </div>

          {/* Thumbnails Grid */}
          <div className="lg:col-span-4 flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-2 gap-3 lg:gap-4 content-start pb-4 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {bigImages.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative flex-none w-24 sm:w-32 lg:w-full aspect-square snap-center overflow-hidden rounded-xl border-2 transition-all bg-white p-1.5 sm:p-2 ${
                  activeIndex === idx 
                    ? "border-green-500 shadow-md scale-100" 
                    : "border-slate-100 hover:border-green-200 opacity-60 hover:opacity-100 scale-95 hover:scale-100"
                }`}
                aria-label={`View ${img.title}`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src={img.src} 
                    alt={`Thumbnail ${idx + 1}`} 
                    fill 
                    className="object-contain pointer-events-none p-1" 
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
