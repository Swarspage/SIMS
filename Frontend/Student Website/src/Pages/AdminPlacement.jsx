import React, { useState, useEffect } from "react";
import PlacementCard from "../components/PlacementCard";
import { placementService } from "../services/placementService";

export default function AdminPlacement() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch placements from backend when component loads
  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const data = await placementService.getAllPlacements();
      setPlacements(data);
    } catch (err) {
      setError("Failed to load placements. Backend might not be running!");
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
        <span className="text-green-600">{placements.length}</span> Placements
      </div>

      {/* Filter / Buttons Row */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="px-4 py-2 border rounded bg-white">Filters</button>
        <button className="px-4 py-2 rounded border bg-green-100">
          Placement Records
        </button>
        <button className="px-4 py-2 rounded bg-blue-900 text-white">
          + Add Placement
        </button>
        <button className="px-4 py-2 rounded border">YEAR</button>
        <button className="px-4 py-2 rounded border">BRANCH</button>
      </div>

      {/* Placement Cards */}
      <div className="bg-[#0f2130] rounded-2xl p-6 min-h-[60vh] overflow-y-auto">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading placements...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
        )}

        {/* Empty State */}
        {!loading && !error && placements.length === 0 && (
          <div className="text-center text-white py-12">
            No placements found. Backend might be empty!
          </div>
        )}

        {/* Placements Grid */}
        {!loading && !error && placements.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {placements.map((p, index) => (
              <PlacementCard
                key={p._id || `placement-${index}`}
                placement={p}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
