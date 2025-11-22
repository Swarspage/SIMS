// import React, { useState, useEffect } from "react";
// import { studentService } from "../services/studentService";

// export default function StudentInformation() {
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [studentPhoto, setStudentPhoto] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState("");

//   const [formData, setFormData] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     motherName: "",
//     dob: "",
//     bloodGroup: "",
//     branch: "",
//     year: "",
//     currentStreet: "",
//     currentCity: "",
//     currentPincode: "",
//     nativeStreet: "",
//     nativeCity: "",
//     nativePincode: "",
//     category: "",
//     email: "",
//     mobileNo: "",
//     parentMobileNo: "",
//     PRN: "",
//     studentID: "",
//   });

//   useEffect(() => {
//     fetchStudentData();
//   }, []);

//   const fetchStudentData = async () => {
//     try {
//       const response = await studentService.getMyData();
//       const student = response.data || response.student || response;

//       if (student) {
//         setFormData({
//           firstName: student.name?.firstName || "",
//           middleName: student.name?.middleName || "",
//           lastName: student.name?.lastName || "",
//           motherName: student.name?.motherName || "",
//           dob: student.dob
//             ? new Date(student.dob).toISOString().split("T")[0]
//             : "",
//           bloodGroup: student.bloodGroup || "",
//           branch: student.branch || "",
//           year: student.year || "",
//           currentStreet: student.currentAddress?.street || "",
//           currentCity: student.currentAddress?.city || "",
//           currentPincode: student.currentAddress?.pincode || "",
//           nativeStreet: student.nativeAddress?.street || "",
//           nativeCity: student.nativeAddress?.city || "",
//           nativePincode: student.nativeAddress?.nativePincode || "",
//           category: student.category || "",
//           email: student.email || "",
//           mobileNo: student.mobileNo || "",
//           parentMobileNo: student.parentMobileNo || "",
//           PRN: student.PRN || "",
//           studentID: student.studentID || "",
//         });

//         if (student.studentPhoto?.url) {
//           setPhotoPreview(student.studentPhoto.url);
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching student data:", err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setStudentPhoto(file);
//       setPhotoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleEdit = () => {
//     setIsEditMode(true);
//     setError("");
//     setSuccess("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const studentId = localStorage.getItem("studentId");

//       const requiredFields = {
//         firstName: formData.firstName.trim(),
//         middleName: formData.middleName.trim(),
//         lastName: formData.lastName.trim(),
//         motherName: formData.motherName.trim(),
//         PRN: formData.PRN.trim(),
//         branch: formData.branch.trim(),
//         year: formData.year.trim(),
//         dob: formData.dob.trim(),
//         bloodGroup: formData.bloodGroup.trim(),
//         currentStreet: formData.currentStreet.trim(),
//         currentCity: formData.currentCity.trim(),
//         currentPincode: formData.currentPincode.trim(),
//         nativeStreet: formData.nativeStreet.trim(),
//         nativeCity: formData.nativeCity.trim(),
//         nativePincode: formData.nativePincode.trim(),
//         category: formData.category.trim(),
//         mobileNo: formData.mobileNo.trim(),
//         parentMobileNo: formData.parentMobileNo.trim(),
//       };

//       const emptyFields = Object.entries(requiredFields)
//         .filter(([key, value]) => !value || value === "")
//         .map(([key]) => key);

//       if (emptyFields.length > 0) {
//         setError(`Please fill required fields: ${emptyFields.join(", ")}`);
//         setLoading(false);
//         return;
//       }

//       if (!studentPhoto && !photoPreview) {
//         setError(
//           "❌ Student photo is REQUIRED! Please upload a photo to continue."
//         );
//         setLoading(false);
//         return;
//       }

//       const formDataToSend = new FormData();

