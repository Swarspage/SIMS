import React, { useState, useEffect } from "react";
import { placementService } from "../services/placementService";
import { higherStudiesService } from "../services/higherStudiesService";
import * as XLSX from "xlsx";

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

// Detail View Modal Component
function DetailModal({ item, type, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {type === "placement" ? "Placement Details" : "Higher Study Details"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">ID: {item._id}</p>
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
                {(type === "placement" ? item.placementProof?.url : item.marksheet?.url) ? (
                  <img
                    src={type === "placement" ? item.placementProof.url : item.marksheet.url}
                    alt="Proof"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">🎓</span>
                )}
              </div>
            </div>

            {/* Basic Details */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {type === "placement" ? item.companyName : item.universityName}
                </h3>
                <p className="text-sm text-slate-500">
                  {typeof item?.stuID === "string" ? item.stuID : item?.stuID?.studentID || "Student ID N/A"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {type === "placement" ? (
                  <>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                      {item.jobRole}
                    </span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                      ₹{item.ctc} LPA
                    </span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100">
                      {item.placementType}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                      {item.degree}
                    </span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100">
                      {item.country}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Grid Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {type === "placement" ? (
              <>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Company Address</p>
                  <p className="text-sm font-medium text-slate-800">{item.companyAddress || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">HR Email</p>
                  <p className="text-sm font-medium text-slate-800">{item.hrEmail || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Placement Date</p>
                  <p className="text-sm font-medium text-slate-800">
                    {item.placementDate ? new Date(item.placementDate).toLocaleDateString('en-IN', { dateStyle: 'long' }) : 'N/A'}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Specialization</p>
                  <p className="text-sm font-medium text-slate-800">{item.specialization || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Duration</p>
                  <p className="text-sm font-medium text-slate-800">{item.duration || 'N/A'}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">University Address</p>
                  <p className="text-sm font-medium text-slate-800">{item.universityAddress || 'N/A'}</p>
                </div>
              </>
            )}

            {item.description && (
              <div className="sm:col-span-2">
                <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Description</p>
                <p className="text-sm font-medium text-slate-800">{item.description}</p>
              </div>
            )}
          </div>

          {/* Documents Section */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Attached Documents</h4>
            <div className="flex flex-wrap gap-3">
              {(type === "placement" ? item.placementProof?.url : item.marksheet?.url) ? (
                <a
                  href={type === "placement" ? item.placementProof.url : item.marksheet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  {type === "placement" ? "Placement Proof" : "Marksheet/Proof"}
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">No proof uploaded</span>
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

// Main Admin Placement Component
export default function AdminPlacement() {
  const [activeTab, setActiveTab] = useState("placements");
  const [placements, setPlacements] = useState([]);
  const [higherStudies, setHigherStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null); // "placement" or "higherStudy"

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
    setSelectedItem(placement);
    setModalType("placement");
  };

  const handleViewHigherStudy = (higherStudy) => {
    setSelectedItem(higherStudy);
    setModalType("higherStudy");
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalType(null);
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

  const handleExport = () => {
    try {
      const isPlacement = activeTab === "placements";

      if (currentData.length === 0) {
        alert("No data available to export.");
        return;
      }

      const formattedData = currentData.map((item) => {
        const studentId = typeof item?.stuID === "string" ? item.stuID : item?.stuID?.studentID || "N/A";

        if (isPlacement) {
          return {
            "Student ID": studentId,
            "Company Name": item.companyName || "N/A",
            "Job Role": item.jobRole || "N/A",
            "Package (LPA)": item.ctc || "N/A",
            "Placement Type": item.placementType || "N/A",
            "Placement Date": item.placementDate ? new Date(item.placementDate).toLocaleDateString("en-IN") : "N/A",
            "Company Address": item.companyAddress || "N/A",
            "HR Email": item.hrEmail || "N/A",
          };
        } else {
          return {
            "Student ID": studentId,
            "University Name": item.universityName || "N/A",
            "Degree": item.degree || "N/A",
            "Specialization": item.specialization || "N/A",
            "Country": item.country || "N/A",
            "Duration": item.duration || "N/A",
            "University Address": item.universityAddress || "N/A",
          };
        }
      });

      const worksheet = XLSX.utils.json_to_sheet(formattedData);

      // Auto-size columns
      const colWidths = Object.keys(formattedData[0]).map(key => ({
        wch: Math.max(key.length, ...formattedData.map(d => (d[key] ? d[key].toString().length : 0))) + 2
      }));
      worksheet['!cols'] = colWidths;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, isPlacement ? "Placements" : "Higher Studies");

      const fileName = `${isPlacement ? "Placements" : "Higher_Studies"}_Export_${new Date().toLocaleDateString("en-IN")}.xlsx`;
      XLSX.writeFile(workbook, fileName);

    } catch (err) {
      console.error("Error exporting data:", err);
      alert("Failed to export data. Please try again.");
    }
  };

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
            placeholder={`Search by ${activeTab === "placements"
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
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === "placements"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              📊 Placements
            </button>

            <button
              onClick={() => setActiveTab("higherStudies")}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === "higherStudies"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              🎓 Higher Studies
            </button>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="px-6 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2"
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
                ? `No ${activeTab === "placements" ? "placements" : "higher studies"
                } match your search.`
                : `No ${activeTab === "placements" ? "placements" : "higher studies"
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

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          type={modalType}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
