/**
 * @handle {
 *   "icon": "ant-design:project-outlined",
 *   "keepAlive": true,
 *   "order": 999
 * }
 */

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import PackageInfo from './modules/PackageInfo';
import DependenciesInfo from './modules/DependenciesInfo';
import QuickActions from './modules/QuickActions';
import ProjectStats from './modules/ProjectStats';

interface PackageInfoType {
  name: string;
  version: string;
  description: string;
  author: {
    name: string;
    email: string;
    url: string;
  };
  license: string;
  homepage: string;
  repository: {
    url: string;
  };
  bugs: {
    url: string;
  };
  keywords: string[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

const ProjectIntro = () => {
  const { t } = useTranslation();
  const [packageInfo, setPackageInfo] = useState<PackageInfoType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackageInfo = async () => {
      try {
        const response = await fetch('/package.json');
        if (!response.ok) {
          throw new Error('Failed to load package.json');
        }
        const data = await response.json();
        setPackageInfo(data);
      } catch (error) {
        console.error('Failed to load package info:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPackageInfo();
  }, []);

  if (loading) {
    return (
      <div className="h-400px flex-center">
        <div className="relative h-full animate-spin">
          <SvgIcon icon="mingcute:loading-line" className="text-4xl" />
        </div>
      </div>
    );
  }

  if (!packageInfo) {
    return (
      <div className="h-400px flex-center">
        <AResult
          status="error"
          title={t('page.projectIntro.loadingFailed')}
          subTitle={t('page.projectIntro.cannotLoadProjectInfo')}
        />
      </div>
    );
  }

  return (
    <div className="w-full pb-24px">
      <ASpace
        className="w-full"
        direction="vertical"
        size={24}
      >
        <ProjectStats packageInfo={packageInfo} />

        <ARow gutter={[24, 24]}>
          <ACol xl={16} lg={24} span={24}>
            <PackageInfo packageInfo={packageInfo} />
          </ACol>
          <ACol xl={8} lg={24} span={24}>
            <QuickActions
              homepage={packageInfo.homepage}
              bugsUrl={packageInfo.bugs.url}
              keywords={packageInfo.keywords}
            />
          </ACol>
        </ARow>

        <DependenciesInfo
          dependencies={packageInfo.dependencies}
          devDependencies={packageInfo.devDependencies}
        />
      </ASpace>
    </div>
  );
};

export default ProjectIntro;
