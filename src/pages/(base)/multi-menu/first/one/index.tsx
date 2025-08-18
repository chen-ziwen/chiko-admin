import { useTranslation } from 'react-i18next';

const FirstChild = () => {
  const { t } = useTranslation();

  return (
    <ASpace
      className="w-full"
      direction="vertical"
      size={24}
    >
      <ACard>
        <div className="mb-6">
          <h1 className="mb-2 text-2xl text-primary font-bold">
            {t('page.multiMenu.pageTitles.menuOneOne')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('page.multiMenu.pageTitles.menuOneOneDesc')}
          </p>
        </div>
      </ACard>

      <ARow gutter={[24, 24]}>
        <ACol span={12}>
          <ACard>
            <h3 className="mb-2 text-primary font-medium">
              {t('page.multiMenu.currentPath')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                  /multi-menu/first/one
            </p>
          </ACard>
        </ACol>
        <ACol span={12}>
          <ACard>
            <h3 className="mb-2 text-primary font-medium">
              {t('page.multiMenu.menuLevel')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('page.multiMenu.menuLevels.multiMenu')} → {t('page.multiMenu.menuLevels.menuOne')} → {t('page.multiMenu.menuLevels.menuOneFirst')}
            </p>
          </ACard>
        </ACol>
      </ARow>
    </ASpace>
  );
};

export default FirstChild;
