/**
 * @handle {
 *   "icon": "lucide:user-circle",
 *   "keepAlive": true,
 *   "hideInMenu": true
 * }
 */

import { useTranslation } from 'react-i18next';
import UserProfileCard from './modules/UserProfileCard';
import RolePermissionsCard from './modules/RolePermissionsCard';
import AccountStatsCard from './modules/AccountStatsCard';
import QuickActionsCard from './modules/QuickActionsCard';

const UserCenter = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-xl text-gray-600 font-bold sm:text-2xl dark:text-gray-100">
          {t('common.userCenter')}
        </h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base dark:text-gray-400">
          {t('page.userCenter.description')}
        </p>
      </div>

      <ARow gutter={[16, 16]}>
        <ACol xs={24} sm={24} md={8} lg={8} xl={8}>
          <UserProfileCard />
        </ACol>

        <ACol xs={24} sm={24} md={8} lg={8} xl={8}>
          <RolePermissionsCard />
        </ACol>

        <ACol xs={24} sm={24} md={8} lg={8} xl={8}>
          <AccountStatsCard />
        </ACol>
      </ARow>

      <QuickActionsCard />
    </div>
  );
};

export default UserCenter;
