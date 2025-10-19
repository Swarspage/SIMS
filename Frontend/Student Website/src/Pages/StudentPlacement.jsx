import React from "react";

export default function StudentPlacement() {
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

      {/* Placement Form */}
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

        {/* Placement and Company Name Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Placement */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Placement
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                <option value="">True or False</option>
                <option value="true">True</option>
                <option value="false">False</option>
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
        </div>

        {/* Placement Type and Role Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Placement Type */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Placement Type
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                <option value="">Placement Type</option>
                <option value="oncampus">On-Campus</option>
                <option value="offcampus">Off-Campus</option>
                <option value="poolcampus">Pool Campus</option>
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

        {/* Higher Studies and Exam Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Higher Studies */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Higher Studies
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                <option value="">True or False</option>
                <option value="true">True</option>
                <option value="false">False</option>
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

          {/* Exam */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Exam
            </label>
            <input
              type="text"
              placeholder="Exam Name"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Score and Marksheet Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Score */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Score
            </label>
            <input
              type="text"
              placeholder="Score"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* Marksheet */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Marksheet
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

        {/* LOI/Joining Letter/Offer Letter */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            LOI/Joining Letter/Offer Letter
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Letter"
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
    </main>
  );
}
