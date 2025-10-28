// import React, { useState, useEffect } from "react";
// import { studentService } from "../services/studentService";

// export default function StudentInformation() {
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [studentPhoto, setStudentPhoto] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState("");

//   // Form state matching your model
//   const [formData, setFormData] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     motherName: "",
//     dob: "",
//     bloodGroup: "",
//     branch: "",
//     currentStreet: "",
//     currentCity: "",
//     currentPincode: "",
//     nativeStreet: "",
//     nativeCity: "",
//     nativePincode: "",
//     category: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     mobileNo: "",
//     parentMobileNo: "",
//     PRN: "",
//     studentID: "",
//   });

//   // Fetch existing student data on component mount
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
//           currentStreet: student.currentAddress?.street || "",
//           currentCity: student.currentAddress?.city || "",
//           currentPincode: student.currentAddress?.pincode || "",
//           nativeStreet: student.nativeAddress?.street || "",
//           nativeCity: student.nativeAddress?.city || "",
//           nativePincode: student.nativeAddress?.nativePincode || "",
//           category: student.category || "",
//           email: student.email || "",
//           password: "", // Never populate password
//           confirmPassword: "",
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
//       // Don't show error if it's just missing data
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

//   const handleSave = async () => {
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       // Validate passwords match
//       if (formData.password && formData.password !== formData.confirmPassword) {
//         setError("Passwords do not match!");
//         setLoading(false);
//         return;
//       }

//       // Validate password strength if provided
//       if (formData.password) {
//         const passwordRegex =
//           /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//         if (!passwordRegex.test(formData.password)) {
//           setError(
//             "Password must contain 8 characters with 1 capital, 1 number, and 1 special character"
//           );
//           setLoading(false);
//           return;
//         }
//       }

//       // Validate student photo for new entries
//       const studentId = localStorage.getItem("studentId");
//       if (!studentId && !studentPhoto) {
//         setError("Student photo is required!");
//         setLoading(false);
//         return;
//       }

//       // ✅ Build FormData with FLAT fields matching backend
//       const formDataToSend = new FormData();

//       // Name fields - FLAT (not nested!)
//       formDataToSend.append("firstName", formData.firstName || "");
//       formDataToSend.append("middleName", formData.middleName || "");
//       formDataToSend.append("lastName", formData.lastName || "");
//       formDataToSend.append("motherName", formData.motherName || "");

//       // Basic fields
//       formDataToSend.append("PRN", formData.PRN || "");
//       formDataToSend.append("branch", formData.branch || "");
//       formDataToSend.append("year", formData.year || "");
//       formDataToSend.append("dob", formData.dob || "");
//       formDataToSend.append("bloodGroup", formData.bloodGroup || "");
//       formDataToSend.append("category", formData.category || "");
//       formDataToSend.append("mobileNo", formData.mobileNo || "");
//       formDataToSend.append("parentMobileNo", formData.parentMobileNo || "");

//       // Current Address - FLAT fields (note: pincode, not currentPincode!)
//       formDataToSend.append("currentStreet", formData.currentStreet || "");
//       formDataToSend.append("currentCity", formData.currentCity || "");
//       formDataToSend.append("pincode", formData.currentPincode || "");

//       // Native Address - FLAT fields
//       formDataToSend.append("nativeStreet", formData.nativeStreet || "");
//       formDataToSend.append("nativeCity", formData.nativeCity || "");
//       formDataToSend.append("nativePincode", formData.nativePincode || "");

//       // Add password only if it's being changed
//       if (formData.password) {
//         formDataToSend.append("password", formData.password);
//       }

//       // Add photo (required for new, optional for update)
//       if (studentPhoto) {
//         formDataToSend.append("studentPhoto", studentPhoto);
//       }

//       // Debug: Log what we're sending
//       console.log("FormData entries:");
//       for (let [key, value] of formDataToSend.entries()) {
//         console.log(`${key}: ${value}`);
//       }

//       if (!studentId) {
//         // Adding new student details (first time) - uses addStudentDetails controller
//         const response = await studentService.addStudent(formDataToSend);
//         setSuccess("Student information added successfully!");

