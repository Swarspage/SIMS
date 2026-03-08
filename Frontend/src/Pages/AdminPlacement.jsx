import React, { useState, useEffect } from "react";
import { placementService } from "../services/placementService";
import { higherStudiesService } from "../services/higherStudiesService";
import { toast } from "react-toastify";
import Pagination from "../Components/Common/Pagination";

// Placement Card Component - COMPACT
function PlacementCard({ placement, onView, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      {/* Document/Image Preview Section */}
      <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden relative">
        {placement?.placementProof ? (
          placement.placementProof.toLowerCase().endsWith(".pdf") ? (
            <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-300">
              <iframe
                src={`${placement.placementProof}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                title="PDF Preview"
                className="w-full h-full border-none pointer-events-none"
                scrolling="no"
                tabIndex="-1"
              />
              <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                <span className="bg-black/50 text-white text-xs px-2 py-1 rounded shadow backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">PDF Preview</span>
              </div>
            </div>
          ) : (
            <img
              src={placement.placementProof}
              alt={placement?.companyName || "Placement"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )
        ) : (
          <div className="text-slate-300 text-5xl font-bold">
            {placement?.companyName?.charAt(0) || "?"}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Student ID */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 hidden">
          {typeof placement?.stuID === "string"
            ? placement.stuID
            : placement?.stuID?.studentID || "N/A"}
        </p>

        {/* Company Name */}
        <h3 className="text-sm font-bold text-slate-900 mb-1 line-clamp-2">
          {placement?.companyName || "N/A"}
        </h3>

        {/* Job Role */}
        <p className="text-xs text-slate-600 mb-2 line-clamp-1">
          {placement?.role || "N/A"}
        </p>

        {/* CTC */}
        <div className="mb-2 pb-2 border-b border-slate-200">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
            Package
          </p>
          <p className="text-lg font-bold text-blue-600">
            ₹{placement?.package ? `${placement.package} LPA` : "N/A"}
          </p>
        </div>

        {/* Placement Type */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
            {placement?.placementType || "N/A"}
          </span>
        </div>

        {/* Date */}
        <p className="text-xs text-slate-500 mb-3">
          {placement?.placementYear ? `Placement Year: ${placement.placementYear}` : "N/A"}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto space-y-2">
          <button
            onClick={() => onView && onView(placement)}
            className="w-full px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View
          </button>

          <div className="grid grid-cols-2 gap-2">
            {placement?.placementProof && (
              <a
                href={placement.placementProof}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors text-center"
              >
                Download
              </a>
            )}
            <div className="flex gap-2 w-full mt-2">
              <button
                onClick={() => onEdit && onEdit(placement)}
                className="flex-1 px-3 py-2 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg hover:bg-amber-100 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete && onDelete(placement._id)}
                className="flex-1 px-3 py-2 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Higher Studies Card Component - COMPACT
function HigherStudyCard({ higherStudy, onView, onDelete }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      {/* Document/Image Preview Section */}
      <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden relative">
        {higherStudy?.marksheet?.url ? (
          higherStudy.marksheet.url.toLowerCase().endsWith(".pdf") ? (
            <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-300">
              <iframe
                src={`${higherStudy.marksheet.url}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                title="PDF Preview"
                className="w-full h-full border-none pointer-events-none"
                scrolling="no"
                tabIndex="-1"
              />
              <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                <span className="bg-black/50 text-white text-xs px-2 py-1 rounded shadow backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">PDF Preview</span>
              </div>
            </div>
          ) : (
            <img
              src={higherStudy.marksheet.url}
              alt={higherStudy?.examName || "Higher Study"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )
        ) : (
          <div className="text-slate-300 text-5xl font-bold">
            {higherStudy?.examName?.charAt(0) || "?"}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Student ID */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 hidden">
          {typeof higherStudy?.stuID === "string"
            ? higherStudy.stuID
            : higherStudy?.stuID?.studentID || "N/A"}
        </p>

        {/* Exam Name */}
        <h3 className="text-sm font-bold text-slate-900 mb-1 line-clamp-2">
          {higherStudy?.examName || "N/A"}
        </h3>

        {/* Score */}
        <p className="text-xs text-slate-600 mb-2 line-clamp-1">
          Score: <span className="font-semibold text-slate-800">{higherStudy?.score || "N/A"}</span>
        </p>

        {/* Action Buttons */}
        <div className="mt-auto space-y-2">
          <button
            onClick={() => onView && onView(higherStudy)}
            className="w-full px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View
          </button>

          <div className="grid grid-cols-2 gap-2">
            {higherStudy?.marksheet?.url && (
              <a
                href={higherStudy.marksheet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors text-center"
              >
                Download
              </a>
            )}
            <button
              onClick={() => onDelete && onDelete(higherStudy._id)}
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

// Detail View Modal Component
function DetailModal({ item, type, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {type === "placement" ? "Placement Details" : "Higher Study Details"}
            </h2>
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
                {(type === "placement" ? item.placementProof : item.marksheet?.url) ? (
                  <img
                    src={type === "placement" ? item.placementProof : item.marksheet.url}
                    alt="Proof"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">🎓</span>
                )}
              </div>
            </div>

            {/* Basic Details */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {type === "placement" ? item.companyName : item.examName}
                </h3>
                <p className="text-sm text-slate-500">
                  {typeof item?.stuID === "string" ? item.stuID : item?.stuID?.studentID || "Student ID N/A"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {type === "placement" ? (
                  <>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                      {item.role}
                    </span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                      ₹{item.package} LPA
                    </span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100">
                      {item.placementType}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                      Score: {item.score}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Grid Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {type === "placement" ? (
              <>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Company Name</p>
                  <p className="text-sm font-medium text-slate-800">{item.companyName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Role</p>
                  <p className="text-sm font-medium text-slate-800">{item.role || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Package</p>
                  <p className="text-sm font-medium text-slate-800">{item.package ? `${item.package} LPA` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Placement Year</p>
                  <p className="text-sm font-medium text-slate-800">{item.placementYear || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Passout Year</p>
                  <p className="text-sm font-medium text-slate-800">{item.passoutYear || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Joining Year</p>
                  <p className="text-sm font-medium text-slate-800">{item.joiningYear || 'N/A'}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Exam Name</p>
                  <p className="text-sm font-medium text-slate-800">{item.examName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Score</p>
                  <p className="text-sm font-medium text-slate-800">{item.score || 'N/A'}</p>
                </div>
              </>
            )}
          </div>

          {/* Documents Section */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Attached Documents</h4>
            <div className="flex flex-wrap gap-3">
              {(type === "placement" ? item.placementProof : item.marksheet?.url) ? (
                <a
                  href={type === "placement" ? item.placementProof : item.marksheet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  {type === "placement" ? "Placement Proof" : "Marksheet/Proof"}
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">No proof uploaded</span>
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

// Form Modal Component (Add / Edit) for PLACEMENTS
function PlacementFormModal({ isOpen, onClose, placement, onSave }) {
  const [formData, setFormData] = useState({
    studentId: "",
    companyName: "",
    role: "",
    placementType: "Campus",
    package: "",
    placementYear: "",
    passoutYear: "",
    joiningYear: "",
  });

  const [placementProof, setPlacementProof] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (placement) {
        setFormData({
          studentId: typeof placement.stuID === "string" ? placement.stuID : placement.stuID?.studentID || "",
          companyName: placement.companyName || "",
          role: placement.role || "",
          placementType: placement.placementType || "Campus",
          package: placement.package || "",
          placementYear: placement.placementYear || "",
          passoutYear: placement.passoutYear || "",
          joiningYear: placement.joiningYear || "",
        });
      } else {
        setFormData({
          studentId: "",
          companyName: "",
          role: "",
          placementType: "Campus",
          package: "",
          placementYear: "",
          passoutYear: "",
          joiningYear: "",
        });
      }
      setPlacementProof(null);
    }
  }, [isOpen, placement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPlacementProof(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (!placement && key === "studentId") {
          payload.append("studentId", formData[key]);
        } else if (key !== "studentId") {
          payload.append(key, formData[key]);
        }
      });

      if (placementProof) {
        payload.append("placementProof", placementProof);
      }

      if (placement) {
        await placementService.updatePlacement(placement._id, payload);
        toast.success("Placement updated successfully!");
      } else {
        if (!placementProof) {
          toast.error("Placement Proof (PDF) is required for new records.");
          setLoading(false);
          return;
        }
        await placementService.createPlacement(payload);
        toast.success("Placement added successfully!");
      }

      onSave();
      onClose();
    } catch (err) {
      console.error("Error saving placement:", err);
      toast.error(err.response?.data?.message || err.response?.data?.errors?.[0]?.message || "Failed to save record.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="sticky top-0 z-10 p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">
            {placement ? "Edit Placement" : "Add Placement"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Student ID *</label>
              <input type="text" name="studentId" required={!placement} disabled={!!placement} value={formData.studentId} onChange={handleChange} placeholder="2024COMP123" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Company Name *</label>
              <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Job Role *</label>
              <input type="text" name="role" required value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Placement Type *</label>
              <select name="placementType" required value={formData.placementType} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="Campus">Campus</option>
                <option value="Off-Campus">Off-Campus</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Package (LPA) *</label>
              <input type="number" step="0.01" min="1" max="100" name="package" required value={formData.package} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Placement Year *</label>
              <input type="text" name="placementYear" placeholder="2023-24" required value={formData.placementYear} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Passout Year *</label>
              <input type="text" name="passoutYear" placeholder="2023-24" required value={formData.passoutYear} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Joining Year *</label>
              <input type="text" name="joiningYear" placeholder="2023-24" required value={formData.joiningYear} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Placement Proof (PDF) {placement ? "(Optional override)" : "*"}</label>
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {loading ? "Saving..." : "Save Placement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Admin Placement Component
export default function AdminPlacement() {
  const [activeTab, setActiveTab] = useState("placements");
  const [placements, setPlacements] = useState([]);
  const [higherStudies, setHigherStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // ── Shared filter ───────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");

  // ── Placement-specific filters ──────────────────────────────────────────────
  const [filterYear, setFilterYear] = useState("");
  const [filterDivision, setFilterDivision] = useState("");
  const [filterPlacementType, setFilterPlacementType] = useState("");
  const [filterPlacementYear, setFilterPlacementYear] = useState("");
  const [filterPassoutYear, setFilterPassoutYear] = useState("");
  const [filterJoiningYear, setFilterJoiningYear] = useState("");
  const [filterPackageMin, setFilterPackageMin] = useState("");
  const [filterPackageMax, setFilterPackageMax] = useState("");

  // ── Higher Studies filters ─────────────────────────────────────────────
  const [hsFilterYear, setHsFilterYear] = useState("");
  const [hsFilterDivision, setHsFilterDivision] = useState("");
  const [hsFilterExamName, setHsFilterExamName] = useState("");
  const [hsFilterAcademicYear, setHsFilterAcademicYear] = useState("");
  const [hsFilterScore, setHsFilterScore] = useState("");

  // Modal State
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isPlacementModalOpen, setIsPlacementModalOpen] = useState(false);
  const [placementToEdit, setPlacementToEdit] = useState(null);

  // Re-fetch whenever tab, page, or limit changes
  useEffect(() => {
    setCurrentPage(1); // Reset page when tab changes
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "placements") {
      fetchPlacements(currentPage);
    } else {
      fetchHigherStudies(currentPage);
    }
  }, [activeTab, currentPage, limit]);

  const fetchPlacements = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        search: searchQuery || undefined,
        year: filterYear || undefined,
        division: filterDivision || undefined,
        placementType: filterPlacementType || undefined,
        placementYear: filterPlacementYear || undefined,
        passoutYear: filterPassoutYear || undefined,
        joiningYear: filterJoiningYear || undefined,
        packageMin: filterPackageMin ? Number(filterPackageMin) : undefined,
        packageMax: filterPackageMax ? Number(filterPackageMax) : undefined,
      };
      const response = await placementService.getAllPlacements(params);
      
      const data = response.data || [];
      const total = response.total || 0;
      const totalP = response.totalPages || 1;

      setPlacements(data);
      setTotalRecords(total);
      setTotalPages(totalP);
      if (page === 1) setCurrentPage(1);
      setError(null);
    } catch (err) {
      console.error("Error fetching placements:", err);
      setError("Failed to load placements!");
      setPlacements([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchHigherStudies = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        search: searchQuery || undefined,
        year: hsFilterYear || undefined,
        division: hsFilterDivision || undefined,
        examName: hsFilterExamName || undefined,
        academicYear: hsFilterAcademicYear || undefined,
        score: hsFilterScore || undefined,
      };
      const response = await higherStudiesService.getAllHigherStudies(params);
      
      const data = response.data || [];
      const total = response.total || 0;
      const totalP = response.totalPages || 1;

      setHigherStudies(data);
      setTotalRecords(total);
      setTotalPages(totalP);
      if (page === 1) setCurrentPage(1);
      setError(null);
    } catch (err) {
      console.error("Error fetching higher studies:", err);
      setError("Failed to load higher studies!");
      setHigherStudies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPlacement = (placement) => {
    setSelectedItem(placement);
    setModalType("placement");
  };

  const handleViewHigherStudy = (higherStudy) => {
    setSelectedItem(higherStudy);
    setModalType("higherStudy");
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalType(null);
  };

  const handleDeletePlacement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this placement?"))
      return;
    try {
      await placementService.deletePlacement(id);
      toast.success("Placement deleted successfully!");
      fetchPlacements();
    } catch (err) {
      console.error("Error deleting placement:", err);
      toast.error("Failed to delete placement.");
    }
  };

  const handleDeleteHigherStudy = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this higher study record?"
      )
    )
      return;
    try {
      await higherStudiesService.deleteHigherStudy(id);
      toast.success("Higher study record deleted successfully!");
      fetchHigherStudies();
    } catch (err) {
      console.error("Error deleting higher study:", err);
      toast.error("Failed to delete higher study record.");
    }
  };

  const currentData =
    activeTab === "placements" ? placements : higherStudies;

  const handleExport = async () => {
    try {
      const isPlacement = activeTab === "placements";

      if (currentData.length === 0) {
        toast.warn("No data available to export.");
        return;
      }

      setLoading(true);

      const params = {
        search: searchQuery || undefined,
      };

      if (isPlacement) {
        params.year = filterYear || undefined;
        params.division = filterDivision || undefined;
        params.placementType = filterPlacementType || undefined;
        params.placementYear = filterPlacementYear || undefined;
        params.passoutYear = filterPassoutYear || undefined;
        params.joiningYear = filterJoiningYear || undefined;
        params.packageMin = filterPackageMin ? Number(filterPackageMin) : undefined;
        params.packageMax = filterPackageMax ? Number(filterPackageMax) : undefined;
      } else {
        params.year = hsFilterYear || undefined;
        params.division = hsFilterDivision || undefined;
        params.examName = hsFilterExamName || undefined;
        params.academicYear = hsFilterAcademicYear || undefined;
        params.score = hsFilterScore || undefined;
      }

      const blob = isPlacement
        ? await placementService.exportPlacements(params)
        : await higherStudiesService.exportHigherStudies(params);

      // Create download link
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${isPlacement ? "Placements" : "Higher_Studies"}_Export_${new Date().toLocaleDateString("en-IN").replace(/\//g, "-")}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("✅ Exported successfully!");
    } catch (err) {
      console.error("Error exporting data:", err);
      toast.error("Failed to export data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Career Outcomes</h1>
        <p className="text-slate-600 mt-2">
          Manage{" "}
          <span className="font-semibold text-blue-600">
            {totalRecords}
          </span>{" "}
          {activeTab === "placements" ? "placements" : "higher studies"}
        </p>
      </div>

      {/* Filters & Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">

        {/* Row 1 — Search + Tab buttons + Export */}
        <div className="flex flex-wrap gap-4 items-center mb-5">
          <input
            type="text"
            placeholder={`Search by ${activeTab === "placements" ? "company, role, student ID" : "university, degree, student ID"
              }...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white flex-1 min-w-[240px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <div className="flex gap-3 ml-auto flex-wrap">
            <button onClick={() => setActiveTab("placements")}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === "placements" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}>📊 Placements</button>

            <button onClick={() => setActiveTab("higherStudies")}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === "higherStudies" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}>🎓 Higher Studies</button>

            <button onClick={handleExport}
              className="px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
            {activeTab === "placements" && (
              <button
                onClick={() => { setPlacementToEdit(null); setIsPlacementModalOpen(true); }}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors flex items-center">
                + Add Placement
              </button>
            )}
          </div>
        </div>

        {/* Row 2 — Advanced filters (placement tab only) */}
        {activeTab === "placements" && (
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

              <select value={filterPlacementType} onChange={(e) => setFilterPlacementType(e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                <option value="">Placement Type (All)</option>
                <option value="Campus">Campus</option>
                <option value="Off-Campus">Off-Campus</option>
              </select>

              <input type="text" placeholder="Placement Year (e.g. 2023-24)" value={filterPlacementYear}
                onChange={(e) => setFilterPlacementYear(e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <input type="text" placeholder="Passout Year (e.g. 2023-24)" value={filterPassoutYear}
                onChange={(e) => setFilterPassoutYear(e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <input type="text" placeholder="Joining Year (e.g. 2023-24)" value={filterJoiningYear}
                onChange={(e) => setFilterJoiningYear(e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <input type="number" placeholder="Package Min (LPA)" value={filterPackageMin} min="1" max="100"
                onChange={(e) => setFilterPackageMin(e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <input type="number" placeholder="Package Max (LPA)" value={filterPackageMax} min="1" max="100"
                onChange={(e) => setFilterPackageMax(e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

            </div>

            <div className="mt-3 flex gap-3">
              <button
                onClick={() => fetchPlacements(1)}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Find Placements
              </button>
              <button
                onClick={() => {
                  setFilterYear(""); setFilterDivision(""); setFilterPlacementType("");
                  setFilterPlacementYear(""); setFilterPassoutYear(""); setFilterJoiningYear("");
                  setFilterPackageMin(""); setFilterPackageMax("");
                }}
                className="px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Row 2 — Advanced filters (higher studies tab only) */}
        {activeTab === "higherStudies" && (
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Advanced Filters</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

              <select value={hsFilterYear} onChange={(e) => setHsFilterYear(e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                <option value="">Year (All)</option>
                <option value="SE">SE</option>
                <option value="TE">TE</option>
                <option value="BE">BE</option>
              </select>

              <select value={hsFilterDivision} onChange={(e) => setHsFilterDivision(e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                <option value="">Division (All)</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>

              <select value={hsFilterExamName} onChange={(e) => setHsFilterExamName(e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                <option value="">Exam (All)</option>
                <option value="GATE">GATE</option>
                <option value="CAT">CAT</option>
                <option value="GRE">GRE</option>
                <option value="TOEFL">TOEFL</option>
                <option value="IELTS">IELTS</option>
                <option value="UPSC">UPSC</option>
              </select>

              <input type="text" placeholder="Academic Year (e.g. 2023-24)" value={hsFilterAcademicYear}
                onChange={(e) => setHsFilterAcademicYear(e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <input type="text" placeholder="Score (Partial Match)" value={hsFilterScore}
                onChange={(e) => setHsFilterScore(e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

            </div>

              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => fetchHigherStudies(1)}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Find Higher Studies
                </button>
                <button
                  onClick={() => { setHsFilterYear(""); setHsFilterDivision(""); setHsFilterExamName(""); setHsFilterAcademicYear(""); setHsFilterScore(""); }}
                  className="px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filters
                </button>
              </div>
          </div>
        )}
      </div>

      {/* Cards Container */}
      <div className="min-h-[60vh]">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading...</p>
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
        {!loading && !error && currentData.length === 0 && (
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-slate-600 text-lg font-medium">
              {searchQuery
                ? `No ${activeTab === "placements" ? "placements" : "higher studies"
                } match your search.`
                : `No ${activeTab === "placements" ? "placements" : "higher studies"
                } found!`}
            </p>
          </div>
        )}

        {/* Cards Grid - 4 Columns */}
        {!loading && !error && currentData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {activeTab === "placements"
              ? placements.map((p) => (
                <PlacementCard
                  key={p._id}
                  placement={p}
                  onView={handleViewPlacement}
                  onEdit={(placement) => { setPlacementToEdit(placement); setIsPlacementModalOpen(true); }}
                  onDelete={handleDeletePlacement}
                />
              ))
              : higherStudies.map((h) => (
                <HigherStudyCard
                  key={h._id}
                  higherStudy={h}
                  onView={handleViewHigherStudy}
                  onDelete={handleDeleteHigherStudy}
                />
              ))}
          </div>
        )}

        {/* Pagination Component */}
        {!loading && !error && currentData.length > 0 && (
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
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          type={modalType}
          onClose={handleCloseModal}
        />
      )}

      {/* Placement Form Modal */}
      <PlacementFormModal
        isOpen={isPlacementModalOpen}
        placement={placementToEdit}
        onClose={() => setIsPlacementModalOpen(false)}
        onSave={() => fetchPlacements()}
      />
    </main>
  );
}
