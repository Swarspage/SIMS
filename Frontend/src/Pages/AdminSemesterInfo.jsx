import React, { useState, useEffect } from "react";
import { semInfoService } from "../services/semInfoService";
import * as XLSX from "xlsx";

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
function SemInfoCard({ record, onView, onDelete }) {
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
                    <button
                        onClick={() => onDelete(record._id)}
                        className="w-full px-3 py-2 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
                    >
                        Delete
                    </button>
                </div>
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
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const response = await semInfoService.getAllSemInfo();
            const data = response.data || response;
            setRecords(Array.isArray(data) ? data : []);
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
            fetchAll();
        } catch {
            alert("Failed to delete record");
        }
    };

    const handleExport = () => {
        if (filtered.length === 0) { alert("No data to export."); return; }
        try {
            const rows = filtered.map((r) => {
                const stuId = typeof r?.stuID === "string" ? r.stuID : r?.stuID?.studentID || "N/A";
                const totalScore = r.marks?.reduce((s, m) => s + m.score, 0) ?? 0;
                const totalOutOf = r.marks?.reduce((s, m) => s + m.outOf, 0) ?? 0;
                return {
                    "Student ID": stuId,
                    Semester: r.semester,
                    "Attendance (%)": r.attendance,
                    "Total Score": totalScore,
                    "Total Out Of": totalOutOf,
                    "KTs": (r.kts || []).join(", ") || "None",
                    Defaulter: r.isDefaulter ? "Yes" : "No",
                    "Subjects & Marks": (r.marks || []).map((m) => `${m.subject}: ${m.score}/${m.outOf}`).join(" | "),
                };
            });

            const ws = XLSX.utils.json_to_sheet(rows);
            const colWidths = Object.keys(rows[0]).map((k) => ({
                wch: Math.max(k.length, ...rows.map((r) => (r[k] ? r[k].toString().length : 0))) + 2,
            }));
            ws["!cols"] = colWidths;

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Semester Info");
            XLSX.writeFile(wb, `SemesterInfo_Export_${new Date().toLocaleDateString("en-IN")}.xlsx`);
        } catch (err) {
            console.error(err);
            alert("Export failed. Please try again.");
        }
    };

    const filtered = records.filter((r) => {
        const stuId = (typeof r?.stuID === "string" ? r.stuID : r?.stuID?.studentID || "").toLowerCase();
        const matchSearch = !searchQuery || stuId.includes(searchQuery.toLowerCase()) || r.semester?.toString().includes(searchQuery);
        const matchSem = !selectedSem || r.semester?.toString() === selectedSem;
        return matchSearch && matchSem;
    });

    return (
        <main className="p-8 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Semester Information</h1>
                <p className="text-slate-600 mt-2">
                    Showing <span className="font-semibold text-blue-600">{filtered.length}</span> of{" "}
                    <span className="font-semibold text-slate-900">{records.length}</span> records
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

                    {(searchQuery || selectedSem) && (
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedSem(""); }}
                            className="px-4 py-2.5 rounded-lg border border-red-300 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition"
                        >
                            Clear
                        </button>
                    )}

                    <button
                        onClick={handleExport}
                        className="px-6 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm ml-auto flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export to Excel
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
                            <SemInfoCard key={r._id} record={r} onView={setSelectedItem} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </div>

            {selectedItem && <DetailModal record={selectedItem} onClose={() => setSelectedItem(null)} />}
        </main>
    );
}
