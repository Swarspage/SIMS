import React, { useState, useEffect, useRef } from "react";
import avatar from "../assets/Students.png";
import { studentService } from "../services/studentService";
import { divisionInchargeService } from "../services/divisionInchargeService";

// DivisionInchargeCard Component
function DivisionInchargeCard({ incharge, onDelete }) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200 hover:shadow-md transition-all group relative">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-xl border-2 border-violet-200">
          {incharge.name?.charAt(0) || "D"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-900">
            {incharge.name}
          </div>
          <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">
            {incharge.division} • {incharge.year}
          </div>
          <div className="text-sm text-slate-600 mt-1 break-all">
            {incharge.email}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 my-4"></div>

      <button
        onClick={() => onDelete(incharge._id)}
        className="w-full px-4 py-2.5 rounded-lg bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete
      </button>
    </div>
  );
}

// StudentCard Component
function StudentCard({ student, onViewProfile }) {
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

      <button
        onClick={() => onViewProfile(student)}
        className="w-full px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
      >
        View Profile
      </button>
    </div>
  );
}

// Full Page Student Profile View
function StudentProfileView({ student, onBack }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-4 sm:p-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2.5 rounded-lg bg-slate-700 text-white text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2"
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
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  // View state - changed from sidebar to full page
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" or "profile"

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

  // Import/Export state (Students)
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const fileInputRef = useRef(null);

  // Division Incharge State
  const [activeTab, setActiveTab] = useState("students"); // "students" or "divisionIncharges"
  const [divisionIncharges, setDivisionIncharges] = useState([]);
  const [loadingIncharges, setLoadingIncharges] = useState(false);

  // Import/Export state (Division Incharge)
  const [importingDivision, setImportingDivision] = useState(false);
  const [exportingDivision, setExportingDivision] = useState(false);
  const divisionFileInputRef = useRef(null);

  // Fetch Division Incharges
  const fetchDivisionIncharges = async () => {
    try {
      setLoadingIncharges(true);
      const response = await divisionInchargeService.getAll();
      if (response && response.data) {
        setDivisionIncharges(response.data);
      }
    } catch (err) {
      console.error("Error fetching division incharges:", err);
    } finally {
      setLoadingIncharges(false);
    }
  };

  // Effect to fetch incharges when tab changes
  useEffect(() => {
    if (activeTab === "divisionIncharges") {
      fetchDivisionIncharges();
    }
  }, [activeTab]);

  // Handle Delete Division Incharge
  const handleDeleteDivisionIncharge = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Division Incharge? This action cannot be undone.")) {
      return;
    }

    try {
      await divisionInchargeService.delete(id);
      alert("Division Incharge deleted successfully");
      fetchDivisionIncharges(); // Refresh list
    } catch (err) {
      console.error("Error deleting division incharge:", err);
      alert("Failed to delete Division Incharge");
    }
  };

  // Fetch students from backend when filters change
  useEffect(() => {
    // Debounce search query to avoid too many API calls
    const delayDebounceFn = setTimeout(() => {
      fetchStudents();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedYear, selectedBranch, firstName, middleName, lastName, motherName, city, bloodGroup, category]);

  const fetchStudents = async () => {
    try {
      setLoading(true); // Ensure loading state is shown during refetch

      const params = {
        limit: 100, // Reasonable limit
        search: searchQuery || undefined,
        year: selectedYear || undefined,
        branch: selectedBranch || undefined,
        firstName: firstName || undefined,
        middleName: middleName || undefined, // Father's Name
        lastName: lastName || undefined,
        motherName: motherName || undefined,
        city: city || undefined,
        bloodGroup: bloodGroup || undefined,
        category: category || undefined,
      };

      // Use getStudents for server-side filtering instead of getAllStudents
      const response = await studentService.getStudents(params);

      // response.data contains the array of students
      const data = response.data || [];

      setStudents(data);
      setFilteredStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
      // setError("Failed to load students. Backend might not be running!"); 
      // Don't show critical error on every filter change, maybe just log it or show simplified error
    } finally {
      setLoading(false);
    }
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

  // ✅ HANDLE IMPORT EXCEL (STUDENTS)
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls)$/)) {
      alert("Please upload a valid Excel file (.xlsx or .xls)");
      return;
    }

    try {
      setImporting(true);
      await studentService.importExcel(file);
      alert("✅ Students imported successfully! Passwords sent via email.");
      fetchStudents();
      e.target.value = "";
    } catch (err) {
      console.error("Import error:", err);
      alert(
        err.response?.data?.message ||
        "Failed to import students. Check file format."
      );
    } finally {
      setImporting(false);
    }
  };


  // ✅ HANDLE IMPORT EXCEL (DIVISION INCHARGE)
  const handleImportDivisionInchargeClick = () => {
    divisionFileInputRef.current?.click();
  };

  const handleDivisionFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls)$/)) {
      alert("Please upload a valid Excel file (.xlsx or .xls)");
      return;
    }

    try {
      setImportingDivision(true);
      const response = await divisionInchargeService.importExcel(file);

      console.log("Import response:", response);

      if (response && response.summary) {
        const { received, inserted, emailed, failed } = response.summary;

        let message = `✅ Processed ${received} records.\n`;
        message += `Entries created: ${inserted}\n`;
        message += `Emails sent: ${emailed}\n`;

        if (failed > 0 || (response.failed && response.failed.length > 0)) {
          message += `\n⚠️ Failed to send emails to: ${failed} users.\nCheck console for details.`;
          console.error("Failed emails:", response.failed);
        }

        if (emailed === 0 && inserted > 0) {
          message += `\n⚠️ WARNING: Accounts created but NO emails were sent.\nPossible reasons: SendGrid quota exceeded or invalid API key.`;
        }

        alert(message);
      } else {
        alert("✅ Import completed, but no detailed summary received.");
      }

      e.target.value = "";
    } catch (err) {
      console.error("Import error:", err);
      alert(
        err.response?.data?.message ||
        "Failed to import Division Incharges. Check file format."
      );
    } finally {
      setImportingDivision(false);
    }
  };

  // ✅ HANDLE EXPORT EXCEL (STUDENTS)
  const handleExport = async () => {
    try {
      setExporting(true);

      const params = {
        search: searchQuery || undefined,
        year: selectedYear || undefined,
        branch: selectedBranch || undefined,
        firstName: firstName || undefined,
        middleName: middleName || undefined, // Father's Name
        lastName: lastName || undefined,
        motherName: motherName || undefined,
        city: city || undefined,
        bloodGroup: bloodGroup || undefined,
        category: category || undefined,
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

      alert("✅ Students exported successfully!");
    } catch (err) {
      console.error("Export error:", err);
      if (err.response?.status === 401) {
        alert("⚠️ Session expired. Please login again.");
      } else {
        alert("Failed to export students. Please try again.");
      }
    } finally {
      setExporting(false);
    }
  };

  // ✅ HANDLE EXPORT EXCEL (DIVISION INCHARGE)
  const handleExportDivisionIncharge = async () => {
    alert("⚠️ Export feature for Division Incharges is not yet available in the backend. Please contact the developer to enable this (requires backend changes).");
    // Placeholder logic for when backend is ready
    /*
    try {
        setExportingDivision(true);
        const token = localStorage.getItem("token");
        // ... fetch logic similar to student export ...
    } catch (err) {
        console.error("Export error:", err);
    } finally {
        setExportingDivision(false);
    }
    */
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
            {filteredStudents.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900">
            {students.length}
          </span>{" "}
          students
          <span className="font-semibold text-slate-900">
            {students.length}
          </span>{" "}
          students
        </p>
      </div>

      {/* Tab Toggle - Only for Admin */}
      {userRole === "admin" && (
        <div className="flex p-1 space-x-1 bg-slate-200 rounded-xl max-w-md mb-8">
          <button
            className={`w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all duration-200 ${activeTab === "students"
              ? "bg-white shadow text-blue-700"
              : "text-slate-600 hover:bg-white/[0.12] hover:text-slate-800"
              }`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
          <button
            className={`w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all duration-200 ${activeTab === "divisionIncharges"
              ? "bg-white shadow text-violet-700"
              : "text-slate-600 hover:bg-white/[0.12] hover:text-slate-800"
              }`}
            onClick={() => setActiveTab("divisionIncharges")}
          >
            Division Incharges
          </button>
        </div>
      )}

      {activeTab === "students" ? (
        <>
          {/* Filter / Buttons Row */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">

            {/* 1. Main Search Bar */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Search Students</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by full string (ID, Email, Name)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm"
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
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

                {/* Year & Branch */}
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none cursor-pointer">
                  <option value="">Year (All)</option>
                  <option value="FE">FE</option>
                  <option value="SE">SE</option>
                  <option value="TE">TE</option>
                  <option value="BE">BE</option>
                </select>

                <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none cursor-pointer">
                  <option value="Computer">Computer</option>

                </select>
              </div>
            </div>

            {/* 3. Actions & Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">

              {/* Clear Filters Button */}
              <div>
                {(searchQuery || selectedYear || selectedBranch || firstName || middleName || lastName || motherName || city || bloodGroup || category) && (
                  <button
                    onClick={() => {
                      setSearchQuery(""); setSelectedYear(""); setSelectedBranch("");
                      setFirstName(""); setMiddleName(""); setLastName(""); setMotherName("");
                      setCity(""); setBloodGroup(""); setCategory("");
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

                {/* Import Button */}
                <button
                  onClick={handleImportClick}
                  disabled={importing}
                  className="px-4 py-2.5 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {importing ? (
                    <> <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div> Importing... </>
                  ) : (
                    <> <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg> Import </>
                  )}
                </button>

                {/* Hidden Input for Import */}
                <input ref={fileInputRef} type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="hidden" />

                {/* Add Student Button */}
                <button className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add Student
                </button>
              </div>
            </div>


            {/* Division Incharge Actions Row - ONLY FOR ADMIN */}
            {userRole === "admin" && (
              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center mr-2">
                  Division Incharge Data:
                </h3>

                {/* ✅ EXPORT DIVISION INCHARGE BUTTON */}
                <button
                  onClick={handleExportDivisionIncharge}
                  disabled={exportingDivision}
                  className="px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {exportingDivision ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Exporting...
                    </>
                  ) : (
                    <>
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
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Export Incharges
                    </>
                  )}
                </button>

                {/* ✅ IMPORT DIVISION INCHARGE BUTTON */}
                <button
                  onClick={handleImportDivisionInchargeClick}
                  disabled={importingDivision}
                  className="px-5 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {importingDivision ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Importing...
                    </>
                  ) : (
                    <>
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
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Import Incharges
                    </>
                  )}
                </button>

                {/* Hidden File Input for Division Incharge */}
                <input
                  ref={divisionFileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleDivisionFileChange}
                  className="hidden"
                />
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
            {!loading && !error && filteredStudents.length === 0 && (
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
            {!loading && !error && filteredStudents.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((s) => (
                  <StudentCard
                    key={s._id}
                    student={s}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        /* Division Incharges View */
        <div className="space-y-6">
          {/* Action Row for Division Incharge */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-800">Division Incharges</h2>

            {userRole === "admin" && (
              <div className="flex gap-3">
                {/* Export Button */}
                <button
                  onClick={handleExportDivisionIncharge}
                  disabled={exportingDivision}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Export
                </button>

                {/* Import Button */}
                <button
                  onClick={handleImportDivisionInchargeClick}
                  disabled={importingDivision}
                  className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition flex items-center gap-2"
                >
                  {importingDivision ? "Importing..." : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                      Import
                    </>
                  )}
                </button>
                <input ref={divisionFileInputRef} type="file" accept=".xlsx,.xls" onChange={handleDivisionFileChange} className="hidden" />
              </div>
            )}
          </div>

          {loadingIncharges ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
            </div>
          ) : divisionIncharges.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 mb-4">
                <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900">No Division Incharges Found</h3>
              <p className="text-slate-500 mt-2">Import a file to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {divisionIncharges.map((incharge) => (
                <DivisionInchargeCard
                  key={incharge._id}
                  incharge={incharge}
                  onDelete={handleDeleteDivisionIncharge}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
