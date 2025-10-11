import React, { useState } from "react";
import {
  Bell,
  BellRing,
  Filter,
  Users,
  UserPlus,
  Settings,
  GraduationCap,
  LayoutDashboard,
  User,
} from "lucide-react";

const AdminStudentSection = () => {
  const [activeNav, setActiveNav] = useState("Students");

  const sidebarItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Admission", icon: <GraduationCap size={20} /> },
    { name: "Students", icon: <Users size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  const students = Array.from({ length: 8 }, (_, i) => ({
    id: `STU-${1000 + i}`,
    name: `Student ${i + 1}`,
    class: `Class ${i + 1}`,
    roll: `${i + 10}`,
    joinDate: "23-09-2022",
    assigned: 966 + i,
  }));

  return (
    <div className="flex h-screen bg-[#1E1E1E] text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0b1b49] flex flex-col items-center py-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-white rounded-full mb-2"></div>
          <h1 className="text-center text-sm font-semibold">
            Computer Society of India
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 w-full px-4">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveNav(item.name)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-all duration-300 transform
                ${
                  activeNav === item.name
                    ? "bg-blue-800 border-l-4 border-blue-400 translate-x-1"
                    : "hover:bg-blue-700 hover:translate-x-1"
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col bg-[#2A2A2A]">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-[#222] shadow-md">
          <div>
            <h2 className="text-lg font-semibold drop-shadow">
              Welcome, Admin
            </h2>
            <p className="text-sm text-gray-400">ID: ADM-001</p>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-12">
            <input
              type="text"
              placeholder="Search Student"
              className="w-full px-4 py-2 rounded-md bg-[#333] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Bell size={22} className="text-gray-300" />
            <div className="relative">
              <BellRing size={22} className="text-gray-300" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/32"
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium text-sm">Admin Name</p>
                <p className="text-xs text-gray-400">ID: ADM-001</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Header */}
        <section className="flex items-center justify-between px-8 py-4 bg-[#252525] shadow">
          <p className="text-gray-300 text-sm">
            Showing total <span className="font-semibold">50</span> Students
          </p>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-blue-800 px-3 py-2 rounded-md hover:bg-blue-700 transition-transform transform hover:-translate-y-1">
              <Filter size={18} />
              <span>Filters</span>
            </button>

            <div className="flex items-center space-x-3">
              <button className="bg-blue-900 px-4 py-2 rounded-md hover:bg-blue-700 transition-transform transform hover:-translate-y-1">
                Management Student
              </button>
              <button className="bg-green-700 px-4 py-2 rounded-md hover:bg-green-600 transition-transform transform hover:-translate-y-1">
                + Add Student
              </button>
              <button className="bg-[#3a3a3a] px-4 py-2 rounded-md hover:bg-[#4a4a4a] transition-transform transform hover:-translate-y-1">
                BATCH
              </button>
              <button className="bg-[#3a3a3a] px-4 py-2 rounded-md hover:bg-[#4a4a4a] transition-transform transform hover:-translate-y-1">
                CLASS
              </button>
            </div>
          </div>
        </section>

        {/* Student Cards */}
        <section className="flex-1 overflow-y-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white text-black rounded-lg shadow-md p-5 flex flex-col items-center hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <img
                src="https://via.placeholder.com/80"
                alt={student.name}
                className="w-20 h-20 rounded-full mb-3"
              />
              <h3 className="text-lg font-bold">{student.name}</h3>
              <p className="text-sm text-gray-600">
                {student.class} / Roll No: {student.roll}
              </p>
              <p className="text-xs text-gray-500 mb-3">{student.id}</p>

              <div className="w-full text-sm text-gray-700 space-y-1 mb-4">
                <p className="drop-shadow">Joined {student.joinDate}</p>
                <p className="drop-shadow">Assigned {student.assigned}</p>
                <p className="drop-shadow">INTERNSHIP</p>
                <p className="drop-shadow">ACHIEVEMENTS</p>
              </div>

              <button className="w-full bg-[#0b1b49] text-white py-2 rounded-md hover:bg-[#102b6b] transition-transform transform hover:-translate-y-1">
                View Profile
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default AdminStudentSection;
