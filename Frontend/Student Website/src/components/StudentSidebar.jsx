// // import React from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import logo from "../assets/logo.png";

// // export default function StudentSidebar() {
// //   const location = useLocation();

// //   const menuItems = [
// //     { name: "Dashboard", path: "/student/dashboard" },
// //     { name: "Admission", path: "/student/admission" },
// //     { name: "Information", path: "/student/information" },
// //     { name: "Activities", path: "/student/activity" },
// //     { name: "Achievements", path: "/student/achievements" },
// //     { name: "Internships", path: "/student/internship" },
// //     { name: "Placements", path: "/student/placement" },
// //   ];

// //   const getIcon = (name) => {
// //     const common = {
// //       className: "w-6 h-6 flex-shrink-0",
// //       stroke: "currentColor",
// //       fill: "none",
// //       strokeWidth: 1.5,
// //       strokeLinecap: "round",
// //       strokeLinejoin: "round",
// //     };
// //     switch (name) {
// //       case "Dashboard":
// //         return (
// //           <svg {...common} viewBox="0 0 24 24">
// //             <rect x="3" y="3" width="7" height="9" rx="1"></rect>
// //             <rect x="14" y="3" width="7" height="5" rx="1"></rect>
// //             <rect x="14" y="12" width="7" height="9" rx="1"></rect>
// //             <rect x="3" y="14" width="7" height="7" rx="1"></rect>
// //           </svg>
// //         );
// //       case "Admission":
// //         return (
// //           <svg {...common} viewBox="0 0 24 24">
// //             <path d="M12 2l7 4v6c0 5-3.58 9-7 9s-7-4-7-9V6l7-4z"></path>
// //             <path d="M8.5 12.5l3.5 2 3.5-2"></path>
// //           </svg>
// //         );
// //       case "Information":
// //         return (
// //           <svg {...common} viewBox="0 0 24 24">
// //             <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"></path>
// //             <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1"></path>
// //           </svg>
// //         );
// //       case "Activities":
// //         return (
// //           <svg {...common} viewBox="0 0 24 24">
// //             <path d="M3 12h3l3 8 4-16 3 8h4"></path>
// //           </svg>
// //         );
// //       case "Achievements":
// //         return (
// //           <svg {...common} viewBox="0 0 24 24">
// //             <circle cx="12" cy="8" r="6"></circle>
// //             <path d="M8 22l4-3 4 3"></path>
// //           </svg>
// //         );
// //       case "Internships":
// //         return (
// //           <svg {...common} viewBox="0 0 24 24">
// //             <rect x="3" y="7" width="18" height="13" rx="2"></rect>
// //             <path d="M16 3v4"></path>
// //             <path d="M8 3v4"></path>
// //             <path d="M3 11h18"></path>
// //           </svg>
// //         );
// //       case "Placements":
// //         return (
// //           <svg {...common} viewBox="0 0 24 24">
// //             <path d="M3 12l2-2 4 4 8-8 4 4"></path>
// //             <path d="M21 21H3"></path>
// //           </svg>
// //         );
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <aside className="w-64 bg-gradient-to-b from-[#2f4db0] to-[#243a9f] text-white flex flex-col items-center justify-start min-h-screen p-8 pt-12">
// //       {/* Logo Section */}
// //       <div className="flex flex-col items-center mb-8">
// //         <div className="relative">
// //           <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-blue-400/30 blur-3xl animate-pulse"></span>
// //           <img
// //             src={logo}
// //             alt="logo"
// //             className="relative w-24 h-24 object-contain animate-pulse"
// //           />
// //         </div>
// //         <div className="text-base font-semibold text-center mt-4">
// //           Datta Meghe College Of Engineering
// //         </div>
// //       </div>

// //       {/* Navigation */}
// //       <nav className="flex flex-col gap-4 w-full">
// //         {menuItems.map((item) => {
// //           const isActive = location.pathname === item.path;
// //           return (
// //             <Link
// //               key={item.name}
// //               to={item.path}
// //               className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 cursor-pointer select-none text-lg
// //                 ${
// //                   isActive
// //                     ? "bg-white text-black font-semibold"
// //                     : "bg-white/20 hover:bg-white hover:text-black hover:translate-x-1"
// //                 }`}
// //             >
// //               <span className={`${isActive ? "text-black" : "text-white/90"}`}>
// //                 {getIcon(item.name)}
// //               </span>
// //               <span>{item.name}</span>
// //             </Link>
// //           );
// //         })}
// //       </nav>

// //       {/* Footer */}
// //       <div className="mt-10 text-xs opacity-80">© CSI DMCE</div>
// //     </aside>
// //   );
// // }

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import logo from "../assets/logo.png";

// export default function StudentSidebar() {
//   const location = useLocation();

//   const menuItems = [
//     { name: "Dashboard", path: "/student/dashboard" },
//     { name: "Admission", path: "/student/admission" },
//     { name: "Information", path: "/student/information" },
//     { name: "Activities", path: "/student/activity" },
//     { name: "Achievements", path: "/student/achievements" },
//     { name: "Internships", path: "/student/internship" },
//     { name: "Placements", path: "/student/placement" },
//   ];

