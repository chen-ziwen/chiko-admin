import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/business/useStore';

interface RoleInfo {
  name: string;
  description: string;
  permissions: string[];
  color: string;
}

const RolePermissionsCard = () => {
  const { t } = useTranslation();
  const userInfo = useAppSelector(state => state.auth.userInfo);

  const getRoleInfo = (): RoleInfo[] => {
    const roleMap: Record<string, RoleInfo> = {
      R_SUPER: {
        name: t('page.userCenter.roles.superAdmin'),
        description: t('page.userCenter.roles.superAdminDesc'),
        permissions: [
          t('page.userCenter.permissions.userManagement'),
          t('page.userCenter.permissions.roleManagement'),
          t('page.userCenter.permissions.systemConfig'),
          t('page.userCenter.permissions.dataManagement'),
          t('page.userCenter.permissions.logView')
        ],
        color: 'red'
      },
      R_ADMIN: {
        name: t('page.userCenter.roles.admin'),
        description: t('page.userCenter.roles.adminDesc'),
        permissions: [
          t('page.userCenter.permissions.userManagement'),
          t('page.userCenter.permissions.roleManagement'),
          t('page.userCenter.permissions.dataManagement')
        ],
        color: 'blue'
      }
    };

    if (userInfo.roles.length === 0) {
      return [{
        name: t('page.userCenter.roles.user'),
        description: t('page.userCenter.roles.userDesc'),
        permissions: [
          t('page.userCenter.permissions.dataView'),
          t('page.userCenter.permissions.personalSettings')
        ],
        color: 'green'
      }];
    }

    return userInfo.roles.map(role => roleMap[role] || {
      name: role,
      description: t('page.userCenter.roles.customRole'),
      permissions: [t('page.userCenter.permissions.basicPermission')],
      color: 'default'
    });
  };

  const roleInfoList = getRoleInfo();

  return (
    <ACard title={t('page.userCenter.rolePermissions')} className="card-wrapper">
      <div className="space-y-4">
        {roleInfoList.map((role, index) => (
          <ACard key={index} size="small" className="rounded-lg">
            <div className="mb-2 text-center">
              <ATag color={role.color as any}>
                {role.name}
              </ATag>
            </div>
            <ATypography.Paragraph type="secondary" className="mb-3">
              {role.description}
            </ATypography.Paragraph>
            <div>
              <ATypography.Title level={5} className="mb-2">
                {t('page.userCenter.permissionList')}：
              </ATypography.Title>
              <div className="flex flex-wrap gap-1">
                {role.permissions.map((permission, pIndex) => (
                  <ATag key={pIndex} color="default" className="text-xs">
                    {permission}
                  </ATag>
                ))}
              </div>
            </div>
          </ACard>
        ))}
      </div>
    </ACard>
  );
};

export default RolePermissionsCard;
