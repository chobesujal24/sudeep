"use client";

import { useState } from "react";
import Image from "next/image";

// Keying the inner component resets loading and error state whenever the source changes.
function ImageWithStatus({ src, alt, className = "", loadingLabel, ...props }) {
  const [status, setStatus] = useState("loading");

  return (
    <>
      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-100 motion-safe:animate-pulse" aria-hidden={!loadingLabel} role={loadingLabel ? "status" : undefined}>
          <span className="h-8 w-8 rounded-full border-2 border-slate-300 border-t-green-700 motion-safe:animate-spin" aria-hidden="true" />
          {loadingLabel && <span className="text-xs font-medium text-slate-600">{loadingLabel}</span>}
        </div>
      )}
      {status === "error" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-100 text-slate-600 text-sm" role={alt ? "img" : undefined} aria-label={alt ? `${alt}: image unavailable` : undefined} aria-hidden={!alt}>
          <span aria-hidden="true" className="text-2xl">▧</span>
          <span>Image unavailable</span>
        </div>
      ) : (
        <Image
          {...props}
          src={src}
          alt={alt}
          fill
          className={`relative z-10 ${className}`}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
    </>
  );
}

export default function ProductImage({ src, ...props }) {
  return <ImageWithStatus key={src} src={src} {...props} />;
}
