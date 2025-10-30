// import React from "react";
// import { FaEye, FaDownload } from "react-icons/fa";
// import achievements from "../data/achievements";

// export default function AdminActivity() {
//   return (
//     <main className="p-6">
//       {/* Heading */}
//       <div className="mb-4 text-lg font-semibold">
//         Showing total{" "}
//         <span className="text-blue-600">{achievements.length}</span>{" "}
//         Achievements
//       </div>

//       {/* Filter / Buttons Row */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         <button className="px-4 py-2 border rounded bg-white">Filters</button>
//         <button className="px-4 py-2 rounded border bg-yellow-100">
//           Student Achievements
//         </button>
//         <button className="px-4 py-2 rounded bg-blue-900 text-white">
//           + Add Achievement
//         </button>
//         <button className="px-4 py-2 rounded border">CATEGORY</button>
//         <button className="px-4 py-2 rounded border">YEAR</button>
//       </div>

//       {/* Achievement Cards */}
//       <div className="bg-[#0f2130] rounded-2xl p-6 min-h-[60vh] overflow-y-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {achievements.map((achievement, index) => (
//             <div
//               key={index}
//               className="bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
//             >
//               {/* Image */}
//               <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
//                 <img
//                   src={achievement.image}
//                   alt={achievement.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* Content */}
//               <div className="p-4 flex flex-col flex-grow">
//                 <h3 className="text-md font-bold text-center text-gray-900 uppercase">
//                   {achievement.title}
//                 </h3>
//                 <p className="text-center text-gray-500 text-sm mb-2">
//                   {achievement.student}
//                 </p>

//                 <p className="text-gray-700 text-sm text-center mb-4">
//                   {achievement.description}
//                 </p>

//                 <div className="mt-auto flex items-center justify-between">
//                   <p className="text-sm font-medium text-gray-800">
//                     {achievement.date}
//                   </p>
//                   <div className="flex gap-2">
//                     <button className="p-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition">
//                       <FaEye />
//                     </button>
//                     <button className="p-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition">
//                       <FaDownload />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { FaEye, FaDownload, FaTrash } from "react-icons/fa";
// import { activityService } from "../services/activityService";

// // Activity Card Component
// function ActivityCard({ activity, onView, onDownload, onDelete }) {
//   return (
//     <div className="bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
//       {/* Certificate Image/Preview */}
//       <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
//         {activity?.certificateURL?.url ? (
//           <img
//             src={activity.certificateURL.url}
//             alt={activity?.title || "Activity"}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="text-gray-400 text-sm">No Certificate</div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4 flex flex-col flex-grow">
//         <h3 className="text-md font-bold text-center text-gray-900 uppercase">
//           {activity?.title || "No Title"}
//         </h3>

//         {/* Student ID */}
//         <p className="text-center text-gray-500 text-sm mb-2">
//           {typeof activity?.stuID === "string"
//             ? activity.stuID
//             : activity?.stuID?.studentID || "N/A"}
//         </p>

//         {/* Type Badge */}
//         <div className="flex justify-center mb-2">
//           <span
//             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//               activity?.type === "Committee"
//                 ? "bg-blue-100 text-blue-700"
//                 : activity?.type === "Sports"
//                 ? "bg-green-100 text-green-700"
//                 : activity?.type === "Hackathon"
//                 ? "bg-purple-100 text-purple-700"
//                 : "bg-gray-100 text-gray-700"
//             }`}
//           >
//             {activity?.type || "Unknown"}
//           </span>
//         </div>

//         <p className="text-gray-700 text-sm text-center mb-4 line-clamp-3">
//           {activity?.description || "No description"}
//         </p>

//         <div className="mt-auto flex items-center justify-between">
//           <p className="text-sm font-medium text-gray-800">
//             {activity?.date
//               ? new Date(activity.date).toLocaleDateString()
//               : "No Date"}
//           </p>
//           <div className="flex gap-2">
//             <button
//               onClick={() => onView && onView(activity)}
//               className="p-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition"
//               title="View Details"
//             >
//               <FaEye />
//             </button>
//             {activity?.certificateURL?.url && (
//               <a
//                 href={activity.certificateURL.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
//                 title="Download Certificate"
//               >
//                 <FaDownload />
//               </a>
//             )}
//             <button
//               onClick={() => onDelete && onDelete(activity._id)}
//               className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
//               title="Delete Activity"
//             >
//               <FaTrash />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Main Admin Activity Component
// export default function AdminActivity() {
//   const [activities, setActivities] = useState([]);
//   const [filteredActivities, setFilteredActivities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Filter states
//   const [selectedType, setSelectedType] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch activities from backend
//   useEffect(() => {
//     fetchActivities();
//   }, []);

