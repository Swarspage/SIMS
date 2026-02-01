
import React, { useState, useEffect } from "react";
import { admissionService } from "../services/admissionService";

export default function StudentAdmission() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [admission, setAdmission] = useState(null);

  const [formData, setFormData] = useState({
    rollno: "",
    year: "",
    div: "",
    course: "",
    admissionDate: "",
    fees: "",
    isFeesPaid: false,
    isScholarshipApplied: false,
    academicYear: "",
  });

  useEffect(() => {
    fetchAdmissionData();
  }, []);

  const fetchAdmissionData = async () => {
    try {
      const data = await admissionService.getMyAdmissions();
      if (data && data.length > 0) {
        const admissionRecord = data[0];
        setAdmission(admissionRecord);
        setFormData({
          rollno: admissionRecord.rollno || "",
          year: admissionRecord.year || "",
          div: admissionRecord.div || "",
          course: admissionRecord.course || "",
          admissionDate: admissionRecord.admissionDate
            ? new Date(admissionRecord.admissionDate)
              .toISOString()
              .split("T")[0]
            : "",
          fees: admissionRecord.fees || "",
          isFeesPaid: admissionRecord.isFeesPaid || false,
          isScholarshipApplied: admissionRecord.isScholarshipApplied || false,
          academicYear: admissionRecord.academicYear || "",
        });
      }
    } catch (err) {
      console.error("Error fetching admission data:", err);
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      // Filter out fields not allowed by backend validation
      const {
        admissionDate,
        year,
        div,
        isFeesPaid,
        ...baseData
      } = formData;

      if (admission) {
        // Update schema doesn't allow academicYear, so remove it
        const { academicYear, ...updateData } = baseData;
        await admissionService.updateAdmission(admission._id, updateData);
        setSuccess("Admission updated successfully!");
      } else {
        await admissionService.createAdmission(baseData);
        setSuccess("Admission created successfully!");
      }
      setIsEditMode(false);
      fetchAdmissionData();
    } catch (err) {
      console.error("Error saving admission:", err);
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors
          .map((e) => `${e.field}: ${e.message}`)
          .join(", ");
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || "Failed to save admission");
      }
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading admission details...</p>
        </div>
      </main>
    );
  }

  // =============== PROFILE VIEW ===============
  if (!isEditMode && admission) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-4 sm:p-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 max-w-7xl mx-auto shadow-sm">
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

        {/* Two-Column Layout Container */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT COLUMN - Main Content (2/3 width on desktop) */}
            <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">

              {/* Academic Information Card */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
                  Academic Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Roll Number
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.rollno || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Year
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.year || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Division
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.div || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Course
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.course || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Academic Year
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.academicYear || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Admission Date
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.admissionDate
                        ? new Date(formData.admissionDate).toLocaleDateString("en-IN")
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Status
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {admission.status || "Active"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Financial Information Card */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
                  Financial Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Fees Amount
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      ₹{formData.fees || "0"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Payment Status
                    </p>
                    <p
                      className={`text-base font-medium ${formData.isFeesPaid ? "text-green-600" : "text-orange-600"
                        }`}
                    >
                      {formData.isFeesPaid ? "Paid" : "Pending"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Scholarship
                    </p>
                    <p
                      className={`text-base font-medium ${formData.isScholarshipApplied
                        ? "text-blue-600"
                        : "text-slate-700"
                        }`}
                    >
                      {formData.isScholarshipApplied ? "Applied" : "None"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Summary Card (1/3 width on desktop, appears first on mobile) */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl shadow-xl p-8 text-white sticky top-8 hover:shadow-2xl transition-all">
                {/* Icon Header */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 border-4 border-white/20">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    Admission Details
                  </h1>
                  <p className="text-slate-300 text-base">
                    {formData.course}
                  </p>
                </div>

                {/* Info Cards */}
                <div className="space-y-3 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-xs text-slate-300 uppercase tracking-wide mb-1">
                      Roll Number
                    </p>
                    <p className="text-base font-bold">
                      {formData.rollno || "N/A"}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-xs text-slate-300 uppercase tracking-wide mb-1">
                      Year & Division
                    </p>
                    <p className="text-base font-bold">
                      {formData.year} - {formData.div || "N/A"}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-xs text-slate-300 uppercase tracking-wide mb-1">
                      Academic Year
                    </p>
                    <p className="text-base font-bold">
                      {formData.academicYear || "N/A"}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-xs text-slate-300 uppercase tracking-wide mb-1">
                      Admission Date
                    </p>
                    <p className="text-sm font-medium">
                      {formData.admissionDate
                        ? new Date(formData.admissionDate).toLocaleDateString("en-IN")
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={handleEdit}
                  className="w-full px-6 py-3 bg-white text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  Edit Details
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    );
  }

  // =============== FORM VIEW (EDIT MODE) ===============
  return (
    <main className="p-4 sm:p-8 bg-slate-50 min-h-screen">
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

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admission Form</h1>
          <p className="text-slate-600 mt-1">Manage your admission details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 sm:p-8">
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Roll No <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="rollno"
                    value={formData.rollno}
                    onChange={handleChange}
                    placeholder="Enter roll no"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="FY">First Year</option>
                    <option value="SY">Second Year</option>
                    <option value="TY">Third Year</option>
                    <option value="TY">Fourth Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Division <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="div"
                    value={formData.div}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    required
                  >
                    <option value="">Select Division</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    required
                  >
                    <option value="">Select Course</option>
                    <option value="computer">Computer Engineering</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Admission Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Admission Date
                  </label>
                  <input
                    type="date"
                    name="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Optional - Backend will set automatically
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-100 text-slate-600 text-sm cursor-not-allowed appearance-none"
                  >
                    <option>Auto-generated by admin</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2">
                    Managed by administrator
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Financial Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Fees Amount (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Payment Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="isFeesPaid"
                    value={formData.isFeesPaid ? "full" : "pending"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isFeesPaid: e.target.value === "full",
                      }))
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="full">Full Payment</option>
                    <option value="partial">Partial Payment</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Scholarship <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="isScholarshipApplied"
                    value={formData.isScholarshipApplied ? "merit" : "none"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isScholarshipApplied: e.target.value !== "none",
                      }))
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="merit">Merit Scholarship</option>
                    <option value="financial">Financial Aid</option>
                    <option value="sports">Sports Quota</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Academic Information
              </h2>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  placeholder="2024-2025"
                  pattern="\d{4}-\d{4}"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
                <p className="text-xs text-slate-500 mt-2">
                  Format: YYYY-YYYY (e.g., 2024-2025)
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 px-4 sm:px-8 py-6 bg-slate-50 border-t border-slate-200">
            {admission && (
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(false);
                  fetchAdmissionData();
                  setError("");
                  setSuccess("");
                }}
                className="px-6 py-2.5 rounded-lg bg-slate-300 text-slate-900 text-sm font-semibold hover:bg-slate-400 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
