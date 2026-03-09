"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Icons } from "@/components/Icons";
import { supabase } from "@/lib/supabase";

// Dynamic import: BlogManager uses firebase/storage which may be disabled
const BlogManager = dynamic(() => import("@/components/admin/BlogManager"), {
  loading: () => <div className="p-10 text-center font-bold text-[#64748B]">Loading Blog CMS...</div>,
  ssr: false
});

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState("products");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "sudeep" && password === "sudeep24") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid credentials");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Try Supabase first
      const { data: dbData, error } = await supabase
        .from('settings')
        .select('data')
        .eq('id', 'productData')
        .single();

      if (dbData && dbData.data && dbData.data.products && dbData.data.products.length > 0) {
        setProducts(dbData.data.products);
      } else {
        // Fallback: fetch from API route (uses local JSON)
        const res = await fetch("/api/products");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          // Also seed Supabase with this data for future use
          await supabase
            .from('settings')
            .upsert({ id: 'productData', data: { products: data } });
        }
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // Final fallback: try API route
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (Array.isArray(data)) setProducts(data);
      } catch (e) {
        console.error("API fallback also failed:", e);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      let updatedProducts = [...products];
      if (editingIndex !== null) {
        updatedProducts[editingIndex] = formData;
      } else {
        updatedProducts.push(formData);
      }

      console.log("Saving products to Supabase...", updatedProducts.length, "products");

      // Save directly to Supabase Postgres JSON
      const { error: supabaseError } = await supabase
        .from('settings')
        .upsert({ id: 'productData', data: { products: updatedProducts } });

      if (supabaseError) throw supabaseError;

      console.log("Save successful!");
      setProducts(updatedProducts);
      setEditingIndex(null);
      setFormData({});
      alert("Products updated successfully!");
    } catch (error) {
      console.error("Save error full details:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      alert("Error saving to Supabase.\n\nCode: " + (error.code || "unknown") + "\nMessage: " + (error.message || error.toString()));
    }
  };

  const handleDelete = async (index) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const updatedProducts = products.filter((_, i) => i !== index);
      
      const { error: supabaseError } = await supabase
        .from('settings')
        .upsert({ id: 'productData', data: { products: updatedProducts } });

      if (supabaseError) throw supabaseError;

      setProducts(updatedProducts);
      alert("Product deleted!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting product from Supabase.");
    }
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    const productCopy = JSON.parse(JSON.stringify(products[index]));
    // Ensure all array fields exist to prevent rendering issues
    productCopy.images = productCopy.images || [];
    productCopy.specs = productCopy.specs || [];
    productCopy.applications = productCopy.applications || [];
    productCopy.models = productCopy.models || [];
    productCopy.catalogs = productCopy.catalogs || [];
    setFormData(productCopy);
  };

  const startAdd = () => {
    setEditingIndex(null);
    setFormData({
      id: "new-product",
      slug: "new-product-slug",
      name: "New Product",
      category: "Outdoor Lighting",
      description: "",
      specs: [],
      applications: [],
      images: [],
      catalogs: [],
      models: []
    });
  };

  // Generic Array Handlers
  const handleArrayChange = (field, index, value) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };
  const addArrayItem = (field, defaultValue = "") => {
    setFormData({ ...formData, [field]: [...(formData[field] || []), defaultValue] });
  };
  const removeArrayItem = (field, index) => {
    const newArray = (formData[field] || []).filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  // Object Array Handlers (Specs & Models)
  const handleObjectChange = (field, index, key, value) => {
    const newArray = [...(formData[field] || [])];
    newArray[index][key] = value;
    setFormData({ ...formData, [field]: newArray });
  };
  const addObjectItem = (field, defaultObj) => {
    setFormData({ ...formData, [field]: [...(formData[field] || []), defaultObj] });
  };

  if (loading) return <div className="min-h-screen flex text-white items-center justify-center bg-[#0F172A] p-10 font-bold">Initializing CMS...</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-[#E2E8F0] w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Admin Portal</h1>
            <p className="text-sm text-[#64748B]">Please sign in to access the CMS.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#38BDF8] outline-none text-[#0F172A]"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#38BDF8] outline-none text-[#0F172A]"
                placeholder="Enter password"
              />
            </div>

            {authError && (
              <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg font-bold shadow-md transition-all"
            >
              Secure Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans pt-24 pb-20">
      {/* Top Admin Header */}
      <div className="bg-[#1E293B] text-white py-4 px-8 mb-8 sticky top-16 z-40 border-b border-[#334155] shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold flex items-center gap-2">
              Sudeep Lights CMS
            </h1>
            <span className="text-xs text-[#94A3B8]">Manage your digital inventory and catalogs</span>
          </div>
          {(activeTab === "products" && Object.keys(formData).length > 0) && (
            <div className="flex gap-3">
              <button
                onClick={() => { setEditingIndex(null); setFormData({}); }}
                className="px-4 py-2 border border-[#475569] hover:bg-[#334155] rounded-md font-medium text-sm transition-colors text-white"
              >
                Discard Changes
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#38BDF8] hover:bg-[#0284C7] text-white rounded-md font-bold text-sm shadow drop-shadow-sm transition-all text-white"
              >
                Publish Form
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="max-w-[1400px] mx-auto mt-4 flex gap-4">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 font-bold text-sm rounded-md transition-colors ${activeTab === "products" ? "bg-[#38BDF8] text-white" : "bg-[#334155] text-[#94A3B8] hover:text-white"}`}
          >
            Product Catalog CMS
          </button>
          <button
            onClick={() => setActiveTab("blog")}
            className={`px-4 py-2 font-bold text-sm rounded-md transition-colors ${activeTab === "blog" ? "bg-[#10B981] text-white" : "bg-[#334155] text-[#94A3B8] hover:text-white"}`}
          >
            Blog CMS
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-8">

        {activeTab === "blog" ? (
          <BlogManager />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT COLUMN - PRODUCT LISTING (Sidebar) */}
            <div className="w-full lg:w-1/4 flex flex-col gap-4">
              <button
                onClick={startAdd}
                className="w-full py-4 border-2 border-dashed border-[#CBD5E1] bg-white text-[#38BDF8] rounded-xl font-bold hover:bg-[#F0F9FF] hover:border-[#38BDF8] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                Add New Product
              </button>

              <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden sticky top-[9rem]">
                <div className="p-4 bg-[#F1F5F9] border-b border-[#E2E8F0]">
                  <h2 className="text-sm font-bold text-[#475569] uppercase tracking-wider">Product Directory ({products.length})</h2>
                </div>
                <div className="max-h-[65vh] overflow-y-auto w-full">
                  {products.map((p, i) => (
                    <div key={i} className={`flex justify-between items-center p-4 border-b border-[#F1F5F9] cursor-pointer transition-colors ${editingIndex === i ? 'bg-[#E0F2FE] border-l-4 border-l-[#38BDF8]' : 'hover:bg-[#F8FAFC]'}`} onClick={() => startEdit(i)}>
                      <span className="font-semibold text-[0.9rem] truncate pr-2 text-[#1E293B] block max-w-[180px]">{p.name}</span>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(i); }} className="text-[#EF4444] text-xs font-bold hover:underline shrink-0">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - EDITOR UI (Workspace) */}
            <div className="w-full lg:w-3/4 pb-20">
              {Object.keys(formData).length > 0 ? (
                <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">

                  {/* Form Header */}
                  <div className="p-6 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[#0F172A]">
                      {editingIndex !== null ? `Editing: ${formData.name}` : "Creating New Product"}
                    </h2>
                    <div className="bg-[#DBEAFE] text-[#1E40AF] px-3 py-1 text-xs font-bold uppercase rounded-full">
                      {editingIndex !== null ? 'Live Mode' : 'Draft'}
                    </div>
                  </div>

                  <div className="p-8 space-y-10">

                    {/* 1. Basic Information section */}
                    <section>
                      <h3 className="text-lg font-bold border-b pb-2 mb-4">Basic Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Product Title</label>
                          <input type="text" value={formData.name || ''}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-2.5 border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#38BDF8] outline-none text-[#0F172A]" placeholder="e.g. LED Flood Light" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#475569] uppercase mb-1">URL Slug</label>
                          <input type="text" value={formData.slug || ''}
                            onChange={e => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full p-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#38BDF8] outline-none text-[#0F172A]" placeholder="e.g. led-flood-light" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Unique ID</label>
                          <input type="text" value={formData.id || ''}
                            onChange={e => setFormData({ ...formData, id: e.target.value })}
                            className="w-full p-2.5 border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#38BDF8] outline-none text-[#0F172A]" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Category</label>
                          <input type="text" value={formData.category || ''}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-2.5 border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#38BDF8] outline-none text-[#0F172A]" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Full Description</label>
                          <textarea value={formData.description || ''}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-3 border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#38BDF8] outline-none min-h-[120px] text-[#0F172A]" />
                        </div>
                      </div>
                    </section>

                    {/* 2. Arrays: Applications & Images */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      {/* Applications */}
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold">Applications / Use Cases</h3>
                          <button onClick={() => addArrayItem('applications', "New Application")} className="text-xs bg-white border border-[#CBD5E1] px-2 py-1 shadow-sm rounded hover:border-[#38BDF8]">Add +</button>
                        </div>
                        <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                          {(formData.applications || []).map((app, idx) => (
                            <div key={idx} className="flex gap-2">
                              <input type="text" value={app} onChange={(e) => handleArrayChange('applications', idx, e.target.value)} className="flex-1 p-2 text-sm border border-[#CBD5E1] rounded-md outline-none focus:border-[#38BDF8]" />
                              <button onClick={() => removeArrayItem('applications', idx)} className="px-3 bg-[#FEE2E2] text-[#EF4444] rounded-md hover:bg-[#FECACA]">✕</button>
                            </div>
                          ))}
                          {(!formData.applications || formData.applications.length === 0) && <p className="text-xs text-[#94A3B8]">No applications defined.</p>}
                        </div>
                      </div>

                      {/* Images - Drag & Drop Upload */}
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold">Image Gallery</h3>
                          <label className="text-xs bg-white border border-[#CBD5E1] px-2 py-1 shadow-sm rounded hover:border-[#38BDF8] cursor-pointer">
                            Browse Files
                            <input type="file" accept="image/*" multiple className="hidden" onChange={async (e) => {
                              const files = Array.from(e.target.files);
                              for (const file of files) {
                                const fileName = `products/${formData.slug || 'new'}/${Date.now()}_${file.name}`;
                                const { data, error } = await supabase.storage.from('images').upload(fileName, file);
                                if (!error) {
                                  const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);
                                  setFormData(prev => ({ ...prev, images: [...(prev.images || []), urlData.publicUrl] }));
                                } else {
                                  alert('Upload failed: ' + error.message);
                                }
                              }
                            }} />
                          </label>
                        </div>

                        {/* Drop Zone */}
                        <div
                          className="border-2 border-dashed border-[#CBD5E1] rounded-lg p-6 text-center mb-4 transition-colors hover:border-[#38BDF8] hover:bg-[#F0F9FF] cursor-pointer"
                          onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-[#38BDF8]', 'bg-[#F0F9FF]'); }}
                          onDragLeave={(e) => { e.currentTarget.classList.remove('border-[#38BDF8]', 'bg-[#F0F9FF]'); }}
                          onDrop={async (e) => {
                            e.preventDefault();
                            e.currentTarget.classList.remove('border-[#38BDF8]', 'bg-[#F0F9FF]');
                            const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
                            for (const file of files) {
                              const fileName = `products/${formData.slug || 'new'}/${Date.now()}_${file.name}`;
                              const { data, error } = await supabase.storage.from('images').upload(fileName, file);
                              if (!error) {
                                const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);
                                setFormData(prev => ({ ...prev, images: [...(prev.images || []), urlData.publicUrl] }));
                              } else {
                                alert('Upload failed: ' + error.message);
                              }
                            }
                          }}
                          onClick={(e) => {
                            // Only trigger if clicking the dropzone itself (not child elements)
                            if (e.target === e.currentTarget || e.target.closest('[data-dropzone]')) {
                              e.currentTarget.querySelector('input[type="file"]')?.click();
                            }
                          }}
                        >
                          <svg className="w-8 h-8 mx-auto text-[#94A3B8] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                          <p data-dropzone className="text-sm text-[#64748B] font-medium">Drag & drop images here</p>
                          <p data-dropzone className="text-xs text-[#94A3B8] mt-1">or click "Browse Files" above</p>
                        </div>

                        {/* Image Previews */}
                        <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2">
                          {(formData.images || []).map((img, idx) => (
                            <div key={idx} className="relative group rounded-lg overflow-hidden border border-[#E2E8F0] bg-white aspect-square">
                              <img src={img} onError={(e) => { e.target.src = "https://placehold.co/200x200/f1f5f9/64748b?text=No+Image" }} alt="" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                <button onClick={() => removeArrayItem('images', idx)} className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow">Remove</button>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] p-1.5 truncate">
                                {img.split('/').pop()}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Manual URL input */}
                        <div className="mt-3 flex gap-2">
                          <input type="text" id="manual-image-url" placeholder="Or paste image URL here..." className="flex-1 p-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#38BDF8]" />
                          <button onClick={() => {
                            const input = document.getElementById('manual-image-url');
                            if (input.value) {
                              setFormData(prev => ({ ...prev, images: [...(prev.images || []), input.value] }));
                              input.value = '';
                            }
                          }} className="text-xs bg-[#0F172A] text-white px-3 py-1.5 rounded-md">Add URL</button>
                        </div>
                      </div>
                    </section>

                    {/* 3. Specs and Models */}
                    <section>
                      <div className="flex items-center justify-between border-b pb-2 mb-4 mt-8">
                        <h3 className="text-lg font-bold">Dynamic Configurations</h3>
                      </div>

                      <div className="grid grid-cols-1 gap-10">

                        {/* Technical Specs */}
                        <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-xl p-5">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-[#334155]">Technical Specifications (Key/Value)</h4>
                            <button onClick={() => addObjectItem('specs', { label: "Spec", value: "Value" })} className="text-xs bg-[#0F172A] text-white px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">Add Spec row +</button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {(formData.specs || []).map((spec, idx) => (
                              <div key={idx} className="flex gap-2 p-2 bg-[#F8FAFC] border rounded-lg items-center group relative">
                                <input type="text" value={spec.label} onChange={(e) => handleObjectChange('specs', idx, 'label', e.target.value)} className="w-[100px] text-xs font-bold uppercase p-1.5 border-b border-transparent hover:border-[#CBD5E1] focus:border-[#38BDF8] outline-none bg-transparent" placeholder="LABEL" />
                                <span className="text-[#94A3B8]">:</span>
                                <input type="text" value={spec.value} onChange={(e) => handleObjectChange('specs', idx, 'value', e.target.value)} className="flex-1 text-sm p-1.5 border-b border-transparent hover:border-[#CBD5E1] focus:border-[#38BDF8] outline-none bg-transparent" placeholder="Value..." />
                                <button onClick={() => removeArrayItem('specs', idx)} className="opacity-0 group-hover:opacity-100 absolute -right-2 -top-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md transition-opacity">✕</button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Specific Wattage Models with Catalog Upload */}
                        <div className="bg-[#F0F9FF] border border-[#BAE6FD] shadow-sm rounded-xl p-6 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <Icons.Engineering className="w-32 h-32 text-[#0284C7]" />
                          </div>
                          <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="flex flex-col">
                              <h4 className="font-bold text-[#0369A1] text-lg">Product Models & Catalogs</h4>
                              <span className="text-xs text-[#0284C7] max-w-lg">Assign specific models (e.g. 50W, 100W) to their PDF TDS Document. Drag & drop PDFs or browse to upload.</span>
                            </div>
                            <button onClick={() => addObjectItem('models', { wattage: "100W", tds: "" })} className="text-xs bg-[#0284C7] text-white font-bold px-4 py-2 rounded-md hover:bg-[#0369A1] shadow-sm transition-colors">Add Variation +</button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10 mt-6">
                            {(formData.models || []).map((model, idx) => (
                              <div key={idx} className="flex flex-col gap-2 p-3 bg-white border border-[#BAE6FD] rounded-lg shadow-sm">
                                <div className="flex justify-between items-center bg-[#F8FAFC] -mx-3 -mt-3 p-2 rounded-t-lg border-b border-[#E2E8F0]">
                                  <span className="text-xs font-bold text-[#64748B] uppercase">Variation #{idx + 1}</span>
                                  <button onClick={() => removeArrayItem('models', idx)} className="text-xs text-[#EF4444] hover:underline">Remove</button>
                                </div>
                                <div className="flex gap-2 items-center mt-2">
                                  <label className="text-xs font-bold w-16 uppercase text-[#64748B]">Name</label>
                                  <input type="text" value={model.wattage || ''} onChange={(e) => handleObjectChange('models', idx, 'wattage', e.target.value)} className="flex-1 text-sm p-1.5 border border-[#E2E8F0] rounded outline-none" placeholder="e.g. 100W Flood" />
                                </div>
                                <div className="flex gap-2 items-start">
                                  <label className="text-xs font-bold w-16 uppercase text-[#64748B] mt-2">PDF</label>
                                  <div className="flex-1">
                                    {model.tds ? (
                                      <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-md">
                                        <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        <span className="text-xs text-green-700 truncate flex-1">{model.tds.split('/').pop()}</span>
                                        <button onClick={() => handleObjectChange('models', idx, 'tds', '')} className="text-xs text-red-500 hover:underline shrink-0">Remove</button>
                                      </div>
                                    ) : (
                                      <div
                                        className="border-2 border-dashed border-[#CBD5E1] rounded-md p-3 text-center transition-colors hover:border-[#0284C7] hover:bg-[#F0F9FF] cursor-pointer"
                                        onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-[#0284C7]', 'bg-[#F0F9FF]'); }}
                                        onDragLeave={(e) => { e.currentTarget.classList.remove('border-[#0284C7]', 'bg-[#F0F9FF]'); }}
                                        onDrop={async (e) => {
                                          e.preventDefault();
                                          e.currentTarget.classList.remove('border-[#0284C7]', 'bg-[#F0F9FF]');
                                          const file = e.dataTransfer.files[0];
                                          if (!file) return;
                                          const fileName = `catalogs/${formData.slug || 'new'}/${Date.now()}_${file.name}`;
                                          const { error } = await supabase.storage.from('images').upload(fileName, file);
                                          if (!error) {
                                            const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);
                                            handleObjectChange('models', idx, 'tds', urlData.publicUrl);
                                          } else {
                                            alert('Upload failed: ' + error.message);
                                          }
                                        }}
                                      >
                                        <label className="cursor-pointer">
                                          <svg className="w-5 h-5 mx-auto text-[#94A3B8] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                          <span className="text-[10px] text-[#64748B]">Drop PDF or click to browse</span>
                                          <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (!file) return;
                                            const fileName = `catalogs/${formData.slug || 'new'}/${Date.now()}_${file.name}`;
                                            const { error } = await supabase.storage.from('images').upload(fileName, file);
                                            if (!error) {
                                              const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);
                                              handleObjectChange('models', idx, 'tds', urlData.publicUrl);
                                            } else {
                                              alert('Upload failed: ' + error.message);
                                            }
                                          }} />
                                        </label>
                                      </div>
                                    )}
                                    <input type="text" value={model.tds || ''} onChange={(e) => handleObjectChange('models', idx, 'tds', e.target.value)} className="w-full text-[10px] p-1 mt-1 border border-transparent hover:border-[#E2E8F0] focus:border-[#38BDF8] rounded outline-none text-[#94A3B8]" placeholder="Or paste URL manually" />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {(!formData.models || formData.models.length === 0) && (
                            <div className="relative z-10 bg-white/50 border border-[#BAE6FD]/50 p-4 rounded text-sm text-[#0284C7] mt-4">
                              No models defined. Add a model variation above to map PDFs.
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              ) : (
                <div className="h-[60vh] flex flex-col items-center justify-center text-[#94A3B8] border-2 border-dashed border-[#E2E8F0] rounded-2xl bg-[#F8FAFC]">
                  <Icons.Structure className="w-16 h-16 mb-4 text-[#CBD5E1]" />
                  <p className="font-medium text-lg text-[#64748B]">Select a product to start building.</p>
                  <p className="text-sm mt-1">Or click 'Add New Product' to expand your inventory.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer / Status bar (only shows if editing) */}
      {(activeTab === "products" && editingIndex !== null) && (
        <div className="fixed bottom-0 left-0 w-full bg-[#1E293B] text-white p-2 text-center text-xs border-t border-[#334155] z-50 animate-pulse">
          🟢 Database is currently open for edits. Be sure to hit "Publish Form" to commit changes to JSON!
        </div>
      )}
    </div>
  );
}
