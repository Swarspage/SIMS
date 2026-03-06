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
function SidebarInner({ collapsed, pathname, onLinkClick, onLogout }) {
  const roleLabel =
    localStorage.getItem("role") === "division" ||
      localStorage.getItem("role") === "division_incharge"
      ? "Division Incharge Portal"
      : "Admin Portal";

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex flex-col items-center py-6 px-4 border-b border-slate-200">
        <img
          src={logo}
          alt="logo"
          className={`object-contain transition-all ${collapsed ? "md:w-8 md:h-8 w-16 h-16" : "w-16 h-16"}`}
        />
        {!collapsed && (
          <>
            <p className="text-xs font-semibold text-center text-slate-700 leading-tight mt-2">
              Datta Meghe College Of Engineering
            </p>
            <span className="text-xs font-medium text-slate-500 mt-2 bg-blue-50 px-3 py-1 rounded-full">
              {roleLabel}
            </span>
          </>
        )}
      </div>

      {/* Nav - scrollable so it never clips on small screens */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={onLinkClick}
              title={collapsed ? item.name : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${isActive ? "bg-blue-500 text-white shadow-sm" : "text-slate-700 hover:bg-slate-200 hover:text-slate-900"}
                ${collapsed ? "md:justify-center md:px-2" : ""}`}
            >
              <span className="flex-shrink-0">{getIcon(item.name, isActive)}</span>
              <span className={`truncate ${collapsed ? "md:hidden" : ""}`}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-200">
        <button
          onClick={onLogout}
          title={collapsed ? "Logout" : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
            bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all
            ${collapsed ? "md:justify-center md:px-2" : ""}`}
        >
          <svg className="w-5 h-5 flex-shrink-0" stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className={`${collapsed ? "md:hidden" : ""}`}>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

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
        className="md:hidden fixed top-3 left-3 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
        className={`md:hidden fixed top-0 left-0 h-full w-72 max-w-[85vw] bg-gradient-to-b from-slate-50 to-slate-100 shadow-2xl z-50 transition-transform duration-300 flex flex-col
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute top-3 right-3 p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <SidebarInner collapsed={false} pathname={pathname} onLinkClick={() => setMobileOpen(false)} onLogout={handleLogout} />
      </aside>

      {/* ── Desktop sidebar ──────────────────────────────────── */}
      <aside
        className={`hidden md:flex flex-col sticky top-0 h-screen bg-gradient-to-b from-slate-50 to-slate-100 border-r border-slate-200 shadow-sm transition-all duration-300 flex-shrink-0
          ${collapsed ? "w-16" : "w-64"}`}
      >
        {/* collapse toggle */}
        <button
          className="absolute -right-3 top-6 z-10 bg-blue-500 text-white rounded-full p-1 shadow hover:bg-blue-600 transition"
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
              <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
        </button>
        <SidebarInner collapsed={collapsed} pathname={pathname} onLinkClick={() => { }} onLogout={handleLogout} />
      </aside>
    </>
  );
}
