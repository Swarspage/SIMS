import React, { useState, useEffect } from "react";
import { admissionService } from "../services/admissionService";

export default function StudentAdmission() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isEditMode, setIsEditMode] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [admissionId, setAdmissionId] = useState(null);

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
      setLoading(true);
      const data = await admissionService.getMyAdmissions();

      // Expected data is an array of admissions
      if (data && data.length > 0) {
        const admissionRecord = data[0];
        setAdmissionId(admissionRecord._id);
        setHasData(true);
        setIsEditMode(false);

        setFormData({
          rollno: admissionRecord.rollno || "",
          year: admissionRecord.year || "",
          div: admissionRecord.div || "",
          course: admissionRecord.course || "",
          admissionDate: admissionRecord.admissionDate
            ? new Date(admissionRecord.admissionDate).toISOString().split("T")[0]
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
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      // Filter out fields not allowed by backend validation
      const {
        admissionDate, // Backend might auto-set this, but we send if editable
        isFeesPaid,    // Some logic might be backend only, but keeping structure
        ...baseData
      } = formData;

      // Prepare payload - include fees/scholarship as per schema requirements
      const payload = { ...formData };

      // Fix boolean conversions if they came from select as strings (though they shouldn't with current logic)

      if (hasData && admissionId) {
        // Update
        // Remove academicYear if it's not allowed in update (per previous code analysis)
        const { academicYear, ...updateData } = payload;
        await admissionService.updateAdmission(admissionId, updateData);
        setMessage({ type: "success", text: "Admission updated successfully!" });
      } else {
        // Create
        await admissionService.createAdmission(payload);
        setMessage({ type: "success", text: "Admission created successfully!" });
        setHasData(true);
      }

      await fetchAdmissionData();
      window.scrollTo(0, 0);

    } catch (err) {
      console.error("Error saving admission:", err);
      const resData = err.response?.data;
      let errorMsg = resData?.message || err.message || "Failed to save admission.";

      if (resData?.errors && Array.isArray(resData.errors)) {
        const details = resData.errors.map(e => `${e.field}: ${e.message}`).join(", ");
        errorMsg += ` (${details})`;
      }

      setMessage({ type: "error", text: errorMsg });
      window.scrollTo(0, 0);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditCancel = () => {
    fetchAdmissionData();
    setIsEditMode(false);
    setMessage({ type: "", text: "" });
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading admission details...</p>
        </div>
      </main>
    );
  }

  // =============== VIEW MODE (CARDS) ===============
  if (!isEditMode && hasData) {
    return (
      <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Success Message */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
              }`}>
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                {message.type === "success"
                  ? <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  : <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                }
              </svg>
              <span>{message.text}</span>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column: Summary Card */}
            <div className="w-full md:w-1/3 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Admission Status
                </h2>
                <p className="text-green-600 font-medium mt-1">Confirmed</p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-slate-500 font-semibold uppercase text-xs">Roll No</p>
                    <p className="font-bold text-slate-800">{formData.rollno}</p>
                  </div>
                  <div className="w-px bg-slate-200"></div>
                  <div className="text-center">
                    <p className="text-slate-500 font-semibold uppercase text-xs">Div</p>
                    <p className="font-bold text-slate-800">{formData.div}</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditMode(true)}
                  className="mt-6 w-full py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm hover:shadow-md"
                >
                  Edit Admission Details
                </button>
              </div>
            </div>

            {/* Right Column: Detailed Info */}
            <div className="w-full md:w-2/3 space-y-6">

              {/* Academic Information Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  <InfoItem label="Course" value={formData.course} fullWidth />
                  <InfoItem label="Academic Year" value={formData.academicYear} />
                  <InfoItem label="Admission Date" value={formData.admissionDate} />
                  <InfoItem label="Year" value={`${formData.year} Year`} />
                  <InfoItem label="Division" value={`Division ${formData.div}`} />
                </div>
              </div>

              {/* Financial Information Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
                  Fees and Scholarship Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  <InfoItem label="Total Fees" value={`₹ ${formData.fees}`} />
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-1">Fee Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${formData.isFeesPaid
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                      }`}>
                      {formData.isFeesPaid ? "Paid" : "Pending / Partial"}
                    </span>
                  </div>
                  <InfoItem label="Scholarship Applied" value={formData.isScholarshipApplied ? "Yes" : "No"} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    );
  }

  // =============== FORM VIEW (EDIT MODE) ===============
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {hasData ? "Edit Admission Details" : "Admission Form"}
            </h1>
            <p className="mt-2 text-slate-600">
              {hasData ? "Update your academic or financial details." : "Please fill in your admission details."}
            </p>
          </div>
          {hasData && (
            <button
              onClick={handleEditCancel}
              className="px-4 py-2 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === "success"
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
            }`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              {message.type === "success"
                ? <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                : <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              }
            </svg>
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Section 1: Academic Details */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
              Academic Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <InputField label="Course" name="course" value={formData.course} onChange={handleChange} required />
              </div>
              <div className="md:col-span-2">
                <InputField label="Academic Year" name="academicYear" value={formData.academicYear} onChange={handleChange} required placeholder="2024-2025" disabled={hasData} title={hasData ? "Academic Year cannot be changed once submitted" : ""} />
              </div>

              <div className="md:col-span-4">
                <InputField label="Roll No" name="rollno" value={formData.rollno} onChange={handleChange} required />
              </div>
            </div>
          </section>

          {/* Section 2: Financial Details */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              Fees and Scholarship Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Fees Amount (₹)" name="fees" type="number" value={formData.fees} onChange={handleChange} required />

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Scholarship <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="isScholarshipApplied"
                    value={formData.isScholarshipApplied ? "applied" : "none"}
                    onChange={(e) => setFormData(prev => ({ ...prev, isScholarshipApplied: e.target.value === "applied" }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300 appearance-none cursor-pointer"
                  >
                    <option value="none">None</option>
                    <option value="applied">Applied</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 gap-4">
            {hasData && (
              <button
                type="button"
                onClick={handleEditCancel}
                className="px-6 py-3 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Details"
              )}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}

// Reusable Components
function InfoItem({ label, value, fullWidth = false }) {
  return (
    <div className={fullWidth ? "col-span-1 sm:col-span-2" : ""}>
      <p className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-1">{label}</p>
      <p className="text-base font-medium text-slate-800">{value || "N/A"}</p>
    </div>
  )
}

function InputField({ label, name, type = "text", value, onChange, required = false, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300"
        {...props}
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required = false }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300 appearance-none cursor-pointer"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
