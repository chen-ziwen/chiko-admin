import { RouteObject, createBrowserRouter, matchRoutes } from 'react-router-dom';
import { authRoutes, initCacheRoutes, routes } from '@/router';
import { fetchGetUserRoutes } from '@/services/api';
import { store } from '@/stores';
import { getIsLogin, isStaticSuper, selectUserInfo, setHomePath } from '@/stores/modules';
import { filterAuthRoutesByDynamic, filterAuthRoutesByRoles, mergeValuesByParent } from '@/features/router';
import { setCacheRoutes } from '@/stores/modules';

export function initRouter() {
  let isAlreadyPatch = false;

  function getIsNeedPatch(path: string) {
    if (!getIsLogin(store.getState())) {
      return false;
    }

    if (isAlreadyPatch) {
      return false;
    }

    const matchRoute = matchRoutes(routes, { pathname: path }, import.meta.env.VITE_BASE_URL);

    if (!matchRoute) {
      return true;
    }

    if (matchRoute) {
      return matchRoute[1].route.path === '*';
    }

    return false;
  }

  const router = createBrowserRouter(routes, {
    basename: import.meta.env.VITE_BASE_URL,
    patchRoutesOnNavigation: async ({ patch, path }) => {
      if (getIsNeedPatch(path)) {
        isAlreadyPatch = true;

        await initAuthRoutes(patch);
      }
    }
  });

  store.dispatch(setCacheRoutes(initCacheRoutes));

  if (getIsLogin(store.getState()) && !isAlreadyPatch) {
    initAuthRoutes(router.patchRoutes);

    isAlreadyPatch = true;
  }

  function resetRoutes() {
    isAlreadyPatch = false;
    router._internalSetRoutes(routes);
  }

  return {
    router,
    resetRoutes
  };
}

export async function initAuthRoutes(addRoutes: (parent: string | null, route: RouteObject[]) => void) {
  const authRouteMode = import.meta.env.VITE_AUTH_ROUTE_MODE;

  const reactAuthRoutes = mergeValuesByParent(authRoutes);

  const isSuper = isStaticSuper(store.getState());

  const { roles } = selectUserInfo(store.getState());

  if (authRouteMode === 'static') {
    if (isSuper) {
      reactAuthRoutes.forEach(route => {
        addRoutes(route.parent, route.route);
      });
    } else {
      const filteredRoutes = filterAuthRoutesByRoles(reactAuthRoutes, roles);

      filteredRoutes.forEach(({ parent, route }) => {
        addRoutes(parent, route);
      });
    }
  } else {
    const { data, error } = await fetchGetUserRoutes();

    if (error) {
      console.error(error);
      return;
    }
    store.dispatch(setHomePath(data.home));

    const filteredRoutes = filterAuthRoutesByDynamic(reactAuthRoutes, data.routes);

    filteredRoutes.forEach(({ parent, route }) => addRoutes(parent, route));
  }
}
