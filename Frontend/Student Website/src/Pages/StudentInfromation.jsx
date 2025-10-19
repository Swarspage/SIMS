import React from "react";

export default function StudentInformation() {
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

      {/* Student Information Form */}
      <div className="bg-[#1e293b] rounded-2xl p-8">
        {/* First Name, Middle Name, Last Name Row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* First Name */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* Middle Name */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Middle Name
            </label>
            <input
              type="text"
              placeholder="Middle Name"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Mother's Name and Student Photo Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Mother's Name */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Mother's Name
            </label>
            <input
              type="text"
              placeholder="Mother's Name"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* Student Photo */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Student Photo
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Upload Photo (Recent With White Background)"
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
        </div>

        {/* Date of Birth, Blood Group, Branch Row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Date of Birth */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Date of Birth
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

          {/* Blood Group */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Blood Group
            </label>
            <input
              type="text"
              placeholder="Blood Group"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Branch
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
                <option value="">Branch</option>
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

        {/* Current Address */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-semibold mb-4">
            Current Address
          </h3>
          {/* Street */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Street"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* City and Pincode */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                placeholder="City"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Pincode"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Native Address */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-semibold mb-4">
            Native Address
          </h3>
          {/* Street */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Street"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* City and Pincode */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                placeholder="City"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Pincode"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Category and Email Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Category */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              placeholder="Category"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Password and Confirm Password Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Password */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="MAX 8 CHARACTERS"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
            <p className="text-red-400 text-xs mt-1">
              Password should Contain 8 character (1capital,1Number,1Special
              char)
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="MAX 8 CHARACTERS"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Mobile No. and Parents Mobile No. Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Mobile No. */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Mobile No.
            </label>
            <input
              type="tel"
              placeholder="Mobile No."
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* Parents Mobile No. */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Parents Mobile No.
            </label>
            <input
              type="tel"
              placeholder="Parents Mobile No."
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Enrollment Number and Student ID Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Enrollment Number */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Enrollment Number
            </label>
            <input
              type="text"
              placeholder="Enrollment Number"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Student ID
            </label>
            <input
              type="text"
              placeholder="Student ID (2023FHCO125)"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
