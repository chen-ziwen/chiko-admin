import BetterPages from '@better-pages-create/react-router';

export function setupBetterRouter() {
  return BetterPages({
    dirs: ['src/pages'],
    exclude: ['**/components/**', '**/modules/**'],
    extendRoute(route) {
      const name = route.name;

      const constantRoutes = ['403', '404', '500'];

      const handle: { [key: string]: any } = {
        i18nKey: `route.${name}`,
        title: name
      };

      if (constantRoutes.includes(name)) {
        handle.constant = true;
      }

      route.handle = {
        ...route.handle,
        ...handle
      };

      return route;
    }
  });
}