//   // Apply filters when activities or filters change
//   useEffect(() => {
//     applyFilters();
//   }, [activities, selectedType, searchQuery]);

//   const fetchActivities = async () => {
//     try {
//       const response = await activityService.getAllActivities();
//       console.log("Fetched activities:", response);

//       // Handle different response formats
//       const data = response.data || response.activities || response;

//       setActivities(Array.isArray(data) ? data : []);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching activities:", err);
//       setError("Failed to load activities. Backend might not be running!");
//       setActivities([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const applyFilters = () => {
//     let filtered = [...activities];

//     // Type filter
//     if (selectedType) {
//       filtered = filtered.filter((a) => a.type === selectedType);
//     }

//     // Search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (a) =>
//           a.title?.toLowerCase().includes(query) ||
//           a.description?.toLowerCase().includes(query) ||
//           (typeof a.stuID === "string" ? a.stuID : a.stuID?.studentID)
//             ?.toLowerCase()
//             .includes(query)
//       );
//     }

//     setFilteredActivities(filtered);
//   };

//   const handleView = (activity) => {
//     console.log("View activity:", activity);
//     // TODO: Open modal with full details
//     alert(
//       `Activity: ${activity.title}\nType: ${activity.type}\nDescription: ${activity.description}`
//     );
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this activity?")) {
//       return;
//     }

//     try {
//       await activityService.deleteActivity(id);
//       alert("Activity deleted successfully!");
//       fetchActivities(); // Refresh list
//     } catch (err) {
//       console.error("Error deleting activity:", err);
//       alert("Failed to delete activity");
//     }
//   };

//   return (
//     <main className="p-6">
//       {/* Heading */}
//       <div className="mb-4 text-lg font-semibold">
//         Showing{" "}
//         <span className="text-blue-600">{filteredActivities.length}</span> of{" "}
//         <span className="text-green-600">{activities.length}</span> Activities
//       </div>

//       {/* Filter / Buttons Row */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder="Search by title, description, student ID..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="px-4 py-2 border rounded bg-white flex-1 min-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Type Filter */}
//         <select
//           value={selectedType}
//           onChange={(e) => setSelectedType(e.target.value)}
//           className="px-4 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">All Types</option>
//           <option value="Committee">Committee</option>
//           <option value="Sports">Sports</option>
//           <option value="Hackathon">Hackathon</option>
//         </select>

//         {/* Clear Filters */}
//         {(searchQuery || selectedType) && (
//           <button
//             onClick={() => {
//               setSearchQuery("");
//               setSelectedType("");
//             }}
//             className="px-4 py-2 rounded border bg-red-100 text-red-700 hover:bg-red-200 transition"
//           >
//             Clear Filters
//           </button>
//         )}

//         <button className="px-4 py-2 rounded bg-blue-900 text-white hover:bg-blue-800 transition">
//           + Add Activity
//         </button>
//       </div>

//       {/* Activity Cards */}
//       <div className="bg-[#0f2130] rounded-2xl p-6 min-h-[60vh] overflow-y-auto">
//         {/* Loading State */}
//         {loading && (
//           <div className="flex items-center justify-center h-64">
//             <div className="text-white text-xl">Loading activities...</div>
//           </div>
//         )}

//         {/* Error State */}
//         {error && !loading && (
//           <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
//         )}

//         {/* Empty State */}
//         {!loading && !error && filteredActivities.length === 0 && (
//           <div className="text-center text-white py-12">
//             {searchQuery || selectedType
//               ? "No activities match your filters."
//               : "No activities found. Students need to add activities!"}
//           </div>
//         )}

//         {/* Activities Grid */}
//         {!loading && !error && filteredActivities.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {filteredActivities.map((activity, index) => (
//               <ActivityCard
//                 key={activity?._id || `activity-${index}`}
//                 activity={activity}
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
import { activityService } from "../services/activityService";

