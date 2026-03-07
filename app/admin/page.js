"use client";
import { useState, useEffect } from "react";

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
    setFormData(products[index]);
  };

  const startAdd = () => {
    setEditingIndex(null);
    setFormData({
      id: "new-product",
      name: "New Product",
      slug: "new-product-slug",
      description: "",
      shortDesc: "",
      category: "Lighting",
      mainImage: "/images/products/placeholder.jpg",
      images: [],
      features: [],
      specifications: {},
      applications: [],
    });
  };

  if (loading) return <div className="p-10 text-center">Loading admin interface...</div>;

  return (
    <div className="min-h-screen bg-[color:var(--color-bg-secondary)] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Col - Product List */}
        <div className="w-full md:w-1/3 bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Products ({products.length})</h2>
            <button 
              onClick={startAdd}
              className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              + Add New
            </button>
          </div>
          
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            {products.map((p, i) => (
              <div key={i} className="flex justify-between items-center p-3 border border-gray-200 rounded hover:bg-gray-50 bg-white">
                <span className="font-medium text-sm truncate pr-2">{p.name}</span>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(i)} className="text-blue-600 text-xs hover:underline">Edit</button>
                  <button onClick={() => handleDelete(i)} className="text-red-500 text-xs hover:underline">Del</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col - Edit Form */}
        <div className="w-full md:w-2/3 bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] rounded-xl p-6 shadow-sm">
          {Object.keys(formData).length > 0 ? (
            <div>
              <h2 className="text-xl font-bold mb-6">
                {editingIndex !== null ? `Editing: ${formData.name || ''}` : "Adding New Product"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Name</label>
                  <input type="text" value={formData.name || ''} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 border rounded text-sm" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Slug (URL)</label>
                  <input type="text" value={formData.slug || ''} 
                    onChange={e => setFormData({...formData, slug: e.target.value})}
                    className="w-full p-2 border rounded text-sm" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">ID</label>
                  <input type="text" value={formData.id || ''} 
                    onChange={e => setFormData({...formData, id: e.target.value})}
                    className="w-full p-2 border rounded text-sm" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Category</label>
                  <input type="text" value={formData.category || ''} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 border rounded text-sm" />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-600">Short Description</label>
                  <input type="text" value={formData.shortDesc || ''} 
                    onChange={e => setFormData({...formData, shortDesc: e.target.value})}
                    className="w-full p-2 border rounded text-sm" />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-600">Full Description</label>
                  <textarea value={formData.description || ''} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full p-2 border rounded text-sm h-32" />
                </div>
                
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-600">Main Image Path (e.g. /images/products/light.jpg)</label>
                  <input type="text" value={formData.mainImage || ''} 
                    onChange={e => setFormData({...formData, mainImage: e.target.value})}
                    className="w-full p-2 border rounded text-sm" />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex justify-end gap-3">
                <button 
                  onClick={() => {setEditingIndex(null); setFormData({});}}
                  className="px-6 py-2 border rounded font-medium text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded font-medium text-sm hover:bg-blue-700 shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a product from the left to edit, or add a new one.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
