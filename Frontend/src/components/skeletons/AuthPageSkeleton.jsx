/**
 * AuthPageSkeleton
 * Mirrors login / signup / forgot-password pages:
 *   – Centred card with logo, inputs, button
 * Used by: LoginPage, AdminLoginPage, DivisionInchargeLogin,
 *           SignupPage, ForgotPasswordPage, ResetPasswordPage
 */
export default function AuthPageSkeleton() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="skeleton-circle w-16 h-16" />
        </div>

        {/* Title + subtitle */}
        <div className="text-center mb-8">
          <div className="skeleton h-7 w-40 mx-auto mb-3" />
          <div className="skeleton h-4 w-56 mx-auto" />
        </div>

        {/* Form fields */}
        <div className="space-y-5 mb-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton h-3.5 w-20 mb-2" />
              <div className="skeleton h-11 w-full rounded-lg" />
            </div>
          ))}
        </div>

        {/* Submit button */}
        <div className="skeleton h-11 w-full rounded-lg mb-4" />

        {/* Footer link */}
        <div className="skeleton h-4 w-48 mx-auto" />
      </div>
    </div>
  );
}
