import React, { useState, useEffect } from "react";
import { FaEye, FaDownload, FaTrash } from "react-icons/fa";
import { placementService } from "../services/placementService";
import { higherStudiesService } from "../services/higherStudiesService";

// Placement Card Component
function PlacementCard({ placement, onView, onDelete }) {
  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Company Logo/Proof */}
      <div className="bg-gradient-to-br from-green-100 to-green-200 h-40 w-full flex items-center justify-center">
        {placement?.placementProof?.url ? (
          <img
            src={placement.placementProof.url}
            alt={placement?.companyName || "Placement"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-500 text-4xl font-bold">
            {placement?.companyName?.charAt(0) || "?"}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow text-center">
        {/* Student Info */}
        <h3 className="text-md font-bold text-gray-900 uppercase">
          {typeof placement?.stuID === "string"
            ? placement.stuID
            : placement?.stuID?.studentID || "N/A"}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          {typeof placement?.stuID === "object"
            ? `${placement.stuID?.branch || "N/A"} - ${
                placement.stuID?.year || "N/A"
              }`
            : "N/A"}
        </p>

        {/* Company Name */}
        <h4 className="text-lg font-bold text-gray-900 uppercase">
          {placement?.companyName || "N/A"}
        </h4>

        {/* CTC */}
        <p className="text-2xl font-bold text-green-600 my-2">
          ₹{placement?.ctc ? `${placement.ctc} LPA` : "N/A"}
        </p>

        {/* Job Role */}
        <p className="text-sm text-gray-600 mb-2">
          {placement?.jobRole || "N/A"}
        </p>

        {/* Placement Date */}
        <p className="text-xs text-gray-500 mb-4">
          {placement?.placementDate
            ? new Date(placement.placementDate).toLocaleDateString()
            : "N/A"}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-col gap-2">
          <button
            onClick={() => onView && onView(placement)}
            className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition flex items-center justify-center gap-2"
          >
            <FaEye />
            View Details
          </button>

          <div className="flex gap-2">
            {placement?.placementProof?.url && (
              <a
                href={placement.placementProof.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <FaDownload />
                Proof
              </a>
            )}
            <button
              onClick={() => onDelete && onDelete(placement._id)}
              className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              <FaTrash />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Higher Studies Card Component
function HigherStudyCard({ higherStudy, onView, onDelete }) {
  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* University Logo */}
      <div className="bg-gradient-to-br from-purple-100 to-purple-200 h-40 w-full flex items-center justify-center">
        {higherStudy?.marksheet?.url ? (
          <img
            src={higherStudy.marksheet.url}
            alt={higherStudy?.universityName || "Higher Study"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-500 text-4xl font-bold">
            {higherStudy?.universityName?.charAt(0) || "?"}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow text-center">
        {/* Student Info */}
        <h3 className="text-md font-bold text-gray-900 uppercase">
          {typeof higherStudy?.stuID === "string"
            ? higherStudy.stuID
            : higherStudy?.stuID?.studentID || "N/A"}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          {typeof higherStudy?.stuID === "object"
            ? `${higherStudy.stuID?.branch || "N/A"} - ${
                higherStudy.stuID?.year || "N/A"
              }`
            : "N/A"}
        </p>

        {/* University Name */}
        <h4 className="text-lg font-bold text-gray-900 uppercase">
          {higherStudy?.universityName || "N/A"}
        </h4>

        {/* Degree */}
        <p className="text-md font-semibold text-purple-600 my-2">
          {higherStudy?.degree || "N/A"}
        </p>

        {/* Specialization */}
        <p className="text-sm text-gray-600 mb-2">
          {higherStudy?.specialization || "N/A"}
        </p>

        {/* Country */}
        <p className="text-xs text-gray-500 mb-4">
          {higherStudy?.country || "N/A"}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-col gap-2">
          <button
            onClick={() => onView && onView(higherStudy)}
            className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition flex items-center justify-center gap-2"
          >
            <FaEye />
            View Details
          </button>

          <div className="flex gap-2">
            {higherStudy?.marksheet?.url && (
              <a
                href={higherStudy.marksheet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <FaDownload />
                Marksheet
              </a>
            )}
            <button
              onClick={() => onDelete && onDelete(higherStudy._id)}
              className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              <FaTrash />
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
  const [activeTab, setActiveTab] = useState("placements"); // "placements" or "higherStudies"

  const [placements, setPlacements] = useState([]);
  const [higherStudies, setHigherStudies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data when component loads or tab changes
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
      console.log("Fetched placements:", response);

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
      console.log("Fetched higher studies:", response);

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
      `Company: ${placement.companyName}\nRole: ${placement.jobRole}\nCTC: ₹${
        placement.ctc
      } LPA\nDate: ${new Date(placement.placementDate).toLocaleDateString()}`
    );
  };

  const handleViewHigherStudy = (higherStudy) => {
    alert(
      `University: ${higherStudy.universityName}\nDegree: ${higherStudy.degree}\nSpecialization: ${higherStudy.specialization}\nCountry: ${higherStudy.country}`
    );
  };

  const handleDeletePlacement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this placement?"))
      return;

    try {
      await placementService.deletePlacement(id);
      alert("Placement deleted successfully!");
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
      alert("Higher study deleted successfully!");
      fetchHigherStudies();
    } catch (err) {
      console.error("Error deleting higher study:", err);
      alert("Failed to delete higher study");
    }
  };

  // Filter logic
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
    <main className="p-6">
      {/* Heading */}
      <div className="mb-4 text-lg font-semibold">
        Showing{" "}
        <span
          className={
            activeTab === "placements" ? "text-green-600" : "text-purple-600"
          }
        >
          {currentData.length}
        </span>{" "}
        of <span className="text-blue-600">{totalData}</span>{" "}
        {activeTab === "placements" ? "Placements" : "Higher Studies"}
      </div>

      {/* Filter / Buttons Row */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder={`Search by ${
            activeTab === "placements" ? "company, role" : "university, degree"
          }...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded bg-white flex-1 min-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Toggle Buttons */}
        <button
          onClick={() => setActiveTab("placements")}
          className={`px-6 py-2 rounded font-semibold transition ${
            activeTab === "placements"
              ? "bg-green-600 text-white"
              : "bg-white border border-green-600 text-green-600 hover:bg-green-50"
          }`}
        >
          📊 Placements
        </button>

        <button
          onClick={() => setActiveTab("higherStudies")}
          className={`px-6 py-2 rounded font-semibold transition ${
            activeTab === "higherStudies"
              ? "bg-purple-600 text-white"
              : "bg-white border border-purple-600 text-purple-600 hover:bg-purple-50"
          }`}
        >
          🎓 Higher Studies
        </button>

        <button className="px-4 py-2 rounded bg-blue-900 text-white hover:bg-blue-800 transition">
          + Add {activeTab === "placements" ? "Placement" : "Higher Study"}
        </button>
      </div>

      {/* Cards Container */}
      <div className="bg-[#0f2130] rounded-2xl p-6 min-h-[60vh] overflow-y-auto">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
        )}

        {/* Empty State */}
        {!loading && !error && currentData.length === 0 && (
          <div className="text-center text-white py-12">
            {searchQuery
              ? `No ${
                  activeTab === "placements" ? "placements" : "higher studies"
                } match your search.`
              : `No ${
                  activeTab === "placements" ? "placements" : "higher studies"
                } found!`}
          </div>
        )}

        {/* Cards Grid */}
        {!loading && !error && currentData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeTab === "placements"
              ? filteredPlacements.map((p, index) => (
                  <PlacementCard
                    key={p._id || `placement-${index}`}
                    placement={p}
                    onView={handleViewPlacement}
                    onDelete={handleDeletePlacement}
                  />
                ))
              : filteredHigherStudies.map((h, index) => (
                  <HigherStudyCard
                    key={h._id || `higherstudy-${index}`}
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
