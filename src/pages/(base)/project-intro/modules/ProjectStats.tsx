import { useTranslation } from 'react-i18next';

interface Author {
  name: string;
  email: string;
  url: string;
}

interface PackageInfo {
  name: string;
  version: string;
  description: string;
  author: Author;
  license: string;
  homepage: string;
  repository: { url: string };
  bugs: { url: string };
  keywords: string[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

interface ProjectStatsProps {
  packageInfo: PackageInfo;
}

const ProjectStats = ({ packageInfo }: ProjectStatsProps) => {
  const { t } = useTranslation();

  const stats = [
    {
      label: t('page.projectIntro.version'),
      value: `v${packageInfo.version}`,
      icon: 'mingcute:package-line',
      color: 'text-blue-600'
    },
    {
      label: t('page.projectIntro.mainDependencies'),
      value: Object.keys(packageInfo.dependencies).length,
      icon: 'mingcute:link-line',
      color: 'text-green-600'
    },
    {
      label: t('page.projectIntro.devDependencies'),
      value: Object.keys(packageInfo.devDependencies).length,
      icon: 'mingcute:code-line',
      color: 'text-orange-600'
    },
    {
      label: t('page.projectIntro.techKeywords'),
      value: packageInfo.keywords.length,
      icon: 'mingcute:tag-line',
      color: 'text-purple-600'
    }
  ];

  return (
    <ACard title={t('page.projectIntro.projectStats')} className="card-wrapper">
      <ARow gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <ACol key={index} xl={6} lg={12} md={12} span={24}>
            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-4 transition-colors dark:border-[#404040] dark:bg-[#2a2a2a] hover:bg-gray-100 dark:hover:bg-[#3a3a3a]">
              <div className={`p-3 rounded-lg bg-white dark:bg-[#1c1c1c] shadow-sm ${stat.color}`}>
                <SvgIcon icon={stat.icon} className="text-xl" />
              </div>
              <div className="ml-4 flex-1">
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                <div className="text-2xl text-gray-900 font-bold dark:text-white">{stat.value}</div>
              </div>
            </div>
          </ACol>
        ))}
      </ARow>
    </ACard>
  );
};

export default ProjectStats;
