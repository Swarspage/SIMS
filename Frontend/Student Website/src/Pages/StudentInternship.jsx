// // import React from "react";

// // export default function StudentInternship() {
// //   return (
// //     <main className="p-6">
// //       {/* Edit and Save Buttons */}
// //       <div className="flex justify-end gap-3 mb-6">
// //         <button className="px-6 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-[#0f172a] transition">
// //           Edit
// //         </button>
// //         <button className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition">
// //           Save
// //         </button>
// //       </div>

// //       {/* Internship Form */}
// //       <div className="bg-[#1e293b] rounded-2xl p-8">
// //         {/* Student ID */}
// //         <div className="mb-6">
// //           <label className="block text-white text-sm font-medium mb-2">
// //             Student ID
// //           </label>
// //           <input
// //             type="text"
// //             placeholder="Student ID (Eg : 2023FHCO125)"
// //             className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
// //           />
// //         </div>

// //         {/* Company Name and Role Row */}
// //         <div className="grid grid-cols-2 gap-6 mb-6">
// //           {/* Company Name */}
// //           <div>
// //             <label className="block text-white text-sm font-medium mb-2">
// //               Company Name
// //             </label>
// //             <input
// //               name="companyName"
// //               type="text"
// //               placeholder="Company Name"
// //               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
// //             />
// //           </div>

// //           {/* Role */}
// //           <div>
// //             <label className="block text-white text-sm font-medium mb-2">
// //               Role
// //             </label>
// //             <input
// //               type="text"
// //               placeholder="Role"
// //               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
// //             />
// //           </div>
// //         </div>

// //         {/* Start Date, End Date, Duration Row */}
// //         <div className="grid grid-cols-3 gap-6 mb-6">
// //           {/* Start Date */}
// //           <div>
// //             <label className="block text-white text-sm font-medium mb-2">
// //               Start Date
// //             </label>
// //             <div className="relative">
// //               <input
// //                 type="date"
// //                 placeholder="DD/MM/YYYY"
// //                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
// //               />
// //             </div>
// //           </div>

// //           {/* End Date */}
// //           <div>
// //             <label className="block text-white text-sm font-medium mb-2">
// //               End Date
// //             </label>
// //             <div className="relative">
// //               <input
// //                 type="date"
// //                 placeholder="DD/MM/YYYY"
// //                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
// //               />
// //             </div>
// //           </div>

// //           {/* Duration */}
// //           <div>
// //             <label className="block text-white text-sm font-medium mb-2">
// //               Duration (Months)
// //             </label>
// //             <input
// //               type="text"
// //               placeholder="Duration (1-12 months)"
// //               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
// //             />
// //           </div>
// //         </div>

// //         {/* Stipend and Stipend Amount Row */}
// //         <div className="grid grid-cols-2 gap-6 mb-6">
// //           {/* Stipend */}
// //           <div>
// //             <label className="block text-white text-sm font-medium mb-2">
// //               Stipend
// //             </label>
// //             <div className="relative">
// //               <select className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800">
// //                 <option value="">Stipend</option>
// //                 <option value="paid">Stipend - Paid</option>
// //                 <option value="unpaid">Stipend - Unpaid</option>
// //               </select>
// //               <svg
// //                 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M19 9l-7 7-7-7"
// //                 />
// //               </svg>
// //             </div>
// //           </div>

// //           {/* Stipend Amount */}
// //           <div>
// //             <label className="block text-white text-sm font-medium mb-2">
// //               Stipend Amount
// //             </label>
// //             <input
// //               type="text"
// //               placeholder="Amount"
// //               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
// //             />
// //           </div>
// //         </div>

// //         {/* Description */}
// //         <div className="mb-6">
// //           <label className="block text-white text-sm font-medium mb-2">
// //             Description
// //           </label>
// //           <textarea
// //             placeholder="Description"
// //             rows="4"
// //             className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-gray-800"
// //           />
// //         </div>

// //         {/* Certificate URL */}
// //         <div className="mb-6">
// //           <label className="block text-white text-sm font-medium mb-2">
// //             Certificate URL
// //           </label>
// //           <input
// //             type="text"
// //             placeholder="Certificate URL"
// //             className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
// //           />
// //         </div>

