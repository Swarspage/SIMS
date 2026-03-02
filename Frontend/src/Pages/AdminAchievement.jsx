import React, { useState, useEffect } from "react";
import { achievementService } from "../services/achievementService";

// Achievement Card Component - COMPACT & BEAUTIFUL
function AchievementCard({ achievement, onView, onDelete }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      {/* Image Section */}
      <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
        <img
          src={
            achievement?.photographs?.eventPhoto?.url ||
            "https://via.placeholder.com/300x200?text=Achievement"
          }
          alt={achievement?.title || "Achievement"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Student ID */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
          {typeof achievement?.stuID === "string"
            ? achievement.stuID
            : achievement?.stuID?.studentID || "N/A"}
        </p>

        {/* Title */}
        <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2">
          {achievement?.title || "No Title"}
        </h3>

        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
            {achievement?.category || "N/A"}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 mb-2 line-clamp-2">
          {achievement?.description || "No description"}
        </p>

        {/* Achievement Type */}
        {achievement?.achievementType && (
          <p className="text-xs font-medium text-green-600 mb-2">
            {achievement.achievementType === "Winner" && "🏆 "}
            {achievement.achievementType === "Runner-up" && "🥈 "}
            {achievement.achievementType}
          </p>
        )}

        {/* Date */}
        <p className="text-xs text-slate-500 mb-3">
          {achievement?.date?.from
            ? new Date(achievement.date.from).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
            })
            : achievement?.createdAt
              ? new Date(achievement.createdAt).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              })
              : "No Date"}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={() => onView && onView(achievement)}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => onDelete && onDelete(achievement._id)}
            className="flex-1 px-3 py-2 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Detail View Modal Component
function DetailModal({ achievement, onClose }) {
  if (!achievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Achievement Details</h2>
            <p className="text-xs text-slate-500 mt-0.5">ID: {achievement._id}</p>
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
                  src={achievement.photographs?.eventPhoto?.url || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt="Proof"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Basic Details */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{achievement.title}</h3>
                <p className="text-sm text-slate-500">
                  {typeof achievement?.stuID === "string" ? achievement.stuID : achievement?.stuID?.studentID || "Student ID N/A"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                  {achievement.category}
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100">
                  {achievement.achievementType}
                </span>
                {achievement.level && (
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
                    {achievement.level} Level
                  </span>
                )}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Grid Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Date</p>
              <p className="text-sm font-medium text-slate-800">
                {achievement?.date?.from
                  ? new Date(achievement.date.from).toLocaleDateString("en-IN", { dateStyle: 'long' })
                  : "N/A"
                }
                {achievement?.date?.to && ` - ${new Date(achievement.date.to).toLocaleDateString("en-IN", { dateStyle: 'long' })}`}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Rank/Position</p>
              <p className="text-sm font-medium text-slate-800">
                {achievement.rank || 'N/A'}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Organizing Body</p>
              <p className="text-sm font-medium text-slate-800">
                {achievement.org || 'N/A'}
              </p>
            </div>

            {achievement.description && (
              <div className="sm:col-span-2">
                <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Description</p>
                <p className="text-sm font-medium text-slate-800">{achievement.description}</p>
              </div>
            )}
          </div>

          {/* Documents Section */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Attached Documents</h4>
            <div className="flex flex-wrap gap-3">
              {achievement.certificateURL?.url ? (
                <a
                  href={achievement.certificateURL.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Certificate
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">No certificate uploaded</span>
              )}

              {achievement.photographs?.eventPhoto?.url && (
                <a
                  href={achievement.photographs.eventPhoto.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  View Photo
                </a>
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

// Main Admin Achievements Page Component
export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [filteredAchievements, setFilteredAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Modal State
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  // Fetch achievements from backend when component loads
  useEffect(() => {
    fetchAchievements();
  }, []);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [achievements, searchQuery, selectedCategory, selectedType]);

  const fetchAchievements = async () => {
    try {
      const response = await achievementService.getAllAchievements();
      const data = response.data || response.achievements || response;
      setAchievements(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setError("Failed to load achievements. Backend might not be running!");
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (selectedType) params.type = selectedType;
      if (searchQuery) params.search = searchQuery;

      const blob = await achievementService.exportAchievements(params);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Achievements_Export_${new Date().toLocaleDateString("en-IN")}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("Error exporting achievements:", err);
      alert("Failed to export achievements. Please try again.");
    }
  };

  const applyFilters = () => {
    let filtered = [...achievements];

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

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((a) => a.category === selectedCategory);
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter((a) => a.achievementType === selectedType);
    }

    setFilteredAchievements(filtered);
  };

  const handleView = (achievement) => {
    setSelectedAchievement(achievement);
  };

  const handleCloseModal = () => {
    setSelectedAchievement(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?"))
      return;
    try {
      await achievementService.deleteAchievement(id);
      fetchAchievements();
    } catch (err) {
      console.error("Error deleting achievement:", err);
      alert("Failed to delete achievement");
    }
  };

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Manage Achievements
        </h1>
        <p className="text-slate-600 mt-2">
          Showing{" "}
          <span className="font-semibold text-blue-600">
            {filteredAchievements.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900">
            {achievements.length}
          </span>{" "}
          achievements
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by title, description, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white flex-1 min-w-[250px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
          >
            <option value="">All Categories</option>
            <option value="Coding competitions">Coding Competitions</option>
            <option value="Committee">Committee</option>
            <option value="Hackathons">Hackathons</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Technical">Technical</option>
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
          >
            <option value="">All Types</option>
            <option value="Winner">🏆 Winner</option>
            <option value="Runner-up">🥈 Runner-up</option>
            <option value="Participation">Participation</option>
          </select>

          {/* Clear Filters */}
          {(searchQuery || selectedCategory || selectedType) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
                setSelectedType("");
              }}
              className="px-4 py-2.5 rounded-lg border border-red-300 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition"
            >
              Clear
            </button>
          )}

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="px-6 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm ml-auto flex items-center gap-2"
          >
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export to Excel
          </button>

          {/* Add Button */}
          <button className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm ml-2">
            + Add Achievement
          </button>
        </div>
      </div>

      {/* Achievements Container */}
      <div className="min-h-[60vh]">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading achievements...</p>
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
        {!loading && !error && filteredAchievements.length === 0 && (
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-slate-600 text-lg font-medium">
              {searchQuery || selectedCategory || selectedType
                ? "No achievements match your filters."
                : "No achievements found yet."}
            </p>
          </div>
        )}

        {/* Achievements Grid - 4 columns for compact cards */}
        {!loading && !error && filteredAchievements.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredAchievements.map((achievement) => (
              <AchievementCard
                key={achievement?._id}
                achievement={achievement}
                onView={handleView}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedAchievement && (
        <DetailModal
          achievement={selectedAchievement}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
