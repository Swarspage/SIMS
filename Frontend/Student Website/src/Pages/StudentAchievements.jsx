import React from "react";

export default function StudentAchievements() {
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

      {/* Achievements Form */}
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

        {/* Category and Title Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Category */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Category
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                <option value="">Category</option>
                <option value="academic">Academic</option>
                <option value="sports">Sports</option>
                <option value="cultural">Cultural</option>
                <option value="technical">Technical</option>
                <option value="social">Social Service</option>
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

          {/* Title */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Title"
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

        {/* Issued By, Date, Achievement Type Row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Issued By */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Issued By
            </label>
            <input
              type="text"
              placeholder="Issued By"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Date
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
          </div>

          {/* Achievement Type */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Achievement Type
            </label>
            <input
              type="text"
              placeholder="Achievement Type"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2">
            Team Members
          </label>
          <input
            type="text"
            placeholder="Team Members"
            className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
          />
        </div>

        {/* Event Photo */}
        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2">
            Event Photo
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

        {/* Certificate URL */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Certificate URL
          </label>
          <input
            type="text"
            placeholder="Certificate URL"
            className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
          />
        </div>
      </div>
    </main>
  );
}
