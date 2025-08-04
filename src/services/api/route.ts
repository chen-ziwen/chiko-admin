import { request } from '../request';

// 获取用户路由
export function fetchGetUserRoutes() {
  return request<Api.Route.UserRoute>({ url: '/route/getReactUserRoutes' });
}

// 判断路由是否存在
export function fetchIsRouteExist(routeName: string) {
  return request<boolean>({ params: { routeName }, url: '/route/isRouteExist' });
}
