import { Breadcrumb } from 'antd';
import type { BreadcrumbProps } from 'antd';
import type { MenuItemType } from 'antd/es/menu/interface';
import type { MenuInfo } from 'rc-menu/lib/interface';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';

import { useMixMenuContext } from '@/features/menu';
import { useRouter } from '@/features/router';

import { getBreadcrumbsByRoute } from './breadcrumbShared';

function BreadcrumbContent({ icon, label }: { readonly icon: ReactElement; readonly label: ReactElement }) {
  return (
    <div className="i-flex-y-center align-middle">
      {cloneElement(icon, { className: 'mr-4px text-icon', ...(icon.props as any) })}
      {label}
    </div>
  );
}

const GlobalBreadcrumb: FC<Omit<BreadcrumbProps, 'items'>> = props => {
  const { allMenus: menus, route } = useMixMenuContext();

  const { navigate } = useRouter();

  const breadcrumb = getBreadcrumbsByRoute(route, menus);

  function handleClickMenu(menuInfo: MenuInfo) {
    navigate(menuInfo.key);
  }

  const items: BreadcrumbProps['items'] = breadcrumb.map((item, index) => {
    const commonTitle = (
      <BreadcrumbContent
        icon={item.icon as ReactElement}
        key={item.key}
        label={item.label as ReactElement}
      />
    );

    return {
      title: commonTitle,
      ...('children' in item &&
        item.children && {
          menu: {
            items: item.children.filter(Boolean) as MenuItemType[],
            onClick: handleClickMenu,
            selectedKeys: [breadcrumb[index + 1]?.key] as string[]
          }
        })
    };
  });

  return (
    <Breadcrumb
      {...props}
      items={items}
    />
  );
};

export default GlobalBreadcrumb;
