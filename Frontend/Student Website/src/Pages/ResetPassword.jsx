import React, { useState } from "react";

export default function ResetPassword({ onDone } = {}) {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!form.password.trim()) err.password = "Password is required";
    if (!form.confirmPassword.trim())
      err.confirmPassword = "Please confirm password";
    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    )
      err.confirmPassword = "Passwords do not match";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert("Password reset successfully (demo). Replace with real logic.");
      if (onDone) onDone();
      setForm({ password: "", confirmPassword: "" });
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
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-[28px] p-8 md:p-10"
        style={{ boxShadow: "0px 3px 6px 0px rgba(18,15,40,0.12)" }}
      >
        <h2
          className="text-2xl md:text-3xl font-bold text-gray-900"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
        >
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter and confirm your new password.
        </p>

        {/* Create Password */}
        <div className="mt-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Create Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B347D] ${
              errors.password ? "ring-2 ring-red-200" : ""
            }`}
            placeholder="Enter new password"
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B347D] ${
              errors.confirmPassword ? "ring-2 ring-red-200" : ""
            }`}
            placeholder="Re-enter new password"
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Done Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="w-full md:w-2/3 py-3 rounded-lg text-white font-semibold bg-[#1B347D] transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg disabled:opacity-60"
          >
            {submitting ? "Processing..." : "Done"}
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Make sure your new password is strong and secure.
        </p>
      </form>
    </div>
  );
}
