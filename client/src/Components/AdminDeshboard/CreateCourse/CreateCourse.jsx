import React, { useState } from "react";
import CourseInfo from "./CourseInfo";
import CourseIndicator from "./CourseIndicator";
import CourseOptions from "./CourseOptions";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";

const CreateCourse = () => {
  const [active, setActive] = useState(0);
  const [benefits, setBenefits] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  //sub value states
  const [benefitValue, setBenefitValue] = useState("");
  const [prerequisiteValue, setPrerequisiteValue] = useState("");
  //course info
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
  //course options
const [courseContentData,setCourseContentData]=useState([
  {
    videoUrl:"",
    title:"",
    description:"",
    videoSection:"",
    links:[
      {
        title:"",
        url:""
      },
    ],
    suggestion:"",
  }
])
const courseData={
  ...formData,
  courseData:courseContentData
}
const createCourseHandler=(e)=>{
  e.preventDefault()
}


  return (
    <div className="max-w-5xl md:flex">
      <div className="md:w-[70%]">
        {/* course-info */}
        <div>
          {active == 0 && (
            <CourseInfo
              active={active}
              setActive={setActive}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {active == 1 && (
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
          {active == 2 && <CourseContent active={active} setActive={setActive} courseContentData={courseContentData} setCourseContentData={setCourseContentData}/>}
          {active == 3 && <CoursePreview createCourseHandler={createCourseHandler} courseData={courseData}/>}
        </div>
      </div>
      <div className="md:w-[30%] mt-10">
        <CourseIndicator active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
