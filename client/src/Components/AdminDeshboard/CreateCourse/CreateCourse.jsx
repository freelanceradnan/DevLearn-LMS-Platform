import React, { useState } from "react";
import CourseInfo from "./CourseInfo";
import CourseOptions from "./CourseOptions";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { ChevronRight, Check, ArrowLeft, ChevronLeft } from "lucide-react";
import {
  useAllCoursesQuery,
  useCreateCourseMutation,
  useImageUploadMutation,
  useUpdateCourseMutation,
 
} from "../../../Features/ApiSlice";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const STEPS = [
  { id: 0, title: "Course Info" },
  { id: 1, title: "Options & Prerequisites" },
  { id: 2, title: "Course Content" },
  { id: 3, title: "Preview & Submit" },
];

const CreateCourse = ({ state, setEditMode, editData,editId}) => {

  const navigate = useNavigate();
  const [updateCourse]=useUpdateCourseMutation()
  const [upload] = useImageUploadMutation();
  const [createcourse] = useCreateCourseMutation();
  const [imageFile, setImageFile] = useState(null);
  const [active, setActive] = useState(0);
  const [benefits, setBenefits] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [benefitValue, setBenefitValue] = useState("");
  const [prerequisiteValue, setPrerequisiteValue] = useState("");
  console.log(imageFile)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
  });
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);

  //edit form data auto filled
  useEffect(() => {
    if(editData){
      setFormData({
      name: editData?.name,
      description: editData?.description,
      price: editData?.price,
      estimatedPrice: editData?.estimatedPrice,
      tags: editData?.description,
      level: editData?.level,
      demoUrl: editData?.demoUrl,
    });
    setImageFile(editData.thumbnail.url)
    setBenefits(editData?.benefits);
    setPrerequisites(editData?.prerequisites);
    if (editData?.courseData) {
    const courseDataCopy = structuredClone(editData.courseData);
    setCourseContentData(courseDataCopy);
  }
    }
  }, [editData]);

  const courseData = {
    ...formData,
    benefits,
    prerequisites,
    courseData: courseContentData,
  };

  const createCourseHandler = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please provide a valid image!");

      return;
    }

    try {
      const formdataUpload = new FormData();
      formdataUpload.append("image", imageFile);

      const uploadRes = await upload(formdataUpload).unwrap();
      const finalImageUrl = uploadRes.url || uploadRes.secure_url;
     
      if (!finalImageUrl) {
        toast.error("Image upload failed. Please try again!");

        return;
      }

      const payload = {
        ...formData,
        thumbnail: {
         public_id: uploadRes.public_id,
         url: finalImageUrl,
  },
        courseData: courseContentData,
        benefits: benefits,
        prerequisites: prerequisites,
      };
   
      if(state){
  
      const result = await updateCourse({ editId, payload }).unwrap();
      setEditMode(false)
      toast.success('updated course success')
      
      }else{
      const result = await createcourse(payload).unwrap();
      navigate("/admin/allcourses");
      toast.success("Course created successfully!");
      }
    } catch (error) {
      console.error("Create course error:", error);
      toast.error(
        error?.data?.message || "Something went wrong. Please try again!",
      );
    } finally {
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-4 p-6">
      {state && (
        <button
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          onClick={() => setEditMode(false)}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      )}
      <nav
        aria-label="Progress"
        className="rounded-xl border border-gray-100 bg-white p-1 shadow-sm justify-center w-full"
      >
        <ol className="flex flex-wrap items-center gap-2 gap-3 w-full justify-center">
          {STEPS.map((step, index) => {
            const isActive = active === step.id;
            const isCompleted = active > step.id;

            return (
              <React.Fragment key={step.id}>
                <li className="w-full md:w-auto">
                  <div
                    className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all w-full ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : isCompleted
                          ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                        isActive
                          ? "bg-white text-blue-600"
                          : isCompleted
                            ? "bg-blue-200 text-blue-800"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-3 w-3 stroke-[3]" />
                      ) : (
                        step.id + 1
                      )}
                    </span>
                    <span>{step.title}</span>
                  </div>
                </li>

                {index < STEPS.length - 1 && (
                  <ChevronRight className="h-4 w-4 shrink-0 text-gray-400 hidden md:flex" />
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>

      {/* Main Content Area */}
      <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
        {active === 0 && (
          <CourseInfo
            state={state}
            active={active}
            setActive={setActive}
            formData={formData}
            setFormData={setFormData}
            imageFile={imageFile}
            setImageFile={setImageFile}
          />
        )}
        {active === 1 && (
          <CourseOptions
            active={active}
            setActive={setActive}
            setPrerequisites={setPrerequisites}
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            benefitValue={benefitValue}
            setBenefitValue={setBenefitValue}
            prerequisiteValue={prerequisiteValue}
            setPrerequisiteValue={setPrerequisiteValue}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
          />
        )}
        {active === 3 && (
          <CoursePreview
            createCourseHandler={createCourseHandler}
            courseData={courseData}
            setActive={setActive}
            active={active}
            state={state}
          />
        )}
      </div>
    </div>
  );
};

export default CreateCourse;
