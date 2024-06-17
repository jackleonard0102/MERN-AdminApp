import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { getStorage } from "../../helpers";

function PublicRoute() {
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isAdmin = useSelector(state => state.auth.user?.isAdmin);
  // const flag = getStorage('registered');
  
  if (isAuthenticated) {
    if (isAdmin) {
      return <Navigate to="/admin/users" />;
    }
    // return <Navigate to={flag ? '/home' : '/home'} />;
    return <Navigate to= '/dashboard' />;
  }
  return <Outlet />;
}
export default PublicRoute;