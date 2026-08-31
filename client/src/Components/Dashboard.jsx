import React from 'react';
import { useLogoutUserMutation } from '../Features/ApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Features/AuthSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate=useNavigate()
   
    return (
        <div>
          <h2>adnan</h2>
        </div>
    );
};

export default Dashboard;