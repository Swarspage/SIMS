import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import avatar from "../assets/Students.png";

export default function StudentProfileSidebar({ student, isOpen, onClose }) {
  if (!isOpen || !student) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Sidebar Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
        >
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>

        {/* Profile Content */}
        <div className="p-6">
          {/* Profile Image and Name */}
          <div className="text-center mb-6">
            <img
              src={student.studentPhoto?.url || avatar}
              alt={student.name?.firstName}
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500 mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800">
              {student.name?.firstName} {student.name?.middleName || ""}{" "}
              {student.name?.lastName}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{student.studentID}</p>
          </div>

          {/* Details */}
          <div className="space-y-4">
            {/* Mother's Name */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Mother's Name:
              </label>
              <p className="text-gray-800">{student.motherName || "N/A"}</p>
            </div>

            {/* Date of Birth & Blood Group */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Date of Birth:
                </label>
                <p className="text-gray-800">
                  {student.dateOfBirth
                    ? new Date(student.dateOfBirth).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Blood Group:
                </label>
                <p className="text-gray-800">{student.bloodGroup || "N/A"}</p>
              </div>
            </div>

            {/* Branch & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Branch:
                </label>
                <p className="text-gray-800">{student.branch || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Category:
                </label>
                <p className="text-gray-800">{student.category || "N/A"}</p>
              </div>
            </div>

            {/* Current Address */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Current Address:
              </label>
              <p className="text-gray-800">{student.currentAddress || "N/A"}</p>
            </div>

            {/* Native Address */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Native Address:
              </label>
              <p className="text-gray-800">{student.nativeAddress || "N/A"}</p>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Email:
              </label>
              <p className="text-gray-800">{student.email}</p>
            </div>

            {/* Mobile Numbers */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Mobile No.:
                </label>
                <p className="text-gray-800">{student.mobileNo || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Parents Mobile No.:
                </label>
                <p className="text-gray-800">
                  {student.parentsMobileNo || "N/A"}
                </p>
              </div>
            </div>

            {/* Enrollment No */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Enrollment No.:
              </label>
              <p className="text-gray-800">{student.enrollmentNo || "N/A"}</p>
            </div>

            {/* PRN */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                PRN:
              </label>
              <p className="text-gray-800">{student.PRN}</p>
            </div>

            {/* Year */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Year:
              </label>
              <p className="text-gray-800">{student.year}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
