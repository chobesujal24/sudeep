"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Package, FolderOpen, MessageSquare, TrendingUp } from "lucide-react";

export default function Dashboard({ products = [] }) {
  const [stats, setStats] = useState({ categories: 0, leads: 0 });

  useEffect(() => {
    async function load() {
      try {
        // Count categories
        const { data: catData } = await supabase.from("categories").select("id");
        // Count leads
        const { data: leadData } = await supabase.from("leads").select("id");
        setStats({
          categories: catData?.length || 0,
          leads: leadData?.length || 0,
        });
      } catch (e) {
        /* tables may not exist yet */
      }
    }
    load();
  }, []);

  const cards = [
    { label: "Products", value: products.length, icon: Package, color: "#1E40AF" },
    { label: "Categories", value: stats.categories, icon: FolderOpen, color: "#0284C7" },
    { label: "Leads", value: stats.leads, icon: MessageSquare, color: "#059669" },
    { label: "Active", value: products.filter(p => p.status !== "inactive").length, icon: TrendingUp, color: "#D97706" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: c.color + "15", color: c.color }}>
                  <Icon size={20} />
                </div>
              </div>
              <h3 className="text-3xl font-extrabold text-[#0F172A]">{c.value}</h3>
              <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider mt-1">{c.label}</p>
            </div>
          );
        })}
      </div>
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-[#0F172A] mb-4">Recent Products</h3>
        <div className="space-y-2">
          {products.slice(0, 5).map((p, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-[#F1F5F9] last:border-0">
              <span className="text-sm font-medium text-[#1E293B]">{p.name}</span>
              <span className="text-xs text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-full">{p.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
