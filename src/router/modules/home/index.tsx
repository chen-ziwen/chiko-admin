import { lazy } from 'react';

import { createRootRoutes } from '@/router/core';
import type { AppRouteObject } from '@/router/core/types';

const Home = lazy(() => import('@/pages/home'));

const routes: AppRouteObject[] = [
  {
    path: 'home',
    element: <Home />,
    handle: {
      title: '首页',
      i18nKey: 'route.home',
      order: 0,
      keepAlive: true,
      icon: 'material-symbols-light:google-home-devices'
    }
  }
];

export const homeRoutes = createRootRoutes(routes);
