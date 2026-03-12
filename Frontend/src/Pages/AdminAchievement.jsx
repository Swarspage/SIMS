import React, { useState, useEffect } from "react";
import { achievementService } from "../services/achievementService";
import { studentService } from "../services/studentService";
import { toast } from "react-toastify";
import Pagination from "../Components/Common/Pagination";

// Achievement Card Component - COMPACT & BEAUTIFUL
function AchievementCard({ achievement, onView, onDelete, onEdit, isDeleting }) {
  // Student info helper - checks both populated 'stuID' and aggregated 'student' field
  const student = achievement?.student || achievement?.stuID;
  const studentID = student?.studentID && student.studentID !== "N/A" ? student.studentID : null;
  const studentYear = student?.year && student.year !== "N/A" ? student.year : null;
  const studentNameRaw = student?.name;
  const studentName = studentNameRaw &&
    (studentNameRaw.firstName || studentNameRaw.lastName) &&
    `${studentNameRaw.firstName || ""} ${studentNameRaw.lastName || ""}`.trim() !== "N/A"
    ? `${studentNameRaw.firstName || ""} ${studentNameRaw.lastName || ""}`.trim()
    : null;

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      {/* Image Section */}
      <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden relative">
        <img
          src={
            achievement?.photographs?.eventPhoto?.url ||
            "https://via.placeholder.com/300x200?text=Achievement"
          }
          alt={achievement?.title || "Achievement"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Overlay: ID & Year */}
        <div className="absolute top-2 left-2 flex gap-1">
          {studentID && (
            <span className="px-2 py-0.5 bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-700 rounded shadow-sm border border-white/20 uppercase tracking-tighter">
              {studentID}
            </span>
          )}
          {studentYear && (
            <span className="px-2 py-0.5 bg-blue-600/90 backdrop-blur-md text-[10px] font-bold text-white rounded shadow-sm border border-blue-500/20 uppercase tracking-tighter font-mono">
              {studentYear}
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">

        {/* Student Name */}
        {studentName && (
          <div className="mb-2">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Student</p>
            <h4 className="text-sm font-black text-slate-900 line-clamp-1">{studentName}</h4>
          </div>
        )}

        <div className="h-px bg-slate-100 mb-3" />

        {/* Title */}
        <h3 className="text-sm font-bold text-blue-600 mb-1 line-clamp-2">
          {achievement?.title || "No Title"}
        </h3>

        {/* Category Badge */}
        {achievement?.category && (
          <div className="mb-2">
            <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-tighter border border-blue-100">
              {achievement.category}
            </span>
          </div>
        )}

        {/* Achievement Type */}
        {achievement?.achievementType && (
          <p className="text-xs font-black text-green-600 mb-2 flex items-center gap-1">
            {achievement.achievementType === "Winner" && "🏆 "}
            {achievement.achievementType === "Runner-up" && "🥈 "}
            {achievement.achievementType}
          </p>
        )}

        {/* Date */}
        <div className="mb-3 pb-3 border-b border-slate-100 mt-auto">
          <p className="text-[10px] text-slate-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {achievement?.date?.from && !isNaN(new Date(achievement.date.from).getTime())
              ? new Date(achievement.date.from).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: 'numeric' })
              : "Date N/A"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => onView && onView(achievement)}
            className="w-full px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            View Details
          </button>
          <div className="flex gap-2 w-full">
            <button
              onClick={() => onEdit && onEdit(achievement)}
              className="flex-1 px-3 py-2 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg hover:bg-amber-100 transition-colors border border-amber-100"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete && onDelete(achievement._id)}
              disabled={isDeleting}
              className={`flex-1 px-3 py-2 text-xs font-semibold rounded-lg transition-colors border ${isDeleting
                  ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                  : "bg-red-50 text-red-700 hover:bg-red-100 border-red-100"
                }`}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Detail View Modal Component
