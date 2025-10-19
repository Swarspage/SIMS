import React from "react";

export default function StudentInternship() {
  return (
    <main className="p-6">
      {/* Edit and Save Buttons */}
      <div className="flex justify-end gap-3 mb-6">
        <button className="px-6 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-[#0f172a] transition">
          Edit
        </button>
        <button className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition">
          Save
        </button>
      </div>

      {/* Internship Form */}
      <div className="bg-[#1e293b] rounded-2xl p-8">
        {/* Student ID */}
        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2">
            Student ID
          </label>
          <input
            type="text"
            placeholder="Student ID (Eg : 2023FHCO125)"
            className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
          />
        </div>

        {/* Company Name and Role Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Company Name */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Role
            </label>
            <input
              type="text"
              placeholder="Role"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Start Date, End Date, Duration Row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Start Date */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                placeholder="DD/MM/YYYY"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              />
            </div>
          </div>

          {/* End Date */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                placeholder="DD/MM/YYYY"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Duration (Months)
            </label>
            <input
              type="text"
              placeholder="Duration (1-12 months)"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Stipend and Stipend Amount Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Stipend */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Stipend
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                <option value="">Stipend</option>
                <option value="paid">Stipend - Paid</option>
                <option value="unpaid">Stipend - Unpaid</option>
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Stipend Amount */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Stipend Amount
            </label>
            <input
              type="text"
              placeholder="Amount"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            placeholder="Description"
            rows="4"
            className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-gray-800"
          />
        </div>

        {/* Certificate URL */}
        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2">
            Certificate URL
          </label>
          <input
            type="text"
            placeholder="Certificate URL"
            className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
          />
        </div>

        {/* Internship Photo and Report PDF Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Internship Photo */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Internship Photo
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Upload Photo"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24"
                readOnly
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition">
                UPLOAD
              </button>
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Report PDF */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Report (PDF)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Upload PDF"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24"
                readOnly
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition">
                UPLOAD
              </button>
              <input
                type="file"
                accept=".pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
