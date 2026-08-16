import React from 'react';
import ProfileMenu from '../Components/ProfileMenu';
import { Outlet } from 'react-router-dom';

const Profile = () => {
    return (
        <div className='w-full max-w-6xl mx-auto px-4 py-6 md:flex'>
            {/* sidebar */}
            <div className='md:max-w-64 border border-[#D1D2E0] py-4 px-4 w-full h-full'>
                <ProfileMenu/>
            </div>
            {/* options menu */}
            <div className='w-full mx-auto'>
           <Outlet/>
            </div>
        </div>
    );
};

export default Profile;