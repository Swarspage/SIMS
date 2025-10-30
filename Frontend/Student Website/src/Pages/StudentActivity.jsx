// import React, { useState } from "react";
// import activitiesData from "../data/activities";

// // Activity Card Component with Remove Button
// function ActivityCard({ activity, onRemove }) {
//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
//       {/* Remove Button */}
//       <button
//         onClick={() => onRemove(activity.id)}
//         className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition z-10"
//         title="Remove Activity"
//       >
//         <svg
//           className="w-4 h-4"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M6 18L18 6M6 6l12 12"
//           />
//         </svg>
//       </button>

//       <div className="bg-gray-200 h-40 flex items-center justify-center">
//         {/* Placeholder for activity image */}
//         <div className="text-gray-400 text-sm">Activity Image</div>
//       </div>
//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-2">{activity.name}</h3>
//         <p className="text-sm text-gray-500 mb-2">{activity.date}</p>
//         <p className="text-xs text-blue-600 mb-2 font-semibold">
//           {activity.type}
//         </p>
//         <p className="text-sm text-gray-600 line-clamp-3">
//           {activity.description}
//         </p>
//       </div>
//     </div>
//   );
// }

// // Main Activities Page Component
// export default function StudentActivity() {
//   const [activities, setActivities] = useState(activitiesData);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     date: "",
//     type: "",
//     certificate: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       certificate: e.target.files[0],
//     }));
//   };

//   const handleAddActivity = () => {
//     if (
//       formData.title &&
//       formData.description &&
//       formData.date &&
//       formData.type
//     ) {
//       const newActivity = {
//         id: activities.length + 1,
//         name: formData.title,
//         date: formData.date,
//         type: formData.type,
//         description: formData.description,
//       };
//       setActivities((prev) => [...prev, newActivity]);
//       // Reset form
//       setFormData({
//         title: "",
//         description: "",
//         date: "",
//         type: "",
//         certificate: null,
//       });
//       alert("Activity added successfully!");
//     } else {
//       alert("Please fill all fields!");
//     }
//   };

//   const handleSubmit = () => {
//     console.log("Submitting all activities:", activities);
//     alert(`Submitted ${activities.length} activities successfully!`);
//   };

//   const handleRemoveActivity = (id) => {
//     setActivities((prev) => prev.filter((activity) => activity.id !== id));
//   };

//   return (
//     <main className="p-6">
//       {/* Action Buttons */}
//       <div className="flex justify-end gap-3 mb-6">
//         <button
//           onClick={handleAddActivity}
//           className="px-6 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-[#0f172a] transition"
//         >
//           +Add Activity
//         </button>
//         <button
//           onClick={handleSubmit}
//           className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
//         >
//           Submit All
//         </button>
//       </div>

//       {/* Form Section + Activities Grid Combined */}
//       <div className="bg-[#1e293b] rounded-2xl p-8">
//         {/* Title */}
//         <div className="mb-6">
//           <label className="block text-white text-sm font-medium mb-2">
//             Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             placeholder="Title"
//             className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-6">
//           <label className="block text-white text-sm font-medium mb-2">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             placeholder="Description"
//             rows="4"
//             className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-gray-800"
//           />
//         </div>

//         {/* Date and Type Row */}
//         <div className="grid grid-cols-2 gap-6 mb-6">
//           {/* Date */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Date
//             </label>
//             <div className="relative">
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
//               />
//             </div>
//           </div>

//           {/* Type */}
//           <div>
//             <label className="block text-white text-sm font-medium mb-2">
//               Type
//             </label>
//             <div className="relative">
//               <select
//                 name="type"
//                 value={formData.type}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800"
//               >
//                 <option value="">Type</option>
//                 <option value="Workshop">Workshop</option>
//                 <option value="Seminar">Seminar</option>
//                 <option value="Competition">Competition</option>
//                 <option value="Cultural">Cultural</option>
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

