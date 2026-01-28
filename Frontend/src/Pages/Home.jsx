import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Sample data for achievements
  const achievements = [
    {
      title: "Annual Tech Summit 2024",
      details: "Innovation and technology showcase",
    },
    {
      title: "Research Excellence Award",
      details: "Recognizing outstanding research work",
    },
    {
      title: "Sports Championship",
      details: "Inter-university sports competition",
    },
  ];

  // Sample events icons (simplified representations)
  const eventIcons = [
    // Top Row
    "📊",
    "🔷",
    "📈",
    "🏠",
    "🔶",
    // Bottom Row
    "⚡",
    "⚙️",
    "🔗",
    "🔲",
    "📊",
  ];

  // Sample student success stories
  const successStories = [
    {
      name: "STUDENT NAME",
      course: "COURSE/COLLEGE",
      company: "COMPANY/NAME PACKAGE",
    },
    {
      name: "STUDENT NAME",
      course: "COURSE/COLLEGE",
      company: "COMPANY/NAME PACKAGE",
    },
    {
      name: "STUDENT NAME",
      course: "COURSE/COLLEGE",
      company: "COMPANY/NAME PACKAGE",
    },
    {
      name: "STUDENT NAME",
      course: "COURSE/COLLEGE",
      company: "COMPANY/NAME PACKAGE",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header/Navigation Bar */}
      <header className="border-b border-[#182137]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#1D3EA1] rounded-full flex items-center justify-center text-white font-bold">
                ✕
              </div>
              <span className="text-xl font-bold text-[#1D3EA1]">EDU</span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-[#182137] hover:text-[#1D3EA1] font-medium"
              >
                HOME
              </a>
              <a
                href="#"
                className="text-[#182137] hover:text-[#1D3EA1] font-medium"
              >
                ABOUT US
              </a>
              <a
                href="#"
                className="text-[#182137] hover:text-[#1D3EA1] font-medium"
              >
                EVENTS
              </a>
              <a
                href="#"
                className="text-[#182137] hover:text-[#1D3EA1] font-medium"
              >
                CONTACT US
              </a>
            </nav>

            {/* Search Bar and Login Buttons */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <svg
                  className="w-4 h-4 text-gray-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="outline-none text-sm w-32"
                />
              </div>

              {/* Student Login Button */}
              <button
                onClick={() => navigate("/login")}
                className="bg-[#1D3EA1] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition duration-200"
              >
                Student Login
              </button>

              {/* Admin Login Button */}
              <button
                onClick={() => navigate("/admin/login")}
                className="bg-[#0b234f] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#182137] transition duration-200 border border-white"
              >
                Admin Login
              </button>

              {/* ✅ NEW: Division Incharge Login Button */}
              <button
                onClick={() => navigate("/division/login")}
                className="bg-white text-[#1D3EA1] border border-[#1D3EA1] px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition duration-200"
              >
                Division Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Hero Section (Placeholder) */}
      <section className="h-96 bg-gradient-to-r from-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1D3EA1] mb-4">
            Welcome to Our Platform
          </h1>
          <p className="text-gray-600 text-lg">
            Empowering students beyond academics
          </p>
        </div>
      </section>

      {/* Beyond the Classroom Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1D3EA1] mb-4">
              Beyond the Classroom
            </h2>
            <p className="text-black text-xl">Achivement</p>
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="border border-[#182137] rounded-lg overflow-hidden shadow-lg"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gray-800 flex items-center justify-center text-white">
                  Image
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{achievement.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Events
          </h2>

          {/* Event Icons Grid */}
          <div className="max-w-4xl mx-auto">
            {/* Top Row */}
            <div className="flex justify-center space-x-8 mb-8">
              {eventIcons.slice(0, 5).map((icon, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-white border border-[#182137] rounded-lg flex items-center justify-center text-2xl hover:bg-gray-100 cursor-pointer transition duration-200"
                >
                  {icon}
                </div>
              ))}
            </div>

            {/* Bottom Row */}
            <div className="flex justify-center space-x-8">
              {eventIcons.slice(5, 10).map((icon, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-white border border-[#182137] rounded-lg flex items-center justify-center text-2xl hover:bg-gray-100 cursor-pointer transition duration-200"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Success Stories Section */}
      <section className="py-16 bg-[#1D3EA1]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Student Success Stories
          </h2>

          {/* Student Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {successStories.map((student, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-lg"
              >
                {/* Profile Image Placeholder */}
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center relative">
                  <div className="w-8 h-8 bg-[#1D3EA1] rounded-full flex items-center justify-center text-white absolute bottom-0 right-0">
                    +
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{student.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{student.course}</p>
                <p className="text-gray-800 font-medium">{student.company}</p>
              </div>
            ))}
          </div>

          {/* Grid Icons Pattern */}
          <div className="flex justify-center space-x-4 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-white text-2xl">
                ▣
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-white text-2xl">
                ▣
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-white text-2xl">
                ▣
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-white text-2xl">
                ▣
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-white text-2xl">
                ▣
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Difference We Make Section */}
      <section className="py-20 bg-[#1D3EA1]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white">
            The Difference We Make
          </h2>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#182137] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Left Section - Links */}
            <div className="flex space-x-8 mb-6 md:mb-0">
              <a
                href="#"
                className="hover:text-gray-300 transition duration-200"
              >
                About Us
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition duration-200"
              >
                Community
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition duration-200"
              >
                Legal
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition duration-200"
              >
                Support
              </a>
            </div>

            {/* Right Section - Social Media Icons */}
            <div className="flex space-x-4">
              {/* Facebook */}
              <div className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition duration-200">
                <span className="text-sm">f</span>
              </div>
              {/* Instagram */}
              <div className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition duration-200">
                <span className="text-sm">📷</span>
              </div>
              {/* LinkedIn */}
              <div className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition duration-200">
                <span className="text-sm">in</span>
              </div>
              {/* Twitter */}
              <div className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition duration-200">
                <span className="text-sm">𝕏</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