// //         {/* Internship Photo and Report PDF Row */}
// //         <div className="grid grid-cols-2 gap-6">
// //           {/* Internship Photo */}
// //           <div>
// //             <label className="block text-white text-sm font-medium mb-2">
// //               Internship Photo
// //             </label>
// //             <div className="relative">
// //               <input
// //                 type="text"
// //                 placeholder="Upload Photo"
// //                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24"
// //                 readOnly
// //               />
// //               <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition">
// //                 UPLOAD
// //               </button>
// //               <input
// //                 type="file"
// //                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
// //               />
// //             </div>
// //           </div>

// //           {/* Report PDF */}
// //           <div>
// //             <label className="block text-white text-sm font-medium mb-2">
// //               Report (PDF)
// //             </label>
// //             <div className="relative">
// //               <input
// //                 type="text"
// //                 placeholder="Upload PDF"
// //                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24"
// //                 readOnly
// //               />
// //               <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition">
// //                 UPLOAD
// //               </button>
// //               <input
// //                 type="file"
// //                 accept=".pdf"
// //                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }

// import React, { useState } from "react";
// import { internshipService } from "../services/internshipService";

// export default function StudentInternship() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Form data state
//   const [formData, setFormData] = useState({
//     stuID: "",
//     companyName: "",
//     role: "",
//     startDate: "",
//     endDate: "",
//     durationMonths: "",
//     isPaid: "",
//     stipend: "",
//     description: "",
//   });

//   // File uploads
//   const [photoProof, setPhotoProof] = useState(null);
//   const [internshipReport, setInternshipReport] = useState(null);
//   const [photoFileName, setPhotoFileName] = useState("");
//   const [reportFileName, setReportFileName] = useState("");

//   // Handle text input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle photo upload
//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPhotoProof(file);
//       setPhotoFileName(file.name);
//     }
//   };

//   // Handle report upload
//   const handleReportChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setInternshipReport(file);
//       setReportFileName(file.name);
//     }
//   };

//   // Handle form submission
//   const handleSave = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     // Frontend validation
//     if (formData.description.length < 10) {
//       setError("Description must be at least 10 characters long");
//       setLoading(false);
//       return;
//     }

//     if (!photoProof) {
//       setError("Please upload internship photo");
//       setLoading(false);
//       return;
//     }

//     if (!internshipReport) {
//       setError("Please upload internship report PDF");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Prepare internship data
//       const internshipData = {
//         stuID: formData.stuID,
//         companyName: formData.companyName,
//         role: formData.role,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         durationMonths: parseInt(formData.durationMonths),
//         stipendInfo: {
//           isPaid: formData.isPaid === "paid",
//           stipend:
//             formData.isPaid === "paid"
//               ? parseFloat(formData.stipend)
//               : undefined,
//         },
//         description: formData.description,
//       };

//       // Call API
//       await internshipService.createInternship(
//         internshipData,
//         internshipReport,
//         photoProof
//       );

//       setSuccess("Internship added successfully!");
//       setIsEditing(false);

//       // Reset form
//       setFormData({
//         stuID: "",
//         companyName: "",
//         role: "",
//         startDate: "",
//         endDate: "",
//         durationMonths: "",
//         isPaid: "",
//         stipend: "",
//         description: "",
//       });
//       setPhotoProof(null);
//       setInternshipReport(null);
//       setPhotoFileName("");
//       setReportFileName("");
//     } catch (err) {
//       // Handle backend validation errors
//       if (err.response?.data?.errors) {
//         const errorMessages = err.response.data.errors
//           .map((e) => `${e.field}: ${e.message}`)
//           .join(", ");
//         setError(errorMessages);
//       } else {
//         setError(err.response?.data?.message || "Failed to add internship");
//       }
//       console.error(err);
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
//           onClick={() => setIsEditing(!isEditing)}
//           className="px-6 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-[#0f172a] transition"
//         >
//           {isEditing ? "Cancel" : "Edit"}
//         </button>
//         <button
//           onClick={handleSave}
//           disabled={loading || !isEditing}
//           className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
//         >
//           {loading ? "Saving..." : "Save"}
//         </button>
//       </div>

//       {/* Internship Form */}
//       <form onSubmit={handleSave} className="bg-[#1e293b] rounded-2xl p-8">
//         {/* Student ID */}
//         <div className="mb-6">
//           <label className="block text-white text-sm font-medium mb-2">
//             Student ID
//           </label>
//           <input
//             type="text"
//             name="stuID"
//             value={formData.stuID}
//             onChange={handleChange}
//             placeholder="Student ID (Eg : 2023FHCO125)"
//             className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
//             disabled={!isEditing}
//             required
//           />
//         </div>