//         // Store studentId for future updates
//         if (response.data?._id) {
//           localStorage.setItem("studentId", response.data._id);
//         }
//       } else {
//         // Updating existing student - uses updateStudent controller
//         const response = await studentService.updateStudent(
//           studentId,
//           formDataToSend
//         );
//         setSuccess("Student information updated successfully!");
//       }

//       setIsEditMode(false);
//       fetchStudentData(); // Refresh data
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
//         {!isEditMode ? (
//           <button
//             onClick={handleEdit}
//             className="px-6 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-[#0f172a] transition"
//           >
//             Edit
//           </button>
//         ) : (
//           <>
//             <button
//               onClick={() => {
//                 setIsEditMode(false);
//                 fetchStudentData(); // Reset form
//               }}
//               className="px-6 py-2 rounded-lg bg-gray-500 text-white text-sm font-medium hover:bg-gray-600 transition"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               disabled={loading}
//               className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </>
//         )}
//       </div>

//       {/* Student Information Form */}
//       <div className="bg-[#1e293b] rounded-2xl p-8">
//         {/* First Name, Middle Name, Last Name Row */}
//         <div className="grid grid-cols-3 gap-6 mb-6">
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               First Name
//             </label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="First Name"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Middle Name
//             </label>
//             <input
//               type="text"
//               name="middleName"
//               value={formData.middleName}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="Middle Name"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//             />
//           </div>

//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Last Name
//             </label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="Last Name"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               required
//             />
//           </div>
//         </div>

//         {/* Mother's Name and Student Photo Row */}
//         <div className="grid grid-cols-2 gap-6 mb-6">
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Mother's Name
//             </label>
//             <input
//               type="text"
//               name="motherName"
//               value={formData.motherName}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="Mother's Name"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Student Photo
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={
//                   studentPhoto
//                     ? studentPhoto.name
//                     : photoPreview
//                     ? "Current photo uploaded"
//                     : "Upload Photo"
//                 }
//                 placeholder="Upload Photo (Recent With White Background)"
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24"
//                 readOnly
//               />
//               <label
//                 className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition ${
//                   !isEditMode
//                     ? "opacity-50 cursor-not-allowed"
//                     : "cursor-pointer"
//                 }`}
//               >
//                 UPLOAD
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handlePhotoChange}
//                   disabled={!isEditMode}
//                   className="hidden"
//                 />
//               </label>
//             </div>
//             {photoPreview && (
//               <img
//                 src={photoPreview}
//                 alt="Student Preview"
//                 className="mt-3 w-24 h-24 object-cover rounded"
//               />
//             )}
//           </div>
//         </div>

//         {/* Date of Birth, Blood Group, Branch Row */}
//         <div className="grid grid-cols-3 gap-6 mb-6">
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Date of Birth
//             </label>
//             <input
//               type="date"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Blood Group
//             </label>
//             <select
//               name="bloodGroup"
//               value={formData.bloodGroup}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               required
//             >
//               <option value="">Select Blood Group</option>
//               <option value="A+">A+</option>
//               <option value="A-">A-</option>
//               <option value="B+">B+</option>
//               <option value="B-">B-</option>
//               <option value="AB+">AB+</option>
//               <option value="AB-">AB-</option>
//               <option value="O+">O+</option>
//               <option value="O-">O-</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Branch
//             </label>
//             <select
//               name="branch"
//               value={formData.branch}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               required
//             >
//               <option value="">Select Branch</option>
//               <option value="Computer">Computer Engineering</option>
//               <option value="IT">Information Technology</option>
//               <option value="AIDS">
//                 Artificial Intelligence and Data Science
//               </option>
//               <option value="Mechanical">Mechanical Engineering</option>
//               <option value="Civil">Civil Engineering</option>
//               <option value="Chemical">Chemical Engineering</option>
//             </select>
//           </div>
//         </div>

