"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Settings } from "lucide-react";

const defaults = {
  companyName: "Sudeep Engineers",
  logo: "",
  address: "",
  phone: "",
  email: "",
  whatsapp: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  youtube: "",
};

export default function SiteSettings() {
  const [form, setForm] = useState({ ...defaults });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from("settings").select("data").eq("id", "siteSettings").single();
        if (data?.data) setForm({ ...defaults, ...data.data });
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from("settings").upsert({ id: "siteSettings", data: form });
      if (error) throw error;
      alert("Site settings saved!");
    } catch (e) { alert("Error: " + e.message); }
    setSaving(false);
  };

  const Field = ({ label, field, placeholder, type = "text" }) => (
    <div>
      <label className="block text-xs font-bold text-[#475569] uppercase mb-1">{label}</label>
      <input type={type} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        className="w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#166534]/30 text-[#0F172A]" placeholder={placeholder} />
    </div>
  );

  if (loading) return <div className="p-10 text-center text-[#64748B] font-bold">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Settings size={24} className="text-[#166534]" />
        <h2 className="text-2xl font-bold text-[#0F172A]">Site Settings</h2>
      </div>
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="font-bold text-[#0F172A] mb-3 border-b pb-2">Company Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Company Name" field="companyName" placeholder="Sudeep Engineers" />
            <Field label="Logo URL" field="logo" placeholder="https://..." />
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Address</label>
              <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none min-h-[60px] text-[#0F172A]" placeholder="Full address..." />
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-[#0F172A] mb-3 border-b pb-2">Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Phone" field="phone" placeholder="+91 9922996236" />
            <Field label="Email" field="email" placeholder="info@sudeepengineers.com" type="email" />
            <Field label="WhatsApp" field="whatsapp" placeholder="919922996236" />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-[#0F172A] mb-3 border-b pb-2">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Facebook" field="facebook" placeholder="https://facebook.com/..." />
            <Field label="Instagram" field="instagram" placeholder="https://instagram.com/..." />
            <Field label="LinkedIn" field="linkedin" placeholder="https://linkedin.com/..." />
            <Field label="YouTube" field="youtube" placeholder="https://youtube.com/..." />
          </div>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#166534] text-white rounded-lg text-sm font-bold hover:bg-[#15803D] disabled:opacity-50">
          <Save size={16} /> {saving ? "Saving..." : "Save Site Settings"}
        </button>
      </div>
    </div>
  );
}
