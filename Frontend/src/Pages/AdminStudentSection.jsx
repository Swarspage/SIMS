import React, { useState, useEffect, useRef } from "react";
import avatar from "../assets/Students.png";
import { studentService } from "../services/studentService";
import { toast } from "react-toastify";
import ExcelJS from "exceljs";
import Pagination from "../Components/Common/Pagination";


// Component: Add Student Modal
function AddStudentModal({ isOpen, onClose, onAdded }) {
  const [form, setForm] = useState({ studentID: "", email: "" });
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.studentID || !form.email) {
      return toast.warn("Please provide both Student ID and Email.");
    }
    try {
      setSaving(true);
      // Create a dummy Excel workbook in memory using exceljs
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Students");
      worksheet.addRow(["studentID", "email"]);
      worksheet.addRow([form.studentID.trim(), form.email.trim().toLowerCase()]);

      // Write workbook to array buffer
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const file = new File([blob], "new_student.xlsx", { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

      // Call the existing import endpoint with our 1-row file
      await studentService.importExcel(file);
      toast.success("✅ Student added successfully! Password sent via email.");
      onAdded();
      onClose();
    } catch (err) {
      console.error(err);
      const resData = err.response?.data;
      if (resData?.errors && Array.isArray(resData.errors)) {
        resData.errors.forEach((e) => toast.error(e.message || "Validation error"));
      } else {
        toast.error(resData?.message || "Failed to add student.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold text-slate-800">Add New Student</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Student ID *</label>
            <input
              type="text"
              required
              placeholder="e.g. 2024COMP123"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={form.studentID}
              onChange={(e) => setForm({ ...form, studentID: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email *</label>
            <input
              type="email"
              required
              placeholder="student@example.com"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {saving ? "Adding..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Component: Edit Student Modal
function EditStudentModal({ isOpen, onClose, onSaved, student }) {
  const [saving, setSaving] = useState(false);
  const [photo, setPhoto] = useState(null);

  // Initialize form state with student's existing data
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "", motherName: "",
    PRN: "", branch: "Computer", year: "", division: "",
    dob: "", bloodGroup: "", category: "", mobileNo: "", parentMobileNo: "",
    parentEmail: "", abcId: "", academicYear: "",
    currentStreet: "", currentCity: "", pincode: "",
    nativeStreet: "", nativeCity: "", nativePincode: ""
  });

  useEffect(() => {
    if (student && isOpen) {
      setForm({
        firstName: student.name?.firstName || "",
        middleName: student.name?.middleName || "",
        lastName: student.name?.lastName || "",
        motherName: student.name?.motherName || "",
        PRN: student.PRN || "",
        branch: student.branch || "Computer",
        year: student.year || "",
        division: student.division || "",
        dob: student.dob ? new Date(student.dob).toISOString().split('T')[0] : "",
        bloodGroup: student.bloodGroup || "",
        category: student.category || "",
        mobileNo: student.mobileNo || "",
        parentMobileNo: student.parentMobileNo || "",
        parentEmail: student.parentEmail || "",
        abcId: student.abcId || "",
        academicYear: student.academicYear || "",
        currentStreet: student.currentAddress?.street || "",
        currentCity: student.currentAddress?.city || "",
        pincode: student.currentAddress?.pincode || "",
        nativeStreet: student.nativeAddress?.street || "",
        nativeCity: student.nativeAddress?.city || "",
        nativePincode: student.nativeAddress?.nativePincode || ""
      });
      setPhoto(null); // reset file input
    }
  }, [student, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const formData = new FormData();

      // Append all text fields
      Object.keys(form).forEach(key => {
        if (form[key] !== "") { // only append if not empty
          formData.append(key, form[key]);
        }
      });

      // Append photo if selected
      if (photo) {
        formData.append("studentPhoto", photo);
      }

      await studentService.updateStudent(student._id, formData);
      toast.success("✅ Student updated successfully.");
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      const resData = err.response?.data;
      if (resData?.errors && Array.isArray(resData.errors)) {
        resData.errors.forEach((e) => toast.error(e.message || "Validation error"));
      } else {
        toast.error(resData?.message || "Failed to update student.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold text-slate-800">Edit Student: {student?.studentID}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto bg-slate-50/50 flex-1">
          {/* Section: Personal Info */}
          <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-4 border-b pb-2">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label><input type="text" name="firstName" value={form.firstName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Middle Name</label><input type="text" name="middleName" value={form.middleName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label><input type="text" name="lastName" value={form.lastName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Mother's Name</label><input type="text" name="motherName" value={form.motherName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label><input type="date" name="dob" value={form.dob} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
              <select name="bloodGroup" value={form.bloodGroup} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm">
                <option value="">Select</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option>
              </select>
            </div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select name="category" value={form.category} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm">
                <option value="">Select</option><option value="Open">Open</option><option value="EWS">EWS</option><option value="EBC">EBC</option><option value="OBC">OBC</option><option value="SC">SC</option><option value="ST">ST</option><option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Section: Academic Info */}
          <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-4 border-b pb-2">Academic Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">PRN</label><input type="text" name="PRN" value={form.PRN} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
              <select name="year" value={form.year} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm">
                <option value="">Select</option><option value="SE">SE</option><option value="TE">TE</option><option value="BE">BE</option>
              </select>
            </div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Division</label>
              <select name="division" value={form.division} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm">
                <option value="">Select</option><option value="A">A</option><option value="B">B</option><option value="C">C</option>
              </select>
            </div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Academic Year</label><input type="text" name="academicYear" placeholder="2024-2025" value={form.academicYear} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">ABC ID</label><input type="text" name="abcId" value={form.abcId} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
          </div>

          {/* Section: Contact & Profiles */}
          <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-4 border-b pb-2">Contact Details & Photo</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Mobile No</label><input type="text" name="mobileNo" value={form.mobileNo} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Parent Mobile No</label><input type="text" name="parentMobileNo" value={form.parentMobileNo} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Parent Email</label><input type="email" name="parentEmail" value={form.parentEmail} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Update Student Photo (Optional)</label>
              <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={e => setPhoto(e.target.files[0])} className="w-full px-3 py-2 border rounded-lg text-sm bg-white" />
            </div>
          </div>

          {/* Section: Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
            <div>
              <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-4 border-b pb-2">Current Address</h4>
              <div className="space-y-3">
                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Street</label><input type="text" name="currentStreet" value={form.currentStreet} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">City</label><input type="text" name="currentCity" value={form.currentCity} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">Pincode</label><input type="text" name="pincode" value={form.pincode} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-4 border-b pb-2">Native Address</h4>
              <div className="space-y-3">
                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Street</label><input type="text" name="nativeStreet" value={form.nativeStreet} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">City</label><input type="text" name="nativeCity" value={form.nativeCity} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">Pincode</label><input type="text" name="nativePincode" value={form.nativePincode} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 mt-6 pt-4 pb-2 flex justify-end gap-3 translate-y-4">
            <button type="button" onClick={onClose} className="px-5 py-2.5 font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="px-5 py-2.5 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm">
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// StudentCard Component
function StudentCard({ student, onViewProfile, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200 hover:shadow-md transition-all group">
      <div className="flex items-start gap-4">
        <img
          src={student.studentPhoto?.url || avatar}
          alt="avatar"
          className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 group-hover:border-blue-600"
        />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-900">
            {student.name?.firstName} {student.name?.middleName}{" "}
            {student.name?.lastName}
          </div>
          <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">
            {student.branch} • {student.year}
          </div>
          <div className="text-sm text-blue-600 font-mono mt-2">
            {student.studentID}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 my-4"></div>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Email:</span>
          <span className="text-slate-800 truncate text-xs">
            {student.email}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">PRN:</span>
          <span className="text-red-600 font-mono text-xs">{student.PRN}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onViewProfile(student)}
          className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          View Profile
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(student);
          }}
          className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors border border-emerald-200"
          title="Edit Student"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(student._id);
          }}
          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-200"
          title="Delete Student"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </div>
  );
}

// Full Page Student Profile View
function StudentProfileView({ student, onBack, onEdit, onDelete }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-4 sm:p-8">
      {/* Top Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="px-4 py-2.5 rounded-lg bg-slate-700 text-white text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2"
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
          Back to Student List
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(student)}
            className="px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Edit Profile
          </button>
          <button
            onClick={() => {
              onDelete(student._id);
              onBack(); // Go back to list after delete triggers
            }}
            className="px-4 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Delete
          </button>
        </div>
      </div>

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
                    Student ID
                  </p>
                  <p className="text-base text-slate-800 font-bold text-blue-700">
                    {student.studentID || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    PRN Number
                  </p>
                  <p className="text-base text-slate-800 font-bold text-red-600">
                    {student.PRN || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    First Name
                  </p>
                  <p className="text-base text-slate-800 font-medium">
                    {student.name?.firstName || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    Last Name
                  </p>
                  <p className="text-base text-slate-800 font-medium">
                    {student.name?.lastName || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    Middle Name
                  </p>
                  <p className="text-base text-slate-800 font-medium">
                    {student.name?.middleName || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    Mother's Name
                  </p>
                  <p className="text-base text-slate-800 font-medium">
                    {student.name?.motherName || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    Date of Birth
                  </p>
                  <p className="text-base text-slate-800 font-medium">
                    {student.dob
                      ? new Date(student.dob).toLocaleDateString("en-IN")
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    Blood Group
                  </p>
                  <p className="text-base text-slate-800 font-medium">
                    {student.bloodGroup || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    Category
                  </p>
                  <p className="text-base text-slate-800 font-medium">
                    {student.category || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    Branch
                  </p>
                  <p className="text-base text-slate-800 font-medium">
                    {student.branch || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    Year
                  </p>
                  <p className="text-base text-slate-800 font-medium">
                    {student.year || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    Academic Year
                  </p>
                  <p className="text-base text-slate-800 font-medium">
                    {student.academicYear || "N/A"}
                  </p>
                </div>
                {student.division && (
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Division
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {student.division}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    Phone
                  </p>
                  <p className="text-base text-slate-800 font-medium">
                    {student.mobileNo || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    Student Email
                  </p>
                  <p className="text-base text-slate-800 font-medium break-all text-blue-600">
                    {student.email || "N/A"}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    Parent's Mobile
                  </p>
                  <p className="text-base text-slate-800 font-medium">
                    {student.parentMobileNo || "N/A"}
                  </p>
                </div>
                {student.parentEmail && (
                  <div className="sm:col-span-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      Parent's Email
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {student.parentEmail}
                    </p>
                  </div>
                )}
                {student.abcId && (
                  <div className="sm:col-span-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                      ABC ID
                    </p>
                    <p className="text-base text-slate-800 font-medium">
                      {student.abcId}
                    </p>
                  </div>
                )}
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
                        {student.currentAddress?.street || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                        City
                      </p>
                      <p className="text-base text-slate-800 font-medium">
                        {student.currentAddress?.city || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                        Pincode
                      </p>
                      <p className="text-base text-slate-800 font-medium">
                        {student.currentAddress?.pincode || "N/A"}
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
                        {student.nativeAddress?.street || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                        City
                      </p>
                      <p className="text-base text-slate-800 font-medium">
                        {student.nativeAddress?.city || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                        Pincode
                      </p>
                      <p className="text-base text-slate-800 font-medium">
                        {student.nativeAddress?.nativePincode || "N/A"}
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
                    src={student.studentPhoto?.url || avatar}
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
                  {student.name?.firstName} {student.name?.middleName} {student.name?.lastName}
                </h1>
                <p className="text-slate-300 text-base">
                  {student.branch} - {student.year}
                </p>
              </div>

              {/* Info Cards */}
              <div className="space-y-3 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-xs text-slate-300 uppercase tracking-wide mb-1">
                    Student ID
                  </p>
                  <p className="text-base font-bold">
                    {student.studentID || "N/A"}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-xs text-slate-300 uppercase tracking-wide mb-1">
                    PRN Number
                  </p>
                  <p className="text-base font-bold">
                    {student.PRN || "N/A"}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-xs text-slate-300 uppercase tracking-wide mb-1">
                    Email Address
                  </p>
                  <p className="text-sm font-medium break-all">
                    {student.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

// Main App Component
export default function AdminStudentSection() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  // View state - changed from sidebar to full page
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" or "profile"

  // Add/Edit Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  // New Extended Filters
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState(""); // Mapped to Father's Name in UI
  const [lastName, setLastName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [city, setCity] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [category, setCategory] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [detailsFilled, setDetailsFilled] = useState("");

  // Import/Export state (Students)
  const [exporting, setExporting] = useState(false);
  const fileInputRef = useRef(null);

  // Import Student IDs state (new auth flow)
  const [importingStudentIDs, setImportingStudentIDs] = useState(false);
  const studentIDsFileInputRef = useRef(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Applied Filters State (Snapshot for WYSIWYG)
  const [appliedFilters, setAppliedFilters] = useState({});


  // Fetch students from backend on mount ONLY
  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage, limit, appliedFilters]); // Refetch when page, limit, or APPLIED filters change

  const fetchStudents = async (page = 1) => {
    try {
      setLoading(true);

      const params = {
        page,
        limit,
        ...appliedFilters
      };

      // Use getStudents for server-side filtering instead of getAllStudents
      const response = await studentService.getStudents(params);

      // response contains the standard wrapper { success, data, total, page, totalPages }
      const data = response.data || [];
      const total = response.total || 0;
      const totalP = response.totalPages || 1;

      setStudents(data);
      setTotalRecords(total);
      setTotalPages(totalP);
      if (page === 1) setCurrentPage(1); // Reset to first page if we explicitly passed 1
    } catch (err) {
      console.error("Error fetching students:", err);
      // setError("Failed to load students. Backend might not be running!"); 
      // Don't show critical error on every filter change, maybe just log it or show simplified error
    } finally {
      setLoading(false);
    }
  };

  // handleDeleteStudent logic
  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student completely? This action cannot be undone.")) return;

    try {
      await studentService.deleteStudent(studentId);
      toast.success("✅ Student deleted successfully.");
      fetchStudents();
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error(err.response?.data?.message || "Failed to delete student.");
    }
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  // Removed applyFilters as valid filters are now applied on backend

  // Handle view profile - changed to full page view
  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setViewMode("profile");
  };

  // Handle back to list
  const handleBackToList = () => {
    setViewMode("list");
    setSelectedStudent(null);
  };

  // If viewing a student profile, show full page view
  if (viewMode === "profile" && selectedStudent && !isEditModalOpen) {
    return (
      <StudentProfileView
        student={selectedStudent}
        onBack={handleBackToList}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
      />
    );
  }


  // ✅ HANDLE IMPORT STUDENT IDs (new auth flow — only studentID column)
  const handleImportStudentIDsClick = () => {
    studentIDsFileInputRef.current?.click();
  };

  const handleStudentIDsFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls)$/)) {
      toast.warn("Please upload a valid Excel file (.xlsx or .xls)");
      return;
    }

    try {
      setImportingStudentIDs(true);
      const response = await studentService.importStudentIDs(file);
      const inserted = response?.summary?.inserted ?? "?";
      const skipped = response?.summary?.alreadyExists ?? 0;
      toast.success(`✅ Student IDs imported! Created: ${inserted}${skipped ? `, Skipped (already exist): ${skipped}` : ""}.`);
      fetchStudents();
      e.target.value = "";
    } catch (err) {
      console.error("Import Student IDs error:", err);
      toast.error(err.response?.data?.message || "Failed to import Student IDs. Check the file has a 'studentID' column.");
    } finally {
      setImportingStudentIDs(false);
    }
  };



  // ✅ HANDLE EXPORT EXCEL (STUDENTS)
  const handleExport = async () => {
    try {
      setExporting(true);

      const params = {
        ...appliedFilters
      };

      const blob = await studentService.exportStudents(params);

      // Create download link
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `students_export_${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("✅ Students exported successfully!");
    } catch (err) {
      console.error("Export error:", err);
      if (err.response?.status === 401) {
        toast.warn("⚠️ Session expired. Please login again.");
      } else {
        toast.error("Failed to export students. Please try again.");
      }
    } finally {
      setExporting(false);
    }
  };


  // If viewing a student profile, show full page view
  if (viewMode === "profile" && selectedStudent) {
    return (
      <StudentProfileView
        student={selectedStudent}
        onBack={handleBackToList}
      />
    );
  }

  // Otherwise show the list view
  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Students</h1>
        <p className="text-slate-600 mt-2">
          Showing{" "}
          <span className="font-semibold text-blue-600">
            {students.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900">
            {students.length}
          </span>{" "}
          students
        </p>
      </div>

      <>
        {/* Filter / Buttons Row */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">

          {/* 1. Main Search Bar */}
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Search Students</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. 2024COMP001, John Doe, 224101..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm"
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 ml-1">
              <span className="font-semibold text-blue-600">Tip:</span> Search by Student ID, PRN, First/Last Name, or Email.
            </p>
          </div>

          {/* 2. Advanced Filters Grid */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Advanced Filters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* Names */}
              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />

              <input type="text" placeholder="Father's Name (Middle)" value={middleName} onChange={(e) => setMiddleName(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />

              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />

              <input type="text" placeholder="Mother's Name" value={motherName} onChange={(e) => setMotherName(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />

              {/* Location & Details */}
              <input type="text" placeholder="City (Current Address)" value={city} onChange={(e) => setCity(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />

              <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none cursor-pointer">
                <option value="">Blood Group</option>
                <option value="A+">A+</option> <option value="A-">A-</option>
                <option value="B+">B+</option> <option value="B-">B-</option>
                <option value="AB+">AB+</option> <option value="AB-">AB-</option>
                <option value="O+">O+</option> <option value="O-">O-</option>
              </select>

              <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none cursor-pointer">
                <option value="">Category</option>
                <option value="Open">Open</option> <option value="OBC">OBC</option>
                <option value="SC">SC</option> <option value="ST">ST</option>
                <option value="EWS">EWS</option> <option value="EBC">EBC</option>
                <option value="Other">Other</option>
              </select>

              {/* Year & Branch & Division */}
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none cursor-pointer">
                <option value="">Year (All)</option>
                <option value="SE">SE</option>
                <option value="TE">TE</option>
                <option value="BE">BE</option>
              </select>

              <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none cursor-pointer">
                <option value="">Branch (All)</option>
                <option value="Computer">Computer</option>
              </select>

              <select value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none cursor-pointer">
                <option value="">Division (All)</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>

              <input type="text" placeholder="Academic Year (e.g. 2023-24)" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />

              <select value={detailsFilled} onChange={(e) => setDetailsFilled(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none cursor-pointer">
                <option value="">Details Filled (All)</option>
                <option value="true">Details Filled ✓</option>
                <option value="false">Details Not Filled ✗</option>
              </select>

            </div>
          </div>

          {/* 3. Actions & Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">

            {/* Find & Clear Buttons Group */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setAppliedFilters({
                    search: searchQuery || undefined,
                    year: selectedYear || undefined,
                    branch: selectedBranch || undefined,
                    division: selectedDivision || undefined,
                    academicYear: academicYear || undefined,
                    detailsFilled: detailsFilled !== "" ? detailsFilled === "true" : undefined,
                    firstName: firstName || undefined,
                    middleName: middleName || undefined,
                    lastName: lastName || undefined,
                    motherName: motherName || undefined,
                    city: city || undefined,
                    bloodGroup: bloodGroup || undefined,
                    category: category || undefined,
                  });
                  setCurrentPage(1);
                }}
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Find Students
              </button>

              {(searchQuery || selectedYear || selectedBranch || firstName || middleName || lastName || motherName || city || bloodGroup || category || selectedDivision || academicYear || detailsFilled) && (
                <button
                  onClick={() => {
                    setSearchQuery(""); setSelectedYear(""); setSelectedBranch("");
                    setFirstName(""); setMiddleName(""); setLastName(""); setMotherName("");
                    setCity(""); setBloodGroup(""); setCategory("");
                    setSelectedDivision(""); setAcademicYear(""); setDetailsFilled("");
                  }}
                  className="px-4 py-2.5 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Action Buttons Group */}
            <div className="flex flex-wrap gap-3">
              {/* Export Button */}
              <button
                onClick={handleExport}
                disabled={exporting || students.length === 0}
                className="px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {exporting ? (
                  <> <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div> Exporting... </>
                ) : (
                  <> <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> Export </>
                )}
              </button>


              {/* Import Student IDs Button — new auth flow */}
              <button
                onClick={handleImportStudentIDsClick}
                disabled={importingStudentIDs}
                title="Upload an Excel file with a single 'studentID' column to pre-register students for self-signup"
                className="px-4 py-2.5 rounded-lg bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {importingStudentIDs ? (
                  <> <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div> Importing IDs... </>
                ) : (
                  <> <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> Import Student IDs </>
                )}
              </button>

              {/* Hidden Input for Student IDs Import */}
              <input ref={studentIDsFileInputRef} type="file" accept=".xlsx,.xls" onChange={handleStudentIDsFileChange} className="hidden" />

              {/* Add Student Button */}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Student
              </button>
            </div>
          </div>


        </div>

        {/* Cards Container */}
        <div className="min-h-[60vh]">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Loading students...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold">Error Loading Students</h3>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && students.length === 0 && (
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
                  d="M12 6.253v13m0-13C6.228 6.228 2 10.228 2 15s4.228 8.772 10 8.772 10-4.228 10-8.772c0-4.772-4.228-8.747-10-8.747z"
                />
              </svg>
              <p className="text-slate-600 text-lg font-medium">
                {searchQuery || selectedYear || selectedBranch
                  ? "No students match your filters."
                  : "No students found."}
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Try adjusting your search criteria or add a new student.
              </p>
            </div>
          )}

          {/* Students Grid */}
          {!loading && !error && students.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((s) => (
                <StudentCard
                  key={s._id}
                  student={s}
                  onViewProfile={handleViewProfile}
                  onEdit={handleEditStudent}
                  onDelete={handleDeleteStudent}
                />
              ))}
            </div>
          )}

          {/* Pagination Component */}
          {!loading && !error && students.length > 0 && (
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
      </>

      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdded={() => fetchStudents()}
      />

      <EditStudentModal
        isOpen={isEditModalOpen}
        student={selectedStudent}
        onClose={() => setIsEditModalOpen(false)}
        onSaved={fetchStudents}
      />
    </main>
  );
}
