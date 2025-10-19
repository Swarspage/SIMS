import React from "react";

export default function StudentAdmission() {
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

      {/* Admission Form */}
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

        {/* Roll No, Year, Div, Course Row */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {/* Roll No */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Roll No
            </label>
            <input
              type="text"
              placeholder="Roll No"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Year
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                <option value="">Year</option>
                <option value="first">First Year</option>
                <option value="second">Second Year</option>
                <option value="third">Third Year</option>
                <option value="final">Final Year</option>
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

          {/* Div */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Div
            </label>
            <input
              type="text"
              placeholder="Div"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Course
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                <option value="">Course</option>
                <option value="computer">Computer Engineering</option>
                <option value="mechanical">Mechanical Engineering</option>
                <option value="civil">Civil Engineering</option>
                <option value="electrical">Electrical Engineering</option>
                <option value="electronics">Electronics Engineering</option>
                <option value="it">Information Technology</option>
                <option value="aids">
                  Artificial Intelligence and Data Science
                </option>
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
        </div>

        {/* Admission Date and Status Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Admission Date */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Admission Date
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

          {/* Status */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Status
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                <option value="">Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
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
        </div>

        {/* Fees Amount, Fees Paid, Scholarship Row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Fees Amount */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Fees Amount
            </label>
            <input
              type="text"
              placeholder="Fees Amount"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* Fees Paid */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Fees Paid
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                <option value="">Fees Paid</option>
                <option value="full">Full Payment</option>
                <option value="partial">Partial Payment</option>
                <option value="pending">Pending</option>
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

          {/* Scholarship Applied */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Scholarship Applied
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                <option value="">Scholarship Applied</option>
                <option value="merit">Merit Scholarship</option>
                <option value="financial">Financial Aid</option>
                <option value="sports">Sports Quota</option>
                <option value="none">None</option>
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
        </div>

        {/* Academic Year */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Academic Year
          </label>
          <input
            type="text"
            placeholder="Academic Year (Eg : 2024 - 25)"
            className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
          />
        </div>
      </div>
    </main>
  );
}
