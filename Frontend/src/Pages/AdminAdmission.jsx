import React, { useState, useEffect } from "react";
import { admissionService } from "../services/admissionService";
import { toast, Toaster } from "react-hot-toast";
import Pagination from "../Components/Common/Pagination";

// ==================== COMPONENTS ====================

function AdmissionCard({ admission, onView, onDelete, isDeleting }) {
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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full group">
      {/* Card Header - Premium Gradient */}
      <div className="h-28 bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-800 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        <div className="text-center z-10 text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1 drop-shadow-sm">
            {studentId}
          </p>
          <h3 className="text-base font-bold line-clamp-1 drop-shadow-md">
            {studentName}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${getStatusColor(admission?.status)}`}>
            {admission?.status || "Pending"}
          </span>
          <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded shadow-sm border border-slate-200">
            {admission?.academicYear || "N/A"}
          </span>
        </div>

        <div className="space-y-2.5 mb-5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-tighter">Course</span>
            <span className="font-bold text-slate-900 truncate max-w-[120px]">{admission?.course || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-tighter">Year & Div</span>
            <span className="font-bold text-slate-900">{admission?.year || "N/A"} - {admission?.div || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-tighter">Fees</span>
            <span className="font-black text-blue-600">₹{admission?.fees?.toLocaleString() || "0"}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-col gap-2">
          <button
            onClick={() => onView && onView(admission)}
            className="w-full px-3 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all shadow-sm active:scale-95"
          >
            View Details
          </button>
          <button
            onClick={() => onDelete && onDelete(admission._id)}
            disabled={isDeleting}
            className={`w-full px-3 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors border active:scale-95 ${
              isDeleting 
                ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" 
                : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
            }`}
          >
            {isDeleting ? "Deleting..." : "Delete"}
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto animate-slideUp" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Admission Details</h2>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">ID: {admission._id}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">

          {/* Main Info Section */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-full sm:w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden border border-slate-200 flex items-center justify-center text-white text-4xl font-black shadow-lg">
                {studentName.charAt(0)}
              </div>
            </div>

            <div className="flex-1 space-y-4 pt-2">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{studentName}</h3>
                <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">
                  {studentId}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${admission.status === 'approved' ? 'bg-green-50 text-green-700 border-green-100' : admission.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                  {admission.status || "Pending"}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-200">
                  {admission.academicYear || "N/A"}
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                  {admission.course || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-1">Roll Number</p>
              <p className="text-sm font-bold text-slate-800">{admission.rollno || 'N/A'}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-1">Year & Division</p>
              <p className="text-sm font-bold text-slate-800">{year} - {div}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-1">Admission Date</p>
              <p className="text-sm font-bold text-slate-800">
                {admission.admissionDate ? new Date(admission.admissionDate).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : 'N/A'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Financial & Scholarship</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-500 font-bold">Total Fees</span>
                  <span className="text-sm font-black text-blue-600 tracking-tight">₹{admission.fees?.toLocaleString() || "0"}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                  <span className="text-xs text-slate-500 font-bold">Scholarship</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${admission.isScholarshipApplied ? 'text-green-600' : 'text-slate-400'}`}>
                    {admission.isScholarshipApplied ? 'Applied' : 'Not Applied'}
                  </span>
                </div>
                {!admission.isScholarshipApplied && admission.scholarshipNotAppliedReason && (
                   <div className="mt-2 pt-2 border-t border-slate-50">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Reason</p>
                      <p className="text-xs text-slate-600 italic">"{admission.scholarshipNotAppliedReason}"</p>
                   </div>
                )}
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200">
                 <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-500 font-bold">MahaDBT Form</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${admission.isMahadbtFormSubmitted ? 'text-green-600' : 'text-amber-600'}`}>
                    {admission.isMahadbtFormSubmitted ? 'Submitted' : 'Pending'}
                  </span>
                </div>
                {admission.isMahadbtFormSubmitted ? (
                  <div className="flex justify-between items-center pt-2 border-t border-slate-50 text-xs">
                    <span className="text-slate-400 font-bold">Filled Date</span>
                    <span className="text-slate-700 font-bold">{new Date(admission.mahadbtFilledDate).toLocaleDateString()}</span>
                  </div>
                ) : admission.mahadbtNotFilledReason && (
                  <div className="mt-2 pt-2 border-t border-slate-50">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Reason</p>
                    <p className="text-xs text-slate-600 italic">"{admission.mahadbtNotFilledReason}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
             <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Migration Details</h4>
             <div className="p-4 bg-white rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-500">Migration Certificate</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${admission.hasMigrationCertificate ? 'text-green-600' : 'text-amber-600'}`}>
                    {admission.hasMigrationCertificate ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                {admission.hasMigrationCertificate ? (
                   <div className="flex justify-between items-center pt-2 border-t border-slate-50 text-xs">
                    <span className="text-slate-400 font-bold">Expected Date</span>
                    <span className="text-slate-700 font-bold">{new Date(admission.migrationExpectedDate).toLocaleDateString()}</span>
                  </div>
                ) : admission.migrationNotAvailableReason && (
                    <div className="mt-2 pt-2 border-t border-slate-50">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Reason</p>
                      <p className="text-xs text-slate-600 italic">"{admission.migrationNotAvailableReason}"</p>
                  </div>
                )}
             </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all shadow-md active:scale-95">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// EditModal removed as per requirement (Admin 403 issue)

// ==================== MAIN PAGE ====================

export default function AdminAdmission() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [divFilter, setDivFilter] = useState("");
  const [academicYearFilter, setAcademicYearFilter] = useState("");
  const [feesPaidFilter, setFeesPaidFilter] = useState("");
  const [scholarshipFilter, setScholarshipFilter] = useState("");
  const [mahadbtFilter, setMahadbtFilter] = useState("");
  const [migrationFilter, setMigrationFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [selectedAdmission, setSelectedAdmission] = useState(null); // For View
  const [deletingIds, setDeletingIds] = useState([]); // Track IDs currently being deleted

  useEffect(() => {
    fetchAdmissions(currentPage);
  }, [currentPage, limit, statusFilter, yearFilter, divFilter, academicYearFilter, feesPaidFilter, scholarshipFilter, mahadbtFilter, migrationFilter]);

  const fetchAdmissions = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        search: searchQuery || undefined,
        status: statusFilter || undefined,
        year: yearFilter || undefined,
        div: divFilter || undefined,
        academicYear: academicYearFilter || undefined,
        filterPaid: feesPaidFilter || undefined,
        isScholarshipApplied: scholarshipFilter || undefined,
        isMahadbtFormSubmitted: mahadbtFilter || undefined,
        hasMigrationCertificate: migrationFilter || undefined,
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
    
    setDeletingIds(prev => [...prev, id]);
    const toastId = toast.loading("Deleting admission...");
    
    try {
      await admissionService.deleteAdmission(id);
      fetchAdmissions(currentPage);
      toast.success("Admission deleted successfully", { id: toastId });
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.message || "Failed to delete admission";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setDeletingIds(prev => prev.filter(deletingId => deletingId !== id));
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
          <option value="FY">FY</option>
          <option value="SY">SY</option>
          <option value="TY">TY</option>
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

        <input
          type="text"
          placeholder="Division (e.g. A)"
          value={divFilter}
          onChange={(e) => setDivFilter(e.target.value)}
          className="w-32 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />

        <select
          value={scholarshipFilter}
          onChange={(e) => setScholarshipFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        >
          <option value="">Scholarship Status</option>
          <option value="true">Applied</option>
          <option value="false">Not Applied</option>
        </select>

        <select
          value={mahadbtFilter}
          onChange={(e) => setMahadbtFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        >
          <option value="">MahaDBT Status</option>
          <option value="true">Submitted</option>
          <option value="false">Pending</option>
        </select>

        <select
          value={migrationFilter}
          onChange={(e) => setMigrationFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        >
          <option value="">Migration Status</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
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

          {(searchQuery || statusFilter || yearFilter || divFilter || academicYearFilter || feesPaidFilter || scholarshipFilter || mahadbtFilter || migrationFilter) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("");
                setYearFilter("");
                setDivFilter("");
                setAcademicYearFilter("");
                setFeesPaidFilter("");
                setScholarshipFilter("");
                setMahadbtFilter("");
                setMigrationFilter("");
                fetchAdmissions(1);
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
                onDelete={handleDeleteAdmission}
                isDeleting={deletingIds.includes(admission._id)}
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

      <Toaster position="bottom-right" />
    </main>
  );
}
