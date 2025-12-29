
import React, { useState, useEffect } from "react";
import { studentService } from "../services/studentService";

export default function StudentInformation() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [studentPhoto, setStudentPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    motherName: "",
    dob: "",
    bloodGroup: "",
    branch: "",
    year: "",
    currentStreet: "",
    currentCity: "",
    currentPincode: "",
    nativeStreet: "",
    nativeCity: "",
    nativePincode: "",
    category: "",
    email: "",
    mobileNo: "",
    parentMobileNo: "",
    PRN: "",
    studentID: "",
  });

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await studentService.getMyData();
      const student = response.data || response.student || response;

      if (student) {
        setFormData({
          firstName: student.name?.firstName || "",
          middleName: student.name?.middleName || "",
          lastName: student.name?.lastName || "",
          motherName: student.name?.motherName || "",
          dob: student.dob
            ? new Date(student.dob).toISOString().split("T")[0]
            : "",
          bloodGroup: student.bloodGroup || "",
          branch: student.branch || "",
          year: student.year || "",
          currentStreet: student.currentAddress?.street || "",
          currentCity: student.currentAddress?.city || "",
          currentPincode: student.currentAddress?.pincode || "",
          nativeStreet: student.nativeAddress?.street || "",
          nativeCity: student.nativeAddress?.city || "",
          nativePincode: student.nativeAddress?.nativePincode || "",
          category: student.category || "",
          email: student.email || "",
          mobileNo: student.mobileNo || "",
          parentMobileNo: student.parentMobileNo || "",
          PRN: student.PRN || "",
          studentID: student.studentID || "",
        });

        if (student.studentPhoto?.url) {
          setPhotoPreview(student.studentPhoto.url);
        }
      }
    } catch (err) {
      console.error("Error fetching student data:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudentPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
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
      const studentId = localStorage.getItem("studentId");

      const requiredFields = {
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        motherName: formData.motherName.trim(),
        PRN: formData.PRN.trim(),
        branch: formData.branch.trim(),
        year: formData.year.trim(),
        dob: formData.dob.trim(),
        bloodGroup: formData.bloodGroup.trim(),
        currentStreet: formData.currentStreet.trim(),
        currentCity: formData.currentCity.trim(),
        currentPincode: formData.currentPincode.trim(),
        nativeStreet: formData.nativeStreet.trim(),
        nativeCity: formData.nativeCity.trim(),
        nativePincode: formData.nativePincode.trim(),
        category: formData.category.trim(),
        mobileNo: formData.mobileNo.trim(),
        parentMobileNo: formData.parentMobileNo.trim(),
      };

      const emptyFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value || value === "")
        .map(([key]) => key);

      if (emptyFields.length > 0) {
        setError(`Please fill required fields: ${emptyFields.join(", ")}`);
        setLoading(false);
        return;
      }

      if (!studentPhoto && !photoPreview) {
        setError(
          "❌ Student photo is REQUIRED! Please upload a photo to continue."
        );
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();

      formDataToSend.append("firstName", formData.firstName.trim());
      formDataToSend.append("middleName", formData.middleName.trim());
      formDataToSend.append("lastName", formData.lastName.trim());
      formDataToSend.append("motherName", formData.motherName.trim());
      formDataToSend.append("PRN", formData.PRN.trim());
      formDataToSend.append("branch", formData.branch.trim());
      formDataToSend.append("year", formData.year.trim());
      formDataToSend.append("dob", formData.dob.trim());
      formDataToSend.append("bloodGroup", formData.bloodGroup.trim());
      formDataToSend.append("category", formData.category.trim());
      formDataToSend.append("mobileNo", formData.mobileNo.trim());
      formDataToSend.append("parentMobileNo", formData.parentMobileNo.trim());
      formDataToSend.append("currentStreet", formData.currentStreet.trim());
      formDataToSend.append("currentCity", formData.currentCity.trim());
      formDataToSend.append("pincode", formData.currentPincode.trim());
      formDataToSend.append("nativeStreet", formData.nativeStreet.trim());
      formDataToSend.append("nativeCity", formData.nativeCity.trim());
      formDataToSend.append("nativePincode", formData.nativePincode.trim());

      if (studentPhoto) {
        formDataToSend.append("studentPhoto", studentPhoto);
      }

      if (!studentId) {
        const response = await studentService.addStudent(formDataToSend);
        setSuccess("Student information added successfully!");

        if (response.data?._id) {
          localStorage.setItem("studentId", response.data._id);
        }
      } else {
        await studentService.updateStudent(studentId, formDataToSend);
        setSuccess("Student information updated successfully!");
      }

      setIsEditMode(false);
      fetchStudentData();
    } catch (err) {
      console.error("Error saving student data:", err);
      console.error("Backend response:", err.response?.data);
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        "Failed to save student information. Check console for details."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= PROFILE VIEW =================
  if (!isEditMode && photoPreview) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-4 sm:p-8">
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

              {/* Personal Information Card */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      First Name
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.firstName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Last Name
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.lastName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Middle Name
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.middleName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Mother's Name
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.motherName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Date of Birth
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.dob
                        ? new Date(formData.dob).toLocaleDateString("en-IN")
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Blood Group
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.bloodGroup || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Category
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.category || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Branch
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.branch || "N/A"}
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
                      Phone
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.mobileNo || "N/A"}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Parent's Mobile
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {formData.parentMobileNo || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
                  Address Information
                </h2>
                <div className="space-y-6">
                  {/* Current Address */}
                  <div>
                    <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-4">
                      Current Address
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                          Street
                        </p>
                        <p className="text-base text-slate-800 font-medium">
                          {formData.currentStreet || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                          City
                        </p>
                        <p className="text-base text-slate-800 font-medium">
                          {formData.currentCity || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                          Pincode
                        </p>
                        <p className="text-base text-slate-800 font-medium">
                          {formData.currentPincode || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-200"></div>

                  {/* Native Address */}
                  <div>
                    <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-4">
                      Native Address
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                          Street
                        </p>
                        <p className="text-base text-slate-800 font-medium">
                          {formData.nativeStreet || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                          City
                        </p>
                        <p className="text-base text-slate-800 font-medium">
                          {formData.nativeCity || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                          Pincode
                        </p>
                        <p className="text-base text-slate-800 font-medium">
                          {formData.nativePincode || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Profile Card (1/3 width on desktop, appears first on mobile) */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl shadow-xl p-8 text-white sticky top-8 hover:shadow-2xl transition-all">
                {/* Profile Photo - Large and Prominent */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Student"
                      className="w-40 h-40 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full object-cover border-4 border-white shadow-2xl ring-4 ring-slate-500"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-400 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Student Name */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    {formData.firstName} {formData.middleName} {formData.lastName}
                  </h1>
                  <p className="text-slate-300 text-base">
                    {formData.branch} - {formData.year}
                  </p>
                </div>

                {/* Info Cards */}
                <div className="space-y-3 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-xs text-slate-300 uppercase tracking-wide mb-1">
                      Student ID
                    </p>
                    <p className="text-base font-bold">
                      {formData.studentID || "N/A"}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-xs text-slate-300 uppercase tracking-wide mb-1">
                      PRN Number
                    </p>
                    <p className="text-base font-bold">
                      {formData.PRN || "N/A"}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-xs text-slate-300 uppercase tracking-wide mb-1">
                      Email Address
                    </p>
                    <p className="text-sm font-medium break-all">
                      {formData.email || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={handleEdit}
                  className="w-full px-6 py-3 bg-white text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  Edit Profile
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    );
  }

  // ================ FORM VIEW (EDIT MODE) ====================
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
          <h1 className="text-3xl font-bold text-slate-900">
            Student Information
          </h1>
          <p className="text-slate-600 mt-1">
            Complete and manage your profile details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 sm:p-8">
            {/* SECTION: Personal Information */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Middle Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mother's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Student Photo
                  </label>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={
                          studentPhoto
                            ? studentPhoto.name
                            : photoPreview
                              ? "Current photo uploaded"
                              : "Upload Photo"
                        }
                        placeholder="Upload Photo (Recent With White Background)"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 placeholder-slate-400 text-sm"
                        readOnly
                      />
                    </div>
                    <label className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition">
                      UPLOAD
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Student Preview"
                      className="mt-3 w-20 h-20 object-cover rounded-lg border-2 border-blue-500"
                    />
                  )}
                </div>
              </div>
            </div>
            {/* SECTION: Academic Information */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Academic Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Branch <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    required
                  >
                    <option value="">Select Branch</option>
                    <option value="Computer">Computer</option>
                    <option value="IT">IT</option>
                    <option value="AIDS">AIDS</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Chemical">Chemical</option>
                  </select>
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
                    <option value="SE">SE</option>
                    <option value="TE">TE</option>
                    <option value="BE">BE</option>
                  </select>
                </div>
              </div>
            </div>
            {/* SECTION: Current Address */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Current Address
              </h2>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="currentStreet"
                  value={formData.currentStreet}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="currentCity"
                    value={formData.currentCity}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="currentPincode"
                    value={formData.currentPincode}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>
            </div>
            {/* SECTION: Native Address */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Native Address
              </h2>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nativeStreet"
                  value={formData.nativeStreet}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nativeCity"
                    value={formData.nativeCity}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nativePincode"
                    value={formData.nativePincode}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>
            </div>
            {/* SECTION: Contact & Category */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mobile No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Parents Mobile No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="parentMobileNo"
                    value={formData.parentMobileNo}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-100 text-slate-600 text-sm cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Cannot be changed
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Open">Open</option>
                    <option value="EWS">EWS</option>
                    <option value="EBC">EBC</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            {/* SECTION: Identifiers */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Identifiers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    PRN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="PRN"
                    value={formData.PRN}
                    onChange={handleChange}
                    placeholder="15-digit PRN (e.g., 123456789012345)"
                    maxLength="15"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="studentID"
                    value={formData.studentID}
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-100 text-slate-600 text-sm cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Cannot be changed
                  </p>
                </div>
              </div>
            </div>
          </div>
          {isEditMode && (
            <div className="flex flex-col sm:flex-row justify-end gap-4 px-4 sm:px-8 py-6 bg-slate-50 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(false);
                  fetchStudentData();
                  setError("");
                  setSuccess("");
                }}
                className="px-6 py-2.5 rounded-lg bg-slate-300 text-slate-900 text-sm font-semibold hover:bg-slate-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}