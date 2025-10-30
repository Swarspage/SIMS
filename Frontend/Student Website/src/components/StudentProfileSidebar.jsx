// import React from "react";
// import { XMarkIcon } from "@heroicons/react/24/solid";
// import avatar from "../assets/Students.png";

// export default function StudentProfileSidebar({ student, isOpen, onClose }) {
//   if (!isOpen || !student) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
//         onClick={onClose}
//       ></div>

//       {/* Sidebar Panel */}
//       <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
//         >
//           <XMarkIcon className="h-6 w-6 text-gray-600" />
//         </button>

//         {/* Profile Content */}
//         <div className="p-6">
//           {/* Profile Image and Name */}
//           <div className="text-center mb-6">
//             <img
//               src={student.studentPhoto?.url || avatar}
//               alt={student.name?.firstName}
//               className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500 mb-4"
//             />
//             <h2 className="text-2xl font-bold text-gray-800">
//               {student.name?.firstName} {student.name?.middleName || ""}{" "}
//               {student.name?.lastName}
//             </h2>
//             <p className="text-sm text-gray-500 mt-1">{student.studentID}</p>
//           </div>

//           {/* Details */}
//           <div className="space-y-4">
//             {/* Mother's Name */}
//             <div>
//               <label className="text-sm font-semibold text-gray-600">
//                 Mother's Name:
//               </label>
//               <p className="text-gray-800">{student.motherName || "N/A"}</p>
//             </div>

//             {/* Date of Birth & Blood Group */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-semibold text-gray-600">
//                   Date of Birth:
//                 </label>
//                 <p className="text-gray-800">
//                   {student.dateOfBirth
//                     ? new Date(student.dateOfBirth).toLocaleDateString()
//                     : "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <label className="text-sm font-semibold text-gray-600">
//                   Blood Group:
//                 </label>
//                 <p className="text-gray-800">{student.bloodGroup || "N/A"}</p>
//               </div>
//             </div>

//             {/* Branch & Category */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-semibold text-gray-600">
//                   Branch:
//                 </label>
//                 <p className="text-gray-800">{student.branch || "N/A"}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-semibold text-gray-600">
//                   Category:
//                 </label>
//                 <p className="text-gray-800">{student.category || "N/A"}</p>
//               </div>
//             </div>

//             {/* Current Address */}
//             <div>
//               <label className="text-sm font-semibold text-gray-600">
//                 Current Address:
//               </label>
//               <p className="text-gray-800">{student.currentAddress || "N/A"}</p>
//             </div>

//             {/* Native Address */}
//             <div>
//               <label className="text-sm font-semibold text-gray-600">
//                 Native Address:
//               </label>
//               <p className="text-gray-800">{student.nativeAddress || "N/A"}</p>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="text-sm font-semibold text-gray-600">
//                 Email:
//               </label>
//               <p className="text-gray-800">{student.email}</p>
//             </div>

//             {/* Mobile Numbers */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-semibold text-gray-600">
//                   Mobile No.:
//                 </label>
//                 <p className="text-gray-800">{student.mobileNo || "N/A"}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-semibold text-gray-600">
//                   Parents Mobile No.:
//                 </label>
//                 <p className="text-gray-800">
//                   {student.parentsMobileNo || "N/A"}
//                 </p>
//               </div>
//             </div>

//             {/* Enrollment No */}
//             <div>
//               <label className="text-sm font-semibold text-gray-600">
//                 Enrollment No.:
//               </label>
//               <p className="text-gray-800">{student.enrollmentNo || "N/A"}</p>
//             </div>

//             {/* PRN */}
//             <div>
//               <label className="text-sm font-semibold text-gray-600">
//                 PRN:
//               </label>
//               <p className="text-gray-800">{student.PRN}</p>
//             </div>

//             {/* Year */}
//             <div>
//               <label className="text-sm font-semibold text-gray-600">
//                 Year:
//               </label>
//               <p className="text-gray-800">{student.year}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";
import avatar from "../assets/Students.png";

