"use client";
import { useState } from "react";

// Section components — create each file separately
import Jobs from "@/components/admin/Jobs";
import Applications from "@/components/admin/Applications";
import Users from "@/components/admin/Users";
import Overview from "@/components/admin/Overview";
import {
  ArrowLeft,
  ArrowRight,
  LayoutDashboard,
  Briefcase,
  FileText,
  UsersIcon,
} from "lucide-react";

// NAV CONFIG
const NAV = [
  { id: "overview", icon: LayoutDashboard, label: "Overview" },
  { id: "jobs", icon: Briefcase, label: "Jobs" },
  { id: "applications", icon: FileText, label: "Applications" },
  { id: "users", icon: UsersIcon, label: "Users" },
];

// ROOT
export default function SuperAdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Render the matching section component based on active nav
  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <Overview />;
      case "jobs":
        return <Jobs />;
      case "applications":
        return <Applications />;
      case "users":
        return <Users />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex h-screen bg-zinc-950 text-zinc-300 overflow-hidden pt-20"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
    >
      {/* ── SIDEBAR ───────────────────────────────────────────────────────── */}
      <aside
        role="navigation"
        aria-label="Admin navigation"
        className={`shrink-0 bg-zinc-950 border-r border-zinc-900 flex flex-col
          transition-all duration-200 overflow-hidden ${sidebarOpen ? "w-52" : "w-14"}`}
      >
        {/* Logo */}
        <div className="px-4 py-3.5 border-b border-zinc-900 flex items-center">
          {sidebarOpen && (
            <span className="text-xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent hidden sm:block">
              CareerPilot
            </span>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-2 flex flex-col gap-0.5">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              aria-current={activeSection === item.id ? "page" : undefined}
              title={!sidebarOpen ? item.label : undefined}
              className={`flex items-center gap-3 px-2.5 py-2.5 rounded-sm text-left w-full
                transition-all cursor-pointer border
                ${
                  activeSection === item.id
                    ? "bg-amber-400/10 border-amber-400/20 text-amber-400"
                    : "bg-transparent border-transparent text-zinc-600 hover:text-zinc-400"
                }`}
            >
              <span className="text-base w-5 text-center shrink-0">
                <item.icon size={16} className="shrink-0 w-5" />
              </span>
              {sidebarOpen && (
                <span className="font-mono text-xs font-semibold tracking-widest whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse / expand */}
        <div className="p-2 border-t border-zinc-900">
          <button
            onClick={() => setSidebarOpen((p) => !p)}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            className={`w-full py-2 px-2.5 bg-transparent border border-transparent rounded-sm
              cursor-pointer text-zinc-700 hover:text-zinc-500 font-mono text-xs transition-colors
              flex items-center ${sidebarOpen ? "justify-end" : "justify-center"}`}
          >
            {sidebarOpen ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
          </button>
        </div>
      </aside>

      {/* ── MAIN ──────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header
          className="h-14 border-b border-zinc-900 bg-zinc-950 flex items-center
          px-7 justify-between shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-zinc-700" style={{ fontSize: 11 }}>
              / admin
            </span>
            <span className="text-zinc-800">/</span>
            <span className="font-mono text-amber-400" style={{ fontSize: 11 }}>
              {activeSection}
            </span>
          </div>
        </header>

        {/* Active section content */}
        <main role="main" className="flex-1 overflow-y-auto p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
