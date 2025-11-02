import React, { useState, useEffect } from "react";
import { admissionService } from "../services/admissionService";

function AdmissionCard({ admission, onView, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-700";
      case "Approved":
        return "bg-green-50 text-green-700";
      case "Rejected":
        return "bg-red-50 text-red-700";
      default:
        return "bg-slate-50 text-slate-700";
    }
  };

  // ✅ SAFE DATA EXTRACTION
  const studentId =
    typeof admission?.stuID === "string"
      ? admission.stuID
      : admission?.stuID?._id || admission?.stuID?.studentID || "N/A";

  const studentName =
    typeof admission?.stuID === "object" && admission.stuID?.name
      ? typeof admission.stuID.name === "object"
        ? `${admission.stuID.name.firstName || ""} ${
            admission.stuID.name.lastName || ""
          }`.trim() || "Student"
        : admission.stuID.name
      : "Student";

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden p-4">
        <div className="text-center">
          <p className="text-xs text-blue-600 font-semibold uppercase mb-1">
            {studentId}
          </p>
          <p className="text-sm font-bold text-slate-900 line-clamp-2">
            {studentName}
          </p>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
            Type
          </p>
          <p className="text-sm font-semibold text-slate-900">
            {admission?.admissionType || "N/A"}
          </p>
        </div>

        <div className="mb-2 pb-2 border-b border-slate-200">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
            Status
          </p>
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
              admission?.status
            )}`}
          >
            {admission?.status || "N/A"}
          </span>
        </div>

        <div className="mb-3">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
            Year
          </p>
          <p className="text-xs font-semibold text-slate-900">
            {admission?.academicYear || "N/A"}
          </p>
        </div>

        <div className="mt-auto space-y-2">
          <button
            onClick={() => onView && onView(admission)}
            className="w-full px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => onDelete && onDelete(admission._id)}
            className="w-full px-3 py-2 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminAdmission() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchAdmissions = async () => {
      try {
        setLoading(true);
        const data = await admissionService.getAllAdmissions();

        if (isMounted) {
          setAdmissions(Array.isArray(data) ? data : []);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching admissions:", err);
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load admissions!"
          );
          setAdmissions([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAdmissions();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewAdmission = (admission) => {
    alert(
      `📋 ADMISSION DETAILS\n\nType: ${admission.admissionType}\nStatus: ${admission.status}\nYear: ${admission.academicYear}`
    );
  };

  const handleDeleteAdmission = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await admissionService.deleteAdmission(id);
      const data = await admissionService.getAllAdmissions();
      setAdmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const filteredAdmissions = admissions.filter((a) => {
    const q = searchQuery.toLowerCase();
    const sid =
      typeof a.stuID === "string" ? a.stuID : a.stuID?.studentID || "";
    return (
      (sid.toLowerCase().includes(q) ||
        a.academicYear?.toLowerCase().includes(q) ||
        a.admissionType?.toLowerCase().includes(q)) &&
      (!statusFilter || a.status === statusFilter)
    );
  });

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Admissions</h1>
        <p className="text-slate-600 mt-2">
          {filteredAdmissions.length} of {admissions.length} admissions
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg flex-1 min-w-[250px]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold">
            + Add
          </button>
        </div>
      </div>

      <div className="min-h-[60vh]">
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full mx-auto mb-4"></div>
            <p className="text-slate-600">Loading...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && filteredAdmissions.length === 0 && (
          <div className="bg-white p-12 text-center rounded-lg">
            <p className="text-slate-600 text-lg">No admissions found</p>
          </div>
        )}

        {!loading && !error && filteredAdmissions.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredAdmissions.map((admission) => (
              <AdmissionCard
                key={admission._id}
                admission={admission}
                onView={handleViewAdmission}
                onDelete={handleDeleteAdmission}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
