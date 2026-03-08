import React, { useState, useEffect } from "react";
import { admissionService } from "../services/admissionService";
import { toast, Toaster } from "react-hot-toast";
import Pagination from "../Components/Common/Pagination";

// ==================== COMPONENTS ====================

function AdmissionCard({ admission, onView, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  // Safe Data Extraction
  const studentId =
    typeof admission?.stuID === "string"
      ? admission.stuID
      : admission?.stuID?.studentID || "N/A";

  const studentName =
    typeof admission?.stuID === "object" && admission.stuID?.name
      ? typeof admission.stuID.name === "object"
        ? `${admission.stuID.name.firstName || ""} ${admission.stuID.name.lastName || ""
          }`.trim() || "Student"
        : admission.stuID.name
      : "Student";

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full group">
      {/* Card Header */}
      <div className="h-28 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="text-center z-10 text-white">
          <p className="text-xs font-medium uppercase tracking-wider opacity-80 mb-1">
            {studentId}
          </p>
          <h3 className="text-lg font-bold line-clamp-1">
            {studentName}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded-full border ${getStatusColor(admission?.status)}`}>
            {admission?.status || "Pending"}
          </span>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
            {admission?.academicYear || "N/A"}
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Course</span>
            <span className="font-semibold text-slate-900 truncate max-w-[120px]">{admission?.course || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Fees</span>
            <span className="font-semibold text-slate-900">₹{admission?.fees?.toLocaleString() || "0"}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto grid grid-cols-3 gap-2">
          <button
            onClick={() => onView && onView(admission)}
            className="px-3 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => onEdit && onEdit(admission)}
            className="px-3 py-2 bg-amber-50 text-amber-600 text-xs font-bold rounded-lg hover:bg-amber-100 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete && onDelete(admission._id)}
            className="px-3 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailModal({ admission, onClose }) {
  if (!admission) return null;

  // Safe Data Extraction
  const student = admission.stuID || {};
  const studentName = typeof student.name === "object"
    ? `${student.name.firstName || ""} ${student.name.lastName || ""}`.trim()
    : student.name || "Student";
  const studentId = student.studentID || student._id || "N/A";
  const year = admission.year || student.year || "N/A";
  const div = admission.div || student.division || "N/A";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Admission Details</h2>
            <p className="text-xs text-slate-500 mt-0.5">ID: {admission._id}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">

          {/* Main Info Section */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Image Placeholder - Since Admission doesn't have a specific image, using Student Initials or Icon */}
            <div className="flex-shrink-0">
              <div className="w-full sm:w-32 h-32 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden border border-slate-200 flex items-center justify-center text-white text-4xl font-bold shadow-md">
                {studentName.charAt(0)}
              </div>
            </div>

            {/* Basic Details */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{studentName}</h3>
                <p className="text-sm text-slate-500 font-medium">
                  {studentId}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${admission.status === 'approved' ? 'bg-green-50 text-green-700 border-green-100' : admission.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                  {admission.status || "Pending"}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full border border-slate-200">
                  {admission.academicYear || "N/A"}
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                  {admission.course || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Roll Number</p>
              <p className="text-sm font-medium text-slate-800">{admission.rollno || 'Not Assigned'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Year & Division</p>
              <p className="text-sm font-medium text-slate-800">{year} - {div}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Admission Date</p>
              <p className="text-sm font-medium text-slate-800">
                {admission.admissionDate ? new Date(admission.admissionDate).toLocaleDateString('en-IN', { dateStyle: 'long' }) : 'N/A'}
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Financial Section (Styled like Description box) */}
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">Financial Information</p>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Total Fees</span>
                <span className="text-base font-bold text-slate-900">₹{admission.fees?.toLocaleString() || "0"}</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200 pt-2">
                <span className="text-sm text-slate-600">Payment Status</span>
                <span className={`text-sm font-bold ${admission.isFeesPaid ? 'text-green-600' : 'text-amber-600'}`}>
                  {admission.isFeesPaid ? 'Paid' : 'Pending'}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200 pt-2">
                <span className="text-sm text-slate-600">Scholarship</span>
                <span className={`text-sm font-bold ${admission.isScholarshipApplied ? 'text-blue-600' : 'text-slate-500'}`}>
                  {admission.isScholarshipApplied ? 'Applied' : 'None'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function EditModal({ admission, onClose, onSave }) {
  const [formData, setFormData] = useState({
    rollno: admission?.rollno || "",
    course: admission?.course || "",
    fees: admission?.fees || "",
    isScholarshipApplied: admission?.isScholarshipApplied || false,
  });
  const [loading, setLoading] = useState(false);

  if (!admission) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(admission._id, formData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Edit Admission</h2>
            <p className="text-amber-100 text-xs mt-0.5">ID: {admission._id}</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Roll Number</label>
              <input
                type="text"
                name="rollno"
                value={formData.rollno}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter roll number"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter course name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Fees Amount (₹)</label>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter fees amount"
                min="0"
                required
              />
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <input
                type="checkbox"
                name="isScholarshipApplied"
                id="scholarship"
                checked={formData.isScholarshipApplied}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="scholarship" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
                Scholarship Applied
              </label>
            </div>

            <div className="bg-yellow-50 text-yellow-800 text-xs p-3 rounded-lg flex gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
              <span>Payment status cannot be edited here.</span>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors shadow-sm text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors shadow-sm text-sm disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==================== MAIN PAGE ====================

export default function AdminAdmission() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [academicYearFilter, setAcademicYearFilter] = useState("");
  const [feesPaidFilter, setFeesPaidFilter] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [selectedAdmission, setSelectedAdmission] = useState(null); // For View
  const [editingAdmission, setEditingAdmission] = useState(null); // For Edit

  useEffect(() => {
    fetchAdmissions(currentPage);
  }, [currentPage, limit]);

  const fetchAdmissions = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        search: searchQuery || undefined,
        status: statusFilter || undefined,
        year: yearFilter || undefined,
        academicYear: academicYearFilter || undefined,
        filterPaid: feesPaidFilter || undefined,
      };
      const response = await admissionService.getAllAdmissions(params);
      
      const data = response.data || [];
      const total = response.total || 0;
      const totalP = response.totalPages || 1;

      setAdmissions(data);
      setTotalRecords(total);
      setTotalPages(totalP);
      if (page === 1) setCurrentPage(1);
      setError(null);
    } catch (err) {
      console.error("Error fetching admissions:", err);
      setError("Failed to load admissions. Please try again.");
      setAdmissions([]);
    } finally {
      setLoading(false);
    }
  };

  // HANDLERS

  const handleDeleteAdmission = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admission? This action cannot be undone.")) return;
    const toastId = toast.loading("Deleting admission...");
    try {
      await admissionService.deleteAdmission(id);
      fetchAdmissions(currentPage);
      toast.success("Admission deleted successfully", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete admission", { id: toastId });
    }
  };

  const handleUpdateAdmission = async (id, updatedData) => {
    const toastId = toast.loading("Updating admission...");
    try {
      await admissionService.updateAdmission(id, updatedData);

      // Update local state without refetching
      setAdmissions(prev => prev.map(a =>
        a._id === id ? { ...a, ...updatedData } : a
      ));

      setEditingAdmission(null); // Close modal
      toast.success("Admission updated successfully", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update admission", { id: toastId });
    }
  };

  // FILTER LOGIC - Manual Trigger
  const handleFind = () => {
    fetchAdmissions(1);
  };

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Admissions</h1>
        <p className="text-slate-600 mt-2">
          {totalRecords} admissions
        </p>
      </div>

      {/* FILTER BAR flex-wrap */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-8 flex flex-wrap gap-4 items-center">
        <div className="flex-1 relative min-w-[200px]">
          <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search by ID, Course, Roll No..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        >
          <option value="">All Years</option>
          <option value="FE">FE</option>
          <option value="SE">SE</option>
          <option value="TE">TE</option>
          <option value="BE">BE</option>
        </select>

        <input
          type="text"
          placeholder="Academic Year (e.g. 2024-25)"
          value={academicYearFilter}
          onChange={(e) => setAcademicYearFilter(e.target.value)}
          className="w-48 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
        />

        <select
          value={feesPaidFilter}
          onChange={(e) => setFeesPaidFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        >
          <option value="">All Fee Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        <div className="flex gap-3">
          <button
            onClick={handleFind}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find Admissions
          </button>

          {(searchQuery || statusFilter || yearFilter || academicYearFilter || feesPaidFilter) && (
            <button
              onClick={() => {
                setSearchQuery(""); setStatusFilter(""); setYearFilter(""); setAcademicYearFilter(""); setFeesPaidFilter("");
              }}
              className="px-4 py-2.5 rounded-lg border border-red-300 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="min-h-[50vh]">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        {!loading && !error && admissions.length === 0 && (
          <div className="bg-white p-16 text-center rounded-xl border border-slate-200 border-dashed">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <p className="text-slate-600 font-medium">No admissions found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}

        {!loading && !error && admissions.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {admissions.map((admission) => (
              <AdmissionCard
                key={admission._id}
                admission={admission}
                onView={setSelectedAdmission}
                onEdit={setEditingAdmission}
                onDelete={handleDeleteAdmission}
              />
            ))}
          </div>
        )}

        {/* Pagination Component */}
        {!loading && !error && admissions.length > 0 && (
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

      {/* MODALS */}
      <DetailModal
        admission={selectedAdmission}
        onClose={() => setSelectedAdmission(null)}
      />

      <EditModal
        admission={editingAdmission}
        onClose={() => setEditingAdmission(null)}
        onSave={handleUpdateAdmission}
      />
      <Toaster position="bottom-right" />
    </main>
  );
}
