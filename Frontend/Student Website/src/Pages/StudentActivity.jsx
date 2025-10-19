import React, { useState } from "react";
import activitiesData from "../data/activities";

// Activity Card Component with Remove Button
function ActivityCard({ activity, onRemove }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
      {/* Remove Button */}
      <button
        onClick={() => onRemove(activity.id)}
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition z-10"
        title="Remove Activity"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="bg-gray-200 h-40 flex items-center justify-center">
        {/* Placeholder for activity image */}
        <div className="text-gray-400 text-sm">Activity Image</div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{activity.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{activity.date}</p>
        <p className="text-xs text-blue-600 mb-2 font-semibold">
          {activity.type}
        </p>
        <p className="text-sm text-gray-600 line-clamp-3">
          {activity.description}
        </p>
      </div>
    </div>
  );
}

// Main Activities Page Component
export default function StudentActivity() {
  const [activities, setActivities] = useState(activitiesData);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "",
    certificate: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      certificate: e.target.files[0],
    }));
  };

  const handleAddActivity = () => {
    if (
      formData.title &&
      formData.description &&
      formData.date &&
      formData.type
    ) {
      const newActivity = {
        id: activities.length + 1,
        name: formData.title,
        date: formData.date,
        type: formData.type,
        description: formData.description,
      };
      setActivities((prev) => [...prev, newActivity]);
      // Reset form
      setFormData({
        title: "",
        description: "",
        date: "",
        type: "",
        certificate: null,
      });
      alert("Activity added successfully!");
    } else {
      alert("Please fill all fields!");
    }
  };

  const handleSubmit = () => {
    console.log("Submitting all activities:", activities);
    alert(`Submitted ${activities.length} activities successfully!`);
  };

  const handleRemoveActivity = (id) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
  };

  return (
    <main className="p-6">
      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mb-6">
        <button
          onClick={handleAddActivity}
          className="px-6 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-[#0f172a] transition"
        >
          +Add Activity
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
        >
          Submit All
        </button>
      </div>

      {/* Form Section + Activities Grid Combined */}
      <div className="bg-[#1e293b] rounded-2xl p-8">
        {/* Title */}
        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            rows="4"
            className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-gray-800"
          />
        </div>

        {/* Date and Type Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Date */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Type
            </label>
            <div className="relative">
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800"
              >
                <option value="">Type</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Competition">Competition</option>
                <option value="Cultural">Cultural</option>
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Certificate Upload */}
        <div className="mb-8">
          <label className="block text-white text-sm font-medium mb-2">
            Certificate
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={
                formData.certificate
                  ? formData.certificate.name
                  : "UPLOAD CERTIFICATE"
              }
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              readOnly
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Activities Count */}
        <div className="mb-4">
          <h2 className="text-white text-xl font-semibold">
            Total Activities:{" "}
            <span className="text-green-400">{activities.length}</span>
          </h2>
        </div>

        {/* Activities Grid - Now inside the dark container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onRemove={handleRemoveActivity}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
