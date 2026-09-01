import React, { useState } from "react";
import CourseInfo from "./CourseInfo";
import CourseOptions from "./CourseOptions";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { ChevronRight, Check } from "lucide-react";
import { useImageUploadMutation } from "../../../Features/ApiSlice";

const STEPS = [
  { id: 0, title: "Course Info" },
  { id: 1, title: "Options & Prerequisites" },
  { id: 2, title: "Course Content" },
  { id: 3, title: "Preview & Submit" },
];

const CreateCourse = () => {
  const [upload] = useImageUploadMutation();
  const [imageFile, setImageFile] = useState(null);
  const [active, setActive] = useState(0);
  const [benefits, setBenefits] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [benefitValue, setBenefitValue] = useState("");
  const [prerequisiteValue, setPrerequisiteValue] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    image: null,
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

  const courseData = {
    ...formData,
    benefits,
    prerequisites,
    courseData: courseContentData,
  };

  const createCourseHandler = async (e) => {
    e.preventDefault();
    if (imageFile) {
       const formdataUpload = new FormData();
      formdataUpload.append("image", imageFile);
      const data = await upload(formdataUpload).unwrap();
      finalImageUrl = data.url || data.secure_url;
      if (!finalImageUrl) {
        toast.error("Please provide a valid image!");
        setSaving(false);
        return;
      }
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
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
          />
        )}
      </div>
      <button className="bg-blue-500 px-1 py-2" onClick={createCourseHandler}>Create course</button>
    </div>
  );
};

export default CreateCourse;
