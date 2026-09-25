import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "./../assets/assets";
import { useGetUserInfoQuery, useImageUploadMutation, useUpdateUserInfoMutation } from "../Features/ApiSlice";
import { setUser } from "../Features/AuthSlice";


const ProfileInfo = () => {
  const dispatch = useDispatch();
  const [upload, { isLoading: isUploading }] = useImageUploadMutation();
  const [updateUserInfo, { isLoading: isUpdating }] = useUpdateUserInfoMutation();
  const {data:userInfo}=useGetUserInfoQuery()
  
  // const userInfo = useSelector((state) => state.auth);
  const [imageFile, setimageFile] = useState(null);
  
  const [avatar, setAvatar] = useState({
    public_id: userInfo?.user?.avatar?.public_id || "",
    url: userInfo?.user?.avatar?.url || "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    date: "",
    mobile: "",
  });
console.log(userInfo)
  useEffect(() => {
    if (userInfo) {
      setFormData({
        fullName: userInfo.name || "",
        email: userInfo.email || "",
        date: userInfo.date ? userInfo.date.split("T")[0] : "",
        mobile: userInfo.mobile || "",
      });
      if (userInfo.avatar) {
        setAvatar({
          public_id: userInfo.avatar.public_id || "",
          url: userInfo.avatar.url || "",
        });
      }
    }
    dispatch(setUser(userInfo))
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const ImageHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      setimageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let avatarObj = avatar;

      if (imageFile) {
        const updateImage = new FormData();
        updateImage.append("image", imageFile);
        const uploadRes = await upload(updateImage).unwrap();
        const finalImageUrl = uploadRes?.url || uploadRes?.secure_url;
        
        avatarObj = {
          public_id: uploadRes.public_id,
          url: finalImageUrl,
        };
      }
      const payload = {
        name: formData.fullName,
        mobile: formData.mobile,
        date: formData.date,
        avatar: avatarObj,
      };

      const result = await updateUserInfo(payload).unwrap();
      
      if (result) {
        const updatedUser = result.user || result; 
        
        setFormData({
          fullName: updatedUser.name || "",
          email: updatedUser.email || "",
          date: updatedUser.date ? updatedUser.date.split("T")[0] : "",
          mobile: updatedUser.mobile || "",
        });

        if (updatedUser.avatar) {
          setAvatar({
            public_id: updatedUser.avatar.public_id,
            url: updatedUser.avatar.url,
          });
        }
        
        setimageFile(null);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert(error?.data?.message || "Something went wrong!");
    }
  };

  const profileImageSrc = imageFile 
    ? URL.createObjectURL(imageFile) 
    : (avatar.url || assets.guestUser);

  return (
    <div className="md:max-w-3xl mx-auto md:px-6 space-y-6 w-full py-5 md:py-0">
      <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm flex items-center gap-6">
        <img
          className="w-20 h-20 rounded-full object-cover bg-gray-100 flex items-center justify-center border text-gray-400 font-semibold text-xl"
          src={profileImageSrc}
          alt="Profile"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Profile Photo</h2>
          <p className="text-sm text-gray-500 mb-3">
            PNG, JPG, or GIF up to 5MB.
          </p>
          <input
            type="file"
            accept="image/*"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={ImageHandler}
          />
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h2>
          <p className="text-sm text-gray-500">
            Update your personal details and how others see you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                disabled
                id="email"
                name="email"
                value={formData.email}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 outline-none text-sm text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-1">
              <label htmlFor="date" className="text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>

            {/* Mobile No */}
            <div className="flex flex-col gap-1">
              <label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                Mobile No
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUploading || isUpdating}
              className="px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400"
            >
              {isUploading || isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;