import React from "react";
import PlacementCard from "../components/PlacementCard";
import placements from "../data/placements";

export default function AdminPlacement() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placements.map((p, index) => (
            <PlacementCard key={`placement-${index}`} placement={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
