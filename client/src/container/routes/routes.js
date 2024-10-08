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
    path: 'new-entry/personal',
    component: lazy(() => import('../pages/Home/Entry/Personal')),
    exact: true,
  },
  {
    path: 'new-entry/business',
    component: lazy(() => import('../pages/Home/Entry/Business')),
    exact: true,
  },
  {
    path: 'recommendations/business',
    component: lazy(() => import('../pages/Home/Recommendation/Business')),
    exact: true,
  },
  {
    path: 'recommendations/personal',
    component: lazy(() => import('../pages/Home/Recommendation/Personal')),
    exact: true,
  },
  {
    path: 'recommendations/general',
    component: lazy(() => import('../pages/Home/Recommendation/General')),
    exact: true,
  },
  {
    path: 'reports',
    component: lazy(() => import('../pages/Home/Report')),
    exact: true,
  },
  {
    path: 'admin/profile',
    component: lazy(() => import('../pages/Admin/Profile/Edit')),
    exact: true,
    isAdmin: true,
  },
  {
    path: 'admin/settings',
    component: lazy(() => import('../pages/Admin/Settings/Settings')),
    exact: true,
    isAdmin: true,
  },
  {
    path: 'admin/users',
    component: lazy(() => import('../pages/Admin/Users')),
    exact: true,
    isAdmin: true,
  },
];

export default routes;
