"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        <motion.a
          href="https://wa.me/919922996236?text=Hello%2C%20I%20need%20a%20quote%20for%20engineering%20fabrication"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[52px] h-[52px] rounded-full bg-[#25d366] text-white flex items-center justify-center text-2xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] no-underline"
          aria-label="WhatsApp"
          title="Chat on WhatsApp"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
        >
          <Icons.WhatsApp className="w-6 h-6" />
        </motion.a>
        <motion.a
          href="tel:+919922996236"
          className="w-[52px] h-[52px] rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] no-underline"
          aria-label="Call us"
          title="Call us"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.7 }}
        >
          <Icons.Phone className="w-6 h-6" />
        </motion.a>
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-6 z-30 w-[42px] h-[42px] rounded-full bg-white border border-[#E2E8F0] text-[#475569] flex items-center justify-center text-lg cursor-pointer shadow-sm hover:border-[#2563EB] hover:text-[#2563EB]"
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icons.UpArrow className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
