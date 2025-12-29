import React, { useState, useEffect, useRef } from "react";
import avatar from "../assets/Students.png";
import { studentService } from "../services/studentService";

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

  // View state - changed from sidebar to full page
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" or "profile"

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  // Import/Export state
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch students from backend when component loads
  useEffect(() => {
    fetchStudents();
  }, []);

  // Apply filters when students or filters change
  useEffect(() => {
    applyFilters();
  }, [students, searchQuery, selectedYear, selectedBranch]);

  const fetchStudents = async () => {
    try {
      const response = await studentService.getAllStudents();
      const data = response.data || response;
      setStudents(data);
      setFilteredStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to load students. Backend might not be running!");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...students];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name?.firstName?.toLowerCase().includes(query) ||
          s.name?.lastName?.toLowerCase().includes(query) ||
          s.studentID?.toLowerCase().includes(query) ||
          s.email?.toLowerCase().includes(query)
      );
    }

    // Year filter
    if (selectedYear) {
      filtered = filtered.filter((s) => s.year === selectedYear);
    }

    // Branch filter
    if (selectedBranch) {
      filtered = filtered.filter((s) => s.branch === selectedBranch);
    }

    setFilteredStudents(filtered);
  };

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

  // ✅ HANDLE IMPORT EXCEL
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.name.match(/\.(xlsx|xls)$/)) {
      alert("Please upload a valid Excel file (.xlsx or .xls)");
      return;
    }

    try {
      setImporting(true);
      await studentService.importExcel(file);
      alert("✅ Students imported successfully! Passwords sent via email.");
      fetchStudents(); // Refresh list
      e.target.value = ""; // Clear input
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

  // ✅ HANDLE EXPORT EXCEL
  const handleExport = async () => {
    try {
      setExporting(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("⚠️ You are not authenticated. Please login again.");
        setExporting(false);
        return;
      }

      const response = await fetch(
        "https://student-website-backend.onrender.com/api/student/export-students",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `students_export_${new Date().toISOString().split("T")[0]
        }.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      alert("✅ Students exported successfully!");
    } catch (err) {
      console.error("Export error:", err);
      alert("Failed to export students. Please try again.");
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
            {filteredStudents.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900">
            {students.length}
          </span>{" "}
          students
        </p>
      </div>

      {/* Filter / Buttons Row */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex flex-wrap gap-3">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name, ID, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white flex-1 min-w-[250px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
          >
            <option value="">All Years</option>
            <option value="SE">SE</option>
            <option value="TE">TE</option>
            <option value="BE">BE</option>
          </select>

          {/* Branch Filter */}
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
          >
            <option value="">All Branches</option>
            <option value="Computer">Computer</option>
            <option value="IT">IT</option>
            <option value="AIDS">AIDS</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="Chemical">Chemical</option>
          </select>

          {/* Clear Filters */}
          {(searchQuery || selectedYear || selectedBranch) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedYear("");
                setSelectedBranch("");
              }}
              className="px-4 py-2.5 rounded-lg border border-red-300 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition"
            >
              Clear Filters
            </button>
          )}

          {/* Spacer */}
          <div className="flex-1 min-w-[20px]"></div>

          {/* ✅ EXPORT BUTTON */}
          <button
            onClick={handleExport}
            disabled={exporting || students.length === 0}
            className="px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {exporting ? (
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
                Export Students
              </>
            )}
          </button>

          {/* ✅ IMPORT BUTTON */}
          <button
            onClick={handleImportClick}
            disabled={importing}
            className="px-5 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {importing ? (
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
                Import Students
              </>
            )}
          </button>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Add Student Button */}
          <button className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
            + Add Student
          </button>
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
    </main>
  );
}
