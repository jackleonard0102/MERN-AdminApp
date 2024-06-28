import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isAdmin = useSelector((state) => state.auth.user?.isAdmin);

  return isAdmin ? children : <Navigate to="/dashboard" />;
};

export default AdminRoute;
