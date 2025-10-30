// import React, { useState } from "react";
// import { admissionService } from "../services/admissionService";

// export default function StudentAdmission() {
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [formData, setFormData] = useState({
//     rollno: "",
//     year: "",
//     div: "",
//     course: "",
//     admissionDate: "",
//     fees: "",
//     isFeesPaid: false,
//     isScholarshipApplied: false,
//     academicYear: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEdit = () => {
//     setIsEditMode(true);
//     setError("");
//     setSuccess("");
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       // Remove admissionDate - backend sets it automatically
//       const { admissionDate, ...dataToSend } = formData;

//       await admissionService.createAdmission(dataToSend);
//       setSuccess("Admission created successfully!");
//       setIsEditMode(false);

//       // Reset form
//       setFormData({
//         rollno: "",
//         year: "",
//         div: "",
//         course: "",
//         admissionDate: "",
//         fees: "",
//         isFeesPaid: false,
//         isScholarshipApplied: false,
//         academicYear: "",
//       });
//     } catch (err) {
//       console.error("Error saving admission:", err);

//       // Handle backend validation errors
//       if (err.response?.data?.errors) {
//         const errorMessages = err.response.data.errors
//           .map((e) => `${e.field}: ${e.message}`)
//           .join(", ");
//         setError(errorMessages);
//       } else {
//         setError(err.response?.data?.message || "Failed to save admission");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="p-6">
//       {/* Success/Error Messages */}
//       {success && (
//         <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
//           {success}
//         </div>
//       )}
//       {error && (
//         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
//           {error}
//         </div>
//       )}

//       {/* Edit and Save Buttons */}
//       <div className="flex justify-end gap-3 mb-6">
//         <button
//           onClick={handleEdit}
//           disabled={isEditMode}
//           className="px-6 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-[#0f172a] transition disabled:opacity-50"
//         >
//           Edit
//         </button>
//         <button
//           onClick={handleSave}
//           disabled={!isEditMode || loading}
//           className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition disabled:opacity-50"
//         >
//           {loading ? "Saving..." : "Save"}
//         </button>
//       </div>

//       {/* Admission Form */}
//       <div className="bg-[#1e293b] rounded-2xl p-8">
//         {/* Roll No, Year, Div, Course Row */}
//         <div className="grid grid-cols-4 gap-6 mb-6">
//           {/* Roll No */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Roll No
//             </label>
//             <input
//               type="text"
//               name="rollno"
//               value={formData.rollno}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="Roll No"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//             />
//           </div>

//           {/* Year */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Year
//             </label>
//             <div className="relative">
//               <select
//                 name="year"
//                 value={formData.year}
//                 onChange={handleChange}
//                 disabled={!isEditMode}
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//               >
//                 <option value="">Year</option>
//                 <option value="FY">First Year</option>
//                 <option value="SY">Second Year</option>
//                 <option value="TY">Third Year</option>
//               </select>
//               <svg
//                 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </div>
//           </div>

//           {/* Div */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Div
//             </label>
//             <input
//               type="text"
//               name="div"
//               value={formData.div}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="Div"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//             />
//           </div>

//           {/* Course */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Course
//             </label>
//             <div className="relative">
//               <select
//                 name="course"
//                 value={formData.course}
//                 onChange={handleChange}
//                 disabled={!isEditMode}
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//               >
//                 <option value="">Course</option>
//                 <option value="computer">Computer Engineering</option>
//                 <option value="mechanical">Mechanical Engineering</option>
//                 <option value="civil">Civil Engineering</option>
//                 <option value="electrical">Electrical Engineering</option>
//                 <option value="electronics">Electronics Engineering</option>
//                 <option value="it">Information Technology</option>
//                 <option value="aids">
//                   Artificial Intelligence and Data Science
//                 </option>
//               </select>
//               <svg
//                 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Admission Date and Status Row */}
//         <div className="grid grid-cols-2 gap-6 mb-6">
//           {/* Admission Date */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Admission Date
//             </label>
//             <div className="relative">
//               <input
//                 type="date"
//                 name="admissionDate"
//                 value={formData.admissionDate}
//                 onChange={handleChange}
//                 disabled={!isEditMode}
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//               />
//             </div>
//           </div>

//           {/* Status */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Status
//             </label>
//             <div className="relative">
//               <select
//                 disabled
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-gray-200 text-gray-600 cursor-not-allowed"
//               >
//                 <option value="">Status</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="suspended">Suspended</option>
//               </select>
//               <svg
//                 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Fees Amount, Fees Paid, Scholarship Row */}
//         <div className="grid grid-cols-3 gap-6 mb-6">
//           {/* Fees Amount */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Fees Amount
//             </label>
//             <input
//               type="number"
//               name="fees"
//               value={formData.fees}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="Fees Amount"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//             />
//           </div>

//           {/* Fees Paid */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Fees Paid
//             </label>
//             <div className="relative">
//               <select
//                 name="isFeesPaid"
//                 value={formData.isFeesPaid ? "full" : "pending"}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     isFeesPaid: e.target.value === "full",
//                   }))
//                 }
//                 disabled={!isEditMode}
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//               >
//                 <option value="">Fees Paid</option>
//                 <option value="full">Full Payment</option>
//                 <option value="partial">Partial Payment</option>
//                 <option value="pending">Pending</option>
//               </select>
//               <svg
//                 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </div>
//           </div>

//           {/* Scholarship Applied */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Scholarship Applied
//             </label>
//             <div className="relative">
//               <select
//                 name="isScholarshipApplied"
//                 value={formData.isScholarshipApplied ? "merit" : "none"}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     isScholarshipApplied: e.target.value !== "none",
//                   }))
//                 }
//                 disabled={!isEditMode}
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//               >
//                 <option value="">Scholarship Applied</option>
//                 <option value="merit">Merit Scholarship</option>
//                 <option value="financial">Financial Aid</option>
//                 <option value="sports">Sports Quota</option>
//                 <option value="none">None</option>
//               </select>
//               <svg
//                 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Academic Year */}
//         <div>
//           <label className="block text-white text-sm font-medium mb-2">
//             Academic Year
//           </label>
//           <input
//             type="text"
//             name="academicYear"
//             value={formData.academicYear}
//             onChange={handleChange}
//             disabled={!isEditMode}
//             placeholder="Academic Year (Eg : 2024 - 2025)"
//             className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//           />
//         </div>
//       </div>
//     </main>
//   );
// }

import React, { useState } from "react";
import { admissionService } from "../services/admissionService";

export default function StudentAdmission() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    rollno: "",
    year: "",
    div: "",
    course: "",
    admissionDate: "",
    fees: "",
    isFeesPaid: false,
    isScholarshipApplied: false,
    academicYear: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Remove admissionDate - backend sets it automatically
      const { admissionDate, ...dataToSend } = formData;

      await admissionService.createAdmission(dataToSend);
      setSuccess("Admission created successfully!");
      setIsEditMode(false); // Disable form

      // Reset form
      setFormData({
        rollno: "",
        year: "",
        div: "",
        course: "",
        admissionDate: "",
        fees: "",
        isFeesPaid: false,
        isScholarshipApplied: false,
        academicYear: "",
      });
    } catch (err) {
      console.error("Error saving admission:", err);

      // Handle backend validation errors
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors
          .map((e) => `${e.field}: ${e.message}`)
          .join(", ");
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || "Failed to save admission");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      {/* Success/Error Messages */}
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Edit Button (Top Right) */}
      <div className="flex justify-end mb-6">
        {!isEditMode && (
          <button
            onClick={handleEdit}
            className="px-6 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-[#0f172a] transition"
          >
            Edit
          </button>
        )}
      </div>

      {/* Admission Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-[#1e293b] rounded-2xl p-8">
          {/* Roll No, Year, Div, Course Row */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {/* Roll No */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Roll No
              </label>
              <input
                type="text"
                name="rollno"
                value={formData.rollno}
                onChange={handleChange}
                disabled={!isEditMode}
                placeholder="Roll No"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                required
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Year
              </label>
              <div className="relative">
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                  required
                >
                  <option value="">Select Year</option>
                  <option value="FY">First Year</option>
                  <option value="SY">Second Year</option>
                  <option value="TY">Third Year</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Div */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Division
              </label>
              <input
                type="text"
                name="div"
                value={formData.div}
                onChange={handleChange}
                disabled={!isEditMode}
                placeholder="Div (e.g., A, B, C)"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                required
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Course
              </label>
              <div className="relative">
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                  required
                >
                  <option value="">Select Course</option>
                  <option value="computer">Computer Engineering</option>
                  <option value="mechanical">Mechanical Engineering</option>
                  <option value="civil">Civil Engineering</option>
                  <option value="electrical">Electrical Engineering</option>
                  <option value="electronics">Electronics Engineering</option>
                  <option value="it">Information Technology</option>
                  <option value="aids">
                    Artificial Intelligence and Data Science
                  </option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Admission Date and Status Row */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Admission Date */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Admission Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Optional - Backend will set automatically if not provided
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Status
              </label>
              <div className="relative">
                <select
                  disabled
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-gray-200 text-gray-600 cursor-not-allowed"
                >
                  <option value="">Status (Auto-generated)</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Status is managed by admin
              </p>
            </div>
          </div>

          {/* Fees Amount, Fees Paid, Scholarship Row */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Fees Amount */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Fees Amount (₹)
              </label>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                disabled={!isEditMode}
                placeholder="Fees Amount"
                min="0"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                required
              />
            </div>

            {/* Fees Paid */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Fees Paid
              </label>
              <div className="relative">
                <select
                  name="isFeesPaid"
                  value={formData.isFeesPaid ? "full" : "pending"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isFeesPaid: e.target.value === "full",
                    }))
                  }
                  disabled={!isEditMode}
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="full">Full Payment</option>
                  <option value="partial">Partial Payment</option>
                  <option value="pending">Pending</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Scholarship Applied */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Scholarship Applied
              </label>
              <div className="relative">
                <select
                  name="isScholarshipApplied"
                  value={formData.isScholarshipApplied ? "merit" : "none"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isScholarshipApplied: e.target.value !== "none",
                    }))
                  }
                  disabled={!isEditMode}
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                  required
                >
                  <option value="">Select Scholarship</option>
                  <option value="merit">Merit Scholarship</option>
                  <option value="financial">Financial Aid</option>
                  <option value="sports">Sports Quota</option>
                  <option value="none">None</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Academic Year */}
          <div className="mb-8">
            <label className="block text-white text-sm font-medium mb-2">
              Academic Year
            </label>
            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="Academic Year (e.g., 2024-2025)"
              pattern="\d{4}-\d{4}"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Format: YYYY-YYYY (e.g., 2024-2025)
            </p>
          </div>

          {/* Submit Button (Bottom of Form) - Only shows in Edit Mode */}
          {isEditMode && (
            <div className="flex justify-center gap-4 pt-4 border-t border-gray-600">
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(false);
                  setError("");
                  setSuccess("");
                }}
                className="px-8 py-3 rounded-lg bg-gray-500 text-white text-sm font-medium hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
