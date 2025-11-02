import React, { useState, useEffect } from "react";
import { internshipService } from "../services/internshipService";

// InternshipCard Component - COMPACT & BEAUTIFUL
function InternshipCard({ internship, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      {/* Image Section */}
      <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
        <img
          src={
            internship?.photoProof?.url ||
            "https://via.placeholder.com/300x200?text=Internship"
          }
          alt={internship?.companyName || "Internship"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Company Name */}
        <h3 className="text-sm font-bold text-slate-900 mb-1 line-clamp-2">
          {internship?.companyName || "N/A"}
        </h3>

        {/* Role */}
        <p className="text-xs text-slate-600 mb-2">
          <span className="font-semibold">Role:</span>{" "}
          {internship?.role || "N/A"}
        </p>

        {/* Duration & Type Badges */}
        <div className="flex gap-2 mb-2 text-xs">
          <span className="px-2 py-1 bg-blue-50 text-blue-700 font-semibold rounded-full">
            {internship?.durationMonths || "N/A"} months
          </span>
          {internship?.stipendInfo?.isPaid ? (
            <span className="px-2 py-1 bg-green-50 text-green-700 font-semibold rounded-full">
              ₹{internship.stipendInfo.stipend}/mo
            </span>
          ) : (
            <span className="px-2 py-1 bg-orange-50 text-orange-700 font-semibold rounded-full">
              Unpaid
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 mb-2 line-clamp-2">
          {internship?.description || "N/A"}
        </p>

        {/* Dates */}
        <p className="text-xs text-slate-500 mb-3">
          {internship?.startDate
            ? new Date(internship.startDate).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              })
            : "N/A"}{" "}
          -{" "}
          {internship?.endDate
            ? new Date(internship.endDate).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              })
            : "N/A"}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {internship?.photoProof?.url && (
              <a
                href={internship.photoProof.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Photo
              </a>
            )}
            {internship?.internshipReport?.url && (
              <a
                href={internship.internshipReport.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-slate-600 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors text-center"
              >
                Report
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onEdit(internship)}
              className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(internship._id)}
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
export default function StudentInternship() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // View state
  const [view, setView] = useState("list"); // "list" or "form"
  const [editingId, setEditingId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    startDate: "",
    endDate: "",
    durationMonths: "",
    isPaid: "",
    stipend: "",
    description: "",
  });

  const [photoProof, setPhotoProof] = useState(null);
  const [internshipReport, setInternshipReport] = useState(null);
  const [photoFileName, setPhotoFileName] = useState("");
  const [reportFileName, setReportFileName] = useState("");

  // Fetch internships on mount
  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const response = await internshipService.getOwnInternships();
      const data = response.data || response.internships || response;
      setInternships(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error("Error fetching internships:", err);
      setError("Failed to load internships");
      setInternships([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoProof(file);
      setPhotoFileName(file.name);
    }
  };

  const handleReportChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInternshipReport(file);
      setReportFileName(file.name);
    }
  };

  const resetForm = () => {
    setFormData({
      companyName: "",
      role: "",
      startDate: "",
      endDate: "",
      durationMonths: "",
      isPaid: "",
      stipend: "",
      description: "",
    });
    setPhotoProof(null);
    setInternshipReport(null);
    setPhotoFileName("");
    setReportFileName("");
    setEditingId(null);
  };

  const openFormForAdd = () => {
    resetForm();
    setView("form");
  };

  const openFormForEdit = (internship) => {
    setEditingId(internship._id);
    setFormData({
      companyName: internship.companyName || "",
      role: internship.role || "",
      startDate: internship.startDate
        ? new Date(internship.startDate).toISOString().split("T")[0]
        : "",
      endDate: internship.endDate
        ? new Date(internship.endDate).toISOString().split("T")[0]
        : "",
      durationMonths: internship.durationMonths || "",
      isPaid: internship.stipendInfo?.isPaid ? "paid" : "unpaid",
      stipend: internship.stipendInfo?.stipend || "",
      description: internship.description || "",
    });
    setPhotoProof(null);
    setInternshipReport(null);
    if (internship.photoProof?.url) {
      setPhotoFileName("Current photo uploaded");
    }
    if (internship.internshipReport?.url) {
      setReportFileName("Current report uploaded");
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

    if (formData.description.length < 10) {
      setError("Description must be at least 10 characters long");
      setFormLoading(false);
      return;
    }

    if (!photoProof && !editingId) {
      setError("Please upload internship photo");
      setFormLoading(false);
      return;
    }

    if (!internshipReport && !editingId) {
      setError("Please upload internship report PDF");
      setFormLoading(false);
      return;
    }

    try {
      const data = new FormData();

      data.append("companyName", formData.companyName);
      data.append("role", formData.role);
      data.append("startDate", formData.startDate);
      data.append("endDate", formData.endDate);
      data.append("durationMonths", formData.durationMonths);
      data.append("isPaid", formData.isPaid === "paid");
      if (formData.isPaid === "paid") {
        data.append("stipend", formData.stipend);
      }
      data.append("description", formData.description);

      if (photoProof) data.append("photoProof", photoProof);
      if (internshipReport) data.append("internshipReport", internshipReport);

      if (editingId) {
        await internshipService.updateInternship(editingId, data);
        setSuccess("Internship updated successfully!");
      } else {
        await internshipService.createInternship(data);
        setSuccess("Internship added successfully!");
      }

      resetForm();
      await fetchInternships();
      setTimeout(() => setView("list"), 500);
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors
          .map((e) => `${e.field}: ${e.message}`)
          .join(", ");
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || "Failed to save internship");
      }
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this internship?"))
      return;
    try {
      await internshipService.deleteInternship(id);
      setSuccess("Internship deleted successfully!");
      fetchInternships();
    } catch (err) {
      console.error("Error deleting internship:", err);
      setError("Failed to delete internship");
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
          Back to Internships
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {editingId ? "Edit Internship" : "Add New Internship"}
          </h1>
          <p className="text-slate-600 mt-1">
            {editingId
              ? "Update your internship details"
              : "Document your internship journey and achievements"}
          </p>
        </div>

        {/* Internship Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8">
              {/* SECTION: Company Information */}
              <div className="mb-10">
                <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                  Company Information
                </h2>

                {/* Company & Role */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g., Software Developer"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: Duration & Dates */}
              <div className="mb-10">
                <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                  Duration & Timeline
                </h2>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Duration (Months) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="durationMonths"
                      value={formData.durationMonths}
                      onChange={handleChange}
                      placeholder="1-12"
                      min="1"
                      max="12"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: Compensation */}
              <div className="mb-10">
                <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                  Compensation
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Stipend Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="isPaid"
                      value={formData.isPaid}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                      required
                    >
                      <option value="">Select Stipend Type</option>
                      <option value="paid">Stipend - Paid</option>
                      <option value="unpaid">Stipend - Unpaid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Stipend Amount (₹)
                    </label>
                    <input
                      type="number"
                      name="stipend"
                      value={formData.stipend}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
                      disabled={formData.isPaid !== "paid"}
                      required={formData.isPaid === "paid"}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: Description */}
              <div className="mb-10">
                <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                  Experience Details
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description <span className="text-red-500">*</span>
                    <span className="text-slate-500 font-normal ml-2">
                      (minimum 10 characters)
                    </span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your internship experience, responsibilities, and learnings..."
                    rows="4"
                    minLength={10}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    required
                  />
                  <div className="text-xs text-slate-500 mt-2">
                    {formData.description.length}/10 characters minimum
                  </div>
                </div>
              </div>

              {/* SECTION: File Uploads */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                  Documentation
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Internship Photo{" "}
                      {!editingId && <span className="text-red-500">*</span>}
                    </label>
                    <div className="flex gap-3 items-end">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={photoFileName || "No file chosen"}
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
                          onChange={handlePhotoChange}
                          className="hidden"
                          required={!editingId}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Report Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Report (PDF){" "}
                      {!editingId && <span className="text-red-500">*</span>}
                    </label>
                    <div className="flex gap-3 items-end">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={reportFileName || "No file chosen"}
                          placeholder="Upload PDF"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 placeholder-slate-400 text-sm"
                          readOnly
                        />
                      </div>
                      <label className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer shadow-sm">
                        UPLOAD
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleReportChange}
                          className="hidden"
                          required={!editingId}
                        />
                      </label>
                    </div>
                  </div>
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
                  ? "Update Internship"
                  : "Submit Internship"}
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
          <h1 className="text-3xl font-bold text-slate-900">My Internships</h1>
          <p className="text-slate-600 mt-1">
            Showing{" "}
            <span className="font-semibold text-blue-600">
              {internships.length}
            </span>{" "}
            internships
          </p>
        </div>

        {/* Add Button */}
        <button
          onClick={openFormForAdd}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          + Add Internship
        </button>
      </div>

      {/* Cards Container */}
      <div className="min-h-[60vh]">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading internships...</p>
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
        {!loading && !error && internships.length === 0 && (
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 0a2 2 0 100 4m0-4a2 2 0 110 4m0 0a9.933 9.933 0 018.828-4.3c2.765.405 5.426 1.494 7.68 3.084M9 20h12a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p className="text-slate-600 text-lg font-medium">
              No internships yet. Click "Add Internship" to document your
              experience!
            </p>
          </div>
        )}

        {/* Internships Grid */}
        {!loading && !error && internships.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {internships.map((internship) => (
              <InternshipCard
                key={internship._id}
                internship={internship}
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
