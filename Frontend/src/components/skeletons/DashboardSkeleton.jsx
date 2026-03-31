/**
 * DashboardSkeleton
 * Mirrors AdminDashboard & StudentDashboard layout:
 *   – 5 stat cards
 *   – 2×2 chart panels (bar-chart rows)
 *   – Recent Activity list
 */
export default function DashboardSkeleton() {
  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">
      {/* Page title */}
      <div className="mb-8">
        <div className="skeleton h-8 w-56 mb-3" />
        <div className="skeleton h-4 w-72" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="skeleton h-3 w-24 mb-3" />
                <div className="skeleton h-8 w-16" />
              </div>
              <div className="skeleton-circle w-14 h-14 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* First chart row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
          >
            <div className="skeleton h-5 w-40 mb-6" />
            <div className="space-y-5">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j}>
                  <div className="flex justify-between mb-2">
                    <div className="skeleton h-3 w-28" />
                    <div className="skeleton h-3 w-8" />
                  </div>
                  <div className="skeleton h-2.5 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Second chart row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
          >
            <div className="skeleton h-5 w-40 mb-6" />
            <div className="space-y-5">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j}>
                  <div className="flex justify-between mb-2">
                    <div className="skeleton h-3 w-28" />
                    <div className="skeleton h-3 w-8" />
                  </div>
                  <div className="skeleton h-2.5 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity list */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="skeleton h-5 w-48" />
        </div>
        <div className="divide-y divide-slate-200">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-6 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="skeleton h-4 w-48 mb-3" />
                <div className="skeleton h-3 w-full mb-2" />
                <div className="skeleton h-3 w-3/4 mb-3" />
                <div className="flex gap-3">
                  <div className="skeleton h-5 w-20 rounded-full" />
                  <div className="skeleton h-5 w-24" />
                </div>
              </div>
              <div className="skeleton-circle w-10 h-10 flex-shrink-0" />
            </div>
          ))}
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-center">
          <div className="skeleton h-3 w-40" />
        </div>
      </div>
    </main>
  );
}
