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

// Main Admin Achievements Page Component
export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [filteredAchievements, setFilteredAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

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
    alert(
      `🏆 ACHIEVEMENT DETAILS\n\nTitle: ${achievement.title}\nCategory: ${achievement.category}\nType: ${achievement.achievementType}\nDescription: ${achievement.description}`
    );
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

          {/* Add Button */}
          <button className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm ml-auto">
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
    </main>
  );
}
