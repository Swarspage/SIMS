import React, { useState, useEffect } from "react";
import { studentService } from "../services/studentService";

export default function StudentInformation() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isEditMode, setIsEditMode] = useState(true); // Default to true, switch to false if data exists
  const [hasData, setHasData] = useState(false);
  const [studentId, setStudentId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    motherName: "",
    PRN: "",
    branch: "",
    year: "",
    division: "",
    dob: "",
    bloodGroup: "",
    currentStreet: "",
    currentCity: "",
    pincode: "",
    nativeStreet: "",
    nativeCity: "",
    nativePincode: "",
    category: "",
    mobileNo: "",
    parentMobileNo: "",
    parentEmail: "",
    abcId: "",
  });

  const [studentPhoto, setStudentPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  // Pre-defined options based on validators
  const branches = ["Computer", "IT", "AIDS", "Civil", "Chemical", "Mechanical"];
  const years = ["SE", "TE", "BE"];
  const divisions = ["A", "B", "C"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const categories = ["Open", "EWS", "EBC", "OBC", "SC", "ST", "Other"];

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const data = await studentService.getMyData();
      if (data && data.success && data.data) {
        const s = data.data;

        // Define what constitutes "having data" - e.g. check if PRN or ID exists
        // If data exists, show view mode by default
        if (s._id || s.id || s.PRN) {
          setHasData(true);
          setStudentId(s._id || s.id);
          setIsEditMode(false);
        }

        // Map backend data structure to flat form state
        setFormData({
          firstName: s.name?.firstName || "",
          middleName: s.name?.middleName || "",
          lastName: s.name?.lastName || "",
          motherName: s.name?.motherName || "",
          PRN: s.PRN || "",
          branch: s.branch || "",
          year: s.year || "",
          division: s.division || "",
          dob: s.dob ? new Date(s.dob).toISOString().split("T")[0] : "",
          bloodGroup: s.bloodGroup || "",
          currentStreet: s.currentAddress?.street || "",
          currentCity: s.currentAddress?.city || "",
          pincode: s.currentAddress?.pincode || "",
          nativeStreet: s.nativeAddress?.street || "",
          nativeCity: s.nativeAddress?.city || "",
          nativePincode: s.nativeAddress?.nativePincode || "",
          category: s.category || "",
          mobileNo: s.mobileNo || "",
          parentMobileNo: s.parentMobileNo || "",
          parentEmail: s.parentEmail || "",
          abcId: s.abcId || "",
        });
        if (s.studentPhoto?.url) {
          setPhotoPreview(s.studentPhoto.url);
        }
      }
    } catch (err) {
      console.error("Error fetching student data:", err);
      // It's possible data doesn't exist yet, which is fine
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Enforce Capitalization for Name Fields
    if (["firstName", "middleName", "lastName", "motherName"].includes(name) && value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudentPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const data = new FormData();

      // Append all text fields
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      // Append photo if selected
      if (studentPhoto) {
        data.append("studentPhoto", studentPhoto);
      }

      if (hasData && studentId) {
        await studentService.updateStudent(studentId, data);
        setMessage({ type: "success", text: "Student information updated successfully!" });
      } else {
        await studentService.addStudent(data);
        setMessage({ type: "success", text: "Student information saved successfully!" });
      }

      setHasData(true);

      // Delay switching to view mode slightly to let user see success message, or switch immediately
      // Let's re-fetch to ensure data consistency
      await fetchStudentData();
      setIsEditMode(false);
      window.scrollTo(0, 0);

    } catch (err) {
      console.error("Error saving student info:", err);
      const resData = err.response?.data;
      let errorMsg = resData?.message || err.message || "Failed to save information.";

      if (resData?.errors && Array.isArray(resData.errors)) {
        // Joi validation errors usually come as { field: "name", message: "..." }
        const details = resData.errors.map(e => e.message).join(" ");
        errorMsg += ` ${details}`;
      }

      setMessage({ type: "error", text: errorMsg });
      window.scrollTo(0, 0);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditCancel = () => {
    // Re-fetch data to reset form to saved state
    fetchStudentData();
    setIsEditMode(false);
    setMessage({ type: "", text: "" });
  };

  // Helper function to capitalize first letter
  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading student details...</p>
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
          {message.text && message.type === "success" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{message.text}</span>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column: Photo & Basic Info */}
            <div className="w-full md:w-1/3 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 border-4 border-slate-50 mx-auto mb-4 shadow-md">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Student" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  {capitalize(formData.firstName)} {capitalize(formData.lastName)}
                </h2>
                <p className="text-slate-500 font-medium  mt-1">{formData.branch}</p>
                <p className="text-sm text-slate-400 mt-1">{formData.year} - {formData.division}</p>

                <button
                  onClick={() => setIsEditMode(true)}
                  className="mt-6 w-full py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm hover:shadow-md"
                >
                  Edit Information
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Academic IDs</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">PRN</p>
                    <p className="text-base font-medium text-slate-800">{formData.PRN}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">ABC ID</p>
                    <p className="text-base font-medium text-slate-800">{formData.abcId}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Detailed Info */}
            <div className="w-full md:w-2/3 space-y-6">

              {/* Personal Details Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  <InfoItem label="Full Name" value={`${capitalize(formData.firstName)} ${capitalize(formData.middleName)} ${capitalize(formData.lastName)}`} />
                  <InfoItem label="Mother's Name" value={capitalize(formData.motherName)} />
                  <InfoItem label="Date of Birth" value={formData.dob} />
                  <InfoItem label="Blood Group" value={formData.bloodGroup} />
                  <InfoItem label="Category" value={formData.category} />
                </div>
              </div>

              {/* Contact Details Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
                  Contact Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  <InfoItem label="Mobile Number" value={formData.mobileNo} />
                  <InfoItem label="Parent Mobile" value={formData.parentMobileNo} />
                  <InfoItem label="Parent Email" value={formData.parentEmail} fullWidth />
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
                  Address Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-bold text-orange-900 bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400 shadow-sm inline-block mb-2">Current Address</h3>
                    <p className="text-base text-slate-800 ml-1 mt-1">{formData.currentStreet}, {formData.currentCity} - {formData.pincode}</p>
                  </div>
                  <div className="border-t border-slate-100 pt-4">
                    <h3 className="text-md font-bold text-orange-900 bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400 shadow-sm inline-block mb-2">Native Address</h3>
                    <p className="text-base text-slate-800 ml-1 mt-1">{formData.nativeStreet}, {formData.nativeCity} - {formData.nativePincode}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    );
  }

  // =============== EDIT/FORM MODE ===============
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {hasData ? "Edit Information" : "Student Information"}
            </h1>
            <p className="mt-2 text-slate-600">
              {hasData ? "Update your personal and academic details." : "Please fill in your personal and academic details accurately."}
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
            {message.type === "success" ? (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Section 1: Personal Details */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
              Personal Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Photo Upload - Spans 2 cols on small, 1 on large, but let's make it sit nicely */}
              <div className="md:col-span-2 lg:col-span-4 flex flex-col sm:flex-row items-center gap-6 mb-4">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-md">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Student" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-transform hover:scale-110">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-medium text-slate-900">Profile Photo</h3>
                  <p className="text-sm text-slate-500 mt-1">Upload a clear passport size photo.<br />Max size 500KB. Formats: JPG, PNG.</p>
                </div>
              </div>

              <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required pattern="[A-Za-z]+" title="Only alphabets allowed" />
              <InputField label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} required pattern="[A-Za-z]+" title="Only alphabets allowed" />
              <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required pattern="[A-Za-z]+" title="Only alphabets allowed" />
              <InputField label="Mother Name" name="motherName" value={formData.motherName} onChange={handleChange} required pattern="[A-Za-z]+" title="Only alphabets allowed" />

              <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required />

              <SelectField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} options={bloodGroups} required />
              <SelectField label="Category" name="category" value={formData.category} onChange={handleChange} options={categories} required />

            </div>
          </section>

          {/* Section 2: Academic Details */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
              Academic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField label="PRN" name="PRN" value={formData.PRN} onChange={handleChange} required pattern="[1-9][0-9]{15}" title="16 digits, cannot start with 0" maxLength={16} />
              <InputField label="ABC ID" name="abcId" value={formData.abcId} onChange={handleChange} required pattern="\d{12}" title="Exactly 12 digits" maxLength={12} />
              <SelectField label="Branch" name="branch" value={formData.branch} onChange={handleChange} options={branches} required />
              <SelectField label="Year" name="year" value={formData.year} onChange={handleChange} options={years} required />
              <SelectField label="Division" name="division" value={formData.division} onChange={handleChange} options={divisions} required />
            </div>
          </section>

          {/* Section 3: Contact Details */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-600 rounded-full"></span>
              Contact Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField label="Mobile Number" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required pattern="[6-9]\d{9}" title="10 digit Indian mobile number" maxLength={10} />
              <InputField label="Parent Mobile No" name="parentMobileNo" value={formData.parentMobileNo} onChange={handleChange} required pattern="[6-9]\d{9}" title="10 digit Indian mobile number" maxLength={10} />
              <InputField label="Parent Email" name="parentEmail" type="email" value={formData.parentEmail} onChange={handleChange} required />
            </div>
          </section>

          {/* Section 4: Address Details */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="w-1 h-6 bg-orange-600 rounded-full"></span>
              Address Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Current Address */}
              <div className="space-y-4">
                <h3 className="text-md font-bold text-orange-900 bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400 shadow-sm">Current Address</h3>
                <InputField label="Street / Building" name="currentStreet" value={formData.currentStreet} onChange={handleChange} required />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="City" name="currentCity" value={formData.currentCity} onChange={handleChange} required />
                  <InputField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} required pattern="[1-9][0-9]{5}" title="6 digit pincode" maxLength={6} />
                </div>
              </div>

              {/* Native Address */}
              <div className="space-y-4">
                <h3 className="text-md font-bold text-orange-900 bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400 shadow-sm">Native Address</h3>
                <InputField label="Street / Building" name="nativeStreet" value={formData.nativeStreet} onChange={handleChange} required />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="City" name="nativeCity" value={formData.nativeCity} onChange={handleChange} required />
                  <InputField label="Pincode" name="nativePincode" value={formData.nativePincode} onChange={handleChange} required pattern="[1-9][0-9]{5}" title="6 digit pincode" maxLength={6} />
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
                "Save Information"
              )}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}

// Reusable Components to keep code clean

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