//         {/* Current Address */}
//         <div className="mb-6">
//           <h3 className="text-white text-lg font-semibold mb-4">
//             Current Address
//           </h3>
//           <div className="mb-6">
//             <input
//               type="text"
//               name="currentStreet"
//               value={formData.currentStreet}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="Street"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <input
//                 type="text"
//                 name="currentCity"
//                 value={formData.currentCity}
//                 onChange={handleChange}
//                 disabled={!isEditMode}
//                 placeholder="City"
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//                 required
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 name="currentPincode"
//                 value={formData.currentPincode}
//                 onChange={handleChange}
//                 disabled={!isEditMode}
//                 placeholder="Pincode"
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Native Address */}
//         <div className="mb-6">
//           <h3 className="text-white text-lg font-semibold mb-4">
//             Native Address
//           </h3>
//           <div className="mb-6">
//             <input
//               type="text"
//               name="nativeStreet"
//               value={formData.nativeStreet}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="Street"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <input
//                 type="text"
//                 name="nativeCity"
//                 value={formData.nativeCity}
//                 onChange={handleChange}
//                 disabled={!isEditMode}
//                 placeholder="City"
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//                 required
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 name="nativePincode"
//                 value={formData.nativePincode}
//                 onChange={handleChange}
//                 disabled={!isEditMode}
//                 placeholder="Pincode"
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Category and Email Row */}
//         <div className="grid grid-cols-2 gap-6 mb-6">
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Category
//             </label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               required
//             >
//               <option value="">Select Category</option>
//               <option value="Open">Open</option>
//               <option value="EWS">EWS</option>
//               <option value="EBC">EBC</option>
//               <option value="OBC">OBC</option>
//               <option value="SC">SC</option>
//               <option value="ST">ST</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="Email"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               required
//             />
//           </div>
//         </div>

//         {/* Password and Confirm Password Row */}
//         <div className="grid grid-cols-2 gap-6 mb-6">
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Password{" "}
//               {!isEditMode && (
//                 <span className="text-xs">(Leave blank to keep current)</span>
//               )}
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="MIN 8 CHARACTERS"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//             />
//             <p className="text-red-400 text-xs mt-1">
//               Password should contain 8 characters (1 capital, 1 number, 1
//               special char)
//             </p>
//           </div>

//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="CONFIRM PASSWORD"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//             />
//           </div>
//         </div>

//         {/* Mobile No. and Parents Mobile No. Row */}
//         <div className="grid grid-cols-2 gap-6 mb-6">
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Mobile No.
//             </label>
//             <input
//               type="tel"
//               name="mobileNo"
//               value={formData.mobileNo}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="Mobile No."
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Parents Mobile No.
//             </label>
//             <input
//               type="tel"
//               name="parentMobileNo"
//               value={formData.parentMobileNo}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="Parents Mobile No."
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               required
//             />
//           </div>
//         </div>