function DetailModal({ achievement, onClose }) {
  const [student, setStudent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStudent = async () => {
      try {
        const studentDbId = typeof achievement.stuID === 'string' ? achievement.stuID : achievement.stuID?._id;
        if (studentDbId) {
          const res = await studentService.getSingleStudent(studentDbId);
          setStudent(res.data);
        }
      } catch (err) {
        console.error("Error fetching student details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [achievement]);

  if (!achievement) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col relative z-10 animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div>
            {achievement.category && (
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded border border-green-100 uppercase tracking-tighter">
                  {achievement.category}
                </span>
              </div>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* Left Column: Student & Metadata */}
              <div className="lg:col-span-4 space-y-6">
                {/* Student Profile Card */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  {loading ? (
                    <div className="flex flex-col items-center py-4">
                      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                      <p className="text-xs text-slate-500 font-medium">Loading Student Profile...</p>
                    </div>
                  ) : student ? (
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-200">
                        {student.name?.firstName?.charAt(0) || student.name?.lastName?.charAt(0) || "?"}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 antialiased leading-tight">
                          {student.name?.firstName} {student.name?.lastName}
                        </h3>
                        <p className="text-blue-600 font-bold text-sm tracking-tight">{student.studentID}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded uppercase">{student.year}</span>
                          <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded uppercase">DIV {student.division}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-slate-400">Student Profile Not Found</p>
                    </div>
                  )}
                </div>

                {/* Success Card */}
                <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-100 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-4xl mb-3 drop-shadow-lg">
                      {achievement.achievementType === "Winner" ? "🏆" : achievement.achievementType === "Runner-up" ? "🥈" : "🏵️"}
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100 mb-1">Achievement Status</h4>
                    <p className="text-2xl font-black tracking-tight mb-4">{achievement.achievementType || "Participated"}</p>

                    {(achievement.issuedBy) && (
                      <div className="flex flex-col gap-2 items-center text-xs font-bold bg-black/10 rounded-2xl p-4">
                        <p className="text-emerald-100/70 uppercase text-[10px] tracking-widest">Organiser / Issued By</p>
                        <p className="text-center line-clamp-2">{achievement.issuedBy}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Level & Nature Info */}
                <div className="grid grid-cols-2 gap-3">
                  {achievement.level && (
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Level</p>
                      <p className="text-sm font-bold text-slate-900">{achievement.level}</p>
                    </div>
                  )}
                  {achievement.nature && (
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Nature</p>
                      <p className="text-sm font-bold text-slate-900">{achievement.nature}</p>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Previews & Details */}
              <div className="lg:col-span-8 flex flex-col gap-6">

                {/* Main Carousel / Grid for Pictures */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                    Media Gallery / Proofs
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Event Photo */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Event Photo</p>
                      <div className="bg-slate-100 rounded-2xl border aspect-[4/3] overflow-hidden group relative">
                        {achievement.photographs?.eventPhoto?.url ? (
                          <img src={achievement.photographs.eventPhoto.url} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" alt="Event" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold italic">No Photo</div>
                        )}
                      </div>
                    </div>

                    {/* Certificate / News Clip */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Certificate / Report</p>
                      <div className="bg-slate-100 rounded-2xl border aspect-[4/3] overflow-hidden group relative">
                        {achievement.photographs?.certificate?.url ? (
                          achievement.photographs.certificate.url.toLowerCase().endsWith('.pdf') ? (
                            <iframe src={achievement.photographs.certificate.url} className="w-full h-full border-none" />
                          ) : (
                            <img src={achievement.photographs.certificate.url} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" alt="Certificate" />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold italic">No Document</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {achievement.description && (
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex-grow">
                    <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </span>
                      Story & Impact
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-sm antialiased font-medium italic">
                      "{achievement.description}"
                    </p>

                    <div className="grid grid-cols-2 mt-8 pt-8 border-t border-slate-200 pr-12">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Period</p>
                        <p className="text-sm font-bold text-slate-700">
                          {achievement.date?.from ? new Date(achievement.date.from).toLocaleDateString() : "N/A"}
                          {achievement.date?.to ? ` to ${new Date(achievement.date.to).toLocaleDateString()}` : ""}
                        </p>
                      </div>
                      {achievement.organizedBy && (
                        <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Organizer</p>
                          <p className="text-sm font-bold text-slate-700">{achievement.organizedBy}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 z-20">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-black rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}

// Form Modal Component (Add / Edit)
function AchievementFormModal({ isOpen, onClose, achievement, onSave }) {
  const [formData, setFormData] = useState({
    stuID: "",
    title: "",
    category: "Coding competitions",
    achievementType: "Participation",
    level: "",
    rank: "",
    issuedBy: "",
    dateFrom: "",
    dateTo: "",
    description: "",
  });

  const [files, setFiles] = useState({
    eventPhoto: null,
    certificate: null,
    course_certificate: null,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (achievement) {
        // Fix Privacy: Ensure we show human-readable studentID, not MongoDB _id
        const studentObj = achievement.student || achievement.stuID;
        setFormData({
          stuID: (typeof studentObj === "object" ? studentObj?.studentID : studentObj) || "",
          title: achievement.title || "",
          category: achievement.category || "Coding competitions",
          achievementType: achievement.achievementType || "Participation",
          level: achievement.level || "",
          rank: achievement.rank || "",
          issuedBy: achievement.issuedBy || "",
          dateFrom: (achievement.date?.from && !isNaN(new Date(achievement.date.from).getTime()))
            ? new Date(achievement.date.from).toISOString().split('T')[0]
            : "",
          dateTo: (achievement.date?.to && !isNaN(new Date(achievement.date.to).getTime()))
            ? new Date(achievement.date.to).toISOString().split('T')[0]
            : "",
          description: achievement.description || "",
        });
      } else {
        setFormData({
          stuID: "",
          title: "",
          category: "Coding competitions",
          achievementType: "Participation",
          level: "",
          rank: "",
          issuedBy: "",
          dateFrom: "",
          dateTo: "",
          description: "",
        });
      }
      setFiles({
        eventPhoto: null,
        certificate: null,
        course_certificate: null,
      });
    }
  }, [isOpen, achievement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();

      // Append form fields
      data.append('studentId', formData.stuID);
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('achievementType', formData.achievementType);
      if (formData.level) data.append('level', formData.level);
      if (formData.rank) data.append('rank', formData.rank);
      data.append('issuedBy', formData.issuedBy);
      if (formData.description) data.append('description', formData.description);

      // Date object restructuring based on backend validation logic
      data.append('dateFrom', formData.dateFrom);
      data.append('dateTo', formData.dateTo);

      // Append files
      if (files.eventPhoto) data.append('eventPhoto', files.eventPhoto);
      if (files.certificate) data.append('certificate', files.certificate);
      if (files.course_certificate) data.append('course_certificate', files.course_certificate);

      if (achievement) {
        await achievementService.updateAchievement(achievement._id, data);
        toast.success("Achievement updated successfully!");
      } else {
        await achievementService.createAchievement(data);
        toast.success("Achievement added successfully!");
      }
      onSave(); // Refresh list
      onClose(); // Close modal
    } catch (err) {
      console.error("Error saving achievement:", err);
      // Improve Validation: Parse detailed messages from backend
      const errorMessage =
        err.response?.data?.errors?.map(e => e.message).join(", ") ||
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to save achievement.";
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="sticky top-0 z-10 p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">
            {achievement ? "Edit Achievement" : "Add New Achievement"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Student ID */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Student ID *</label>
              <input
                type="text"
                name="stuID"
                required
                value={formData.stuID}
                onChange={handleChange}
                placeholder="e.g. 2024COMP123"
                disabled={!!achievement} // Prevent editing student ID if updating
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-500"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Coding competitions">Coding Competitions</option>
                <option value="Academic Topper">Academic Topper</option>
                <option value="Committee">Committee</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
                <option value="Technical">Technical</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Achievement Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Type *</label>
              <select
                name="achievementType"
                value={formData.achievementType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Winner">Winner</option>
                <option value="Runner-up">Runner-up</option>
                <option value="Participation">Participation</option>
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Level</option>
                <option value="Department">Department</option>
                <option value="College">College</option>
                <option value="State">State</option>
                <option value="National">National</option>
                <option value="International">International</option>
              </select>
            </div>

            {/* Rank */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Rank/Position</label>
              <input
                type="text"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                placeholder="e.g. 1st, 2nd, Top 10"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Issued By */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Issued By / Organiser *</label>
              <input
                type="text"
                name="issuedBy"
                required
                value={formData.issuedBy}
                onChange={handleChange}
                placeholder="e.g. Google, CSI, College Name"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date (From) *</label>
                <input
                  type="date"
                  name="dateFrom"
                  required
                  value={formData.dateFrom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date (To) *</label>
                <input
                  type="date"
                  name="dateTo"
                  required
                  value={formData.dateTo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Event Photo */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Event Photo (Optional)
              </label>
              <input
                type="file"
                name="eventPhoto"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Certificate */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Event Certificate (Optional)
              </label>
              <input
                type="file"
                name="certificate"
                accept=".pdf, image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Course Certificate */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Course Certificate (For MOOCs/Courses)
              </label>
              <input
                type="file"
                name="course_certificate"
                accept=".pdf, image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

          </div>

          <div className="pt-6 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 focus:ring-2 focus:ring-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                "Save Achievement"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Admin Achievements Page Component
export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");

  // Applied Filters State (Snapshot for WYSIWYG)
  const [appliedFilters, setAppliedFilters] = useState({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [deletingId, setDeletingId] = useState(null);

  // Modal State
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [achievementToEdit, setAchievementToEdit] = useState(null);

  // Fetch achievements from backend when component loads or pagination changes
  useEffect(() => {
    fetchAchievements(currentPage);
  }, [currentPage, limit, appliedFilters]);

  const fetchAchievements = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        ...appliedFilters
      };
      const response = await achievementService.getAllAchievements(params);

      const data = response.data || [];
      const total = response.total || 0;
      const totalP = response.totalPages || 1;

      setAchievements(data);
      setTotalRecords(total);
      setTotalPages(totalP);
      if (page === 1) setCurrentPage(1);
      setError(null);
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setError("Failed to load achievements. Backend might not be running!");
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const params = {
        ...appliedFilters
      };

      const blob = await achievementService.exportAchievements(params);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Achievements_Export_${new Date().toLocaleDateString("en-IN")}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("Error exporting achievements:", err);
      toast.error("Failed to export achievements. Please try again.");
    }
  };

  const handleView = (achievement) => {
    setSelectedAchievement(achievement);
  };

  const handleCloseModal = () => {
    setSelectedAchievement(null);
  };

  const handleEdit = (achievement) => {
    setAchievementToEdit(achievement);
    setIsFormModalOpen(true);
  };

  const handleAddAchievement = () => {
    setAchievementToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?"))
      return;
    setDeletingId(id);
    try {
      await achievementService.deleteAchievement(id);
      fetchAchievements(currentPage);
      toast.success("Achievement deleted successfully!");
    } catch (err) {
      console.error("Error deleting achievement:", err);
      toast.error("Failed to delete achievement.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Manage Achievements
        </h1>
        <p className="text-slate-600 mt-2">
          Showing{" "}
          <span className="font-semibold text-blue-600">
            {totalRecords}
          </span>{" "}
          achievements
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[250px]">
            <input
              type="text"
              placeholder="e.g. Hackathon Winner, 2024COMP123, Smart India"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <p className="text-[11px] text-slate-500 mt-1.5 ml-1">
              <span className="font-semibold text-blue-600">Note:</span> Search box scans for Achievement Title, Issued By, and Student Name. For specific results, use dropdowns to filter by Category, Year, or Division.
            </p>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
          >
            <option value="">All Categories</option>
            <option value="Coding competitions">Coding Competitions</option>
            <option value="Academic Topper">Academic Topper</option>
            <option value="Committee">Committee</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Technical">Technical</option>
            <option value="Other">Other</option>
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
          >
            <option value="">All Types</option>
            <option value="Winner">🏆 Winner</option>
            <option value="Runner-up">🥈 Runner-up</option>
            <option value="Participation">Participation</option>
          </select>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
          >
            <option value="">All Years</option>
            <option value="FY">First Year (FY)</option>
            <option value="SY">Second Year (SY)</option>
            <option value="TY">Third Year (TY)</option>
          </select>

          {/* Division Filter */}
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
          >
            <option value="">All Divs</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="flex gap-3">
            <button
              onClick={() => {
                setAppliedFilters({
                  search: searchQuery || undefined,
                  category: selectedCategory || undefined,
                  type: selectedType || undefined,
                  year: selectedYear || undefined,
                  division: selectedDivision || undefined,
                });
                setCurrentPage(1);
              }}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Achievements
            </button>

            {(searchQuery || selectedCategory || selectedType || selectedYear || selectedDivision) && (
              <button
                onClick={() => {
                  setSearchQuery(""); setSelectedCategory(""); setSelectedType("");
                  setSelectedYear(""); setSelectedDivision("");
                }}
                className="px-4 py-2.5 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                Clear All
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition shadow-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Export
            </button>
            <button
              onClick={() => { setAchievementToEdit(null); setIsFormModalOpen(true); }}
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm transition flex items-center gap-2"
            >
              <span>+ Add Achievement</span>
            </button>
          </div>
        </div>
      </div>

      {/* Achievements Container */}
      <div className="min-h-[60vh]">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading achievements...</p>
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
        {!loading && !error && achievements.length === 0 && (
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-slate-600 text-lg font-medium">
              {searchQuery || selectedCategory || selectedType
                ? "No achievements match your filters."
                : "No achievements found yet."}
            </p>
          </div>
        )}

        {/* Achievements Grid - 4 columns for compact cards */}
        {!loading && !error && achievements.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement?._id}
                achievement={achievement}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deletingId === achievement?._id}
              />
            ))}
          </div>
        )}

        {/* Pagination Component */}
        {!loading && !error && achievements.length > 0 && (
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
      {selectedAchievement && (
        <DetailModal
          achievement={selectedAchievement}
          onClose={handleCloseModal}
        />
      )}

      {/* Form Modal (Add / Edit) */}
      <AchievementFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        achievement={achievementToEdit}
        onSave={() => fetchAchievements(currentPage)}
      />
    </main>
  );
}
