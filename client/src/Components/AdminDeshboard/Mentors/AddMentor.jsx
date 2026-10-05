import React, { useEffect, useState } from "react";
import {
  useCreateMentorMutation,
  useGetAllCategoryQuery,
  useGetMentorQuery,
  useImageUploadMutation,
  useUpdateMentorMutation,
} from "../../../Features/ApiSlice";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { CircleChevronLeft } from "lucide-react";

const AddMentor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  // API 
  const { data: allMentors } = useGetMentorQuery();
  const { data: allCategories } = useGetAllCategoryQuery();
  const [upload, { isLoading: isUploading }] = useImageUploadMutation();
  const [createMentor, { isLoading: isCreating }] = useCreateMentorMutation();
  const [updateMentor, { isLoading: isUpdating }] = useUpdateMentorMutation();

  const [imageFile, setImageFile] = useState(null);
  const [mentorData, setMentorData] = useState({
    name: "",
    category: "",
    description: "",
    students: 0,
    courses: 0,
  });

  const [socialLinks, setSocialLinks] = useState({
    fb: "",
    github: "",
    linkedin: "",
  });

  // Edit Mode 
  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (allMentors?.data) {
        const currentMentor = allMentors.data.find((m) => m._id === id);
        if (currentMentor) {
          setMentorData({
            name: currentMentor.name || "",
            category: currentMentor.category?._id || currentMentor.category || "",
            description: currentMentor.description || "",
            students: currentMentor.students || 0,
            courses: currentMentor.courses || 0,
          });
          setSocialLinks({
            fb: currentMentor.socialLinks?.fb || "",
            github: currentMentor.socialLinks?.github || "",
            linkedin: currentMentor.socialLinks?.linkedin || "",
          });
          setImageFile(currentMentor.avatar?.url || null);
        }
      }
    } else {
      setEditMode(false);
    }
  }, [id, allMentors]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setMentorData((prev) => ({ ...prev, [name]: value }));
  };

  const changeSocialHandler = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const AddMentorHandler = async (e) => {
    e.preventDefault();
    try {
      let avatarData = null;

      // Image Upload if  new 
      if (imageFile instanceof File) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploadImage = await upload(formData).unwrap();
        avatarData = {
          url: uploadImage.url,
          public_id: uploadImage.public_id,
        };
      } else if (editMode) {
        const currentMentor = allMentors?.data?.find((m) => m._id === id);
        avatarData = currentMentor?.avatar;
      }

      if (!editMode && !imageFile) {
        return toast.error("Image file is missing!");
      }

      const payload = {
        ...mentorData,
        avatar: avatarData,
        socialLinks,
      };

      if (editMode) {
        await updateMentor({ mentorId: id, payload }).unwrap();
        toast.success("Mentor updated successfully!");
      } else {
        await createMentor(payload).unwrap();
        toast.success("Mentor created successfully!");
      }

      navigate(-1);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save mentor");
      console.error(error);
    }
  };

  const isLoading = isUploading || isCreating || isUpdating;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-4 bg-white border-b border-gray-100">
          <button
            type="button"
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-sm transition-colors text-sm font-medium cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <CircleChevronLeft className="w-4 h-4" />
            Back to List
          </button>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 py-6 px-8 text-white">
          <h2 className="text-2xl font-bold tracking-wide">
            {editMode ? "Edit Mentor" : "Add New Mentor"}
          </h2>
          <p className="text-indigo-100 text-sm mt-1">
            {editMode
              ?"Modify the details below to update the mentor profile.":
              "Fill in the details below to register a new mentor profile."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={AddMentorHandler} className="p-8 space-y-6">
          {/* Image Upload Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
            <div className="relative group w-28 h-28 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 shadow-inner">
              {imageFile ? (
                <img
                  src={
                    imageFile instanceof File
                      ? URL.createObjectURL(imageFile)
                      : imageFile
                  }
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400 font-medium text-center p-2">
                  No Image
                </span>
              )}
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mentor Avatar
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={changeImageHandler}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer transition"
              />
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, or JPEG up to 5MB.
              </p>
            </div>
          </div>

          {/* Grid Layout for General Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. John Doe"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm"
                onChange={changeHandler}
                value={mentorData.name}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm bg-white"
                onChange={changeHandler}
                value={mentorData.category}
                required
              >
                <option value="">Select Category--</option>
                {allCategories?.[0]?.categories?.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Enrolled Students
              </label>
              <input
                type="number"
                name="students"
                placeholder="0"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm"
                onChange={changeHandler}
                value={mentorData.students}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Number of Courses
              </label>
              <input
                type="number"
                name="courses"
                placeholder="0"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm"
                onChange={changeHandler}
                value={mentorData.courses}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              placeholder="Write a brief bio or description about the mentor..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm resize-none"
              onChange={changeHandler}
              value={mentorData.description}
            />
          </div>

          {/* Social Links Section */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/60 space-y-4">
            <h3 className="text-sm font-bold text-gray-800 tracking-wide uppercase">
              Social Profiles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Facebook
                </label>
                <input
                  type="text"
                  name="fb"
                  placeholder="https://facebook.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-xs bg-white"
                  value={socialLinks.fb}
                  onChange={changeSocialHandler}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Github
                </label>
                <input
                  type="text"
                  name="github"
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-xs bg-white"
                  value={socialLinks.github}
                  onChange={changeSocialHandler}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  LinkedIn
                </label>
                <input
                  type="text"
                  name="linkedin"
                  placeholder="https://linkedin.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-xs bg-white"
                  value={socialLinks.linkedin}
                  onChange={changeSocialHandler}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 flex items-center justify-center min-w-[160px] disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : editMode ? (
                "Update Mentor"
              ) : (
                "Add Mentor"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMentor;