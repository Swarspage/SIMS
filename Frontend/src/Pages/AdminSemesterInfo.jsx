import React, { useState, useEffect } from "react";
import { semInfoService } from "../services/semInfoService";
import { toast } from "react-toastify";
import Pagination from "../Components/Common/Pagination";

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function DetailModal({ record, onClose }) {
    if (!record) return null;
    const totalScore = record.marks?.reduce((s, m) => s + m.score, 0) ?? 0;
    const totalOutOf = record.marks?.reduce((s, m) => s + m.outOf, 0) ?? 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Semester {record.semester} Details</h2>
                        <p className="text-xs text-slate-500 mt-0.5">ID: {record._id}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Summary row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: "Semester", value: `Sem ${record.semester}` },
                            { label: "Attendance", value: `${record.attendance}%`, color: record.attendance >= 75 ? "text-green-600" : "text-red-600" },
                            { label: "Total Marks", value: `${totalScore}/${totalOutOf}` },
                            { label: "KTs", value: record.kts?.length || 0, color: record.kts?.length ? "text-orange-600" : "text-green-600" },
                        ].map(({ label, value, color }) => (
                            <div key={label} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</p>
                                <p className={`text-lg font-bold ${color || "text-slate-800"}`}>{value}</p>
                            </div>
                        ))}
                    </div>
                    {record.isDefaulter && (
                        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2 text-red-700 text-sm font-semibold">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            This student is marked as a defaulter
                        </div>
                    )}

                    {/* KTs */}
                    {record.kts?.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">KT Subjects</p>
                            <div className="flex flex-wrap gap-2">
                                {record.kts.map((kt, i) => (
                                    <span key={i} className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full border border-orange-200">
                                        {kt}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Marks Table */}
                    {record.marks?.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Subject Marks</p>
                            <div className="rounded-xl border border-slate-200 overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Subject</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Score</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Out Of</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">%</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {record.marks.map((m, i) => {
                                            const pct = m.outOf > 0 ? ((m.score / m.outOf) * 100).toFixed(1) : "N/A";
                                            return (
                                                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                                                    <td className="px-4 py-3 font-medium text-slate-800">{m.subject}</td>
                                                    <td className="px-4 py-3 text-center text-slate-700">{m.score}</td>
                                                    <td className="px-4 py-3 text-center text-slate-700">{m.outOf}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className={`font-semibold ${pct >= 40 ? "text-green-600" : "text-red-600"}`}>{pct}%</span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot className="bg-blue-50">
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-slate-800">Total</td>
                                            <td className="px-4 py-3 text-center font-bold text-slate-800">{totalScore}</td>
                                            <td className="px-4 py-3 text-center font-bold text-slate-800">{totalOutOf}</td>
                                            <td className="px-4 py-3 text-center font-bold text-blue-700">
                                                {totalOutOf > 0 ? ((totalScore / totalOutOf) * 100).toFixed(1) : "N/A"}%
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
                    <button onClick={onClose} className="px-5 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Semester Card ────────────────────────────────────────────────────────────
function SemInfoCard({ record, onView, onDelete, onEdit }) {
    const stuId = typeof record?.stuID === "string" ? record.stuID : record?.stuID?.studentID || "N/A";
    const totalScore = record.marks?.reduce((s, m) => s + m.score, 0) ?? 0;
    const totalOutOf = record.marks?.reduce((s, m) => s + m.outOf, 0) ?? 0;

    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Semester {record.semester}</span>
                    {record.isDefaulter && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full border border-red-200">Defaulter</span>
                    )}
                </div>

                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">{stuId}</p>

                <div className="mb-3">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${record.attendance >= 75 ? "bg-green-500" : "bg-red-500"}`}
                                style={{ width: `${Math.min(record.attendance, 100)}%` }}
                            />
                        </div>
                        <span className={`text-sm font-bold ${record.attendance >= 75 ? "text-green-600" : "text-red-600"}`}>
                            {record.attendance}%
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Attendance</p>
                </div>

                <div className="text-xs text-slate-600 mb-3 pb-3 border-b border-slate-100">
                    <span className="font-semibold">Marks:</span> {totalScore}/{totalOutOf}
                    {totalOutOf > 0 && <span className="ml-1 text-slate-400">({((totalScore / totalOutOf) * 100).toFixed(1)}%)</span>}
                </div>

                {record.kts?.length > 0 ? (
                    <p className="text-xs text-orange-600 font-medium mb-3">⚠ {record.kts.length} KT{record.kts.length > 1 ? "s" : ""}</p>
                ) : (
                    <p className="text-xs text-green-600 font-medium mb-3">✓ No KTs</p>
                )}

                <div className="mt-auto space-y-2">
                    <button
                        onClick={() => onView(record)}
                        className="w-full px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        View Details
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => onEdit && onEdit(record)}
                            className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg hover:bg-amber-100 transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(record._id)}
                            className="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Form Modal Component (Add / Edit) ────────────────────────────────────────────────────────
function SemInfoFormModal({ isOpen, onClose, record, onSave }) {
    const [formData, setFormData] = useState({
        studentId: "",
        semester: "",
        attendance: "",
        kts: [],
        marks: [],
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (record) {
                setFormData({
                    studentId: typeof record.stuID === "string" ? record.stuID : record.stuID?.studentID || "",
                    semester: record.semester || "",
                    attendance: record.attendance || "",
                    kts: record.kts ? [...record.kts] : [],
                    marks: record.marks ? [...record.marks] : [],
                });
            } else {
                setFormData({
                    studentId: "",
                    semester: "",
                    attendance: "",
                    kts: [],
                    marks: [],
                });
            }
        }
    }, [isOpen, record]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // KT Handlers
    const handleAddKt = () => {
        setFormData((prev) => ({ ...prev, kts: [...prev.kts, ""] }));
    };
    const handleKtChange = (index, value) => {
        const newKts = [...formData.kts];
        newKts[index] = value;
        setFormData((prev) => ({ ...prev, kts: newKts }));
    };
    const handleRemoveKt = (index) => {
        const newKts = formData.kts.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, kts: newKts }));
    };

    // Marks Handlers
    const handleAddMark = () => {
        setFormData((prev) => ({ ...prev, marks: [...prev.marks, { subject: "", score: "", outOf: "" }] }));
    };
    const handleMarkChange = (index, field, value) => {
        const newMarks = [...formData.marks];
        newMarks[index][field] = value;
        setFormData((prev) => ({ ...prev, marks: newMarks }));
    };
    const handleRemoveMark = (index) => {
        const newMarks = formData.marks.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, marks: newMarks }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Clean payload
            const payload = {
                semester: Number(formData.semester),
                attendance: Number(formData.attendance),
                kts: formData.kts.filter(kt => kt.trim() !== ""),
                marks: formData.marks.filter(m => m.subject.trim() !== "").map(m => ({
                    subject: m.subject.trim(),
                    score: Number(m.score),
                    outOf: Number(m.outOf)
                }))
            };

            if (!record) { payload.studentId = formData.studentId; }

            if (record) {
                await semInfoService.updateSemInfo(record._id, payload);
                toast.success("Semester Info updated successfully!");
            } else {
                await semInfoService.addSemInfo(payload);
                toast.success("Semester Info added successfully!");
            }
            onSave();
            onClose();
        } catch (err) {
            console.error("Error saving SemInfo:", err);
            toast.error(err.response?.data?.message || err.response?.data?.errors?.[0]?.message || "Failed to save record.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slideUp">
                <div className="sticky top-0 z-10 p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-900">
                        {record ? "Edit Semester Info" : "Add Semester Info"}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Basic Info */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4 border-b pb-2">Basic Info</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Student ID *</label>
                                <input
                                    type="text"
                                    name="studentId"
                                    required={!record}
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    placeholder="e.g. 2024COMP123"
                                    disabled={!!record} // Prevent editing student ID if updating
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Semester (1-8) *</label>
                                <input
                                    type="number"
                                    name="semester"
                                    required
                                    min="1"
                                    max="8"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Attendance (%) *</label>
                                <input
                                    type="number"
                                    name="attendance"
                                    required
                                    min="0"
                                    max="100"
                                    value={formData.attendance}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Subject Marks Array Builder */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Subject Marks</h3>
                            <button type="button" onClick={handleAddMark} className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded hover:bg-blue-200">
                                + Add Subject
                            </button>
                        </div>
                        {formData.marks.length === 0 ? (
                            <p className="text-sm text-slate-500 italic">No subjects added yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {formData.marks.map((mark, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            placeholder="Subject Name"
                                            required
                                            value={mark.subject}
                                            onChange={(e) => handleMarkChange(index, "subject", e.target.value)}
                                            className="flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Score"
                                            required
                                            min="0"
                                            value={mark.score}
                                            onChange={(e) => handleMarkChange(index, "score", e.target.value)}
                                            className="w-24 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                        <span className="text-slate-500 font-bold">/</span>
                                        <input
                                            type="number"
                                            placeholder="Out Of"
                                            required
                                            min="1"
                                            value={mark.outOf}
                                            onChange={(e) => handleMarkChange(index, "outOf", e.target.value)}
                                            className="w-24 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button type="button" onClick={() => handleRemoveMark(index)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* KTs Array Builder */}
                    <div className="p-4 bg-orange-50/50 border border-orange-200 rounded-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-orange-800 uppercase tracking-widest">Active KTs</h3>
                            <button type="button" onClick={handleAddKt} className="px-3 py-1.5 bg-orange-200 text-orange-800 text-xs font-bold rounded hover:bg-orange-300">
                                + Add KT
                            </button>
                        </div>
                        {formData.kts.length === 0 ? (
                            <p className="text-sm text-slate-500 italic">No KTs recorded.</p>
                        ) : (
                            <div className="space-y-3">
                                {formData.kts.map((kt, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            placeholder="Failed Subject Name"
                                            required
                                            value={kt}
                                            onChange={(e) => handleKtChange(index, e.target.value)}
                                            className="flex-1 px-3 py-2 text-sm border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                        />
                                        <button type="button" onClick={() => handleRemoveKt(index)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
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
                            disabled={loading}
                            className="px-6 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Saving...
                                </>
                            ) : (
                                "Save Semester Info"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Main Admin Component ─────────────────────────────────────────────────────
export default function AdminSemesterInfo() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSem, setSelectedSem] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedDivision, setSelectedDivision] = useState("");
    const [filterDefaulter, setFilterDefaulter] = useState(""); // "" or "true"
    const [minAttendance, setMinAttendance] = useState("");
    const [maxAttendance, setMaxAttendance] = useState("");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    const [selectedItem, setSelectedItem] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [recordToEdit, setRecordToEdit] = useState(null);

    useEffect(() => {
        fetchAll(currentPage);
    }, [currentPage, limit]);

    const fetchAll = async (page = 1) => {
        setLoading(true);
        try {
            const params = {
                page,
                limit,
                search: searchQuery || undefined,
                semester: selectedSem || undefined,
                year: selectedYear || undefined,
                division: selectedDivision || undefined,
                isDefaulter: filterDefaulter || undefined,
                minAttendance: minAttendance || undefined,
                maxAttendance: maxAttendance || undefined,
            };
            const response = await semInfoService.getAllSemInfo(params);
            
            const data = response.data || [];
            const total = response.total || 0;
            const totalP = response.totalPages || 1;

            setRecords(data);
            setTotalRecords(total);
            setTotalPages(totalP);
            if (page === 1) setCurrentPage(1);
            setError(null);
        } catch (err) {
            console.error("Error fetching semester info:", err);
            setError("Failed to load semester info. Backend might not be running!");
            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this semester record?")) return;
        try {
            await semInfoService.deleteSemInfo(id);
            fetchAll(currentPage);
        } catch {
            toast.error("Failed to delete record.");
        }
    };

    const handleExport = async () => {
        if (filtered.length === 0) { toast.warn("No data to export."); return; }
        try {
            setLoading(true);
            const params = {
                search: searchQuery || undefined,
                semester: selectedSem || undefined,
                year: selectedYear || undefined,
                division: selectedDivision || undefined,
                isDefaulter: filterDefaulter || undefined,
                minAttendance: minAttendance || undefined,
                maxAttendance: maxAttendance || undefined,
            };

            const blob = await semInfoService.exportSemInfo(params);

            // Create download link
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement("a");
            a.href = url;
            a.download = `SemesterInfo_Export_${new Date().toLocaleDateString("en-IN").replace(/\//g, "-")}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success("✅ Exported successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Export failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // We now use server-side filtering, so filtered is just the records list
    const filtered = records;

    return (
        <main className="p-8 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Semester Information</h1>
                <p className="text-slate-600 mt-2">
                    Showing <span className="font-semibold text-blue-600">{totalRecords}</span> records
                </p>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
                <div className="flex flex-wrap gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Search by student ID or semester..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white flex-1 min-w-[240px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={selectedSem}
                        onChange={(e) => setSelectedSem(e.target.value)}
                        className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                        <option value="">All Semesters</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                            <option key={s} value={s}>Semester {s}</option>
                        ))}
                    </select>

                    {/* Year Filter */}
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                        <option value="">All Years</option>
                        <option value="FE">First Year (FE)</option>
                        <option value="SE">Second Year (SE)</option>
                        <option value="TE">Third Year (TE)</option>
                        <option value="BE">Final Year (BE)</option>
                    </select>

                    {/* Division Filter */}
                    <select
                        value={selectedDivision}
                        onChange={(e) => setSelectedDivision(e.target.value)}
                        className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                        <option value="">All Divs</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>

                    {/* Defaulter Toggle */}
                    <select
                        value={filterDefaulter}
                        onChange={(e) => setFilterDefaulter(e.target.value)}
                        className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                        <option value="">All Students</option>
                        <option value="true">Defaulters Only</option>
                    </select>

                    {/* Attendance Range */}
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min %"
                            min="0"
                            max="100"
                            value={minAttendance}
                            onChange={(e) => setMinAttendance(e.target.value)}
                            className="w-20 px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                        />
                        <span className="text-slate-400 font-medium">-</span>
                        <input
                            type="number"
                            placeholder="Max %"
                            min="0"
                            max="100"
                            value={maxAttendance}
                            onChange={(e) => setMaxAttendance(e.target.value)}
                            className="w-20 px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => fetchAll(1)}
                            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Find Records
                        </button>

                        {(searchQuery || selectedSem || selectedYear || selectedDivision || filterDefaulter || minAttendance || maxAttendance) && (
                            <button
                                onClick={() => {
                                    setSearchQuery(""); setSelectedSem(""); setSelectedYear("");
                                    setSelectedDivision(""); setFilterDefaulter("");
                                    setMinAttendance(""); setMaxAttendance("");
                                }}
                                className="px-4 py-2.5 rounded-lg border border-red-300 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                Clear Filters
                            </button>
                        )}
                    </div>

                    <button
                        onClick={handleExport}
                        className="px-6 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm ml-auto flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export to Excel
                    </button>
                    <button
                        onClick={() => { setRecordToEdit(null); setIsFormModalOpen(true); }}
                        className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm flex items-center">
                        + Add Semester Info
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="min-h-[60vh]">
                {loading && (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                            <p className="text-slate-600">Loading semester info...</p>
                        </div>
                    </div>
                )}
                {error && !loading && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">{error}</div>
                )}
                {!loading && !error && filtered.length === 0 && (
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-16 text-center">
                        <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <p className="text-slate-600 text-lg font-medium">
                            {searchQuery || selectedSem ? "No records match your filters." : "No semester info recorded yet."}
                        </p>
                    </div>
                )}
                {!loading && !error && filtered.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filtered.map((r) => (
                            <SemInfoCard key={r._id} record={r} onView={setSelectedItem} onEdit={(rec) => { setRecordToEdit(rec); setIsFormModalOpen(true); }} onDelete={handleDelete} />
                        ))}
                    </div>
                )}

                {/* Pagination Component */}
                {!loading && !error && filtered.length > 0 && (
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

            {selectedItem && <DetailModal record={selectedItem} onClose={() => setSelectedItem(null)} />}

            <SemInfoFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                record={recordToEdit}
                onSave={() => fetchAll(currentPage)}
            />
        </main>
    );
}
