/**
 * @handle {
 *   "icon": "lucide:menu"
 * }
 */

import { m } from 'motion/react';
import { useTranslation } from 'react-i18next';

const SecondChildHome = () => {
  const { t } = useTranslation();

  return (
    <m.div
      animate={{ opacity: 1 }}
      className="w-full pb-24px"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ASpace
        className="w-full"
        direction="vertical"
        size={24}
      >
        {/* 页面标题区域 */}
        <m.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <ACard>
            <div className="mb-6">
              <h1 className="mb-2 text-2xl text-primary font-bold">
                {t('page.multiMenu.pageTitles.menuTwoChildHome')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('page.multiMenu.pageTitles.menuTwoChildHomeDesc')}
              </p>
            </div>
          </ACard>
        </m.div>

        {/* 路由信息展示 */}
        <m.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ARow gutter={[24, 24]}>
            <ACol span={12}>
              <ACard>
                <h3 className="mb-2 text-primary font-medium">
                  {t('page.multiMenu.currentPath')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  /multi-menu/second/child/home
                </p>
              </ACard>
            </ACol>
            <ACol span={12}>
              <ACard>
                <h3 className="mb-2 text-primary font-medium">
                  {t('page.multiMenu.menuLevel')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('page.multiMenu.menuLevels.multiMenu')} → {t('page.multiMenu.menuLevels.menuTwo')} → {t('page.multiMenu.menuLevels.firstLevel')} → {t('page.multiMenu.menuLevels.secondLevel')} → {t('page.multiMenu.menuLevels.home')}
                </p>
              </ACard>
            </ACol>
          </ARow>
        </m.div>





      </ASpace>
    </m.div>
  );
};

export default SecondChildHome; 