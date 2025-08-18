import { useTranslation } from 'react-i18next';

interface DependenciesType {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

interface Depend {
  label: string;
  icon: string;
  color: string;
  list: Record<string, string>;
}

const DependenciesGroup = ({ dependencies, devDependencies }: DependenciesType) => {
  const { t } = useTranslation();

  const colorMap = {
    green: {
      text: 'text-green-500',
      border: 'border-green-500',
      bg: 'bg-green-50',
      hover: 'hover:bg-green-100',
      darkHover: 'dark:hover:bg-green-900/20'
    },
    orange: {
      text: 'text-orange-500',
      border: 'border-orange-500',
      bg: 'bg-orange-50',
      hover: 'hover:bg-orange-100',
      darkHover: 'dark:hover:bg-orange-900/20'
    }
  };

  const depends: Depend[] = [
    {
      label: t('page.projectIntro.mainDependencies'),
      icon: 'mingcute:link-line',
      color: 'green',
      list: dependencies
    },
    {
      label: t('page.projectIntro.devDependencies'),
      icon: 'mingcute:link-line',
      color: 'orange',
      list: devDependencies
    }
  ];

  return (
    <ACard title={t('page.projectIntro.dependencyInfo')} className="card-wrapper">
      <ARow gutter={[24, 24]}>
        {depends.map((item) => {
          const colors = colorMap[item.color as keyof typeof colorMap];

          return (
            <ACol key={item.color} xl={12} lg={24} span={24}>
              <div className="space-y-3">
                <div className="mb-4 flex items-center">
                  <SvgIcon icon={item.icon} className={`mr-2 ${colors.text}`} />
                  <h3 className="text-lg font-medium">{item.label}</h3>
                </div>
                {Object.entries(item.list).slice(0, 10).map(([name, version]) => (
                  <div
                    key={name}
                    className={`flex items-center justify-between border border-l-4 ${colors.border} rounded-lg ${colors.bg} p-3 transition-colors dark:border-[#404040] dark:bg-[#2a2a2a] ${colors.hover} ${colors.darkHover}`}
                  >
                    <span className="mr-2 min-w-0 flex-1 truncate text-sm text-gray-600 font-medium dark:text-gray-400">
                      {name}
                    </span>
                    <ATag color={item.color} className="flex-shrink-0 text-xs">
                      {version}
                    </ATag>
                  </div>
                ))}
              </div>
            </ACol>
          );
        })}
      </ARow>
    </ACard>
  );
};

export default DependenciesGroup;
