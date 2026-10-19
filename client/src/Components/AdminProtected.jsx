import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AdminProtected = () => {
  const { admin, isLoading } = useSelector((state) => state.admin);
  const location = useLocation();


  if (isLoading) {
    return <div>Loading...</div>; 
  }


  if (!admin || admin.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  return <Outlet />;
};

export default AdminProtected;