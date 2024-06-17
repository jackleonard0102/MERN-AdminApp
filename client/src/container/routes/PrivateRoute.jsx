import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

function PrivateRoute() {
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isAdmin = useSelector(state => state.auth.user?.isAdmin);

  if (isAuthenticated) {
    if (isAdmin && location.pathname === '/') {
      return <Navigate to='/admin/users' />;
    }
    return <Outlet />;
  }

  return <Navigate to='/login' state={{ from: location }} />;
}

export default PrivateRoute;