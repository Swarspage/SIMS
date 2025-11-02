import React, { useState } from "react";
import { placementService } from "../services/placementService";
import { higherStudiesService } from "../services/higherStudiesService";

export default function StudentPlacement() {
  const [activeTab, setActiveTab] = useState("placement");
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [placementData, setPlacementData] = useState({
    companyName: "",
    role: "",
    placementType: "",
    placementProof: null,
  });

  const [higherStudiesData, setHigherStudiesData] = useState({
    examName: "",
    score: "",
    marksheet: null,
  });

  const handlePlacementChange = (e) => {
    const { name, value } = e.target;
    setPlacementData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlacementFileChange = (e) => {
    setPlacementData((prev) => ({
      ...prev,
      placementProof: e.target.files[0],
    }));
  };

  const handleHigherStudiesChange = (e) => {
    const { name, value } = e.target;
    setHigherStudiesData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (activeTab === "placement") {
        const formData = new FormData();
        formData.append("companyName", placementData.companyName);
        formData.append("role", placementData.role);
        formData.append("placementType", placementData.placementType);
        if (placementData.placementProof) {
          formData.append("placementProof", placementData.placementProof);
        }

        await placementService.createPlacement(formData);
        setSuccess("Placement data saved successfully!");

        setPlacementData({
          companyName: "",
          role: "",
          placementType: "",
          placementProof: null,
        });
      } else {
        const formData = new FormData();
        formData.append("examName", higherStudiesData.examName);
        formData.append("score", higherStudiesData.score);
        if (higherStudiesData.marksheet) {
          formData.append("marksheet", higherStudiesData.marksheet);
        }

        await higherStudiesService.createHigherStudy(formData);
        setSuccess("Higher Studies data saved successfully!");

        setHigherStudiesData({
          examName: "",
          score: "",
          marksheet: null,
        });
      }

      setIsEditMode(false);
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
          <h1 className="text-3xl font-bold text-slate-900">Career Path</h1>
          <p className="text-slate-600 mt-1">
            Document your placement or higher studies journey
          </p>
        </div>

        {!isEditMode && (
          <button
            onClick={handleEdit}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Edit
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="mb-8 flex gap-3 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("placement")}
          className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === "placement"
              ? "border-blue-600 text-blue-600 bg-blue-50"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Placement
        </button>
        <button
          onClick={() => setActiveTab("higherStudies")}
          className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === "higherStudies"
              ? "border-green-600 text-green-600 bg-green-50"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Higher Studies
        </button>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            {/* PLACEMENT TAB */}
            {activeTab === "placement" && (
              <>
                <div className="mb-10">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                    Placement Details
                  </h2>

                  {/* Company Name & Role */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Company Name
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Enter company name"
                        value={placementData.companyName}
                        onChange={handlePlacementChange}
                        disabled={!isEditMode}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
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
                        placeholder="e.g., Software Engineer"
                        value={placementData.role}
                        onChange={handlePlacementChange}
                        disabled={!isEditMode}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
                        required
                      />
                    </div>
                  </div>

                  {/* Placement Type */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Placement Type
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      name="placementType"
                      value={placementData.placementType}
                      onChange={handlePlacementChange}
                      disabled={!isEditMode}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed appearance-none"
                      required
                    >
                      <option value="">Select Placement Type</option>
                      <option value="Campus">Campus</option>
                      <option value="Off-Campus">Off-Campus</option>
                    </select>
                  </div>
                </div>

                {/* Document Upload */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-blue-500">
                    Documentation
                  </h2>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    LOI / Joining Letter / Offer Letter
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={
                          placementData.placementProof
                            ? placementData.placementProof.name
                            : "No file chosen"
                        }
                        placeholder="Upload Letter (PDF)"
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

            {/* HIGHER STUDIES TAB */}
            {activeTab === "higherStudies" && (
              <>
                <div className="mb-10">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-green-500">
                    Higher Studies Details
                  </h2>

                  {/* Exam & Score */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Exam
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        name="examName"
                        value={higherStudiesData.examName}
                        onChange={handleHigherStudiesChange}
                        disabled={!isEditMode}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed appearance-none"
                        required
                      >
                        <option value="">Select Exam</option>
                        <option value="GATE">GATE</option>
                        <option value="CAT">CAT</option>
                        <option value="GRE">GRE</option>
                        <option value="TOEFL">TOEFL</option>
                        <option value="IELTS">IELTS</option>
                        <option value="UPSC">UPSC</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Score
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="score"
                        placeholder="e.g., 750/990"
                        value={higherStudiesData.score}
                        onChange={handleHigherStudiesChange}
                        disabled={!isEditMode}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Document Upload */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6 pb-4 border-b-2 border-green-500">
                    Documentation
                  </h2>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Marksheet (PDF)
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={
                          higherStudiesData.marksheet
                            ? higherStudiesData.marksheet.name
                            : "No file chosen"
                        }
                        placeholder="Upload Marksheet (PDF)"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 placeholder-slate-400 text-sm"
                        readOnly
                      />
                    </div>
                    <label
                      className={`px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg transition cursor-pointer shadow-sm ${
                        !isEditMode
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-green-700"
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
