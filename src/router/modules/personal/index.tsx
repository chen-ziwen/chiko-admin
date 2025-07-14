import { lazy } from 'react';

import { createRootRoutes } from '../../core';
import type { AppRouteObject } from '../../core/types';

const PersonalCenter = lazy(() => import('@/pages/personal/center'));
const PersonalSettings = lazy(() => import('@/pages/personal/settings'));

const routes: AppRouteObject[] = [
  {
    path: 'personal',
    handle: { title: '个人中心', icon: 'hugeicons:align-box-top-center' },
    children: [
      {
        path: 'center',
        element: <PersonalCenter />,
        handle: {
          title: '个人主页',
          icon: 'hugeicons:align-box-top-center',
          keepAlive: true
        }
      },
      {
        path: 'settings',
        element: <PersonalSettings />,
        handle: {
          title: '个人设置',
          icon: 'hugeicons:align-box-top-center',
          keepAlive: true
        }
      }
    ]
  }
];

export const personalRoutes = createRootRoutes(routes);
