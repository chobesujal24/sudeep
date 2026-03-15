"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, Copy, Trash2, Image as ImageIcon, Check } from "lucide-react";

export default function MediaLibrary() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(null);

  useEffect(() => { fetchFiles(); }, []);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase.storage.from("images").list("uploads", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
      if (data) setFiles(data.filter(f => f.name !== ".emptyFolderPlaceholder"));
      if (error) console.error("List files error:", error);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleUpload = async (fileList) => {
    setUploading(true);
    for (const file of Array.from(fileList)) {
      const fileName = `uploads/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from("images").upload(fileName, file);
      if (error) alert("Upload failed: " + error.message);
    }
    setUploading(false);
    fetchFiles();
  };

  const getPublicUrl = (name) => {
    const { data } = supabase.storage.from("images").getPublicUrl(`uploads/${name}`);
    return data?.publicUrl || "";
  };

  const copyUrl = (name) => {
    navigator.clipboard.writeText(getPublicUrl(name));
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = async (name) => {
    if (!confirm("Delete this file?")) return;
    const { error } = await supabase.storage.from("images").remove([`uploads/${name}`]);
    if (error) alert("Error: " + error.message);
    else fetchFiles();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#0F172A]">Media Library</h2>
        <label className="flex items-center gap-2 px-4 py-2 bg-[#1E40AF] text-white rounded-lg text-sm font-semibold hover:bg-[#1D4ED8] cursor-pointer transition-colors">
          <Upload size={16} /> Upload Files
          <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleUpload(e.target.files)} />
        </label>
      </div>

      {/* Drop Zone */}
      <div
        className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-10 text-center mb-6 transition-colors hover:border-[#1E40AF] hover:bg-[#F0F9FF] cursor-pointer"
        onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("border-[#1E40AF]", "bg-[#F0F9FF]"); }}
        onDragLeave={(e) => { e.currentTarget.classList.remove("border-[#1E40AF]", "bg-[#F0F9FF]"); }}
        onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove("border-[#1E40AF]", "bg-[#F0F9FF]"); handleUpload(e.dataTransfer.files); }}
      >
        <ImageIcon size={32} className="mx-auto text-[#94A3B8] mb-2" />
        <p className="text-sm text-[#64748B] font-medium">Drag & drop images here</p>
        <p className="text-xs text-[#94A3B8] mt-1">PNG, JPG, GIF up to 10MB</p>
      </div>

      {uploading && <p className="text-sm text-[#1E40AF] mb-4 animate-pulse font-semibold">Uploading...</p>}

      {loading ? (
        <p className="text-center text-[#64748B] py-10">Loading media...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((f) => (
            <div key={f.name} className="group relative bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-square bg-[#F8FAFC] flex items-center justify-center">
                <img src={getPublicUrl(f.name)} alt={f.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://placehold.co/200x200/f1f5f9/94a3b8?text=No+Preview"; }} />
              </div>
              <div className="p-2">
                <p className="text-[10px] text-[#64748B] truncate">{f.name}</p>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => copyUrl(f.name)} className="bg-white text-[#0F172A] p-2 rounded-lg text-xs font-bold shadow hover:bg-[#F8FAFC]" title="Copy URL">
                  {copied === f.name ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
                <button onClick={() => handleDelete(f.name)} className="bg-red-500 text-white p-2 rounded-lg text-xs font-bold shadow hover:bg-red-600" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {files.length === 0 && <p className="col-span-full text-center text-[#94A3B8] py-10">No files uploaded yet.</p>}
        </div>
      )}
    </div>
  );
}
