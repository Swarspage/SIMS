import React from "react";
import {
  FaEye,
  FaDownload,
  FaSearch,
  FaBell,
  FaCommentDots,
  FaUserCircle,
} from "react-icons/fa";
import achievements from "../data/achievements";
import logo from "../assets/logo.png";

export default function App() {
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
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-[#243a9f] text-white flex flex-col items-center justify-start min-h-screen p-8 pt-12">
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
                it === "Achievements"
                  ? "bg-white text-black font-semibold"
                  : "bg-white/20 hover:bg-white hover:text-black hover:translate-x-1"
              }`}
            >
              <span
                className={`${
                  it === "Achievements" ? "text-black" : "text-white/90"
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

      <div className="flex-1">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm">
          {/* Left: Welcome Section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">
              Welcome (Name)
            </h1>
            <span className="text-sm text-gray-500">ID - DMCE</span>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md">
              <FaSearch className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search Student"
                className="w-full border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-5">
            <FaBell className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer transition" />
            <FaCommentDots className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer transition" />
            <FaUserCircle className="h-10 w-10 text-gray-600 hover:text-blue-600 cursor-pointer transition" />
            <h1>Admin</h1>
          </div>
        </header>

        <main className="p-6">
          {/* Heading */}
          <div className="mb-4 text-lg font-semibold">
            Showing total{" "}
            <span className="text-blue-600">{achievements.length}</span>{" "}
            Achievements
          </div>

          {/* Filter / Buttons Row */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button className="px-4 py-2 border rounded bg-white">
              Filters
            </button>
            <button className="px-4 py-2 rounded border bg-yellow-100">
              Student Achievements
            </button>
            <button className="px-4 py-2 rounded bg-blue-900 text-white">
              + Add Achievement
            </button>
            <button className="px-4 py-2 rounded border">CATEGORY</button>
            <button className="px-4 py-2 rounded border">YEAR</button>
          </div>

          {/* Achievement Cards */}
          <div className="bg-[#0f2130] rounded-2xl p-6 min-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-md font-bold text-center text-gray-900 uppercase">
                      {achievement.title}
                    </h3>
                    <p className="text-center text-gray-500 text-sm mb-2">
                      {achievement.student}
                    </p>

                    <p className="text-gray-700 text-sm text-center mb-4">
                      {achievement.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800">
                        {achievement.date}
                      </p>
                      <div className="flex gap-2">
                        <button className="p-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition">
                          <FaEye />
                        </button>
                        <button className="p-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition">
                          <FaDownload />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
