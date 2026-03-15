"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Eye, Trash2, CheckCircle, Mail } from "lucide-react";

export default function LeadsManager() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState(null);

  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (data) setLeads(data);
      // Silently handle missing table — user needs to create it in Supabase
    } catch (e) { /* table may not exist yet */ }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this lead?")) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (!error) fetchLeads();
    else alert("Error: " + error.message);
  };

  const handleMarkReplied = async (id) => {
    const { error } = await supabase.from("leads").update({ replied: true }).eq("id", id);
    if (!error) fetchLeads();
    else alert("Error: " + error.message);
  };

  if (loading) return <div className="p-10 text-center text-[#64748B] font-bold">Loading leads...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#0F172A]">Leads / Inquiries</h2>
        <span className="text-sm text-[#64748B]">{leads.length} total</span>
      </div>

      {/* View Modal */}
      {viewing !== null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setViewing(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-xl text-[#0F172A] mb-4">Lead Details</h3>
            <div className="space-y-3 text-sm">
              <div><span className="font-bold text-[#475569]">Name:</span> <span className="text-[#1E293B]">{viewing.name}</span></div>
              <div><span className="font-bold text-[#475569]">Email:</span> <span className="text-[#1E293B]">{viewing.email}</span></div>
              <div><span className="font-bold text-[#475569]">Phone:</span> <span className="text-[#1E293B]">{viewing.phone || "—"}</span></div>
              <div><span className="font-bold text-[#475569]">Date:</span> <span className="text-[#1E293B]">{new Date(viewing.created_at).toLocaleString()}</span></div>
              <div><span className="font-bold text-[#475569]">Message:</span><p className="mt-1 text-[#334155] bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">{viewing.message}</p></div>
            </div>
            <button onClick={() => setViewing(null)} className="mt-6 px-4 py-2 bg-[#0F172A] text-white rounded-lg text-sm font-bold">Close</button>
          </div>
        </div>
      )}

      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <th className="text-left p-4 text-xs font-bold text-[#475569] uppercase">Name</th>
            <th className="text-left p-4 text-xs font-bold text-[#475569] uppercase">Email</th>
            <th className="text-left p-4 text-xs font-bold text-[#475569] uppercase">Phone</th>
            <th className="text-left p-4 text-xs font-bold text-[#475569] uppercase">Date</th>
            <th className="text-left p-4 text-xs font-bold text-[#475569] uppercase">Status</th>
            <th className="text-right p-4 text-xs font-bold text-[#475569] uppercase">Actions</th>
          </tr></thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                <td className="p-4 font-semibold text-[#1E293B]">{lead.name}</td>
                <td className="p-4 text-[#64748B]">{lead.email}</td>
                <td className="p-4 text-[#64748B]">{lead.phone || "—"}</td>
                <td className="p-4 text-[#64748B] text-xs">{new Date(lead.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  {lead.replied
                    ? <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full"><CheckCircle size={12} /> Replied</span>
                    : <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">New</span>
                  }
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => setViewing(lead)} className="text-[#1E40AF] hover:underline text-xs font-bold"><Eye size={14} className="inline -mt-0.5" /> View</button>
                  {!lead.replied && <button onClick={() => handleMarkReplied(lead.id)} className="text-green-600 hover:underline text-xs font-bold"><Mail size={14} className="inline -mt-0.5" /> Replied</button>}
                  <button onClick={() => handleDelete(lead.id)} className="text-[#EF4444] hover:underline text-xs font-bold"><Trash2 size={14} className="inline -mt-0.5" /> Delete</button>
                </td>
              </tr>
            ))}
            {leads.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-[#94A3B8]">No leads yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
