"use client";
import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images, productName }) {
  const [mainImage, setMainImage] = useState(images[0] || null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
        <span className="text-[#38BDF8] text-6xl">💡</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sticky top-24">
      {/* Main Large Image */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E2E8F0] group">
        <Image
          src={mainImage}
          alt={productName}
          fill
          unoptimized
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-in-out"
          priority
        />
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer snap-start ${
                mainImage === img
                  ? "border-sky-500 shadow-md shadow-sky-500/20"
                  : "border-transparent opacity-50 hover:opacity-100 bg-[color:var(--color-bg-secondary)]"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                unoptimized
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
