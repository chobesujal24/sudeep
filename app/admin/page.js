"use client";
import { useState, useEffect } from "react";
import { Icons } from "@/components/Icons";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
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

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProducts),
      });

      if (res.ok) {
        setProducts(updatedProducts);
        setEditingIndex(null);
        setFormData({});
        alert("Products updated successfully!");
      } else {
        alert("Failed to save changes.");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving data.");
    }
  };

  const handleDelete = async (index) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const updatedProducts = products.filter((_, i) => i !== index);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProducts),
      });

      if (res.ok) {
        setProducts(updatedProducts);
        alert("Product deleted!");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setFormData(JSON.parse(JSON.stringify(products[index]))); // Deep copy safely
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
          {Object.keys(formData).length > 0 && (
            <div className="flex gap-3">
              <button 
                onClick={() => {setEditingIndex(null); setFormData({});}}
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
      </div>

      <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row gap-8">
        
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
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full p-2.5 border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#38BDF8] outline-none text-[#0F172A]" placeholder="e.g. LED Flood Light" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#475569] uppercase mb-1">URL Slug</label>
                      <input type="text" value={formData.slug || ''} 
                        onChange={e => setFormData({...formData, slug: e.target.value})}
                        className="w-full p-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#38BDF8] outline-none text-[#0F172A]" placeholder="e.g. led-flood-light" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Unique ID</label>
                      <input type="text" value={formData.id || ''} 
                        onChange={e => setFormData({...formData, id: e.target.value})}
                        className="w-full p-2.5 border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#38BDF8] outline-none text-[#0F172A]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Category</label>
                      <input type="text" value={formData.category || ''} 
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full p-2.5 border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#38BDF8] outline-none text-[#0F172A]" />
                    </div>
                    <div className="md:col-span-2">
                       <label className="block text-xs font-bold text-[#475569] uppercase mb-1">Full Description</label>
                       <textarea value={formData.description || ''} 
                        onChange={e => setFormData({...formData, description: e.target.value})}
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

                  {/* Images */}
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5">
                     <div className="flex items-center justify-between mb-4">
                       <h3 className="font-bold">Image Gallery</h3>
                       <button onClick={() => addArrayItem('images', "/images/placeholder.jpg")} className="text-xs bg-white border border-[#CBD5E1] px-2 py-1 shadow-sm rounded hover:border-[#38BDF8]">Add Image +</button>
                     </div>
                     <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                       {(formData.images || []).map((img, idx) => (
                         <div key={idx} className="flex gap-2 items-center bg-white p-2 border rounded-md">
                           <img src={img} onError={(e)=> {e.target.src="https://via.placeholder.com/50"}} alt="" className="w-10 h-10 object-cover bg-gray-100 rounded border border-[#E2E8F0] block" />
                           <input type="text" value={img} onChange={(e) => handleArrayChange('images', idx, e.target.value)} className="flex-1 p-1.5 text-xs text-[#64748B] border border-transparent hover:border-[#CBD5E1] focus:border-[#38BDF8] rounded-md outline-none" placeholder="/assets/img.jpg" />
                           <button onClick={() => removeArrayItem('images', idx)} className="text-[#EF4444] hover:bg-[#FEE2E2] rounded px-2">✕</button>
                         </div>
                       ))}
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
                         <button onClick={() => addObjectItem('specs', {label: "Spec", value: "Value"})} className="text-xs bg-[#0F172A] text-white px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">Add Spec row +</button>
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

                    {/* Specific Wattage Models */}
                    <div className="bg-[#F0F9FF] border border-[#BAE6FD] shadow-sm rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                         <Icons.Engineering className="w-32 h-32 text-[#0284C7]" />
                      </div>
                      <div className="flex items-center justify-between mb-4 relative z-10">
                         <div className="flex flex-col">
                           <h4 className="font-bold text-[#0369A1] text-lg">Product Models & Catalogs</h4>
                           <span className="text-xs text-[#0284C7] max-w-lg">Assign specific models (e.g. 50W, 100W) to their PDF TDS Document mappings.</span>
                         </div>
                         <button onClick={() => addObjectItem('models', {wattage: "100W", tds: "/catalogs/sheet.pdf"})} className="text-xs bg-[#0284C7] text-white font-bold px-4 py-2 rounded-md hover:bg-[#0369A1] shadow-sm transition-colors">Add Variation +</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10 mt-6">
                        {(formData.models || []).map((model, idx) => (
                          <div key={idx} className="flex flex-col gap-2 p-3 bg-white border border-[#BAE6FD] rounded-lg shadow-sm">
                            <div className="flex justify-between items-center bg-[#F8FAFC] -mx-3 -mt-3 p-2 rounded-t-lg border-b border-[#E2E8F0]">
                               <span className="text-xs font-bold text-[#64748B] uppercase">Variation #{idx+1}</span>
                               <button onClick={() => removeArrayItem('models', idx)} className="text-xs text-[#EF4444] hover:underline">Remove</button>
                            </div>
                            <div className="flex gap-2 items-center mt-2">
                              <label className="text-xs font-bold w-16 uppercase text-[#64748B]">Name</label>
                              <input type="text" value={model.wattage} onChange={(e) => handleObjectChange('models', idx, 'wattage', e.target.value)} className="flex-1 text-sm p-1.5 border border-[#E2E8F0] rounded outline-none" placeholder="e.g. 100W Flood" />
                            </div>
                            <div className="flex gap-2 items-center">
                              <label className="text-xs font-bold w-16 uppercase text-[#64748B]">PDF Sheet</label>
                              <input type="text" value={model.tds} onChange={(e) => handleObjectChange('models', idx, 'tds', e.target.value)} className="flex-1 text-sm p-1.5 border border-[#E2E8F0] rounded outline-none" placeholder="/catalogs/sheet.pdf" />
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
      
      {/* Footer / Status bar (only shows if editing) */}
      {editingIndex !== null && (
         <div className="fixed bottom-0 left-0 w-full bg-[#1E293B] text-white p-2 text-center text-xs border-t border-[#334155] z-50 animate-pulse">
           🟢 Database is currently open for edits. Be sure to hit "Publish Form" to commit changes to JSON!
         </div>
      )}
    </div>
  );
}