// Activity Card Component - COMPACT & BEAUTIFUL
function ActivityCard({ activity, onView, onDelete }) {
  const getTypeColor = (type) => {
    switch (type) {
      case "Committee":
        return "bg-blue-50 text-blue-700";
      case "Sports":
        return "bg-green-50 text-green-700";
      case "Hackathon":
        return "bg-purple-50 text-purple-700";
      default:
        return "bg-slate-50 text-slate-700";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      {/* Certificate Image */}
      <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
        {activity?.certificateURL?.url ? (
          <img
            src={activity.certificateURL.url}
            alt={activity?.title || "Activity"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-slate-400 text-xs font-medium">
            No Certificate
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Student ID */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
          {typeof activity?.stuID === "string"
            ? activity.stuID
            : activity?.stuID?.studentID || "N/A"}
        </p>

        {/* Title */}
        <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2">
          {activity?.title || "No Title"}
        </h3>

        {/* Type Badge */}
        <div className="mb-2">
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
              activity?.type
            )}`}
          >
            {activity?.type || "Unknown"}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 mb-3 line-clamp-2">
          {activity?.description || "No description"}
        </p>

        {/* Date */}
        <p className="text-xs text-slate-500 mb-3">
          {activity?.date
            ? new Date(activity.date).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              })
            : "No Date"}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={() => onView && onView(activity)}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View
          </button>
          {activity?.certificateURL?.url && (
            <a
              href={activity.certificateURL.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors text-center"
            >
              Download
            </a>
          )}
          <button
            onClick={() => onDelete && onDelete(activity._id)}
            className="px-3 py-2 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Admin Activity Component
export default function AdminActivity() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch activities from backend
  useEffect(() => {
    fetchActivities();
  }, []);

  // Apply filters when activities or filters change
  useEffect(() => {
    applyFilters();
  }, [activities, selectedType, searchQuery]);

  const fetchActivities = async () => {
    try {
      const response = await activityService.getAllActivities();
      const data = response.data || response.activities || response;
      setActivities(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching activities:", err);
      setError("Failed to load activities. Backend might not be running!");
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...activities];

    // Type filter
    if (selectedType) {
      filtered = filtered.filter((a) => a.type === selectedType);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title?.toLowerCase().includes(query) ||
          a.description?.toLowerCase().includes(query) ||
          (typeof a.stuID === "string" ? a.stuID : a.stuID?.studentID)
            ?.toLowerCase()
            .includes(query)
      );
    }

    setFilteredActivities(filtered);
  };

  const handleView = (activity) => {
    alert(
      `📋 ACTIVITY DETAILS\n\nTitle: ${activity.title}\nType: ${activity.type}\nDescription: ${activity.description}`
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?"))
      return;
    try {
      await activityService.deleteActivity(id);
      fetchActivities();
    } catch (err) {
      console.error("Error deleting activity:", err);
      alert("Failed to delete activity");
    }
  };

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Activities</h1>
        <p className="text-slate-600 mt-2">
          Showing{" "}
          <span className="font-semibold text-blue-600">
            {filteredActivities.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900">
            {activities.length}
          </span>{" "}
          activities
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by title, description, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white flex-1 min-w-[250px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
          >
            <option value="">All Types</option>
            <option value="Committee">Committee</option>
            <option value="Sports">Sports</option>
            <option value="Hackathon">Hackathon</option>
          </select>

          {/* Clear Filters */}
          {(searchQuery || selectedType) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("");
              }}
              className="px-4 py-2.5 rounded-lg border border-red-300 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition"
            >
              Clear
            </button>
          )}

          {/* Add Button */}
          <button className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm ml-auto">
            + Add Activity
          </button>
        </div>
      </div>

      {/* Activity Cards */}
      <div className="min-h-[60vh]">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading activities...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredActivities.length === 0 && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-16 text-center">
            <svg
              className="w-16 h-16 text-slate-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <p className="text-slate-600 text-lg font-medium">
              {searchQuery || selectedType
                ? "No activities match your filters."
                : "No activities found yet."}
            </p>
          </div>
        )}

        {/* Activities Grid - 4 columns for compact cards */}
        {!loading && !error && filteredActivities.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity?._id}
                activity={activity}
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
