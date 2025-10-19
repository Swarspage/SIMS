import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import avatar from "../assets/Students.png";
import activitiesData from "../data/activities";

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
                it === "Activities"
                  ? "bg-white text-black font-semibold"
                  : "bg-white/20 hover:bg-white hover:text-black hover:translate-x-1"
              }`}
          >
            <span
              className={`${
                it === "Activities" ? "text-black" : "text-white/90"
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

// Activity Card Component with Remove Button
function ActivityCard({ activity, onRemove }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
      {/* Remove Button */}
      <button
        onClick={() => onRemove(activity.id)}
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition z-10"
        title="Remove Activity"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="bg-gray-200 h-40 flex items-center justify-center">
        {/* Placeholder for activity image */}
        <div className="text-gray-400 text-sm">Activity Image</div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{activity.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{activity.date}</p>
        <p className="text-xs text-blue-600 mb-2 font-semibold">
          {activity.type}
        </p>
        <p className="text-sm text-gray-600 line-clamp-3">
          {activity.description}
        </p>
      </div>
    </div>
  );
}

// Main Activities Page Component
export default function StudentActivity() {
  const [activities, setActivities] = useState(activitiesData);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "",
    certificate: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      certificate: e.target.files[0],
    }));
  };

  const handleAddActivity = () => {
    if (
      formData.title &&
      formData.description &&
      formData.date &&
      formData.type
    ) {
      const newActivity = {
        id: activities.length + 1,
        name: formData.title,
        date: formData.date,
        type: formData.type,
        description: formData.description,
      };
      setActivities((prev) => [...prev, newActivity]);
      // Reset form
      setFormData({
        title: "",
        description: "",
        date: "",
        type: "",
        certificate: null,
      });
      alert("Activity added successfully!");
    } else {
      alert("Please fill all fields!");
    }
  };

  const handleSubmit = () => {
    console.log("Submitting all activities:", activities);
    alert(`Submitted ${activities.length} activities successfully!`);
  };

  const handleRemoveActivity = (id) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mb-6">
            <button
              onClick={handleAddActivity}
              className="px-6 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-[#0f172a] transition"
            >
              +Add Activity
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
            >
              Submit All
            </button>
          </div>

          {/* Form Section + Activities Grid Combined */}
          <div className="bg-[#1e293b] rounded-2xl p-8">
            {/* Title */}
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                rows="4"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-gray-800"
              />
            </div>

            {/* Date and Type Row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Date */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                  />
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Type
                </label>
                <div className="relative">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800"
                  >
                    <option value="">Type</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Competition">Competition</option>
                    <option value="Cultural">Cultural</option>
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

            {/* Certificate Upload */}
            <div className="mb-8">
              <label className="block text-white text-sm font-medium mb-2">
                Certificate
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={
                    formData.certificate
                      ? formData.certificate.name
                      : "UPLOAD CERTIFICATE"
                  }
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                  readOnly
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Activities Count */}
            <div className="mb-4">
              <h2 className="text-white text-xl font-semibold">
                Total Activities:{" "}
                <span className="text-green-400">{activities.length}</span>
              </h2>
            </div>

            {/* Activities Grid - Now inside the dark container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onRemove={handleRemoveActivity}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
