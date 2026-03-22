"use client";
import React, { useState } from "react";
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

  return (
    <section className="py-24 bg-white border-y border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-12 border-l-4 border-emerald-600 pl-4">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2 uppercase">
            LED SOLAR STREET<span className="text-emerald-600"> LIGHTS</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl">
            A look inside our state-of-the-art facilities and high-performance infrastructure capabilities.
          </p>
        </div>

        {/* Layout: Featured Left (8 cols) + Thumbnails Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
          
          {/* Featured Image Display */}
          <div className="lg:col-span-8 relative bg-white border border-slate-200 flex flex-col h-[400px] lg:h-full">
              <div className="relative w-full flex-grow overflow-hidden bg-slate-100">
              {/* Ambient Blurred Background Layer */}
              <Image 
                src={bigImages[activeIndex].src} 
                alt="Ambient Background"
                fill 
                className="object-cover blur-3xl opacity-50 scale-110 transition-opacity duration-300 pointer-events-none"
                aria-hidden="true" 
              />
              {/* Crisp Foreground Layer */}
              <Image 
                src={bigImages[activeIndex].src} 
                alt={bigImages[activeIndex].title}
                fill 
                className="object-contain relative z-10 transition-opacity duration-300 pointer-events-none drop-shadow-2xl" 
              />
            </div>
            <div className="border-t border-slate-200 bg-white p-4 drop-shadow-sm">
              <p className="text-sm font-bold text-emerald-800 uppercase tracking-widest text-center">
                {bigImages[activeIndex].title}
              </p>
            </div>
          </div>

          {/* Thumbnails Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 h-full content-start overflow-y-auto pr-2 custom-scrollbar">
            {bigImages.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-[4/3] w-full overflow-hidden border-2 transition-all p-1 bg-white ${
                  activeIndex === idx ? "border-emerald-600 shadow-md" : "border-slate-200 hover:border-emerald-300 opacity-80 hover:opacity-100"
                }`}
                aria-label={`View ${img.title}`}
              >
                <div className="relative w-full h-full bg-white flex items-center justify-center p-2">
                  <Image 
                    src={img.src} 
                    alt={`Thumbnail ${idx + 1}`} 
                    fill 
                    className="object-contain pointer-events-none" 
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
