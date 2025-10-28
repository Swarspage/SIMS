import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ studentId: "", password: "" });
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
      // Call backend API
      const response = await authService.login(form.studentId, form.password);

      console.log("Login response:", response); // Debug log

      // Store role in localStorage for protected routes
      localStorage.setItem("role", "student");

      // Try to extract and store token from various possible locations
      const token =
        response.token || response.data?.token || response.accessToken;
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token stored:", token);
      } else {
        console.warn("No token found in response");
        // Store a placeholder for now to allow navigation
        localStorage.setItem("token", "logged-in");
      }

      // Try to extract student info
      const student =
        response.student || response.data?.student || response.user;
      if (student) {
        const studentId = student._id || student.id;
        if (studentId) {
          localStorage.setItem("studentId", studentId);
          console.log("Student ID stored:", studentId);
        }
        if (student.name) {
          localStorage.setItem("studentName", student.name);
        }
      }

      // Navigate to student dashboard
      navigate("/student/dashboard");
    } catch (err) {
      console.log("Login error:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Login failed. Please try again."
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
            Login
          </h1>
          <p
            className="mt-2 text-sm text-[#374151]"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.06)" }}
          >
            Enter your ID and password to access your account.
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
              htmlFor="studentId"
              className="block text-sm font-medium text-[#0f172a] mb-1"
            >
              Student ID
            </label>
            <input
              id="studentId"
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              type="text"
              placeholder="STU001"
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
            onClick={() => navigate("/student/signup")}
            className="px-5 py-2 rounded-lg font-semibold border border-[#1B347D] bg-white text-[#1B347D] transition-all duration-300 ease-in-out transform hover:bg-[#1B347D] hover:text-white hover:-translate-y-1"
          >
            Sign Up
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