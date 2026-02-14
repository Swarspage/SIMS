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
    <header className="flex flex-col sm:flex-row items-center justify-between px-3 xs:px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 shadow-sm sticky top-0 z-40 w-full gap-2 sm:gap-0">
      {/* Left: Welcome Section */}
      <div className="flex flex-col justify-center items-center sm:items-start w-full sm:w-auto mb-2 sm:mb-0">
        <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-slate-900 text-center sm:text-left">
          Welcome{loading ? "..." : `, ${studentName}`}
        </h1>
        <span className="text-xs xs:text-sm text-slate-500 text-center sm:text-left">
          ID - {studentID}
        </span>
      </div>
      {/* Right: Icons and Profile */}
      <div className="flex items-center gap-2 xs:gap-4 sm:gap-6 w-full sm:w-auto justify-center sm:justify-end">
        {/* Notification Icon */}
        <button className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-200 rounded-lg transition">
          <BellIcon className="h-5 w-5 xs:h-6 xs:w-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        {/* Message Icon */}
        <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-200 rounded-lg transition">
          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 xs:h-6 xs:w-6" />
        </button>
        {/* Divider */}
        <div className="hidden xs:block h-6 w-px bg-slate-300"></div>
        {/* Profile Section */}
        <div className="flex items-center gap-2 xs:gap-3 cursor-pointer group">
          <img
            src={photoUrl}
            alt="profile"
            className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-blue-500 group-hover:border-blue-600 transition"
          />
          <div className="flex-col hidden xs:flex">
            <span className="text-xs xs:text-sm font-semibold text-slate-900">
              {loading ? "..." : studentName}
            </span>
            <span className="text-xs text-slate-500">Student</span>
          </div>
        </div>
      </div>
    </header>
  );
}
