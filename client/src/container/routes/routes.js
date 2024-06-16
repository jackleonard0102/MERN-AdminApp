import { lazy } from 'react';

const routes = [
  {
    path: 'home',
    component: lazy(() => import('../pages/Home/Home')),
    // isPayed: true,
    exact: true,
  },
  // {
  //   path: 'admin/users/:id/history',
  //   component: lazy(() => import('../pages/Home/Home')),
  //   exact: true,
  // },
  // {
  //   path: 'plans',
  //   component: lazy(() => import('../pages/Price/Lists')),
  //   exact: true,
  // },
  // {
  //   path: 'plans/:slug',
  //   component: lazy(() => import('../pages/Price/Subscription')),
  //   exact: true,
  // },
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