//   const getIcon = (name) => {
//     const common = {
//       className: "w-5 h-5 flex-shrink-0",
//       stroke: "currentColor",
//       fill: "none",
//       strokeWidth: 1.5,
//       strokeLinecap: "round",
//       strokeLinejoin: "round",
//     };
//     switch (name) {
//       case "Dashboard":
//         return (
//           <svg {...common} viewBox="0 0 24 24">
//             <rect x="3" y="3" width="7" height="9" rx="1"></rect>
//             <rect x="14" y="3" width="7" height="5" rx="1"></rect>
//             <rect x="14" y="12" width="7" height="9" rx="1"></rect>
//             <rect x="3" y="14" width="7" height="7" rx="1"></rect>
//           </svg>
//         );
//       case "Admission":
//         return (
//           <svg {...common} viewBox="0 0 24 24">
//             <path d="M12 2l7 4v6c0 5-3.58 9-7 9s-7-4-7-9V6l7-4z"></path>
//             <path d="M8.5 12.5l3.5 2 3.5-2"></path>
//           </svg>
//         );
//       case "Information":
//         return (
//           <svg {...common} viewBox="0 0 24 24">
//             <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"></path>
//             <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1"></path>
//           </svg>
//         );
//       case "Activities":
//         return (
//           <svg {...common} viewBox="0 0 24 24">
//             <path d="M3 12h3l3 8 4-16 3 8h4"></path>
//           </svg>
//         );
//       case "Achievements":
//         return (
//           <svg {...common} viewBox="0 0 24 24">
//             <circle cx="12" cy="8" r="6"></circle>
//             <path d="M8 22l4-3 4 3"></path>
//           </svg>
//         );
//       case "Internships":
//         return (
//           <svg {...common} viewBox="0 0 24 24">
//             <rect x="3" y="7" width="18" height="13" rx="2"></rect>
//             <path d="M16 3v4"></path>
//             <path d="M8 3v4"></path>
//             <path d="M3 11h18"></path>
//           </svg>
//         );
//       case "Placements":
//         return (
//           <svg {...common} viewBox="0 0 24 24">
//             <path d="M3 12l2-2 4 4 8-8 4 4"></path>
//             <path d="M21 21H3"></path>
//           </svg>
//         );
//       default:
//         return null;
//     }
//   };

//   const handleLogout = () => {
//     // Logout functionality to be added later
//     console.log("Logout clicked");
//   };

//   return (
//     <aside className="w-64 bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800 flex flex-col justify-between h-screen sticky top-0 p-6 shadow-lg border-r border-slate-200">
//       {/* Top Section */}
//       <div className="flex flex-col">
//         {/* Logo Section */}
//         <div className="flex flex-col items-center mb-12 pb-8 border-b-2 border-slate-200">
//           <div className="relative mb-3">
//             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-blue-100/50 blur-2xl"></div>
//             <img
//               src={logo}
//               alt="logo"
//               className="relative w-20 h-20 object-contain"
//             />
//           </div>
//           <div className="text-xs font-semibold text-center text-slate-700 leading-tight">
//             Datta Meghe College Of Engineering
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col gap-2">
//           {menuItems.map((item) => {
//             const isActive = location.pathname === item.path;
//             return (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className={`px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 text-sm font-medium
//                   ${
//                     isActive
//                       ? "bg-blue-500 text-white shadow-md"
//                       : "text-slate-700 hover:bg-slate-200 hover:text-slate-900"
//                   }`}
//               >
//                 <span className="flex-shrink-0">{getIcon(item.name)}</span>
//                 <span>{item.name}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Bottom Section - Logout */}
//       <div className="flex flex-col gap-3 pt-6 border-t-2 border-slate-200">
//         <button
//           onClick={handleLogout}
//           className="px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 text-sm font-medium w-full
//             bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
//         >
//           <svg
//             className="w-5 h-5 flex-shrink-0"
//             stroke="currentColor"
//             fill="none"
//             strokeWidth="1.5"
//             viewBox="0 0 24 24"
//           >
//             <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
//           </svg>
//           <span>Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// }

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function StudentSidebar() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ ADD THIS

  const menuItems = [
    { name: "Dashboard", path: "/student/dashboard" },
    { name: "Admission", path: "/student/admission" },
    { name: "Information", path: "/student/information" },
    { name: "Activities", path: "/student/activity" },
    { name: "Achievements", path: "/student/achievements" },
    { name: "Internships", path: "/student/internship" },
    { name: "Placements", path: "/student/placement" },
  ];

  const getIcon = (name) => {
    const common = {
      className: "w-5 h-5 flex-shrink-0",
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

  // ✅ UPDATED LOGOUT FUNCTION
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    // Navigate to home
    navigate("/");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800 flex flex-col justify-between h-screen sticky top-0 p-6 shadow-lg border-r border-slate-200">
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12 pb-8 border-b-2 border-slate-200">
          <div className="relative mb-3">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-blue-100/50 blur-2xl"></div>
            <img
              src={logo}
              alt="logo"
              className="relative w-20 h-20 object-contain"
            />
          </div>
          <div className="text-xs font-semibold text-center text-slate-700 leading-tight">
            Datta Meghe College Of Engineering
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 text-sm font-medium
                  ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                  }`}
              >
                <span className="flex-shrink-0">{getIcon(item.name)}</span>
                <span>{item.name}</span>
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
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
