/**
 * GeneralPageSkeleton
 * Generic fallback for pages that do not fit other categories
 * (Home, MeetDevelopers, VerifyEmail, etc.)
 */
export default function GeneralPageSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      {/* Hero block */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8 mb-8">
        <div className="skeleton h-8 w-64 mb-4" />
        <div className="skeleton h-4 w-full mb-2" />
        <div className="skeleton h-4 w-5/6 mb-6" />
        <div className="flex gap-3">
          <div className="skeleton h-10 w-36 rounded-lg" />
          <div className="skeleton h-10 w-28 rounded-lg" />
        </div>
      </div>

      {/* Content sections */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-white border border-slate-200 shadow-sm p-6 mb-6"
        >
          <div className="skeleton h-6 w-40 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="rounded-lg border border-slate-100 p-4">
                <div className="skeleton-circle w-10 h-10 mb-3" />
                <div className="skeleton h-4 w-24 mb-2" />
                <div className="skeleton h-3 w-full mb-1" />
                <div className="skeleton h-3 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
