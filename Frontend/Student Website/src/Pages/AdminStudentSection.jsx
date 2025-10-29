// import React, { useState, useEffect } from "react";
// import avatar from "../assets/Students.png";
// import { studentService } from "../services/studentService";
// import StudentProfileSidebar from "../components/StudentProfileSidebar";

// // StudentCard Component
// function StudentCard({ student, onViewProfile }) {
//   return (
//     <div className="bg-white rounded-xl p-5 shadow-lg border">
//       <div className="flex items-start gap-4">
//         <img
//           src={student.studentPhoto?.url || avatar}
//           alt="avatar"
//           className="w-14 h-14 rounded-full object-cover"
//         />
//         <div className="flex-1">
//           <div className="font-semibold text-lg">
//             {student.name?.firstName} {student.name?.lastName}
//           </div>
//           <div className="text-xs text-gray-400 uppercase">
//             {student.branch} - {student.year}
//           </div>
//           <div className="text-sm text-green-500 mt-1">{student.studentID}</div>
//         </div>
//       </div>

//       <hr className="my-4" />

//       <div className="flex items-center justify-between text-sm text-gray-500">
//         <div>{student.email}</div>
//         <div>
//           PRN: <span className="text-red-500">{student.PRN}</span>
//         </div>
//       </div>

//       <div className="mt-4">
//         <button
//           onClick={() => onViewProfile(student)}
//           className="px-4 py-2 rounded bg-blue-700 text-white text-sm hover:bg-blue-800 transition"
//         >
//           View Profile
//         </button>
//       </div>
//     </div>
//   );
// }

// // Main App Component
// export default function AdminStudentSection() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Sidebar state
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Fetch students from backend when component loads
//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const data = await studentService.getAllStudents();
//       setStudents(data);
//     } catch (err) {
//       setError("Failed to load students. Backend might not be running!");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle view profile
//   const handleViewProfile = (student) => {
//     setSelectedStudent(student);
//     setIsSidebarOpen(true);
//   };

//   // Handle close sidebar
//   const handleCloseSidebar = () => {
//     setIsSidebarOpen(false);
//     setTimeout(() => setSelectedStudent(null), 300);
//   };

//   return (
//     <main className="p-6">
//       <div className="mb-4 text-lg font-semibold">
//         Showing total <span className="text-red-500">{students.length}</span>{" "}
//         Student
//       </div>

//       {/* filter / buttons row */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         <button className="px-4 py-2 border rounded bg-white">Filters</button>
//         <button className="px-4 py-2 rounded border bg-green-100">
//           Management Student
//         </button>
//         <button className="px-4 py-2 rounded bg-blue-900 text-white">
//           +Add Student
//         </button>
//         <button className="px-4 py-2 rounded border">BATCH</button>
//         <button className="px-4 py-2 rounded border">CLASS</button>
//       </div>

//       {/* cards container */}
//       <div className="bg-[#0f2130] rounded-2xl p-6 min-h-[60vh] overflow-y-auto">
//         {/* Loading State */}
//         {loading && (
//           <div className="flex items-center justify-center h-64">
//             <div className="text-white text-xl">Loading students...</div>
//           </div>
//         )}

//         {/* Error State */}
//         {error && !loading && (
//           <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
//         )}

//         {/* Students Grid */}
//         {!loading && !error && students.length === 0 && (
//           <div className="text-center text-white py-12">
//             No students found. Backend might be empty!
//           </div>
//         )}

//         {!loading && !error && students.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {students.map((s) => (
//               <StudentCard
//                 key={s._id}
//                 student={s}
//                 onViewProfile={handleViewProfile}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Student Profile Sidebar */}
//       <StudentProfileSidebar
//         student={selectedStudent}
//         isOpen={isSidebarOpen}
//         onClose={handleCloseSidebar}
//       />
//     </main>
//   );
// }

import React, { useState, useEffect } from "react";
import avatar from "../assets/Students.png";
import { studentService } from "../services/studentService";
import StudentProfileSidebar from "../components/StudentProfileSidebar";

// StudentCard Component
function StudentCard({ student, onViewProfile }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-lg border hover:shadow-xl transition">
      <div className="flex items-start gap-4">
        <img
          src={student.studentPhoto?.url || avatar}
          alt="avatar"
          className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="flex-1">
          <div className="font-semibold text-lg">
            {student.name?.firstName} {student.name?.middleName}{" "}
            {student.name?.lastName}
          </div>
          <div className="text-xs text-gray-400 uppercase">
            {student.branch} - {student.year}
          </div>
          <div className="text-sm text-green-500 mt-1">{student.studentID}</div>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="truncate">{student.email}</div>
        <div>
          PRN: <span className="text-red-500">{student.PRN}</span>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => onViewProfile(student)}
          className="w-full px-4 py-2 rounded bg-blue-700 text-white text-sm hover:bg-blue-800 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

// Main App Component
export default function AdminStudentSection() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sidebar state
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

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

      // Handle different response formats
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

  // Handle view profile
  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setIsSidebarOpen(true);
  };

  // Handle close sidebar
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedStudent(null), 300);
  };

  return (
    <main className="p-6">
      <div className="mb-4 text-lg font-semibold">
        Showing <span className="text-red-500">{filteredStudents.length}</span>{" "}
        of <span className="text-blue-600">{students.length}</span> Students
      </div>

      {/* Filter / Buttons Row */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name, ID, email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded bg-white flex-1 min-w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Year Filter */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-4 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="px-4 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-4 py-2 rounded border bg-red-100 text-red-700 hover:bg-red-200 transition"
          >
            Clear Filters
          </button>
        )}

        <button className="px-4 py-2 rounded bg-blue-900 text-white hover:bg-blue-800 transition">
          +Add Student
        </button>
      </div>

      {/* Cards Container */}
      <div className="bg-[#0f2130] rounded-2xl p-6 min-h-[60vh] overflow-y-auto">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading students...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredStudents.length === 0 && (
          <div className="text-center text-white py-12">
            {searchQuery || selectedYear || selectedBranch
              ? "No students match your filters."
              : "No students found. Backend might be empty!"}
          </div>
        )}

        {/* Students Grid */}
        {!loading && !error && filteredStudents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Student Profile Sidebar */}
      <StudentProfileSidebar
        student={selectedStudent}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </main>
  );
}
