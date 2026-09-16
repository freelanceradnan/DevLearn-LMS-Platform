import React, { useEffect, useState } from 'react';
import Hero from '../Components/Hero';
import PopularCourses from '../Components/PopularCourses';
import CourseCard from '../Components/CourseCart';
import CategoriesCard from '../Components/CategoriesCard';
import Testimonial from '../Components/Testimonial';
import Faq from '../Components/Faq';
import AuthModel from '../Components/AuthModel';
import PartnersSection from '../Components/TrustedParners';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (location.state?.openAuthModal) {
      setModal(true);
    }
  }, [location]);
  return (
    <div>
      <Hero/>
      <PopularCourses/>
      <CategoriesCard/>
      <Testimonial/>
    
      <Faq/>
       <PartnersSection/>
    {modal && <AuthModel setModal={setModal} state="login" />}
    </div>
  );
};

export default Home;