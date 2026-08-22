import React, { useState } from 'react';
import CourseInfo from './CourseInfo';
import CourseIndicator from './CourseIndicator';

const CreateCourse = () => {
    const [active,setActive]=useState(0)

    return (
        <div className='max-w-5xl md:flex'>
        <div className='md:w-[70%]'>
       
       {/* course-info */}
        <div>
            
        {active==0 && <CourseInfo/>}
        {active==1 && <h2>this is one</h2>}
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

export default CourseIndicator;