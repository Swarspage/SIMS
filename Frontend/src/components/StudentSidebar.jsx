import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function StudentSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/student/dashboard" },
    { name: "Admission", path: "/student/admission" },
    { name: "Information", path: "/student/information" },
    { name: "Activities", path: "/student/activity" },
    { name: "Achievements", path: "/student/achievements" },
    { name: "Internships", path: "/student/internship" },
    { name: "Placements and Higher Studies", path: "/student/placement" },
  ];

  // COLORS for icon: normal, active, hover
  const getIcon = (name, isActive) => {
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
            <rect x="3" y="3" width="7" height="9" rx="1"></rect>
            <rect x="14" y="3" width="7" height="5" rx="1"></rect>
            <rect x="14" y="12" width="7" height="9" rx="1"></rect>
            <rect x="3" y="14" width="7" height="7" rx="1"></rect>
          </svg>
        );
      case "Admission":
        return (
          <svg {...common} viewBox="0 0 24 24">
            <path d="M12 2l7 4v6c0 5-3.58 9-7 9s-7-4-7-9V6l7-4z"></path>
            <path d="M8.5 12.5l3.5 2 3.5-2"></path>
          </svg>
        );
      case "Information":
        return (
          <svg {...common} viewBox="0 0 24 24">
            <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"></path>
            <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1"></path>
          </svg>
        );
      case "Activities":
        return (
          <svg {...common} viewBox="0 0 24 24">
            <path d="M3 12h3l3 8 4-16 3 8h4"></path>
          </svg>
        );
      case "Achievements":
        return (
          <svg {...common} viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="6"></circle>
            <path d="M8 22l4-3 4 3"></path>
          </svg>
        );
      case "Internships":
        return (
          <svg {...common} viewBox="0 0 24 24">
            <rect x="3" y="7" width="18" height="13" rx="2"></rect>
            <path d="M16 3v4"></path>
            <path d="M8 3v4"></path>
            <path d="M3 11h18"></path>
          </svg>
        );
      case "Placements and Higher Studies":
        return (
          <svg {...common} viewBox="0 0 24 24">
            <path d="M3 12l2-2 4 4 8-8 4 4"></path>
            <path d="M21 21H3"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        onClick={() => setCollapsed(!collapsed)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800 flex flex-col justify-between h-screen top-0 p-4 shadow-lg border-r border-slate-200 transition-all duration-300 z-50
          fixed md:sticky left-0
          ${collapsed ? "-translate-x-full md:translate-x-0 md:w-20 md:min-w-[80px]" : "translate-x-0 w-64 min-w-[256px]"}
        `}
      >
        {/* Collapse Button (Desktop Only) */}
        <button
          className="hidden md:block absolute -right-4 top-6 z-10 bg-blue-500 text-white rounded-full p-1 shadow transition-all duration-300 group"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? (
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
              <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
        </button>

        {/* Close Button (Mobile Only) */}
        <button
          className="md:hidden absolute right-4 top-4 text-slate-500 hover:text-slate-800"
          onClick={() => setCollapsed(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Top Section */}
        <div className="flex flex-col">
          {/* Logo Section */}
          <div
            className={`flex flex-col items-center mb-12 pb-8 border-b-2 border-slate-200 ${collapsed ? "md:gap-2" : ""
              }`}
          >
            <div className="relative mb-3">
              <img
                src={logo}
                alt="logo"
                className={`relative ${collapsed ? "md:w-10 md:h-10 w-20 h-20" : "w-20 h-20"
                  } object-contain transition-all`}
              />
            </div>
            {(!collapsed || window.innerWidth < 768) && (
              <div className={`text-xs font-semibold text-center text-slate-700 leading-tight ${collapsed ? "md:hidden" : "block"}`}>
                Datta Meghe College Of Engineering
              </div>
            )}
          </div>
          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => window.innerWidth < 768 && setCollapsed(true)}
                  className={`group px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 text-sm font-medium
                    ${isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                    }
                  `}
                >
                  <span className="flex-shrink-0 flex items-center justify-center">
                    {getIcon(item.name, isActive)}
                  </span>
                  <span className={`${collapsed ? "md:hidden" : "block"}`}>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        {/* Bottom Section - Logout */}
        <div className="flex flex-col gap-3 pt-6 border-t-2 border-slate-200">
          <button
            onClick={handleLogout}
            className="px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 text-sm font-medium w-full
              bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              stroke="currentColor"
              fill="none"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span className={`${collapsed ? "md:hidden" : "block"}`}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
