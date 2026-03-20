"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Save, X } from "lucide-react";

const empty = { name: "", slug: "", description: "", image: "", seo_title: "", seo_description: "" };

export default function CategoriesManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | index | "new"
  const [form, setForm] = useState({ ...empty });

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*").order("created_at", { ascending: true });
      if (data) setCategories(data);
      // Silently handle missing table — user needs to create it in Supabase
    } catch (e) { /* table may not exist yet */ }
    setLoading(false);
  };

  const autoSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSave = async () => {
    try {
      if (editing === "new") {
        const { error } = await supabase.from("categories").insert([{ ...form, created_at: new Date().toISOString() }]);
        if (error) throw error;
      } else {
        const cat = categories[editing];
        const { error } = await supabase.from("categories").update(form).eq("id", cat.id);
        if (error) throw error;
      }
      setEditing(null);
      setForm({ ...empty });
      fetchCategories();
      alert("Category saved!");
    } catch (e) {
      alert("Error saving: " + e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
      fetchCategories();
    } catch (e) { alert("Error: " + e.message); }
  };

  if (loading) return <div className="p-10 text-center text-[#64748B] font-bold">Loading categories...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#0F172A]">Categories</h2>
        <button onClick={() => { setEditing("new"); setForm({ ...empty }); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#1E40AF] text-white rounded-lg text-sm font-semibold hover:bg-[#1D4ED8] transition-colors">
          <Plus size={16} /> Add Category
        </button>
      </div>

      {editing !== null && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#0F172A]">{editing === "new" ? "New Category" : "Edit Category"}</h3>
            <button onClick={() => { setEditing(null); setForm({ ...empty }); }} className="text-[#94A3B8] hover:text-[#0F172A]"><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Category Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: autoSlug(e.target.value) })}
                className="w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]/30 text-[#0F172A]" placeholder="e.g. LED Street Lights" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full p-2.5 border border-[#CBD5E1] rounded-lg bg-[#F8FAFC] outline-none text-[#0F172A]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none min-h-[80px] text-[#0F172A]" />
            </div>
            <div className="md:col-span-1">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#475569] uppercase">Category Image</label>
                <label className="text-[10px] bg-white border border-[#CBD5E1] px-2 py-0.5 shadow-sm rounded hover:border-[#1E40AF] cursor-pointer font-bold uppercase transition-colors">
                  Browse
                  <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    try {
                      const fileName = `categories/${form.slug || "new"}/${Date.now()}_${file.name}`;
                      const { error } = await supabase.storage.from("images").upload(fileName, file);
                      if (error) throw error;
                      const { data: urlData } = supabase.storage.from("images").getPublicUrl(fileName);
                      setForm(prev => ({ ...prev, image: urlData.publicUrl }));
                    } catch (err) {
                      alert("Upload failed: " + err.message);
                    }
                  }} />
                </label>
              </div>
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] overflow-hidden shrink-0 flex items-center justify-center">
                  {form.image ? (
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-[#94A3B8] font-bold text-center px-1">No Image</span>
                  )}
                </div>
                <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="flex-1 p-2.5 border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]/30 text-[#0F172A] text-sm h-16" placeholder="Paste URL or browse..." />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#475569] uppercase mb-1">SEO Title</label>
              <input type="text" value={form.seo_title} onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                className="w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none text-[#0F172A]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#475569] uppercase mb-1">SEO Description</label>
              <input type="text" value={form.seo_description} onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                className="w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none text-[#0F172A]" />
            </div>
          </div>
          <button onClick={handleSave} className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-[#1E40AF] text-white rounded-lg text-sm font-bold hover:bg-[#1D4ED8]">
            <Save size={16} /> Save Category
          </button>
        </div>
      )}

      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <th className="text-left p-4 text-xs font-bold text-[#475569] uppercase">Name</th>
            <th className="text-left p-4 text-xs font-bold text-[#475569] uppercase">Slug</th>
            <th className="text-left p-4 text-xs font-bold text-[#475569] uppercase">SEO Title</th>
            <th className="text-right p-4 text-xs font-bold text-[#475569] uppercase">Actions</th>
          </tr></thead>
          <tbody>
            {categories.map((cat, i) => (
              <tr key={cat.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                <td className="p-4 font-semibold text-[#1E293B]">{cat.name}</td>
                <td className="p-4 text-[#64748B]">{cat.slug}</td>
                <td className="p-4 text-[#64748B] truncate max-w-[200px]">{cat.seo_title || "—"}</td>
                <td className="p-4 text-right">
                  <button onClick={() => { setEditing(i); setForm(cat); }} className="text-[#1E40AF] text-xs font-bold mr-3 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(cat.id)} className="text-[#EF4444] text-xs font-bold hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-[#94A3B8]">No categories yet. Click "Add Category" to create one.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
