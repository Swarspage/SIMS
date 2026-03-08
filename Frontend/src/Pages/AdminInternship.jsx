import React, { useState, useEffect } from "react";
import { internshipService } from "../services/internshipService";
import { toast } from "react-toastify";
import Pagination from "../Components/Common/Pagination";

// InternshipCard Component - COMPACT & BEAUTIFUL
function InternshipCard({ internship, onView, onDelete, onEdit }) {
  const isPaid = internship?.stipendInfo?.isPaid ?? internship?.isPaid;
  const stipend = internship?.stipendInfo?.stipend ?? internship?.stipend;

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      {/* Document/Image Preview Section */}
      <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden relative">
        {internship?.internshipReport?.url ? (
          <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-300">
            <iframe
              src={`${internship.internshipReport.url}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
              title="PDF Preview"
              className="w-full h-full border-none pointer-events-none"
              scrolling="no"
              tabIndex="-1"
            />
            <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
              <span className="bg-black/50 text-white text-xs px-2 py-1 rounded shadow backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">PDF Preview</span>
            </div>
          </div>
        ) : internship?.photoProof?.url ? (
          <img
            src={internship.photoProof.url}
            alt={internship?.companyName || "Internship"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-slate-300 text-5xl font-bold">
            {internship?.companyName?.charAt(0) || "?"}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Company Name */}
        <h3 className="text-sm font-bold text-slate-900 mb-1 line-clamp-1">
          {internship?.companyName || "N/A"}
        </h3>

        {/* Role */}
        <p className="text-xs text-slate-600 mb-2 line-clamp-1 italic">
          {internship?.role || "Role not specified"}
        </p>

        {/* Badges Row: Duration + Paid status */}
        <div className="flex flex-wrap gap-2 mb-2 text-xs">
          <span className="px-2 py-1 bg-slate-100 text-slate-700 font-semibold rounded-full">
            {internship?.durationMonths ? `${internship.durationMonths} mo` : "N/A"}
          </span>
          {isPaid ? (
            <span className="px-2 py-1 bg-green-50 text-green-700 font-semibold rounded-full">
              Paid {stipend ? `₹${stipend}/mo` : ""}
            </span>
          ) : (
            <span className="px-2 py-1 bg-amber-50 text-amber-700 font-semibold rounded-full">
              Unpaid
            </span>
          )}
        </div>

        {/* Dates */}
        <p className="text-xs text-slate-500 mb-3">
          {internship?.startDate
            ? new Date(internship.startDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
            : "N/A"}{" – "}
          {internship?.endDate
            ? new Date(internship.endDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
            : "N/A"}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto space-y-2">
          <button
            onClick={() => onView && onView(internship)}
            className="w-full px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>

          <div className="flex gap-2 w-full mt-2">
            <button
              onClick={() => onEdit && onEdit(internship)}
              className="flex-1 px-3 py-2 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg hover:bg-amber-100 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete && onDelete(internship._id)}
              className="flex-1 px-3 py-2 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Detail View Modal Component
function DetailModal({ internship, onClose }) {
  if (!internship) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Internship Details</h2>
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
              <div className="w-full sm:w-32 h-32 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                <img
                  src={internship.photoProof?.url || "https://via.placeholder.com/150?text=No+Image"}
                  alt="Proof"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Basic Details */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{internship.companyName}</h3>
                <p className="text-sm text-slate-500">
                  {typeof internship?.stuID === "string" ? internship.stuID : internship?.stuID?.studentID || "Student ID N/A"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                  {internship.internshipType}
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100">
                  {internship.durationMonths} Months
                </span>
                {internship.stipendInfo?.isPaid && (
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
                    Paid: ₹{internship.stipendInfo.stipend}/mo
                  </span>
                )}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Grid Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Start Date</p>
              <p className="text-sm font-medium text-slate-800">
                {internship.startDate ? new Date(internship.startDate).toLocaleDateString('en-IN', { dateStyle: 'long' }) : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">End Date</p>
              <p className="text-sm font-medium text-slate-800">
                {internship.endDate ? new Date(internship.endDate).toLocaleDateString('en-IN', { dateStyle: 'long' }) : 'N/A'}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Company Address</p>
              <p className="text-sm font-medium text-slate-800">
                {internship.companyAddress || 'N/A'}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">HR Email</p>
              <p className="text-sm font-medium text-slate-800">
                {internship.hrEmail || 'N/A'}
              </p>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Attached Documents</h4>
            <div className="flex flex-wrap gap-3">
              {internship.internshipReport?.url ? (
                <a
                  href={internship.internshipReport.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Internship Report
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">No report uploaded</span>
              )}

              {internship.photoProof?.url && (
                <a
                  href={internship.photoProof.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  View Photo Proof
                </a>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            {(searchQuery || filterYear || filterDivision || filterIsPaid || startDateFrom || startDateTo || endDateFrom || endDateTo) && (
              <button
                onClick={() => {
                  setSearchQuery(""); setFilterYear(""); setFilterDivision(""); setFilterIsPaid("");
                  setStartDateFrom(""); setStartDateTo(""); setEndDateFrom(""); setEndDateTo("");
                }}
                className="px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                Clear All Filters
              </button>
            )}
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
function InternshipFormModal({ isOpen, onClose, internship, onSave }) {
  const [formData, setFormData] = useState({
    studentId: "",
    companyName: "",
    role: "",
    durationMonths: "",
    startDate: "",
    endDate: "",
    isPaid: "false", // We'll keep it as string for the radio/select binding easily
    stipend: "",
    description: "",
  });

  const [files, setFiles] = useState({
    internshipReport: null,
    photoProof: null,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (internship) {
        setFormData({
          studentId: typeof internship.stuID === "string" ? internship.stuID : internship.stuID?.studentID || "",
          companyName: internship.companyName || "",
          role: internship.role || "",
          durationMonths: internship.durationMonths || "",
          startDate: internship.startDate ? new Date(internship.startDate).toISOString().split('T')[0] : "",
          endDate: internship.endDate ? new Date(internship.endDate).toISOString().split('T')[0] : "",
          isPaid: internship.stipendInfo?.isPaid ? "true" : "false",
          stipend: internship.stipendInfo?.stipend || "",
          description: internship.description || "",
        });
      } else {
        setFormData({
          studentId: "",
          companyName: "",
          role: "",
          durationMonths: "",
          startDate: "",
          endDate: "",
          isPaid: "false",
          stipend: "",
          description: "",
        });
      }
      setFiles({
        internshipReport: null,
        photoProof: null,
      });
    }
  }, [isOpen, internship]);

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
      if (!internship) data.append('studentId', formData.studentId);
      data.append('companyName', formData.companyName);
      data.append('role', formData.role);
      data.append('durationMonths', formData.durationMonths);
      data.append('startDate', formData.startDate);
      data.append('endDate', formData.endDate);
      data.append('isPaid', formData.isPaid);
      if (formData.isPaid === "true" && formData.stipend) {
        data.append('stipend', formData.stipend);
      }
      data.append('description', formData.description);

      // Append files if selected
      if (files.internshipReport) data.append('internshipReport', files.internshipReport);
      if (files.photoProof) data.append('photoProof', files.photoProof);

      if (internship) {
        await internshipService.updateInternship(internship._id, data);
        toast.success("Internship updated successfully!");
      } else {
        await internshipService.createInternship(data);
        toast.success("Internship added successfully!");
      }
      onSave();
      onClose();
    } catch (err) {
      console.error("Error saving internship:", err);
      toast.error(err.response?.data?.message || err.response?.data?.errors?.[0]?.message || "Failed to save internship.");
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
            {internship ? "Edit Internship" : "Add New Internship"}
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
                name="studentId"
                required={!internship}
                value={formData.studentId}
                onChange={handleChange}
                placeholder="e.g. 2024COMP123"
                disabled={!!internship} // Prevent editing student ID if updating
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-500"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Company Name *</label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Role/Position *</label>
              <input
                type="text"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Duration (Months) *</label>
              <input
                type="number"
                name="durationMonths"
                required
                min="1"
                max="6"
                value={formData.durationMonths}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  required
                  max={new Date().toISOString().split('T')[0]} // Not in future visually
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  required
                  max={new Date().toISOString().split('T')[0]}
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Paid Status & Stipend */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Paid / Unpaid *</label>
              <select
                name="isPaid"
                value={formData.isPaid}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="false">Unpaid</option>
                <option value="true">Paid</option>
              </select>
            </div>

            {formData.isPaid === "true" && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Stipend Amount (per month) *</label>
                <input
                  type="number"
                  name="stipend"
                  required
                  min="1"
                  value={formData.stipend}
                  onChange={handleChange}
                  placeholder="₹"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description *</label>
              <textarea
                name="description"
                required
                minLength="10"
                maxLength="300"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Internship Report */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Internship Report (PDF) {!internship && "*"}
              </label>
              <input
                type="file"
                name="internshipReport"
                accept=".pdf"
                required={!internship}
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Photo Proof */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Photo Proof (Image) {!internship && "*"}
              </label>
              <input
                type="file"
                name="photoProof"
                accept="image/jpeg, image/png, image/jpg"
                required={!internship}
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
                "Save Internship"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Admin Internships Page Component
export default function AdminInternship() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Modal State
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [internshipToEdit, setInternshipToEdit] = useState(null);

  // ── Filter states ──────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterDivision, setFilterDivision] = useState("");
  const [filterIsPaid, setFilterIsPaid] = useState("");
  const [startDateFrom, setStartDateFrom] = useState("");
  const [startDateTo, setStartDateTo] = useState("");
  const [endDateFrom, setEndDateFrom] = useState("");
  const [endDateTo, setEndDateTo] = useState("");

  // Initial fetch on mount or pagination change
  useEffect(() => {
    fetchInternships(currentPage);
  }, [currentPage, limit]);

  const fetchInternships = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        search: searchQuery || undefined,
        year: filterYear || undefined,
        division: filterDivision || undefined,
        isPaid: filterIsPaid || undefined,
        startDateFrom: startDateFrom || undefined,
        startDateTo: startDateTo || undefined,
        endDateFrom: endDateFrom || undefined,
        endDateTo: endDateTo || undefined,
      };
      const response = await internshipService.getAllInternships(params);
      
      const data = response.data || [];
      const total = response.total || 0;
      const totalP = response.totalPages || 1;

      setInternships(data);
      setTotalRecords(total);
      setTotalPages(totalP);
      if (page === 1) setCurrentPage(1);
      setError(null);
    } catch (err) {
      console.error("Error fetching internships:", err);
      setError("Failed to load internships. Backend might not be running!");
      setInternships([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const params = {
        search: searchQuery || undefined,
        year: filterYear || undefined,
        division: filterDivision || undefined,
        isPaid: filterIsPaid || undefined,
        startDateFrom: startDateFrom || undefined,
        startDateTo: startDateTo || undefined,
        endDateFrom: endDateFrom || undefined,
        endDateTo: endDateTo || undefined,
      };
      const blob = await internshipService.exportInternships(params);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Internships_Export_${new Date().toLocaleDateString("en-IN")}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("Error exporting internships:", err);
      toast.error("Failed to export internships. Please try again.");
    }
  };


  const handleView = (internship) => {
    setSelectedInternship(internship);
  };

  const handleCloseModal = () => {
    setSelectedInternship(null);
  };

  const handleEdit = (internship) => {
    setInternshipToEdit(internship);
    setIsFormModalOpen(true);
  };

  const handleAddInternship = () => {
    setInternshipToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this internship?"))
      return;
    try {
      await internshipService.deleteInternship(id);
      fetchInternships(currentPage);
      toast.success("Internship deleted successfully!");
    } catch (err) {
      console.error("Error deleting internship:", err);
      toast.error("Failed to delete internship.");
    }
  };

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Internships</h1>
        <p className="text-slate-600 mt-2">
          <span className="font-semibold text-blue-600">{totalRecords}</span> internships loaded
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">

        {/* Row 1 — Search + Export */}
        <div className="flex flex-wrap gap-4 items-center mb-5">
          <input
            type="text"
            placeholder="Search by company, student ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white flex-1 min-w-[240px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <div className="flex gap-3 ml-auto flex-wrap">
            <button
               onClick={() => fetchInternships(1)}
               className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Internships
            </button>
            <button
              onClick={handleAddInternship}
              className="px-5 py-2.5 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors shadow-sm">
              + Add Internship
            </button>
            <button onClick={handleExport}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Row 2 — Advanced filters */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Advanced Filters</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

            <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}
              className="px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
              <option value="">Year (All)</option>
              <option value="SE">SE</option>
              <option value="TE">TE</option>
              <option value="BE">BE</option>
            </select>

            <select value={filterDivision} onChange={(e) => setFilterDivision(e.target.value)}
              className="px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
              <option value="">Division (All)</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>

            <select value={filterIsPaid} onChange={(e) => setFilterIsPaid(e.target.value)}
              className="px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
              <option value="">Paid Status (All)</option>
              <option value="true">Paid ✓</option>
              <option value="false">Unpaid ✗</option>
            </select>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 font-medium">Start Date From</label>
              <input type="date" value={startDateFrom} onChange={(e) => setStartDateFrom(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 font-medium">Start Date To</label>
              <input type="date" value={startDateTo} onChange={(e) => setStartDateTo(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 font-medium">End Date From</label>
              <input type="date" value={endDateFrom} onChange={(e) => setEndDateFrom(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 font-medium">End Date To</label>
              <input type="date" value={endDateTo} onChange={(e) => setEndDateTo(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

          </div>

          {(filterYear || filterDivision || filterIsPaid || startDateFrom || startDateTo || endDateFrom || endDateTo) && (
            <div className="mt-3">
              <button
                onClick={() => {
                  setFilterYear(""); setFilterDivision(""); setFilterIsPaid("");
                  setStartDateFrom(""); setStartDateTo(""); setEndDateFrom(""); setEndDateTo("");
                }}
                className="px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            </div>
          )}
        </div>
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
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 6.253v13m0-13C6.228 6.228 2 10.228 2 15s4.228 8.772 10 8.772 10-4.228 10-8.772c0-4.772-4.228-8.747-10-8.747z" />
            </svg>
            <p className="text-slate-600 text-lg font-medium">
              {searchQuery || filterYear || filterDivision || filterIsPaid
                ? "No internships match your filters."
                : "No internships found yet."}
            </p>
          </div>
        )}

        {!loading && !error && internships.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {internships.map((internship) => (
              <InternshipCard
                key={internship?._id}
                internship={internship}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Pagination Component */}
        {!loading && !error && internships.length > 0 && (
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
      {selectedInternship && (
        <DetailModal
          internship={selectedInternship}
          onClose={handleCloseModal}
        />
      )}

      {/* Form Modal (Add / Edit) */}
      <InternshipFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        internship={internshipToEdit}
        onSave={() => fetchInternships(currentPage)}
      />
    </main>
  );
}
