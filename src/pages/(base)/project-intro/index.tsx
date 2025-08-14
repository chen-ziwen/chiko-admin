/**
 * @handle {
 *   "icon": "ant-design:project-outlined",
 *   "keepAlive": true,
 *   "order": 999
 * }
 */

import PackageInfo from './modules/PackageInfo';
import DependenciesGroup from './modules/DependenciesGroup';
import QuickActions from './modules/QuickActions';
import ProjectStats from './modules/ProjectStats';
import pkg from '~/package.json';

const ProjectIntro = () => {
  return (
    <div className="w-full pb-24px">
      <ASpace
        className="w-full"
        direction="vertical"
        size={24}
      >
        <ProjectStats packageInfo={pkg} />

        <ARow gutter={[24, 24]}>
          <ACol xl={16} lg={24} span={24}>
            <PackageInfo packageInfo={pkg} />
          </ACol>
          <ACol xl={8} lg={24} span={24}>
            <QuickActions
              homepage={pkg.homepage}
              bugsUrl={pkg.bugs.url}
              keywords={pkg.keywords}
            />
          </ACol>
        </ARow>

        <DependenciesGroup
          dependencies={pkg.dependencies}
          devDependencies={pkg.devDependencies}
        />
      </ASpace>
    </div>
  );
};

export default ProjectIntro;
