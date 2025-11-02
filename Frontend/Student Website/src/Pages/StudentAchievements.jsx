import React, { useState, useEffect } from "react";
import { achievementService } from "../services/achievementService";

export default function StudentAchievements() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const studentId = achievementService.getStudentIdFromToken();
      if (!studentId) return;

      const data = await achievementService.getAchievementsByStu(studentId);
      setAchievements(data);

      setFormData((prev) => ({ ...prev, studentID: studentId }));

      if (data.length > 0) {
        loadAchievementIntoForm(data[0]);
      }
    } catch (err) {
      console.error("Error fetching achievements:", err);
    }
  };

  const loadAchievementIntoForm = (achievement) => {
    setCurrentAchievement(achievement);
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

  const handleEdit = () => {
    setIsEditMode(true);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

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

      if (currentAchievement) {
        await achievementService.updateAchievement(
          currentAchievement._id,
          data
        );
        setSuccess("Achievement updated successfully!");
      } else {
        if (!eventPhoto || !certificate) {
          setError(
            "Both event photo and certificate are required for new achievements."
          );
          setLoading(false);
          return;
        }
        await achievementService.createAchievement(data);
        setSuccess("Achievement created successfully!");
      }

      setIsEditMode(false);
      fetchAchievements();
    } catch (err) {
      console.error("Error saving achievement:", err);
      setError(
        err.response?.data?.message ||
          "Failed to save achievement. Check console for details."
      );
    } finally {
      setLoading(false);
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
    setCurrentAchievement(null);
    setIsEditMode(true);
    setError("");
    setSuccess("");
  };

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
          <h1 className="text-3xl font-bold text-slate-900">Achievements</h1>
          <p className="text-slate-600 mt-1">
            Manage and showcase your accomplishments
          </p>
        </div>

        {!isEditMode && (
          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="px-6 py-2.5 bg-slate-600 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors shadow-sm"
            >
              Edit
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Add New
            </button>
          </div>
        )}
      </div>

      {/* Achievement Selection */}
      {achievements.length > 0 && !isEditMode && (
        <div className="mb-8 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Select Achievement to View/Edit
          </label>
          <select
            onChange={(e) => {
              const selected = achievements.find(
                (a) => a._id === e.target.value
              );
              if (selected) loadAchievementIntoForm(selected);
            }}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
            value={currentAchievement?._id || ""}
          >
            {achievements.map((ach) => (
              <option key={ach._id} value={ach._id}>
                {ach.title} - {ach.category}
              </option>
            ))}
          </select>
        </div>
      )}

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
                    Category
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed appearance-none"
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
                    Title
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    placeholder="Achievement title"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
                    required
                  />
                </div>
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
                  disabled={!isEditMode}
                  placeholder="Describe your achievement..."
                  rows="4"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed resize-none"
                  required
                />
              </div>

              {/* Issued By & Type */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Issued By
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="issuedBy"
                    value={formData.issuedBy}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    placeholder="Organization name"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Achievement Type
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="achievementType"
                    value={formData.achievementType}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed appearance-none"
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
                    Date From
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateFrom"
                    value={formData.dateFrom}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Date To
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateTo"
                    value={formData.dateTo}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
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
                    disabled={!isEditMode}
                    placeholder="John, Jane, Bob..."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
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
                  Event Photo
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
                  <label
                    className={`px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg transition cursor-pointer shadow-sm ${
                      !isEditMode
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    }`}
                  >
                    UPLOAD
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "eventPhoto")}
                      disabled={!isEditMode}
                      className="hidden"
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
                  Certificate
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
                  <label
                    className={`px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg transition cursor-pointer shadow-sm ${
                      !isEditMode
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    }`}
                  >
                    UPLOAD
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileChange(e, "certificate")}
                      disabled={!isEditMode}
                      className="hidden"
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

          {/* Form Actions */}
          {isEditMode && (
            <div className="flex justify-end gap-4 px-8 py-6 bg-slate-50 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(false);
                  if (achievements.length > 0) {
                    loadAchievementIntoForm(achievements[0]);
                  }
                  setError("");
                  setSuccess("");
                }}
                className="px-6 py-2.5 rounded-lg bg-slate-300 text-slate-900 text-sm font-semibold hover:bg-slate-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
