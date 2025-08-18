import { HttpResponse, http } from 'msw';

const flatUserRoutes = [
  '/home',
  '/personal',
  '/personal/center',
  '/personal/settings',
  '/error',
  '/error/403',
  '/error/404',
  '/error/500',
  '/system',
  '/system/user',
  '/system/user/list',
  '/system/user/profile',
  '/system/role',
  '/system/permission'
];

export const routeHandlers = [

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
      code: 200,
      message: '获取用户路由成功',
      data: {
        home: '/home',
        routes: flatUserRoutes
      }
    });
  }),

  http.get('/route/isRouteExist', ({ request }) => {
    const url = new URL(request.url);
    const routeName = url.searchParams.get('routeName');

    if (!routeName) {
      return HttpResponse.json(
        {
          code: 400,
          message: '路由名称参数缺失'
        },
        { status: 400 }
      );
    }

    const isExist = flatUserRoutes.includes(routeName);

    return HttpResponse.json({
      code: 200,
      message: '检查路由存在性成功',
      data: isExist
    });
  })
];
