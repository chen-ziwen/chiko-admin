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
    <div className="w-full pb-6">
      <ASpace
        className="w-full"
        direction="vertical"
        size="middle"
      >
        <ProjectStats packageInfo={pkg} />

        <ARow gutter={[16, 16]}>
          <ACol xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
            <PackageInfo packageInfo={pkg} />
          </ACol>
          <ACol xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
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
