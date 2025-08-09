/**
 * @handle {
 *   "icon": "lucide:menu"
 * }
 */

import { useTranslation } from 'react-i18next';

const FirstChild = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <ACard>
        <div className="mb-6">
          <h1 className="mb-2 text-2xl text-primary font-bold">
            {t('multiMenu.menuTwo.first.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('multiMenu.menuTwo.first.description')}
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="mb-3 text-xl text-primary font-semibold">
            页面信息
          </h2>
          <ARow gutter={[16, 16]}>
            <ACol span={12}>
              <ACard>
                <h3 className="mb-2 text-primary font-medium">
                  当前路径
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  /multi-menu/first/child
                </p>
              </ACard>
            </ACol>
            <ACol span={12}>
              <ACard>
                <h3 className="mb-2 text-primary font-medium">
                  菜单层级
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  菜单二 → 一级菜单 → 二级菜单
                </p>
              </ACard>
            </ACol>
          </ARow>
        </div>
      </ACard>
    </div>
  );
};

export default FirstChild;
