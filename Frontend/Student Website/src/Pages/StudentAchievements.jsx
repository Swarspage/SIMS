import React, { useState, useEffect } from "react";
import { achievementService } from "../services/achievementService";

// AchievementCard Component - COMPACT & BEAUTIFUL
function AchievementCard({ achievement, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      {/* Image Section */}
      <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
        <img
          src={
            achievement?.photographs?.eventPhoto?.url ||
            "https://via.placeholder.com/300x200?text=Achievement"
          }
          alt={achievement?.title || "Achievement"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category & Type Badge */}
        <div className="flex gap-2 mb-2 text-xs">
          <span className="px-2 py-1 bg-blue-50 text-blue-700 font-semibold rounded-full">
            {achievement?.category || "N/A"}
          </span>
          <span className="px-2 py-1 bg-green-50 text-green-700 font-semibold rounded-full">
            {achievement?.achievementType || "N/A"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-slate-900 mb-1 line-clamp-2">
          {achievement?.title || "N/A"}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 mb-2 line-clamp-2">
          {achievement?.description || "N/A"}
        </p>

        {/* Issued By */}
        <p className="text-xs text-slate-500 mb-2">
          <span className="font-semibold">By:</span>{" "}
          {achievement?.issuedBy || "N/A"}
        </p>

        {/* Dates */}
        <p className="text-xs text-slate-500 mb-3">
          {achievement?.date?.from
            ? new Date(achievement.date.from).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A"}{" "}
          -{" "}
          {achievement?.date?.to
            ? new Date(achievement.date.to).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A"}
        </p>

        {/* Team Members if any */}
        {achievement?.teamMembers && achievement.teamMembers.length > 0 && (
          <p className="text-xs text-slate-600 mb-3">
            <span className="font-semibold">Team:</span>{" "}
            {achievement.teamMembers.join(", ")}
          </p>
        )}

        {/* Action Buttons */}
        <div className="mt-auto space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {achievement?.photographs?.eventPhoto?.url && (
              <a
                href={achievement.photographs.eventPhoto.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Photo
              </a>
            )}
            {achievement?.photographs?.certificate?.url && (
              <a
                href={achievement.photographs.certificate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-slate-600 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors text-center"
              >
                Certificate
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onEdit(achievement)}
              className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(achievement._id)}
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
export default function StudentAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // View state
  const [view, setView] = useState("list"); // "list" or "form"
  const [editingId, setEditingId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    studentID: "",
    category: "",
    title: "",
    description: "",
    issuedBy: "",
    dateFrom: "",
    dateTo: "",
    achievementType: "",
    teamMembers: "",
  });

  const [eventPhoto, setEventPhoto] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [eventPhotoPreview, setEventPhotoPreview] = useState("");
  const [certificatePreview, setCertificatePreview] = useState("");

  // Fetch achievements on mount
  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const studentId = achievementService.getStudentIdFromToken();
      if (!studentId) return;

      const data = await achievementService.getAchievementsByStu();
      setAchievements(Array.isArray(data) ? data : []);
      setFormData((prev) => ({ ...prev, studentID: studentId }));
      setError("");
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setError("Failed to load achievements");
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "eventPhoto") {
      setEventPhoto(file);
      setEventPhotoPreview(URL.createObjectURL(file));
    } else if (type === "certificate") {
      setCertificate(file);
      setCertificatePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    const studentId = achievementService.getStudentIdFromToken();
    setFormData({
      studentID: studentId || "",
      category: "",
      title: "",
      description: "",
      issuedBy: "",
      dateFrom: "",
      dateTo: "",
      achievementType: "",
      teamMembers: "",
    });
    setEventPhoto(null);
    setCertificate(null);
    setEventPhotoPreview("");
    setCertificatePreview("");
    setEditingId(null);
  };

  const openFormForAdd = () => {
    resetForm();
    setView("form");
  };

  const openFormForEdit = (achievement) => {
    setEditingId(achievement._id);
    setFormData({
      studentID:
        achievement.stuID || achievementService.getStudentIdFromToken(),
      category: achievement.category || "",
      title: achievement.title || "",
      description: achievement.description || "",
      issuedBy: achievement.issuedBy || "",
      dateFrom: achievement.date?.from
        ? new Date(achievement.date.from).toISOString().split("T")[0]
        : "",
      dateTo: achievement.date?.to
        ? new Date(achievement.date.to).toISOString().split("T")[0]
        : "",
      achievementType: achievement.achievementType || "",
      teamMembers: achievement.teamMembers?.join(", ") || "",
    });

    setEventPhoto(null);
    setCertificate(null);
    if (achievement.photographs?.eventPhoto?.url) {
      setEventPhotoPreview(achievement.photographs.eventPhoto.url);
    }
    if (achievement.photographs?.certificate?.url) {
      setCertificatePreview(achievement.photographs.certificate.url);
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
      const data = new FormData();

      data.append("category", formData.category);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("issuedBy", formData.issuedBy);
      data.append("achievementType", formData.achievementType);

      data.append("date[from]", formData.dateFrom);
      data.append("date[to]", formData.dateTo);

      if (formData.teamMembers) {
        const members = formData.teamMembers.split(",").map((m) => m.trim());
        members.forEach((member, index) => {
          data.append(`teamMembers[${index}]`, member);
        });
      }

      if (eventPhoto) data.append("eventPhoto", eventPhoto);
      if (certificate) data.append("certificate", certificate);

      if (editingId) {
        await achievementService.updateAchievement(editingId, data);
        setSuccess("Achievement updated successfully!");
      } else {
        if (!eventPhoto || !certificate) {
          setError(
            "Both event photo and certificate are required for new achievements."
          );
          setFormLoading(false);
          return;
        }
        await achievementService.createAchievement(data);
        setSuccess("Achievement created successfully!");
      }

      resetForm();
      await fetchAchievements();
      setTimeout(() => setView("list"), 500);
    } catch (err) {
      console.error("Error saving achievement:", err);
      setError(
        err.response?.data?.message ||
          "Failed to save achievement. Check console for details."
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?"))
      return;
    try {
      await achievementService.deleteAchievement(id);
      setSuccess("Achievement deleted successfully!");
      fetchAchievements();
    } catch (err) {
      console.error("Error deleting achievement:", err);
      setError("Failed to delete achievement");
    }
  };

  // =============== FORM VIEW ===============
  if (view === "form") {
    return (
      <main className="p-8 bg-slate-50 min-h-screen">
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
          Back to Achievements
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {editingId ? "Edit Achievement" : "Add New Achievement"}
          </h1>
          <p className="text-slate-600 mt-1">
            {editingId
              ? "Update your achievement details"
              : "Record your accomplishments"}
          </p>
        </div>

        {/* Achievement Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8">
              {/* SECTION: Basic Information */}
              <div className="mb-10">
                <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                  Achievement Details
                </h2>

                {/* Row: Category & Title */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Coding competitions">
                        Coding Competitions
                      </option>
                      <option value="Committee">Committee</option>
                      <option value="Hackathons">Hackathons</option>
                      <option value="Sports">Sports</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Technical">Technical</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Achievement title"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your achievement..."
                    rows="4"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    required
                  />
                </div>

                {/* Issued By & Type */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Issued By <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="issuedBy"
                      value={formData.issuedBy}
                      onChange={handleChange}
                      placeholder="Organization name"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Achievement Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="achievementType"
                      value={formData.achievementType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Participation">Participation</option>
                      <option value="Winner">Winner</option>
                      <option value="Runner-up">Runner-up</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION: Dates */}
              <div className="mb-10">
                <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                  Timeline
                </h2>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Date From <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateFrom"
                      value={formData.dateFrom}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Date To <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateTo"
                      value={formData.dateTo}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Team Members
                    </label>
                    <input
                      type="text"
                      name="teamMembers"
                      value={formData.teamMembers}
                      onChange={handleChange}
                      placeholder="John, Jane, Bob..."
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: Uploads */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                  Uploads
                </h2>

                {/* Event Photo */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Event Photo{" "}
                    {!editingId && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={
                          eventPhoto
                            ? eventPhoto.name
                            : eventPhotoPreview
                            ? "Current photo uploaded"
                            : "No file chosen"
                        }
                        placeholder="Upload Photo"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 placeholder-slate-400 text-sm"
                        readOnly
                      />
                    </div>
                    <label className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer shadow-sm">
                      UPLOAD
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "eventPhoto")}
                        className="hidden"
                        required={!editingId}
                      />
                    </label>
                  </div>
                  {eventPhotoPreview && (
                    <img
                      src={eventPhotoPreview}
                      alt="Event Preview"
                      className="mt-3 w-24 h-24 object-cover rounded-lg border-2 border-blue-500"
                    />
                  )}
                </div>

                {/* Certificate */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Certificate{" "}
                    {!editingId && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={
                          certificate
                            ? certificate.name
                            : certificatePreview
                            ? "Current certificate uploaded"
                            : "No file chosen"
                        }
                        placeholder="Upload Certificate"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 placeholder-slate-400 text-sm"
                        readOnly
                      />
                    </div>
                    <label className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer shadow-sm">
                      UPLOAD
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => handleFileChange(e, "certificate")}
                        className="hidden"
                        required={!editingId}
                      />
                    </label>
                  </div>
                  {certificatePreview && (
                    <img
                      src={certificatePreview}
                      alt="Certificate Preview"
                      className="mt-3 w-24 h-24 object-cover rounded-lg border-2 border-blue-500"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 px-8 py-6 bg-slate-50 border-t border-slate-200">
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
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {formLoading
                  ? "Submitting..."
                  : editingId
                  ? "Update Achievement"
                  : "Submit Achievement"}
              </button>
            </div>
          </div>
        </form>
      </main>
    );
  }

  // =============== LIST VIEW ===============
  return (
    <main className="p-8 bg-slate-50 min-h-screen">
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Achievements</h1>
          <p className="text-slate-600 mt-1">
            Showing{" "}
            <span className="font-semibold text-blue-600">
              {achievements.length}
            </span>{" "}
            achievements
          </p>
        </div>

        {/* Add Button */}
        <button
          onClick={openFormForAdd}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          + Add Achievement
        </button>
      </div>

      {/* Cards Container */}
      <div className="min-h-[60vh]">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading achievements...</p>
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
        {!loading && !error && achievements.length === 0 && (
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
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <p className="text-slate-600 text-lg font-medium">
              No achievements yet. Click "Add Achievement" to showcase your
              accomplishments!
            </p>
          </div>
        )}

        {/* Achievements Grid */}
        {!loading && !error && achievements.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement._id}
                achievement={achievement}
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
