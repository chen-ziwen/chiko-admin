import { lazy } from 'react';

import { createRootRoutes } from '@/router/core';
import type { AppRouteObject } from '@/router/core/types';

const Login = lazy(() => import('@/pages/login/layout'));
const Register = lazy(() => import('@/pages/login/register'));
const LoginOut = lazy(() => import('@/pages/login/login-out'));

const routes: AppRouteObject[] = [
  {
    path: 'login',
    element: <Login />,
    handle: {
      title: '登录',
      icon: 'material-symbols-light:login',
      constant: true,
      hideInMenu: true
    }
  },
  {
    path: 'register',
    element: <Register />,
    handle: {
      title: '注册',
      icon: 'material-symbols-light:app-registration',
      constant: true,
      hideInMenu: true
    }
  },
  {
    path: 'login-out',
    element: <LoginOut />,
    handle: {
      title: '退出登录',
      icon: 'material-symbols-light:logout',
      constant: true,
      hideInMenu: true
    }
  }
];

export const loginRoutes = createRootRoutes(routes);
