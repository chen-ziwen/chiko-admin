import { lazy } from 'react';

import { createRootRoutes } from '@/router/core';
import type { AppRouteObject } from '@/router/core/types';

const PersonalCenter = lazy(() => import('@/pages/personal/center'));
const PersonalSettings = lazy(() => import('@/pages/personal/settings'));

const routes: AppRouteObject[] = [
  {
    path: 'personal',
    handle: { title: '个人中心', icon: 'material-symbols-light:account-circle' },
    children: [
      {
        path: 'center',
        element: <PersonalCenter />,
        handle: {
          title: '个人主页',
          icon: 'material-symbols-light:person',
          keepAlive: true
        }
      },
      {
        path: 'settings',
        element: <PersonalSettings />,
        handle: {
          title: '个人设置',
          icon: 'material-symbols-light:manage-accounts',
          keepAlive: true
        }
      }
    ]
  }
];

export const personalRoutes = createRootRoutes(routes);
