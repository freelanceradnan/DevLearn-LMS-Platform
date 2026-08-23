import React, { useState } from 'react';
import CourseInfo from './CourseInfo';
import CourseIndicator from './CourseIndicator';
import CourseOptions from './CourseOptions';

const CreateCourse = () => {
    const [active,setActive]=useState(1)
    //course info
    const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    estimatedPrice: '',
    tags: '',
    level: '',
    demoUrl: '',
    image: null,
  });
  //course options

  const [prerequisites,setPrerequisites]=useState([])
    return (
        <div className='max-w-5xl md:flex'>
        <div className='md:w-[70%]'>
       
       {/* course-info */}
        <div>
            
        {active==0 && <CourseInfo active={active} setActive={setActive} formData={formData} setFormData={setFormData} formData={formData} setFormData={setFormData}/>}
        {active==1 && <CourseOptions active={active} setActive={setActive} setPrerequisites={setPrerequisites}/>}
        {active==2 && <h2>this is two</h2>}
        {active==3 && <h2>this is three</h2>}
        {active==4&& <h2>this is four</h2>}
     
        </div>
        </div>
        <div className='md:w-[30%] mt-10'>
       <CourseIndicator active={active} setActive={setActive}/>
        </div>
       
        </div>
    );
};

export default CreateCourse;