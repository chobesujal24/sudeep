"use client";
import { LayoutDashboard, Package, FolderOpen, Image, MessageSquare, FileText, Settings, Globe, LogOut } from "lucide-react";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "categories", label: "Categories", icon: FolderOpen },
  { id: "media", label: "Media Library", icon: Image },
  { id: "leads", label: "Leads", icon: MessageSquare },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "seo", label: "SEO Settings", icon: Globe },
  { id: "site", label: "Site Settings", icon: Settings },
];

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }) {
  return (
    <aside className="w-[240px] shrink-0 bg-[#0F172A] min-h-[calc(100vh-64px)] sticky top-16 flex flex-col">
      <div className="p-5 border-b border-[#1E293B]">
        <h2 className="text-white font-bold text-sm">Sudeep CMS</h2>
        <p className="text-[#64748B] text-[10px] mt-0.5">Admin Panel</p>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#166534] text-white shadow-md"
                  : "text-[#94A3B8] hover:text-white hover:bg-[#1E293B]"
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-[#1E293B]">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#EF4444] hover:bg-[#1E293B] transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
