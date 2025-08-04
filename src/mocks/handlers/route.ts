import { HttpResponse, http } from 'msw';

const mockConstantRoutes: Api.Route.MenuRoute[] = [
  {
    id: '1',
    name: 'login',
    path: '/login',
    component: 'layout.blank$view.login',
    meta: {
      title: '登录',
      constant: true,
      hideInMenu: true
    }
  },
  {
    id: '2',
    name: 'home',
    path: '/home',
    component: 'layout.base$view.home',
    meta: {
      title: '首页',
      icon: 'mdi:home',
      order: 1
    }
  },
  {
    id: '3',
    name: '403',
    path: '/403',
    component: 'layout.blank$view.403',
    meta: {
      title: '无权限',
      constant: true,
      hideInMenu: true
    }
  },
  {
    id: '4',
    name: '404',
    path: '/404',
    component: 'layout.blank$view.404',
    meta: {
      title: '页面不存在',
      constant: true,
      hideInMenu: true
    }
  },
  {
    id: '5',
    name: '500',
    path: '/500',
    component: 'layout.blank$view.500',
    meta: {
      title: '服务器错误',
      constant: true,
      hideInMenu: true
    }
  }
];

// Mock data for user routes
const mockUserRoutes: Api.Route.MenuRoute[] = [
  {
    id: '10',
    name: 'dashboard',
    path: '/dashboard',
    component: 'layout.base$view.dashboard',
    meta: {
      title: '仪表盘',
      icon: 'mdi:view-dashboard',
      order: 2
    }
  },
  {
    id: '20',
    name: 'system',
    path: '/system',
    meta: {
      title: '系统管理',
      icon: 'mdi:cog',
      order: 3
    },
    children: [
      {
        id: '21',
        name: 'system_user',
        path: '/system/user',
        component: 'layout.base$view.system_user',
        meta: {
          title: '用户管理',
          icon: 'mdi:account-multiple',
          roles: ['admin', 'user']
        }
      },
      {
        id: '22',
        name: 'system_role',
        path: '/system/role',
        component: 'layout.base$view.system_role',
        meta: {
          title: '角色管理',
          icon: 'mdi:account-key',
          roles: ['admin']
        }
      },
      {
        id: '23',
        name: 'system_menu',
        path: '/system/menu',
        component: 'layout.base$view.system_menu',
        meta: {
          title: '菜单管理',
          icon: 'mdi:menu',
          roles: ['admin']
        }
      }
    ]
  },
  {
    id: '30',
    name: 'about',
    path: '/about',
    component: 'layout.base$view.about',
    meta: {
      title: '关于',
      icon: 'mdi:information',
      order: 4
    }
  }
];

export const routeHandlers = [
  // 获取常量路由
  http.get('/route/getConstantRoutes', () => {
    return HttpResponse.json({
      code: '0000',
      message: '获取常量路由成功',
      data: mockConstantRoutes
    });
  }),

  // 获取用户路由
  http.get('/route/getUserRoutes', ({ request }) => {
    const token = request.headers.get('authorization');

    if (!token) {
      return HttpResponse.json(
        {
          code: 401,
          message: '未提供认证令牌'
        },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      code: '0000',
      message: '获取用户路由成功',
      data: mockUserRoutes
    });
  }),

  // 获取React用户路由（兼容性接口）
  http.get('/route/getReactUserRoutes', ({ request }) => {
    const token = request.headers.get('authorization');

    if (!token) {
      return HttpResponse.json(
        {
          code: 401,
          message: '未提供认证令牌'
        },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      code: '0000',
      message: '获取React用户路由成功',
      data: mockUserRoutes
    });
  }),

  // 判断路由是否存在
  http.get('/route/isRouteExist', ({ request }) => {
    const url = new URL(request.url);
    const routeName = url.searchParams.get('routeName');

    if (!routeName) {
      return HttpResponse.json({
        code: 400,
        message: '路由名称不能为空'
      });
    }

    // 检查常量路由和用户路由中是否存在该路由名称
    const allRoutes = [...mockConstantRoutes, ...mockUserRoutes];
    const routeExists = checkRouteExists(allRoutes, routeName);

    return HttpResponse.json({
      code: '0000',
      message: '检查路由成功',
      data: routeExists
    });
  })
];

// 递归检查路由是否存在的辅助函数
function checkRouteExists(routes: any[], routeName: string): boolean {
  for (const route of routes) {
    if (route.name === routeName) {
      return true;
    }
    if (route.children && checkRouteExists(route.children, routeName)) {
      return true;
    }
  }
  return false;
}
