import React, { useState } from "react";
import { Plus, X, ArrowLeft, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

const CourseOptions = ({ active, setActive }) => {
  const [benefits, setBenefits] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [benefitValue, setBenefitValue] = useState("");
  const [prerequisiteValue, setPrerequisiteValue] = useState("");
  const [error, setError] = useState({ benefit: "", prerequisite: "" });

  // Add Benefit
  const handleAddBenefit = (e) => {
    e.preventDefault();
    if (!benefitValue.trim()) {
      setError((prev) => ({ ...prev, benefit: "Benefit title cannot be empty." }));
      return;
    }
    setBenefits((prev) => [...prev, { title: benefitValue.trim() }]);
    setBenefitValue("");
    setError((prev) => ({ ...prev, benefit: "" }));
  };

  // Delete Benefit
  const handleDeleteBenefit = (indexToDelete) => {
    setBenefits((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  // Add Prerequisite
  const handleAddPrerequisite = (e) => {
    e.preventDefault();
    if (!prerequisiteValue.trim()) {
      setError((prev) => ({ ...prev, prerequisite: "Prerequisite title cannot be empty." }));
      return;
    }
    setPrerequisites((prev) => [...prev, { title: prerequisiteValue.trim() }]);
    setPrerequisiteValue("");
    setError((prev) => ({ ...prev, prerequisite: "" }));
  };

  // Delete Prerequisite
  const handleDeletePrerequisite = (indexToDelete) => {
    setPrerequisites((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="max-w-2xl mx-auto md:p-4 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5 mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Course Options
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Specify student benefits and required prerequisites for your course.
          </p>
        </div>
       
      </div>

      <div className="space-y-10">
        {/* Course Benefits Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-semibold text-slate-700">
              Course Benefits
            </label>
            <span className="text-xs text-slate-400 font-medium">
              {benefits.length} Added
            </span>
          </div>

          <form onSubmit={handleAddBenefit} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={benefitValue}
                onChange={(e) => {
                  setBenefitValue(e.target.value);
                  if (error.benefit) setError((prev) => ({ ...prev, benefit: "" }));
                }}
                placeholder="e.g. Master modern full-stack application development"
                className={`w-full px-4 py-2.5 text-sm text-slate-800 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                  error.benefit ? "border-red-400" : "border-slate-200 focus:border-indigo-500"
                }`}
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-sm hover:shadow transition-all active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            {error.benefit && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {error.benefit}
              </p>
            )}
          </form>

          {/* Benefits Tags / List */}
          <div className="space-y-2 pt-1">
            {benefits.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200 text-center">
                No benefits added yet.
              </p>
            ) : (
              benefits.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 hover:border-indigo-200 hover:bg-indigo-50/30 rounded-xl transition-all"
                >
                  <span className="text-sm font-medium text-slate-700 break-all pr-2">
                    {item.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteBenefit(index)}
                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    title="Remove item"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Course Prerequisites Section */}
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-semibold text-slate-700">
              Course Prerequisites
            </label>
            <span className="text-xs text-slate-400 font-medium">
              {prerequisites.length} Added
            </span>
          </div>

          <form onSubmit={handleAddPrerequisite} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={prerequisiteValue}
                onChange={(e) => {
                  setPrerequisiteValue(e.target.value);
                  if (error.prerequisite) setError((prev) => ({ ...prev, prerequisite: "" }));
                }}
                placeholder="e.g. Basic knowledge of JavaScript and React"
                className={`w-full px-4 py-2.5 text-sm text-slate-800 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                  error.prerequisite ? "border-red-400" : "border-slate-200 focus:border-indigo-500"
                }`}
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-sm hover:shadow transition-all active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            {error.prerequisite && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {error.prerequisite}
              </p>
            )}
          </form>

          {/* Prerequisites Tags / List */}
          <div className="space-y-2 pt-1">
            {prerequisites.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200 text-center">
                No prerequisites added yet.
              </p>
            ) : (
              prerequisites.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 hover:border-indigo-200 hover:bg-indigo-50/30 rounded-xl transition-all"
                >
                  <span className="text-sm font-medium text-slate-700 break-all pr-2">
                    {item.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeletePrerequisite(index)}
                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    title="Remove item"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-8 mt-10 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setActive && setActive(active - 1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>

        <button
          type="button"
          onClick={() => setActive && setActive(active + 1)}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CourseOptions;