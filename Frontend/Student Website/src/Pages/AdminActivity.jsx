import React from "react";
import { FaEye, FaDownload } from "react-icons/fa";
import achievements from "../data/achievements";

export default function AdminActivity() {
  return (
    <main className="p-6">
      {/* Heading */}
      <div className="mb-4 text-lg font-semibold">
        Showing total{" "}
        <span className="text-blue-600">{achievements.length}</span>{" "}
        Achievements
      </div>

      {/* Filter / Buttons Row */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="px-4 py-2 border rounded bg-white">Filters</button>
        <button className="px-4 py-2 rounded border bg-yellow-100">
          Student Achievements
        </button>
        <button className="px-4 py-2 rounded bg-blue-900 text-white">
          + Add Achievement
        </button>
        <button className="px-4 py-2 rounded border">CATEGORY</button>
        <button className="px-4 py-2 rounded border">YEAR</button>
      </div>

      {/* Achievement Cards */}
      <div className="bg-[#0f2130] rounded-2xl p-6 min-h-[60vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-md font-bold text-center text-gray-900 uppercase">
                  {achievement.title}
                </h3>
                <p className="text-center text-gray-500 text-sm mb-2">
                  {achievement.student}
                </p>

                <p className="text-gray-700 text-sm text-center mb-4">
                  {achievement.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-800">
                    {achievement.date}
                  </p>
                  <div className="flex gap-2">
                    <button className="p-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition">
                      <FaEye />
                    </button>
                    <button className="p-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition">
                      <FaDownload />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
