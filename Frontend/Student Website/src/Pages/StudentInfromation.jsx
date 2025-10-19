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
                it === "Students"
                  ? "bg-white text-black font-semibold"
                  : "bg-white/20 hover:bg-white hover:text-black hover:translate-x-1"
              }`}
          >
            <span
              className={`${
                it === "Students" ? "text-black" : "text-white/90"
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

// Main Student Information Page Component
export default function StudentInformation() {
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

          {/* Student Information Form */}
          <div className="bg-[#1e293b] rounded-2xl p-8">
            {/* First Name, Middle Name, Last Name Row */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              {/* First Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* Middle Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  placeholder="Middle Name"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>
            </div>

            {/* Mother's Name and Student Photo Row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Mother's Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Mother's Name
                </label>
                <input
                  type="text"
                  placeholder="Mother's Name"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* Student Photo */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Student Photo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Upload Photo (Recent With White Background)"
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24"
                    readOnly
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition">
                    UPLOAD
                  </button>
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth, Blood Group, Branch Row */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              {/* Date of Birth */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                  />
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Blood Group
                </label>
                <input
                  type="text"
                  placeholder="Blood Group"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* Branch */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Branch
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                    <option value="">Branch</option>
                    <option value="computer">Computer Engineering</option>
                    <option value="mechanical">Mechanical Engineering</option>
                    <option value="civil">Civil Engineering</option>
                    <option value="electrical">Electrical Engineering</option>
                    <option value="electronics">Electronics Engineering</option>
                    <option value="it">Information Technology</option>
                    <option value="aids">
                      Artificial Intelligence and Data Science
                    </option>
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
            </div>

            {/* Current Address */}
            <div className="mb-6">
              <h3 className="text-white text-lg font-semibold mb-4">
                Current Address
              </h3>
              {/* Street */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Street"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* City and Pincode */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Pincode"
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                  />
                </div>
              </div>
            </div>

            {/* Native Address */}
            <div className="mb-6">
              <h3 className="text-white text-lg font-semibold mb-4">
                Native Address
              </h3>
              {/* Street */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Street"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* City and Pincode */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Pincode"
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                  />
                </div>
              </div>
            </div>

            {/* Category and Email Row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Category */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Category"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>
            </div>

            {/* Password and Confirm Password Row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Password */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="MAX 8 CHARACTERS"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
                <p className="text-red-400 text-xs mt-1">
                  Password should Contain 8 character (1capital,1Number,1Special
                  char)
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="MAX 8 CHARACTERS"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>
            </div>

            {/* Mobile No. and Parents Mobile No. Row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Mobile No. */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Mobile No.
                </label>
                <input
                  type="tel"
                  placeholder="Mobile No."
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* Parents Mobile No. */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Parents Mobile No.
                </label>
                <input
                  type="tel"
                  placeholder="Parents Mobile No."
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>
            </div>

            {/* Enrollment Number and Student ID Row */}
            <div className="grid grid-cols-2 gap-6">
              {/* Enrollment Number */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Enrollment Number
                </label>
                <input
                  type="text"
                  placeholder="Enrollment Number"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Student ID
                </label>
                <input
                  type="text"
                  placeholder="Student ID (2023FHCO125)"
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
