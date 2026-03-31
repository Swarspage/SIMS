/**
 * TablePageSkeleton
 * Mirrors pages that have:
 *   – A filter / search toolbar
 *   – A data table with rows
 * Used by: AdminStudentSection, AdminAdmission, AdminDivisionIncharge,
 *           StudentAdmission, StudentInformation
 */
export default function TablePageSkeleton() {
  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">
      {/* Page header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="skeleton h-8 w-52 mb-2" />
          <div className="skeleton h-4 w-64" />
        </div>
        <div className="skeleton h-10 w-32 rounded-lg" />
      </div>

      {/* Filter / search bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <div className="skeleton h-10 flex-1 min-w-[160px] max-w-xs rounded-lg" />
          <div className="skeleton h-10 w-36 rounded-lg" />
          <div className="skeleton h-10 w-36 rounded-lg" />
          <div className="skeleton h-10 w-28 rounded-lg" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table head */}
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 grid grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-3 w-full" />
          ))}
        </div>

        {/* Table rows */}
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="px-6 py-4 grid grid-cols-6 gap-4 items-center"
            >
              {/* Avatar + name cell */}
              <div className="flex items-center gap-3 col-span-2">
                <div className="skeleton-circle w-9 h-9 flex-shrink-0" />
                <div className="flex-1">
                  <div className="skeleton h-3.5 w-28 mb-1.5" />
                  <div className="skeleton h-2.5 w-20" />
                </div>
              </div>
              {/* Data cells */}
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="skeleton h-3.5 w-full" />
              ))}
              {/* Action cell */}
              <div className="flex gap-2 justify-end">
                <div className="skeleton h-8 w-8 rounded-lg" />
                <div className="skeleton h-8 w-8 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="skeleton h-3.5 w-32" />
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-8 w-8 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
