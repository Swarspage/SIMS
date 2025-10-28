import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call backend admin login API
      const response = await authService.adminLogin(form.email, form.password);

      console.log("Admin login response:", response); // Debug log

      // Store role in localStorage
      localStorage.setItem("role", "admin");

      // Try to extract and store token
      const token =
        response.token || response.data?.token || response.accessToken;
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token stored:", token);
      } else {
        console.warn("No token found in response");
        localStorage.setItem("token", "logged-in");
      }

      // Try to extract admin info
      const admin = response.admin || response.data?.admin || response.user;
      if (admin) {
        const adminId = admin._id || admin.id;
        if (adminId) {
          localStorage.setItem("adminId", adminId);
          console.log("Admin ID stored:", adminId);
        }
        if (admin.email) {
          localStorage.setItem("adminEmail", admin.email);
        }
      }

      // Navigate to admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      console.log("Admin login error:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Admin login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1B347D] to-[#171A1F] px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg"
        style={{ boxShadow: "0px 3px 6px 0 rgba(18,15,40,0.12)" }}
      >
        <div className="text-center mb-6">
          <h1
            className="text-3xl font-extrabold text-[#0b234f]"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
          >
            Admin Login
          </h1>
          <p
            className="mt-2 text-sm text-[#374151]"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.06)" }}
          >
            Enter your email and password to access admin panel.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#0f172a] mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B347D]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#0f172a] mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B347D]"
              required
            />
            <div className="text-right mt-1">
              <button
                type="button"
                className="text-sm text-[#1B347D] hover:underline focus:outline-none"
                onClick={() => console.log("forgot password")}
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4 items-center justify-end">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-lg font-semibold border border-[#1B347D] bg-white text-[#1B347D] transition-all duration-300 ease-in-out transform hover:bg-[#1B347D] hover:text-white hover:-translate-y-1"
          >
            Back to Home
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg text-white font-semibold bg-[#1B347D] transition-all duration-300 ease-in-out transform hover:bg-[#153066] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
