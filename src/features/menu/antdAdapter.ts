import type { ItemType } from 'antd/es/menu/interface';

function mapMenus(menus: App.Global.Menu[] | undefined): ItemType[] | undefined {
  if (!menus) {
    return undefined;
  }
  return menus.map<ItemType>(menu => ({
    key: menu.key,
    label: menu.label,
    icon: menu.icon,
    children: mapMenus(menu.children)
  }));
}

export function toAntdItems(menus: App.Global.Menu[] | undefined): ItemType[] {
  return mapMenus(menus) ?? [];
} 