//         {/* Company Name and Role Row */}
//         <div className="grid grid-cols-2 gap-6 mb-6">
//           {/* Company Name */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Company Name
//             </label>
//             <input
//               type="text"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               placeholder="Company Name"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
//               disabled={!isEditing}
//               required
//             />
//           </div>

//           {/* Role */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Role
//             </label>
//             <input
//               type="text"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               placeholder="Role"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
//               disabled={!isEditing}
//               required
//             />
//           </div>
//         </div>

//         {/* Start Date, End Date, Duration Row */}
//         <div className="grid grid-cols-3 gap-6 mb-6">
//           {/* Start Date */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Start Date
//             </label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
//               disabled={!isEditing}
//               required
//             />
//           </div>

//           {/* End Date */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               End Date
//             </label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
//               disabled={!isEditing}
//               required
//             />
//           </div>

//           {/* Duration */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Duration (Months)
//             </label>
//             <input
//               type="number"
//               name="durationMonths"
//               value={formData.durationMonths}
//               onChange={handleChange}
//               placeholder="Duration (1-6 months)"
//               min="1"
//               max="6"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
//               disabled={!isEditing}
//               required
//             />
//           </div>
//         </div>

//         {/* Stipend and Stipend Amount Row */}
//         <div className="grid grid-cols-2 gap-6 mb-6">
//           {/* Stipend */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Stipend
//             </label>
//             <div className="relative">
//               <select
//                 name="isPaid"
//                 value={formData.isPaid}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800"
//                 disabled={!isEditing}
//                 required
//               >
//                 <option value="">Select Stipend Type</option>
//                 <option value="paid">Stipend - Paid</option>
//                 <option value="unpaid">Stipend - Unpaid</option>
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

//           {/* Stipend Amount */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Stipend Amount
//             </label>
//             <input
//               type="number"
//               name="stipend"
//               value={formData.stipend}
//               onChange={handleChange}
//               placeholder="Amount"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
//               disabled={!isEditing || formData.isPaid !== "paid"}
//               required={formData.isPaid === "paid"}
//             />
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mb-6">
//           <label className="block text-white text-sm font-medium mb-2">
//             Description
//             <span className="text-gray-400 text-xs ml-2">
//               (min 10 characters)
//             </span>
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description (minimum 10 characters)"
//             rows="4"
//             minLength={10}
//             className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-gray-800"
//             disabled={!isEditing}
//             required
//           />
//           <div className="text-gray-400 text-xs mt-1">
//             {formData.description.length}/10 characters
//           </div>
//         </div>

//         {/* Internship Photo and Report PDF Row */}
//         <div className="grid grid-cols-2 gap-6">
//           {/* Internship Photo */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Internship Photo *
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={photoFileName || "Upload Photo"}
//                 placeholder="Upload Photo"
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24"
//                 readOnly
//               />
//               <button
//                 type="button"
//                 className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition"
//                 disabled={!isEditing}
//               >
//                 UPLOAD
//               </button>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoChange}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 disabled={!isEditing}
//                 required
//               />
//             </div>
//           </div>

//           {/* Report PDF */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Report (PDF) *
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={reportFileName || "Upload PDF"}
//                 placeholder="Upload PDF"
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24"
//                 readOnly
//               />
//               <button
//                 type="button"
//                 className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition"
//                 disabled={!isEditing}
//               >
//                 UPLOAD
//               </button>
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={handleReportChange}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 disabled={!isEditing}
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       </form>
//     </main>
//   );
// }

// import React, { useState } from "react";
// import { internshipService } from "../services/internshipService";

// export default function StudentInternship() {
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Form data state
//   const [formData, setFormData] = useState({
//     stuID: "",
//     companyName: "",
//     role: "",
//     startDate: "",
//     endDate: "",
//     durationMonths: "",
//     isPaid: "",
//     stipend: "",
//     description: "",
//   });

//   // File uploads
//   const [photoProof, setPhotoProof] = useState(null);
//   const [internshipReport, setInternshipReport] = useState(null);
//   const [photoFileName, setPhotoFileName] = useState("");
//   const [reportFileName, setReportFileName] = useState("");

//   // Handle text input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle photo upload
//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPhotoProof(file);
//       setPhotoFileName(file.name);
//     }
//   };

