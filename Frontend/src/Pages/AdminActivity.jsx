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

// Detail View Modal Component
function DetailModal({ activity, onClose }) {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Activity Details</h2>
            <p className="text-xs text-slate-500 mt-0.5">ID: {activity._id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">

          {/* Main Info Section */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Image */}
            <div className="flex-shrink-0">
              <div className="w-full sm:w-32 h-32 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center">
                <img
                  src={activity.certificateURL?.url || "https://via.placeholder.com/300x200?text=No+Certificate"}
                  alt="Certificate"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Basic Details */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{activity.title}</h3>
                <p className="text-sm text-slate-500">
                  {typeof activity?.stuID === "string" ? activity.stuID : activity?.stuID?.studentID || "Student ID N/A"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                  {activity.type}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
                  {activity.date ? new Date(activity.date).toLocaleDateString("en-IN", { dateStyle: 'long' }) : "No Date"}
                </span>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Details */}
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">Description</p>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-700 leading-relaxed">
              {activity.description || "No description provided."}
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Attached Documents</h4>
            <div className="flex flex-wrap gap-3">
              {activity.certificateURL?.url ? (
                <a
                  href={activity.certificateURL.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Download Certificate
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">No certificate uploaded</span>
              )}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Close
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

  // Modal State
  const [selectedActivity, setSelectedActivity] = useState(null);

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
    setSelectedActivity(activity);
  };

  const handleCloseModal = () => {
    setSelectedActivity(null);
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

      {/* Detail Modal */}
      {selectedActivity && (
        <DetailModal
          activity={selectedActivity}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
