// import React, { useState } from "react";
// import { placementService } from "../services/placementService";
// import { higherStudiesService } from "../services/higherStudiesService";

// export default function StudentPlacement() {
//   const [activeTab, setActiveTab] = useState("placement");
//   const [isEditing, setIsEditing] = useState(false);

//   // Placement form data
//   const [placementData, setPlacementData] = useState({
//     stuID: "",
//     companyName: "",
//     role: "",
//     placementType: "",
//     placementProof: null,
//   });

//   // Higher Studies form data
//   const [higherStudiesData, setHigherStudiesData] = useState({
//     stuID: "",
//     examName: "",
//     score: "",
//     marksheet: null,
//   });

//   // Handle input changes for Placement
//   const handlePlacementChange = (e) => {
//     const { name, value } = e.target;
//     setPlacementData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle file change for Placement
//   const handlePlacementFileChange = (e) => {
//     setPlacementData((prev) => ({
//       ...prev,
//       placementProof: e.target.files[0],
//     }));
//   };

//   // Handle input changes for Higher Studies
//   const handleHigherStudiesChange = (e) => {
//     const { name, value } = e.target;
//     setHigherStudiesData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle file change for Higher Studies
//   const handleHigherStudiesFileChange = (e) => {
//     setHigherStudiesData((prev) => ({
//       ...prev,
//       marksheet: e.target.files[0],
//     }));
//   };

//   // Handle Save
//   const handleSave = async () => {
//     try {
//       if (activeTab === "placement") {
//         const { placementProof, ...data } = placementData;
//         await placementService.createPlacement(data, placementProof);
//         alert("Placement data saved successfully!");
//       } else {
//         const { marksheet, ...data } = higherStudiesData;
//         await higherStudiesService.createHigherStudy(data, marksheet);
//         alert("Higher Studies data saved successfully!");
//       }
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("Failed to save data. Please try again.");
//     }
//   };

//   return (
//     <main className="p-6">
//       {/* Toggle Buttons and Edit/Save Buttons in One Row */}
//       <div className="flex justify-between items-center mb-6">
//         {/* Toggle Buttons */}
//         <div className="flex gap-4">
//           <button
//             onClick={() => setActiveTab("higherStudies")}
//             className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
//               activeTab === "higherStudies"
//                 ? "bg-green-600 text-white hover:bg-green-700"
//                 : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-300"
//             }`}
//           >
//             Higher Studies
//           </button>
//           <button
//             onClick={() => setActiveTab("placement")}
//             className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
//               activeTab === "placement"
//                 ? "bg-blue-500 text-white hover:bg-blue-600"
//                 : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-300"
//             }`}
//           >
//             Placement
//           </button>
//         </div>

//         {/* Edit and Save Buttons */}
//         <div className="flex gap-3">
//           <button
//             onClick={() => setIsEditing(true)}
//             className="px-6 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-[#0f172a] transition"
//           >
//             Edit
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
//           >
//             Save
//           </button>
//         </div>
//       </div>

//       {/* Form Container */}
//       <div className="bg-[#1e293b] rounded-2xl p-8">
//         {/* Student ID - Common for both tabs */}
//         <div className="mb-6">
//           <label className="block text-white text-sm font-medium mb-2">
//             Student ID
//           </label>
//           <input
//             type="text"
//             name="stuID"
//             placeholder="Student ID (Eg : 2023FHCO125)"
//             value={
//               activeTab === "placement"
//                 ? placementData.stuID
//                 : higherStudiesData.stuID
//             }
//             onChange={
//               activeTab === "placement"
//                 ? handlePlacementChange
//                 : handleHigherStudiesChange
//             }
//             disabled={!isEditing}
//             className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//           />
//         </div>

//         {/* Conditional Rendering Based on Active Tab */}
//         {activeTab === "placement" && (
//           <>
//             {/* Company Name and Role Row */}
//             <div className="grid grid-cols-2 gap-6 mb-6">
//               {/* Company Name */}
//               <div>
//                 <label className="block text-white text-sm font-medium mb-2">
//                   Company Name
//                 </label>
//                 <input
//                   type="text"
//                   name="companyName"
//                   placeholder="Company Name"
//                   value={placementData.companyName}
//                   onChange={handlePlacementChange}
//                   disabled={!isEditing}
//                   className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//                 />
//               </div>

//               {/* Role */}
//               <div>
//                 <label className="block text-white text-sm font-medium mb-2">
//                   Role
//                 </label>
//                 <input
//                   type="text"
//                   name="role"
//                   placeholder="Role"
//                   value={placementData.role}
//                   onChange={handlePlacementChange}
//                   disabled={!isEditing}
//                   className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//                 />
//               </div>
//             </div>