//       formDataToSend.append("firstName", formData.firstName.trim());
//       formDataToSend.append("middleName", formData.middleName.trim());
//       formDataToSend.append("lastName", formData.lastName.trim());
//       formDataToSend.append("motherName", formData.motherName.trim());
//       formDataToSend.append("PRN", formData.PRN.trim());
//       formDataToSend.append("branch", formData.branch.trim());
//       formDataToSend.append("year", formData.year.trim());
//       formDataToSend.append("dob", formData.dob.trim());
//       formDataToSend.append("bloodGroup", formData.bloodGroup.trim());
//       formDataToSend.append("category", formData.category.trim());
//       formDataToSend.append("mobileNo", formData.mobileNo.trim());
//       formDataToSend.append("parentMobileNo", formData.parentMobileNo.trim());
//       formDataToSend.append("currentStreet", formData.currentStreet.trim());
//       formDataToSend.append("currentCity", formData.currentCity.trim());
//       formDataToSend.append("pincode", formData.currentPincode.trim());
//       formDataToSend.append("nativeStreet", formData.nativeStreet.trim());
//       formDataToSend.append("nativeCity", formData.nativeCity.trim());
//       formDataToSend.append("nativePincode", formData.nativePincode.trim());

//       if (studentPhoto) {
//         formDataToSend.append("studentPhoto", studentPhoto);
//       }

//       if (!studentId) {
//         const response = await studentService.addStudent(formDataToSend);
//         setSuccess("Student information added successfully!");

//         if (response.data?._id) {
//           localStorage.setItem("studentId", response.data._id);
//         }
//       } else {
//         await studentService.updateStudent(studentId, formDataToSend);
//         setSuccess("Student information updated successfully!");
//       }

//       setIsEditMode(false);
//       fetchStudentData();
//     } catch (err) {
//       console.error("Error saving student data:", err);
//       console.error("Backend response:", err.response?.data);
//       setError(
//         err.response?.data?.message ||
//           err.response?.data?.errors?.[0]?.message ||
//           "Failed to save student information. Check console for details."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =============== PROFILE VIEW ===============
//   if (!isEditMode && photoPreview) {
//     return (
//       <main className="p-8 bg-slate-50 min-h-screen">
//         {/* Success Message */}
//         {success && (
//           <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3">
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span>{success}</span>
//           </div>
//         )}

//         {/* Header with Profile */}
//         <div className="flex items-start justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-slate-900">
//               {formData.firstName} {formData.middleName} {formData.lastName}
//             </h1>
//             <p className="text-slate-600 mt-2">
//               ID: <span className="font-semibold">{formData.studentID}</span> |
//               PRN: <span className="font-semibold">{formData.PRN}</span>
//             </p>
//             <p className="text-slate-600">
//               {formData.branch} - {formData.year}
//             </p>
//           </div>

//           <button
//             onClick={handleEdit}
//             className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
//           >
//             Edit Profile
//           </button>
//         </div>

//         {/* Profile Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//           {/* Profile Header with Photo */}
//           <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 relative">
//             <div className="absolute bottom-0 left-8 translate-y-1/2">
//               <img
//                 src={photoPreview}
//                 alt="Student"
//                 className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
//               />
//             </div>
//           </div>

//           {/* Profile Content */}
//           <div className="p-8 pt-24">
//             <div className="grid grid-cols-2 gap-8">
//               {/* Personal Information */}
//               <div>
//                 <h3 className="text-lg font-bold text-slate-900 mb-4">
//                   Personal Information
//                 </h3>
//                 <div className="space-y-3">
//                   <div>
//                     <p className="text-xs text-slate-500 uppercase font-semibold">
//                       Mother's Name
//                     </p>
//                     <p className="text-sm text-slate-900 font-medium">
//                       {formData.motherName || "N/A"}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-500 uppercase font-semibold">
//                       Date of Birth
//                     </p>
//                     <p className="text-sm text-slate-900 font-medium">
//                       {formData.dob
//                         ? new Date(formData.dob).toLocaleDateString("en-IN")
//                         : "N/A"}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-500 uppercase font-semibold">
//                       Blood Group
//                     </p>
//                     <p className="text-sm text-slate-900 font-medium">
//                       {formData.bloodGroup || "N/A"}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-500 uppercase font-semibold">
//                       Category
//                     </p>
//                     <p className="text-sm text-slate-900 font-medium">
//                       {formData.category || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Contact Information */}
//               <div>
//                 <h3 className="text-lg font-bold text-slate-900 mb-4">
//                   Contact Information
//                 </h3>
//                 <div className="space-y-3">
//                   <div>
//                     <p className="text-xs text-slate-500 uppercase font-semibold">
//                       Email
//                     </p>
//                     <p className="text-sm text-slate-900 font-medium">
//                       {formData.email || "N/A"}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-500 uppercase font-semibold">
//                       Mobile
//                     </p>
//                     <p className="text-sm text-slate-900 font-medium">
//                       {formData.mobileNo || "N/A"}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-500 uppercase font-semibold">
//                       Parent's Mobile
//                     </p>
//                     <p className="text-sm text-slate-900 font-medium">
//                       {formData.parentMobileNo || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Address Information */}
//             <div className="mt-8 pt-8 border-t border-slate-200">
//               <div className="grid grid-cols-2 gap-8">
//                 <div>
//                   <h4 className="font-bold text-slate-900 mb-3">
//                     Current Address
//                   </h4>
//                   <p className="text-sm text-slate-700">
//                     {formData.currentStreet}, {formData.currentCity}
//                   </p>
//                   <p className="text-sm text-slate-700">
//                     Pincode: {formData.currentPincode}
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-slate-900 mb-3">
//                     Native Address
//                   </h4>
//                   <p className="text-sm text-slate-700">
//                     {formData.nativeStreet}, {formData.nativeCity}
//                   </p>
//                   <p className="text-sm text-slate-700">
//                     Pincode: {formData.nativePincode}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   // =============== FORM VIEW (EDIT MODE) ===============
//   return (
//     <main className="p-8 bg-slate-50 min-h-screen">
//       {/* Success Message */}
//       {success && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3">
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//             <path
//               fillRule="evenodd"
//               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span>{success}</span>
//         </div>
//       )}

