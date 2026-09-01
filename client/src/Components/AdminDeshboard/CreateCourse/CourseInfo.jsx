import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CourseInfo = ({ active, setActive, formData, setFormData,imageFile,setImageFile}) => {
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log("d");
    // Handle form validation or submission here
    setActive(1);
  };
  //  const handleImage=(e)=>{
  //   const file=e.target.files[0]
  //   console.log(file)
  //  }
  console.log(imageFile);
  const handlerNext = () => {
    const requiredFields = [
      formData.name,
      formData.description,
      formData.price,
      formData.estimatedPrice,
      formData.tags,
      formData.level,
      formData.demoUrl,
      formData.image,
    ];
    const hasEmptyField = requiredFields.some(
      (field) => typeof field === "string" && field.trim() === "",
    );
    if (hasEmptyField) {
      toast.error(`Please filled all input filed`);
    } else {
      setActive(active + 1);
    }
  };
  return (
    <div className="max-w-2xl mx-auto md:p-4 bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 py-2">
        Add Your Course Information
      </h2>

      <form onSubmit={handleNext} className="w-full flex flex-col gap-5">
        {/* Course Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Course Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Complete Web Development Bootcamp"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a detailed course summary..."
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Price & Estimated Price */}
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700"
            >
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="29"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="estimatedPrice"
              className="text-sm font-medium text-gray-700"
            >
              Estimated Price ($)
            </label>
            <input
              type="number"
              id="estimatedPrice"
              name="estimatedPrice"
              value={formData.estimatedPrice}
              onChange={handleChange}
              placeholder="99"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Course Tags */}
        <div className="flex flex-col gap-1">
          <label htmlFor="tags" className="text-sm font-medium text-gray-700">
            Course Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="React, Tailwind, Frontend (comma separated)"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Level & Demo URL */}
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="level"
              className="text-sm font-medium text-gray-700"
            >
              Course Level
            </label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="demoUrl"
              className="text-sm font-medium text-gray-700"
            >
              Demo URL
            </label>
            <input
              type="text"
              id="demoUrl"
              name="demoUrl"
              value={formData.demoUrl}
              onChange={handleChange}
              placeholder="Enter videocyper video Id"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Thumbnail Image Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Product Image
          </label>
          <div className="flex items-center gap-4">
            {(imageFile || formData.image) && (
              <div className="size-16 rounded-lg border border-zinc-200 overflow-hidden shrink-0 bg-app-cream">
                <img
                  src={
                    imageFile ? URL.createObjectURL(imageFile) : formData.image
                  }
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
            />
          </div>
        </div>
        <div>{/* <img src={set} alt="" /> */}</div>

        {/* Controls */}
        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={handlerNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInfo;
