import { Outlet } from 'react-router-dom';
import type { ShouldRevalidateFunctionArgs } from 'react-router-dom';

import { usePrevious, useRoute } from '@/features/router';

// function handleRouteSwitch(to: Router.Route, from: Router.Route) {

//   if (to.handle.href) {
//     window.open(to.handle.href, '_blank');

//     return { path: from?.fullPath as string, replace: true };
//   }

//   return null;
// }

// function createRouteGuard(to: Router.Route, roles: string[], isSuper: boolean, previousRoute: Router.Route | null) {
//   const loginRoute = '/login';
//   const isLogin = Boolean(localStg.get('token'));

//   const notFoundRoute = 'notFound';
//   const isNotFoundRoute = to.id === notFoundRoute;

//   if (!isLogin) {
//     // if the user is not logged in and the route is a constant route but not the "not-found" route, then it is allowed to access.
//     if (to.handle.constant && !isNotFoundRoute) {
//       return null;
//     }

//     // if the user is not logged in, then switch to the login page

//     const query = to.fullPath;

//     const location = `${loginRoute}?redirect=${query}`;

//     return location;
//   }

//   const rootRoute = '/';
//   const noAuthorizationRoute = '/403';

//   const needLogin = !to.handle.constant;
//   const routeRoles = to.handle.roles || [];

//   const hasRole = roles.some(role => routeRoles.includes(role));

//   const hasAuth = isSuper || !routeRoles.length || hasRole;

//   // if it is login route when logged in, then switch to the root page
//   if (to.fullPath.includes('login') && to.pathname !== '/login-out' && isLogin) {
//     return rootRoute;
//   }

//   if (to.id === 'notFound') {
//     const exist = matchRoutes(allRoutes[0].children || [], to.pathname);

//     if (exist && exist.length > 1) {
//       return noAuthorizationRoute;
//     }

//     return null;
//   }

//   if (!needLogin) {
//     return handleRouteSwitch(to, previousRoute);
//   }

//   // if the user is logged in but does not have authorization, then switch to the 403 page
//   if (!hasAuth && import.meta.env.VITE_AUTH_ROUTE_MODE === 'static') {
//     return noAuthorizationRoute;
//   }

//   return handleRouteSwitch(to, previousRoute);
// }


const RootLayout = () => {
  const route = useRoute();

  // const { router } = useRouter();

  const previousRoute = usePrevious(route);

  const { handle, pathname } = route;

  const location = useRef<string | { path: string; replace: boolean } | null>(null);

  const { i18nKey, title } = handle;


  const { t } = useTranslation();

  useEffect(() => {
    document.title = i18nKey ? t(i18nKey) : title;
  }, [i18nKey, title, t]);

  useEffect(() => {
    window.NProgress?.done?.();
  }, [pathname]);

  return location.current ? (
    typeof location.current === 'string' ? (
      <Navigate to={location.current} />
    ) : (
      <Navigate
        replace={location.current.replace}
        to={location.current.path}
      />
    )
  ) : (
    <Outlet context={previousRoute} />
  );
};

export const loader = () => {
  window.NProgress?.start?.();

  return null;
};

export const shouldRevalidate = ({ currentUrl, nextUrl }: ShouldRevalidateFunctionArgs) => {
  if (currentUrl.pathname === nextUrl.pathname) {
    return false;
  }
  return true;
};

export default RootLayout;
