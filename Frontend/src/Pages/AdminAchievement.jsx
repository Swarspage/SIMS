import React, { useState, useEffect } from "react";
import { achievementService } from "../services/achievementService";
import { toast } from "react-toastify";
import Pagination from "../Components/Common/Pagination";

// Achievement Card Component - COMPACT & BEAUTIFUL
function AchievementCard({ achievement, onView, onDelete, onEdit }) {
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
        {/* Student ID */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 hidden">
          {typeof achievement?.stuID === "string"
            ? achievement.stuID
            : achievement?.stuID?.studentID || "N/A"}
        </p>

        {/* Title */}
        <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2">
          {achievement?.title || "No Title"}
        </h3>

        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
            {achievement?.category || "N/A"}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 mb-2 line-clamp-2">
          {achievement?.description || "No description"}
        </p>

        {/* Achievement Type */}
        {achievement?.achievementType && (
          <p className="text-xs font-medium text-green-600 mb-2">
            {achievement.achievementType === "Winner" && "🏆 "}
            {achievement.achievementType === "Runner-up" && "🥈 "}
            {achievement.achievementType}
          </p>
        )}

        {/* Date */}
        <p className="text-xs text-slate-500 mb-3">
          {achievement?.date?.from
            ? new Date(achievement.date.from).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
            })
            : achievement?.createdAt
              ? new Date(achievement.createdAt).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              })
              : "No Date"}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={() => onView && onView(achievement)}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => onEdit && onEdit(achievement)}
            className="flex-1 px-3 py-2 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg hover:bg-amber-100 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete && onDelete(achievement._id)}
            className="flex-1 px-3 py-2 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Detail View Modal Component
