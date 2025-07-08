import { Suspense, lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import AppLayout from '@/pages';
import Home from '@/pages/home';

// 懒加载路由组件
const UserList = lazy(() => import('@/pages/system/user/list'));
const UserProfile = lazy(() => import('@/pages/system/user/profile'));
const RoleManagement = lazy(() => import('@/pages/system/role'));
const PermissionManagement = lazy(() => import('@/pages/system/permission'));
const SystemSettings = lazy(() => import('@/pages/system/settings'));
const PersonalCenter = lazy(() => import('@/pages/personal/center'));
const PersonalSettings = lazy(() => import('@/pages/personal/settings'));

// 先这么写让内容先展示 后续会补上权限路由逻辑
const router = createBrowserRouter([
  {
    path: '/login',
    handle: {
      title: '登录',
      icon: 'material-symbols-light:login',
      constant: true
    }
  },
  {
    path: '/',
    Component: AppLayout,
    handle: {
      title: '首页'
    },
    children: [
      {
        index: true,
        element: <Navigate to={import.meta.env.VITE_ROUTE_HOME} />
      },
      {
        path: '/home',
        Component: Home,
        handle: {
          title: '首页',
          fixedIndexInTab: 0,
          keepAlive: true,
          icon: 'material-symbols-light:home'
        }
      },
      {
        path: 'system',
        handle: { title: '系统管理', icon: 'hugeicons:align-box-top-center' },
        children: [
          {
            path: 'user',
            handle: { title: '用户管理', icon: 'hugeicons:align-box-top-center' },
            children: [
              {
                path: 'list',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <UserList />
                  </Suspense>
                ),
                handle: { title: '用户列表', icon: 'hugeicons:align-box-top-center', keepAlive: true }
              },
              {
                path: 'profile',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <UserProfile />
                  </Suspense>
                ),
                handle: { title: '用户详情', icon: 'hugeicons:align-box-top-center', hideInMenu: true }
              }
            ]
          },
          {
            path: 'role',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <RoleManagement />
              </Suspense>
            ),
            handle: { title: '角色管理', icon: 'hugeicons:align-box-top-center', keepAlive: true }
          },
          {
            path: 'permission',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PermissionManagement />
              </Suspense>
            ),
            handle: { title: '权限管理', icon: 'hugeicons:align-box-top-center', keepAlive: true }
          },
          {
            path: 'settings',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <SystemSettings />
              </Suspense>
            ),
            handle: { title: '系统设置', icon: 'hugeicons:align-box-top-center', keepAlive: true }
          }
        ]
      },
      {
        path: 'personal',
        handle: { title: '个人中心', icon: 'hugeicons:align-box-top-center' },
        children: [
          {
            path: 'center',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PersonalCenter />
              </Suspense>
            ),
            handle: { title: '个人主页', icon: 'hugeicons:align-box-top-center', keepAlive: true }
          },
          {
            path: 'settings',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PersonalSettings />
              </Suspense>
            ),
            handle: { title: '个人设置', icon: 'hugeicons:align-box-top-center', keepAlive: true }
          }
        ]
      }
    ]
  }
]);

export default router;
