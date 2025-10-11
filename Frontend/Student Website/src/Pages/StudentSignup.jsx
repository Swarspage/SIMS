import React, { useState } from "react";

export default function StudentSignUp() {
  const [form, setForm] = useState({
    firstName: "",
    fatherName: "",
    lastName: "",
    motherName: "",
    studentId: "",
    enrollmentNo: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // purely UI component — hookup your submit logic here
    console.log("register", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1B347D] to-[#171A1F] px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white rounded-3xl p-8 md:p-12 shadow-lg"
        style={{
          boxShadow: "0px 3px 6px 0 rgba(18,15,40,0.12)",
        }}
      >
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1
            className="text-3xl md:text-4xl font-extrabold text-[#0b234f]"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.12)" }}
          >
            Sign Up
          </h1>
          <p
            className="mt-2 text-sm md:text-base text-[#334155]"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.04)" }}
          >
            Register yourself and password to access your account.
          </p>
        </div>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Row 1 */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#0f172a] mb-2">
              First Name
            </label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="John"
              className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B347D]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#0f172a] mb-2">
              Father Name
            </label>
            <input
              name="fatherName"
              value={form.fatherName}
              onChange={handleChange}
              placeholder="Ramesh"
              className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B347D]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#0f172a] mb-2">
              Last Name
            </label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B347D]"
            />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#0f172a] mb-2">
              Mother Name
            </label>
            <input
              name="motherName"
              value={form.motherName}
              onChange={handleChange}
              placeholder="Sita"
              className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B347D]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#0f172a] mb-2">
              Student Id
            </label>
            <input
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              placeholder="STU001"
              className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B347D]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#0f172a] mb-2">
              Enrollment Number
            </label>
            <input
              name="enrollmentNo"
              value={form.enrollmentNo}
              onChange={handleChange}
              placeholder="ENR2025XXXX"
              className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B347D]"
            />
          </div>

          {/* Row 3 - Email + Phone (phone spans 2 cols on md) */}
          <div className="flex flex-col md:col-span-1">
            <label className="text-sm font-medium text-[#0f172a] mb-2">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@email.com"
              type="email"
              className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B347D]"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-[#0f172a] mb-2">
              Phone Number
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 91234 56789"
              type="tel"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B347D]"
            />
          </div>

          {/* Row 4 - Passwords (span full width and use 2 columns layout) */}
          <div className="flex flex-col md:col-span-1">
            <label className="text-sm font-medium text-[#0f172a] mb-2">
              Password
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B347D]"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-[#0f172a] mb-2">
              Password Confirm
            </label>
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder="Re-type password"
              className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B347D]"
            />
          </div>
        </div>

        {/* Password Validation */}
        <p className="text-xs text-red-600 mt-3">
          Password should contain 8 character (1Capital, 1Number, 1Special char)
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col md:flex-row items-center gap-4 justify-end">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg text-white font-semibold bg-[#1B347D] transition-all duration-300 ease-in-out transform hover:bg-[#153066] hover:-translate-y-1"
          >
            Register
          </button>

          <button
            type="button"
            onClick={() => console.log("goto login")}
            className="px-6 py-2 rounded-lg font-semibold border border-[#1B347D] bg-white text-[#1B347D] transition-all duration-300 ease-in-out transform hover:bg-[#1B347D] hover:text-white hover:-translate-y-1"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
