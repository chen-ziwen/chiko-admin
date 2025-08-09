import type { BreadcrumbProps } from 'antd';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';
import { Link, matchPath } from 'react-router-dom';

type BreadcrumbItem = Required<BreadcrumbProps>['items'][number];

function BreadcrumbContent({ icon, label }: { readonly icon: ReactElement; readonly label: ReactElement }) {
  return (
    <div className="i-flex-y-center align-middle">
      {cloneElement(icon, { className: 'mr-4px text-icon' } as any)}
      {label}
    </div>
  );
}


export function getPathnameByIndex(pathname: string, index: number): string {
  const segments = pathname.split('/').filter(Boolean);
  const sliced = segments.slice(0, index + 1);
  return `/${sliced.join('/')}`;
}

export function getBreadcrumbsByRoute(route: Router.Route, menus: App.Global.Menu[]): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];

  const pathname = route.pathname;

  let currentMenus = menus;

  let selectedKeys: string[] = [];

  for (let i = 1; i < route.matched.length; i += 1) {
    const matched = route.matched[i];

    const currentMenu = currentMenus.find(item => item?.key === matched?.pathname);

    if (!currentMenu) {
      break;
    }

    const prefixPath = getPathnameByIndex(pathname, i);

    const breadcrumbItem: BreadcrumbItem = {
      title: (
        <BreadcrumbContent
          icon={currentMenu.icon as ReactElement}
          label={currentMenu.label as ReactElement}
        />
      )
    };

    if (Array.isArray(currentMenu.children) && currentMenu.children.length > 0) {
      const flattenedChildren = currentMenu.children?.map(child => {
        const isMatch = matchPath(child.key, prefixPath);

        if (isMatch) {
          selectedKeys = [child.key];
        }

        return {
          icon: child.icon,
          key: child.key,
          label: isMatch ? child.label : <Link to={child.key}>{child.label}</Link>
        };
      });

      breadcrumbItem.menu = { items: flattenedChildren, selectedKeys };
    }

    breadcrumbs.push(breadcrumbItem);

    currentMenus = currentMenu.children || [];
  }

  return breadcrumbs;
}
