import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import AppLayout from '@/pages';

// 懒加载路由组件
const Home = lazy(() => import('@/pages/home'));
const UserList = lazy(() => import('@/pages/system/user/list'));
const UserProfile = lazy(() => import('@/pages/system/user/profile'));
const RoleManagement = lazy(() => import('@/pages/system/role'));
const PermissionManagement = lazy(() => import('@/pages/system/permission'));
const SystemSettings = lazy(() => import('@/pages/system/settings'));
const PersonalCenter = lazy(() => import('@/pages/personal/center'));
const PersonalSettings = lazy(() => import('@/pages/personal/settings'));

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
    children: [
      {
        index: true,
        element: <Navigate to={import.meta.env.VITE_ROUTE_HOME} />
      },
      {
        path: '/home',
        element: <Home />,
        handle: {
          title: '首页',
          i18nKey: 'route.home',
          order: 0,
          keepAlive: true,
          icon: 'material-symbols-light:google-home-devices'
        }
      },
      {
        path: '/system',
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
            path: 'system-settings',
            element: <SystemSettings />,
            handle: {
              title: '系统设置',
              icon: 'hugeicons:align-box-top-center',
              keepAlive: true
            }
          }
        ]
      },
      {
        path: '/personal',
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
            path: 'personal-settings',
            element: <PersonalSettings />,
            handle: {
              title: '个人设置',
              icon: 'hugeicons:align-box-top-center',
              keepAlive: true
            }
          }
        ]
      }
    ]
  }
]);

export default router;
