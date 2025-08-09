/**
 * @handle {
 *   "icon": "lucide:menu"
 * }
 */

import { useTranslation } from 'react-i18next';

const SecondChildHome = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <ACard>
        <div className="mb-6">
          <h1 className="mb-2 text-2xl text-primary font-bold">
            {t('multiMenu.menuOne.first.child.home.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('multiMenu.menuOne.first.child.home.description')}
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="mb-3 text-xl text-primary font-semibold">
            页面内容
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {t('multiMenu.menuOne.first.child.home.content')}
          </p>
          
          <ARow gutter={[16, 16]}>
            <ACol span={12}>
              <ACard>
                <h3 className="mb-2 text-primary font-medium">
                  当前路径
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  /multi-menu/second/child/home
                </p>
              </ACard>
            </ACol>
            <ACol span={12}>
              <ACard>
                <h3 className="mb-2 text-primary font-medium">
                  菜单层级
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  菜单一 → 一级菜单 → 二级菜单 → 二级菜单首页
                </p>
              </ACard>
            </ACol>
          </ARow>
        </div>
      </ACard>
    </div>
  );
};

export default SecondChildHome; 