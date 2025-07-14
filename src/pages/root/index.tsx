import type { FC, PropsWithChildren } from 'react';
import { useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  // 获取当前路由信息
  const location = useLocation();

  // 使用ref保存路由检查状态，避免不必要的重复检查
  const routeCheckRef = useRef({
    lastPath: '',
    needRedirect: false,
    redirectPath: ''
  });

  // 白名单路由 - 不需要登录也可以访问的路由
  const whiteList = useMemo(() => ['/login', '/login/register'], []);

  // 验证用户是否已登录 (这里使用您的实际逻辑)
  // const token = localStg.get('token');
  // const isLoggedIn = Boolean(token);
  const isLoggedIn = true; // 使用您的实际登录判断逻辑

  // 检查当前路由是否需要特定权限
  const checkRoutePermission = () => {
    const currentPath = location.pathname;

    // 如果路径没变，使用之前的检查结果
    if (currentPath === routeCheckRef.current.lastPath) {
      return !routeCheckRef.current.needRedirect;
    }

    // 更新最后检查的路径
    routeCheckRef.current.lastPath = currentPath;

    // 如果路径在白名单中或用户已登录，则不需要检查权限
    if (whiteList.includes(currentPath) || currentPath === '/login-out') {
      routeCheckRef.current.needRedirect = false;
      return true;
    }

    // 如果用户未登录，则需要重定向
    if (!isLoggedIn) {
      routeCheckRef.current.needRedirect = true;
      routeCheckRef.current.redirectPath = '/login';
      return false;
    }

    // 可以在这里添加更复杂的权限检查逻辑

    // 简单示例: 已登录用户都有权限访问
    routeCheckRef.current.needRedirect = false;
    return true;
  };

  // 如果不符合权限条件则重定向到登录页
  if (!checkRoutePermission()) {
    return (
      <Navigate
        replace
        to={routeCheckRef.current.redirectPath || '/login'}
      />
    );
  }

  return children;
};

export default RootLayout;
