"use client";
import { useState } from "react";
import ProductImage from "@/components/ProductImage";

export default function ImageGallery({ images = [], productName }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const mainImage = images.includes(selectedImage) ? selectedImage : images[0];

  if (images.length === 0) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-[color:var(--color-bg-secondary)] rounded-2xl border border-[color:var(--color-border)]">
        <span className="text-[color:var(--color-accent)] text-6xl">💡</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sticky top-24">
      {/* Main Large Image */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white border border-[color:var(--color-border)] group">
        <ProductImage
          src={mainImage}
          alt={productName}
          unoptimized
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-contain p-4 transition-all duration-500 ease-in-out"
          loadingLabel="Loading product image…"
          priority
        />
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              aria-label={`View ${productName} image ${idx + 1}`}
              aria-pressed={mainImage === img}
              className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer snap-start ${
                mainImage === img
                  ? "border-sky-500 shadow-md shadow-sky-500/20"
                  : "border-transparent opacity-50 hover:opacity-100 bg-[color:var(--color-bg-secondary)]"
              }`}
            >
              <ProductImage
                src={img}
                alt=""
                sizes="80px"
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
