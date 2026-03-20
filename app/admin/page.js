"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Icons } from "@/components/Icons";
import { supabase } from "@/lib/supabase";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Dashboard from "@/components/admin/Dashboard";
import CategoriesManager from "@/components/admin/CategoriesManager";
import MediaLibrary from "@/components/admin/MediaLibrary";
import LeadsManager from "@/components/admin/LeadsManager";
import SeoSettings from "@/components/admin/SeoSettings";
import SiteSettings from "@/components/admin/SiteSettings";

const BlogManager = dynamic(() => import("@/components/admin/BlogManager"), {
  loading: () => <div className="p-10 text-center font-bold text-[#64748B]">Loading Blog CMS...</div>,
  ssr: false,
});

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [dbCategories, setDbCategories] = useState([]);

  const ALLOWED_EMAILS = ["chobesujal24@gmail.com", "sudeepengineers@gmail.com"];

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      handleSession(session);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleSession(session);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleSession = (session) => {
    if (session?.user) {
      if (ALLOWED_EMAILS.includes(session.user.email)) {
        setIsAuthenticated(true);
        setAuthError("");
      } else {
        setIsAuthenticated(false);
        setAuthError(`Access Denied: ${session.user.email} is not authorized.`);
        // Note: we let them stay signed in to Supabase technically, but they can't see the dashboard.
      }
    } else {
      setIsAuthenticated(false);
      setAuthError("");
    }
    setLoading(false);
  };

  const MAX_ATTEMPTS = 6;
  const ATTEMPT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

  const handleManualLogin = (e) => {
    e.preventDefault();
    
    // Check rate limit
    const now = Date.now();
    let attempts = JSON.parse(localStorage.getItem("admin_login_attempts") || "[]");
    
    // Filter attempts to only those within the 1-hour window
    attempts = attempts.filter((timestamp) => now - timestamp < ATTEMPT_WINDOW_MS);
    
    if (attempts.length >= MAX_ATTEMPTS) {
      const oldestAttempt = Math.min(...attempts);
      const waitTimeMinutes = Math.ceil((ATTEMPT_WINDOW_MS - (now - oldestAttempt)) / 60000);
      setAuthError(`Rate limit exceeded. Please try again in ${waitTimeMinutes} minutes.`);
      localStorage.setItem("admin_login_attempts", JSON.stringify(attempts));
      return;
    }

    // Record this attempt
    attempts.push(now);
    localStorage.setItem("admin_login_attempts", JSON.stringify(attempts));

    // Validate credentials
    if (username === "sudeep" && password === "sudeep@2424") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError(`Invalid credentials. ${MAX_ATTEMPTS - attempts.length} attempts remaining.`);
    }
  };

  const signInWithGoogle = async () => {
    setAuthError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/admin",
      },
    });
    if (error) setAuthError(error.message);
  };

  const handleLogout = async () => {
    // Check if using Supabase auth before signing out
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
  };

  useEffect(() => { if (isAuthenticated) fetchProducts(); }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const { data: dbData } = await supabase.from("settings").select("data").eq("id", "productData").single();
      if (dbData?.data?.products?.length > 0) {
        setProducts(dbData.data.products);
      } else {
        const res = await fetch("/api/product");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          await supabase.from("settings").upsert({ id: "productData", data: { products: data } });
        }
      }

      // Also fetch categories for the dropdown
      const { data: catData } = await supabase.from("categories").select("*").order("name");
      if (catData) setDbCategories(catData);

    } catch (error) {
      console.error("Failed to fetch products/categories:", error);
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        if (Array.isArray(data)) setProducts(data);
      } catch (e) { console.error("API fallback also failed:", e); }
    }
  };

  const handleSave = async () => {
    try {
      let updatedProducts = [...products];
      if (editingIndex !== null) updatedProducts[editingIndex] = formData;
      else updatedProducts.push(formData);
      const { error } = await supabase.from("settings").upsert({ id: "productData", data: { products: updatedProducts } });
      if (error) throw error;
      setProducts(updatedProducts);
      setEditingIndex(null);
      setFormData({});
      alert("Products updated successfully!");
    } catch (error) {
      alert("Error saving: " + (error.message || error.toString()));
    }
  };

  const handleDelete = async (index) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const updatedProducts = products.filter((_, i) => i !== index);
      const { error } = await supabase.from("settings").upsert({ id: "productData", data: { products: updatedProducts } });
      if (error) throw error;
      setProducts(updatedProducts);
      alert("Product deleted!");
    } catch (error) { alert("Error deleting product."); }
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    const p = JSON.parse(JSON.stringify(products[index]));
    p.images = p.images || []; p.specs = p.specs || [];
    p.applications = p.applications || []; p.models = p.models || [];
    p.catalogs = p.catalogs || []; p.metaTitle = p.metaTitle || "";
    p.metaDescription = p.metaDescription || ""; p.status = p.status || "active";
    setFormData(p);
  };

  const startAdd = () => {
    setEditingIndex(null);
    setFormData({ id: "new-product", slug: "new-product-slug", name: "New Product", category: "Outdoor Lighting", description: "", specs: [], applications: [], images: [], catalogs: [], models: [], metaTitle: "", metaDescription: "", status: "active" });
  };

  // Array handlers
  const handleArrayChange = (field, index, value) => { const a = [...(formData[field] || [])]; a[index] = value; setFormData({ ...formData, [field]: a }); };
  const addArrayItem = (field, def = "") => { setFormData({ ...formData, [field]: [...(formData[field] || []), def] }); };
  const removeArrayItem = (field, index) => { setFormData({ ...formData, [field]: (formData[field] || []).filter((_, i) => i !== index) }); };
  const handleObjectChange = (field, index, key, value) => { const a = [...(formData[field] || [])]; a[index][key] = value; setFormData({ ...formData, [field]: a }); };
  const addObjectItem = (field, def) => { setFormData({ ...formData, [field]: [...(formData[field] || []), def] }); };
  
  // Drag and drop reordering
  const handleDragSort = (field, dragIndex, dropIndex) => {
    if (dragIndex === dropIndex) return;
    const a = [...(formData[field] || [])];
    const item = a.splice(dragIndex, 1)[0];
    a.splice(dropIndex, 0, item);
    setFormData({ ...formData, [field]: a });
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
          <div className="space-y-6">
            <button 
              onClick={signInWithGoogle}
              className="w-full py-3 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg font-bold shadow-sm transition-all flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#CBD5E1]"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-[#94A3B8]">Or continue with credentials</span></div>
            </div>

            <form onSubmit={handleManualLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#166534]/30 outline-none text-[#0F172A]" placeholder="Enter username" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#166534]/30 outline-none text-[#0F172A]" placeholder="Enter password" />
              </div>
              
              {authError && (
                <div className="bg-red-50 py-3 px-4 rounded-lg border border-red-100">
                  <p className="text-red-600 text-xs font-bold text-center mb-1">{authError}</p>
                  {authError.includes("Access Denied") && (
                    <button type="button" onClick={handleLogout} className="w-full text-xs text-red-500 hover:text-red-700 underline font-medium mt-1">
                      Sign out to try another account
                    </button>
                  )}
                </div>
              )}
              
              <button type="submit" className="w-full py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg font-bold shadow-md transition-all">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Product editor content
  const renderProductEditor = () => (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* LEFT – Product List */}
      <div className="w-full lg:w-1/4 flex flex-col gap-4">
        <button onClick={startAdd} className="w-full py-4 border-2 border-dashed border-[#CBD5E1] bg-white text-[#166534] rounded-xl font-bold hover:bg-[#F0FDF4] hover:border-[#166534] transition-all flex items-center justify-center gap-2 shadow-sm">
          Add New Product
        </button>
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden sticky top-[5rem]">
          <div className="p-4 bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <h2 className="text-sm font-bold text-[#475569] uppercase tracking-wider">Product Directory ({products.length})</h2>
          </div>
          <div className="max-h-[65vh] overflow-y-auto">
            {products.map((p, i) => (
              <div key={i} className={`flex justify-between items-center p-4 border-b border-[#F8FAFC] cursor-pointer transition-colors ${editingIndex === i ? "bg-[#F0FDF4] border-l-4 border-l-[#166534]" : "hover:bg-[#F8FAFC]"}`} onClick={() => startEdit(i)}>
                <div className="pr-2 max-w-[160px]">
                  <span className="font-semibold text-[0.9rem] truncate text-[#1E293B] block">{p.name}</span>
                  {p.status === "inactive" && <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full font-bold">Inactive</span>}
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(i); }} className="text-[#EF4444] text-xs font-bold hover:underline shrink-0">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT – Editor */}
      <div className="w-full lg:w-3/4 pb-20">
        {Object.keys(formData).length > 0 ? (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-2xl font-bold text-[#0F172A]">{editingIndex !== null ? `Editing: ${formData.name}` : "Creating New Product"}</h2>
              <div className="flex items-center gap-3">
                <button onClick={() => setPreviewOpen(true)} className="px-4 py-2 border border-[#166534] text-[#166534] rounded-lg text-sm font-bold hover:bg-[#F0FDF4] transition-colors">Preview</button>
                <select value={formData.status || "active"} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="px-3 py-2 border border-[#CBD5E1] rounded-lg text-sm font-medium text-[#1E293B] bg-white">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button onClick={() => { setEditingIndex(null); setFormData({}); }}
                  className="px-4 py-2 border border-[#475569] text-[#475569] rounded-lg font-medium text-sm hover:bg-[#F8FAFC]">Discard</button>
                <button onClick={handleSave} className="px-6 py-2 bg-[#166534] hover:bg-[#15803D] text-white rounded-lg font-bold text-sm shadow transition-all">Publish</button>
              </div>
            </div>

            <div className="p-8 space-y-10">
              {/* Basic Info */}
              <section>
                <h3 className="text-lg font-bold border-b pb-2 mb-4">Basic Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Product Title</label>
                    <input type="text" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#166534]/30 outline-none text-[#0F172A]" placeholder="e.g. LED Flood Light" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#475569] uppercase mb-1">URL Slug</label>
                    <input type="text" value={formData.slug || ""} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg outline-none text-[#0F172A]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Unique ID</label>
                    <input type="text" value={formData.id || ""} onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      className="w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none text-[#0F172A]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Category</label>
                    <select
                      value={formData.category || ""}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none text-[#0F172A] bg-white"
                    >
                      <option value="">Select Category</option>
                      {dbCategories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Full Description</label>
                    <textarea value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-3 border border-[#CBD5E1] rounded-lg outline-none min-h-[120px] text-[#0F172A]" />
                  </div>
                </div>
              </section>

              {/* SEO Fields */}
              <section>
                <h3 className="text-lg font-bold border-b pb-2 mb-4">SEO Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Meta Title</label>
                    <input type="text" value={formData.metaTitle || ""} onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      className="w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none text-[#0F172A]" placeholder="SEO title for this product" />
                    <p className="text-[10px] text-[#94A3B8] mt-1">{(formData.metaTitle || "").length}/60</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Meta Description</label>
                    <input type="text" value={formData.metaDescription || ""} onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      className="w-full p-2.5 border border-[#CBD5E1] rounded-lg outline-none text-[#0F172A]" placeholder="SEO description for this product" />
                    <p className="text-[10px] text-[#94A3B8] mt-1">{(formData.metaDescription || "").length}/160</p>
                  </div>
                </div>
              </section>

              {/* Applications & Images */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Applications / Use Cases</h3>
                    <button onClick={() => addArrayItem("applications", "New Application")} className="text-xs bg-white border border-[#CBD5E1] px-2 py-1 shadow-sm rounded hover:border-[#166534]">Add +</button>
                  </div>
                  <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                    {(formData.applications || []).map((app, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input type="text" value={app} onChange={(e) => handleArrayChange("applications", idx, e.target.value)} className="flex-1 p-2 text-sm border border-[#CBD5E1] rounded-md outline-none focus:border-[#166534]" />
                        <button onClick={() => removeArrayItem("applications", idx)} className="px-3 bg-[#FEE2E2] text-[#EF4444] rounded-md hover:bg-[#FECACA]">✕</button>
                      </div>
                    ))}
                    {(!formData.applications || formData.applications.length === 0) && <p className="text-xs text-[#94A3B8]">No applications defined.</p>}
                  </div>
                </div>

                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Image Gallery</h3>
                    <label className="text-xs bg-white border border-[#CBD5E1] px-2 py-1 shadow-sm rounded hover:border-[#166534] cursor-pointer">
                      Browse Files
                      <input type="file" accept="image/*" multiple className="hidden" onChange={async (e) => {
                        for (const file of Array.from(e.target.files)) {
                          const fileName = `products/${formData.slug || "new"}/${Date.now()}_${file.name}`;
                          const { error } = await supabase.storage.from("images").upload(fileName, file);
                          if (!error) {
                            const { data: urlData } = supabase.storage.from("images").getPublicUrl(fileName);
                            setFormData((prev) => ({ ...prev, images: [...(prev.images || []), urlData.publicUrl] }));
                          } else alert("Upload failed: " + error.message);
                        }
                      }} />
                    </label>
                  </div>
                  <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2">
                    {(formData.images || []).map((img, idx) => (
                      <div 
                        key={idx} 
                        draggable 
                        onDragStart={(e) => e.dataTransfer.setData("text/plain", idx)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const dragIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
                          handleDragSort("images", dragIndex, idx);
                        }}
                        className="relative group rounded-lg overflow-hidden border border-[#E2E8F0] bg-white aspect-square cursor-move"
                        title="Drag to reorder"
                      >
                        <img src={img} onError={(e) => { e.target.src = "https://placehold.co/200x200/f1f5f9/64748b?text=No+Image"; }} alt="" className="w-full h-full object-cover pointer-events-none" />
                        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <Icons.Engineering className="w-4 h-4 text-white/70" /> 
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button onClick={() => removeArrayItem("images", idx)} className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-red-600">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input type="text" id="manual-image-url" placeholder="Or paste image URL..." className="flex-1 p-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#166534]" />
                    <button onClick={() => { const input = document.getElementById("manual-image-url"); if (input.value) { setFormData((prev) => ({ ...prev, images: [...(prev.images || []), input.value] })); input.value = ""; } }}
                      className="text-xs bg-[#0F172A] text-white px-3 py-1.5 rounded-md">Add URL</button>
                  </div>
                </div>
              </section>

              {/* Specs */}
              <section>
                <div className="flex items-center justify-between border-b pb-2 mb-4">
                  <h3 className="text-lg font-bold">Technical Specifications</h3>
                  <button onClick={() => addObjectItem("specs", { label: "Spec", value: "Value" })} className="text-xs bg-[#0F172A] text-white px-3 py-1.5 rounded-md">Add Spec +</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(formData.specs || []).map((spec, idx) => (
                    <div 
                      key={idx} 
                      draggable 
                      onDragStart={(e) => e.dataTransfer.setData("text/plain", idx)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const dragIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
                        handleDragSort("specs", dragIndex, idx);
                      }}
                      className="flex gap-2 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg items-center group relative shadow-sm cursor-move hover:border-[#CBD5E1] transition-colors"
                      title="Drag to reorder"
                    >
                      <div className="text-[#94A3B8] cursor-move px-1 flex flex-col gap-[2px]">
                        <div className="w-1 h-1 bg-[#CBD5E1] rounded-full"></div>
                        <div className="w-1 h-1 bg-[#CBD5E1] rounded-full"></div>
                        <div className="w-1 h-1 bg-[#CBD5E1] rounded-full"></div>
                      </div>
                      <input type="text" value={spec.label} onChange={(e) => handleObjectChange("specs", idx, "label", e.target.value)} className="w-[100px] text-xs font-bold uppercase p-1.5 border-b border-transparent hover:border-[#CBD5E1] focus:border-[#166534] outline-none bg-transparent" placeholder="LABEL" />
                      <span className="text-[#94A3B8]">:</span>
                      <input type="text" value={spec.value} onChange={(e) => handleObjectChange("specs", idx, "value", e.target.value)} className="flex-1 text-sm p-1.5 border-b border-transparent hover:border-[#CBD5E1] focus:border-[#166534] outline-none bg-transparent" />
                      <button onClick={() => removeArrayItem("specs", idx)} className="opacity-0 group-hover:opacity-100 absolute -right-2 -top-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md">✕</button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Models */}
              <section>
                <div className="flex items-center justify-between border-b pb-2 mb-4">
                  <h3 className="text-lg font-bold">Product Models & Catalogs</h3>
                  <button onClick={() => addObjectItem("models", { wattage: "100W", tds: "" })} className="text-xs bg-[#0284C7] text-white font-bold px-4 py-2 rounded-md">Add Variation +</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(formData.models || []).map((model, idx) => (
                    <div 
                      key={idx} 
                      draggable 
                      onDragStart={(e) => e.dataTransfer.setData("text/plain", idx)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const dragIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
                        handleDragSort("models", dragIndex, idx);
                      }}
                      className="flex flex-col gap-2 p-3 bg-white border border-[#E2E8F0] rounded-lg shadow-sm cursor-move hover:border-[#CBD5E1] transition-colors"
                      title="Drag to reorder"
                    >
                      <div className="flex justify-between items-center bg-[#F8FAFC] -mx-3 -mt-3 p-2 rounded-t-lg border-b border-[#E2E8F0]">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col gap-[2px]">
                            <div className="w-1 h-1 bg-[#CBD5E1] rounded-full"></div>
                            <div className="w-1 h-1 bg-[#CBD5E1] rounded-full"></div>
                            <div className="w-1 h-1 bg-[#CBD5E1] rounded-full"></div>
                          </div>
                          <span className="text-xs font-bold text-[#64748B] uppercase">Variation #{idx + 1}</span>
                        </div>
                        <button onClick={() => removeArrayItem("models", idx)} className="text-xs text-[#EF4444] hover:underline">Remove</button>
                      </div>
                      <div className="flex gap-2 items-center mt-2">
                        <label className="text-xs font-bold w-16 uppercase text-[#64748B]">Name</label>
                        <input type="text" value={model.wattage || ""} onChange={(e) => handleObjectChange("models", idx, "wattage", e.target.value)} className="flex-1 text-sm p-1.5 border border-[#E2E8F0] rounded outline-none" />
                      </div>
                      <div className="flex gap-2 items-center">
                        <label className="text-xs font-bold w-16 uppercase text-[#64748B]">TDS</label>
                        <input type="text" value={model.tds || ""} onChange={(e) => handleObjectChange("models", idx, "tds", e.target.value)} className="flex-1 text-xs p-1.5 border border-[#E2E8F0] rounded outline-none text-[#64748B]" placeholder="Paste PDF URL" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        ) : (
          <div className="h-[60vh] flex flex-col items-center justify-center text-[#94A3B8] border-2 border-dashed border-[#E2E8F0] rounded-2xl bg-[#F8FAFC]">
            <Icons.Structure className="w-16 h-16 mb-4 text-[#CBD5E1]" />
            <p className="font-medium text-lg text-[#64748B]">Select a product to start building.</p>
            <p className="text-sm mt-1">Or click &apos;Add New Product&apos; to expand your inventory.</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewOpen && formData.name && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={() => setPreviewOpen(false)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
              <h3 className="font-bold text-lg text-[#0F172A]">Product Preview</h3>
              <button onClick={() => setPreviewOpen(false)} className="text-[#94A3B8] hover:text-[#0F172A] text-xl">✕</button>
            </div>
            <div className="p-8">
              {formData.images?.[0] && <img src={formData.images[0]} alt="" className="w-full h-[300px] object-cover rounded-xl mb-6" onError={(e) => { e.target.style.display = "none"; }} />}
              <span className="inline-block bg-[#166534]/10 text-[#166534] text-xs font-bold px-3 py-1 rounded-full uppercase mb-3">{formData.category}</span>
              <h1 className="text-3xl font-bold text-[#0F172A] mb-3">{formData.name}</h1>
              <p className="text-[#334155] mb-6 leading-relaxed">{formData.description}</p>
              {(formData.specs || []).length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-[#0F172A] mb-3">Technical Specifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {formData.specs.map((s, i) => (
                      <div key={i} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3">
                        <span className="text-[10px] text-[#475569] font-bold uppercase">{s.label}</span>
                        <p className="text-sm text-[#1E293B] font-medium">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {(formData.applications || []).length > 0 && (
                <div>
                  <h3 className="font-bold text-[#0F172A] mb-3">Applications</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.applications.map((a, i) => (
                      <span key={i} className="bg-[#166534]/5 border border-[#166534]/10 text-[#166534] text-sm px-3 py-1 rounded-md">✔ {a}</span>
                    ))}
                  </div>
                </div>
              )}
              {formData.metaTitle && (
                <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                  <p className="text-xs text-[#94A3B8] uppercase font-bold mb-1">SEO Preview</p>
                  <p className="text-[#166534] text-base font-medium">{formData.metaTitle}</p>
                  <p className="text-[#059669] text-xs mb-0.5">
                    sudeepengineers.com/product/{dbCategories.find(c => c.name === formData.category)?.slug || "category-slug"}/{formData.slug}
                  </p>
                  <p className="text-[#475569] text-sm">{formData.metaDescription}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard products={products} />;
      case "products": return renderProductEditor();
      case "categories": return <CategoriesManager />;
      case "media": return <MediaLibrary />;
      case "leads": return <LeadsManager />;
      case "blog": return <BlogManager />;
      case "seo": return <SeoSettings />;
      case "site": return <SiteSettings />;
      default: return <Dashboard products={products} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans pt-16">
      <div className="flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
        <main className="flex-1 p-8 min-h-[calc(100vh-64px)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
