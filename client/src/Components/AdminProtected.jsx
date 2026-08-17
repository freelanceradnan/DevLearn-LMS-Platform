import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtected = () => {
    const {user,isLoading}=useSelector((state)=>state.auth)
    if(isLoading){
        return <div>Loading...</div>
    }
    if(!user ||user?.role!=='admin'){
        return <Navigate to="/" replace/>
    }
   return <Outlet/>
};

export default AdminProtected;