import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout'; // Import AdminLayout
import routes from './routes';
import AdminRoute from './AdminRoute';
import { getUser } from '../../redux/auth/authSlice';

function ProtectedRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Separate routes into admin and non-admin routes
  const adminRoutes = routes.filter((route) => route.isAdmin);
  const regularRoutes = routes.filter((route) => !route.isAdmin);

  return (
    <Routes>
      {/* Render regular routes with AuthLayout */}
      {regularRoutes.map(({ component: Component, path, exact }, index) => (
        <Route
          key={index}
          path={path}
          exact={exact}
          element={
            <AuthLayout>
              <Component />
            </AuthLayout>
          }
        />
      ))}

      {/* Render admin routes with AdminLayout and AdminRoute */}
      {adminRoutes.map(({ component: Component, path, exact }, index) => (
        <Route
          key={index}
          path={path}
          exact={exact}
          element={
            <AdminLayout>
              <AdminRoute>
                <Component />
              </AdminRoute>
            </AdminLayout>
          }
        />
      ))}
    </Routes>
  );
}

export default ProtectedRoutes;
