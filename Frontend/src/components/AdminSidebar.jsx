import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Admission", path: "/admin/admission" },
  { name: "Students", path: "/admin/students" },
  { name: "Division Incharges", path: "/admin/division-incharges" },
  { name: "Activities", path: "/admin/activities" },
  { name: "Achievements", path: "/admin/achievements" },
  { name: "Internships", path: "/admin/internships" },
  { name: "Placements", path: "/admin/placements" },
  { name: "Semester Info", path: "/admin/semester-info" },
];

function getIcon(name, isActive) {
  const common = {
    className: "w-5 h-5 flex-shrink-0",
    stroke: isActive ? "white" : "currentColor",
    fill: "none",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "Dashboard":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "Admission":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 2l7 4v6c0 5-3.58 9-7 9s-7-4-7-9V6l7-4z" />
          <path d="M8.5 12.5l3.5 2 3.5-2" />
        </svg>
      );
    case "Students":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
          <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
        </svg>
      );
    case "Activities":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M3 12h3l3 8 4-16 3 8h4" />
        </svg>
      );
    case "Achievements":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="6" />
          <path d="M8 22l4-3 4 3" />
        </svg>
      );
    case "Internships":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M16 3v4" />
          <path d="M8 3v4" />
          <path d="M3 11h18" />
        </svg>
      );
    case "Placements":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M3 12l2-2 4 4 8-8 4 4" />
          <path d="M21 21H3" />
        </svg>
      );
    case "Semester Info":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case "Division Incharges":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    default:
      return null;
  }
}

// Extracted outside parent to avoid remounting on every render
function SidebarInner({ pathname, onLinkClick, onLogout }) {
  const roleLabel =
    localStorage.getItem("role") === "division" ||
      localStorage.getItem("role") === "division_incharge"
      ? "Division Incharge Portal"
      : "Admin Portal";

  return (
    <div className="flex flex-col h-full bg-white/70 backdrop-blur-xl">
      {/* Logo Section */}
      <div className="flex flex-col items-center py-8 px-4 border-b border-slate-200/50">
        <img
          src={logo}
          alt="logo"
          className="w-20 h-20 object-contain transition-all duration-500"
        />
        <div className="mt-4 flex flex-col items-center animate-in fade-in slide-in-from-top-2 duration-700">
          <p className="text-[10px] font-bold text-center text-slate-400 uppercase tracking-widest leading-tight">
            Datta Meghe College Of Engineering
          </p>
          <span className="text-[10px] font-semibold text-blue-600 mt-2 bg-blue-50/80 backdrop-blur-sm border border-blue-100 px-3 py-1 rounded-full shadow-sm">
            {roleLabel}
          </span>
        </div>
      </div>

      {/* Nav Section - scrollable */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1.5 custom-scrollbar">
        {menuItems
          .filter((item) => {
            const role = localStorage.getItem("role");
            if (role === "division" && item.name === "Division Incharges") {
              return false;
            }
            return true;
          })
          .map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onLinkClick}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform active:scale-95
                ${isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200/50 ring-1 ring-blue-700/10"
                    : "text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-sm hover:translate-x-1"
                  }
                animate-in fade-in slide-in-from-left-4 duration-500`}
              >
                <span className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? "drop-shadow-sm" : ""}`}>
                  {getIcon(item.name, isActive)}
                </span>
                <span className="truncate transition-all duration-300 opacity-100">
                  {item.name}
                </span>
              </Link>
            );
          })}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-slate-200/50 bg-slate-50/30">
        <button
          onClick={onLogout}
          className="group w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold
            bg-red-50/50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-red-200/50
            active:scale-95"
        >
          <svg
            className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="transition-all duration-300 opacity-100">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      {/* ── Mobile hamburger ─────────────────────────────────── */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 duration-300"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* ── Mobile overlay ───────────────────────────────────── */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile drawer ────────────────────────────────────── */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white/90 backdrop-blur-2xl shadow-[20px_0_50px_rgba(0,0,0,0.1)] z-50 transition-transform duration-500 ease-out flex flex-col border-r border-white/20
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-300 active:scale-95"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <SidebarInner pathname={pathname} onLinkClick={() => setMobileOpen(false)} onLogout={handleLogout} />
      </aside>

      {/* ── Desktop sidebar ──────────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col sticky top-0 h-screen bg-white/80 backdrop-blur-xl border-r border-slate-200/50 shadow-sm transition-all duration-500 ease-in-out flex-shrink-0 z-30 w-72"
      >
        <SidebarInner pathname={pathname} onLinkClick={() => { }} onLogout={handleLogout} />
      </aside>
    </>
  );
}
