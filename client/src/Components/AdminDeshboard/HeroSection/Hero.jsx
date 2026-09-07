import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  useGetHeroInfoQuery,
  useImageUploadMutation,
  useUpdateHeroMutation,
} from "../../../Features/ApiSlice";

const Hero = () => {
  const [upload] = useImageUploadMutation();
  const { data } = useGetHeroInfoQuery();

  const [updateHero] = useUpdateHeroMutation();
  const [imageFile, setImageFile] = useState(null);

  const [heroData, setHeroData] = useState({
    title: "",
    subTitle: "",
    image: null,
  });
  useEffect(() => {
    if (data) {
      setHeroData({
        title: data[0]?.title,
        subTitle: data[0]?.subTitle,
        image: data[0]?.image.url,
      });
    }
  }, [data]);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setHeroData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const changeImage = (e) => {
    const file = e.target.files[0];
    setHeroData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let imageObj = heroData.image||data[0].image
      let newFile = imageFile && imageFile instanceof File;
      if (newFile) {
        const formdataUpload = new FormData();
        formdataUpload.append("image", imageFile);

        const uploadRes = await upload(formdataUpload).unwrap();
        imageObj = {
          public_id: uploadRes.public_id,
          url: uploadRes.url,
        };
      }
      const payload = {
        title: heroData.title,
        subTitle: heroData.subTitle,
        image: {
          public_id: imageObj.public_id,
          url: imageObj.url,
        },
      };
      if (payload) {
        const dataId = data?.[0]?._id;

        if (!dataId) {
          toast.error("Hero section ID not found!");
          return;
        }

        const result = await updateHero({ dataId, payload }).unwrap();
      }
    } catch (error) {}
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Edit Hero Section
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Update the title, subtitle, and image featured on your hero section.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm sm:p-8">
        <form onSubmit={SubmitHandler} className="space-y-6">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="hero-title"
              className="text-sm font-semibold text-gray-700"
            >
              Hero Title
            </label>
            <input
              id="hero-title"
              type="text"
              name="title"
              placeholder="e.g. Build faster with our components"
              value={heroData.title}
              onChange={changeHandler}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="hero-subtitle"
              className="text-sm font-semibold text-gray-700"
            >
              Hero Subtitle
            </label>
            <input
              id="hero-subtitle"
              type="text"
              name="subTitle"
              placeholder="e.g. Everything you need to scale your application..."
              value={heroData.subTitle}
              onChange={changeHandler}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Hero Image
            </label>
            <p className="text-xs text-amber-600 font-medium">
              * Notice: Please upload an image with the background removed
              (PNG/WebP recommended).
            </p>

            <div className="mt-2 flex items-center gap-4">
              {heroData.image && (
                <div className="relative size-20 rounded-xl border border-gray-200 overflow-hidden shrink-0 bg-gray-50 flex items-center justify-center shadow-inner">
                  <img
                    src={
                      typeof heroData.image === "object"
                        ? URL.createObjectURL(heroData.image)
                        : heroData.image
                    }
                    alt="Hero Preview"
                    className="w-full h-full object-contain p-1"
                  />
                </div>
              )}

              <label className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 file:cursor-pointer cursor-pointer border border-gray-200 rounded-xl p-1 focus:outline-none transition-all"
                />
              </label>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Save Changes
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
