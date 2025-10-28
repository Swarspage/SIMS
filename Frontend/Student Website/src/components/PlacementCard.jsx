import React from "react";

export default function PlacementCard({ placement }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="h-40 bg-gray-300 flex items-center justify-center overflow-hidden">
        <img
          src={
            placement.placementProof?.url ||
            "https://via.placeholder.com/300x200"
          }
          alt={placement.studentID || "Placement"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {placement.studentID}
        </h3>

        <div className="space-y-1 text-sm text-gray-600 mb-3">
          <p>
            <span className="font-semibold">Company:</span>{" "}
            {placement.companyName}
          </p>
          <p>
            <span className="font-semibold">Position:</span>{" "}
            {placement.position}
          </p>
          <p>
            <span className="font-semibold">Package:</span>{" "}
            {placement.package || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Type:</span>{" "}
            {placement.placementType}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
            View Details
          </button>
          <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