//             {/* Placement Type */}
//             <div className="mb-6">
//               <label className="block text-white text-sm font-medium mb-2">
//                 Placement Type
//               </label>
//               <div className="relative">
//                 <select
//                   name="placementType"
//                   value={placementData.placementType}
//                   onChange={handlePlacementChange}
//                   disabled={!isEditing}
//                   className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//                 >
//                   <option value="">Placement Type</option>
//                   <option value="Campus">Campus</option>
//                   <option value="Off-Campus">Off-Campus</option>
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

//             {/* LOI/Joining Letter/Offer Letter */}
//             <div>
//               <label className="block text-white text-sm font-medium mb-2">
//                 LOI/Joining Letter/Offer Letter
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder={
//                     placementData.placementProof
//                       ? placementData.placementProof.name
//                       : "Letter"
//                   }
//                   disabled={!isEditing}
//                   className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24 disabled:bg-gray-200 disabled:cursor-not-allowed"
//                   readOnly
//                 />
//                 <button
//                   disabled={!isEditing}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   UPLOAD
//                 </button>
//                 <input
//                   type="file"
//                   name="placementProof"
//                   accept=".pdf"
//                   onChange={handlePlacementFileChange}
//                   disabled={!isEditing}
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
//                 />
//               </div>
//             </div>
//           </>
//         )}

//         {activeTab === "higherStudies" && (
//           <>
//             {/* Exam Name and Score Row */}
//             <div className="grid grid-cols-2 gap-6 mb-6">
//               {/* Exam Name */}
//               <div>
//                 <label className="block text-white text-sm font-medium mb-2">
//                   Exam
//                 </label>
//                 <div className="relative">
//                   <select
//                     name="examName"
//                     value={higherStudiesData.examName}
//                     onChange={handleHigherStudiesChange}
//                     disabled={!isEditing}
//                     className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//                   >
//                     <option value="">Select Exam</option>
//                     <option value="GATE">GATE</option>
//                     <option value="CAT">CAT</option>
//                     <option value="GRE">GRE</option>
//                     <option value="TOFEL">TOFEL</option>
//                     <option value="IELTS">IELTS</option>
//                     <option value="UPSC">UPSC</option>
//                   </select>
//                   <svg
//                     className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </div>
//               </div>

//               {/* Score */}
//               <div>
//                 <label className="block text-white text-sm font-medium mb-2">
//                   Score
//                 </label>
//                 <input
//                   type="text"
//                   name="score"
//                   placeholder="Score"
//                   value={higherStudiesData.score}
//                   onChange={handleHigherStudiesChange}
//                   disabled={!isEditing}
//                   className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
//                 />
//               </div>
//             </div>

//             {/* Marksheet */}
//             <div>
//               <label className="block text-white text-sm font-medium mb-2">
//                 Marksheet
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder={
//                     higherStudiesData.marksheet
//                       ? higherStudiesData.marksheet.name
//                       : "Upload PDF"
//                   }
//                   disabled={!isEditing}
//                   className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24 disabled:bg-gray-200 disabled:cursor-not-allowed"
//                   readOnly
//                 />
//                 <button
//                   disabled={!isEditing}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   UPLOAD
//                 </button>
//                 <input
//                   type="file"
//                   name="marksheet"
//                   accept=".pdf"
//                   onChange={handleHigherStudiesFileChange}
//                   disabled={!isEditing}
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
//                 />
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </main>
//   );
// }

import React, { useState } from "react";
import { placementService } from "../services/placementService";
import { higherStudiesService } from "../services/higherStudiesService";

export default function StudentPlacement() {
  const [activeTab, setActiveTab] = useState("placement");
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Placement form data
  const [placementData, setPlacementData] = useState({
    stuID: "",
    companyName: "",
    role: "",
    placementType: "",
    placementProof: null,
  });

  // Higher Studies form data
  const [higherStudiesData, setHigherStudiesData] = useState({
    stuID: "",
    examName: "",
    score: "",
    marksheet: null,
  });

  // Handle input changes for Placement
  const handlePlacementChange = (e) => {
    const { name, value } = e.target;
    setPlacementData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file change for Placement
  const handlePlacementFileChange = (e) => {
    setPlacementData((prev) => ({
      ...prev,
      placementProof: e.target.files[0],
    }));
  };

  // Handle input changes for Higher Studies
  const handleHigherStudiesChange = (e) => {
    const { name, value } = e.target;
    setHigherStudiesData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file change for Higher Studies
  const handleHigherStudiesFileChange = (e) => {
    setHigherStudiesData((prev) => ({
      ...prev,
      marksheet: e.target.files[0],
    }));
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setError("");
    setSuccess("");
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (activeTab === "placement") {
        // Build FormData for placement
        const formData = new FormData();
        formData.append("companyName", placementData.companyName);
        formData.append("role", placementData.role);
        formData.append("placementType", placementData.placementType);
        if (placementData.placementProof) {
          formData.append("placementProof", placementData.placementProof);
        }

        await placementService.createPlacement(formData);
        setSuccess("Placement data saved successfully!");

        // Reset placement form
        setPlacementData({
          stuID: "",
          companyName: "",
          role: "",
          placementType: "",
          placementProof: null,
        });
      } else {
        // Build FormData for higher studies
        const formData = new FormData();
        formData.append("examName", higherStudiesData.examName);
        formData.append("score", higherStudiesData.score);
        if (higherStudiesData.marksheet) {
          formData.append("marksheet", higherStudiesData.marksheet);
        }

        await higherStudiesService.createHigherStudy(formData);
        setSuccess("Higher Studies data saved successfully!");

        // Reset higher studies form
        setHigherStudiesData({
          stuID: "",
          examName: "",
          score: "",
          marksheet: null,
        });
      }

      setIsEditMode(false); // Disable form
    } catch (error) {
      console.error("Error saving data:", error);
      setError(
        error.response?.data?.message ||
          "Failed to save data. Please try again."
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

      {/* Toggle Buttons and Edit Button in One Row */}
      <div className="flex justify-between items-center mb-6">
        {/* Toggle Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("higherStudies")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "higherStudies"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            Higher Studies
          </button>
          <button
            onClick={() => setActiveTab("placement")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "placement"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            Placement
          </button>
        </div>

        {/* Edit Button */}
        {!isEditMode && (
          <button
            onClick={handleEdit}
            className="px-6 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-[#0f172a] transition"
          >
            Edit
          </button>
        )}
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit}>
        <div className="bg-[#1e293b] rounded-2xl p-8">
          {/* Student ID - Common for both tabs */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Student ID
            </label>
            <input
              type="text"
              name="stuID"
              placeholder="Student ID (Eg : 2023FHCO125)"
              value={
                activeTab === "placement"
                  ? placementData.stuID
                  : higherStudiesData.stuID
              }
              onChange={
                activeTab === "placement"
                  ? handlePlacementChange
                  : handleHigherStudiesChange
              }
              disabled={!isEditMode}
              className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
              required
            />
          </div>

          {/* Conditional Rendering Based on Active Tab */}
          {activeTab === "placement" && (
            <>
              {/* Company Name and Role Row */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Company Name */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={placementData.companyName}
                    onChange={handlePlacementChange}
                    disabled={!isEditMode}
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                    required
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    value={placementData.role}
                    onChange={handlePlacementChange}
                    disabled={!isEditMode}
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                    required
                  />
                </div>
              </div>

              {/* Placement Type */}
              <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-2">
                  Placement Type
                </label>
                <div className="relative">
                  <select
                    name="placementType"
                    value={placementData.placementType}
                    onChange={handlePlacementChange}
                    disabled={!isEditMode}
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                    required
                  >
                    <option value="">Select Placement Type</option>
                    <option value="Campus">Campus</option>
                    <option value="Off-Campus">Off-Campus</option>
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

              {/* LOI/Joining Letter/Offer Letter */}
              <div className="mb-8">
                <label className="block text-white text-sm font-medium mb-2">
                  LOI/Joining Letter/Offer Letter *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={
                      placementData.placementProof
                        ? placementData.placementProof.name
                        : "No file chosen"
                    }
                    placeholder="Upload Letter (PDF)"
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24 disabled:bg-gray-200 disabled:text-gray-600"
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
                      name="placementProof"
                      accept=".pdf"
                      onChange={handlePlacementFileChange}
                      disabled={!isEditMode}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </>
          )}

          {activeTab === "higherStudies" && (
            <>
              {/* Exam Name and Score Row */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Exam Name */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Exam
                  </label>
                  <div className="relative">
                    <select
                      name="examName"
                      value={higherStudiesData.examName}
                      onChange={handleHigherStudiesChange}
                      disabled={!isEditMode}
                      className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                      required
                    >
                      <option value="">Select Exam</option>
                      <option value="GATE">GATE</option>
                      <option value="CAT">CAT</option>
                      <option value="GRE">GRE</option>
                      <option value="TOFEL">TOFEL</option>
                      <option value="IELTS">IELTS</option>
                      <option value="UPSC">UPSC</option>
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

                {/* Score */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Score
                  </label>
                  <input
                    type="text"
                    name="score"
                    placeholder="Score"
                    value={higherStudiesData.score}
                    onChange={handleHigherStudiesChange}
                    disabled={!isEditMode}
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-200 disabled:text-gray-600"
                    required
                  />
                </div>
              </div>

              {/* Marksheet */}
              <div className="mb-8">
                <label className="block text-white text-sm font-medium mb-2">
                  Marksheet *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={
                      higherStudiesData.marksheet
                        ? higherStudiesData.marksheet.name
                        : "No file chosen"
                    }
                    placeholder="Upload Marksheet (PDF)"
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24 disabled:bg-gray-200 disabled:text-gray-600"
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
                      name="marksheet"
                      accept=".pdf"
                      onChange={handleHigherStudiesFileChange}
                      disabled={!isEditMode}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </>
          )}

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
