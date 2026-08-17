import React from 'react';
import { useLogoutUserMutation } from '../Features/ApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Features/AuthSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate=useNavigate()
    const [logout]=useLogoutUserMutation()
    const dispatch=useDispatch()
    const logoutuser=async()=>{
    try {
    const result=await logout().unwrap()
    if(result){
    await dispatch(logoutUser())
    }
    toast.success('logout done')
    navigate('/')
    } catch (error) {
        
    }
    }
    return (
        <div>
            <button className='bg-blue-500 p-2 text-white rounded-sm' type='button' onClick={logoutuser}>Logout</button>
        </div>
    );
};

export default Dashboard;