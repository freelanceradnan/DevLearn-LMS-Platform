import React, { useEffect, useState } from "react";
import { Camera, Mail, User, Lock, Eye, EyeOff, Save } from "lucide-react";
import { assets } from "../../../assets/assets";
import {
  useGetAdminInfoQuery,
  useImageUploadMutation,
  useUpdateAdminInfoMutation,
} from "../../../Features/ApiSlice";

const Profile = () => {
  const { data: AdminInfo } = useGetAdminInfoQuery();
  const [uploadImage] = useImageUploadMutation();
  const [updateInfo]=useUpdateAdminInfoMutation()
  const [form, setForm] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [preview, setPreview] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  useEffect(() => {
    if (AdminInfo) {
      setForm({
        name: AdminInfo.data.name || "Jone Doe",
        email: AdminInfo.data.email || "admin@gmail.com",
      });

      setPreview(AdminInfo.data.avatar.url);
    }
  }, [AdminInfo]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setPreview(file);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.newPassword && form.newPassword !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const imageFile = {
    public_id: "",
    url: "",
  };

  if (preview instanceof File) {
   
    const newImage = new FormData();
    newImage.append("image", preview);
    const res = await uploadImage(newImage).unwrap();
    
    imageFile.public_id = res.public_id;
    imageFile.url = res.url || res.secure_url; 
  } else {
    imageFile.public_id = AdminInfo?.data?.avatar?.public_id || "";
    imageFile.url = AdminInfo?.data?.avatar?.url || "";
  }


  const payload = {
    name: form.name,
    avatar: { ...imageFile },
  };

  if (form.newPassword) {
    payload.password = form.confirmPassword;
  }

  try {
    const res = await updateInfo(payload).unwrap();
    console.log("Update success:", res);
    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Update failed:", error);
    alert(error?.data?.message || "Failed to update profile");
  }
};
  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
        <p className="text-sm text-gray-500">
          Manage your account information and password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:flex-row">
        {/* Left: profile card */}
        <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:w-1/3">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src={
                  preview instanceof File
                    ? URL.createObjectURL(preview)
                    : preview
                }
                alt="Profile"
                className="h-28 w-28 rounded-full border-4 border-blue-100 object-cover"
              />
              <label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-600 p-2 text-white shadow transition hover:bg-blue-700"
              >
                <Camera size={16} />
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              {form.name}
            </h3>
            <p className="text-sm text-gray-500">{form.email}</p>

            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Active
            </span>
          </div>
        </div>

        {/* Right: forms */}
        <div className="w-full space-y-6 lg:w-2/3">
          {/* Account info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold text-gray-800">
              Account Information
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Change password */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-1 text-base font-semibold text-gray-800">
              Change Password
            </h3>
            <p className="mb-4 text-sm text-gray-500">
              Leave blank if you don't want to change it.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  New Password <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              <Save size={16} />
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
