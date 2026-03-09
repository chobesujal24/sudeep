"use client";
import { useState, useEffect } from "react";
import { Icons } from "./Icons";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="no-print">
      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href="https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%20need%20a%20quote%20for%20engineering%20fabrication"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[52px] h-[52px] rounded-full bg-[#25d366] text-[color:var(--color-foreground)] flex items-center justify-center text-2xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform no-underline"
          aria-label="WhatsApp"
          title="Chat on WhatsApp"
        >
          <Icons.WhatsApp className="w-6 h-6" />
        </a>
        <a
          href="tel:+919922996236"
          className="w-[52px] h-[52px] rounded-full bg-blue-500 text-[color:var(--color-foreground)] flex items-center justify-center text-2xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform no-underline"
          aria-label="Call us"
          title="Call us"
        >
          <Icons.Phone className="w-6 h-6" />
        </a>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-24 right-6 z-30 w-[42px] h-[42px] rounded-full bg-[#1a2332] border border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] flex items-center justify-center text-lg cursor-pointer transition-all hover:border-blue-500 hover:text-blue-400 ${
          showTop ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-label="Back to top"
      >
        <Icons.UpArrow className="w-5 h-5" />
      </button>
    </div>
  );
}
