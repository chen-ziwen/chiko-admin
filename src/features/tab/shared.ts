import type { LastLevelRouteKey, RouteMap } from '@soybean-react/vite-plugin-react-router';

/**
 * Get fixed tab ids
 *
 * @param tabs
 */
export function getFixedTabIds(tabs: App.Global.Tab[]) {
  const fixedTabs = getFixedTabs(tabs);

  return fixedTabs.map(tab => tab.id);
}

/**
 * Get fixed tabs
 *
 * @param tabs
 */
export function getFixedTabs(tabs: App.Global.Tab[]) {
  return tabs.filter(tab => tab.fixedIndex || tab.fixedIndex === 0);
}

/**
 * The vue router will automatically merge the meta of all matched items, and the icons here may be affected by other
 * matching items, so they need to be processed separately
 *
 * @param route
 */
export function getRouteIcons(route: Router.Route) {
  // Set default value for icon at the beginning
  let icon: string = route?.handle?.icon || import.meta.env.VITE_MENU_ICON;
  let localIcon: string | undefined = route?.handle?.localIcon;

  // Route.matched only appears when there are multiple matches,so check if route.matched exists
  if (route.matched) {
    // Find the handle of the current route from matched
    const currentRoute = route.matched.find(r => r.id === route.id);
    // If icon exists in currentRoute.handle, it will overwrite the default value
    icon = currentRoute?.handle?.icon || icon;
    localIcon = currentRoute?.handle?.localIcon;
  }

  return { icon, localIcon };
}

/**
 * Get tab by route
 *
 * @param route
 */
export function getTabByRoute(route: Router.Route) {
  const { fullPath, handle = {} as Router.RouteHandle, id, pathname } = route;

  const { fixedIndexInTab = undefined, i18nKey = undefined, keepAlive = false, title = '' } = handle;

  let fixedIndex = fixedIndexInTab;

  // 检查是否是首页路径（/ 或 /home）
  const isHomePath = pathname === '/' || pathname === import.meta.env.VITE_ROUTE_HOME;

  // 统一首页路径为 VITE_ROUTE_HOME
  const normalizedPath = isHomePath ? import.meta.env.VITE_ROUTE_HOME : pathname;

  // 如果是首页，设置固定索引
  if (isHomePath) {
    fixedIndex = 0;
  }

  const { icon, localIcon } = getRouteIcons(route);

  // 使用规范化的路径作为 ID，确保唯一性
  // 对于首页特殊处理，确保无论是 / 还是 /home 都使用相同的 ID
  const tabId = handle.multiTab ? fullPath : normalizedPath;

  const tab: App.Global.Tab = {
    fixedIndex,
    fullPath: isHomePath ? import.meta.env.VITE_ROUTE_HOME : fullPath, // 确保首页的 fullPath 也统一
    i18nKey,
    icon,
    id: tabId,
    keepAlive,
    label: title,
    localIcon,
    newLabel: '',
    oldLabel: i18nKey || title,
    routeKey: id as LastLevelRouteKey,
    routePath: normalizedPath as RouteMap[LastLevelRouteKey]
  };

  return tab;
}

/**
 * Is tab in tabs
 *
 * @param tab
 * @param tabs
 */
export function isTabInTabs(tabId: string, tabs: App.Global.Tab[]) {
  return tabs.some(tab => tab.id === tabId);
}

/**
 * extract tabs by all routes
 *
 * @param router
 * @param tabs
 */
export function extractTabsByAllRoutes(routeNames: string[], tabs: App.Global.Tab[]) {
  return tabs.filter(tab => routeNames.includes(tab.routeKey));
}