//   // Handle report upload
//   const handleReportChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setInternshipReport(file);
//       setReportFileName(file.name);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditMode(true);
//     setError("");
//     setSuccess("");
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     // Frontend validation
//     if (formData.description.length < 10) {
//       setError("Description must be at least 10 characters long");
//       setLoading(false);
//       return;
//     }

//     if (!photoProof) {
//       setError("Please upload internship photo");
//       setLoading(false);
//       return;
//     }

//     if (!internshipReport) {
//       setError("Please upload internship report PDF");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Build FormData
//       const data = new FormData();

//       data.append("companyName", formData.companyName);
//       data.append("role", formData.role);
//       data.append("startDate", formData.startDate);
//       data.append("endDate", formData.endDate);
//       data.append("durationMonths", formData.durationMonths);
//       data.append("isPaid", formData.isPaid === "paid");
//       if (formData.isPaid === "paid") {
//         data.append("stipend", formData.stipend);
//       }
//       data.append("description", formData.description);

//       // Add files
//       data.append("photoProof", photoProof);
//       data.append("internshipReport", internshipReport);

//       // Call API
//       await internshipService.createInternship(data);

//       setSuccess("Internship added successfully!");
//       setIsEditMode(false); // Disable form

//       // Reset form
//       setFormData({
//         stuID: "",
//         companyName: "",
//         role: "",
//         startDate: "",
//         endDate: "",
//         durationMonths: "",
//         isPaid: "",
//         stipend: "",
//         description: "",
//       });
//       setPhotoProof(null);
//       setInternshipReport(null);
//       setPhotoFileName("");
//       setReportFileName("");
//     } catch (err) {
//       // Handle backend validation errors
//       if (err.response?.data?.errors) {
//         const errorMessages = err.response.data.errors
//           .map((e) => `${e.field}: ${e.message}`)
//           .join(", ");
//         setError(errorMessages);
//       } else {
//         setError(err.response?.data?.message || "Failed to add internship");
//       }
//       console.error(err);
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

//       {/* Edit Button (Top Right) */}
//       <div className="flex justify-end mb-6">
//         {!isEditMode && (
//           <button
//             onClick={handleEdit}
//             className="px-6 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-[#0f172a] transition"
//           >
//             Edit
//           </button>
//         )}
//       </div>

//       {/* Internship Form */}
//       <form onSubmit={handleSubmit}>
//         <div className="bg-[#1e293b] rounded-2xl p-8">
//           {/* Student ID */}
//           <div className="mb-6">
//             <label className="block text-white text-sm font-medium mb-2">
//               Student ID
//             </label>
//             <input
//               type="text"
//               name="stuID"
//               value={formData.stuID}
//               onChange={handleChange}
//               placeholder="Student ID (Eg : 2023FHCO125)"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               disabled={!isEditMode}
//               required
//             />
//           </div>

//           {/* Company Name and Role Row */}
//           <div className="grid grid-cols-2 gap-6 mb-6">
//             {/* Company Name */}
//             <div>
//               <label className="block text-white text-sm font-medium mb-2">
//                 Company Name
//               </label>
//               <input
//                 type="text"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 placeholder="Company Name"
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//                 disabled={!isEditMode}
//                 required
//               />
//             </div>

//             {/* Role */}
//             <div>
//               <label className="block text-white text-sm font-medium mb-2">
//                 Role
//               </label>
//               <input
//                 type="text"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 placeholder="Role"
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//                 disabled={!isEditMode}
//                 required
//               />
//             </div>
//           </div>

//           {/* Start Date, End Date, Duration Row */}
//           <div className="grid grid-cols-3 gap-6 mb-6">
//             {/* Start Date */}
//             <div>
//               <label className="block text-white text-sm font-medium mb-2">
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//                 disabled={!isEditMode}
//                 required
//               />
//             </div>

//             {/* End Date */}
//             <div>
//               <label className="block text-white text-sm font-medium mb-2">
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//                 disabled={!isEditMode}
//                 required
//               />
//             </div>

//             {/* Duration */}
//             <div>
//               <label className="block text-white text-sm font-medium mb-2">
//                 Duration (Months)
//               </label>
//               <input
//                 type="number"
//                 name="durationMonths"
//                 value={formData.durationMonths}
//                 onChange={handleChange}
//                 placeholder="Duration (1-6 months)"
//                 min="1"
//                 max="6"
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//                 disabled={!isEditMode}
//                 required
//               />
//             </div>
//           </div>

