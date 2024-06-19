import { lazy } from 'react';

const routes = [
  {
    path: 'dashboard',
    component: lazy(() => import('../pages/Home/Dashboard')),
    exact: true,
  },
  {
    path: 'search',
    component: lazy(() => import('../pages/Home/Search')),
    exact: true,
  },
  {
    path: 'user/profile',
    component: lazy(() => import('../pages/Profile/Edit')),
    exact: true,
  },
  {
    path: 'admin/users',
    component: lazy(() => import('../pages/Admin/Users')),
    exact: true,
    isAdmin: true,
  },
];

export default routes;
