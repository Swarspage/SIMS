

import React, { useState, useEffect } from "react";
import { activityService } from "../services/activityService";

// ActivityCard Component - COMPACT & BEAUTIFUL & RESPONSIVE
function ActivityCard({ activity, onEdit, onDelete }) {
  const [imageError, setImageError] = React.useState(false);
  const certificateUrl = activity?.certificate?.url;
  const isPDF = certificateUrl?.toLowerCase()?.endsWith('.pdf');

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      {/* Certificate Image/Preview Section */}
      <div className="h-32 sm:h-36 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden relative">
        {certificateUrl && !isPDF && !imageError ? (
          <img
            src={certificateUrl}
            alt={activity?.title || "Activity"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : isPDF ? (
          // PDF Icon Display
          <div className="flex flex-col items-center justify-center text-blue-600">
            <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-semibold">PDF Certificate</span>
          </div>
        ) : (
          // Placeholder
          <div className="flex flex-col items-center justify-center text-slate-400">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs font-medium">Certificate</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        {/* Type Badge */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
          {activity?.type || "N/A"}
        </p>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 line-clamp-2">
          {activity?.title || "N/A"}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 mb-3 line-clamp-2">
          {activity?.description || "N/A"}
        </p>

        {/* Date */}
        <p className="text-xs sm:text-sm text-slate-500 mb-3">
          {activity?.date
            ? new Date(activity.date).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            : "N/A"}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto space-y-2">
          {certificateUrl && (
            <a
              href={certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center block"
            >
              View Certificate
            </a>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onEdit(activity)}
              className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(activity._id)}
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

// Main Component
export default function StudentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // View state
  const [view, setView] = useState("list"); // "list" or "form"
  const [editingId, setEditingId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [certificate, setCertificate] = useState(null);
  const [certificatePreview, setCertificatePreview] = useState("");

  // Fetch activities on mount
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await activityService.getActivityByStu();
      const data = response.data || response.activities || response;
      setActivities(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error("Error fetching activities:", err);
      setError("Failed to load activities");
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type - only allow PNG and JPEG images
    const validTypes = ['image/png', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PNG or JPG image file only.');
      e.target.value = ''; // Clear the file input
      return;
    }

    // Clear any previous error
    setError('');
    setCertificate(file);
    setCertificatePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
    });
    setCertificate(null);
    setCertificatePreview("");
    setEditingId(null);
  };

  const openFormForAdd = () => {
    resetForm();
    setView("form");
  };

  const openFormForEdit = (activity) => {
    console.log("📝 Opening edit form for activity:", activity);
    console.log("🖼️ Certificate data:", activity.certificate);

    setEditingId(activity._id);
    setFormData({
      title: activity.title,
      description: activity.description,
      date: activity.date.split("T")[0],
    });

    // Set certificate preview if it exists
    if (activity.certificate?.url) {
      console.log("✅ Setting certificate preview URL:", activity.certificate.url);
      setCertificatePreview(activity.certificate.url);
    } else {
      console.log("⚠️ No certificate URL found in activity");
    }

    setView("form");
  };

  const backToList = () => {
    resetForm();
    setView("list");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setSuccess("");
    setError("");

    try {
      if (!certificate && !editingId) {
        setError("Certificate is required!");
        setFormLoading(false);
        return;
      }

      const data = new FormData();
      // Type is handled by backend (forced to Committee)
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("date", formData.date);

      if (certificate) {
        data.append("certificate", certificate);
      }

      if (editingId) {
        await activityService.updateActivity(editingId, data);
        setSuccess("Activity updated successfully!");
      } else {
        await activityService.createActivity(data);
        setSuccess("Activity created successfully!");
      }

      resetForm();
      await fetchActivities();
      setTimeout(() => setView("list"), 500);
    } catch (err) {
      console.error("Error saving activity:", err);
      const resData = err.response?.data;
      let errorMsg = resData?.message || "Failed to save activity.";

      if (resData?.errors && Array.isArray(resData.errors)) {
        const details = resData.errors.map(e => `${e.field}: ${e.message}`).join(", ");
        errorMsg += ` (${details})`;
      }

      setError(errorMsg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?"))
      return;
    try {
      await activityService.deleteActivity(id);
      setSuccess("Activity deleted successfully!");
      fetchActivities();
    } catch (err) {
      console.error("Error deleting activity:", err);
      setError("Failed to delete activity");
    }
  };

  // =============== FORM VIEW ===============
  if (view === "form") {
    return (
      <main className="p-3 sm:p-6 md:p-10 bg-slate-50 min-h-screen">
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{success}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={backToList}
          className="mb-6 px-4 py-2.5 rounded-lg bg-slate-300 text-slate-900 text-sm font-semibold hover:bg-slate-400 transition-colors flex items-center gap-2"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to List
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {editingId ? "Edit Activity" : "Add New Activity"}
          </h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">
            {editingId
              ? "Update your activity details"
              : "Record your achievements and activities"}
          </p>
        </div>

        {/* Activity Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-8">
              {/* Section: Activity Details */}
              <div className="mb-10">
                <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-blue-500">
                  Activity Information
                </h2>

                {/* Title */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter activity title"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your activity..."
                    rows="4"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    required
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Date
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              {/* Section: Certificate Upload */}
              <div className="mb-8">
                <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-blue-500">
                  Certificate
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Upload Certificate
                    {!editingId && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-end">
                    <div className="flex-1 w-full">
                      <input
                        type="text"
                        value={
                          certificate
                            ? certificate.name
                            : certificatePreview
                              ? "Certificate selected"
                              : "No file chosen"
                        }
                        placeholder="Upload Certificate"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 placeholder-slate-400 text-sm"
                        readOnly
                      />
                    </div>
                    <label className="px-5 py-2.5 mt-2 sm:mt-0 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer shadow-sm">
                      UPLOAD
                      <input
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                        required={!editingId}
                      />
                    </label>
                  </div>

                  {/* Certificate Preview */}
                  {certificatePreview && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex gap-4 items-start">
                        <img
                          src={certificatePreview}
                          alt="Certificate Preview"
                          className="w-24 h-24 object-cover rounded border-2 border-blue-500"
                        />
                        <div className="flex-1">
                          <p className="text-xs text-green-600 mb-2 flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Certificate ready to submit
                          </p>
                          <a
                            href={certificatePreview}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 underline"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Full Certificate
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 px-4 sm:px-8 py-4 sm:py-6 bg-slate-50 border-t border-slate-200">
              <button
                type="button"
                onClick={backToList}
                className="px-6 py-2.5 rounded-lg bg-slate-300 text-slate-900 text-sm font-semibold hover:bg-slate-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formLoading}
                className="px-8 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {formLoading
                  ? "Submitting..."
                  : editingId
                    ? "Update Activity"
                    : "Submit Activity"}
              </button>
            </div>
          </div>
        </form>
      </main>
    );
  }

  // =============== LIST VIEW ===============
  return (
    <main className="p-3 sm:p-6 md:p-10 bg-slate-50 min-h-screen">
      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{success}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            My Activities
          </h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">
            Showing{" "}
            <span className="font-semibold text-blue-600">
              {activities.length}
            </span>{" "}
            activities
          </p>
        </div>

        {/* Add Button */}
        <button
          onClick={openFormForAdd}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto"
        >
          + Add Activity
        </button>
      </div>

      {/* Cards Container */}
      <div className="min-h-[60vh]">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading activities...</p>
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
        {!loading && !error && activities.length === 0 && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-10 sm:p-16 text-center">
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="text-slate-600 text-base sm:text-lg font-medium">
              No activities yet. Click "Add Activity" to get started!
            </p>
          </div>
        )}

        {/* Activities Grid */}
        {!loading && !error && activities.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {activities.map((activity) => (
              <ActivityCard
                key={activity._id}
                activity={activity}
                onEdit={openFormForEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
