import React, { useState, useEffect } from "react";
import { placementService } from "../services/placementService";
import { higherStudiesService } from "../services/higherStudiesService";

// Placement Card Component - COMPACT
function PlacementCard({ placement, onView, onDelete }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      {/* Image Section */}
      <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
        {placement?.placementProof?.url ? (
          <img
            src={placement.placementProof.url}
            alt={placement?.companyName || "Placement"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-slate-300 text-5xl font-bold">
            {placement?.companyName?.charAt(0) || "?"}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Student ID */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
          {typeof placement?.stuID === "string"
            ? placement.stuID
            : placement?.stuID?.studentID || "N/A"}
        </p>

        {/* Company Name */}
        <h3 className="text-sm font-bold text-slate-900 mb-1 line-clamp-2">
          {placement?.companyName || "N/A"}
        </h3>

        {/* Job Role */}
        <p className="text-xs text-slate-600 mb-2 line-clamp-1">
          {placement?.jobRole || "N/A"}
        </p>

        {/* CTC */}
        <div className="mb-2 pb-2 border-b border-slate-200">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
            Package
          </p>
          <p className="text-lg font-bold text-blue-600">
            ₹{placement?.ctc ? `${placement.ctc} LPA` : "N/A"}
          </p>
        </div>

        {/* Placement Type */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
            {placement?.placementType || "N/A"}
          </span>
        </div>

        {/* Date */}
        <p className="text-xs text-slate-500 mb-3">
          {placement?.placementDate
            ? new Date(placement.placementDate).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "N/A"}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto space-y-2">
          <button
            onClick={() => onView && onView(placement)}
            className="w-full px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View
          </button>

          <div className="grid grid-cols-2 gap-2">
            {placement?.placementProof?.url && (
              <a
                href={placement.placementProof.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors text-center"
              >
                Download
              </a>
            )}
            <button
              onClick={() => onDelete && onDelete(placement._id)}
              className="px-3 py-2 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Higher Studies Card Component - COMPACT
function HigherStudyCard({ higherStudy, onView, onDelete }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      {/* Image Section */}
      <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
        {higherStudy?.marksheet?.url ? (
          <img
            src={higherStudy.marksheet.url}
            alt={higherStudy?.universityName || "Higher Study"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-slate-300 text-5xl font-bold">
            {higherStudy?.universityName?.charAt(0) || "?"}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Student ID */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
          {typeof higherStudy?.stuID === "string"
            ? higherStudy.stuID
            : higherStudy?.stuID?.studentID || "N/A"}
        </p>

        {/* University Name */}
        <h3 className="text-sm font-bold text-slate-900 mb-1 line-clamp-2">
          {higherStudy?.universityName || "N/A"}
        </h3>

        {/* Degree */}
        <p className="text-xs text-slate-600 mb-2 line-clamp-1">
          {higherStudy?.degree || "N/A"}
        </p>

        {/* Specialization */}
        <div className="mb-2 pb-2 border-b border-slate-200">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
            Specialization
          </p>
          <p className="text-xs font-semibold text-slate-900 line-clamp-1">
            {higherStudy?.specialization || "N/A"}
          </p>
        </div>

        {/* Country */}
        <div className="mb-3">
          <span className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
            📍 {higherStudy?.country || "N/A"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto space-y-2">
          <button
            onClick={() => onView && onView(higherStudy)}
            className="w-full px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View
          </button>

          <div className="grid grid-cols-2 gap-2">
            {higherStudy?.marksheet?.url && (
              <a
                href={higherStudy.marksheet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors text-center"
              >
                Download
              </a>
            )}
            <button
              onClick={() => onDelete && onDelete(higherStudy._id)}
              className="px-3 py-2 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Admin Placement Component
export default function AdminPlacement() {
  const [activeTab, setActiveTab] = useState("placements");
  const [placements, setPlacements] = useState([]);
  const [higherStudies, setHigherStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (activeTab === "placements") {
      fetchPlacements();
    } else {
      fetchHigherStudies();
    }
  }, [activeTab]);

  const fetchPlacements = async () => {
    setLoading(true);
    try {
      const response = await placementService.getAllPlacements();
      const data = response.data || response.placements || response;
      setPlacements(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching placements:", err);
      setError("Failed to load placements!");
      setPlacements([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchHigherStudies = async () => {
    setLoading(true);
    try {
      const response = await higherStudiesService.getAllHigherStudies();
      const data = response.data || response.higherStudies || response;
      setHigherStudies(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching higher studies:", err);
      setError("Failed to load higher studies!");
      setHigherStudies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPlacement = (placement) => {
    alert(
      `📊 PLACEMENT DETAILS\n\nCompany: ${placement.companyName}\nRole: ${
        placement.jobRole
      }\nCTC: ₹${placement.ctc} LPA\nDate: ${new Date(
        placement.placementDate
      ).toLocaleDateString()}`
    );
  };

  const handleViewHigherStudy = (higherStudy) => {
    alert(
      `🎓 HIGHER STUDIES DETAILS\n\nUniversity: ${higherStudy.universityName}\nDegree: ${higherStudy.degree}\nSpecialization: ${higherStudy.specialization}\nCountry: ${higherStudy.country}`
    );
  };

  const handleDeletePlacement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this placement?"))
      return;
    try {
      await placementService.deletePlacement(id);
      fetchPlacements();
    } catch (err) {
      console.error("Error deleting placement:", err);
      alert("Failed to delete placement");
    }
  };

  const handleDeleteHigherStudy = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this higher study record?"
      )
    )
      return;
    try {
      await higherStudiesService.deleteHigherStudy(id);
      fetchHigherStudies();
    } catch (err) {
      console.error("Error deleting higher study:", err);
      alert("Failed to delete higher study");
    }
  };

  const filteredPlacements = placements.filter((p) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.companyName?.toLowerCase().includes(query) ||
      p.jobRole?.toLowerCase().includes(query) ||
      (typeof p.stuID === "string" ? p.stuID : p.stuID?.studentID)
        ?.toLowerCase()
        .includes(query)
    );
  });

  const filteredHigherStudies = higherStudies.filter((h) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      h.universityName?.toLowerCase().includes(query) ||
      h.degree?.toLowerCase().includes(query) ||
      h.specialization?.toLowerCase().includes(query) ||
      (typeof h.stuID === "string" ? h.stuID : h.stuID?.studentID)
        ?.toLowerCase()
        .includes(query)
    );
  });

  const currentData =
    activeTab === "placements" ? filteredPlacements : filteredHigherStudies;
  const totalData =
    activeTab === "placements" ? placements.length : higherStudies.length;

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Career Outcomes</h1>
        <p className="text-slate-600 mt-2">
          Manage{" "}
          <span className="font-semibold text-blue-600">
            {currentData.length}
          </span>{" "}
          of <span className="font-semibold text-slate-900">{totalData}</span>{" "}
          {activeTab === "placements" ? "placements" : "higher studies"}
        </p>
      </div>

      {/* Filters & Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <input
            type="text"
            placeholder={`Search by ${
              activeTab === "placements"
                ? "company, role, ID"
                : "university, degree"
            }...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white flex-1 min-w-[250px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          {/* Tab Buttons */}
          <div className="flex gap-3 ml-auto">
            <button
              onClick={() => setActiveTab("placements")}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === "placements"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              📊 Placements
            </button>

            <button
              onClick={() => setActiveTab("higherStudies")}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === "higherStudies"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              🎓 Higher Studies
            </button>

            <button className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              + Add
            </button>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <div className="min-h-[60vh]">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading...</p>
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
        {!loading && !error && currentData.length === 0 && (
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-slate-600 text-lg font-medium">
              {searchQuery
                ? `No ${
                    activeTab === "placements" ? "placements" : "higher studies"
                  } match your search.`
                : `No ${
                    activeTab === "placements" ? "placements" : "higher studies"
                  } found!`}
            </p>
          </div>
        )}

        {/* Cards Grid - 4 Columns */}
        {!loading && !error && currentData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {activeTab === "placements"
              ? filteredPlacements.map((p) => (
                  <PlacementCard
                    key={p._id}
                    placement={p}
                    onView={handleViewPlacement}
                    onDelete={handleDeletePlacement}
                  />
                ))
              : filteredHigherStudies.map((h) => (
                  <HigherStudyCard
                    key={h._id}
                    higherStudy={h}
                    onView={handleViewHigherStudy}
                    onDelete={handleDeleteHigherStudy}
                  />
                ))}
          </div>
        )}
      </div>
    </main>
  );
}
