"use client";
import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      e.target.reset();
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-[color:var(--color-text-secondary)] mb-1.5">Full Name *</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your full name"
            className="w-full px-4 py-3 rounded-lg bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)] text-[color:var(--color-foreground)] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-colors placeholder:text-slate-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[color:var(--color-text-secondary)] mb-1.5">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="Your phone number"
            className="w-full px-4 py-3 rounded-lg bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)] text-[color:var(--color-foreground)] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-colors placeholder:text-slate-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[color:var(--color-text-secondary)] mb-1.5">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-lg bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)] text-[color:var(--color-foreground)] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-colors placeholder:text-slate-600"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[color:var(--color-text-secondary)] mb-1.5">Service Required *</label>
        <select
          name="service"
          required
          className="w-full px-4 py-3 rounded-lg bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)] text-[color:var(--color-foreground)] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-colors"
        >
          <option value="">Select a service</option>
          <option value="engineering-fabrication">Engineering Fabrication</option>
          <option value="structural-metal">Structural Metal Manufacturing</option>
          <option value="industrial-job-work">Industrial Job Work</option>
          <option value="custom-engineering">Custom Engineering Solutions</option>
          <option value="led-lighting">LED Lighting Manufacturing</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[color:var(--color-text-secondary)] mb-1.5">Project Details *</label>
        <textarea
          name="details"
          required
          rows={5}
          placeholder="Describe your project requirements, quantity, specifications, etc."
          className="w-full px-4 py-3 rounded-lg bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)] text-[color:var(--color-foreground)] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-colors placeholder:text-slate-600 resize-y"
        />
      </div>

      {submitted && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400 text-sm text-center">
          ✅ Thank you! We&apos;ll get back to you within 24 hours.
        </div>
      )}

      <button
        type="submit"
        className="w-full px-6 py-3.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-[color:var(--color-foreground)] font-semibold hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(59,130,246,0.25)] transition-all cursor-pointer border-none text-sm"
      >
        Submit Enquiry →
      </button>

      <p className="text-xs text-slate-600 text-center">
        Or call us directly at <a href="tel:+91XXXXXXXXXX" className="text-blue-400 no-underline">+91-XXXXXXXXXX</a>
      </p>
    </form>
  );
}
