import React, { useState } from 'react';
import CourseInfo from './CourseInfo';
import CourseOptions from './CourseOptions';

const CreateCourse = () => {
    const [active,setActive]=useState(0)

    return (
        <div className='max-w-5xl flex'>
        <div className='w-[80%]'>
        <h2 className='text-[#444050] text-xl font-semibold'>Add A New Course</h2>
        <p className='text-sm text-[#444050]'>Create a new course for website.</p>
       {/* course-info */}
        <div>
            
        {active==0 && <CourseInfo/>}
        {active==1 && <h2>this is one</h2>}
        {active==2 && <h2>this is two</h2>}
        {active==3 && <h2>this is three</h2>}
        {active==4&& <h2>this is four</h2>}
     
        </div>
        </div>
        <div className='w-[20%]'>
       <CourseOptions active={active} setActive={setActive}/>
        </div>
       
        </div>
    );
};

export default CreateCourse;