//         {/* Enrollment Number and Student ID Row */}
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Enrollment Number (PRN)
//             </label>
//             <input
//               type="text"
//               name="PRN"
//               value={formData.PRN}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="Enrollment Number"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Student ID
//             </label>
//             <input
//               type="text"
//               name="studentID"
//               value={formData.studentID}
//               onChange={handleChange}
//               disabled={!isEditMode}
//               placeholder="Student ID (2023FHCO125)"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
//               required
//             />
//           </div>
//         </div>
//       </div>
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

  // Form state matching your model
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    motherName: "",
    dob: "",
    bloodGroup: "",
    branch: "",
    year: "", // ✅ ADDED THIS
    currentStreet: "",
    currentCity: "",
    currentPincode: "",
    nativeStreet: "",
    nativeCity: "",
    nativePincode: "",
    category: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    parentMobileNo: "",
    PRN: "",
    studentID: "",
  });

  // Fetch existing student data on component mount
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
          year: student.year || "", // ✅ ADDED THIS
          currentStreet: student.currentAddress?.street || "",
          currentCity: student.currentAddress?.city || "",
          currentPincode: student.currentAddress?.pincode || "",
          nativeStreet: student.nativeAddress?.street || "",
          nativeCity: student.nativeAddress?.city || "",
          nativePincode: student.nativeAddress?.nativePincode || "",
          category: student.category || "",
          email: student.email || "",
          password: "", // Never populate password
          confirmPassword: "",
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
      // Don't show error if it's just missing data
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

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate passwords match
      if (formData.password && formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        setLoading(false);
        return;
      }

      // Validate password strength if provided
      if (formData.password) {
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
          setError(
            "Password must contain 8 characters with 1 capital, 1 number, and 1 special character"
          );
          setLoading(false);
          return;
        }
      }

      // Validate student photo for new entries
      const studentId = localStorage.getItem("studentId");
      if (!studentId && !studentPhoto) {
        setError("Student photo is required!");
        setLoading(false);
        return;
      }

      // ✅ VALIDATE ALL REQUIRED FIELDS BEFORE BUILDING FORMDATA
      const requiredFields = {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        motherName: formData.motherName,
        PRN: formData.PRN,
        branch: formData.branch,
        year: formData.year, // ✅ ADDED
        dob: formData.dob,
        bloodGroup: formData.bloodGroup,
        currentStreet: formData.currentStreet,
        currentCity: formData.currentCity,
        currentPincode: formData.currentPincode,
        nativeStreet: formData.nativeStreet,
        nativeCity: formData.nativeCity,
        nativePincode: formData.nativePincode,
        category: formData.category,
        mobileNo: formData.mobileNo,
        parentMobileNo: formData.parentMobileNo,
      };

      const emptyFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value || value.trim() === "")
        .map(([key]) => key);

      if (emptyFields.length > 0) {
        setError(`Please fill required fields: ${emptyFields.join(", ")}`);
        setLoading(false);
        return;
      }

      // ✅ Build FormData with ONLY non-empty values
      const formDataToSend = new FormData();

      // Name fields
      formDataToSend.append("firstName", formData.firstName.trim());
      formDataToSend.append("middleName", formData.middleName.trim());
      formDataToSend.append("lastName", formData.lastName.trim());
      formDataToSend.append("motherName", formData.motherName.trim());

      // Basic fields
      formDataToSend.append("PRN", formData.PRN.trim());
      formDataToSend.append("branch", formData.branch);
      formDataToSend.append("year", formData.year); // ✅ ADDED
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("bloodGroup", formData.bloodGroup);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("mobileNo", formData.mobileNo.trim());
      formDataToSend.append("parentMobileNo", formData.parentMobileNo.trim());

      // Current Address (backend expects 'pincode' not 'currentPincode')
      formDataToSend.append("currentStreet", formData.currentStreet.trim());
      formDataToSend.append("currentCity", formData.currentCity.trim());
      formDataToSend.append("pincode", formData.currentPincode.trim());

      // Native Address
      formDataToSend.append("nativeStreet", formData.nativeStreet.trim());
      formDataToSend.append("nativeCity", formData.nativeCity.trim());
      formDataToSend.append("nativePincode", formData.nativePincode.trim());

      // Password only if changing
      if (formData.password) {
        formDataToSend.append("password", formData.password);
      }

      // Photo is REQUIRED for new student
      if (studentPhoto) {
        formDataToSend.append("studentPhoto", studentPhoto);
      }

      // Debug log
      console.log("=== FormData Contents ===");
      for (let [key, value] of formDataToSend.entries()) {
        if (value instanceof File) {
          console.log(`${key}: [FILE] ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`${key}: "${value}"`);
        }
      }
      console.log("========================");

      if (!studentId) {
        // Adding new student details (first time)
        const response = await studentService.addStudent(formDataToSend);
        setSuccess("Student information added successfully!");

        // Store studentId for future updates
        if (response.data?._id) {
          localStorage.setItem("studentId", response.data._id);
        }
      } else {
        // Updating existing student
        const response = await studentService.updateStudent(
          studentId,
          formDataToSend
        );
        setSuccess("Student information updated successfully!");
      }

      setIsEditMode(false);
      fetchStudentData(); // Refresh data
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

      {/* Edit and Save Buttons */}
      <div className="flex justify-end gap-3 mb-6">
        {!isEditMode ? (
          <button
            onClick={handleEdit}
            className="px-6 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-[#0f172a] transition"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setIsEditMode(false);
                fetchStudentData(); // Reset form
              }}
              className="px-6 py-2 rounded-lg bg-gray-500 text-white text-sm font-medium hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </>
        )}
      </div>

      {/* Student Information Form */}
      <div className="bg-[#1e293b] rounded-2xl p-8">
        {/* First Name, Middle Name, Last Name Row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="First Name"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Middle Name
            </label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="Middle Name"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="Last Name"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
              required
            />
          </div>
        </div>

        {/* Mother's Name and Student Photo Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Mother's Name
            </label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="Mother's Name"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Student Photo
            </label>
            <div className="relative">
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
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24"
                readOnly
              />
              <label
                className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition ${
                  !isEditMode
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                UPLOAD
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  disabled={!isEditMode}
                  className="hidden"
                />
              </label>
            </div>
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Student Preview"
                className="mt-3 w-24 h-24 object-cover rounded"
              />
            )}
          </div>
        </div>

        {/* Date of Birth, Blood Group, Branch, Year Row */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              disabled={!isEditMode}
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              disabled={!isEditMode}
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
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
            <label className="block text-white text-sm font-medium mb-2">
              Branch
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              disabled={!isEditMode}
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
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

          {/* ✅ ADDED YEAR FIELD */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              disabled={!isEditMode}
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
              required
            >
              <option value="">Select Year</option>
              <option value="SE">SE</option>
              <option value="TE">TE</option>
              <option value="BE">BE</option>
            </select>
          </div>
        </div>

        {/* Current Address */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-semibold mb-4">
            Current Address
          </h3>
          <div className="mb-6">
            <input
              type="text"
              name="currentStreet"
              value={formData.currentStreet}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="Street"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="currentCity"
                value={formData.currentCity}
                onChange={handleChange}
                disabled={!isEditMode}
                placeholder="City"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="currentPincode"
                value={formData.currentPincode}
                onChange={handleChange}
                disabled={!isEditMode}
                placeholder="Pincode"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                required
              />
            </div>
          </div>
        </div>

        {/* Native Address */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-semibold mb-4">
            Native Address
          </h3>
          <div className="mb-6">
            <input
              type="text"
              name="nativeStreet"
              value={formData.nativeStreet}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="Street"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="nativeCity"
                value={formData.nativeCity}
                onChange={handleChange}
                disabled={!isEditMode}
                placeholder="City"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="nativePincode"
                value={formData.nativePincode}
                onChange={handleChange}
                disabled={!isEditMode}
                placeholder="Pincode"
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                required
              />
            </div>
          </div>
        </div>

        {/* Category and Email Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={!isEditMode}
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
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

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-600 cursor-not-allowed"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Email cannot be changed
            </p>
          </div>
        </div>

        {/* Password and Confirm Password Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password{" "}
              {!isEditMode && (
                <span className="text-xs">(Leave blank to keep current)</span>
              )}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="MIN 8 CHARACTERS"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
            />
            <p className="text-red-400 text-xs mt-1">
              Password should contain 8 characters (1 capital, 1 number, 1
              special char)
            </p>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="CONFIRM PASSWORD"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
            />
          </div>
        </div>

        {/* Mobile No. and Parents Mobile No. Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Mobile No.
            </label>
            <input
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="Mobile No."
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Parents Mobile No.
            </label>
            <input
              type="tel"
              name="parentMobileNo"
              value={formData.parentMobileNo}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="Parents Mobile No."
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
              required
            />
          </div>
        </div>

        {/* Enrollment Number and Student ID Row */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Enrollment Number (PRN)
            </label>
            <input
              type="text"
              name="PRN"
              value={formData.PRN}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder="Enrollment Number"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Student ID
            </label>
            <input
              type="text"
              name="studentID"
              value={formData.studentID}
              onChange={handleChange}
              disabled
              placeholder="Student ID (2023FHCO125)"
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-600 cursor-not-allowed"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Student ID cannot be changed
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
