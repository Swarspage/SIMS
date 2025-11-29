import React, { useState } from "react";

export default function AdminSignUp() {
  const [form, setForm] = useState({
    name: "",
    adminId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.adminId.trim()) err.adminId = "Admin ID is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Enter a valid email";
    if (!form.password) err.password = "Password is required";
    if (form.password !== form.confirmPassword)
      err.confirmPassword = "Passwords do not match";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      setSubmitting(true);
      // Fake submit (replace with real API call)
      setTimeout(() => {
        setSubmitting(false);
        alert(
          "Registered successfully (demo). Replace with real submit logic."
        );
        setForm({
          name: "",
          adminId: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }, 900);
    }
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
        className="w-full max-w-xl bg-white rounded-[28px] p-8 md:p-10 shadow-md"
        style={{ boxShadow: "0px 3px 6px 0px rgba(18,15,40,0.12)" }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Sign Up
        </h2>
        <p
          className="mt-2 text-sm md:text-base text-gray-600"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.12)" }}
        >
          Register your ID and password to access your account.
        </p>

        {/* Name */}
        <div className="mt-6">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B347D] ${
              errors.name ? "ring-2 ring-red-200" : ""
            }`}
            placeholder="Your full name"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Admin ID + Email side-by-side */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="adminId"
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
              placeholder="Admin ID"
              aria-invalid={!!errors.adminId}
            />
            {errors.adminId && (
              <p className="mt-1 text-xs text-red-600">{errors.adminId}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="email"
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
        </div>

        {/* Passwords */}
        <div className="mt-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="password"
          >
            Password
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
            placeholder="Enter password"
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="mt-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="confirmPassword"
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
            placeholder="Re-enter password"
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg text-white font-semibold bg-[#1B347D] transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg disabled:opacity-60"
          >
            {submitting ? "Registering..." : "Register"}
          </button>

          <button
            type="button"
            onClick={() =>
              alert("Go to login — replace with router/link in your app.")
            }
            className="w-full py-3 rounded-lg font-semibold border-2 border-[#1B347D] bg-white text-[#1B347D] transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#1B347D] hover:text-white"
          >
            Login
          </button>
        </div>

        {/* Small footer */}
        <p className="mt-4 text-xs text-gray-500">
          By registering you agree to our terms and privacy policy.
        </p>
      </form>
    </div>
  );
}
