"use client";

/*
 * AnnouncementBar — Clean scrolling trust badge ticker.
 * Shows certifications and trust signals.
 */

const announcements = [
  "ISO 9001:2015 Certified",
  "MSME & Udyam Registered",
  "500+ Projects Delivered PAN India",
  "BIS Certified LED Products",
  "GeM Approved Supplier",
  "7+ Years of Excellence",
  "Trusted by BHEL, NTPC, Indian Railways",
];

export default function AnnouncementBar() {
  const items = [...announcements, ...announcements];

  return (
    <div className="announcement-bar relative z-[60] h-8 flex items-center" aria-label="Company announcements">
      <div className="marquee-track">
        {items.map((text, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 px-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-green-200/80 whitespace-nowrap"
          >
            <span className="w-1 h-1 rounded-full bg-green-400/50 shrink-0" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
