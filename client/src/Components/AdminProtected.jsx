import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtected = () => {
    const {admin,isLoading}=useSelector((state)=>state.admin)
 
    if(isLoading){
        return <div>Loading...</div>
    }
    if(!admin ||admin?.role!=='admin'){
        return <Navigate to="/login" replace/>
    }
   return <Outlet/>
};

export default AdminProtected;