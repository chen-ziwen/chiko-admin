import { lazy } from 'react';

import { createRootRoutes } from '@/router/core';
import type { AppRouteObject } from '@/router/core/types';

const Forbidden = lazy(() => import('@/pages/exception/403'));
const NotFound = lazy(() => import('@/pages/exception/404'));
const ServerError = lazy(() => import('@/pages/exception/500'));

// 全局路由
const routes: AppRouteObject[] = [
  {
    path: '403',
    element: <Forbidden />,
    handle: {
      title: '403',
      icon: 'material-symbols-light:block',
      constant: true,
      hideInMenu: true
    }
  },
  {
    path: '404',
    element: <NotFound />,
    handle: {
      title: '404',
      icon: 'material-symbols-light:error-outline',
      constant: true,
      hideInMenu: true
    }
  },
  {
    path: '500',
    element: <ServerError />,
    handle: {
      title: '500',
      icon: 'material-symbols-light:warning-outline',
      constant: true,
      hideInMenu: true
    }
  },
  {
    path: '*',
    element: <NotFound />,
    handle: {
      title: '404',
      icon: 'material-symbols-light:error-outline',
      constant: true,
      hideInMenu: true
    }
  }
];

export const globalExceptionRoutes = createRootRoutes(routes);
