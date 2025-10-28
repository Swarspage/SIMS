import React, { useState, useEffect } from "react";
import { internshipService } from "../services/internshipService";

// InternshipCard Component
function InternshipCard({ internship }) {
  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
        <img
          src={
            internship.photoProof?.url || "https://via.placeholder.com/300x200"
          }
          alt={internship.companyName || "Internship"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow text-center">
        <h3 className="text-md font-bold text-gray-900 uppercase">
          {internship.studentID}
        </h3>
        <p className="text-sm text-gray-500">
          {internship.branch} &nbsp; {internship.year}
        </p>

        <h4 className="text-lg font-bold text-gray-900 mt-2 uppercase">
          {internship.companyName}
        </h4>

        <p className="text-sm text-gray-600 mb-4">
          {internship.duration} | {internship.internshipType}
        </p>

        <button className="mt-auto w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition">
          View Certificate
        </button>
      </div>
    </div>
  );
}

// Main Admin Internships Page Component
export default function AdminInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch internships from backend when component loads
  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const data = await internshipService.getAllInternships();
      setInternships(data);
    } catch (err) {
      setError("Failed to load internships. Backend might not be running!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      {/* Heading */}
      <div className="mb-4 text-lg font-semibold">
        Showing total{" "}
        <span className="text-blue-600">{internships.length}</span> Internships
      </div>

      {/* Filter / Buttons Row */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="px-4 py-2 border rounded bg-white">Filters</button>
        <button className="px-4 py-2 rounded border bg-blue-100">
          Internship Records
        </button>
        <button className="px-4 py-2 rounded bg-blue-900 text-white">
          + Add Internship
        </button>
        <button className="px-4 py-2 rounded border">YEAR</button>
        <button className="px-4 py-2 rounded border">BRANCH</button>
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
        {!loading && !error && internships.length === 0 && (
          <div className="text-center text-white py-12">
            No internships found. Backend might be empty!
          </div>
        )}

        {/* Internships Grid */}
        {!loading && !error && internships.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {internships.map((i, index) => (
              <InternshipCard
                key={i._id || `internship-${index}`}
                internship={i}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