//           {/* Stipend and Stipend Amount Row */}
//           <div className="grid grid-cols-2 gap-6 mb-6">
//             {/* Stipend */}
//             <div>
//               <label className="block text-white text-sm font-medium mb-2">
//                 Stipend
//               </label>
//               <div className="relative">
//                 <select
//                   name="isPaid"
//                   value={formData.isPaid}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//                   disabled={!isEditMode}
//                   required
//                 >
//                   <option value="">Select Stipend Type</option>
//                   <option value="paid">Stipend - Paid</option>
//                   <option value="unpaid">Stipend - Unpaid</option>
//                 </select>
//                 <svg
//                   className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </div>
//             </div>

//             {/* Stipend Amount */}
//             <div>
//               <label className="block text-white text-sm font-medium mb-2">
//                 Stipend Amount
//               </label>
//               <input
//                 type="number"
//                 name="stipend"
//                 value={formData.stipend}
//                 onChange={handleChange}
//                 placeholder="Amount (₹)"
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//                 disabled={!isEditMode || formData.isPaid !== "paid"}
//                 required={formData.isPaid === "paid"}
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="mb-6">
//             <label className="block text-white text-sm font-medium mb-2">
//               Description
//               <span className="text-gray-400 text-xs ml-2">
//                 (min 10 characters)
//               </span>
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Description (minimum 10 characters)"
//               rows="4"
//               minLength={10}
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               disabled={!isEditMode}
//               required
//             />
//             <div className="text-gray-400 text-xs mt-1">
//               {formData.description.length}/10 characters
//             </div>
//           </div>

//           {/* Internship Photo and Report PDF Row */}
//           <div className="grid grid-cols-2 gap-6 mb-8">
//             {/* Internship Photo */}
//             <div>
//               <label className="block text-white text-sm font-medium mb-2">
//                 Internship Photo *
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={photoFileName || "No file chosen"}
//                   placeholder="Upload Photo"
//                   className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24"
//                   readOnly
//                 />
//                 <label
//                   className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition ${
//                     !isEditMode
//                       ? "opacity-50 cursor-not-allowed"
//                       : "cursor-pointer"
//                   }`}
//                 >
//                   UPLOAD
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handlePhotoChange}
//                     className="hidden"
//                     disabled={!isEditMode}
//                   />
//                 </label>
//               </div>
//             </div>

//             {/* Report PDF */}
//             <div>
//               <label className="block text-white text-sm font-medium mb-2">
//                 Report (PDF) *
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={reportFileName || "No file chosen"}
//                   placeholder="Upload PDF"
//                   className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24"
//                   readOnly
//                 />
//                 <label
//                   className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition ${
//                     !isEditMode
//                       ? "opacity-50 cursor-not-allowed"
//                       : "cursor-pointer"
//                   }`}
//                 >
//                   UPLOAD
//                   <input
//                     type="file"
//                     accept=".pdf"
//                     onChange={handleReportChange}
//                     className="hidden"
//                     disabled={!isEditMode}
//                   />
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Submit Button (Bottom of Form) - Only shows in Edit Mode */}
//           {isEditMode && (
//             <div className="flex justify-center gap-4 pt-4 border-t border-gray-600">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsEditMode(false);
//                   setError("");
//                   setSuccess("");
//                 }}
//                 className="px-8 py-3 rounded-lg bg-gray-500 text-white text-sm font-medium hover:bg-gray-600 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-8 py-3 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//           )}
//         </div>
//       </form>
//     </main>
//   );
// }
import React, { useState } from "react";
import { internshipService } from "../services/internshipService";

