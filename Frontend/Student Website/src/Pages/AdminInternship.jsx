import React, { useState, useEffect } from "react";
import { internshipService } from "../services/internshipService";

// InternshipCard Component - COMPACT & BEAUTIFUL
function InternshipCard({ internship, onView, onDelete }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      {/* Image Section - Smaller */}
      <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
        <img
          src={
            internship?.photoProof?.url ||
            "https://via.placeholder.com/300x200?text=Internship"
          }
          alt={internship?.companyName || "Internship"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section - Compact */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Student ID */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
          {typeof internship?.stuID === "string"
            ? internship.stuID
            : internship?.stuID?.studentID || "N/A"}
        </p>

        {/* Company Name */}
        <h3 className="text-sm font-bold text-slate-900 mb-1 line-clamp-2">
          {internship?.companyName || "N/A"}
        </h3>

        {/* Duration & Type Badge */}
        <div className="flex gap-2 mb-2 text-xs">
          <span className="px-2 py-1 bg-blue-50 text-blue-700 font-semibold rounded-full">
            {internship?.internshipType || "N/A"}
          </span>
          <span className="px-2 py-1 bg-slate-100 text-slate-700 font-semibold rounded-full">
            {internship?.durationMonths || "N/A"} months
          </span>
        </div>

        {/* Stipend */}
        {internship?.stipendInfo?.isPaid &&
          internship?.stipendInfo?.stipend && (
            <p className="text-sm font-bold text-green-600 mb-2">
              ₹{internship.stipendInfo.stipend}/mo
            </p>
          )}

        {/* Dates */}
        <p className="text-xs text-slate-500 mb-3">
          {internship?.startDate
            ? new Date(internship.startDate).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              })
            : "N/A"}{" "}
          -{" "}
          {internship?.endDate
            ? new Date(internship.endDate).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              })
            : "N/A"}
        </p>

        {/* Action Buttons - Compact */}
        <div className="mt-auto space-y-2">
          <button
            onClick={() => onView && onView(internship)}
            className="w-full px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>

          <div className="grid grid-cols-2 gap-2">
            {internship?.internshipReport?.url && (
              <a
                href={internship.internshipReport.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors text-center"
              >
                Report
              </a>
            )}
            {internship?.photoProof?.url && (
              <a
                href={internship.photoProof.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors text-center"
              >
                Photo
              </a>
            )}
          </div>

          <button
            onClick={() => onDelete && onDelete(internship._id)}
            className="w-full px-3 py-2 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Admin Internships Page Component
export default function AdminInternship() {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Fetch internships from backend when component loads
  useEffect(() => {
    fetchInternships();
  }, []);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [internships, searchQuery, selectedType]);

  const fetchInternships = async () => {
    try {
      const response = await internshipService.getAllInternships();
      const data = response.data || response.internships || response;
      setInternships(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching internships:", err);
      setError("Failed to load internships. Backend might not be running!");
      setInternships([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...internships];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.companyName?.toLowerCase().includes(query) ||
          i.duration?.toLowerCase().includes(query) ||
          (typeof i.stuID === "string" ? i.stuID : i.stuID?.studentID)
            ?.toLowerCase()
            .includes(query)
      );
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter((i) => i.internshipType === selectedType);
    }

    setFilteredInternships(filtered);
  };
  const handleView = (internship) => {
    alert(
      `🏢 INTERNSHIP DETAILS\n\nCompany: ${internship.companyName}\nDuration: ${
        internship.durationMonths || "N/A"
      } months\nType: ${internship.internshipType || "N/A"}\nStipend: ₹${
        internship.stipendInfo?.stipend || 0
      }/month`
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this internship?"))
      return;
    try {
      await internshipService.deleteInternship(id);
      fetchInternships();
    } catch (err) {
      console.error("Error deleting internship:", err);
      alert("Failed to delete internship");
    }
  };

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Manage Internships
        </h1>
        <p className="text-slate-600 mt-2">
          Showing{" "}
          <span className="font-semibold text-blue-600">
            {filteredInternships.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900">
            {internships.length}
          </span>{" "}
          internships
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by company, duration, ID..."
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
            <option value="Technical">Technical</option>
            <option value="Non-Technical">Non-Technical</option>
            <option value="Research">Research</option>
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
            + Add Internship
          </button>
        </div>
      </div>

      {/* Cards Container */}
      <div className="min-h-[60vh]">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading internships...</p>
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
        {!loading && !error && filteredInternships.length === 0 && (
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
                d="M12 6.253v13m0-13C6.228 6.228 2 10.228 2 15s4.228 8.772 10 8.772 10-4.228 10-8.772c0-4.772-4.228-8.747-10-8.747z"
              />
            </svg>
            <p className="text-slate-600 text-lg font-medium">
              {searchQuery || selectedType
                ? "No internships match your filters."
                : "No internships found yet."}
            </p>
          </div>
        )}

        {/* Internships Grid - 4 Columns for compact cards */}
        {!loading && !error && filteredInternships.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredInternships.map((internship) => (
              <InternshipCard
                key={internship?._id}
                internship={internship}
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