//         {/* Certificate Upload */}
//         <div className="mb-8">
//           <label className="block text-white text-sm font-medium mb-2">
//             Certificate
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder={
//                 formData.certificate
//                   ? formData.certificate.name
//                   : "UPLOAD CERTIFICATE"
//               }
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
//               readOnly
//             />
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             />
//           </div>
//         </div>

//         {/* Activities Count */}
//         <div className="mb-4">
//           <h2 className="text-white text-xl font-semibold">
//             Total Activities:{" "}
//             <span className="text-green-400">{activities.length}</span>
//           </h2>
//         </div>

//         {/* Activities Grid - Now inside the dark container */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {activities.map((activity) => (
//             <ActivityCard
//               key={activity.id}
//               activity={activity}
//               onRemove={handleRemoveActivity}
//             />
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

// import React, { useState } from "react";
// import { activityService } from "../services/activityService";

// export default function StudentActivity() {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   // Form state matching Activity model
//   const [formData, setFormData] = useState({
//     type: "",
//     title: "",
//     description: "",
//     date: "",
//   });

//   const [certificate, setCertificate] = useState(null);
//   const [certificatePreview, setCertificatePreview] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setCertificate(file);
//     setCertificatePreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       // Validate certificate file
//       if (!certificate) {
//         setError("Certificate is required!");
//         setLoading(false);
//         return;
//       }

//       // Build FormData
//       const data = new FormData();

//       // Add all form fields matching backend expectations
//       data.append("type", formData.type);
//       data.append("title", formData.title);
//       data.append("description", formData.description);
//       data.append("date", formData.date);

//       // Add certificate file
//       data.append("certificate", certificate);

//       // Debug log
//       console.log("=== FormData Contents ===");
//       for (let [key, value] of data.entries()) {
//         if (value instanceof File) {
//           console.log(`${key}: [FILE] ${value.name}`);
//         } else {
//           console.log(`${key}: "${value}"`);
//         }
//       }
//       console.log("========================");

//       // POST to backend
//       await activityService.createActivity(data);

//       setSuccess("Activity created successfully!");

//       // Reset form
//       setFormData({
//         type: "",
//         title: "",
//         description: "",
//         date: "",
//       });
//       setCertificate(null);
//       setCertificatePreview("");
//     } catch (err) {
//       console.error("Error saving activity:", err);
//       console.error("Backend response:", err.response?.data);
//       setError(
//         err.response?.data?.message ||
//           "Failed to save activity. Check console for details."
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

//       {/* Form Title */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Add New Activity</h1>
//         <p className="text-sm text-gray-600 mt-1">
//           Fill in all fields to record your activity
//         </p>
//       </div>

//       {/* Activity Form */}
//       <form onSubmit={handleSubmit}>
//         <div className="bg-[#1e293b] rounded-2xl p-8">
//           {/* Type and Title Row */}
//           <div className="grid grid-cols-2 gap-6 mb-6">
//             {/* Type */}
//             <div>
//               <label className="block text-white text-sm font-medium mb-2">
//                 Type <span className="text-red-400">*</span>
//               </label>
//               <div className="relative">
//                 <select
//                   name="type"
//                   value={formData.type}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800"
//                   required
//                 >
//                   <option value="">Select Type</option>
//                   <option value="Committee">Committee</option>
//                   <option value="Sports">Sports</option>
//                   <option value="Hackathon">Hackathon</option>
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

//             {/* Title */}
//             <div>
//               <label className="block text-white text-sm font-medium mb-2">
//                 Title <span className="text-red-400">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Activity Title"
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
//                 required
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="mb-6">
//             <label className="block text-white text-sm font-medium mb-2">
//               Description <span className="text-red-400">*</span>
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Describe your activity"
//               rows="4"
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-gray-800"
//               required
//             />
//           </div>

//           {/* Date */}
//           <div className="mb-6">
//             <label className="block text-white text-sm font-medium mb-2">
//               Date <span className="text-red-400">*</span>
//             </label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
//               required
//             />
//           </div>

//           {/* Certificate Upload */}
//           <div className="mb-6">
//             <label className="block text-white text-sm font-medium mb-2">
//               Certificate <span className="text-red-400">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={
//                   certificate
//                     ? certificate.name
//                     : certificatePreview
//                     ? "Certificate selected"
//                     : "No file chosen"
//                 }
//                 placeholder="Upload Certificate"
//                 className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-24"
//                 readOnly
//               />
//               <label className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1e293b] text-white text-xs font-medium rounded hover:bg-[#0f172a] transition cursor-pointer">
//                 UPLOAD
//                 <input
//                   type="file"
//                   accept="image/*,application/pdf"
//                   onChange={handleFileChange}
//                   className="hidden"
//                   required
//                 />
//               </label>
//             </div>
//             {certificatePreview && (
//               <div className="mt-3">
//                 <img
//                   src={certificatePreview}
//                   alt="Certificate Preview"
//                   className="w-32 h-32 object-cover rounded"
//                 />
//                 <p className="text-xs text-green-400 mt-1">
//                   ✓ Certificate ready
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-8 py-3 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "Submitting..." : "Submit Activity"}
//             </button>
//           </div>
//         </div>
//       </form>
//     </main>
//   );
// }

import React, { useState } from "react";
import { activityService } from "../services/activityService";

export default function StudentActivity() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    date: "",
  });

  const [certificate, setCertificate] = useState(null);
  const [certificatePreview, setCertificatePreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCertificate(file);
    setCertificatePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!certificate) {
        setError("Certificate is required!");
        setLoading(false);
        return;
      }

      const data = new FormData();

      data.append("type", formData.type);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("date", formData.date);
      data.append("certificate", certificate);

      console.log("=== FormData Contents ===");
      for (let [key, value] of data.entries()) {
        if (value instanceof File) {
          console.log(`${key}: [FILE] ${value.name}`);
        } else {
          console.log(`${key}: "${value}"`);
        }
      }
      console.log("========================");

      await activityService.createActivity(data);

      setSuccess("Activity created successfully!");

      setFormData({
        type: "",
        title: "",
        description: "",
        date: "",
      });
      setCertificate(null);
      setCertificatePreview("");
    } catch (err) {
      console.error("Error saving activity:", err);
      console.error("Backend response:", err.response?.data);
      setError(
        err.response?.data?.message ||
          "Failed to save activity. Check console for details."
      );
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Add New Activity</h1>
        <p className="text-slate-600 mt-1">
          Record your achievements and activities
        </p>
      </div>

      {/* Activity Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            {/* Section: Activity Details */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Activity Information
              </h2>

              {/* Row: Type and Title */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Type
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Committee">Committee</option>
                    <option value="Sports">Sports</option>
                    <option value="Hackathon">Hackathon</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter activity title"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your activity..."
                  rows="4"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Date
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Section: Certificate Upload */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                Certificate
              </h2>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Upload Certificate
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={
                        certificate
                          ? certificate.name
                          : certificatePreview
                          ? "Certificate selected"
                          : "No file chosen"
                      }
                      placeholder="Upload Certificate"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 placeholder-slate-400 text-sm"
                      readOnly
                    />
                  </div>
                  <label className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer shadow-sm">
                    UPLOAD
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                </div>

                {/* Certificate Preview */}
                {certificatePreview && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <img
                      src={certificatePreview}
                      alt="Certificate Preview"
                      className="w-24 h-24 object-cover rounded border-2 border-blue-500"
                    />
                    <p className="text-xs text-green-600 mt-3 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Certificate ready to submit
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end px-8 py-6 bg-slate-50 border-t border-slate-200">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? "Submitting..." : "Submit Activity"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