//       {/* Error Message */}
//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3">
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//             <path
//               fillRule="evenodd"
//               d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span>{error}</span>
//         </div>
//       )}

//       {/* Page Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">
//             Student Information
//           </h1>
//           <p className="text-slate-600 mt-1">
//             Complete and manage your profile details
//           </p>
//         </div>
//       </div>

//       {/* Form Card */}
//       <form onSubmit={handleSubmit}>
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//           <div className="p-8">
//             {/* SECTION: Personal Information */}
//             <div className="mb-10">
//               <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
//                 Personal Information
//               </h2>

//               {/* Row: First, Middle, Last Name */}
//               <div className="grid grid-cols-3 gap-6 mb-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     First Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Middle Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="middleName"
//                     value={formData.middleName}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Last Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Row: Mother's Name & Photo */}
//               <div className="grid grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Mother's Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="motherName"
//                     value={formData.motherName}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                     required
//                   />
//                 </div>

//                 {/* Photo Upload */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Student Photo
//                   </label>
//                   <div className="flex gap-4 items-end">
//                     <div className="flex-1 relative">
//                       <input
//                         type="text"
//                         value={
//                           studentPhoto
//                             ? studentPhoto.name
//                             : photoPreview
//                             ? "Current photo uploaded"
//                             : "Upload Photo"
//                         }
//                         placeholder="Upload Photo (Recent With White Background)"
//                         className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 placeholder-slate-400 text-sm"
//                         readOnly
//                       />
//                     </div>
//                     <label className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition">
//                       UPLOAD
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handlePhotoChange}
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   {photoPreview && (
//                     <img
//                       src={photoPreview}
//                       alt="Student Preview"
//                       className="mt-3 w-20 h-20 object-cover rounded-lg border-2 border-blue-500"
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* SECTION: Academic Information */}
//             <div className="mb-10">
//               <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
//                 Academic Information
//               </h2>

//               <div className="grid grid-cols-4 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Date of Birth <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={formData.dob}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Blood Group <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="bloodGroup"
//                     value={formData.bloodGroup}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
//                     required
//                   >
//                     <option value="">Select Blood Group</option>
//                     <option value="A+">A+</option>
//                     <option value="A-">A-</option>
//                     <option value="B+">B+</option>
//                     <option value="B-">B-</option>
//                     <option value="AB+">AB+</option>
//                     <option value="AB-">AB-</option>
//                     <option value="O+">O+</option>
//                     <option value="O-">O-</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Branch <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="branch"
//                     value={formData.branch}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
//                     required
//                   >
//                     <option value="">Select Branch</option>
//                     <option value="Computer">Computer</option>
//                     <option value="IT">IT</option>
//                     <option value="AIDS">AIDS</option>
//                     <option value="Mechanical">Mechanical</option>
//                     <option value="Civil">Civil</option>
//                     <option value="Chemical">Chemical</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Year <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="year"
//                     value={formData.year}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
//                     required
//                   >
//                     <option value="">Select Year</option>
//                     <option value="SE">SE</option>
//                     <option value="TE">TE</option>
//                     <option value="BE">BE</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* SECTION: Address Information */}
//             <div className="mb-10">
//               <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
//                 Current Address
//               </h2>

//               <div className="mb-6">
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Street Address <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="currentStreet"
//                   value={formData.currentStreet}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     City <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="currentCity"
//                     value={formData.currentCity}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Pincode <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="currentPincode"
//                     value={formData.currentPincode}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* SECTION: Native Address */}
//             <div className="mb-10">
//               <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
//                 Native Address
//               </h2>

//               <div className="mb-6">
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Street Address <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="nativeStreet"
//                   value={formData.nativeStreet}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     City <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="nativeCity"
//                     value={formData.nativeCity}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Pincode <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="nativePincode"
//                     value={formData.nativePincode}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* SECTION: Contact & Category */}
//             <div className="mb-10">
//               <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
//                 Contact Information
//               </h2>

//               <div className="grid grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Mobile No. <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="mobileNo"
//                     value={formData.mobileNo}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Parents Mobile No. <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="parentMobileNo"
//                     value={formData.parentMobileNo}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     disabled
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-100 text-slate-600 text-sm cursor-not-allowed"
//                   />
//                   <p className="text-xs text-slate-500 mt-2">
//                     Cannot be changed
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Category <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
//                     required
//                   >
//                     <option value="">Select Category</option>
//                     <option value="Open">Open</option>
//                     <option value="EWS">EWS</option>
//                     <option value="EBC">EBC</option>
//                     <option value="OBC">OBC</option>
//                     <option value="SC">SC</option>
//                     <option value="ST">ST</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* SECTION: Identifiers */}
//             <div className="mb-8">
//               <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
//                 Identifiers
//               </h2>

//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     PRN Number <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="PRN"
//                     value={formData.PRN}
//                     onChange={handleChange}
//                     placeholder="15-digit PRN (e.g., 123456789012345)"
//                     maxLength="15"
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Student ID
//                   </label>
//                   <input
//                     type="text"
//                     name="studentID"
//                     value={formData.studentID}
//                     disabled
//                     className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-100 text-slate-600 text-sm cursor-not-allowed"
//                   />
//                   <p className="text-xs text-slate-500 mt-2">
//                     Cannot be changed
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Form Actions */}
//           {isEditMode && (
//             <div className="flex justify-end gap-4 px-8 py-6 bg-slate-50 border-t border-slate-200">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsEditMode(false);
//                   fetchStudentData();
//                   setError("");
//                   setSuccess("");
//                 }}
//                 className="px-6 py-2.5 rounded-lg bg-slate-300 text-slate-900 text-sm font-semibold hover:bg-slate-400 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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

