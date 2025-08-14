import { useTranslation } from 'react-i18next';

interface DependenciesInfoProps {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

const DependenciesInfo = ({ dependencies, devDependencies }: DependenciesInfoProps) => {
  const { t } = useTranslation();

  return (
    <ACard title={t('page.projectIntro.dependencyInfo')} className="card-wrapper">
      <ARow gutter={[24, 24]}>
        <ACol xl={12} lg={24} span={24}>
          <div className="space-y-3">
            <div className="mb-4 flex items-center">
              <SvgIcon icon="mingcute:link-line" className="mr-2 text-green-600" />
              <h3 className="text-lg font-medium">{t('page.projectIntro.mainDependencies')}</h3>
            </div>
            {Object.entries(dependencies).slice(0, 10).map(([name, version]) => (
              <div key={name} className="flex items-center justify-between border border-l-4 border-gray-200 border-green-500 rounded-lg bg-gray-50 p-3 transition-colors dark:border-[#404040] dark:bg-[#2a2a2a] hover:bg-gray-100 dark:hover:bg-[#3a3a3a]">
                <span className="mr-2 truncate text-sm text-gray-700 font-medium dark:text-gray-300">{name}</span>
                <ATag color="green" className="flex-shrink-0 text-xs">{version}</ATag>
              </div>
            ))}
          </div>
        </ACol>

        <ACol xl={12} lg={24} span={24}>
          <div className="space-y-3">
            <div className="mb-4 flex items-center">
              <SvgIcon icon="mingcute:code-line" className="mr-2 text-orange-600" />
              <h3 className="text-lg font-medium">{t('page.projectIntro.devDependencies')}</h3>
            </div>
            {Object.entries(devDependencies).slice(0, 10).map(([name, version]) => (
              <div key={name} className="flex items-center justify-between border border-l-4 border-gray-200 border-orange-500 rounded-lg bg-gray-50 p-3 transition-colors dark:border-[#404040] dark:bg-[#2a2a2a] hover:bg-gray-100 dark:hover:bg-[#3a3a3a]">
                <span className="mr-2 truncate text-sm text-gray-700 font-medium dark:text-gray-300">{name}</span>
                <ATag color="orange" className="flex-shrink-0 text-xs">{version}</ATag>
              </div>
            ))}
          </div>
        </ACol>
      </ARow>
    </ACard>
  );
};

export default DependenciesInfo;
