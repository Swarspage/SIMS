/**
 * CardGridSkeleton
 * Mirrors pages that show a grid of data-cards:
 *   – Filter bar / search
 *   – Responsive grid of cards (achievements, activities, internships,
 *     placements, semester info)
 * Used by: AdminAchievement, AdminActivity, AdminInternship, AdminPlacement,
 *           AdminSemesterInfo, StudentAchievements, StudentActivity,
 *           StudentInternship, StudentPlacement, StudentSemesterInfo
 */
export default function CardGridSkeleton({ cardCount = 9 }) {
  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">
      {/* Page header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="skeleton h-8 w-52 mb-2" />
          <div className="skeleton h-4 w-72" />
        </div>
        <div className="skeleton h-10 w-36 rounded-lg" />
      </div>

      {/* Filter / search bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <div className="skeleton h-10 flex-1 min-w-[160px] max-w-sm rounded-lg" />
          <div className="skeleton h-10 w-36 rounded-lg" />
          <div className="skeleton h-10 w-36 rounded-lg" />
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: cardCount }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          >
            {/* Card image / colour strip */}
            <div className="skeleton h-2 w-full rounded-none" />

            <div className="p-5">
              {/* Badge + date row */}
              <div className="flex items-center justify-between mb-4">
                <div className="skeleton h-5 w-20 rounded-full" />
                <div className="skeleton h-4 w-24" />
              </div>

              {/* Title */}
              <div className="skeleton h-5 w-3/4 mb-2" />
              <div className="skeleton h-4 w-full mb-1.5" />
              <div className="skeleton h-4 w-5/6 mb-4" />

              {/* Meta row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="skeleton-circle w-8 h-8" />
                <div>
                  <div className="skeleton h-3.5 w-28 mb-1" />
                  <div className="skeleton h-3 w-20" />
                </div>
              </div>

              {/* Footer / actions */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <div className="skeleton h-4 w-24" />
                <div className="flex gap-2">
                  <div className="skeleton h-8 w-8 rounded-lg" />
                  <div className="skeleton h-8 w-8 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
