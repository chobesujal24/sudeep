"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const leadData = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email") || "—",
      message: `[Service: ${formData.get("service")}] ${formData.get("details")}`,
    };

    try {
      const { data, error: sbError } = await supabase.from("leads").insert([leadData]);
      if (sbError) throw sbError;
      
      setSubmitted(true);
      e.target.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Error submitting lead:", JSON.stringify(err, null, 2));
      setError(`Database Error: ${err.message || "Failed to insert lead"}. Make sure the 'leads' table exists in Supabase with RLS policies allowing anon inserts.`);
    } finally {
      setLoading(false);
    }
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
            className="w-full px-4 py-3 rounded-lg bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)] text-[color:var(--color-foreground)] text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/20 transition-colors placeholder:text-slate-600"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[color:var(--color-text-secondary)] mb-1.5">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="Your phone number"
            className="w-full px-4 py-3 rounded-lg bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)] text-[color:var(--color-foreground)] text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/20 transition-colors placeholder:text-slate-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[color:var(--color-text-secondary)] mb-1.5">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-lg bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)] text-[color:var(--color-foreground)] text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/20 transition-colors placeholder:text-slate-600"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[color:var(--color-text-secondary)] mb-1.5">Service Required *</label>
        <select
          name="service"
          required
          className="w-full px-4 py-3 rounded-lg bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)] text-[color:var(--color-foreground)] text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/20 transition-colors"
        >
          <option value="">Select a service</option>
          <option value="led-lighting">LED Lighting Manufacturing</option>
          <option value="solar-infrastructure">Solar Power Infrastructure</option>
          <option value="custom-engineering">Custom Engineering Solutions</option>
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
          className="w-full px-4 py-3 rounded-lg bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)] text-[color:var(--color-foreground)] text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/20 transition-colors placeholder:text-slate-600 resize-y"
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500 text-sm text-center">
          ⚠️ {error}
        </div>
      )}

      {submitted && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-500 font-medium text-sm text-center">
          ✅ Thank you for your enquiry! We&apos;ll get back to you within 24 hours.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3.5 rounded-lg bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(22,101,52,0.25)] focus:-translate-y-0.5 transition-all cursor-pointer border-none text-sm disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? "Sending Enquiry..." : "Submit Enquiry →"}
      </button>

      <p className="text-xs text-slate-600 text-center">
        Or call us directly at <a href="tel:+919922996236" className="text-green-400 no-underline">+91 9922996236</a>
      </p>
    </form>
  );
}
