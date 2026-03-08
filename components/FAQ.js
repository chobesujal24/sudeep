"use client";
import { useState } from "react";

const faqs = [
  {
    q: "What engineering fabrication services does Sudeep Engineers offer?",
    a: "We offer comprehensive engineering fabrication services including structural metal manufacturing, custom fabrication, sheet metal work, welding (MIG/TIG), CNC machining, and industrial job work. Our Waluj MIDC facility in Aurangabad is equipped with modern machinery for precision fabrication.",
  },
  {
    q: "Where is Sudeep Engineers located?",
    a: "We are located in Waluj MIDC, Aurangabad, Maharashtra, India. Our strategic location in the heart of Aurangabad's industrial hub allows us to serve clients across Maharashtra and India efficiently.",
  },
  {
    q: "Do you manufacture LED lights?",
    a: "Yes, we manufacture a range of LED lighting products including LED street lights, LED flood lights, and pixel LED lighting. Our LED products are energy-efficient, durable, and suitable for industrial, commercial, and municipal applications.",
  },
  {
    q: "Is Sudeep Engineers MSME registered?",
    a: "Yes, Sudeep Engineers is a registered MSME (Micro, Small and Medium Enterprise) under the Udyam registration scheme. We are also GST registered and comply with all relevant quality standards.",
  },
  {
    q: "What industries do you serve?",
    a: "We serve a wide range of industries including construction, infrastructure, industrial plants, manufacturing companies, and government projects. Our engineering fabrication and LED lighting solutions are tailored to meet the specific needs of each sector.",
  },
  {
    q: "How can I request a quote?",
    a: "You can request a quote by visiting our Contact page, calling us directly, or sending us a message on WhatsApp. We provide competitive pricing and quick turnaround on all quote requests.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className={`animate-on-scroll delay-${(i % 5) + 1}`}>
          <div className={`glass-card overflow-hidden ${openIndex === i ? "faq-open" : ""}`}>
            <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between px-6 py-5 bg-transparent border-none text-[color:var(--color-foreground)] text-[0.95rem] font-semibold cursor-pointer text-left font-[inherit] hover:text-[color:var(--color-accent)] transition-colors"
          >
            <span>{faq.q}</span>
            <span className="text-[color:var(--color-accent)] text-xl ml-4 shrink-0 faq-icon-rotate">+</span>
          </button>
          <div className="faq-answer">
            <div className="px-6 pb-5 text-[color:var(--color-text-secondary)] text-sm leading-relaxed">
              {faq.a}
            </div>
          </div>
        </div>
        </div>
      ))}

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}
