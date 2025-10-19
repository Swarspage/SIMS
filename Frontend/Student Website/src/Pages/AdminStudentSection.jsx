import React from "react";
import avatar from "../assets/Students.png";
import students from "../data/students";

// StudentCard Component
function StudentCard({ student }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-lg border">
      <div className="flex items-start gap-4">
        <img
          src={avatar}
          alt="avatar"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="font-semibold text-lg">{student.name}</div>
          <div className="text-xs text-gray-400 uppercase">
            {student.classText}
          </div>
          <div className="text-sm text-green-500 mt-1">{student.studentId}</div>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>Joined {student.joined}</div>
        <div>
          Assigned <span className="text-red-500">{student.assigned}</span>
        </div>
      </div>

      <div className="mt-4">
        <button className="px-4 py-2 rounded bg-blue-700 text-white text-sm">
          View Profile
        </button>
      </div>
    </div>
  );
}

// Main App Component
export default function AdminStudentSection() {
  return (
    <main className="p-6">
      <div className="mb-4 text-lg font-semibold">
        Showing total <span className="text-red-500">{students.length}</span>{" "}
        Student
      </div>

      {/* filter / buttons row */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="px-4 py-2 border rounded bg-white">Filters</button>
        <button className="px-4 py-2 rounded border bg-green-100">
          Management Student
        </button>
        <button className="px-4 py-2 rounded bg-blue-900 text-white">
          +Add Student
        </button>
        <button className="px-4 py-2 rounded border">BATCH</button>
        <button className="px-4 py-2 rounded border">CLASS</button>
      </div>

      {/* cards container */}
      <div className="bg-[#0f2130] rounded-2xl p-6 min-h-[60vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {students.map((s, index) => (
            <StudentCard key={`${s.id}-${index}`} student={s} />
          ))}
        </div>
      </div>
    </main>
  );
}
