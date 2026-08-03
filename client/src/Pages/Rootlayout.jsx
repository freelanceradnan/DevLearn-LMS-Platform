import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Banner from '../Components/Banner';

const Rootlayout = () => {
    return (
        <div>
           <Banner/>
           <Navbar/>
           <main>
            <Outlet/>
           </main>
           <Footer/>
        </div>
    );
};

export default Rootlayout;