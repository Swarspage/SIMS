import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  HomeIcon,
  ClipboardDocumentCheckIcon
} from "@heroicons/react/24/outline";
import { studentService } from "../services/studentService";
import { authService } from "../services/authService";
import avatar from "../assets/Students.png";

export default function Header({ showSearch = false }) {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        setStudentData({ 
          name: { firstName: "Administrator" }, 
          studentID: localStorage.getItem("adminEmail") || "ADMIN",
          role: "admin"
        });
      } else if (role === "division" || role === "divisionIncharge") {
        setStudentData({ 
          name: { firstName: "Division Incharge" }, 
          studentID: "DMCE-STAFF",
          role: "incharge"
        });
      }
    } catch (err) {
      console.error("Error fetching student data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      window.location.href = "/"; // Force fresh state
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const studentName = studentData?.name
    ? `${studentData.name.firstName || ""} ${studentData.name.lastName || ""}`.trim()
    : "Student";
  
  const displayID = studentData?.studentID || "DMCE";
  const photoUrl = studentData?.studentPhoto?.url || avatar;
  const userRole = localStorage.getItem("role") || "student";

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 py-4 bg-white/70 backdrop-blur-2xl border-b border-gray-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] sticky top-0 z-40 w-full gap-4 sm:gap-0 transition-all duration-500 rounded-b-xl sm:rounded-none">
      {/* Left: Welcome Section */}
      <div className="flex flex-col justify-center items-center sm:items-start w-full sm:w-auto animate-in fade-in slide-in-from-left duration-700">
        <h1 className="text-xl sm:text-[22px] font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          <span>Welcome back,</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm">
            {loading ? "..." : `${studentData?.name?.firstName || "User"}`}
          </span>
        </h1>
        <div className="flex items-center gap-2.5 mt-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] leading-none">
             {userRole === 'student' ? `ID: ${displayID}` : `ROLE: ${userRole}`}
          </span>
        </div>
      </div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center sm:justify-end animate-in fade-in slide-in-from-right duration-700">
        {/* Actions Group */}
        <div className="flex items-center gap-2 bg-gray-50/80 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200/60 shadow-sm">
          <button className="group relative p-2.5 text-gray-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] active:scale-95">
            <BellIcon className="h-[20px] w-[20px] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="group relative p-2.5 text-gray-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] active:scale-95">
            <ChatBubbleOvalLeftEllipsisIcon className="h-[20px] w-[20px] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110" />
          </button>
        </div>

        <div className="hidden sm:block h-10 w-px bg-gray-200/50 mx-1"></div>

        {/* Profile Section with Hover Popup */}
        <div className="relative group">
          <div className="flex items-center gap-3.5 p-1.5 pr-5 bg-white border border-gray-100 rounded-full cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-100 transition-all duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-0 group-hover:opacity-30 transition duration-500"></div>
              <img
                src={photoUrl}
                alt="profile"
                className="relative w-10 h-10 rounded-full object-cover border-[3px] border-white shadow-sm transition-all duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex-col hidden xs:flex justify-center">
              <span className="text-[13px] font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 tracking-wide">
                {loading ? "..." : studentName}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-1.5 py-0.5 rounded flex items-center">DMCE</span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{userRole}</span>
              </div>
            </div>
            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-transform duration-500 group-hover:rotate-180 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>

          {/* Hover Popup Menu */}
          <div className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100/50 p-2 overflow-hidden invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-50 origin-top-right scale-95 group-hover:scale-100">
            {/* Header / User Info */}
            <div className="flex my-2 mx-2">
               <div className="flex items-center gap-4 p-4 w-full bg-gradient-to-br from-blue-50 to-indigo-50/30 rounded-xl border border-blue-100/50">
                   <div className="w-14 h-14 rounded-full overflow-hidden border-[3px] border-white shadow-sm relative group-hover:shadow-md transition-shadow">
                      <img src={photoUrl} alt="profile bigger" className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-[15px] font-black text-gray-900 truncate tracking-tight">{studentName}</p>
                      <p className="text-[12px] font-bold text-blue-600 mt-0.5 bg-white w-fit px-2 py-0.5 rounded-md shadow-sm border border-blue-50">{displayID}</p>
                   </div>
               </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-1 mt-1 p-1">
              <button 
                onClick={() => navigate(userRole === 'admin' || userRole === 'division' || userRole === 'divisionIncharge' ? '/admin/dashboard' : '/student/dashboard')}
                className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
              >
                <HomeIcon className="h-5 w-5" />
                Dashboard
              </button>

              {userRole === 'student' && (
                <button 
                  onClick={() => navigate('/student/information')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                >
                  <UserIcon className="h-5 w-5" />
                  View Profile
                </button>
              )}

              {(userRole === 'admin' || userRole === 'division' || userRole === 'divisionIncharge') && (
                <button 
                  onClick={() => navigate('/admin/admission')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                >
                  <ClipboardDocumentCheckIcon className="h-5 w-5" />
                  Manage Admissions
                </button>
              )}

              {userRole === 'admin' && (
                <div className="px-3 py-1.5 mt-1 border-t border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheckIcon className="h-3.5 w-3.5" />
                  Privileged Access
                </div>
              )}
              
              <div className="h-px bg-slate-100 my-1"></div>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-sm font-bold"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Sign Out
              </button>
            </div>
            
            {/* Footer */}
            <div className="mt-2 px-3 pb-1 text-center">
               <p className="text-[9px] text-slate-400 italic">© 2024 DMCE Student Portal</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