function DetailModal({ achievement, onClose }) {
  if (!achievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Achievement Details</h2>
            <p className="text-xs text-slate-500 mt-0.5">ID: {achievement._id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">

          {/* Main Info Section */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Image */}
            <div className="flex-shrink-0">
              <div className="w-full sm:w-32 h-32 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center">
                <img
                  src={achievement.photographs?.eventPhoto?.url || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt="Proof"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Basic Details */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{achievement.title}</h3>
                <p className="text-sm text-slate-500">
                  {typeof achievement?.stuID === "string" ? achievement.stuID : achievement?.stuID?.studentID || "Student ID N/A"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                  {achievement.category}
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100">
                  {achievement.achievementType}
                </span>
                {achievement.level && (
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
                    {achievement.level} Level
                  </span>
                )}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Grid Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Date</p>
              <p className="text-sm font-medium text-slate-800">
                {achievement?.date?.from
                  ? new Date(achievement.date.from).toLocaleDateString("en-IN", { dateStyle: 'long' })
                  : "N/A"
                }
                {achievement?.date?.to && ` - ${new Date(achievement.date.to).toLocaleDateString("en-IN", { dateStyle: 'long' })}`}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Rank/Position</p>
              <p className="text-sm font-medium text-slate-800">
                {achievement.rank || 'N/A'}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Organizing Body</p>
              <p className="text-sm font-medium text-slate-800">
                {achievement.org || 'N/A'}
              </p>
            </div>

            {achievement.description && (
              <div className="sm:col-span-2">
                <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Description</p>
                <p className="text-sm font-medium text-slate-800">{achievement.description}</p>
              </div>
            )}
          </div>

          {/* Documents Section */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Attached Documents</h4>
            <div className="flex flex-wrap gap-3">
              {achievement.certificateURL?.url ? (
                <a
                  href={achievement.certificateURL.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Certificate
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">No certificate uploaded</span>
              )}

              {achievement.photographs?.eventPhoto?.url && (
                <a
                  href={achievement.photographs.eventPhoto.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  View Photo
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Form Modal Component (Add / Edit)
function AchievementFormModal({ isOpen, onClose, achievement, onSave }) {
  const [formData, setFormData] = useState({
    stuID: "",
    title: "",
    category: "Coding competitions",
    achievementType: "Participation",
    level: "",
    rank: "",
    org: "",
    dateFrom: "",
    dateTo: "",
    description: "",
  });

  const [files, setFiles] = useState({
    eventPhoto: null,
    certificate: null,
    course_certificate: null,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (achievement) {
        setFormData({
          stuID: typeof achievement.stuID === "string" ? achievement.stuID : achievement.stuID?.studentID || "",
          title: achievement.title || "",
          category: achievement.category || "Coding competitions",
          achievementType: achievement.achievementType || "Participation",
          level: achievement.level || "",
          rank: achievement.rank || "",
          org: achievement.org || "",
          dateFrom: achievement.date?.from ? new Date(achievement.date.from).toISOString().split('T')[0] : "",
          dateTo: achievement.date?.to ? new Date(achievement.date.to).toISOString().split('T')[0] : "",
          description: achievement.description || "",
        });
      } else {
        setFormData({
          stuID: "",
          title: "",
          category: "Coding competitions",
          achievementType: "Participation",
          level: "",
          rank: "",
          org: "",
          dateFrom: "",
          dateTo: "",
          description: "",
        });
      }
      setFiles({
        eventPhoto: null,
        certificate: null,
        course_certificate: null,
      });
    }
  }, [isOpen, achievement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();

      // Append form fields
      data.append('stuID', formData.stuID);
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('achievementType', formData.achievementType);
      if (formData.level) data.append('level', formData.level);
      if (formData.rank) data.append('rank', formData.rank);
      if (formData.org) data.append('org', formData.org);
      if (formData.description) data.append('description', formData.description);

      // Date object restructuring based on backend validation logic
      data.append('date[from]', formData.dateFrom);
      if (formData.dateTo) data.append('date[to]', formData.dateTo);

      // Append files
      if (files.eventPhoto) data.append('eventPhoto', files.eventPhoto);
      if (files.certificate) data.append('certificate', files.certificate);
      if (files.course_certificate) data.append('course_certificate', files.course_certificate);

      if (achievement) {
        await achievementService.updateAchievement(achievement._id, data);
        toast.success("Achievement updated successfully!");
      } else {
        await achievementService.createAchievement(data);
        toast.success("Achievement added successfully!");
      }
      onSave(); // Refresh list
      onClose(); // Close modal
    } catch (err) {
      console.error("Error saving achievement:", err);
      toast.error(err.response?.data?.message || "Failed to save achievement.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="sticky top-0 z-10 p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">
            {achievement ? "Edit Achievement" : "Add New Achievement"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Student ID */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Student ID *</label>
              <input
                type="text"
                name="stuID"
                required
                value={formData.stuID}
                onChange={handleChange}
                placeholder="e.g. 2024COMP123"
                disabled={!!achievement} // Prevent editing student ID if updating
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-500"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Coding competitions">Coding Competitions</option>
                <option value="Committee">Committee</option>
                <option value="Hackathons">Hackathons</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
                <option value="Technical">Technical</option>
                <option value="Research Papers">Research Papers</option>
                <option value="MOOCs">MOOCs</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Achievement Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Type *</label>
              <select
                name="achievementType"
                value={formData.achievementType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Winner">Winner</option>
                <option value="Runner-up">Runner-up</option>
                <option value="Participation">Participation</option>
                <option value="Completed">Completed</option>
                <option value="Published">Published</option>
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Level</option>
                <option value="Department">Department</option>
                <option value="College">College</option>
                <option value="State">State</option>
                <option value="National">National</option>
                <option value="International">International</option>
              </select>
            </div>

            {/* Rank */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Rank/Position</label>
              <input
                type="text"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                placeholder="e.g. 1st, 2nd, Top 10"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Organizing Body */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Organizing Body</label>
              <input
                type="text"
                name="org"
                value={formData.org}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date (From) *</label>
                <input
                  type="date"
                  name="dateFrom"
                  required
                  value={formData.dateFrom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date (To)</label>
                <input
                  type="date"
                  name="dateTo"
                  value={formData.dateTo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Event Photo */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Event Photo (Optional)
              </label>
              <input
                type="file"
                name="eventPhoto"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Certificate */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Event Certificate (Optional)
              </label>
              <input
                type="file"
                name="certificate"
                accept=".pdf, image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Course Certificate */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Course Certificate (For MOOCs/Courses)
              </label>
              <input
                type="file"
                name="course_certificate"
                accept=".pdf, image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

          </div>

          <div className="pt-6 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 focus:ring-2 focus:ring-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                "Save Achievement"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Admin Achievements Page Component
export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");

  // Applied Filters State (Snapshot for WYSIWYG)
  const [appliedFilters, setAppliedFilters] = useState({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Modal State
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [achievementToEdit, setAchievementToEdit] = useState(null);

  // Fetch achievements from backend when component loads or pagination changes
  useEffect(() => {
    fetchAchievements(currentPage);
  }, [currentPage, limit, appliedFilters]);

  const fetchAchievements = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        ...appliedFilters
      };
      const response = await achievementService.getAllAchievements(params);
      
      const data = response.data || [];
      const total = response.total || 0;
      const totalP = response.totalPages || 1;

      setAchievements(data);
      setTotalRecords(total);
      setTotalPages(totalP);
      if (page === 1) setCurrentPage(1);
      setError(null);
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setError("Failed to load achievements. Backend might not be running!");
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const params = {
        ...appliedFilters
      };

      const blob = await achievementService.exportAchievements(params);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Achievements_Export_${new Date().toLocaleDateString("en-IN")}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("Error exporting achievements:", err);
      toast.error("Failed to export achievements. Please try again.");
    }
  };

  const handleView = (achievement) => {
    setSelectedAchievement(achievement);
  };

  const handleCloseModal = () => {
    setSelectedAchievement(null);
  };

  const handleEdit = (achievement) => {
    setAchievementToEdit(achievement);
    setIsFormModalOpen(true);
  };

  const handleAddAchievement = () => {
    setAchievementToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?"))
      return;
    try {
      await achievementService.deleteAchievement(id);
      fetchAchievements(currentPage);
      toast.success("Achievement deleted successfully!");
    } catch (err) {
      console.error("Error deleting achievement:", err);
      toast.error("Failed to delete achievement.");
    }
  };

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Manage Achievements
        </h1>
        <p className="text-slate-600 mt-2">
          Showing{" "}
          <span className="font-semibold text-blue-600">
            {totalRecords}
          </span>{" "}
          achievements
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[250px]">
            <input
              type="text"
              placeholder="e.g. Hackathon Winner, 2024COMP123, Smart India"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <p className="text-[11px] text-slate-500 mt-1.5 ml-1">
              <span className="font-semibold text-blue-600">Tip:</span> Search by Achievement Title, Student ID, or Description keyword.
            </p>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
          >
            <option value="">All Categories</option>
            <option value="Coding competitions">Coding Competitions</option>
            <option value="Committee">Committee</option>
            <option value="Hackathons">Hackathons</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Technical">Technical</option>
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
          >
            <option value="">All Types</option>
            <option value="Winner">🏆 Winner</option>
            <option value="Runner-up">🥈 Runner-up</option>
            <option value="Participation">Participation</option>
          </select>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
          >
            <option value="">All Years</option>
            <option value="FE">First Year (FE)</option>
            <option value="SE">Second Year (SE)</option>
            <option value="TE">Third Year (TE)</option>
            <option value="BE">Final Year (BE)</option>
          </select>

          {/* Division Filter */}
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
          >
            <option value="">All Divs</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="flex gap-3">
            <button
              onClick={() => {
                setAppliedFilters({
                  search: searchQuery || undefined,
                  category: selectedCategory || undefined,
                  type: selectedType || undefined,
                  year: selectedYear || undefined,
                  division: selectedDivision || undefined,
                });
                setCurrentPage(1);
              }}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Achievements
            </button>

            {(searchQuery || selectedCategory || selectedType || selectedYear || selectedDivision) && (
              <button
                onClick={() => {
                  setSearchQuery(""); setSelectedCategory(""); setSelectedType("");
                  setSelectedYear(""); setSelectedDivision("");
                }}
                className="px-4 py-2.5 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                Clear All
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition shadow-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Export
            </button>
            <button
              onClick={() => { setAchievementToEdit(null); setIsFormModalOpen(true); }}
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm transition flex items-center gap-2"
            >
              <span>+ Add Achievement</span>
            </button>
          </div>
        </div>
      </div>

      {/* Achievements Container */}
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-slate-600 text-lg font-medium">
              {searchQuery || selectedCategory || selectedType
                ? "No achievements match your filters."
                : "No achievements found yet."}
            </p>
          </div>
        )}

        {/* Achievements Grid - 4 columns for compact cards */}
        {!loading && !error && achievements.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement?._id}
                achievement={achievement}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Pagination Component */}
        {!loading && !error && achievements.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={totalRecords}
            limit={limit}
            onPageChange={(page) => setCurrentPage(page)}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setCurrentPage(1);
            }}
          />
        )}
      </div>

      {/* Detail Modal */}
      {selectedAchievement && (
        <DetailModal
          achievement={selectedAchievement}
          onClose={handleCloseModal}
        />
      )}

      {/* Form Modal (Add / Edit) */}
      <AchievementFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        achievement={achievementToEdit}
        onSave={() => fetchAchievements(currentPage)}
      />
    </main>
  );
}