export default function StudentInternship() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    startDate: "",
    endDate: "",
    durationMonths: "",
    isPaid: "",
    stipend: "",
    description: "",
  });

  const [photoProof, setPhotoProof] = useState(null);
  const [internshipReport, setInternshipReport] = useState(null);
  const [photoFileName, setPhotoFileName] = useState("");
  const [reportFileName, setReportFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoProof(file);
      setPhotoFileName(file.name);
    }
  };

  const handleReportChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInternshipReport(file);
      setReportFileName(file.name);
    }
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

    if (formData.description.length < 10) {
      setError("Description must be at least 10 characters long");
      setLoading(false);
      return;
    }

    if (!photoProof) {
      setError("Please upload internship photo");
      setLoading(false);
      return;
    }

    if (!internshipReport) {
      setError("Please upload internship report PDF");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();

      data.append("companyName", formData.companyName);
      data.append("role", formData.role);
      data.append("startDate", formData.startDate);
      data.append("endDate", formData.endDate);
      data.append("durationMonths", formData.durationMonths);
      data.append("isPaid", formData.isPaid === "paid");
      if (formData.isPaid === "paid") {
        data.append("stipend", formData.stipend);
      }
      data.append("description", formData.description);

      data.append("photoProof", photoProof);
      data.append("internshipReport", internshipReport);

      await internshipService.createInternship(data);

      setSuccess("Internship added successfully!");
      setIsEditMode(false);

      setFormData({
        companyName: "",
        role: "",
        startDate: "",
        endDate: "",
        durationMonths: "",
        isPaid: "",
        stipend: "",
        description: "",
      });
      setPhotoProof(null);
      setInternshipReport(null);
      setPhotoFileName("");
      setReportFileName("");
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors
          .map((e) => `${e.field}: ${e.message}`)
          .join(", ");
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || "Failed to add internship");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{success}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Internship Experience
          </h1>
          <p className="text-slate-600 mt-1">
            Document your internship journey and achievements
          </p>
        </div>

        {!isEditMode && (
          <button
            onClick={handleEdit}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Add Internship
          </button>
        )}
      </div>

      {/* Internship Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            {/* SECTION: Company Information */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Company Information
              </h2>

              {/* Company & Role */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Company Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
                    disabled={!isEditMode}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Role
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g., Software Developer"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
                    disabled={!isEditMode}
                    required
                  />
                </div>
              </div>
            </div>

            {/* SECTION: Duration & Dates */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Duration & Timeline
              </h2>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Start Date
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
                    disabled={!isEditMode}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    End Date
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
                    disabled={!isEditMode}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Duration (Months)
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    name="durationMonths"
                    value={formData.durationMonths}
                    onChange={handleChange}
                    placeholder="1-6"
                    min="1"
                    max="6"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
                    disabled={!isEditMode}
                    required
                  />
                </div>
              </div>
            </div>

            {/* SECTION: Compensation */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Compensation
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Stipend Type
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="isPaid"
                    value={formData.isPaid}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed appearance-none"
                    disabled={!isEditMode}
                    required
                  >
                    <option value="">Select Stipend Type</option>
                    <option value="paid">Stipend - Paid</option>
                    <option value="unpaid">Stipend - Unpaid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Stipend Amount (₹)
                  </label>
                  <input
                    type="number"
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
                    disabled={!isEditMode || formData.isPaid !== "paid"}
                    required={formData.isPaid === "paid"}
                  />
                </div>
              </div>
            </div>

            {/* SECTION: Description */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Experience Details
              </h2>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                  <span className="text-red-500 ml-1">*</span>
                  <span className="text-slate-500 font-normal ml-2">
                    (minimum 10 characters)
                  </span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your internship experience, responsibilities, and learnings..."
                  rows="4"
                  minLength={10}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed resize-none"
                  disabled={!isEditMode}
                  required
                />
                <div className="text-xs text-slate-500 mt-2">
                  {formData.description.length}/10 characters minimum
                </div>
              </div>
            </div>

            {/* SECTION: File Uploads */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Documentation
              </h2>

              <div className="grid grid-cols-2 gap-6">
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Internship Photo
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={photoFileName || "No file chosen"}
                        placeholder="Upload Photo"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 placeholder-slate-400 text-sm"
                        readOnly
                      />
                    </div>
                    <label
                      className={`px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg transition cursor-pointer shadow-sm ${
                        !isEditMode
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-700"
                      }`}
                    >
                      UPLOAD
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        disabled={!isEditMode}
                      />
                    </label>
                  </div>
                </div>

                {/* Report Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Report (PDF)
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={reportFileName || "No file chosen"}
                        placeholder="Upload PDF"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 placeholder-slate-400 text-sm"
                        readOnly
                      />
                    </div>
                    <label
                      className={`px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg transition cursor-pointer shadow-sm ${
                        !isEditMode
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-700"
                      }`}
                    >
                      UPLOAD
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleReportChange}
                        className="hidden"
                        disabled={!isEditMode}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          {isEditMode && (
            <div className="flex justify-end gap-4 px-8 py-6 bg-slate-50 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(false);
                  setError("");
                  setSuccess("");
                }}
                className="px-6 py-2.5 rounded-lg bg-slate-300 text-slate-900 text-sm font-semibold hover:bg-slate-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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