import React, { useState, useEffect } from "react";
import { studentService } from "../services/studentService";

export default function StudentInformation() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [studentPhoto, setStudentPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    motherName: "",
    dob: "",
    bloodGroup: "",
    branch: "",
    year: "",
    currentStreet: "",
    currentCity: "",
    currentPincode: "",
    nativeStreet: "",
    nativeCity: "",
    nativePincode: "",
    category: "",
    email: "",
    mobileNo: "",
    parentMobileNo: "",
    PRN: "",
    studentID: "",
  });

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await studentService.getMyData();
      const student = response.data || response.student || response;

      if (student) {
        setFormData({
          firstName: student.name?.firstName || "",
          middleName: student.name?.middleName || "",
          lastName: student.name?.lastName || "",
          motherName: student.name?.motherName || "",
          dob: student.dob
            ? new Date(student.dob).toISOString().split("T")[0]
            : "",
          bloodGroup: student.bloodGroup || "",
          branch: student.branch || "",
          year: student.year || "",
          currentStreet: student.currentAddress?.street || "",
          currentCity: student.currentAddress?.city || "",
          currentPincode: student.currentAddress?.pincode || "",
          nativeStreet: student.nativeAddress?.street || "",
          nativeCity: student.nativeAddress?.city || "",
          nativePincode: student.nativeAddress?.nativePincode || "",
          category: student.category || "",
          email: student.email || "",
          mobileNo: student.mobileNo || "",
          parentMobileNo: student.parentMobileNo || "",
          PRN: student.PRN || "",
          studentID: student.studentID || "",
        });

        if (student.studentPhoto?.url) {
          setPhotoPreview(student.studentPhoto.url);
        }
      }
    } catch (err) {
      console.error("Error fetching student data:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudentPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
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

    try {
      const studentId = localStorage.getItem("studentId");

      const requiredFields = {
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        motherName: formData.motherName.trim(),
        PRN: formData.PRN.trim(),
        branch: formData.branch.trim(),
        year: formData.year.trim(),
        dob: formData.dob.trim(),
        bloodGroup: formData.bloodGroup.trim(),
        currentStreet: formData.currentStreet.trim(),
        currentCity: formData.currentCity.trim(),
        currentPincode: formData.currentPincode.trim(),
        nativeStreet: formData.nativeStreet.trim(),
        nativeCity: formData.nativeCity.trim(),
        nativePincode: formData.nativePincode.trim(),
        category: formData.category.trim(),
        mobileNo: formData.mobileNo.trim(),
        parentMobileNo: formData.parentMobileNo.trim(),
      };

      const emptyFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value || value === "")
        .map(([key]) => key);

      if (emptyFields.length > 0) {
        setError(`Please fill required fields: ${emptyFields.join(", ")}`);
        setLoading(false);
        return;
      }

      if (!studentPhoto && !photoPreview) {
        setError(
          "❌ Student photo is REQUIRED! Please upload a photo to continue."
        );
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();

      formDataToSend.append("firstName", formData.firstName.trim());
      formDataToSend.append("middleName", formData.middleName.trim());
      formDataToSend.append("lastName", formData.lastName.trim());
      formDataToSend.append("motherName", formData.motherName.trim());
      formDataToSend.append("PRN", formData.PRN.trim());
      formDataToSend.append("branch", formData.branch.trim());
      formDataToSend.append("year", formData.year.trim());
      formDataToSend.append("dob", formData.dob.trim());
      formDataToSend.append("bloodGroup", formData.bloodGroup.trim());
      formDataToSend.append("category", formData.category.trim());
      formDataToSend.append("mobileNo", formData.mobileNo.trim());
      formDataToSend.append("parentMobileNo", formData.parentMobileNo.trim());
      formDataToSend.append("currentStreet", formData.currentStreet.trim());
      formDataToSend.append("currentCity", formData.currentCity.trim());
      formDataToSend.append("pincode", formData.currentPincode.trim());
      formDataToSend.append("nativeStreet", formData.nativeStreet.trim());
      formDataToSend.append("nativeCity", formData.nativeCity.trim());
      formDataToSend.append("nativePincode", formData.nativePincode.trim());

      if (studentPhoto) {
        formDataToSend.append("studentPhoto", studentPhoto);
      }

      if (!studentId) {
        const response = await studentService.addStudent(formDataToSend);
        setSuccess("Student information added successfully!");

        if (response.data?._id) {
          localStorage.setItem("studentId", response.data._id);
        }
      } else {
        await studentService.updateStudent(studentId, formDataToSend);
        setSuccess("Student information updated successfully!");
      }

      setIsEditMode(false);
      fetchStudentData();
    } catch (err) {
      console.error("Error saving student data:", err);
      console.error("Backend response:", err.response?.data);
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          "Failed to save student information. Check console for details."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= PROFILE VIEW =================
  if (!isEditMode && photoPreview) {
    return (
      <main className="p-4 sm:p-8 bg-slate-50 min-h-screen">
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

        <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              {formData.firstName} {formData.middleName} {formData.lastName}
            </h1>
            <p className="text-slate-600 mt-2">
              ID: <span className="font-semibold">{formData.studentID}</span> |
              PRN: <span className="font-semibold">{formData.PRN}</span>
            </p>
            <p className="text-slate-600">
              {formData.branch} - {formData.year}
            </p>
          </div>
          <button
            onClick={handleEdit}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Edit Profile
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 relative">
            <div className="absolute bottom-0 left-8 translate-y-1/2">
              <img
                src={photoPreview}
                alt="Student"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>

          <div className="p-4 sm:p-8 pt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">
                      Mother's Name
                    </p>
                    <p className="text-sm text-slate-900 font-medium">
                      {formData.motherName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">
                      Date of Birth
                    </p>
                    <p className="text-sm text-slate-900 font-medium">
                      {formData.dob
                        ? new Date(formData.dob).toLocaleDateString("en-IN")
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">
                      Blood Group
                    </p>
                    <p className="text-sm text-slate-900 font-medium">
                      {formData.bloodGroup || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">
                      Category
                    </p>
                    <p className="text-sm text-slate-900 font-medium">
                      {formData.category || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">
                      Email
                    </p>
                    <p className="text-sm text-slate-900 font-medium">
                      {formData.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">
                      Mobile
                    </p>
                    <p className="text-sm text-slate-900 font-medium">
                      {formData.mobileNo || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">
                      Parent's Mobile
                    </p>
                    <p className="text-sm text-slate-900 font-medium">
                      {formData.parentMobileNo || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Address Information */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">
                    Current Address
                  </h4>
                  <p className="text-sm text-slate-700">
                    {formData.currentStreet}, {formData.currentCity}
                  </p>
                  <p className="text-sm text-slate-700">
                    Pincode: {formData.currentPincode}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">
                    Native Address
                  </h4>
                  <p className="text-sm text-slate-700">
                    {formData.nativeStreet}, {formData.nativeCity}
                  </p>
                  <p className="text-sm text-slate-700">
                    Pincode: {formData.nativePincode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ================ FORM VIEW (EDIT MODE) ====================
  return (
    <main className="p-4 sm:p-8 bg-slate-50 min-h-screen">
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

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Student Information
          </h1>
          <p className="text-slate-600 mt-1">
            Complete and manage your profile details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 sm:p-8">
            {/* SECTION: Personal Information */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Middle Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mother's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Student Photo
                  </label>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={
                          studentPhoto
                            ? studentPhoto.name
                            : photoPreview
                            ? "Current photo uploaded"
                            : "Upload Photo"
                        }
                        placeholder="Upload Photo (Recent With White Background)"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 placeholder-slate-400 text-sm"
                        readOnly
                      />
                    </div>
                    <label className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition">
                      UPLOAD
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Student Preview"
                      className="mt-3 w-20 h-20 object-cover rounded-lg border-2 border-blue-500"
                    />
                  )}
                </div>
              </div>
            </div>
            {/* SECTION: Academic Information */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Academic Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Branch <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    required
                  >
                    <option value="">Select Branch</option>
                    <option value="Computer">Computer</option>
                    <option value="IT">IT</option>
                    <option value="AIDS">AIDS</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Chemical">Chemical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="SE">SE</option>
                    <option value="TE">TE</option>
                    <option value="BE">BE</option>
                  </select>
                </div>
              </div>
            </div>
            {/* SECTION: Current Address */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Current Address
              </h2>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="currentStreet"
                  value={formData.currentStreet}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="currentCity"
                    value={formData.currentCity}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="currentPincode"
                    value={formData.currentPincode}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>
            </div>
            {/* SECTION: Native Address */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Native Address
              </h2>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nativeStreet"
                  value={formData.nativeStreet}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nativeCity"
                    value={formData.nativeCity}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nativePincode"
                    value={formData.nativePincode}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>
            </div>
            {/* SECTION: Contact & Category */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mobile No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Parents Mobile No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="parentMobileNo"
                    value={formData.parentMobileNo}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-100 text-slate-600 text-sm cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Cannot be changed
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Open">Open</option>
                    <option value="EWS">EWS</option>
                    <option value="EBC">EBC</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            {/* SECTION: Identifiers */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Identifiers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    PRN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="PRN"
                    value={formData.PRN}
                    onChange={handleChange}
                    placeholder="15-digit PRN (e.g., 123456789012345)"
                    maxLength="15"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="studentID"
                    value={formData.studentID}
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-100 text-slate-600 text-sm cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Cannot be changed
                  </p>
                </div>
              </div>
            </div>
          </div>
          {isEditMode && (
            <div className="flex flex-col sm:flex-row justify-end gap-4 px-4 sm:px-8 py-6 bg-slate-50 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(false);
                  fetchStudentData();
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
