import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout'; // Import AdminLayout
import routes from './routes';
import { getUser } from '../../redux/auth/authSlice';

function ProtectedRoutes() {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.auth.user.isAdmin);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Routes>
      {routes.map(({ path, component: Component, exact, isAdmin: routeIsAdmin }, index) => {
        if (routeIsAdmin && isAdmin) {
          // Admin route with AdminLayout
          return (
            <Route key={index} path={path} exact={exact} element={
              <AdminLayout>
                <Component />
              </AdminLayout>
            } />
          );
        } else if (routeIsAdmin && !isAdmin) {
          // Admin route but user is not admin, redirect
          return (
            <Route key={index} path={path} exact={exact} element={<Navigate to='/admin/users' />} />
          );
        } else {
          // Regular route with AuthLayout
          return (
            <Route key={index} path={path} exact={exact} element={
              <AuthLayout>
                <Component />
              </AuthLayout>
            } />
          );
        }
      })}
    </Routes>
  );
}

export default ProtectedRoutes;
