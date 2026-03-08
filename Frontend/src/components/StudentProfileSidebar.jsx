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
      <div className="fixed right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur-2xl shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-50 overflow-y-auto animate-in slide-in-from-right duration-500 flex flex-col border-l border-white/20">
        {/* Header */}
        <div className="sticky top-0 bg-white/50 backdrop-blur-md z-10 p-6 flex items-center justify-between border-b border-slate-200/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Student Profile</h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Detailed Information</p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-all duration-300 hover:rotate-90"
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
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Profile Image and Name Section */}
          <div className="text-center animate-in fade-in zoom-in-95 duration-700">
            <div className="relative inline-block group">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <img
                src={student.studentPhoto?.url || avatar}
                alt={student.name?.firstName}
                className="relative w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-xl mb-4"
              />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {student.name?.firstName} {student.name?.middleName || ""}{" "}
              {student.name?.lastName}
            </h3>
            <p className="text-sm font-mono text-blue-600 font-semibold mt-1">{student.studentID}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-blue-100 shadow-sm">
                {student.year}
              </span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-indigo-100 shadow-sm">
                {student.branch}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="space-y-6">
            {/* Section Component for cleaner code */}
            <ProfileSection title="Personal Information" icon={<UserIcon className="w-4 h-4" />}>
              <div className="grid grid-cols-1 gap-5">
                <DetailItem label="Mother's Name" value={student.motherName} />
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem 
                    label="DOB" 
                    value={student.dob ? new Date(student.dob).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"} 
                  />
                  <DetailItem label="Blood Group" value={student.bloodGroup} />
                </div>
                <DetailItem label="Category" value={student.category} />
              </div>
            </ProfileSection>

            <ProfileSection title="Academic Information" icon={<AcademicCapIcon className="w-4 h-4" />}>
              <div className="grid grid-cols-1 gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem label="Branch" value={student.branch} />
                  <DetailItem label="Year" value={student.year} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem label="PRN" value={student.PRN} />
                  <DetailItem label="Enrollment No." value={student.enrollmentNo} />
                </div>
                <DetailItem label="ABC ID" value={student.abcId} />
              </div>
            </ProfileSection>

            <ProfileSection title="Contact Information" icon={<PhoneIcon className="w-4 h-4" />}>
              <div className="grid grid-cols-1 gap-5">
                <DetailItem label="Email" value={student.email} isCopyable />
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem label="Mobile" value={student.mobileNo} />
                  <DetailItem label="Parent's Mobile" value={student.parentMobileNo} />
                </div>
                <DetailItem label="Parent Email" value={student.parentEmail} />
              </div>
            </ProfileSection>

            <ProfileSection title="Address Information" icon={<MapPinIcon className="w-4 h-4" />}>
              <div className="grid grid-cols-1 gap-5">
                <DetailItem 
                  label="Current Address" 
                  value={`${student.currentAddress?.street || "N/A"}${student.currentAddress?.city ? `, ${student.currentAddress.city}` : ""}${student.currentAddress?.pincode ? ` - ${student.currentAddress.pincode}` : ""}`} 
                />
                <DetailItem 
                  label="Native Address" 
                  value={`${student.nativeAddress?.street || "N/A"}${student.nativeAddress?.city ? `, ${student.nativeAddress.city}` : ""}${student.nativeAddress?.pincode ? ` - ${student.nativeAddress.pincode}` : ""}`} 
                />
              </div>
            </ProfileSection>
          </div>
        </div>

        {/* Footer Action Button */}
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-slate-200/50 p-6">
          <button
            onClick={onClose}
            className="group relative w-full px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl overflow-hidden shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 active:scale-95"
          >
            <div className="absolute inset-0 w-3 bg-white/20 skew-x-[-20deg] group-hover:left-full transition-all duration-500 -left-10"></div>
            Close Profile
          </button>
        </div>
      </div>
    </>
  );
}

// Utility Components for better UI organization
function ProfileSection({ title, icon, children }) {
  return (
    <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
          {icon}
        </div>
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function DetailItem({ label, value, isCopyable = false }) {
  return (
    <div>
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        {label}
      </label>
      <div className="flex items-center gap-2 mt-0.5">
        <p className="text-sm font-semibold text-slate-700 leading-snug">
          {value || "N/A"}
        </p>
        {isCopyable && value && (
          <button className="text-slate-300 hover:text-blue-500 transition-colors p-1" title="Copy">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// Import icons as needed (faking the ones that aren't available to avoid breakages)
const UserIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const AcademicCapIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const PhoneIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MapPinIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

