"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Globe } from "lucide-react";

const defaults = { metaTitle: "", metaDescription: "", googleVerification: "", ogImage: "" };

export default function SeoSettings() {
  const [form, setForm] = useState({ ...defaults });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from("settings").select("data").eq("id", "seoSettings").single();
        if (data?.data) setForm({ ...defaults, ...data.data });
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from("settings").upsert({ id: "seoSettings", data: form });
      if (error) throw error;
      alert("SEO settings saved!");
    } catch (e) { alert("Error: " + e.message); }
    setSaving(false);
  };

  if (loading) return <div className="p-10 text-center text-[#64748B] font-bold">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Globe size={24} className="text-[#166534]" />
        <h2 className="text-2xl font-bold text-[#0F172A]">SEO Settings</h2>
      </div>
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-5">
        <div>
          <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Homepage Meta Title</label>
          <input type="text" value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
            className="w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#166534]/30 text-[#0F172A]" placeholder="Sudeep Engineers — Industrial Fabrication & LED Lighting" />
          <p className="text-[10px] text-[#94A3B8] mt-1">{form.metaTitle.length}/60 characters</p>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Homepage Meta Description</label>
          <textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            className="w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none min-h-[80px] text-[#0F172A]" placeholder="Leading engineering fabrication company..." />
          <p className="text-[10px] text-[#94A3B8] mt-1">{form.metaDescription.length}/160 characters</p>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Google Verification Code</label>
          <input type="text" value={form.googleVerification} onChange={(e) => setForm({ ...form, googleVerification: e.target.value })}
            className="w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none text-[#0F172A]" placeholder="google-site-verification=..." />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#475569] uppercase mb-1">OpenGraph Image URL</label>
          <input type="text" value={form.ogImage} onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
            className="w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none text-[#0F172A]" placeholder="https://..." />
          {form.ogImage && <img src={form.ogImage} alt="OG Preview" className="mt-2 max-h-[120px] rounded-lg border border-[#E2E8F0]" />}
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#166534] text-white rounded-lg text-sm font-bold hover:bg-[#15803D] disabled:opacity-50">
          <Save size={16} /> {saving ? "Saving..." : "Save SEO Settings"}
        </button>
      </div>
    </div>
  );
}
