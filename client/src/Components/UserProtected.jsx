import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const UserProtected = ({ children }) => {
  const location = useLocation();
  
 
  const { user } = useSelector((state) => state.auth); 
  const isAuthenticated = !!user; 

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ openAuthModal: true, from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default UserProtected;