export default function StudentProfileSidebar({ student, isOpen, onClose }) {
  if (!isOpen || !student) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Sidebar Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 flex items-center justify-between border-b border-blue-700">
          <h2 className="text-lg font-semibold">Student Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-400 rounded-full transition"
          >
            <svg
              className="h-5 w-5"
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
        </div>

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Profile Image and Name */}
          <div className="text-center mb-8">
            <img
              src={student.studentPhoto?.url || avatar}
              alt={student.name?.firstName}
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500 shadow-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-slate-900">
              {student.name?.firstName} {student.name?.middleName || ""}{" "}
              {student.name?.lastName}
            </h3>
            <p className="text-sm text-slate-500 mt-1">{student.studentID}</p>
            <div className="mt-3 inline-block bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-xs font-semibold text-blue-700">
                {student.year} - {student.branch}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 mb-6"></div>

          {/* Details Grid */}
          <div className="space-y-5">
            {/* Personal Information Section */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3 pb-2 border-b-2 border-blue-500">
                Personal Information
              </h4>
              <div className="space-y-3">
                {/* Mother's Name */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase">
                    Mother's Name
                  </label>
                  <p className="text-sm text-slate-800 mt-1">
                    {student.motherName || "N/A"}
                  </p>
                </div>

                {/* DOB & Blood Group */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      DOB
                    </label>
                    <p className="text-sm text-slate-800 mt-1">
                      {student.dob
                        ? new Date(student.dob).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      Blood Group
                    </label>
                    <p className="text-sm text-slate-800 mt-1">
                      {student.bloodGroup || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase">
                    Category
                  </label>
                  <p className="text-sm text-slate-800 mt-1">
                    {student.category || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3 pb-2 border-b-2 border-blue-500">
                Academic Information
              </h4>
              <div className="space-y-3">
                {/* Branch & Year */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      Branch
                    </label>
                    <p className="text-sm text-slate-800 mt-1">
                      {student.branch || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      Year
                    </label>
                    <p className="text-sm text-slate-800 mt-1">
                      {student.year || "N/A"}
                    </p>
                  </div>
                </div>

                {/* PRN & Student ID */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      PRN
                    </label>
                    <p className="text-sm text-slate-800 mt-1 font-mono">
                      {student.PRN || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      Enrollment No.
                    </label>
                    <p className="text-sm text-slate-800 mt-1 font-mono">
                      {student.enrollmentNo || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3 pb-2 border-b-2 border-blue-500">
                Contact Information
              </h4>
              <div className="space-y-3">
                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase">
                    Email
                  </label>
                  <p className="text-sm text-slate-800 mt-1 break-all">
                    {student.email || "N/A"}
                  </p>
                </div>

                {/* Mobile Numbers */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      Mobile
                    </label>
                    <p className="text-sm text-slate-800 mt-1 font-mono">
                      {student.mobileNo || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase">
                      Parent's Mobile
                    </label>
                    <p className="text-sm text-slate-800 mt-1 font-mono">
                      {student.parentMobileNo || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3 pb-2 border-b-2 border-blue-500">
                Address Information
              </h4>
              <div className="space-y-3">
                {/* Current Address */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase">
                    Current Address
                  </label>
                  <p className="text-sm text-slate-800 mt-1">
                    {student.currentAddress?.street || "N/A"}{" "}
                    {student.currentAddress?.city &&
                      `, ${student.currentAddress.city}`}
                    {student.currentAddress?.pincode &&
                      ` - ${student.currentAddress.pincode}`}
                  </p>
                </div>

                {/* Native Address */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase">
                    Native Address
                  </label>
                  <p className="text-sm text-slate-800 mt-1">
                    {student.nativeAddress?.street || "N/A"}{" "}
                    {student.nativeAddress?.city &&
                      `, ${student.nativeAddress.city}`}
                    {student.nativeAddress?.pincode &&
                      ` - ${student.nativeAddress.pincode}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Button */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </>
  );
}
