import React, { useState } from 'react';
import Hero from '../Components/Hero';
import PopularCourses from '../Components/PopularCourses';
import CourseCard from '../Components/CourseCart';
import CategoriesCard from '../Components/CategoriesCard';
import Testimonial from '../Components/Testimonial';
import Faq from '../Components/Faq';
import AuthModel from '../Components/AuthModel';
import PartnersSection from '../Components/TrustedParners';

const Home = () => {
  
  return (
    <div>
      <Hero/>
      <PopularCourses/>
      <CategoriesCard/>
      <Testimonial/>
    
      <Faq/>
       <PartnersSection/>
    
    </div>
  );
};

export default Home;