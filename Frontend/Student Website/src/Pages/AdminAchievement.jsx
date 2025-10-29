// import React, { useState, useEffect } from "react";
// import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
// import { achievementService } from "../services/achievementService";

// // Achievement Card Component
// function AchievementCard({ achievement, onView, onDelete }) {
//   return (
//     <div className="bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
//       {/* Image Section */}
//       <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
//         <img
//           src={
//             achievement?.photographs?.eventPhoto?.url ||
//             "https://via.placeholder.com/300x200"
//           }
//           alt={achievement?.title || "Achievement"}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Content Section */}
//       <div className="p-4 flex flex-col flex-grow text-center">
//         <h3 className="text-md font-bold text-gray-900 uppercase">
//           {achievement?.title || "No Title"}
//         </h3>
//         <p className="text-sm text-gray-500">
//           {achievement?.stuID?.studentID || achievement?.stuID || "N/A"}
//         </p>

//         <p className="text-sm text-gray-600 mt-2 line-clamp-3">
//           {achievement?.description || "No description"}
//         </p>

//         <p className="text-sm text-gray-600 mt-2">
//           {achievement?.date?.from
//             ? new Date(achievement.date.from).toLocaleDateString()
//             : achievement?.createdAt
//             ? new Date(achievement.createdAt).toLocaleDateString()
//             : "No Date"}
//         </p>

//         {/* Action Buttons */}
//         <div className="mt-4 flex gap-2 justify-center">
//           <button
//             onClick={() => onView && onView(achievement)}
//             className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition flex items-center gap-2"
//           >
//             <EyeIcon className="h-4 w-4" />
//             View
//           </button>
//           <button
//             onClick={() => onDelete && onDelete(achievement._id)}
//             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2"
//           >
//             <TrashIcon className="h-4 w-4" />
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Main Admin Achievements Page Component
// export default function AdminAchievements() {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch achievements from backend when component loads
//   useEffect(() => {
//     fetchAchievements();
//   }, []);

//   const fetchAchievements = async () => {
//     try {
//       const data = await achievementService.getAllAchievements();
//       console.log("Fetched achievements:", data); // Debug log
//       setAchievements(data || []); // Ensure it's always an array
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching achievements:", err);
//       setError("Failed to load achievements. Backend might not be running!");
//       setAchievements([]); // Set empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleView = (achievement) => {
//     console.log("View achievement:", achievement);
//     // TODO: Add modal or navigation to view details
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this achievement?")) {
//       return;
//     }

//     try {
//       await achievementService.deleteAchievement(id);
//       // Refresh the list after deletion
//       fetchAchievements();
//     } catch (err) {
//       console.error("Error deleting achievement:", err);
//       alert("Failed to delete achievement");
//     }
//   };

//   return (
//     <main className="p-6">
//       {/* Heading */}
//       <div className="mb-4 text-lg font-semibold">
//         Showing total{" "}
//         <span className="text-red-600">
//           {achievements?.length || 0} Achievements
//         </span>
//       </div>

//       {/* Filter / Buttons Row */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         <button className="px-4 py-2 border rounded bg-white flex items-center gap-2">
//           <svg
//             className="w-4 h-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
//             />
//           </svg>
//           Filters
//         </button>
//         <button className="px-4 py-2 rounded border bg-green-100 text-green-700">
//           Management Achievement
//         </button>
//         <button className="px-4 py-2 rounded bg-[#1e293b] text-white hover:bg-[#0f172a]">
//           +Add
//         </button>
//         <button className="px-4 py-2 rounded border bg-red-100 text-red-700">
//           Type
//         </button>
//         <button className="px-4 py-2 rounded border bg-blue-100 text-blue-700">
//           Branch
//         </button>
//       </div>

//       {/* Achievement Cards */}
//       <div className="bg-[#0f2130] rounded-2xl p-6 min-h-[60vh] overflow-y-auto">
//         {/* Loading State */}
//         {loading && (
//           <div className="flex items-center justify-center h-64">
//             <div className="text-white text-xl">Loading achievements...</div>
//           </div>
//         )}

//         {/* Error State */}
//         {error && !loading && (
//           <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
//         )}

//         {/* Empty State */}
//         {!loading && !error && achievements.length === 0 && (
//           <div className="text-center text-white py-12">
//             No achievements found. Click +Add to create one!
//           </div>
//         )}

//         {/* Achievements Grid */}
//         {!loading && !error && achievements.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {achievements.map((achievement, index) => (
//               <AchievementCard
//                 key={achievement?._id || `achievement-${index}`}
//                 achievement={achievement}
//                 onView={handleView}
//                 onDelete={handleDelete}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

import React, { useState, useEffect } from "react";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { achievementService } from "../services/achievementService";

// Achievement Card Component
function AchievementCard({ achievement, onView, onDelete }) {
  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
        <img
          src={
            achievement?.photographs?.eventPhoto?.url ||
            "https://via.placeholder.com/300x200"
          }
          alt={achievement?.title || "Achievement"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow text-center">
        <h3 className="text-md font-bold text-gray-900 uppercase">
          {achievement?.title || "No Title"}
        </h3>

        {/* ✅ FIXED: Handle stuID properly */}
        <p className="text-sm text-gray-500">
          {typeof achievement?.stuID === "string"
            ? achievement.stuID
            : achievement?.stuID?.studentID || "N/A"}
        </p>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {achievement?.description || "No description"}
        </p>

        <p className="text-sm text-gray-600 mt-2">
          {achievement?.date?.from
            ? new Date(achievement.date.from).toLocaleDateString()
            : achievement?.createdAt
            ? new Date(achievement.createdAt).toLocaleDateString()
            : "No Date"}
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2 justify-center">
          <button
            onClick={() => onView && onView(achievement)}
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition flex items-center gap-2"
          >
            <EyeIcon className="h-4 w-4" />
            View
          </button>
          <button
            onClick={() => onDelete && onDelete(achievement._id)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2"
          >
            <TrashIcon className="h-4 w-4" />
            Delete
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
      const response = await achievementService.getAllAchievements();
      console.log("Fetched achievements:", response); // Debug log

      // Handle different response formats
      const data = response.data || response.achievements || response;

      setAchievements(Array.isArray(data) ? data : []); // Ensure it's always an array
      setError(null);
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setError("Failed to load achievements. Backend might not be running!");
      setAchievements([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleView = (achievement) => {
    console.log("View achievement:", achievement);
    // TODO: Add modal or navigation to view details
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) {
      return;
    }

    try {
      await achievementService.deleteAchievement(id);
      alert("Achievement deleted successfully!");
      // Refresh the list after deletion
      fetchAchievements();
    } catch (err) {
      console.error("Error deleting achievement:", err);
      alert("Failed to delete achievement");
    }
  };

  return (
    <main className="p-6">
      {/* Heading */}
      <div className="mb-4 text-lg font-semibold">
        Showing total{" "}
        <span className="text-red-600">
          {achievements?.length || 0} Achievements
        </span>
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
        <button className="px-4 py-2 rounded bg-[#1e293b] text-white hover:bg-[#0f172a]">
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
            No achievements found. Click +Add to create one!
          </div>
        )}

        {/* Achievements Grid */}
        {!loading && !error && achievements.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={achievement?._id || `achievement-${index}`}
                achievement={achievement}
                onView={handleView}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
