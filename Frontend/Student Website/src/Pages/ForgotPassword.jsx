import React, { useState, useRef } from "react";

export default function ForgotPassword({ onLogin } = {}) {
  const [form, setForm] = useState({ adminId: "", email: "", otp: "" });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const otpRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validateContact = () => {
    const err = {};
    if (!form.adminId.trim()) err.adminId = "Admin ID is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Enter a valid email";
    return err;
  };

  const handleSendOtp = (e) => {
    e?.preventDefault();
    const v = validateContact();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    // show OTP input immediately and simulate sending OTP
    setOtpSent(true);
    setSending(true);
    // focus will be set after sending simulation completes
    setTimeout(() => {
      setSending(false);
      if (otpRef.current) otpRef.current.focus();
    }, 900);
  };

  const handleVerifyOtp = (e) => {
    e?.preventDefault();
    const err = {};
    if (!form.otp.trim()) err.otp = "Enter the OTP";
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      // In a real app you would verify OTP via API here
      alert("OTP verified (demo). Replace with real verification.");
      // Optionally reset form or redirect to reset-password
    }, 900);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(248.49deg, #1B347D 11.36%, #171A1F 60.72%)",
      }}
    >
      <div
        className="w-full max-w-md bg-white rounded-[28px] p-8 md:p-10"
        style={{ boxShadow: "0px 3px 6px 0px rgba(18,15,40,0.12)" }}
      >
        <h2
          className="text-2xl md:text-3xl font-bold text-gray-900"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
        >
          Forget Password
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your Admin ID and email to receive an OTP.
        </p>

        <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="adminId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Admin ID
            </label>
            <input
              id="adminId"
              name="adminId"
              value={form.adminId}
              onChange={handleChange}
              className={`w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B347D] ${
                errors.adminId ? "ring-2 ring-red-200" : ""
              }`}
              placeholder="Your admin id"
              aria-invalid={!!errors.adminId}
            />
            {errors.adminId && (
              <p className="mt-1 text-xs text-red-600">{errors.adminId}</p>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B347D] ${
                errors.email ? "ring-2 ring-red-200" : ""
              }`}
              placeholder="email@domain.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Verify button */}
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={sending}
              className="w-full md:w-2/3 py-3 rounded-lg text-white font-semibold bg-[#1B347D] transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg disabled:opacity-60"
            >
              {sending ? "Sending..." : otpSent ? "Resend OTP" : "Verify"}
            </button>
          </div>

          {/* OTP field shown after Verify clicked */}
          {otpSent && (
            <div className="mt-4">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                value={form.otp}
                onChange={handleChange}
                className={`w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B347D] ${
                  errors.otp ? "ring-2 ring-red-200" : ""
                }`}
                placeholder="Enter one-time password"
                aria-invalid={!!errors.otp}
              />
              {errors.otp && (
                <p className="mt-1 text-xs text-red-600">{errors.otp}</p>
              )}

              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifying}
                  className="w-full md:w-2/3 py-3 rounded-lg text-white font-semibold bg-[#1B347D] transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg disabled:opacity-60"
                >
                  {verifying ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </div>
          )}

          {/* Login button */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() =>
                onLogin
                  ? onLogin()
                  : alert("Go to login — replace with router/link in your app.")
              }
              className="w-full md:w-2/3 py-3 rounded-lg text-white font-semibold bg-[#1B347D] transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-4 text-xs text-gray-500">
          Need help? Contact your administrator.
        </p>
      </div>
    </div>
  );
}
