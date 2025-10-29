// import React, { useState, useEffect } from "react";
// import { internshipService } from "../services/internshipService";

// // InternshipCard Component
// function InternshipCard({ internship }) {
//   return (
//     <div className="bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
//       {/* Image Section */}
//       <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
//         <img
//           src={
//             internship.photoProof?.url || "https://via.placeholder.com/300x200"
//           }
//           alt={internship.companyName || "Internship"}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Content Section */}
//       <div className="p-4 flex flex-col flex-grow text-center">
//         <h3 className="text-md font-bold text-gray-900 uppercase">
//           {internship.studentID}
//         </h3>
//         <p className="text-sm text-gray-500">
//           {internship.branch} &nbsp; {internship.year}
//         </p>

//         <h4 className="text-lg font-bold text-gray-900 mt-2 uppercase">
//           {internship.companyName}
//         </h4>

//         <p className="text-sm text-gray-600 mb-4">
//           {internship.duration} | {internship.internshipType}
//         </p>

//         <button className="mt-auto w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition">
//           View Certificate
//         </button>
//       </div>
//     </div>
//   );
// }

// // Main Admin Internships Page Component
// export default function AdminInternships() {
//   const [internships, setInternships] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch internships from backend when component loads
//   useEffect(() => {
//     fetchInternships();
//   }, []);

//   const fetchInternships = async () => {
//     try {
//       const data = await internshipService.getAllInternships();
//       setInternships(data);
//     } catch (err) {
//       setError("Failed to load internships. Backend might not be running!");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="p-6">
//       {/* Heading */}
//       <div className="mb-4 text-lg font-semibold">
//         Showing total{" "}
//         <span className="text-blue-600">{internships.length}</span> Internships
//       </div>

//       {/* Filter / Buttons Row */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         <button className="px-4 py-2 border rounded bg-white">Filters</button>
//         <button className="px-4 py-2 rounded border bg-blue-100">
//           Internship Records
//         </button>
//         <button className="px-4 py-2 rounded bg-blue-900 text-white">
//           + Add Internship
//         </button>
//         <button className="px-4 py-2 rounded border">YEAR</button>
//         <button className="px-4 py-2 rounded border">BRANCH</button>
//       </div>

//       {/* Internship Cards */}
//       <div className="bg-[#0f2130] rounded-2xl p-6 min-h-[60vh] overflow-y-auto">
//         {/* Loading State */}
//         {loading && (
//           <div className="flex items-center justify-center h-64">
//             <div className="text-white text-xl">Loading internships...</div>
//           </div>
//         )}

//         {/* Error State */}
//         {error && !loading && (
//           <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
//         )}

//         {/* Empty State */}
//         {!loading && !error && internships.length === 0 && (
//           <div className="text-center text-white py-12">
//             No internships found. Backend might be empty!
//           </div>
//         )}

//         {/* Internships Grid */}
//         {!loading && !error && internships.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {internships.map((i, index) => (
//               <InternshipCard
//                 key={i._id || `internship-${index}`}
//                 internship={i}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

import React, { useState, useEffect } from "react";
import { FaEye, FaDownload, FaTrash } from "react-icons/fa";
import { internshipService } from "../services/internshipService";

// InternshipCard Component
function InternshipCard({ internship, onView, onDelete }) {
  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
        <img
          src={
            internship?.photoProof?.url || "https://via.placeholder.com/300x200"
          }
          alt={internship?.companyName || "Internship"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow text-center">
        {/* Student Info */}
        <h3 className="text-md font-bold text-gray-900 uppercase">
          {typeof internship?.stuID === "string"
            ? internship.stuID
            : internship?.stuID?.studentID || "N/A"}
        </h3>
        <p className="text-sm text-gray-500">
          {typeof internship?.stuID === "object"
            ? `${internship.stuID?.branch || "N/A"} - ${
                internship.stuID?.year || "N/A"
              }`
            : "N/A"}
        </p>

        {/* Company Name */}
        <h4 className="text-lg font-bold text-gray-900 mt-2 uppercase">
          {internship?.companyName || "N/A"}
        </h4>

        {/* Duration & Type */}
        <p className="text-sm text-gray-600 mb-2">
          {internship?.duration || "N/A"} |{" "}
          {internship?.internshipType || "N/A"}
        </p>

        {/* Stipend */}
        {internship?.stipend && (
          <p className="text-sm font-semibold text-green-600 mb-2">
            ₹{internship.stipend}/month
          </p>
        )}

        {/* Dates */}
        <p className="text-xs text-gray-500 mb-4">
          {internship?.startDate
            ? new Date(internship.startDate).toLocaleDateString()
            : "N/A"}{" "}
          -{" "}
          {internship?.endDate
            ? new Date(internship.endDate).toLocaleDateString()
            : "N/A"}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-col gap-2">
          <button
            onClick={() => onView && onView(internship)}
            className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition flex items-center justify-center gap-2"
          >
            <FaEye />
            View Details
          </button>

          <div className="flex gap-2">
            {internship?.internshipReport?.url && (
              <a
                href={internship.internshipReport.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <FaDownload />
                Report
              </a>
            )}
            {internship?.photoProof?.url && (
              <a
                href={internship.photoProof.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition flex items-center justify-center gap-2"
              >
                <FaDownload />
                Photo
              </a>
            )}
          </div>

          <button
            onClick={() => onDelete && onDelete(internship._id)}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            <FaTrash />
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
      console.log("Fetched internships:", response);

      // Handle different response formats
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
    console.log("View internship:", internship);
    // TODO: Open modal with full details
    alert(
      `Company: ${internship.companyName}\nDuration: ${
        internship.duration
      }\nType: ${internship.internshipType}\nStipend: ₹${
        internship.stipend || 0
      }/month`
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this internship?")) {
      return;
    }

    try {
      await internshipService.deleteInternship(id);
      alert("Internship deleted successfully!");
      fetchInternships(); // Refresh list
    } catch (err) {
      console.error("Error deleting internship:", err);
      alert("Failed to delete internship");
    }
  };

  return (
    <main className="p-6">
      {/* Heading */}
      <div className="mb-4 text-lg font-semibold">
        Showing{" "}
        <span className="text-blue-600">{filteredInternships.length}</span> of{" "}
        <span className="text-green-600">{internships.length}</span> Internships
      </div>

      {/* Filter / Buttons Row */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by company, duration, student ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded bg-white flex-1 min-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-4 py-2 rounded border bg-red-100 text-red-700 hover:bg-red-200 transition"
          >
            Clear Filters
          </button>
        )}

        <button className="px-4 py-2 rounded bg-blue-900 text-white hover:bg-blue-800 transition">
          + Add Internship
        </button>
      </div>

      {/* Internship Cards */}
      <div className="bg-[#0f2130] rounded-2xl p-6 min-h-[60vh] overflow-y-auto">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading internships...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredInternships.length === 0 && (
          <div className="text-center text-white py-12">
            {searchQuery || selectedType
              ? "No internships match your filters."
              : "No internships found. Students need to add internships!"}
          </div>
        )}

        {/* Internships Grid */}
        {!loading && !error && filteredInternships.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredInternships.map((internship, index) => (
              <InternshipCard
                key={internship?._id || `internship-${index}`}
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
