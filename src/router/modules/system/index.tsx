import { lazy } from 'react';

import { createRootRoutes } from '../../core';
import type { AppRouteObject } from '../../core/types';

const UserList = lazy(() => import('@/pages/system/user/list'));
const UserProfile = lazy(() => import('@/pages/system/user/profile'));
const RoleManagement = lazy(() => import('@/pages/system/role'));
const PermissionManagement = lazy(() => import('@/pages/system/permission'));
const SystemSettings = lazy(() => import('@/pages/system/settings'));

const routes: AppRouteObject[] = [
  {
    path: 'system',
    handle: { title: '系统管理', icon: 'hugeicons:align-box-top-center' },
    children: [
      {
        path: 'user',
        handle: {
          title: '用户管理',
          icon: 'hugeicons:align-box-top-center'
        },
        children: [
          {
            path: 'list',
            element: <UserList />,
            handle: {
              title: '用户列表',
              icon: 'hugeicons:align-box-top-center',
              keepAlive: true
            }
          },
          {
            path: 'profile',
            element: <UserProfile />,
            handle: {
              title: '用户详情',
              icon: 'hugeicons:align-box-top-center',
              hideInMenu: true
            }
          }
        ]
      },
      {
        path: 'role',
        element: <RoleManagement />,
        handle: {
          title: '角色管理',
          icon: 'hugeicons:align-box-top-center',
          keepAlive: true
        }
      },
      {
        path: 'permission',
        element: <PermissionManagement />,
        handle: {
          title: '权限管理',
          icon: 'hugeicons:align-box-top-center',
          keepAlive: true
        }
      },
      {
        path: 'settings',
        element: <SystemSettings />,
        handle: {
          title: '系统设置',
          icon: 'hugeicons:align-box-top-center',
          keepAlive: true
        }
      }
    ]
  }
];

export const systemRoutes = createRootRoutes(routes);
