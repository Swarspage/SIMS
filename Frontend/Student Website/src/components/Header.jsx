// import React from "react";
// import {
//   MagnifyingGlassIcon,
//   BellIcon,
//   ChatBubbleOvalLeftEllipsisIcon,
// } from "@heroicons/react/24/outline";
// import avatar from "../assets/Students.png";

// export default function Header({ showSearch = false }) {
//   return (
//     <header className="flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm">
//       {/* Left: Welcome Section */}
//       <div className="flex flex-col justify-center">
//         <h1 className="text-3xl font-bold text-gray-800 leading-tight">
//           Welcome (Name)
//         </h1>
//         <span className="text-sm text-gray-500">ID - DMCE</span>
//       </div>

//       {/* Center: Search Bar (conditional for admin) */}
//       {showSearch && (
//         <div className="flex-1 flex justify-center">
//           <div className="relative w-full max-w-md">
//             <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
//             <input
//               type="text"
//               placeholder="Search Student"
//               className="w-full border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>
//       )}

//       {/* Right: Icons and Profile */}
//       <div className="flex items-center gap-5">
//         <BellIcon className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer transition" />
//         <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer transition" />
//         <div className="flex items-center gap-2">
//           <img
//             src={avatar}
//             alt="profile"
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <div className="flex flex-col">
//             <span className="text-sm font-medium">name</span>
//             <span className="text-xs text-gray-500">ID</span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

import React from "react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import avatar from "../assets/Students.png";

export default function Header({ showSearch = false }) {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 shadow-sm sticky top-0 z-40">
      {/* Left: Welcome Section */}
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-slate-900">Welcome (Name)</h1>
        <span className="text-sm text-slate-500">ID - DMCE</span>
      </div>

      {/* Center: Search Bar (conditional for admin) */}
      {showSearch && (
        <div className="flex-1 flex justify-center mx-8">
          <div className="relative w-full max-w-sm">
            <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Student"
              className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>
      )}

      {/* Right: Icons and Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <button className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-200 rounded-lg transition">
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Message Icon */}
        <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-200 rounded-lg transition">
          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-300"></div>

        {/* Profile Section */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <img
            src={avatar}
            alt="profile"
            className="w-9 h-9 rounded-full object-cover border-2 border-blue-500 group-hover:border-blue-600 transition"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900">name</span>
            <span className="text-xs text-slate-500">Student</span>
          </div>
        </div>
      </div>
    </header>
  );
}
