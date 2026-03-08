import React, { useState, useEffect } from "react";
import {
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { studentService } from "../services/studentService";
import avatar from "../assets/Students.png";

export default function Header({ showSearch = false }) {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  const fetchStudentInfo = async () => {
    try {
      const role = localStorage.getItem("role");

      // Only fetch student data if the user is a student
      if (role === "student") {
        const response = await studentService.getMyData();
        const student = response.data || response.student || response;
        setStudentData(student);
      } else if (role === "admin") {
        setStudentData({ name: { firstName: "Admin" }, studentID: "ADMIN" });
      } else if (role === "division" || role === "divisionIncharge") {
        setStudentData({ name: { firstName: "Division Incharge" }, studentID: "DIV-INC" });
        // Optionally fetch specific incharge details here if an endpoint exists
      }
    } catch (err) {
      console.error("Error fetching student data:", err);
    } finally {
      setLoading(false);
    }
  };

  const studentName = studentData?.name
    ? `${studentData.name.firstName || ""} ${studentData.name.lastName || ""
      }`.trim()
    : "Student";
  const studentID = studentData?.studentID || "DMCE";
  const photoUrl = studentData?.studentPhoto?.url || avatar;

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-3 bg-white/80 backdrop-blur-lg border-b border-slate-200/40 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)] sticky top-0 z-40 w-full gap-3 sm:gap-0 transition-all duration-300">
      {/* Left: Welcome Section */}
      <div className="flex flex-col justify-center items-center sm:items-start w-full sm:w-auto animate-in fade-in slide-in-from-left duration-700">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Welcome</span>
          <span className="text-blue-600">
            {loading ? "..." : `, ${studentData?.name?.firstName || "Student"}`}
          </span>
        </h1>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
            ID: {studentID}
          </span>
        </div>
      </div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto justify-center sm:justify-end animate-in fade-in slide-in-from-right duration-700">
        {/* Actions Group */}
        <div className="flex items-center gap-1.5 bg-slate-100/50 p-1 rounded-xl border border-slate-200/30">
          {/* Notification Icon */}
          <button className="group relative p-2 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-300 hover:shadow-sm">
            <BellIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white ring-2 ring-rose-500/20"></span>
          </button>
          {/* Message Icon */}
          <button className="group relative p-2 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-300 hover:shadow-sm">
            <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-px bg-slate-200/60 mx-1"></div>

        {/* Profile Section */}
        <div className="flex items-center gap-3 p-1.5 pr-4 bg-slate-50/50 border border-slate-200/60 rounded-2xl cursor-pointer group hover:bg-white hover:shadow-md hover:border-blue-200 transition-all duration-300 active:scale-95">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
            <img
              src={photoUrl}
              alt="profile"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200 group-hover:ring-blue-400 transition-all duration-300"
            />
          </div>
          <div className="flex-col hidden xs:flex">
            <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {loading ? "..." : studentName}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">DMCE</span>
              <span className="text-[10px] text-slate-400">•</span>
              <span className="text-[10px] text-slate-400 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
