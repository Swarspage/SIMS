import React, { useState, useEffect } from "react";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { achievementService } from "../services/achievementService";

// Achievement Card Component
function AchievementCard({ achievement }) {
  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
        <img
          src={
            achievement.eventPhoto?.url || "https://via.placeholder.com/300x200"
          }
          alt={achievement.title || "Achievement"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow text-center">
        <h3 className="text-md font-bold text-gray-900 uppercase">
          {achievement.title || achievement.eventName}
        </h3>
        <p className="text-sm text-gray-500">{achievement.studentID}</p>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {achievement.description}
        </p>

        <p className="text-sm text-gray-600 mt-2">
          {achievement.date ||
            new Date(achievement.createdAt).toLocaleDateString()}
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2 justify-center">
          <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition flex items-center gap-2">
            <EyeIcon className="h-4 w-4" />
          </button>
          <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition flex items-center gap-2">
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Admin Achievements Page Component
export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch achievements from backend when component loads
  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const data = await achievementService.getAllAchievements();
      setAchievements(data);
    } catch (err) {
      setError("Failed to load achievements. Backend might not be running!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      {/* Heading */}
      <div className="mb-4 text-lg font-semibold">
        Showing total{" "}
        <span className="text-red-600">{achievements.length} Achievements</span>
      </div>

      {/* Filter / Buttons Row */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="px-4 py-2 border rounded bg-white flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
        </button>
        <button className="px-4 py-2 rounded border bg-green-100 text-green-700">
          Management Achievement
        </button>
        <button className="px-4 py-2 rounded bg-[#1e293b] text-white">
          +Add
        </button>
        <button className="px-4 py-2 rounded border bg-red-100 text-red-700">
          Type
        </button>
        <button className="px-4 py-2 rounded border bg-blue-100 text-blue-700">
          Branch
        </button>
      </div>

      {/* Achievement Cards */}
      <div className="bg-[#0f2130] rounded-2xl p-6 min-h-[60vh] overflow-y-auto">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading achievements...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
        )}

        {/* Empty State */}
        {!loading && !error && achievements.length === 0 && (
          <div className="text-center text-white py-12">
            No achievements found. Backend might be empty!
          </div>
        )}

        {/* Achievements Grid */}
        {!loading && !error && achievements.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={achievement._id || `achievement-${index}`}
                achievement={achievement}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
