import React from "react";
import {
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import avatar from "../assets/Students.png";

// Header Component
function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm">
      {/* Left: Welcome Section */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
          Welcome (Name)
        </h1>
        <span className="text-sm text-gray-500">ID - DMCE</span>
      </div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center gap-5">
        <BellIcon className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer transition" />
        <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer transition" />
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">name</span>
            <span className="text-xs text-gray-500">ID</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// Sidebar Component
function Sidebar() {
  const items = [
    "Dashboard",
    "Admission",
    "Students",
    "Activities",
    "Achievements",
    "Internships",
    "Placements",
  ];

  const getIcon = (name) => {
    const common = {
      className: "w-6 h-6 flex-shrink-0",
      stroke: "currentColor",
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
      case "Students":
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
      case "Placements":
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

  return (
    <aside className="w-64 bg-gradient-to-b from-[#2f4db0] to-[#243a9f] text-white flex flex-col items-center justify-start min-h-screen p-8 pt-12">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          {/* glowing aura */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-blue-400/30 blur-3xl animate-pulse"></span>
          <img
            src={logo}
            alt="logo"
            className="relative w-24 h-24 object-contain animate-pulse"
          />
        </div>
        <div className="text-base font-semibold text-center mt-4">
          Datta Meghe College Of Engineering
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 w-full">
        {items.map((it) => (
          <div
            key={it}
            className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 cursor-pointer select-none text-lg
              ${
                it === "Placements"
                  ? "bg-white text-black font-semibold"
                  : "bg-white/20 hover:bg-white hover:text-black hover:translate-x-1"
              }`}
          >
            <span
              className={`${
                it === "Placements" ? "text-black" : "text-white/90"
              }`}
            >
              {getIcon(it)}
            </span>
            <span>{it}</span>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-10 text-xs opacity-80">© CSI DMCE</div>
    </aside>
  );
}

// Main Student Placement Page Component
export default function StudentPlacement() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          {/* Edit and Save Buttons */}
          <div className="flex justify-end gap-3 mb-6">
            <button className="px-6 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-[#0f172a] transition">
              Edit
            </button>
            <button className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition">
              Save
            </button>
          </div>

          {/* Placement Form */}
          <div className="bg-[#1e293b] rounded-2xl p-8">
            {/* Student ID */}
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">
                Student ID
              </label>
              <input
                type="text"
                placeholder="Student ID (Eg : 2023FHCO125)"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              />
            </div>

            {/* Placement and Company Name Row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Placement */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Placement
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                    <option value="">True or False</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>
            </div>

            {/* Placement Type and Role Row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Placement Type */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Placement Type
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                    <option value="">Placement Type</option>
                    <option value="oncampus">On-Campus</option>
                    <option value="offcampus">Off-Campus</option>
                    <option value="poolcampus">Pool Campus</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Role
                </label>
                <input
                  type="text"
                  placeholder="Role"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>
            </div>

            {/* Higher Studies and Exam Row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Higher Studies */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Higher Studies
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                    <option value="">True or False</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Exam */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Exam
                </label>
                <input
                  type="text"
                  placeholder="Exam Name"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>
            </div>

            {/* Score and Marksheet Row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Score */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Score
                </label>
                <input
                  type="text"
                  placeholder="Score"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* Marksheet */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Marksheet
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Upload PDF"
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24"
                    readOnly
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition">
                    UPLOAD
                  </button>
                  <input
                    type="file"
                    accept=".pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* LOI/Joining Letter/Offer Letter */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                LOI/Joining Letter/Offer Letter
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Letter"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24"
                  readOnly
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition">
                  UPLOAD
                </button>
                <input
                  type="file"
                  accept=".pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
